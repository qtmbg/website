// Archive checks against a local build. Run BASE_URL=http://localhost:3017 node tests/archive.mjs.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { projects } from '../src/archive/projects.mjs';
const base = process.env.BASE_URL || 'http://localhost:3017';
const output = new URL('../test-results/archive/', import.meta.url).pathname;
await mkdir(output,{recursive:true});
const browser = await chromium.launch({channel:'chrome',headless:true});
const context = await browser.newContext({reducedMotion:'reduce'});
const page = await context.newPage();
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
const visible=projects.filter(p=>p.listed!==false);
for(const lang of ['en','fr']){
 const prefix=lang==='fr'?'/fr':'';
 await page.goto(`${base}${prefix}/work`);
 assert.equal(await page.locator('.finder-item').count(),visible.length,'All canonical records in Finder');
 const filter=page.locator('[data-filter="cats"]').first();
 if(await filter.count()){
  const key=await filter.getAttribute('data-value');
  await filter.click();
  const expected=visible.filter(p=>(p.categories||[]).includes(key)).length;
  assert.equal(await page.locator('.finder-item:visible').count(),expected,'Category filter retains matching projects');
  await page.locator('[data-filter="all"]').click();
  assert.equal(await page.locator('.finder-item:visible').count(),visible.length,'Reset reveals complete archive');
 }
 await page.goto(`${base}${prefix}/work/index`);
 assert.equal(await page.locator('.index-table tbody tr').count(),visible.length,'Full index retains every listed record');
 await page.goto(`${base}${prefix}/work/timeline`);
 assert.equal(await page.locator('.timeline-rows li').count(),visible.filter(p=>p.start&&/^\d{4}$/.test(String(p.start))).length);
}
const routes=['/work','/fr/work','/work/index','/work/timeline','/',...projects.filter(p=>p.flagship||['diesel','la-minute-creative','diptyk','unlimitart','unido-creative-mediterranean','creative-forum-ljubljana-2018','tv5-monde','selvaggi','verne-jewels'].includes(p.slug)).map(p=>`/work/${p.slug}`)];
for(const width of [1440,768,320]){
 await page.setViewportSize({width,height:1000});
 for(const route of routes){
  await page.goto(base+route);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${route} overflow at ${width}`);
  if(width===320&&(route==='/work'||route==='/fr/work')){
   assert.equal(await page.locator('.finder-filter-panel').evaluate(e=>e.open),false,'Phone filters initially collapse');
   assert.ok(await page.locator('.finder-thumb').first().evaluate(e=>e.getBoundingClientRect().top<900),'Actual work appears on the first phone screen');
   await page.locator('.finder-filter-panel summary').click();
   await page.locator('[data-filter=all]').click();
   assert.equal(await page.locator('.finder-item:visible').count(),visible.length);
   await page.locator('.finder-filter-panel summary').click();
  }
  if(width!==768){
   await page.evaluate(async()=>{const images=[...document.images];images.forEach(i=>i.loading='eager');await Promise.all(images.map(i=>i.decode().catch(()=>{})));});
   await page.screenshot({path:`${output}${route==='/'?'home':route.slice(1).replaceAll('/','-')}-${width}.png`,fullPage:true});
   await page.screenshot({path:`${output}${route==='/'?'home':route.slice(1).replaceAll('/','-')}-${width}-top.png`,fullPage:false});
  }
 }
}
// Exercise genuine project artifacts, captions and progressive media controls.
let realImages=0, realFilms=0, realAudio=0, realDocuments=0;
for(const p of projects){
 await page.goto(`${base}/work/${p.slug}`);
 const artifacts=page.locator('.artifact-open');
 const count=await artifacts.count();
 if(count){
  await artifacts.first().click();
  assert.equal(await page.locator('dialog').evaluate(d=>d.open),true,`${p.slug} real viewer`);
  if(count>1){await page.keyboard.press('ArrowRight');assert.equal(await page.locator('.quicklook-title').textContent(),`2 / ${count}`);}
  await page.keyboard.press('Escape');realImages+=count;
 }
 assert.equal(await page.locator('iframe').count(),0,`${p.slug} player stays unloaded`);
 const film=page.locator('a.film[data-youtube]').first();
 if(await film.count()){
  await page.route('https://www.youtube-nocookie.com/**',route=>route.fulfill({body:'<!doctype html><title>Video test</title>'}));
  await film.click();assert.equal(await page.locator('iframe').count(),1);realFilms++;
 }
 for(const audio of await page.locator('audio').all()){assert.equal(await audio.getAttribute('preload'),'none');assert.ok(await audio.getAttribute('aria-label'));realAudio++;}
 for(const document of await page.locator('a.document').all()){assert.ok(await document.getAttribute('href'));assert.ok((await document.textContent()).trim());realDocuments++;}
}
console.log(`Genuine project controls: ${realImages} image artifacts, ${realFilms} embedded film controls, ${realAudio} audio players, ${realDocuments} documents.`);
const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:900}});
const reader=await noJs.newPage();
await reader.goto(base+'/work');
assert.equal(await reader.locator('.finder-item:visible').count(),visible.length,'JS-off archive stays complete');
await noJs.close();
await page.emulateMedia({reducedMotion:'reduce'});
await page.goto(base+'/work');
assert.equal(await page.locator('.finder-item:visible').count(),visible.length,'Reduced motion stays readable');
// Isolated interaction fixtures verify media controls even when a project has one artifact.
await page.setContent(`<html lang="en"><body><figure><a class="artifact-open" href="${base}/favicon.svg"><img alt="First archive artifact"></a><figcaption>First credit</figcaption></figure><figure><a class="artifact-open" href="${base}/favicon.svg?second"><img alt="Second archive artifact"></a><figcaption>Second credit</figcaption></figure><a class="film" data-youtube="fixture" href="https://www.youtube.com/watch?v=fixture"><span class="film-meta">Archive film</span></a></body></html>`);
await page.route('https://www.youtube-nocookie.com/**',route=>route.fulfill({body:'<!doctype html><title>Video fixture</title>'}));
await page.addScriptTag({type:'module',content:await readFile(new URL('../assets/archive.mjs',import.meta.url),'utf8')});
await page.waitForFunction(()=>Boolean(document.querySelector('dialog')));
await page.locator('.artifact-open').first().click();
assert.equal(await page.locator('dialog').evaluate(d=>d.open),true);
await page.keyboard.press('ArrowRight');
assert.equal(await page.locator('dialog img').getAttribute('alt'),'Second archive artifact');
assert.equal(await page.locator('dialog figcaption').textContent(),'Second credit');
await page.keyboard.press('ArrowLeft');
assert.equal(await page.locator('dialog img').getAttribute('alt'),'First archive artifact');
await page.keyboard.press('Escape');
assert.equal(await page.locator('dialog').evaluate(d=>d.open),false);
assert.equal(await page.locator('.artifact-open').first().evaluate(a=>a===document.activeElement),true,'Viewer restores focus');
assert.equal(await page.locator('iframe').count(),0,'No external player before click');
await page.locator('.film').click();
assert.match(await page.locator('iframe').getAttribute('src'),/^https:\/\/www.youtube-nocookie.com\/embed\/fixture/);
assert.deepEqual(errors,[]);
await browser.close();
console.log(`Archive: ${visible.length} records, bilingual filters/index/timeline, 1440/768/320, JS-off, reduced motion, image keyboard/focus, click-to-load video passed. Screenshots: ${output}`);
