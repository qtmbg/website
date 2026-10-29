import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {makePages} from '../src/pages.mjs';
import {articles} from '../src/articles.mjs';
import {present} from '../scripts/presentation.mjs';
import {esc} from '../src/shared.mjs';
import {perspectives,curatedSelection,projectAccounts} from '../src/perspectives.mjs';

const pages=makePages(articles);
const render=(path,lang)=>present(pages.find(p=>p.basePath===path&&p.lang===lang));
const sources=JSON.parse(readFileSync(new URL('./fixtures/people-sources.json',import.meta.url),'utf8'));
const byId=new Map(perspectives.map(p=>[p.id,p]));
const approved=[
 ['william-entriken','William Entriken','Technology','Technologie'],
 ['georg-bak-2026-10-07','Georg Bak','Art','Art'],
 ['mike-mongo-2026-10-15','Mike Mongo','Culture & Space','Culture et espace'],
 ['jake-hirsch-allen-2026-10-10','Jake Hirsch-Allen','AI & Society','IA et société'],
 ['mo-el-sayed-2026-10-09','Mo El-Sayed','Brand & Culture','Marque et culture'],
 ['olivier-stoullig-2026-10-11','Olivier Stoullig','Industry & Development','Industrie et développement']
];
const WILLIAM='I worked with Nizzar on BananaConf events, running 2022–2024. He is a ball of energy and I have seen him take ownership of making guests feel welcome, ensuring programming is smooth and getting in front of sponsors/stakeholders to make the production a success. This is a large, high-paced multimodal event including: talks, workshops, entrepreneurship, dancing, bananas, art installations and government policymaking... all in a rapidly changing industry. I look fondly on our time working together and hope to have another opportunity again!';
const articlesOf=html=>[...html.matchAll(/<article class="perspective profile" id="([^"]+)" data-perspective="([^"]+)"[\s\S]*?<\/article>/g)];

test('People shows exactly the six approved people, in the approved order, without duplicates',()=>{
 assert.deepEqual(curatedSelection,approved.map(a=>a[0]));
 for(const lang of ['en','fr']){
  const html=render('/people',lang), found=articlesOf(html);
  assert.deepEqual(found.map(m=>m[2]),approved.map(a=>a[0]));
  assert.equal(new Set(found.map(m=>m[2])).size,6);
  const stream=html.slice(html.indexOf('<div class="people-stream">'),html.indexOf('<section class="people-accounts"'));
  assert.equal((stream.match(/data-perspective=/g)||[]).length,6);
  for(const [i,[id,name,en,fr]] of approved.entries()){
   const block=found[i][0];
   assert.ok(block.includes(`<h2 class="perspective-author" id="${found[i][1]}-name">${esc(name)}</h2>`),id);
   assert.ok(block.includes(`0${i+1} · ${esc(lang==='fr'?fr:en)}`),id+': territory');
  }
  for(const gone of ['frank-poncelet-2026-10-06','eva-shalenko-2026-10-06','danosch-zahedi-2026-10-07','sander-gansen-2026-10-05'])assert.ok(!html.includes(gone));
 }
});

test('William Entriken quotes the owner-supplied original exactly and stays framed by BananaConf',()=>{
 const w=byId.get('william-entriken');
 assert.equal(sources.owner_supplied['william-entriken'].full_original_text,WILLIAM);
 assert.deepEqual(w.full_original_text,[WILLIAM]);
 assert.ok(WILLIAM.includes(w.approved_excerpt));
 assert.equal(w.author_title,'Coauthor of ERC-721');
 assert.equal(w.source_platform,'Owner-supplied');
 assert.equal(w.source_url,undefined,'No invented LinkedIn URL');
 for(const lang of ['en','fr']){
  const block=articlesOf(render('/people',lang))[0][0];
  assert.ok(block.includes(`<p>${esc(WILLIAM)}</p>`));
  assert.ok(block.includes('BananaConf'));
  assert.ok(block.includes('2022–2024'));
  assert.doesNotMatch(block,/BrandOS|Quantum Branding|client|linkedin\.com/i);
 }
});

test('every other quotation matches its verified nizzar.com registry record verbatim',()=>{
 assert.equal(sources.registry.repo,'qtmbg/nizzar-com');
 for(const id of curatedSelection.slice(1)){
  const p=byId.get(id), src=sources.records[id];
  assert.ok(src.source_verified&&src.full_text_verified,id);
  assert.equal(p.full_original_text.join('\n\n'),src.full_original_text,id);
  assert.ok(src.full_original_text.includes(p.approved_excerpt),id+': excerpt is contiguous original text');
  assert.equal(p.author_name,src.name);
  assert.equal(p.original_language,src.lang);
  assert.equal(p.source_url,src.source_url);
  assert.equal(p.source_url_type,src.source_url_type);
 }
 for(const lang of ['en','fr'])for(const [block,,id] of articlesOf(render('/people',lang))){
  const p=byId.get(id);
  assert.ok(block.includes(`<blockquote lang="en"><p>“${esc(p.approved_excerpt)}”</p></blockquote>`),id);
  for(const para of p.full_original_text)assert.ok(block.includes(`<p>${esc(para)}</p>`),id+': full original');
  assert.match(block,/<details class="profile-full">\s*<summary>/);
 }
});

