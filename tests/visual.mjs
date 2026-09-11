// Geometry sweep: every route, both languages, six widths. No overflow allowed.
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = (process.env.BASE_URL || 'http://localhost:3017').replace(/\/$/, '');
const output = new URL('../test-results/visual/', import.meta.url).pathname;
await mkdir(output, { recursive: true });

const routes = ['/', '/practice', '/practice/method', '/work', '/work/selvaggi',
  '/thinking', '/thinking/one-page-many-arguments', '/lab', '/lab/the-brief-before-the-brief',
  '/about', '/start', '/notes'];
const widths = [375, 380, 390, 768, 1024, 1440, 1920];
const shot = route => (route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-'));

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = [];
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const lang of ['en', 'fr']) {
    for (const route of routes) {
      const url = base + (lang === 'fr' ? (route === '/' ? '/fr' : `/fr${route}`) : route);
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        const response = await page.goto(url, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200, `${url} answered ${response.status()}`);
        await page.evaluate(() => document.fonts.ready);
        const geometry = await page.evaluate(() => {
          const bad = [];
          const selector = 'h1,h2,h3,h4,p,li,dt,dd,blockquote,figcaption,summary,label,'
            + 'button,input,textarea,pre,.eyebrow,.status,.text-link,.button,.case-name,.essay-number';
          for (const el of document.querySelectorAll(selector)) {
            if (!el.getClientRects().length) continue;
            const box = el.getBoundingClientRect();
            if (box.left < -1 || box.right > innerWidth + 1 || el.scrollWidth > el.clientWidth + 2) {
              bad.push({ tag: el.tagName, cls: el.className, text: el.textContent.trim().slice(0, 60),
                left: Math.round(box.left), right: Math.round(box.right),
                scroll: el.scrollWidth, client: el.clientWidth });
            }
          }
          const hero = document.querySelector('.hero .button');
          return {
            viewport: innerWidth,
            document: document.documentElement.scrollWidth,
            heroFits: hero ? Math.round(hero.getBoundingClientRect().bottom) <= innerHeight : null,
            bad
          };
        });
        report.push({ lang, route, width, ...geometry });
        if (width === 380 || width === 1440) {
          await page.screenshot({ path: `${output}${lang}-${width}-${shot(route)}.png` });
        }
      }
    }
  }
  await writeFile(`${output}report.json`, JSON.stringify(report, null, 2));

  const overflowing = report.filter(row => row.bad.length || row.document > row.viewport + 1);
  const heroCut = report.filter(row => row.heroFits === false && row.width <= 390);
  if (overflowing.length) console.error(JSON.stringify(overflowing.slice(0, 6), null, 2));
  if (heroCut.length) console.error(JSON.stringify(heroCut, null, 2));
  assert.equal(overflowing.length, 0, 'geometry violations: see test-results/visual/report.json');
  assert.equal(heroCut.length, 0, 'the hero proposition does not fit the first screen on mobile');

  console.log(`PASS: ${report.length} measurements — ${routes.length} routes × 2 languages × ${widths.length} widths.`);
  console.log('PASS: no element or document overflows its viewport at any width.');
  console.log('PASS: the full hero proposition fits the first screen at 375, 380 and 390px in both languages.');
} finally {
  await browser.close();
}
