import {chromium} from '@playwright/test';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {makePages} from '../src/pages.mjs';
import {articles} from '../src/articles.mjs';
import {brochure} from '../scripts/brochures.mjs';

const base=process.env.BASE_URL||'http://localhost:3017';
const out=new URL('../test-results/editorial/',import.meta.url).pathname;
await mkdir(out,{recursive:true});
const patterns=[
 ['tiret cadratin',/—/gu],
 ['formulation à examiner',/\b(?:not a|not the|not just|rather than|instead of|no longer)\b|n[’']est pas|plutôt que|au lieu de/giu],
 ['pronom collectif',/(?<![\p{L}\p{N}_])(?:we|us|our|nous|notre|nos)(?![\p{L}\p{N}_])/giu],
 ['lieu ou nom géographique',/\b(?:New York|Los Angeles|African|africain|Morocco|Maroc|Marrakech|Casablanca|France|Paris|London|Canada|Guadeloupe|United States|États-Unis|Europe|European|Africa|Afrique|California|Californie)\b/giu],
 ['ancien nom produit',/Quantum Branding AI|\bQB /gu],
 ['placeholder',/\[[^\]\n]{3,80}\]/gu],
 ['montant',/[€£]|\$\s*\d|\b(?:USD|EUR|MAD)\b|\d[\d.,]*\s*(?:dollars|euros)\b/giu],
 ['variable non rendue',/\$\{[^}]+\}/gu],
 ['pseudo ou plateforme',/elvinpicardo|tisasen|shelahj|fiverr/giu]
];
function hits(text,{templates=false}={}){
 const rows=[];
 for(const [category,pattern]of patterns){
  if(templates&&['variable non rendue','placeholder'].includes(category))continue;
  for(const m of text.matchAll(pattern))rows.push({category,match:m[0],line:text.slice(0,m.index).split('\n').length,excerpt:text.slice(Math.max(0,m.index-65),m.index+150).replace(/\s+/g,' ')});
 }
 return rows;
}
const report={pages:[],sources:[],brochures:[],art:[],errors:[]};
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 page.on('pageerror',e=>report.errors.push(e.message));
 for(const item of makePages(articles)){
  const file='dist/'+(item.path==='/'?'index':item.path.slice(1))+'.html';
  const html=await readFile(new URL('../'+file,import.meta.url),'utf8');
  const response=await page.goto(base+item.path);
  assert.equal(response.status(),200);
  await page.evaluate(()=>document.fonts.ready);
  const mask=s=>s.replace(/[^\n]/g,' ');
  const bodyStart=html.indexOf('<body');
  const text=mask(html.slice(0,bodyStart))+html.slice(bodyStart).replace(/<script[\s\S]*?<\/script>/g,mask).replace(/<[^>]*>/g,mask);
  const findings=hits(text);
  report.pages.push({route:item.path,file,findings});
  const fatal=findings.filter(h=>!['formulation à examiner','pronom collectif','lieu ou nom géographique',...(item.basePath.startsWith('/work')?['montant']:[])].includes(h.category));
  assert.deepEqual(fatal,[],item.path);
  for(const width of [390,1440]){
   await page.setViewportSize({width,height:1000});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),item.path+' overflow');
   if(['/','/start','/work/selvaggi','/work/verne-jewels','/practice/method','/about'].includes(item.basePath))await page.screenshot({path:out+item.lang+'-'+(item.basePath==='/'?'home':item.basePath.slice(1).replaceAll('/','-'))+'-'+width+'.png',fullPage:true});
  }
  if(item.basePath==='/about'){
   const snapshot=await page.locator('main').ariaSnapshot();
   assert.ok(!snapshot.includes('✳'));
   assert.equal((snapshot.match(/Nizzar Ben Chekroune/g)||[]).length,1);
  }
  report.art.push(...await page.locator('main img[src*="/illustrations/"]').evaluateAll((els,route)=>els.map(e=>({route,asset:e.getAttribute('src'),context:e.closest('.visual-scene')?'Hero scene':e.closest('article')?.querySelector('h3')?.textContent||e.closest('.lab-card')?.querySelector('h2')?.textContent||'Other'})),item.path));
 }
 const documentPage=await browser.newPage();
 for(const lang of ['en','fr']){
  const html=brochure(lang);
  await writeFile(out+'brochure-'+lang+'.html',html);
  await documentPage.setContent(html);await documentPage.evaluate(()=>document.fonts.ready);
  const sheets=await documentPage.locator('.sheet').evaluateAll(els=>els.map((el,i)=>{
   const rect=el.getBoundingClientRect(),foot=el.querySelector('.foot');
   const content=foot?.previousElementSibling;
   return {page:i+1,height:el.clientHeight,scroll:el.scrollHeight,overflow:el.scrollHeight>el.clientHeight+1,footerOverlap:!!(content&&foot&&content.getBoundingClientRect().bottom>foot.getBoundingClientRect().top+1)};
  }));
  assert.ok(sheets.every(s=>!s.overflow&&!s.footerOverlap),JSON.stringify({lang,sheets}));
  report.brochures.push({lang,sheets,findings:hits(await documentPage.locator('body').innerText())});
 }
 for(const file of ['src/pages.mjs','src/shared.mjs','src/articles.mjs','src/cases.mjs','scripts/build.mjs','scripts/brochures.mjs','scripts/presentation.mjs','scripts/images.mjs','app.js']){
  const current=await readFile(new URL('../'+file,import.meta.url),'utf8');
  let before='';try{before=execFileSync('git',['show','76091a3:'+file],{encoding:'utf8',stdio:['ignore','pipe','ignore']});}catch{}
  report.sources.push({file,before:hits(before,{templates:true}),after:hits(current,{templates:true})});
 }
 assert.deepEqual(report.errors,[]);
 await writeFile(out+'report.json',JSON.stringify(report,null,2));
 console.log(`PASS: ${report.pages.length} pages, ${report.pages.length*2} viewport checks, accessible founder poster, brochure geometry, editorial inventory.`);
}finally{await browser.close()}
