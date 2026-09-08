import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const output=new URL('../test-results/visual/',import.meta.url).pathname;
await mkdir(output,{recursive:true});
const page=await browser.newPage({reducedMotion:'reduce'});
const report=[];
try {
await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
for(const lang of ['en','fr']) {
 if(await page.locator('html').getAttribute('lang')!==lang) await page.locator('#language').click();
 for(const width of [375,390,768,1024,1440,1920]) {
  await page.setViewportSize({width,height:1000});
  await page.evaluate(()=>window.scrollTo(0,0));
  const geometry=await page.evaluate(()=> {
    const bad=[];
    for(const el of document.querySelectorAll('h1,h2,h3,p,.instrument,.hero-invitation,.box-note,.process-tabs button')) {
      if(!el.getClientRects().length) continue;
      const r=el.getBoundingClientRect();
      if(r.left < -1 || r.right > innerWidth+1 || el.scrollWidth>el.clientWidth+2) bad.push({tag:el.tagName,text:el.textContent.slice(0,70),left:r.left,right:r.right,scroll:el.scrollWidth,client:el.clientWidth});
    }
    const invitation=document.querySelector('.hero-invitation').getBoundingClientRect();
    for(const tool of document.querySelectorAll('.instrument')) {
      const r=tool.getBoundingClientRect();
      if(Math.min(r.right,invitation.right)>Math.max(r.left,invitation.left) && Math.min(r.bottom,invitation.bottom)>Math.max(r.top,invitation.top)) bad.push({text:tool.textContent,issue:'Tool overlaps the commercial invitation'});
    }
    return {width:innerWidth,document:document.documentElement.scrollWidth,bad};
  });
  report.push({lang,width,...geometry});
  await page.screenshot({path:`${output}${lang}-${width}-hero.png`});
  for(const id of ['intro','work','practice','lab','nizzar','start']) {
    await page.locator(`#${id}`).screenshot({path:`${output}${lang}-${width}-${id}.png`});
  }
  await page.locator('.site-footer').screenshot({path:`${output}${lang}-${width}-footer.png`});
 }
}
await writeFile(`${output}report.json`,JSON.stringify(report,null,2));
const bad=report.filter(row=>row.bad.length||row.document>row.width);
console.log(JSON.stringify(bad,null,2));
assert.equal(bad.length,0,'Visual geometry violations: inspect test-results/visual/report.json');
console.log('PASS: 12 EN/FR viewport combinations; 96 section screenshots; no overflowing headings, paragraphs, tool controls or page widths.');
} finally {await browser.close();}
