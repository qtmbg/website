// Presentation only. All editorial strings and links come from src/pages.mjs.
import { esc } from '../src/shared.mjs';

function replaceOnce(html, needle, replacement, label) {
  if (html.split(needle).length !== 2) throw new Error(`Presentation target changed: ${label}`);
  return html.replace(needle, replacement);
}

function scene() {
  const studies = [
    '<div class="type-study"><span>Aa</span><span>Aa</span><span>Aa</span></div>',
    `<div class="decision-study">${Array.from({length:9},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div>`,
    `<div class="build-study">${Array.from({length:6},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div>`,
    `<div class="hold-study">${Array.from({length:8},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div>`
  ];
  return `<div class="visual-scene process-gallery" aria-hidden="true">${['Observe','Collapse','Build','Hold'].map((name,i)=>`<div class="process-card process-${i}${i===1?' is-selected':''}" data-process="${i}"><span class="process-index">0${i+1}</span><div class="process-study">${studies[i]}</div><span class="process-title">${name}</span><span class="process-arrow">↗</span></div>`).join('')}</div>`;
}

function paper() {
  return `<div class="brief-preview" aria-hidden="true">${['01','02','03'].map(n=>`<div><span>${n}</span><i></i></div>`).join('')}</div>`;
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
  html = html.replace(/(<div class="method-mark mark-([0-3])" aria-hidden="true">)/g,(_,tag,i)=>`${tag}<b>0${Number(i)+1}</b>`);
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
    const decorated = original.replace(/<article>/g,()=>`<article class="visual-territory"><div class="territory-object" aria-hidden="true"><span>0${++i}</span><i></i></div>`);
    if (i !== 6) throw new Error(`Expected six territories; found ${i}`);
    html=html.replace(original,decorated);
  }
  if (basePath === '/lab') {
    html = replaceOnce(html,'<h2>BrandOS</h2>',`<div class="lab-product-object" aria-hidden="true"><div class="brand-preview"><span>Brand</span><span>OS<span class="brand-caret"></span></span><i></i><i></i><i></i></div></div><h2>BrandOS</h2>`,'BrandOS art');
    html = replaceOnce(html,`<a class="lab-card" href="${lang==='fr'?'/fr':''}/lab/the-brief-before-the-brief">`,`<a class="lab-card" href="${lang==='fr'?'/fr':''}/lab/the-brief-before-the-brief">${paper()}`,'brief art');
    html = replaceOnce(html,`<a class="lab-card" href="${lang==='fr'?'/fr':''}/lab/signal-scan">`,`<a class="lab-card" href="${lang==='fr'?'/fr':''}/lab/signal-scan"><div class="signal-preview" aria-hidden="true"><span>Signal<br>Scan</span><div>${Array.from({length:16},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div></div>`,'signal art');
  }
  if (basePath === '/about') {
    // Repeat existing copy decoratively; do not add historic slogans or claims.
    const heading = esc(page.title).replace(' Nizzar.', '<br>Nizzar.');
    const poster = `<div class="visual-founder-poster" aria-hidden="true"><span class="poster-name">Nizzar Ben Chekroune</span><span class="poster-heading">${heading}</span><span class="poster-brand">Quantum Branding</span></div>`;
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
