// Focused release checks; works against a local build or the production domain.
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { perspectives } from '../src/perspectives.mjs';

const base=(process.env.BASE_URL||'http://127.0.0.1:3017').replace(/\/$/,'');
const output=new URL('../test-results/recovery/',import.meta.url).pathname;
await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[];
let images=0, pages=0;
try {
 for(const width of [380,1440]) for(const lang of ['en','fr']) {
  const prefix=lang==='fr'?'/fr':'';
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  for(const route of ['/work/rapp-esen','/people']) {
   assert.equal((await page.goto(base+prefix+route,{waitUntil:'networkidle'})).status(),200);
   assert.equal(await page.locator('html').getAttribute('lang'),lang);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://thequantumbranding.com'+prefix+route);
   assert.equal(await page.locator('.language-link').getAttribute('href'),(lang==='fr'?'':'/fr')+route);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   if(route==='/people') {
    assert.equal(await page.locator('.people-stream .perspective').count(),5);
    for(const p of perspectives) {
     const figure=page.locator(`[data-perspective="${p.id}"]`);
     const quote=await figure.locator('blockquote').innerText();
     for(const text of p.full_original_text||[p.approved_excerpt]) assert.ok(quote.includes(text),p.id+': original quotation');
     assert.equal(await figure.locator('.perspective-author').innerText(),p.author_name);
     assert.equal(await figure.locator('a').first().getAttribute('href'),p.source_url);
    }
    await page.locator('.perspective-index a').last().click();
    assert.ok(page.url().endsWith('#p-sander-gansen'));
   } else {
    assert.equal(await page.locator('.case-figure img').count(),12);
    await page.locator('.case-figure img').evaluateAll(async imgs=>{
     for(const img of imgs){img.loading='eager';await img.decode();}
    });
    for(const img of await page.locator('.case-figure img').all()) {
     assert.ok(await img.evaluate(i=>i.naturalWidth>0&&i.complete));
     assert.ok(await img.getAttribute('alt'));
     images++;
    }
    assert.equal(await page.locator('.people-involved .perspective-author').innerText(),'Françoise Rapp');
    assert.equal(await page.locator('.people-involved a').getAttribute('href'),prefix+'/people');
   }
   await page.screenshot({path:`${output}${lang}-${width}-${route.split('/').pop()}.png`,fullPage:true});
   pages++;
  }
  await page.goto(base+(prefix||'/'),{waitUntil:'networkidle'});
  const audio=page.locator('[data-audio-el]');
  assert.equal(await audio.evaluate(a=>a.paused),true);
  // Use the accessible control name defined by the existing audio widget.
  const button=page.getByRole('button',{name:lang==='fr'?'Écouter la présentation':'Play the introduction'});
  await button.click();
  await page.waitForFunction(()=>{const a=document.querySelector('[data-audio-el]');return !a.paused&&a.currentTime>0;});
  await page.locator('[data-audio-toggle]').click();
  assert.equal(await audio.evaluate(a=>a.paused),true);
  const response=await page.request.get(base+`/audio/nizzar-introduction-${lang}.mp3`,{headers:{Range:'bytes=0-1023'}});
  assert.equal(response.status(),206,'Audio supports seeking');
  assert.equal((await response.body()).length,1024);
  assert.equal(await page.locator('.desk-scene .desk-icon').count(),6);
  assert.equal(await page.locator(`.widget-apps a[href="${prefix}/people"]`).count(),1);
  assert.ok(await page.locator('.widget-calendar').count());
  const founder=page.locator('.widget-founder img');
  await founder.evaluate(async i=>{i.loading='eager';await i.decode();});
  assert.ok(await founder.evaluate(i=>i.naturalWidth>0));
  await page.goto(base+prefix+'/about');
  const portrait=page.locator('.founder-portrait');
  await portrait.evaluate(async i=>{i.loading='eager';await i.decode();});
  assert.ok(await portrait.evaluate(i=>i.naturalWidth>0));
  await page.close();
 }
 assert.deepEqual(errors,[]);
 console.log(`PASS: ${pages} EN/FR case/people page loads at 380/1440px; ${images} decoded case images; verbatim recommendations and sources; language links/canonicals; audio playback/pause/range seeking; desktop folders/calendar and About portrait; no browser errors.`);
} finally {await browser.close();}
