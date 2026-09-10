// End-to-end checks in Chrome against a running server (BASE_URL).
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { contactEmail } from '../src/shared.mjs';

const base = (process.env.BASE_URL || 'http://localhost:3017').replace(/\/$/, '');
const output = new URL('../test-results/', import.meta.url).pathname;
await mkdir(output, { recursive: true });

const routes = [
  '/', '/practice', '/practice/method', '/work', '/work/quantum-branding',
  '/thinking', '/thinking/the-collapse', '/lab', '/lab/the-brief-before-the-brief',
  '/about', '/start', '/notes'
];
const all = [...routes, ...routes.map(r => (r === '/' ? '/fr' : `/fr${r}`))];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const problems = [];
const checked = [];

function watch(page, label) {
  page.on('pageerror', error => problems.push(`${label}: page error — ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error') problems.push(`${label}: console — ${message.text()}`);
  });
  page.on('requestfailed', request => {
    if (request.url().startsWith(base)) problems.push(`${label}: failed request — ${request.url()}`);
  });
}

try {
  /* ---------------------------------------------- every route, two widths */
  for (const [width, height, tag] of [[1440, 1000, 'desktop'], [380, 780, 'mobile']]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    for (const route of all) {
      watch(page, `${tag} ${route}`);
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, `${route} returned ${response.status()}`);
      await page.evaluate(() => document.fonts.ready);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (overflow > 1) problems.push(`${route} @${window?.innerWidth ?? width}px: document overflows by ${overflow}px`);

      const lang = await page.locator('html').getAttribute('lang');
      assert.equal(lang, route.startsWith('/fr') ? 'fr' : 'en', `${route}: wrong lang attribute`);
      assert.ok((await page.locator('h1').count()) >= 1, `${route}: no h1`);
      assert.equal(await page.locator('.site-header .contact-link').count(), 1, `${route}: no persistent CTA`);
      checked.push(`${tag} ${route}`);
    }
    await page.close();
  }

  /* ------------------------------------------------------- mobile hero fit */
  const phone = await browser.newPage({ viewport: { width: 380, height: 780 }, reducedMotion: 'reduce' });
  watch(phone, 'mobile hero');
  for (const route of ['/', '/fr']) {
    await phone.goto(base + route, { waitUntil: 'networkidle' });
    await phone.evaluate(() => document.fonts.ready);
    const fits = await phone.evaluate(() => {
      const cta = document.querySelector('.hero .button').getBoundingClientRect();
      const h1 = document.querySelector('.hero h1').getBoundingClientRect();
      return { bottom: Math.round(cta.bottom), viewport: innerHeight, top: Math.round(h1.top) };
    });
    assert.ok(fits.bottom <= fits.viewport,
      `${route}: hero CTA sits at ${fits.bottom}px, below the ${fits.viewport}px fold`);
    assert.ok(fits.top >= 0, `${route}: hero headline starts above the fold`);
  }

  /* ------------------------------------------------------------ mobile menu */
  await phone.goto(base + '/', { waitUntil: 'networkidle' });
  const toggle = phone.locator('.menu-toggle');
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(await phone.locator('#site-nav').isVisible(), true, 'mobile menu did not open');
  await phone.keyboard.press('Escape');
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
  await toggle.click();
  await phone.locator('#site-nav a', { hasText: 'Work' }).click();
  await phone.waitForURL('**/work');
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false', 'menu stayed open after navigating');
  await phone.screenshot({ path: `${output}mobile.png`, fullPage: false });
  await phone.goto(base + '/fr', { waitUntil: 'networkidle' });
  await phone.screenshot({ path: `${output}mobile-fr.png`, fullPage: false });
  await phone.close();

  /* -------------------------------------------------------- language switch */
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  watch(page, 'desktop flows');
  await page.goto(base + '/practice/method', { waitUntil: 'networkidle' });
  await page.locator('.language-link').click();
  await page.waitForURL('**/fr/practice/method');
  assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
  assert.match(await page.locator('.method-grid h3').first().textContent(), /Observe/);
  await page.locator('.language-link').click();
  await page.waitForURL(url => url.pathname === '/practice/method');
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');

  /* ------------------------------------------------- downloadable artefacts */
  for (const [selector, filename] of [
    ['a[href="/assets/the-collapse-en.svg"]', 'the-collapse-en.svg']
  ]) {
    const wait = page.waitForEvent('download');
    await page.locator(selector).first().click();
    assert.equal((await wait).suggestedFilename(), filename);
  }
  for (const url of ['/downloads/quantum-branding-brochure-en.pdf', '/downloads/quantum-branding-brochure-fr.pdf']) {
    const response = await page.request.get(base + url);
    assert.equal(response.status(), 200, `${url} is not served`);
    assert.equal(response.headers()['content-type'], 'application/pdf', `${url} wrong content type`);
    assert.ok((await response.body()).length > 40_000, `${url} looks truncated`);
  }

  /* --------------------------------------------------------------- the brief */
  await page.goto(base + '/lab/the-brief-before-the-brief', { waitUntil: 'networkidle' });
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  const posts = [];
  page.on('request', request => { if (request.method() !== 'GET') posts.push(request.url()); });

  await page.locator('#brief-form [type="submit"]').click();
  assert.equal(await page.locator('#brief-output').isVisible(), false, 'empty brief was accepted');

  await page.locator('[name="company"]').fill('Acme Test');
  await page.locator('[name="change"]').fill('<script>alert(1)</script> Rebuild the website');
  await page.locator('[name="result"]').fill('An offer people understand');
  await page.locator('#brief-form [type="submit"]').click();
  await page.locator('#brief-output').waitFor({ state: 'visible' });

  const brief = await page.locator('#brief-output pre').textContent();
  assert.match(brief, /Rebuild the website/);
  assert.match(brief, /<script>alert\(1\)<\/script>/, 'input should be shown literally');
  assert.equal(await page.locator('#brief-output script').count(), 0, 'input was injected as markup');

  await page.locator('#copy-brief').click();
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), brief, 'copy did not match');

  const download = page.waitForEvent('download');
  await page.locator('#download-brief').click();
  assert.equal((await download).suggestedFilename(), 'quantum-brief-en.txt');

  const draft = new URL(await page.locator('[data-email-draft]').getAttribute('href'));
  assert.equal(draft.protocol, 'mailto:');
  assert.equal(decodeURIComponent(draft.pathname), contactEmail);
  assert.match(draft.searchParams.get('body'), /Rebuild the website/);

  await page.locator('#edit-brief').click();
  assert.equal(await page.locator('[name="company"]').inputValue(), 'Acme Test', 'answers were lost');
  assert.deepEqual(posts, [], `the page sent data on its own: ${posts.join(', ')}`);

  // French edition of the same instrument
  await page.goto(base + '/fr/lab/the-brief-before-the-brief', { waitUntil: 'networkidle' });
  await page.locator('[name="change"]').fill('Repenser le site');
  await page.locator('[name="result"]').fill('Une offre claire');
  await page.locator('#brief-form [type="submit"]').click();
  await page.locator('#brief-output').waitFor({ state: 'visible' });
  assert.match(await page.locator('#brief-output pre').textContent(), /POINT DE DÉPART/);

  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${output}desktop.png`, fullPage: true });
  await page.goto(base + '/fr', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${output}desktop-fr.png`, fullPage: true });
  await page.close();

  if (problems.length) {
    console.error(problems.join('\n'));
    assert.fail(`${problems.length} browser problem(s)`);
  }
  console.log(`PASS: ${checked.length} page loads across ${all.length} routes at 1440px and 380px.`);
  console.log('PASS: no console errors, no page errors, no failed requests, no horizontal overflow.');
  console.log('PASS: mobile menu, EN/FR switching, diagram + brochure downloads, brief copy/download/email draft.');
  console.log('PASS: nothing is transmitted without the visitor acting.');
} finally {
  await browser.close();
}
