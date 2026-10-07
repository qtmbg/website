import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.BASE_URL || 'http://localhost:3026';
const slugs = ['africa-business-school', 'quantum-branding', 'brandos', 'rbmg', 'energy-cube', 'zone-aire'];
const out = new URL('../test-results/practice/', import.meta.url).pathname;
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [], checks = [];
try {
  for (const javascript of [true, false]) {
    const context = await browser.newContext({ javaScriptEnabled: javascript, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.url().startsWith(base) && r.status() >= 400) errors.push(r.status()+' '+r.url()); });
    for (const width of [1440, 380, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of slugs) for (const lang of ['en','fr']) {
        const route = (lang === 'fr' ? '/fr' : '')+'/work/'+slug;
        const response = await page.goto(base+route, { waitUntil:'load' });
        assert.equal(response.status(), 200, route);
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator('h1').count(), 1, route);
        assert.equal(await page.locator('html').getAttribute('lang'), lang);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth+1), false, `${route} @${width}px JS=${javascript}`);
        assert.ok(await page.locator('.info-panel').isVisible());
        assert.ok(await page.locator('.standfirst').isVisible());
        if (lang === 'fr') assert.doesNotMatch(await page.locator('main').innerText(), /\bpresent\b/);
        assert.equal(await page.locator(`main a[href="https://nizzar.com/work/${slug}"]`).count(), 1);
        checks.push({route,width,javascript});
        if (javascript && width !== 380) await page.screenshot({ path:out+`${lang}-${slug}-${width}.png`,fullPage:true });
      }
    }
    await context.close();
  }
  assert.deepEqual(errors, []);
  await writeFile(out+'results.json', JSON.stringify({checks,errors},null,2));
  console.log(`${checks.length} browser checks passed; no overflow, local HTTP failures or page errors; JS on/off.`);
} finally { await browser.close(); }
