// Focused regressions for complete brief exports, desktop actions and article dates.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium, expect } from '@playwright/test';
import { buildBrief } from '../src/shared.mjs';
import { makePages } from '../src/pages.mjs';
import { articles } from '../src/articles.mjs';

const base = process.env.BASE_URL || 'http://localhost:3017';
const changedArticles = structuredClone(articles);
for (const lang of ['en', 'fr']) changedArticles[0][lang].date = '2026-10-08';
for (const lang of ['en', 'fr']) {
  const page = makePages(changedArticles).find(p => p.lang === lang && p.basePath === `/thinking/${articles[0].slug}`);
  const expected = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  }).format(new Date('2026-10-08T00:00:00Z'));
  assert.ok(page.body.includes(`<time datetime="2026-10-08">${expected}</time>`));
}

const browser = await chromium.launch({channel: 'chrome', headless: true});
const errors = [];
try {
  for (const lang of ['en', 'fr']) {
    const page = await browser.newPage({viewport: {width: 1440, height: 900}, acceptDownloads: true});
    page.on('pageerror', e => errors.push(e.message));
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {value: {writeText: async text => {window.copiedBrief = text;}}});
    });
    await page.goto(`${base}${lang === 'fr' ? '/fr' : ''}/lab/the-brief-before-the-brief`);
    const values = {
      company: 'Contexte & company 🧭',
      change: ('Changer éà 漢字 🧭 & ?\n').repeat(120),
      result: ('Résultat entier: éà 漢字 🧭\n').repeat(60),
      constraints: 'Dernière contrainte à préserver.',
      contact: 'test@example.com'
    };
    assert.ok(values.change.length <= 3000 && values.result.length <= 2000);
    await page.locator('details').evaluate(e => { e.open = true; });
    for (const [name, value] of Object.entries(values)) await page.locator(`[name="${name}"]`).fill(value);
    await page.locator('#brief-form button[type="submit"]').click();
    await expect(page.locator('#brief-output')).toBeVisible();
    const expected = buildBrief(values, lang);
    assert.equal(await page.locator('#brief-output pre').textContent(), expected, `${lang}: complete preview`);
    await expect(page.locator('[data-email-draft]')).toHaveAttribute('aria-disabled', 'true');
    assert.equal(await page.locator('[data-email-draft]').getAttribute('href'), null, 'long draft must not expose a partial email');
    await expect(page.locator('#email-draft-help')).toContainText('me@qtmbg.com');
    await page.locator('#copy-brief').click();
    assert.equal(await page.evaluate(() => window.copiedBrief), expected, `${lang}: complete clipboard`);
    const downloadEvent = page.waitForEvent('download');
    await page.locator('#download-brief').click();
    const download = await downloadEvent;
    assert.equal(await readFile(await download.path(), 'utf8'), expected, `${lang}: complete download`);
    assert.equal(download.suggestedFilename(), `quantum-brief-${lang}.txt`);
    // Short drafts restore a full mailto, including every UTF-8 character.
    const short = {company: 'Élan', change: 'Une décision 🧭', result: 'Un résultat entier', constraints: '', contact: ''};
    for (const [name, value] of Object.entries(short)) await page.locator(`[name="${name}"]`).fill(value);
    await page.locator('#brief-form button[type="submit"]').click();
    const uri = new URL(await page.locator('[data-email-draft]').getAttribute('href'));
    assert.equal(uri.searchParams.get('body'), buildBrief(short, lang));
    assert.equal(await page.locator('[data-email-draft]').getAttribute('aria-disabled'), null);
    await page.goto(`${base}${lang === 'fr' ? '/fr' : ''}/`);
    const actions = page.locator('.desk-scene a, .desk-scene button');
    for (const action of await actions.all()) {
      assert.equal(await action.evaluate(e => Boolean(e.closest('[aria-hidden="true"]'))), false);
      assert.equal(await action.getAttribute('tabindex'), null);
      assert.ok(await action.evaluate(e => (e.getAttribute('aria-label') || e.textContent || '').trim()), 'every desktop action has a name');
    }
    const next = page.getByRole('button', {name: lang === 'fr' ? 'Texte suivant' : 'Next essay'});
    await next.focus();
    await expect(next).toBeFocused();
    assert.equal(await next.evaluate(e => getComputedStyle(e).outlineStyle), 'solid');
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-player-pos]')).toHaveText('02');
    await expect(page.locator('.control-play')).toHaveAttribute('aria-label', new RegExp(articles[1][lang].title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    const folder = page.locator('.desk-icon').first();
    // A pointer drag must not swallow the next keyboard activation.
    const box = await folder.boundingBox();
    await page.mouse.move(box.x + 30, box.y + 20);
    await page.mouse.down();
    await page.mouse.move(box.x - 100, box.y + 70, {steps: 8});
    await page.mouse.up();
    assert.equal(new URL(page.url()).pathname, lang === 'fr' ? '/fr/' : '/');
    await folder.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(`**${lang === 'fr' ? '/fr' : ''}/work/selvaggi`);
    await page.close();
  }
  assert.deepEqual(errors, []);
  console.log('PASS: EN/FR full long brief preview/copy/download, short full mailto, accessible named desktop actions, keyboard player/folder navigation, localized actual UTC dates, no JavaScript errors.');
} finally { await browser.close(); }
