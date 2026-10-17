import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from '@playwright/test';

const base=(process.env.BASE_URL||'http://127.0.0.1:3017').replace(/\/$/,'');
const output=new URL('../test-results/home-featured/',import.meta.url).pathname;
await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[],report=[];
const sizes=[[375,844],[390,844],[768,1024],[1024,900],[1280,900],[1440,900],[1920,1080],[1000,600],[1280,600],[1440,600],[1440,720],[1440,820]];
const slugs=['selvaggi','verne-jewels','rapp-esen'];
try{
 const page=await browser.newPage({reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 for(const lang of ['en','fr'])for(const [width,height] of sizes){
  const prefix=lang==='fr'?'/fr':'';
  await page.setViewportSize({width,height});
  assert.equal((await page.goto(base+(prefix||'/'),{waitUntil:'networkidle'})).status(),200);
  await page.evaluate(()=>document.fonts.ready);
  const featured=page.locator('.featured-work .wall-item.is-featured');
  assert.deepEqual(await featured.evaluateAll(a=>a.map(e=>new URL(e.href).pathname)),slugs.map(s=>prefix+'/work/'+s));
  await featured.locator('img').evaluateAll(async imgs=>{for(const i of imgs){i.loading='eager';await i.decode();}});
  const imageWidths=await featured.locator('img').evaluateAll(a=>a.map(i=>i.getBoundingClientRect().width));
  assert.ok(Math.max(...imageWidths)-Math.min(...imageWidths)<2,'Equal featured image widths');
  const cards=page.locator('.home-testimonial');
  assert.equal(await cards.count(),3);
  assert.deepEqual(await cards.locator('blockquote').evaluateAll(a=>a.map(e=>e.lang)),['en','en','fr']);
  for(const a of await cards.locator('a[href^="/"]').all()){
   const href=await a.getAttribute('href');const response=await page.request.get(base+href.split('#')[0]);assert.equal(response.status(),200,href);
  }
  const geometry=await page.evaluate(()=>{
   const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
   const visible=e=>Boolean(e.getClientRects().length)&&getComputedStyle(e).visibility!=='hidden';
   const overlap=(a,b)=>Math.min(a.right,b.right)-Math.max(a.x,b.x)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y)>1;
   const hero=rect(document.querySelector('.hero'));
   const folders=[...document.querySelectorAll('.desk-icon')].filter(visible).map(rect);
   const cards=[...document.querySelectorAll('.home-testimonial')].map(rect);
   const protectedWidgets=[...document.querySelectorAll('.widget, .site-header')].filter(visible).map(rect);
   return {overflow:document.documentElement.scrollWidth>innerWidth+1,cards,folderOverlap:folders.some((a,i)=>folders.slice(i+1).some(b=>overlap(a,b))),heroOverlap:folders.some(a=>overlap(a,hero)),widgetOverlap:folders.some(a=>protectedWidgets.some(b=>overlap(a,b)))};
  });
  assert.equal(geometry.overflow,false,`${lang} ${width}×${height}: overflow`);
  if(width>=1000){
   assert.equal(await page.locator('.desk-icon:visible').count(),6,'Every folder remains discoverable on short desktops');
   assert.equal(geometry.folderOverlap,false,`${width}×${height}: folders overlap`);
   assert.equal(geometry.heroOverlap,false,`${width}×${height}: folder covers hero`);
   assert.equal(geometry.widgetOverlap,false,`${width}×${height}: folder covers widget/dock`);
  }
  if(width>=768){
   assert.ok(Math.max(...geometry.cards.map(c=>c.y))-Math.min(...geometry.cards.map(c=>c.y))<2,'Desktop/tablet testimonial row');
   assert.ok(Math.max(...geometry.cards.map(c=>c.height))-Math.min(...geometry.cards.map(c=>c.height))<2,'Equal-height cards');
  }else assert.ok(geometry.cards.every((c,i)=>i===0||c.y>=geometry.cards[i-1].bottom),'Mobile testimonial stack');
  if([390,768,1440].includes(width)&&height>=844){
   const style='.site-header,.skip-link{visibility:hidden!important}';
   await page.locator('.home-testimonials').screenshot({path:`${output}${lang}-${width}-testimonials.png`,style});
   await page.locator('.featured-work').screenshot({path:`${output}${lang}-${width}-work.png`,style});
  }
  if(width===1440&&height===900){await page.goto(base+(prefix||'/'));await page.screenshot({path:`${output}${lang}-desktop.png`});}
  report.push({lang,width,height,...geometry});
 }
 for(const lang of ['en','fr'])for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:1000});
  await page.goto(base+(lang==='fr'?'/fr':'')+'/work');
  const cards=page.locator('.case-card');assert.equal(await cards.count(),3);
  assert.deepEqual(await cards.evaluateAll(a=>a.map(e=>new URL(e.href).pathname.split('/').pop())),slugs);
  for(const card of await cards.all())assert.equal((await page.request.get(base+await card.getAttribute('href'))).status(),200);
  if(width>=768)assert.equal(await cards.last().evaluate(e=>getComputedStyle(e).zIndex),'12','Third case stacks above the first two');
  const image=page.locator('.visual-rapp-esen img');await image.evaluate(async i=>{i.loading='eager';await i.decode();});
  assert.ok(await image.evaluate(i=>i.naturalWidth>0));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 }
 const plain=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 for(const lang of ['en','fr']){const p=await plain.newPage();await p.goto(base+(lang==='fr'?'/fr':'/'));assert.equal(await p.locator('.home-testimonial').count(),3);assert.equal(await p.locator('.featured-work .is-featured').count(),3);await p.close();}
 await plain.close();assert.deepEqual(errors,[]);
 await writeFile(output+'report.json',JSON.stringify(report,null,2)+'\n');
 console.log('PASS: 24 EN/FR home layouts including 600/720/820px desktop heights, 6 Work layouts; equal featured thumbnails; testimonial row/stack; no overflow or folder/hero/widget/dock overlap; links/images; JS-off; no browser errors.');
}finally{await browser.close();}
