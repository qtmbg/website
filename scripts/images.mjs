// Renders one 1200×630 sharing image per route into public/og/.
// Committed output, so the Vercel build never needs a browser.
import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles } from '../src/articles.mjs';
import { makePages } from '../src/pages.mjs';
import { esc } from '../src/shared.mjs';
import { ogSlug } from './meta.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'public', 'og');

const strip = html => String(html)
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/<[^>]*>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/\s+/g, ' ').trim();

const kicker = (basePath, lang) => {
  const fr = lang === 'fr';
  if (basePath === '/') return fr ? 'Pratique indépendante' : 'Independent practice';
  if (basePath.startsWith('/thinking/')) return fr ? 'Un texte de la pratique' : 'An essay from the practice';
  if (basePath.startsWith('/work/')) return fr ? 'Le travail' : 'The work';
  if (basePath.startsWith('/lab/')) return 'Quantum Lab';
  if (basePath === '/practice/method') return fr ? 'La méthode' : 'The method';
  return 'Quantum Branding';
};

// The desktop direction of 4 October 2026: the card is a corner of the home
// desktop. A menu bar, the title in Bricolage Grotesque, the dock below.
// Glyphs are read from the site's own stylesheet so the two cannot drift.
// The font travels inside the page as data: a page made with setContent may
// not load file:// resources, so a URL would fall back silently.
const bricolage = `data:font/woff2;base64,${(await readFile(path.join(root, 'assets', 'fonts', 'bricolage-grotesque-latin-variable.woff2'))).toString('base64')}`;
const glyphs = (await readFile(path.join(root, 'assets', 'desktop.css'), 'utf8'))
  .match(/--g-[a-z]+:url\("data:image\/svg\+xml,[^"]*"\);/g).join('');

function card({ title, description, basePath, lang }) {
  const t = strip(title);
  const size = t.length > 64 ? 58 : t.length > 40 ? 70 : t.length > 24 ? 84 : 96;
  const tile = (tone, glyph, mark) => `<i style="--tone:${tone};--glyph:${glyph};--mask:var(--g-${mark})"></i>`;
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
@font-face{font-family:"Bricolage Grotesque";src:url("${bricolage}") format("woff2");font-weight:200 800}
:root{${glyphs}}
*{box-sizing:border-box;margin:0}
body{position:relative;width:1200px;height:630px;overflow:hidden;background:#f4f6f8;color:#1b252b;font-family:"Bricolage Grotesque",Arial,sans-serif}
.bar{position:absolute;inset:0 0 auto;display:flex;align-items:center;justify-content:space-between;height:44px;padding:0 28px;border-bottom:1px solid rgb(27 37 43/.1);background:rgb(255 255 255/.75);font-size:17px;font-weight:500;color:rgb(27 37 43/.55)}
.bar span{display:flex;gap:22px}
.bar b{font-weight:700;color:rgb(27 37 43/.75)}
.bar em{font-style:normal;color:rgb(27 37 43/.38)}
main{position:absolute;left:72px;right:72px;top:118px}
h1{font-weight:800;font-size:${size}px;line-height:1.04;letter-spacing:-.025em;max-width:16ch}
.desc{margin-top:24px;max-width:46ch;font-size:24px;line-height:1.5;color:#59666e}
.foot{position:absolute;left:72px;right:72px;bottom:44px;display:flex;align-items:center;justify-content:space-between}
.url{font-size:19px;font-weight:500;color:#59666e}
.dock{display:flex;gap:12px;padding:10px 14px;border:1px solid rgb(255 255 255/.6);border-radius:20px;background:rgb(255 255 255/.55);box-shadow:inset 0 1px 0 rgb(255 255 255/.7),0 10px 34px rgb(27 37 43/.14)}
.dock i{position:relative;display:block;width:50px;height:50px;border-radius:24%;background:linear-gradient(to bottom,rgb(255 255 255/.26),rgb(255 255 255/0) 70%),var(--tone);box-shadow:0 2px 6px rgb(27 37 43/.25),inset 0 0 0 1px rgb(27 37 43/.06)}
.dock i::before{content:"";position:absolute;inset:25%;background:var(--glyph);-webkit-mask:var(--mask) center/contain no-repeat;mask:var(--mask) center/contain no-repeat}
.dock i.q::before{content:"Q";inset:0;display:grid;place-items:center;background:none;-webkit-mask:none;mask:none;color:#1b252b;font:800 24px/1 "Bricolage Grotesque",Arial,sans-serif}
.dock hr{width:1px;height:40px;margin:5px 2px;border:0;background:rgb(27 37 43/.15)}
</style></head><body>
<div class="bar"><span><b>Q</b>Quantum Branding<em>Nizzar Ben Chekroune</em></span><span>${esc(kicker(basePath, lang))}</span></div>
<main><h1>${esc(t)}</h1><p class="desc">${esc(strip(description).slice(0, 170))}</p></main>
<div class="foot"><span class="url">thequantumbranding.com${basePath === '/' ? '' : esc(lang === 'fr' ? '/fr' + basePath : basePath)}</span>
<span class="dock"><i class="q" style="--tone:#fff"></i><hr>${tile('#3158df', '#fff', 'folder')}${tile('#1b252b', '#e8fa64', 'layers')}${tile('#e8fa64', '#1b252b', 'notes')}${tile('#22363e', '#fff', 'flask')}${tile('#e6ebef', '#3158df', 'person')}</span></div>
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
