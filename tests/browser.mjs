import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { territories, processSteps } from '../app.js';

const browser = await chromium.launch({ channel:'chrome', headless:true });
const output = new URL('../test-results/',import.meta.url).pathname;
await mkdir(output,{recursive:true});
const page = await browser.newPage({viewport:{width:1440,height:1000}, reducedMotion:'reduce'});
const errors=[];
page.on('pageerror',error=>errors.push(error.message));
try {
  await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.instrument').count(),6);
  await page.screenshot({path:`${output}desktop.png`,fullPage:true});
  await page.locator('[data-territory="brand"]').first().click();
  await page.locator('#detail-dialog[open]').waitFor();
  assert.match(await page.locator('#dialog-title').textContent(),/Brand/);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.instrument-0').evaluate(el=>el===document.activeElement),true);
  await page.locator('#box-toggle').click();
  assert.equal(await page.locator('#box-toggle').getAttribute('aria-expanded'),'false');
  assert.equal(await page.locator('#instruments').evaluate(el=>el.inert),true);
  await page.locator('#box-toggle').click();
  await page.locator('[data-accordion="systems"]').click();
  assert.equal(await page.locator('#territory-systems').isVisible(),true);
  await page.locator('#lab-brief').click();
  await page.locator('[name="company"]').fill('Acme Test');
  await page.locator('[name="change"]').fill('<script>alert("test")</script> Rebuild the website');
  await page.locator('[name="result"]').fill('Make the offer clear');
  await page.locator('[name="contact"]').fill('person@example.com');
  await page.locator('#brief-form [type="submit"]').click();
  assert.match(await page.locator('.brief-result').textContent(),/<script>alert/);
  assert.equal(await page.locator('.brief-result script').count(),0);
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-brief').click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(),'quantum-brief-en.txt');
  await page.locator('#edit-brief').click();
  assert.equal(await page.locator('[name="company"]').inputValue(),'Acme Test');
  await page.keyboard.press('Escape');
  await page.locator('#language').click();
  assert.equal(await page.locator('html').getAttribute('lang'),'fr');
  assert.match(await page.locator('h1').textContent(),/Mieux/);
  await page.locator('[data-start="project"]').click();
  assert.match(await page.locator('#dialog-title').textContent(),/Dites-nous/);
  await page.keyboard.press('Escape');
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('html').getAttribute('lang'),'fr');
  await page.screenshot({path:`${output}desktop-fr.png`,fullPage:true});
  await page.locator('#language').click();
  for(const language of ['en','fr']) {
  if(await page.locator('html').getAttribute('lang')!==language) await page.locator('#language').click();
  for(const width of [375,390,540,541,768,1024,1440,1920]) {
    await page.setViewportSize({width,height:900});
    await page.evaluate(()=>window.scrollTo(0,0));
    const overflow = await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    assert.equal(overflow,false,`Horizontal overflow at ${width}px (${language})`);
    for(const [index,territory] of territories.entries()) {
      const tool=page.locator(`.instrument-${index}`);
      const bounds=await tool.boundingBox();
      assert.ok(bounds.x>=0 && bounds.x+bounds.width<=width,`Tool ${territory.id} outside ${width}px (${language})`);
      await tool.click();
      assert.equal(await page.locator('#dialog-title').textContent(),territory[language].name);
      await page.keyboard.press('Shift+Tab');
      assert.equal(await page.evaluate(()=>document.activeElement.closest('#detail-dialog')!==null),true);
      await page.keyboard.press('Tab');
      assert.equal(await page.locator('.dialog-close').evaluate(el=>el===document.activeElement),true);
      await page.keyboard.press('Escape');
      assert.equal(await tool.evaluate(el=>el===document.activeElement),true);
    }
    if(width===390) {
      await page.screenshot({path:`${output}${language==='en'?'mobile':'mobile-fr'}.png`,fullPage:true});
      await page.locator('#menu-toggle').click();
      assert.equal(await page.locator('#mobile-nav').isVisible(),true);
      await page.locator('#mobile-nav a[href="#lab"]').click();
      assert.equal(await page.locator('#mobile-nav').isVisible(),false);
      await page.locator('#lab-brief').click();
      assert.equal(await page.locator('#brief-form').isVisible(),true);
      await page.keyboard.press('Escape');
    }
  }
  }
  // The four-stage workbench keeps its state on language change, supports keyboard
  // navigation and points to real next steps, including under reduced motion.
  await page.setViewportSize({width:1440,height:1000});
  for(const language of ['en','fr']) {
    if(await page.locator('html').getAttribute('lang')!==language) await page.locator('#language').click();
    for(const [index,step] of processSteps.entries()) {
      await page.locator(`#step-${index}`).click();
      assert.equal(await page.locator('#process-title').textContent(),step[language].title);
      assert.equal(await page.locator('#process-link').getAttribute('href'),step.href);
      assert.equal(await page.locator('#process-panel').getAttribute('aria-labelledby'),`step-${index}`);
      assert.equal(await page.locator('[data-process-step][aria-selected="true"]').count(),1);
      assert.equal(await page.locator('[data-process-step][tabindex="0"]').count(),1);
    }
    await page.locator('#step-3').press('ArrowRight');
    assert.equal(await page.locator('#step-0').evaluate(el=>el===document.activeElement),true);
    await page.locator('#step-0').press('End');
    assert.equal(await page.locator('#step-3').getAttribute('aria-selected'),'true');
    await page.locator('#step-3').press('Home');
    await page.locator('#step-0').press('ArrowLeft');
    assert.equal(await page.locator('#step-3').evaluate(el=>el===document.activeElement),true);
  }
  await page.locator('#language').click();
  assert.equal(await page.locator('#step-3').getAttribute('aria-selected'),'true');
  assert.equal(await page.locator('#process-title').textContent(),processSteps[3].en.title);
  for(const id of ['selvaggi','verne','quantum']) {
    await page.locator(`[data-case="${id}"]`).click();
    assert.equal(await page.locator('#detail-dialog').isVisible(),true);
    await page.keyboard.press('Escape');
  }
  await page.locator('#privacy-button').click();
  assert.match(await page.locator('#dialog-title').textContent(),/Privacy/);
  await page.keyboard.press('Escape');
  await page.locator('.formats summary').click();
  assert.equal(await page.locator('.format-grid').isVisible(),true);
  await page.locator('.formats summary').click();
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForFunction(()=>document.querySelector('#motion-toggle').getAttribute('aria-pressed')==='false');
  assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'),'false');
  await page.locator('#motion-toggle').click();
  assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'),'true');
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('body').evaluate(el=>el.classList.contains('motion-paused')),true);
  assert.equal(await page.locator('.ticker>div').evaluate(el=>getComputedStyle(el).animationName),'none');

  const response=await page.request.get('http://localhost:3000/package.json');
  assert.equal(response.status(),404);
  assert.deepEqual(errors,[]);
  console.log('PASS: EN/FR layouts at eight widths, all six tool dialogs, keyboard focus containment/restoration, box controls, accordions, safe brief rendering, download, edit, bilingual persistence, navigation, server access controls, four process states, process keyboard navigation, case panels, formats, live reduced-motion preference and no runtime errors.');
} finally { await browser.close(); }