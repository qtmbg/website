// Renders one 1200×630 sharing image per route into public/og/.
// Committed output, so the Vercel build never needs a browser.
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { articles } from '../src/articles.mjs';
import { makePages } from '../src/pages.mjs';
import { esc } from '../src/shared.mjs';
import { ogSlug } from './meta.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'public', 'og');
const font = name => pathToFileURL(path.join(root, 'assets', 'fonts', name)).href;

const strip = html => String(html)
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/<[^>]*>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/\s+/g, ' ').trim();

const kicker = (basePath, lang) => {
  const fr = lang === 'fr';
  if (basePath === '/') return fr ? 'Pratique indépendante · Marrakech' : 'Independent practice · Marrakech';
  if (basePath.startsWith('/thinking/')) return fr ? 'Un texte de la pratique' : 'An essay from the practice';
  if (basePath.startsWith('/work/')) return fr ? 'Le travail' : 'The work';
  if (basePath.startsWith('/lab/')) return 'Quantum Lab';
  if (basePath === '/practice/method') return fr ? 'La méthode' : 'The method';
  return 'Quantum Branding';
};

function card({ title, description, basePath, lang }) {
  const t = strip(title);
  const size = t.length > 64 ? 62 : t.length > 40 ? 76 : t.length > 24 ? 92 : 106;
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
@font-face{font-family:"Instrument Serif";src:url("${font('instrument-serif-latin-400-normal.ttf')}");font-weight:400}
@font-face{font-family:"Instrument Serif";src:url("${font('instrument-serif-latin-400-italic.ttf')}");font-weight:400;font-style:italic}
@font-face{font-family:"DM Sans";src:url("${font('dm-sans-latin-400-normal.ttf')}");font-weight:400}
@font-face{font-family:"DM Sans";src:url("${font('dm-sans-latin-500-normal.ttf')}");font-weight:500}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#f5f0e7;color:#25241f;font-family:"DM Sans",Arial,sans-serif;
 display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px;overflow:hidden}
.top{display:flex;justify-content:space-between;align-items:flex-start;font-size:19px;letter-spacing:.02em;font-weight:500}
.wordmark{line-height:1.1}
.wordmark b{display:block;font-weight:500}
.kicker{color:#666158}
h1{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:${size}px;line-height:1.02;
 letter-spacing:-.035em;max-width:19ch}
.desc{font-size:23px;line-height:1.45;color:#4b473f;max-width:60ch;margin-top:26px}
.foot{display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid #c9c2b6;padding-top:26px;font-size:19px;color:#666158}
.mark{display:flex;gap:9px;align-items:center}
.mark i{display:block;width:26px;height:26px;border:1px solid #25241f}
.mark i:last-child{background:#d94c32;border-color:#d94c32}
</style></head><body>
<div class="top"><span class="wordmark">QUANTUM<b>BRANDING</b></span><span class="kicker">${esc(kicker(basePath, lang))}</span></div>
<div><h1>${esc(t)}</h1><p class="desc">${esc(strip(description).slice(0, 170))}</p></div>
<div class="foot"><span>thequantumbranding.com${basePath === '/' ? '' : esc(lang === 'fr' ? '/fr' + basePath : basePath)}</span>
<span class="mark"><i></i><i></i><i></i></span></div>
</body></html>`;
}

const pages = makePages(articles);
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const entry of pages) {
    await page.setContent(card(entry), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await writeFile(path.join(out, `${ogSlug(entry.basePath, entry.lang)}.png`), await page.screenshot({ type: 'png' }));
  }
  console.log(`Rendered ${pages.length} sharing images → public/og/`);
} finally {
  await browser.close();
}
