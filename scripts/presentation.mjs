// Presentation only. All editorial strings and links come from src/pages.mjs.
import { contactEmail, cases, esc, method, route } from '../src/shared.mjs';
import { articles } from '../src/articles.mjs';
import { caseStudies } from '../src/cases.mjs';

/* ------------------------------------------------------------- addressing */

// Every argument gets an address. The anchor is derived from the heading the
// editor already wrote, so nothing here invents or alters a word: an id is an
// attribute, not copy. Visible permalink links are deliberately not added, as
// those would be new <a> elements and a change to the editorial baseline.
const decode = text => String(text)
  .replace(/&#39;/g, "'").replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

const slug = text => decode(text)
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[\u2018\u2019']/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 64) || 'section';

// The two shapes that carry an argument: an essay's sections, and a case
// study's numbered sections. Nav, related links and furniture stay unaddressed.
const scopes = page => (
  page.type === 'Article'
    ? [/<article class="article-body prose">[\s\S]*?<\/article>/g]
    : page.basePath.startsWith('/work/')
      ? [/<section class="section wrap "><div class="prose"><h2>[\s\S]*?<\/h2>/g]
      : []
);

// Returns [{id, name}] for a page, in document order, with duplicates suffixed.
export function anchors(page) {
  const found = [];
  const seen = new Map();
  for (const scope of scopes(page)) {
    for (const region of page.body.match(scope) || []) {
      for (const [, heading] of region.matchAll(/<h2>([\s\S]*?)<\/h2>/g)) {
        const base = slug(heading);
        const count = (seen.get(base) || 0) + 1;
        seen.set(base, count);
        found.push({ id: count === 1 ? base : `${base}-${count}`, name: decode(heading) });
      }
    }
  }
  return found;
}

function address(page, html) {
  const queue = anchors(page).slice();
  if (!queue.length) return html;
  for (const scope of scopes(page)) {
    html = html.replace(scope, region => region.replace(
      /<h2>([\s\S]*?)<\/h2>/g,
      (whole, heading) => {
        const next = queue.shift();
        return next ? `<h2 id="${next.id}">${heading}</h2>` : whole;
      }
    ));
  }
  return html;
}

function replaceOnce(html, needle, replacement, label) {
  if (html.split(needle).length !== 2) throw new Error(`Presentation target changed: ${label}`);
  return html.replace(needle, replacement);
}

/* ------------------------------------------------------------ the desktop */

// Owner direction, 4 October 2026: the site takes the design language of
// elenagonci.com. A desktop with widgets and folders, a dock, windows, notes
// and folder tabs. Everything this file adds is either a wrapper or an
// decorative duplicate or an accessible shortcut to existing page content.
// Operable widgets keep native link and button semantics.

// Index just past the tag that closes the element opening at `start`.
function closeOf(html, start, tag) {
  const pattern = new RegExp(`<${tag}[\\s>]|</${tag}>`, 'g');
  pattern.lastIndex = start;
  let depth = 0;
  for (let m = pattern.exec(html); m; m = pattern.exec(html)) {
    depth += m[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return m.index + m[0].length;
  }
  throw new Error(`Presentation target unclosed: <${tag}>`);
}

const windowBar = (title, tag = 'div') =>
  `<${tag} class="window-bar" aria-hidden="true"><span class="window-lights"><i></i><i></i><i></i></span><span class="window-title">${esc(title)}</span></${tag}>`;

// Puts the content of the section holding `needle` inside a window frame.
function windowize(html, needle, title, label, variant = '') {
  const at = html.indexOf(needle);
  if (at < 0 || html.indexOf(needle, at + needle.length) >= 0) throw new Error(`Presentation target changed: ${label}`);
  const start = html.lastIndexOf('<section class="section wrap', at);
  if (start < 0) throw new Error(`Presentation target changed: ${label} (no section)`);
  const openEnd = html.indexOf('>', start) + 1;
  const end = closeOf(html, start, 'section');
  const inner = html.slice(openEnd, end - '</section>'.length);
  const open = html.slice(start, openEnd).replace('class="section wrap', 'class="section wrap window-section');
  return `${html.slice(0, start)}${open}<div class="window${variant ? ` ${variant}` : ''}">${windowBar(title)}<div class="window-body">${inner}</div></div></section>${html.slice(end)}`;
}

const firstSentence = text => {
  const match = String(text).match(/^[\s\S]*?[.!?](?=\s|$)/);
  return (match ? match[0] : String(text)).trim();
};

/* --------------------------------------------------------------- widgets */

function clockFace() {
  const ticks = Array.from({ length: 12 }, (_, i) => `<i class="tick${i % 3 ? '' : ' major'}" style="--t:${i * 30}deg"></i>`).join('');
  // Ten past ten until the script sets the visitor's own time.
  return `<span class="clock-face">${ticks}<i class="hand hand-hour" style="--a:305deg"></i><i class="hand hand-minute" style="--a:60deg"></i><b class="clock-pin"></b></span>`;
}

const methodMark = i => `<i class="mark mark-${i}"><b></b><b></b><b></b></i>`;

function desktop(page) {
  const { lang } = page;
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const u = p => route(p, lang);
  const essays = articles.map(a => ({ title: a[lang].title, href: u(`/thinking/${a.slug}`) }));
  const count = String(essays.length).padStart(2, '0');

  const menubar = `<div class="menubar" aria-hidden="true"><span class="menubar-brand"><b class="menubar-mark"></b><span class="menubar-name">Quantum Branding</span><span class="menubar-role">Nizzar Ben Chekroune</span></span><span class="menubar-clock" data-menubar-clock></span></div>`;

  const clock = `<div class="widget widget-clock" aria-hidden="true" data-clock>${clockFace()}</div>`;

  const calendar = `<a class="widget widget-calendar" href="${u('/start')}" data-calendar aria-label="${t('Let’s talk', 'Parlons-en')}"><span class="cal-day" data-cal-day></span><span class="cal-date" data-cal-date></span><span class="cal-grid" data-cal-grid></span><span class="cal-hint">${t('Let’s talk', 'Parlons-en')}</span></a>`;

  const player = `<div class="widget widget-player" data-player><a class="player-art" href="${essays[0].href}" data-player-link aria-label="${esc(t('Read: ', 'Lire : ') + essays[0].title)}"><span class="player-no" data-player-no>01</span></a><span class="player-info"><span class="player-tracks">${essays.map((e, i) => `<a class="player-title" href="${e.href}" data-track${i ? ' hidden' : ''}>${esc(e.title)}</a>`).join('')}</span><span class="player-sub">Nizzar Ben Chekroune · ${t('Thinking', 'Les idées')}</span><span class="player-controls"><button class="control control-prev" type="button" data-player-step="-1" disabled aria-label="${t('Previous essay', 'Texte précédent')}"></button><a class="control control-play" href="${essays[0].href}" data-player-link aria-label="${esc(t('Read: ', 'Lire : ') + essays[0].title)}"></a><button class="control control-next" type="button" data-player-step="1" disabled aria-label="${t('Next essay', 'Texte suivant')}"></button></span></span><span class="player-progress"><i data-player-progress></i></span><span class="player-times"><span data-player-pos>01</span><span>${count}</span></span></div>`;

  const forecast = `<a class="widget widget-method" href="${u('/practice/method')}"><span class="method-title">The Collapse</span><span class="method-days">${method.map((m, i) => `<span class="method-day"><small>0${i + 1}</small>${methodMark(i)}<span>${esc(m.name)}</span></span>`).join('')}</span></a>`;

  const founder = `<a class="widget widget-founder" href="${u('/about')}"><span class="founder-name">Nizzar<br>Ben Chekroune</span><span class="founder-brand">Quantum Branding</span></a>`;

  const folders = [
    [u('/work/selvaggi'), 'Selvaggi'],
    [u('/work/verne-jewels'), 'Verne Jewels'],
    [u('/practice/method'), 'The Collapse'],
    [u('/thinking'), t('Thinking', 'Les idées')],
    [u('/lab'), 'Quantum Lab']
  ];
  const icons = `<div class="desk-icons">${folders.map(([href, label], i) => `<a class="desk-icon" href="${href}" draggable="false" data-drag="${i}"><span class="folder"></span><span class="desk-label">${esc(label)}</span></a>`).join('')}</div>`;

  const apps = [
    ['https://quantumbranding.ai', 'BrandOS', 'brandos'],
    ['https://nizzar.com', 'nizzar.com', 'globe'],
    [`mailto:${contactEmail}`, contactEmail, 'mail'],
    [`/downloads/quantum-branding-brochure-${lang}.pdf`, t('Practice brochure · PDF', 'Brochure de la pratique · PDF'), 'brochure', true],
    [`/assets/the-collapse-${lang}.svg`, 'The Collapse · SVG', 'diagram', true],
    [u('/lab/the-brief-before-the-brief'), t('The Brief Before the Brief', 'Le brief avant le brief'), 'brief'],
    [u('/lab/signal-scan'), 'Signal Scan', 'signal'],
    [u('/work'), t('Work', 'Le travail'), 'folder'],
    [u('/start'), t('Let’s talk', 'Parlons-en'), 'talk'],
    [u('/notes'), 'Notes', 'notes']
  ];
  const dock = `<div class="widget widget-apps">${apps.map(([href, title, glyph, download]) => `<a class="app" href="${href}" title="${esc(title)}" aria-label="${esc(title)}"${download ? ' download' : ''}><span class="app-icon app-${glyph}"></span></a>`).join('')}</div>`;

  return `<div class="desk-scene">${menubar}<div class="desk-widgets">${clock}${calendar}${player}${forecast}${founder}</div>${icons}${dock}</div>`;
}

/* ------------------------------------------------------------------ cases */

// A case cover is a note: the case name in its header, three of the case's own
// chapter headings with the first sentence of each underneath.
function decorateCases(html, lang) {
  return html.replace(/<div class="case-art"><span class="case-name">([^<]+)<\/span><\/div>/g, (whole, name) => {
    const entry = cases.find(c => c.name === name);
    if (!entry) throw new Error(`Unknown case: ${name}`);
    const parts = (caseStudies[entry.slug]?.[lang] || []).filter(part => part.heading).slice(2, 5);
    const rows = parts.map(part => `<span class="note-row"><b>${esc(part.heading)}</b><span>${esc(firstSentence(part.paragraphs[0] || ''))}</span></span>`).join('');
    return `<div class="case-art visual-${entry.slug}"><div class="case-decoration" aria-hidden="true">${rows}</div><span class="case-name">${name}</span></div>`;
  });
}

function folderTabs(html) {
  return html.replace(/<a class="case-card" href="([^"]+)">([\s\S]*?<h3>)([^<]+)<\/h3>/g,
    (whole, href, middle, name) => `<a class="case-card" href="${href}"><span class="folder-tab" aria-hidden="true"><span>${name}</span></span>${middle}${name}</h3>`);
}

// The case folders run edge to edge, as the reference's pillar stack does, so
// they leave the 1060px band. On the home page the section is split around
// them: its heading before, the career references after. Order is unchanged.
function folderStack(html, label, split) {
  const grid = html.indexOf('<div class="case-grid">');
  if (grid < 0) throw new Error(`Presentation target changed: ${label}`);
  const start = html.lastIndexOf('<section class="section wrap', grid);
  const openEnd = html.indexOf('>', start) + 1;
  const end = closeOf(html, start, 'section');
  const gridEnd = closeOf(html, grid, 'div');
  const before = html.slice(openEnd, grid);
  const after = html.slice(gridEnd, end - '</section>'.length);
  const stack = `<div class="folder-stack">${html.slice(grid, gridEnd)}</div>`;
  if (!split) {
    if (before.trim() || after.trim()) throw new Error(`Presentation target changed: ${label} (extra content)`);
    return html.slice(0, start) + stack + html.slice(end);
  }
  return `${html.slice(0, start)}<section class="section wrap cases-intro">${before}</section>${stack}<section class="section wrap press-band">${after}</section>${html.slice(end)}`;
}

/* ---------------------------------------------------------------- present */

const territoryGlyphs = ['brand', 'megaphone', 'cursor', 'spark', 'cap', 'chart'];
const formatGlyphs = ['handshake', 'search', 'sun', 'chat'];

export function present(page) {
  const { basePath, lang } = page;
  const fr = lang === 'fr';

  if (['/', '/practice', '/practice/method'].includes(basePath) && (page.body.match(/class="method-mark /g) || []).length !== 4) throw new Error(`Method presentation targets changed: ${basePath}`);

  // Anchors first, on the editorial markup they were derived from.
  let html = address(page, page.body);
  html = decorateCases(html, lang);
  html = folderTabs(html);
  html = html.replace(/(<div class="method-mark mark-([0-3])" aria-hidden="true">)/g, (_, tag, i) => `${tag}<b>0${Number(i) + 1}</b>`);
  // On the method page each movement is a folder, its name on the tab.
  if (basePath === '/practice/method') {
    let n = 0;
    html = html.replace(/<article><div class="method-mark /g, () => `<article><span class="folder-tab" aria-hidden="true"><span>${esc(method[n++].name)}</span></span><div class="method-mark `);
    if (n !== 4) throw new Error(`Expected four movements; found ${n}`);
  }

  if (basePath === '/') {
    const open = '<section class="hero wrap">';
    if (!html.startsWith(open)) throw new Error('Home hero target changed');
    const end = closeOf(html, 0, 'section');
    html = `<div class="desktop" data-desktop>${html.slice(0, end)}${desktop(page)}</div>${html.slice(end)}`;
    html = windowize(html, '<div class="split">', 'nizzar.txt', 'home judgment');
    if (!html.includes('class="reference-strip"')) throw new Error('Home references target changed');
    if (html.includes('<div class="case-grid">')) html = folderStack(html, 'home cases', true);
  }

  if (basePath === '/work' && html.includes('<div class="case-grid">')) html = folderStack(html, 'work cases', false);

  if (basePath === '/practice') {
    let i = 0;
    const start = html.indexOf('<div class="history-list">');
    if (start < 0) throw new Error('Practice territories target changed');
    const end = closeOf(html, start, 'div');
    const original = html.slice(start, end);
    const decorated = original.replace(/<article>/g, () => {
      const glyph = territoryGlyphs[i++];
      return `<article class="visual-territory"><div class="territory-object" aria-hidden="true"><span class="app-icon tone-${i} glyph-${glyph}"></span></div>`;
    });
    if (i !== 6) throw new Error(`Expected six territories; found ${i}`);
    html = html.replace(original, decorated);
    html = windowize(html, '<div class="split">', 'practice.txt', 'practice scope');
  }

  if (basePath === '/practice/method') {
    html = windowize(html, fr ? '<h2>Un choix laisse une trace.</h2>' : '<h2>A decision leaves a record.</h2>', 'record.txt', 'method record');
  }

  if (basePath === '/thinking') {
    html = windowize(html, '<div class="split">', 'brief.txt', 'thinking brief');
  }

  if (page.type === 'Article') {
    const slug = basePath.split('/').pop();
    html = windowize(html, '<article class="article-body prose">', `${slug}.md`, 'essay', 'window-document');
  }

  if (basePath === '/lab') {
    // The reference's "The [folder] Playground": a folder between the words.
    const folder = '<span class="lab-folder" aria-hidden="true"><span class="lf-tab"></span><span class="lf-back"></span><span class="lf-card lf-a"><i></i><i></i><i></i></span><span class="lf-card lf-b"><i></i><i></i><i></i></span><span class="lf-note"></span><span class="lf-flap"></span></span>';
    html = replaceOnce(html, '<h1>Quantum Lab</h1>', `<h1 class="lab-title"><span>Quantum</span> ${folder} <span>Lab</span></h1>`, 'Lab title');
    html = replaceOnce(html, '<h2>BrandOS</h2>', `<div class="lab-product-object" aria-hidden="true"><div class="brand-preview"><span>Brand</span><span>OS<span class="brand-caret"></span></span><i></i><i></i><i></i></div></div><h2>BrandOS</h2>`, 'BrandOS art');
    const prefix = fr ? '/fr' : '';
    html = replaceOnce(html, '<a class="lab-card product" href="https://quantumbranding.ai">', `<a class="lab-card product" href="https://quantumbranding.ai">${windowBar('BrandOS', 'span')}`, 'BrandOS window');
    html = replaceOnce(html, `<a class="lab-card" href="${prefix}/lab/the-brief-before-the-brief">`, `<a class="lab-card lab-brief" href="${prefix}/lab/the-brief-before-the-brief">${windowBar('brief.txt', 'span')}<span class="brief-preview" aria-hidden="true">${['01', '02', '03'].map(n => `<span class="brief-line"><span>${n}</span><i></i></span>`).join('')}</span>`, 'brief art');
    html = replaceOnce(html, `<a class="lab-card" href="${prefix}/lab/signal-scan">`, `<a class="lab-card lab-signal" href="${prefix}/lab/signal-scan">${windowBar('signal-scan', 'span')}<span class="signal-preview" aria-hidden="true"><span class="signal-prompt">signal-scan</span><span class="signal-bars">${Array.from({ length: 16 }, (_, i) => `<i style="--h:${22 + ((i * 29) % 78)}%"></i>`).join('')}</span></span>`, 'signal art');
  }

  if (basePath === '/lab/signal-scan') {
    html = windowize(html, '<div class="split">', 'signal-scan', 'signal scan', 'window-terminal');
  }

  if (basePath === '/lab/the-brief-before-the-brief') {
    html = windowize(html, '<div class="split">', 'brief.txt', 'brief instrument');
  }

  if (basePath === '/about') {
    // Repeat existing copy decoratively; do not add historic slogans or claims.
    const heading = esc(page.title).replace(' Nizzar.', '<br>Nizzar.');
    const poster = `<div class="visual-founder-poster" aria-hidden="true"><span class="poster-name">Nizzar Ben Chekroune</span><span class="poster-heading">${heading}</span><span class="poster-brand">Quantum Branding</span></div>`;
    const match = html.match(/<div class="split"><h2>([\s\S]*?)<\/h2><div class="prose">/);
    if (!match) throw new Error('About layout target changed');
    html = replaceOnce(html, match[0], `<div class="split founder-split"><div class="founder-visual-column"><h2>${match[1]}</h2>${poster}</div><div class="prose">`, 'founder layout');
    html = windowize(html, '<div class="split founder-split">', 'about-me.txt', 'about window');
    // Career references as portfolio rows: the name and its dates set apart.
    // The separator stays in the text.
    let rows = 0;
    html = html.replace(/<ul>((?:<li>[^<]*<\/li>)+)<\/ul>/, (whole, items) => `<ul class="career-list">${items.replace(/<li>([^<]*)<\/li>/g, (li, text) => {
      rows += 1;
      return `<li>${text.split(' · ').map(part => `<span>${part}</span>`).join(' · ')}</li>`;
    })}</ul>`);
    if (rows !== 7) throw new Error(`Expected seven career rows; found ${rows}`);
  }

  if (basePath === '/start') {
    let i = 0;
    html = html.replace(/<div class="format-list">([\s\S]*?)<\/div>/, list => list.replace(/<article>/g, () => {
      const glyph = formatGlyphs[i++];
      return `<article><div class="format-object" aria-hidden="true"><span class="app-icon tone-${i} glyph-${glyph}"></span></div>`;
    }));
    if (i !== 4) throw new Error(`Expected four formats; found ${i}`);
  }

  if (basePath === '/notes') {
    html = windowize(html, '<div class="prose notes-list">', 'notes.txt', 'notes', 'window-document');
  }

  if (basePath.startsWith('/work/') && cases.some(c => basePath.endsWith(`/${c.slug}`))) {
    const entry = cases.find(c => basePath.endsWith(`/${c.slug}`));
    if (!entry) throw new Error(`Unknown case route: ${basePath}`);
    const ix = fr ? 1 : 0;
    const fact = entry.fact[ix].replace(/\.$/, '');
    // The cover becomes the case's table of contents, in note form.
    const toc = anchors(page).map((part, i) => `<a class="note-row" href="#${part.id}" tabindex="-1"><b>0${i + 1}</b><span>${esc(part.name)}</span></a>`).join('');
    const cover = `<div class="case-cover wrap" aria-hidden="true"><div class="case-toc"><span class="case-toc-head"><span>${esc(entry.name)}</span><span class="case-toc-tag">${esc(fact)}</span></span>${toc}</div></div>`;
    html = replaceOnce(html, '</header>', `</header>${cover}`, 'case cover');
  }

  return html;
}
