// Sweep every generated route at the narrowest supported viewport.
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {makePages} from '../src/pages.mjs';
import {articles} from '../src/articles.mjs';
const b=await chromium.launch({channel:'chrome',headless:true});
try{
 const p=await b.newPage({viewport:{width:320,height:900},reducedMotion:'reduce'});
 for(const item of makePages(articles)){
  const r=await p.goto((process.env.BASE_URL||'http://localhost:3017')+item.path,{waitUntil:'load'});
  assert.equal(r.status(),200,item.path);await p.evaluate(()=>document.fonts.ready);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${item.path}: 320px document overflow`);
 }
 console.log(`PASS: ${makePages(articles).length} generated pages at 320px, both languages, no document overflow.`);
}finally{await b.close();}
