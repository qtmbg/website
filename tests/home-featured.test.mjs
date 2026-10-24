import test from 'node:test';
import assert from 'node:assert/strict';
import {makePages} from '../src/pages.mjs';
import {articles} from '../src/articles.mjs';
import {present} from '../scripts/presentation.mjs';
import {esc} from '../src/shared.mjs';

const pages=makePages(articles);
const render=(path,lang)=>present(pages.find(p=>p.basePath===path&&p.lang===lang));
const slugs=['selvaggi','verne-jewels','rapp-esen'];
const quotes=[
 ['francoise-rapp-2026-10-15','Françoise Rapp','His approach took us far beyond traditional branding.','en','Olfactive Strategist & Perfumer'],
 ['leslie-lentz-2026-09-28','Leslie Lentz','he has done an exceptional job growing our social media presence and building us a completely new website.','en','Marketing Director'],
 ['hanane-el-aafifi-2026-10-06','Hanane El Aafifi','Ma rencontre avec Nizar lors d’une formation a changé ma façon de voir l’IA','fr','Head of Business developpement & Partnership']
];

test('both homepages lead the existing selected-work gallery with the three featured projects',()=>{
 for(const lang of ['en','fr']){
  const html=render('/',lang), prefix=lang==='fr'?'/fr':'';
  const links=[...html.matchAll(/class="wall-item[^\"]*" href="([^\"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(links.slice(0,3),slugs.map(s=>`${prefix}/work/${s}`));
  assert.equal(links.length,9,'Existing career selection is retained without duplicate projects');
  assert.ok(html.includes('/work/media/rapp-esen/rapp-esen-flatlay-1024.webp'));
  assert.match(html,new RegExp(`class="desk-icon" href="${prefix}/work/rapp-esen"`));
 }
});

test('homepages contain exactly the requested ordered original quotes and compact verified attribution',()=>{
 for(const lang of ['en','fr']){
  const html=render('/',lang);
  const cards=[...html.matchAll(/<figure class="home-testimonial" data-home-testimonial="([^\"]+)">([\s\S]*?)<\/figure>/g)];
  assert.deepEqual(cards.map(m=>m[1]),quotes.map(q=>q[0]));
  for(const [i,[id,name,quote,originalLanguage,title]] of quotes.entries()){
   assert.ok(cards[i][2].includes(`<blockquote lang="${originalLanguage}">“${esc(quote)}”</blockquote>`),id);
   assert.ok(cards[i][2].includes(esc(name)));
   assert.ok(cards[i][2].includes(esc(title)));
   assert.doesNotMatch(cards[i][2],/observed|vérifi|verified|2026|sign-in|connexion|LinkedIn/);
   assert.ok(cards[i][2].includes(i===0?'people#p-francoise-rapp':'https://nizzar.com/in-their-words'));
  }
  assert.ok(html.includes(lang==='fr'?'Ce que l’on vit en travaillant ensemble.':'What working together feels like.'));
 }
});

test('Work retains all three cases and uses the approved Rapp image; People leads with its six curated profiles',()=>{
 for(const lang of ['en','fr']){
  const prefix=lang==='fr'?'/fr':'',html=render('/work',lang);
  assert.deepEqual([...html.matchAll(/class="case-card" href="([^\"]+)"/g)].map(m=>m[1]),slugs.map(s=>prefix+'/work/'+s));
  assert.match(html,/class="case-art visual-rapp-esen"[\s\S]*?rapp-esen-flatlay-1024.webp/);
  const people=render('/people',lang);
  assert.equal((people.match(/<article class="perspective profile"/g)||[]).length,6);
  assert.equal((people.match(/data-perspective=/g)||[]).length,7,'Six profiles plus the Rapp & Esen project account');
 }
});
