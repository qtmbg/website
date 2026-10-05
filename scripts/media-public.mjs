// Writes src/archive/media-public.json: the part of archive/media.json the
// pages need (ids, alt text, captions, credits) for assets cleared to publish.
//
// archive/ is not committed, so the deployed build cannot read it. The site
// renders from this file everywhere, locally and on Vercel, so a local build
// can no longer show media that production silently drops. Paths, source
// URLs, hashes and rights notes stay internal.
//
//   node scripts/media-public.mjs        run after scripts/media.mjs
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const media = JSON.parse(await readFile(path.join(root, 'archive', 'media.json'), 'utf8'));
const built = JSON.parse(await readFile(path.join(root, 'src', 'archive', 'media-built.json'), 'utf8'));
const PUBLIC = new Set(['PUBLIC SAFE', 'PUBLIC WITH CREDIT']);

const cleared = media
  .filter(m => PUBLIC.has(m.publishability) && m.reviewed === true && built[m.id])
  .map(({ id, project, type, publishability, alt, caption, credit }) => ({ id, project, type, publishability, alt, caption, ...(credit ? { credit } : {}) }));

await writeFile(path.join(root, 'src', 'archive', 'media-public.json'), `${JSON.stringify(cleared, null, 2)}\n`);
const derivedOnly = Object.keys(built).filter(id => !cleared.some(m => m.id === id));
console.log(`Wrote ${cleared.length} public media records → src/archive/media-public.json`);
if (derivedOnly.length) console.warn(`  ! ${derivedOnly.length} derived assets have no cleared record and will not render: ${derivedOnly.slice(0, 8).join(', ')}`);
