// Presentation only. All editorial strings and links come from src/pages.mjs.
import { esc } from '../src/shared.mjs';

const tools = ['observe', 'mark', 'digital', 'systems', 'learning', 'compass'];
const art = name => `<img src="/assets/illustrations/${name}.svg" alt="" width="110" height="110" loading="lazy">`;
export const logoMark = `<svg class="wordmark-symbol" viewBox="0 0 38 42" fill="none" aria-hidden="true"><path d="m19 2 16 9v20L19 40 3 31V11Zm0 18L3 11m16 9 16-9M19 20v20" stroke="currentColor" stroke-width="2"/></svg>`;

function replaceOnce(html, needle, replacement, label) {
  if (html.split(needle).length !== 2) throw new Error(`Presentation target changed: ${label}`);
  return html.replace(needle, replacement);
}

function scene() {
  return `<div class="visual-scene kinetic-stage" aria-hidden="true"><div class="quantum-aperture"><img src="/assets/illustrations/quantum-aperture.webp" srcset="/assets/illustrations/quantum-aperture-small.webp 520w, /assets/illustrations/quantum-aperture.webp 1000w" sizes="(max-width:540px) 90vw, 58vw" alt="" width="1000" height="1000" fetchpriority="high"></div><div class="tool-strip">${tools.map((name,i)=>`<div class="visual-tool tool-${i}">${art(name)}</div>`).join('')}</div></div>`;
}

function paper() {
  return `<div class="visual-paper" aria-hidden="true"><span class="paper-symbol">?</span><i></i><i></i><i></i><i></i></div>`;
}

function decorateCases(html) {
  return html.replace(/<div class="case-art"><span class="case-name">([^<]+)<\/span><\/div>/g, (whole,name) => {
    const verne = name === 'Verne Jewels';
    return `<div class="case-art ${verne?'visual-verne':'visual-selvaggi'}"><div class="case-decoration" aria-hidden="true">${verne?'<i></i><i></i>':'<span>S</span>'}</div><span class="case-name">${name}</span></div>`;
  });
}

export function present(page) {
  const {basePath,lang} = page;
  if (['/','/work'].includes(basePath) && (page.body.match(/<div class="case-art">/g)||[]).length !== 2) throw new Error(`Case presentation targets changed: ${basePath}`);
  if (['/','/practice','/practice/method'].includes(basePath) && (page.body.match(/class="method-mark /g)||[]).length !== 4) throw new Error(`Method presentation targets changed: ${basePath}`);
  let html = decorateCases(page.body);
  html = html.replace(/(<div class="method-mark mark-([0-3])" aria-hidden="true">)/g,(_,tag,i)=>tag+art(['observe','compass','systems','digital'][Number(i)]));
  if (basePath === '/') {
    const end = html.indexOf('</section>');
    if (end < 0 || !html.startsWith('<section class="hero wrap">')) throw new Error('Home hero target changed');
    html = html.slice(0,end) + scene() + html.slice(end);
  }
  if (basePath === '/practice') {
    let i = 0;
    const start = html.indexOf('<div class="history-list">');
    const end = html.indexOf('</div>',start);
    if (start < 0 || end < 0) throw new Error('Practice territories target changed');
    const original = html.slice(start,end+6);
    const decorated = original.replace(/<article>/g,()=>`<article class="visual-territory"><div class="territory-object" aria-hidden="true">${art(tools[i++])}</div>`);
    if (i !== 6) throw new Error(`Expected six territories; found ${i}`);
    html=html.replace(original,decorated);
  }
  if (basePath === '/lab') {
    html = replaceOnce(html,'<h2>BrandOS</h2>',`<div class="lab-product-object" aria-hidden="true">${art('mark')}</div><h2>BrandOS</h2>`,'BrandOS art');
    html = replaceOnce(html,`<a class="lab-card" href="${lang==='fr'?'/fr':''}/lab/the-brief-before-the-brief">`,`<a class="lab-card" href="${lang==='fr'?'/fr':''}/lab/the-brief-before-the-brief">${paper()}`,'brief art');
    html = replaceOnce(html,`<a class="lab-card" href="${lang==='fr'?'/fr':''}/lab/signal-scan">`,`<a class="lab-card" href="${lang==='fr'?'/fr':''}/lab/signal-scan"><div class="lab-signal-object" aria-hidden="true">${art('observe')}</div>`,'signal art');
  }
  if (basePath === '/about') {
    // Repeat existing copy decoratively; do not add historic slogans or claims.
    const heading = esc(page.title).replace(' Nizzar.', '<br>Nizzar.');
    const poster = `<div class="visual-founder-poster" aria-hidden="true"><span class="poster-name">Nizzar Ben Chekroune</span><span class="poster-heading">${heading}</span><span class="poster-sign">✳</span><span class="poster-brand">Quantum Branding</span></div>`;
    const match=html.match(/<div class="split"><h2>([\s\S]*?)<\/h2><div class="prose">/);
    if(!match)throw new Error('About layout target changed');
    html=replaceOnce(html,match[0],`<div class="split founder-split"><div class="founder-visual-column"><h2>${match[1]}</h2>${poster}</div><div class="prose">`,'founder layout');
  }
  if (basePath.startsWith('/work/')) {
    const verne=basePath.endsWith('verne-jewels');
    const name=verne?'Verne Jewels':'Selvaggi';
    const cover=decorateCases(`<div class="case-art"><span class="case-name">${esc(name)}</span></div>`);
    html=replaceOnce(html,'</header>',`</header><div class="case-cover wrap" aria-hidden="true">${cover}</div>`,'case cover');
  }
  return html;
}
