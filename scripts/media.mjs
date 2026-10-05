// Local archive derivation. Fail closed: private and unreviewed assets never
// reach public/. Provenance remains internal; only approved derivatives ship.
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, stat, writeFile, readdir, realpath } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const originals = path.join(root, 'archive/originals');
const out = path.join(root, 'public/work/media');
const media = JSON.parse(await readFile(path.join(root, 'archive/media.json'), 'utf8'));
const publicStatuses = new Set(['PUBLIC SAFE', 'PUBLIC WITH CREDIT']);
const statuses = new Set([...publicStatuses, 'EXCERPT / REDACTION REQUIRED', 'PRIVATE — DO NOT PUBLISH']);
const widths = [480, 960, 1600];
const run = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8', maxBuffer: 8e6 }).trim();
const built = {}, expected = new Set(), ids = new Set();
const counts = { images: 0, videos: 0, audio: 0, documents: 0, excluded: 0, remoteLinks: 0 };
const errors = [];
const audit = process.argv.includes('--audit');

async function files(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)]))).flat();
}
function publishPath(item, filename) {
  const dest = path.join(out, item.project, filename);
  expected.add(dest);
  return { dest, src: `/work/media/${item.project}/${filename}` };
}
async function image(item, source) {
  // Identify after orientation, ensuring EXIF rotation and rendered dimensions agree.
  const [w, h] = run('magick', [`${source}[0]`, '-auto-orient', '-format', '%w %h', 'info:']).split(' ').map(Number);
  if (!(w > 0 && h > 0)) throw Error('Invalid image dimensions');
  const colour = run('magick', [`${source}[0]`, '-auto-orient', '-resize', '1x1!', '-format', '#%[hex:p{0,0}]', 'info:']).slice(0, 7).toLowerCase();
  const sizes = [];
  for (const width of widths.filter(n => n < w).concat([Math.min(w, widths.at(-1))])) {
    const { dest, src } = publishPath(item, `${item.id}-${width}.webp`);
    if (!audit) run('magick', [`${source}[0]`, '-auto-orient', '-strip', '-resize', `${width}x`, '-quality', '80', dest]);
    if (!existsSync(dest)) throw Error(`Missing derivative ${src}`);
    sizes.push({ width, height: Math.round(h * width / w), src, bytes: (await stat(dest)).size });
  }
  return { width: w, height: h, colour, sizes };
}
for (const item of media) {
  try {
    if (!/^[a-z0-9-]+$/.test(item.id) || !/^[a-z0-9-]+$/.test(item.project) || ids.has(item.id)) throw Error('Invalid or duplicate identifier');
    ids.add(item.id);
    if (!statuses.has(item.publishability)) throw Error('Unknown publication status');
    if (!publicStatuses.has(item.publishability)) { counts.excluded++; continue; }
    if (item.reviewed !== true || !item.source || !item.rightsNotes) throw Error('Public asset lacks review/provenance');
    if (item.publishability === 'PUBLIC WITH CREDIT' && !item.credit) throw Error('Credit is required');
    if (item.delivery === 'link') {
      if (!/^https:\/\//.test(item.source)) throw Error('External media must use HTTPS');
      counts.remoteLinks++;
      continue; // external URLs belong in project records; no media download
    }
    if (!item.localPath) throw Error('A reviewed cached original is required; acquisition is separate');
    const original = await realpath(path.resolve(root, item.localPath));
    if (!original.startsWith(`${await realpath(originals)}${path.sep}`)) throw Error('Original must be inside ignored archive/originals');
    const hash = crypto.createHash('sha256').update(await readFile(original)).digest('hex');
    if (item.sha256 && item.sha256 !== hash) throw Error('Original has changed since review');
    await mkdir(path.join(out, item.project), { recursive: true });
    let source = original, file;
    if (item.type === 'document') {
      if (!item.previewApproved || !item.page || !/\.pdf$/i.test(original)) throw Error('Document requires explicitly approved preview page');
      source = path.join(originals, 'derived-stills', `${item.id}.png`);
      if (!audit) { await mkdir(path.dirname(source), { recursive: true }); run('pdftoppm', ['-f', String(item.page), '-l', String(item.page), '-r', '110', '-png', '-singlefile', original, source.slice(0, -4)]); }
      counts.documents++;
      // Full PDF never copied; canonical records link to the original public source.
    } else if (item.type === 'video') {
      source = path.join(originals, 'derived-stills', `${item.id}.jpg`);
      const output = publishPath(item, `${item.id}.mp4`);
      if (!audit) {
        await mkdir(path.dirname(source), { recursive: true });
        run('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(item.posterAt || 0), '-i', original, '-frames:v', '1', source]);
        run('ffmpeg', ['-y', '-loglevel', 'error', '-i', original, '-map_metadata', '-1', '-vf', 'scale=min(1280\\,iw):-2', '-c:v', 'libx264', '-crf', '24', '-c:a', 'aac', '-movflags', '+faststart', output.dest]);
      }
      file = { src: output.src, bytes: (await stat(output.dest)).size }; counts.videos++;
    } else if (item.type === 'audio') {
      const output = publishPath(item, `${item.id}.mp3`);
      if (!audit) run('ffmpeg', ['-y', '-loglevel', 'error', '-i', original, '-map_metadata', '-1', '-vn', '-c:a', 'libmp3lame', '-b:a', '128k', output.dest]);
      built[item.id] = { type: 'audio', file: { src: output.src, bytes: (await stat(output.dest)).size }, sha256: hash };
      counts.audio++; continue;
    } else if (item.type === 'image') counts.images++;
    else throw Error('Unsupported media type');
    built[item.id] = { ...(await image(item, source)), type: item.type, ...(file ? { file } : {}), sha256: hash };
  } catch (error) { errors.push(`${item.id}: ${error.message}`); }
}
// An old derivative from a now-private source is a leak, even if no page uses it.
const unexpected = (await files(out)).filter(file => !expected.has(file));
if (unexpected.length) errors.push(`Unregistered public files: ${unexpected.map(f => path.relative(root, f)).join(', ')}`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else {
  if (!audit) await writeFile(path.join(root, 'src/archive/media-built.json'), `${JSON.stringify(built, null, 2)}\n`);
  console.log(JSON.stringify({ mode: audit ? 'audit' : 'derive', counts, built: Object.keys(built).length, publicFiles: expected.size, publicBytes: (await Promise.all([...expected].map(async f => (await stat(f)).size))).reduce((a,b) => a+b, 0), safety: 'PASS: reviewed allowlist, original hash, credits, path containment, no stale files' }, null, 2));
}
