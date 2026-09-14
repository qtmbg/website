import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {stat} from 'node:fs/promises';

const base=process.env.BASE_URL||'http://localhost:3017';
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[];
try {
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(base);
 await expect(page.locator('html')).toHaveClass(/motion-ready/);
 const art=page.locator('.quantum-aperture img');
 assert.equal(await art.evaluate(e=>e.complete&&e.naturalWidth>0),true);
 await expect.poll(()=>art.evaluate(e=>getComputedStyle(e).animationName)).toBe('aperture-arrive');
 assert.equal(await art.evaluate(e=>getComputedStyle(e).animationIterationCount),'1','No decorative infinite loop');
 const scene=page.locator('.visual-scene');
 await scene.hover({position:{x:120,y:140}});
 await expect.poll(()=>scene.evaluate(e=>e.style.getPropertyValue('--tilt-x'))).not.toBe('');
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('html')).not.toHaveClass(/motion-ready/);
 assert.equal(await scene.evaluate(e=>e.style.getPropertyValue('--tilt-x')),'');
 assert.equal(await art.evaluate(e=>getComputedStyle(e).animationName),'none');
 assert.equal(await page.locator('.quantum-aperture').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 assert.equal(await page.locator('h1').evaluate(e=>getComputedStyle(e).opacity),'1');
 await page.emulateMedia({reducedMotion:'no-preference'});
 await expect(page.locator('html')).toHaveClass(/motion-ready/);
 assert.equal(await art.evaluate(e=>getComputedStyle(e).animationName),'none','Completed entrance must not replay when motion is re-enabled');
 await scene.hover({position:{x:180,y:180}});
 await expect.poll(()=>scene.evaluate(e=>e.style.getPropertyValue('--tilt-x'))).not.toBe('');
 await page.mouse.move(0,0);
 await expect.poll(()=>scene.evaluate(e=>e.style.getPropertyValue('--tilt-x'))).toBe('');
 assert.notEqual(await scene.evaluate(e=>e.style.getPropertyValue('--depth')),'','Pointer exit must retain scroll depth');
 await page.locator('.site-footer').scrollIntoViewIfNeeded();
 await expect(scene).not.toHaveClass(/is-in-view/);
 assert.equal(await art.evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
 await page.goto(base+'/fr/lab');
 await page.locator('.lab-card').first().scrollIntoViewIfNeeded();
 await expect(page.locator('.lab-card').first()).toHaveClass(/has-entered/);
 assert.equal(await page.locator('.lab-product-object img').count(),1);
 assert.match(await page.locator('.lab-product-object img').getAttribute('src'),/mark.svg$/);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('.lab-card').first().focus();
 assert.equal(await page.locator('.lab-card').first().evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const plain=await context.newPage();
 for(const route of ['/','/fr','/lab','/fr/lab','/practice','/fr/practice','/thinking','/fr/about']){
  assert.equal((await plain.goto(base+route)).status(),200);
  assert.equal(await plain.locator('h1').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await plain.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,route+' JS-off overflow');
  assert.equal(await plain.locator('main').isVisible(),true);
 }
 await context.close();
 assert.ok((await stat(new URL('../assets/illustrations/quantum-aperture.webp',import.meta.url))).size<100000);
 assert.ok((await stat(new URL('../assets/illustrations/quantum-aperture-small.webp',import.meta.url))).size<40000);
 assert.deepEqual(errors,[]);
 console.log('PASS: finite motion; responsive asset budgets; pointer enter/leave; live reduced-motion switching; offscreen pause; keyboard focus; 8 JS-off routes.');
} finally {await browser.close()}
