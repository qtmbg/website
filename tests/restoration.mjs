// Editorial baseline: owner-approved copy and career updates, 14 September 2026.
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
 // 7 October 2026: curated practice Work and canonical career corrections (owner-requested editorial change).
// Previous baseline kept as history: fixtures/editorial-2026-10-04-archive.json.
 const fixtureUrl=new URL('./fixtures/editorial-2026-10-07-work-release.json',import.meta.url);
 const previous=JSON.parse(await readFile(new URL('./fixtures/editorial-2026-09-14-career.json',import.meta.url),'utf8'));
 const authorizedChange=route=>route==='/'||route==='/fr'||/^\/(fr\/)?(work(?:\/|$)|practice$|about$)/.test(route);
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
   if(record){
    if(previous[item.path]&&!authorizedChange(item.path)) assert.deepEqual(fingerprint,previous[item.path],`${item.path}: unrelated editorial change`);
    fixture[item.path]=fingerprint;
   }
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
  await page.locator('#site-nav a').first().hover();
  assert.equal(await page.locator('#site-nav a').first().evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  assert.equal(Math.round(await page.locator('#site-nav a').first().evaluate(e=>e.getBoundingClientRect().width)),40);
  report.motion=true;
  await page.locator('.wall-item').first().hover();
  assert.equal(await page.locator('.wall-item').first().evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  for(const route of ['/lab','/fr/lab']){
   await page.setViewportSize({width:390,height:844});await page.goto(base+route);
   await page.locator('.menu-toggle').focus();await page.keyboard.press('Enter');
   assert.equal(await page.locator('#site-nav').isVisible(),true);
   assert.equal(await page.locator('#site-nav').evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(255, 255, 255, 0.96)');
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
  console.log(`PASS: ${report.editorialPages} editorial snapshots ${record?'recorded with unrelated pages preserved':'unchanged'}; ${report.geometry.length} boundary checks; reduced motion and EN/FR keyboard menus.`);
 }finally{await browser.close()}
}
