import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {makePages} from '../src/pages.mjs';
import {articles} from '../src/articles.mjs';
import {projects} from '../src/archive/projects.mjs';
import {esc} from '../src/shared.mjs';

const pages=makePages(articles);
const approved={en:'Working across the US, Europe, MENA and worldwide.',fr:"J'interviens aux États-Unis, en Europe, dans la région MENA et partout dans le monde."};
test('About and contact convey the approved availability once in each language, without cluttering Home',()=>{
 for(const lang of ['en','fr']){
  for(const route of ['/about','/start']){
   const body=pages.find(p=>p.lang===lang&&p.basePath===route).body;
   assert.equal(body.split(esc(approved[lang])).length-1,1,route+'/'+lang);
  }
  assert.equal(pages.find(p=>p.lang===lang&&p.basePath==='/').body.includes(approved[lang]),false);
 }
});
test('Liverpool selection retains TIMEPieces and matches the reviewed two-photograph scope in EN/FR',()=>{
 const p=projects.find(p=>p.slug==='nft-liverpool');
 assert.match(p.oneLine.en,/Two photographs/);assert.match(p.oneLine.fr,/Deux photographies/);
 for(const lang of ['en','fr']){
  assert.ok(p.oneLine[lang].includes('Keith Grossman'));assert.ok(p.oneLine[lang].includes('TIMEPieces'));
  assert.doesNotMatch(JSON.stringify(p.summary[lang]),/photography and video|photographie et vidéo|, \./);
 }
 assert.equal(projects.filter(p=>p.slug==='bugatti-asprey-nft').length,1);
 assert.match(JSON.stringify(projects.find(p=>p.slug==='diptyk')),/Diptyk’s Instagram account/);
 assert.match(JSON.stringify(projects.find(p=>p.slug==='unlimitart')),/\$2\.7M/);
});
test('organization schema expresses global service reach without inventing addresses',()=>{
 for(const route of ['index','fr','about','fr/about','start','fr/start']){
  const html=readFileSync(new URL('../dist/'+route+'.html',import.meta.url),'utf8');
  const graph=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
  const org=graph.find(n=>n['@id']==='https://thequantumbranding.com/#organization');
  assert.equal(org.areaServed,'Worldwide');assert.equal(org.address,undefined);
 }
});
