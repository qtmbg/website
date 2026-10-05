// Verify the publication boundary in an isolated fixture, never mutate the archive.
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, copyFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
const fixture = await mkdtemp(path.join(tmpdir(), 'quantum-media-safety-'));
try {
  for (const dir of ['scripts','archive/originals','src/archive','public/work/media']) await mkdir(path.join(fixture, dir), { recursive: true });
  await copyFile('scripts/media.mjs', path.join(fixture, 'scripts/media.mjs'));
  execFileSync('magick', ['-size','18x12','xc:#3158df',path.join(fixture,'archive/originals/safe.png')]);
  const safe = { id:'safe',project:'fixture',type:'image',localPath:'archive/originals/safe.png',source:'https://example.org/owner.png',reviewed:true,publishability:'PUBLIC WITH CREDIT',credit:'Owner',rightsNotes:'Approved owner evidence' };
  const run = async items => {
    await writeFile(path.join(fixture,'archive/media.json'), JSON.stringify(items));
    return spawnSync(process.execPath, [path.join(fixture,'scripts/media.mjs')], { encoding:'utf8' });
  };
  const result = await run([safe,{...safe,id:'private',localPath:'does-not-exist',publishability:'PRIVATE — DO NOT PUBLISH'},{...safe,id:'excerpt',localPath:'does-not-exist',publishability:'EXCERPT / REDACTION REQUIRED'}]);
  assert.equal(result.status,0,result.stderr);
  const built=JSON.parse(await readFile(path.join(fixture,'src/archive/media-built.json')));
  assert.deepEqual(Object.keys(built),['safe']);
  assert.equal(built.safe.sizes[0].width,18);assert.equal(built.safe.sizes[0].height,12);
  for (const [name, patch] of [['unreviewed',{reviewed:false}],['missing credit',{credit:''}],['unknown status',{publishability:'PUBLISH'}],['path escape',{localPath:'scripts/media.mjs'}],['changed original',{sha256:'bad'}]]) {
    const failure=await run([{...safe,...patch}]);assert.notEqual(failure.status,0,`${name} must fail closed`);
  }
  execFileSync('ffmpeg',['-y','-loglevel','error','-f','lavfi','-i','color=c=blue:s=32x24:d=1','-f','lavfi','-i','sine=frequency=440:duration=1','-c:v','libx264','-c:a','aac','-shortest',path.join(fixture,'archive/originals/clip.mp4')]);
  await copyFile('archive/originals/claude-recovery/media-raw/creative-forum-ljubljana-2018/creative_forum_ljubljana_conference_programme.pdf',path.join(fixture,'archive/originals/programme.pdf'));
  const multi=await run([safe,{...safe,id:'clip',type:'video',localPath:'archive/originals/clip.mp4'},{...safe,id:'sound',type:'audio',localPath:'archive/originals/clip.mp4'},{...safe,id:'doc',type:'document',localPath:'archive/originals/programme.pdf',previewApproved:true,page:1}]);
  assert.equal(multi.status,0,multi.stderr);
  const av=JSON.parse(await readFile(path.join(fixture,'src/archive/media-built.json')));
  assert.ok(av.clip.file.src.endsWith('.mp4')); assert.ok(av.clip.sizes.length);
  assert.ok(av.sound.file.src.endsWith('.mp3'));assert.ok(av.doc.sizes.length); assert.equal(av.doc.file,undefined,'full PDF must never ship');
  // Remove just the generated test outputs so subsequent boundary tests isolate safe.
  await rm(path.join(fixture,'public/work/media/fixture'),{recursive:true,force:true});
  await run([safe]);
  assert.notEqual((await run([safe,safe])).status,0,'duplicate IDs must fail');
  assert.notEqual((await run([{...safe,publishability:'PRIVATE — DO NOT PUBLISH'}])).status,0,'revoked public status must detect stale derivative');
  console.log('PASS: private/excerpt exclusion, reviewed credit gate, strict statuses/IDs, path containment, original hash, stale derivative detection, dimensions, real video/audio/document derivation');
} finally { await rm(fixture,{recursive:true,force:true}); }