test('profiles make no institutional endorsement or employment claims',()=>{
 for(const lang of ['en','fr']){
  const html=render('/people',lang), found=articlesOf(html);
  const of=id=>found.find(m=>m[2]===id)[0];
  assert.doesNotMatch(of('mo-el-sayed-2026-10-09'),/employed|contracted|on behalf of Ledger|salarié|mandaté/i);
  assert.doesNotMatch(of('olivier-stoullig-2026-10-11'),/commissioned|Quantum Branding|mandaté/i);
  assert.doesNotMatch(of('georg-bak-2026-10-07'),/Sotheby|employee of Phillips|salarié/i);
  assert.doesNotMatch(of('mike-mongo-2026-10-15'),/NASA|astronaut training with Nizzar|Commercial Astronaut/i);
  for(const [block] of found)assert.doesNotMatch(block,/BrandOS/);
 }
});

test('LinkedIn sources use the official recommendations section and are labelled as such',()=>{
 for(const id of curatedSelection.slice(1)){
  const url=new URL(byId.get(id).source_url);
  assert.equal(url.hostname,'www.linkedin.com');
  assert.equal(url.pathname,'/in/nizzar/details/recommendations/');
 }
 for(const lang of ['en','fr']){
  const html=render('/people',lang);
  assert.equal((html.match(lang==='fr'?/LinkedIn · section des recommandations ↗/g:/LinkedIn · recommendations section ↗/g)||[]).length,5);
  assert.equal((html.match(/target="_blank" rel="noopener noreferrer"/g)||[]).length>=6,true);
 }
});

test('anchors resolve, and Françoise Rapp keeps her full account at the anchors other pages use',()=>{
 for(const lang of ['en','fr']){
  const html=render('/people',lang), prefix=lang==='fr'?'/fr':'';
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,'No duplicate ids');
  const index=[...html.matchAll(/<nav class="perspective-index"[\s\S]*?<\/nav>/g)][0][0];
  const targets=[...index.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(targets,['p-william-entriken','p-georg-bak','p-mike-mongo','p-jake-hirsch-allen','p-mo-el-sayed','p-olivier-stoullig']);
  for(const t of targets)assert.ok(ids.includes(t),t);
  assert.ok(ids.includes('p-francoise-rapp'));
  const rapp=byId.get('francoise-rapp-2026-10-15');
  assert.deepEqual(projectAccounts,['francoise-rapp-2026-10-15']);
  assert.equal(rapp.full_original_text.length,7);
  for(const para of rapp.full_original_text)assert.ok(html.includes(`<p>${esc(para)}</p>`));
  const home=render('/',lang);
  assert.ok(home.includes(`${prefix}/people#p-francoise-rapp`));
  const caseHtml=render('/work/rapp-esen',lang);
  assert.ok(caseHtml.includes(`<p>“${esc(rapp.approved_excerpt)}”</p>`));
  assert.ok(caseHtml.includes(`href="${prefix}/people"`));
 }
});

test('the five previous recommendations remain preserved as source records',()=>{
 for(const [id,excerpt] of [
  ['francoise-rapp-2026-10-15','What makes Nizzar exceptional is his rare combination of experience, remarkable sensitivity and creative intuition.'],
  ['frank-poncelet-2026-10-06',"Nizzar sees within minutes how a project or a person should be positioned, what story to tell and to whom, and he hands out that advice even when there's nothing in it for him."],
  ['eva-shalenko-2026-10-06','what stands out is the way he combines deep thinking about branding with a genuine curiosity for what’s next.'],
  ['danosch-zahedi-2026-10-07','I’ve chosen to work with Nizzar again and again over the years, and that probably says more than anything else could.'],
  ['sander-gansen-2026-10-05',"Nizzar's someone who talks the talk and actually brings results."]
 ]){
  const p=byId.get(id);
  assert.ok(p,id);
  assert.equal(p.approved_excerpt,excerpt);
  assert.equal(p.source_verified,true);
 }
 assert.deepEqual(byId.get('francoise-rapp-2026-10-15').related_projects,['rapp-esen']);
});

