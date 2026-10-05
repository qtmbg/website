// Interaction and motion: the desktop direction of 4 October 2026.
// The dock magnifies under a mouse and never moves the page; its tip flips
// with the dock's position; desktop items drag without following their link;
// reduced motion switches everything off live; touch keeps native scrolling;
// pages stay readable with JavaScript off.
import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';

const base=process.env.BASE_URL||'http://localhost:3017';
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[];
const width=locator=>locator.evaluate(e=>e.getBoundingClientRect().width);
try {
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(base);
 await expect(page.locator('html')).toHaveClass(/motion-ready/);

 /* the dock at the foot of the desktop */
 const tiles=page.locator('#site-nav a');
 await expect(tiles).toHaveCount(5);
 const mainTop=await page.locator('main').evaluate(e=>e.getBoundingClientRect().top);
 const third=await tiles.nth(2).boundingBox();
 assert.ok(third.y>900/2,'the dock should rest low on the home desktop');
 await page.mouse.move(third.x+third.width/2,third.y+third.height/2,{steps:6});
 await expect.poll(()=>width(tiles.nth(2))).toBeGreaterThan(56);
 const neighbour=await width(tiles.nth(1));
 assert.ok(neighbour>40.5&&neighbour<56,`a neighbour grows less than the hovered tile (${neighbour})`);
 assert.equal(Math.round(await width(tiles.nth(4))),40,'tiles beyond 100px stay at rest');
 assert.equal(await page.locator('main').evaluate(e=>e.getBoundingClientRect().top),mainTop,'magnifying the dock moved the page');
 const tip=page.locator('.dock-tip');
 await expect(tip).toBeVisible();
 await expect(tip).toHaveText('Thinking');
 assert.ok((await tip.boundingBox()).y<(await tiles.nth(2).boundingBox()).y,'the tip opens above a low dock');
 await page.mouse.move(8,300,{steps:4});
 await expect(tip).toBeHidden();
 await expect.poll(()=>width(tiles.nth(2))).toBe(40);

 /* desktop items drag and keep their link */
 const folder=page.locator('.desk-icon').first();
 const start=await folder.boundingBox();
 await page.mouse.move(start.x+40,start.y+28);
 await page.mouse.down();
 await page.mouse.move(start.x+40-300,start.y+28+150,{steps:10});
 await expect(folder).toHaveClass(/is-dragging/);
 await page.mouse.up();
 await expect(folder).not.toHaveClass(/is-dragging/);
 const dropped=await folder.boundingBox();
 assert.ok(Math.abs(dropped.x-(start.x-300))<4&&Math.abs(dropped.y-(start.y+150))<4,`the folder stays where it was dropped (${dropped.x-start.x}, ${dropped.y-start.y})`);
 assert.equal(new URL(page.url()).pathname,'/','a drag must not follow the link');
 await folder.click();
 await page.waitForURL('**/work/selvaggi');
 await page.goBack();

 /* the dock rises with the page and holds at the top */
 await page.evaluate(()=>scrollTo(0,1800));
 await expect.poll(()=>page.locator('.site-header').evaluate(e=>Math.round(e.getBoundingClientRect().top))).toBe(16);
 const first=await tiles.nth(0).boundingBox();
 await page.mouse.move(first.x+first.width/2,first.y+first.height/2,{steps:4});
 await expect(tip).toHaveText('Work');
 assert.ok((await tip.boundingBox()).y>(await tiles.nth(0).boundingBox()).y,'the tip opens below a pinned dock');
 await page.mouse.move(8,600);

 /* reduced motion, switched live */
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('html')).not.toHaveClass(/motion-ready/);
 assert.equal(await tiles.nth(0).evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 const again=await tiles.nth(1).boundingBox();
 await page.mouse.move(again.x+again.width/2,again.y+again.height/2,{steps:4});
 await page.waitForTimeout(400);
 assert.equal(Math.round(await width(tiles.nth(1))),40,'no magnification under reduced motion');
 await expect(tip).toBeVisible();
 await page.emulateMedia({reducedMotion:'no-preference'});
 await expect(page.locator('html')).toHaveClass(/motion-ready/);

 /* reveals, keyboard focus, form feedback */
 await page.goto(base+'/fr/lab');
 await page.locator('.lab-card').first().scrollIntoViewIfNeeded();
 await expect(page.locator('.lab-card').first()).toHaveClass(/is-revealed/);
 assert.equal(await page.locator('.lab-product-object img').count(),0);
 await expect(page.locator('.brand-preview')).toBeVisible();
 await page.locator('.lab-card').first().focus();
 assert.equal(await page.locator('.lab-card').first().evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
 await page.goto(base+'/fr/lab/the-brief-before-the-brief');
 const field=page.locator('.brief-form textarea').first();
 await field.fill('Clarifier une direction');
 await expect(field).toHaveAttribute('data-filled','true');
 await field.fill('');
 await expect(field).toHaveAttribute('data-filled','false');

 /* without JavaScript */
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const plain=await context.newPage();
 for(const route of ['/','/fr','/lab','/fr/lab','/practice','/fr/practice','/thinking','/fr/about']){
  assert.equal((await plain.goto(base+route)).status(),200);
  assert.equal(await plain.locator('h1').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await plain.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,route+' JS-off overflow');
  assert.equal(await plain.locator('main').isVisible(),true);
  assert.equal(await plain.locator('img[src*="quantum-aperture"],img[src$="compass.svg"],img[src$="mark.svg"]').count(),0);
  if(route==='/'||route==='/fr')assert.equal(await plain.locator('.desk-icon').first().evaluate(e=>getComputedStyle(e).opacity),'1',route+': desktop items hidden without JS');
 }
 await context.close();

 /* touch: native scrolling, taps follow links, the dock does not magnify */
 const touchContext=await browser.newContext({hasTouch:true,isMobile:true,viewport:{width:390,height:844},reducedMotion:'no-preference'});
 const touch=await touchContext.newPage();
 touch.on('pageerror',error=>errors.push(error.message));
 await touch.goto(base+'/fr');
 assert.equal(await touch.locator('.desk-icon').first().evaluate(e=>getComputedStyle(e).touchAction),'auto');
 await touch.locator('#site-nav a').first().tap();
 await touch.waitForURL('**/fr/work');
 assert.equal(Math.round(await width(touch.locator('#site-nav a').first())),Math.round(await width(touch.locator('#site-nav a').nth(1))));
 await touch.goto(base+'/fr');
 await touch.locator('.desk-icon').nth(1).tap();
 await touch.waitForURL('**/fr/work/verne-jewels');
 await touchContext.close();

 assert.deepEqual(errors,[]);
 console.log('PASS: dock magnifies under a mouse without moving the page; tips flip low and pinned; desktop items drag and keep their links; the dock holds at 16px; reduced motion switches live; reveals, keyboard focus and form feedback; 8 readable JS-off routes; native touch.');
} finally {await browser.close()}
