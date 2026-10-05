// Canonical career coverage and publication boundaries, independent of UI layout.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import {projects, eras, categories, relationships} from '../src/archive/projects.mjs';
import {makePages} from '../src/pages.mjs';
import {articles} from '../src/articles.mjs';
const media=JSON.parse(await readFile(new URL('../archive/media.json',import.meta.url),'utf8'));
const built=JSON.parse(await readFile(new URL('../src/archive/media-built.json',import.meta.url),'utf8'));
const mediaById=new Map(media.map(m=>[m.id,m]));
const pages=makePages(articles);

test('canonical archive retains all owner-requested career names',()=>{
 const text=JSON.stringify(projects).normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
 const expected=['tv5 monde','diesel','audi','diptyk','baccarat','bugatti','asprey','unido','usaid','iom','oif','nepad','google arts','arts thread','gucci','wawrinka','ballman','kareem','tennis','lakers','oasis','africa business school','um6p','verne','selvaggi','energy cube','vetren','zone aire','minute creat','unlimitart','nception','banan','arroz','houna','street view','we360','bahia'];
 for(const name of expected)assert.ok(text.includes(name),`Owner-requested career name missing: ${name}`);
 assert.ok(projects.length>2,'Archive must retain career breadth');
});

test('every record generates distinct bilingual routes with defined relationships',()=>{
 assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length);
 for(const p of projects){
  assert.match(p.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(relationships[p.relationship],`${p.slug}: unknown relationship`);
  assert.ok(eras.some(e=>e.key===p.era),`${p.slug}: unknown chapter`);
  for(const c of p.categories||[]) assert.ok(categories[c],`${p.slug}: unknown category ${c}`);
  for(const lang of ['en','fr'])assert.equal(pages.filter(page=>page.basePath===`/work/${p.slug}`&&page.lang===lang).length,1,`${p.slug}: route missing or duplicate`);
  if(p.start) assert.match(String(p.start),/^\d{4}$/);
  if(p.end&&p.end!=='present') assert.ok(Number(p.end)>=Number(p.start),`${p.slug}: date order`);
  for(const id of [p.cover,...(p.gallery||[])].filter(Boolean))assert.ok(mediaById.has(id),`${p.slug}: missing provenance ${id}`);
 }
});

test('derived media has reviewed public provenance and every credit is retained',()=>{
 for(const [id,b]of Object.entries(built)){
  const m=mediaById.get(id);assert.ok(m,`${id}: no provenance`);
  assert.ok(['PUBLIC SAFE','PUBLIC WITH CREDIT'].includes(m.publishability),`${id}: private/excerpt asset derived`);
  if(m.publishability==='PUBLIC WITH CREDIT')assert.ok(m.credit,`${id}: no credit`);
  if(b.sizes)for(const size of b.sizes){assert.ok(size.width>0&&size.height>0);assert.match(size.src,/^\/work\/media\//);}
 }
 for(const m of media.filter(m=>!['PUBLIC SAFE','PUBLIC WITH CREDIT'].includes(m.publishability)))assert.ok(!built[m.id],`${m.id}: nonpublic media leaked`);
});

test('internal source registers and originals are absent from build',async()=>{
 const root=new URL('../dist/',import.meta.url);
 const names=await readdir(root);assert.ok(!names.includes('archive'));assert.ok(!names.includes('src'));
 for(const p of pages){
  const filename=p.path==='/'?'index.html':p.path.slice(1)+'.html';
  const html=await readFile(new URL(filename,root),'utf8');
  assert.doesNotMatch(html,/archive\/originals|claude-recovery|session-recovery|\/Users\/drazicq|\/private\/tmp/);
 }
});