test('portraits are the people’s own photographs, with a recorded basis, reserved space and a credit',()=>{
 const EXPECTED={
  'william-entriken':{basis:'licence',source_url:'https://phor.net/self-portraits'},
  'georg-bak-2026-10-07':{basis:'owner-direction',source_url:'https://www.linkedin.com/in/artadvisorgeorgbak/'},
  'mike-mongo-2026-10-15':{basis:'owner-direction',source_url:'https://www.penguinrandomhouse.com/authors/2145209/mike-mongo/'},
  'jake-hirsch-allen-2026-10-10':{basis:'owner-direction',source_url:'https://dais.ca/team/jake-hirsch-allen/'},
  'mo-el-sayed-2026-10-09':{basis:'owner-direction',source_url:'https://www.linkedin.com/in/mohsen-el-sayed/'}
 };
 for(const id of curatedSelection){
  const c=byId.get(id).portrait;
  if(!EXPECTED[id]){assert.equal(c,undefined,id+': no portrait until one is sourced');continue;}
  assert.equal(c.basis,EXPECTED[id].basis,id);
  assert.equal(c.source_url,EXPECTED[id].source_url,id);
  assert.ok(c.credit,id);
  if(c.basis==='licence')assert.ok(c.license&&c.license_url,id+': licence recorded');
  assert.equal(c.width*5,c.height*4,id+': 4:5');
  assert.equal(c.width,Math.max(...c.widths),id+': intrinsic size is the largest file');
  for(const w of c.widths){
   const file=readFileSync(new URL(`../public${c.src}-${w}.webp`,import.meta.url));
   assert.equal(file.toString('ascii',8,12),'WEBP',`${id} ${w}`);
  }
 }
 for(const lang of ['en','fr']){
  for(const [block,,id] of articlesOf(render('/people',lang))){
   const c=byId.get(id).portrait, name=byId.get(id).author_name;
   const imgs=block.match(/<img [^>]*>/g)||[];
   if(!c){assert.equal(imgs.length,0,id);assert.ok(block.includes('<header class="profile-head">'),id);continue;}
   assert.equal(imgs.length,1,id);
   const img=imgs[0];
   assert.ok(img.includes(`width="${c.width}" height="${c.height}"`),id+': intrinsic size');
   assert.ok(img.includes('loading="lazy"')&&img.includes('decoding="async"'),id);
   assert.ok(img.includes(`alt="${lang==='fr'?'Portrait de':'Portrait of'} ${esc(name)}"`),id+': alt');
   const src=img.match(/ src="([^"]+)"/)[1];
   assert.ok(c.widths.some(w=>src===`${c.src}-${w}.webp`),id+': fallback src exists');
   const notes=render('/notes',lang);
   assert.ok(notes.includes(`href="${c.source_url}"`),id+': credit on /notes');
   if(c.license_url)assert.ok(notes.includes(`href="${c.license_url}"`),id+': licence link on /notes');
   assert.ok(!block.includes(`href="${c.source_url}"`)||c.source_url===byId.get(id).source_url,id+': no credit under the quote');
   assert.ok(block.indexOf('<img')<block.indexOf(`id="${anchorOf(id)}-name"`),id+': portrait leads the name');
  }
 }
});
const anchorOf=id=>'p-'+id.replace(/-\d{4}-\d{2}-\d{2}$/,'');

test('relationship lines are kept in the records but not shown',()=>{
 for(const lang of ['en','fr']){
  const html=render('/people',lang);
  assert.doesNotMatch(html,/profile-relationship|With Nizzar<|Avec Nizzar</);
  for(const p of perspectives){
   const rel=lang==='fr'?p.relationship_fr:p.relationship_en;
   if(rel)assert.ok(!html.includes(esc(rel)),p.id);
  }
 }
});

test('quotation cards keep the LinkedIn link without dates, relationships or the permalink note',()=>{
 for(const lang of ['en','fr'])for(const path of ['/people','/practice','/work','/work/selvaggi']){
  const html=render(path,lang);
  assert.doesNotMatch(html,/Profile headline observed|Présentation du profil|Section link|Lien vers la section|not an individual permalink/,lang+path);
 }
 const html=render('/work/selvaggi','en');
 assert.ok(html.includes('LinkedIn · recommendations section ↗'));
 assert.ok(!html.includes('Selvaggi Built client · website and social media engagement'));
});

test('quotations carry only the person and the source link, without disclaimers',()=>{
 for(const lang of ['en','fr'])for(const path of ['/people','/practice','/work','/work/selvaggi','/work/rapp-esen','/']){
  const html=render(path,lang);
  assert.doesNotMatch(html,/Excerpt · original|Extrait · citation|provided by Nizzar|transmise par Nizzar|does not speak for|n’engage pas les organisations|kept with the work it describes|rattaché au travail|Portrait:|Portrait :/,lang+path);
 }
});
