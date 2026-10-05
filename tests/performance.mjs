// A local first-viewport payload check, not a production Core Web Vitals score.
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const base=process.env.BASE_URL||'http://localhost:3017';
const b=await chromium.launch({channel:'chrome',headless:true});const results=[];
try{
 for(const route of ['/','/work','/work/diptyk','/work/la-minute-creative']){
  const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  await p.goto(base+route,{waitUntil:'networkidle'});
  const row=await p.evaluate(()=>({route:location.pathname,domReadyMs:performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,resourceBytes:performance.getEntriesByType('resource').reduce((n,e)=>n+e.encodedBodySize,0),resources:performance.getEntriesByType('resource').length,externalMedia:performance.getEntriesByType('resource').filter(e=>!e.name.startsWith(location.origin)).map(e=>e.name),iframes:document.querySelectorAll('iframe').length}));
  assert.ok(row.resourceBytes<3e6,`${route}: first viewport exceeded 3 MB`);
  assert.equal(row.iframes,0,'External players must wait for interaction');
  assert.deepEqual(row.externalMedia,[],'External media must wait for interaction');
  results.push(row);await p.close();
 }
 await writeFile('test-results/archive/performance.json',JSON.stringify({scope:'Local initial viewport. Does not establish production CWV.',results},null,2)+'\n');
 console.log('PASS: four initial viewports below 3 MB, no third-party media loaded and no embedded player before interaction.');
}finally{await b.close();}
