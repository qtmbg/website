// Editorial baseline: independent homepage clarity pass authorized by the owner, 4 October 2026.
// Previous baseline kept as history: fixtures/editorial-2026-09-14-career.json.
// Changes to this fixture require an explicit editorial change, never a redesign.
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {makePages} from '../src/pages.mjs';
import {articles} from '../src/articles.mjs';

export function editorialFingerprint(html){
 const d=new DOMParser().parseFromString(html,'text/html');
 d.querySelectorAll('[aria-hidden="true"],script,style').forEach(e=>e.remove());
 const clean=s=>s.replace(/\s+/g,'').normalize('NFC');
 return {text:clean(d.body.textContent),links:[...d.querySelectorAll('a')].map(a=>[a.getAttribute('href'),clean(a.textContent),a.getAttribute('aria-label')]),metadata:[...d.querySelectorAll('title,meta[name="description"],link[rel="canonical"],link[rel="alternate"],meta[property^="og:"],meta[name^="twitter:"]')].map(e=>e.outerHTML)};
}

if(process.argv[1]===fileURLToPath(import.meta.url)){
 const base=process.env.BASE_URL||'http://localhost:3017';
 const fixtureUrl=new URL('./fixtures/editorial-2026-10-04-independent-clarity.json',import.meta.url);
 const record=process.argv.includes('--record-editorial');
 const fixture=record?{}:JSON.parse(await readFile(fixtureUrl,'utf8'));
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const out=new URL('../test-results/restoration/',import.meta.url).pathname;await mkdir(out,{recursive:true});
 const report={editorialPages:0,geometry:[],errors:[],motion:false};
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});
  for(const item of makePages(articles)){
   const response=await page.request.get(base+item.path);assert.equal(response.status(),200);
   const actual=await page.evaluate(editorialFingerprint,await response.text());
   const textHash=createHash('sha256').update(actual.text).digest('hex');
   const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
   const fingerprint={text:textHash,links:hash(actual.links),metadata:hash(actual.metadata)};
   if(record)fixture[item.path]=fingerprint;
   else assert.deepEqual(fingerprint,fixture[item.path],`${item.path}: editorial content changed`);
   report.editorialPages++;
  }
  if(record)await writeFile(fixtureUrl,JSON.stringify(fixture,null,2)+'\n');
  for(const lang of ['en','fr'])for(const route of ['/','/practice','/work','/lab','/about','/start'])for(const width of [360,390,540,541,800,801,1440]){
   await page.setViewportSize({width,height:900});
   const pathname=(lang==='fr'?'/fr':'')+(route==='/'?(lang==='fr'?'':'/'):route);
   assert.equal((await page.goto(base+pathname)).status(),200);
   await page.evaluate(()=>document.fonts.ready);
   const row=await page.evaluate(()=>({document:document.documentElement.scrollWidth,viewport:innerWidth,heroBottom:document.querySelector('.hero>.button')?.getBoundingClientRect().bottom??null}));
   report.geometry.push({lang,route,width,...row});
   if(width===390||width===1440){
    const name=`${lang}-${route==='/'?'home':route.slice(1)}-${width}`;
    await page.screenshot({path:out+name+'.png',fullPage:false});
    await page.screenshot({path:out+name+'-full.png',fullPage:true});
   }
  }
  await page.setViewportSize({width:1440,height:900});await page.goto(base+'/');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('.visual-scene').hover();
  assert.equal(await page.locator('.process-card').first().evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  report.motion=true;
  await page.locator('.case-card').nth(1).hover();
  assert.equal(await page.locator('.case-card').nth(1).locator('.case-art').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(212, 221, 229)');
  for(const route of ['/lab','/fr/lab']){
   await page.setViewportSize({width:390,height:844});await page.goto(base+route);
   await page.locator('.menu-toggle').focus();await page.keyboard.press('Enter');
   assert.equal(await page.locator('#site-nav').isVisible(),true);
   assert.equal(await page.locator('#site-nav').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(24, 41, 49)');
   await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  }
  await page.emulateMedia({media:'print'});
  for(const selector of ['.page-head h1','.section-heading h2','.lab-card p']){
   assert.equal(await page.locator(selector).first().evaluate(e=>getComputedStyle(e).color),'rgb(27, 37, 43)',`${selector}: print text must remain legible`);
  }
  await writeFile(out+'report.json',JSON.stringify(report,null,2));
  const overflow=report.geometry.filter(r=>r.document>r.viewport+1);if(overflow.length)console.error(overflow);
  assert.equal(overflow.length,0,'Horizontal overflow at a boundary width');
  assert.equal(report.geometry.filter(r=>r.width<=390&&r.heroBottom>900).length,0,'Mobile CTA below fold');
  assert.deepEqual(report.errors,[]);
  console.log(`PASS: ${report.editorialPages} editorial snapshots unchanged; ${report.geometry.length} boundary checks; reduced motion and EN/FR keyboard menus.`);
 }finally{await browser.close()}
}
