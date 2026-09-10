// Static site generator for the Quantum Branding practice.
// Renders every English and French route to plain HTML in dist/.
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles } from '../src/articles.mjs';
import { makePages } from '../src/pages.mjs';
import { contactEmail, esc, method, origin, route } from '../src/shared.mjs';
import { ancestors, canonical, crumbLabels, ogSlug } from './meta.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const buildDate = new Date().toISOString().slice(0, 10);

const nav = [
  ['/work', 'Work', 'Le travail'],
  ['/practice', 'Practice', 'La pratique'],
  ['/thinking', 'Thinking', 'Les idées'],
  ['/lab', 'Lab', 'Le Lab'],
  ['/about', 'About', 'À propos']
];

const stripTags = html => String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const decode = text => String(text)
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const plain = html => decode(stripTags(html));

/* ---------------------------------------------------------------- chrome */

function header(lang, basePath) {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const here = p => (p === basePath || (p !== '/' && basePath.startsWith(p + '/')) ? ' aria-current="page"' : '');
  const links = nav
    .map(([p, en, f]) => `<a href="${route(p, lang)}"${here(p)}>${t(en, f)}</a>`)
    .join('');
  const other = fr ? 'en' : 'fr';
  return `<header class="site-header">
<a class="wordmark" href="${route('/', lang)}" aria-label="${t('Quantum Branding, home', 'Quantum Branding, accueil')}"><span>QUANTUM</span><span>BRANDING</span></a>
<nav id="site-nav" aria-label="${t('Main navigation', 'Navigation principale')}">${links}</nav>
<div class="header-actions">
<a class="language-link" href="${route(basePath, other)}" hreflang="${other}" lang="${other}">${fr ? 'EN' : 'FR'}</a>
<a class="contact-link" href="${route('/start', lang)}">${t('Let’s talk', 'Parlons-en')}</a>
<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">${t('Menu', 'Menu')}</button>
</div>
</header>`;
}

function footer(lang) {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const links = [...nav, ['/start', 'Let’s talk', 'Parlons-en'], ['/notes', 'Notes', 'Notes']]
    .map(([p, en, f]) => `<a href="${route(p, lang)}">${t(en, f)}</a>`)
    .join('');
  return `<footer class="site-footer">
<p class="footer-author">Quantum Branding<br>Nizzar Ben Chekroune</p>
<nav aria-label="${t('Footer navigation', 'Navigation de pied de page')}">${links}</nav>
<p>${t('An independent practice. Marrakech, working across France, Morocco and the United States.', 'Une pratique indépendante. Marrakech, entre France, Maroc et États-Unis.')}<br><a href="mailto:${contactEmail}">${contactEmail}</a></p>
<p><a href="https://nizzar.com">nizzar.com</a> · <a href="https://quantumbranding.ai">BrandOS</a><br><small>© ${new Date().getFullYear()} Quantum Branding · <a href="${route('/notes', lang)}">${t('Notes & sources', 'Notes et sources')}</a></small></p>
</footer>`;
}

function breadcrumbs(basePath, lang) {
  if (basePath === '/') return '';
  const fr = lang === 'fr';
  const chain = ancestors(basePath);
  const items = chain.slice(0, -1).map(p => {
    const label = p === '/' ? (fr ? 'Accueil' : 'Home') : (crumbLabels[p] ? crumbLabels[p][fr ? 1 : 0] : p);
    return `<a href="${route(p, lang)}">${esc(label)}</a>`;
  });
  return `<nav class="breadcrumbs wrap" aria-label="${fr ? 'Fil d’ariane' : 'Breadcrumb'}">${items.join('<span aria-hidden="true">/</span>')}</nav>`;
}

/* ------------------------------------------------------------- structured */

const person = {
  '@type': 'Person',
  '@id': `${origin}/#nizzar`,
  name: 'Nizzar Ben Chekroune',
  jobTitle: 'Independent brand and business practitioner',
  url: 'https://nizzar.com',
  worksFor: { '@id': `${origin}/#practice` },
  address: { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA' },
  sameAs: [
    'https://nizzar.com',
    'https://www.linkedin.com/in/nizzarbenchekroune',
    'https://artsandculture.google.com/story/meet-the-judges-of-the-global-design-graduate-show-global-design-graduate-show/IAUxkXdAFpJIsA?hl=en'
  ]
};

const practice = {
  '@type': 'ProfessionalService',
  '@id': `${origin}/#practice`,
  name: 'Quantum Branding',
  url: origin,
  email: contactEmail,
  founder: { '@id': `${origin}/#nizzar` },
  address: { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA' },
  areaServed: [
    { '@type': 'Country', name: 'France' },
    { '@type': 'Country', name: 'Morocco' },
    { '@type': 'Country', name: 'United States' }
  ],
  knowsLanguage: ['en', 'fr'],
  slogan: 'Making got cheap. Deciding didn’t.'
};

function jsonLd(page) {
  const { basePath, lang, title, description, type } = page;
  const url = canonical(basePath, lang);
  const graph = [practice, person];

  const main = {
    '@type': type,
    '@id': `${url}#page`,
    name: plain(title),
    headline: plain(title),
    description: plain(description),
    url,
    inLanguage: lang === 'fr' ? 'fr-FR' : 'en',
    isPartOf: { '@type': 'WebSite', '@id': `${origin}/#website`, name: 'Quantum Branding', url: origin },
    image: `${origin}/og/${ogSlug(basePath, lang)}.png`,
    publisher: { '@id': `${origin}/#practice` }
  };
  if (type === 'Article') {
    main.author = { '@id': `${origin}/#nizzar` };
    main.datePublished = page.date;
    main.dateModified = page.date;
    main.mainEntityOfPage = url;
  }
  if (type === 'CreativeWork') main.creator = { '@id': `${origin}/#nizzar` };
  graph.push(main);

  const chain = ancestors(basePath);
  if (chain.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: chain.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p === '/'
          ? (lang === 'fr' ? 'Accueil' : 'Home')
          : (crumbLabels[p] ? crumbLabels[p][lang === 'fr' ? 1 : 0] : plain(title)),
        item: canonical(p, lang)
      }))
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

/* ------------------------------------------------------------------ shell */

function document_(page, pages) {
  const { basePath, lang, title, description, body } = page;
  const fr = lang === 'fr';
  const url = canonical(basePath, lang);
  const siblings = pages.filter(p => p.basePath === basePath);
  const alternates = siblings
    .map(p => `<link rel="alternate" hreflang="${p.lang}" href="${canonical(p.basePath, p.lang)}">`)
    .join('\n');
  const xDefault = `<link rel="alternate" hreflang="x-default" href="${canonical(basePath, 'en')}">`;
  const plainTitle = plain(title);
  const fullTitle = basePath === '/'
    ? `Quantum Branding — ${plainTitle}`
    : `${plainTitle} — Quantum Branding`;
  const image = `${origin}/og/${ogSlug(basePath, lang)}.png`;
  const desc = plain(description);

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="Nizzar Ben Chekroune">
<meta name="theme-color" content="#f5f0e7">
<link rel="canonical" href="${url}">
${alternates}
${xDefault}
<meta property="og:type" content="${page.type === 'Article' ? 'article' : 'website'}">
<meta property="og:site_name" content="Quantum Branding">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(plainTitle)} — Quantum Branding">
<meta property="og:locale" content="${fr ? 'fr_FR' : 'en_US'}">
<meta property="og:locale:alternate" content="${fr ? 'en_US' : 'fr_FR'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${image}">
<meta name="twitter:image:alt" content="${esc(plainTitle)} — Quantum Branding">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" as="font" type="font/ttf" href="/assets/fonts/instrument-serif-latin-400-normal.ttf" crossorigin>
<link rel="preload" as="font" type="font/ttf" href="/assets/fonts/dm-sans-latin-400-normal.ttf" crossorigin>
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${jsonLd(page)}</script>
<script type="module" src="/app.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">${fr ? 'Aller au contenu' : 'Skip to content'}</a>
${header(lang, basePath)}
<main id="main">
${breadcrumbs(basePath, lang)}
${body}
</main>
${footer(lang)}
</body>
</html>
`;
}

/* --------------------------------------------------------- method diagram */

function methodDiagram(lang) {
  const fr = lang === 'fr';
  const accent = '#d94c32';
  const ink = '#25241f';
  const paper = '#f5f0e7';
  const muted = '#666158';
  const cells = method.map((m, i) => {
    const x = 80 + i * 260;
    const marks = [
      `<rect x="${x + 4}" y="150" width="52" height="52" fill="none" stroke="${ink}" transform="rotate(-12 ${x + 30} 176)"/><rect x="${x + 26}" y="162" width="52" height="52" fill="none" stroke="${ink}" transform="rotate(16 ${x + 52} 188)"/><rect x="${x + 16}" y="156" width="52" height="52" fill="none" stroke="${ink}" transform="rotate(35 ${x + 42} 182)"/>`,
      `<rect x="${x + 16}" y="156" width="52" height="52" fill="${accent}"/>`,
      `<rect x="${x + 4}" y="156" width="52" height="52" fill="none" stroke="${ink}"/><rect x="${x + 30}" y="156" width="52" height="52" fill="none" stroke="${ink}"/>`,
      `<rect x="${x + 8}" y="152" width="64" height="64" fill="none" stroke="${ink}"/><rect x="${x + 20}" y="164" width="40" height="40" fill="none" stroke="${ink}"/>`
    ][i];
    const label = fr ? `${m.name} · ${m.fr}` : m.name;
    const copy = (fr ? m.bodyFr : m.en).split(/(?<=\.)\s/)[0];
    const words = copy.split(' ');
    const lines = [];
    let line = '';
    for (const w of words) {
      if ((line + ' ' + w).trim().length > 30) { lines.push(line.trim()); line = w; } else { line += ' ' + w; }
    }
    lines.push(line.trim());
    return `${marks}
<text x="${x}" y="266" font-family="Instrument Serif, Georgia, serif" font-size="34" fill="${ink}">${esc(label)}</text>
${lines.slice(0, 4).map((l, k) => `<text x="${x}" y="${300 + k * 22}" font-family="DM Sans, Arial, sans-serif" font-size="15" fill="${muted}">${esc(l)}</text>`).join('\n')}
<text x="${x}" y="128" font-family="DM Sans, Arial, sans-serif" font-size="13" fill="${muted}">0${i + 1}</text>`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="1200" height="480" role="img" aria-label="The Collapse — Observe, Collapse, Build, Hold">
<title>The Collapse — Observe → Collapse → Build → Hold</title>
<rect width="1200" height="480" fill="${paper}"/>
<text x="80" y="72" font-family="Instrument Serif, Georgia, serif" font-size="52" fill="${ink}">The Collapse</text>
<text x="80" y="100" font-family="DM Sans, Arial, sans-serif" font-size="15" fill="${muted}">Observe → Collapse → Build → Hold</text>
<line x1="80" y1="112" x2="1120" y2="112" stroke="#c9c2b6"/>
${cells}
<line x1="80" y1="410" x2="1120" y2="410" stroke="#c9c2b6"/>
<text x="80" y="440" font-family="DM Sans, Arial, sans-serif" font-size="14" fill="${muted}">The Collapse — Nizzar Ben Chekroune / Quantum Branding · thequantumbranding.com</text>
</svg>
`;
}

/* ------------------------------------------------------------------ build */

async function copyIfPresent(from, to) {
  if (!existsSync(from)) return false;
  await cp(from, to, { recursive: true });
  return true;
}

const pages = makePages(articles);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const page of pages) {
  const file = page.path === '/' ? 'index.html' : `${page.path.replace(/^\//, '')}.html`;
  const target = path.join(dist, file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, document_(page, pages));
}

// Static assets
for (const file of ['styles.css', 'app.js', 'favicon.svg']) {
  await cp(path.join(root, file), path.join(dist, file));
}
await copyIfPresent(path.join(root, 'assets'), path.join(dist, 'assets'));
await copyIfPresent(path.join(root, 'public'), dist);
await cp(path.join(root, 'src', 'shared.mjs'), path.join(dist, 'assets', 'shared.mjs'));

// Downloadable method diagram, one per language
for (const lang of ['en', 'fr']) {
  await writeFile(path.join(dist, 'assets', `the-collapse-${lang}.svg`), methodDiagram(lang));
}

// sitemap.xml with reciprocal alternates
const bases = [...new Set(pages.map(p => p.basePath))];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${bases.flatMap(base => ['en', 'fr'].map(lang => {
  const page = pages.find(p => p.basePath === base && p.lang === lang);
  const lastmod = page?.date || buildDate;
  const alts = ['en', 'fr']
    .map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${canonical(base, l)}"/>`)
    .join('\n');
  return `  <url>
    <loc>${canonical(base, lang)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${base === '/' ? '1.0' : '0.7'}</priority>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical(base, 'en')}"/>
  </url>`;
})).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);

await writeFile(path.join(dist, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`);

// A generated index page also replaces the tracked root index.html
await cp(path.join(dist, 'index.html'), path.join(root, 'index.html'));

const missingOg = pages.filter(p => !existsSync(path.join(dist, 'og', `${ogSlug(p.basePath, p.lang)}.png`)));
console.log(`Built ${pages.length} pages (${bases.length} routes × 2 languages) → dist/`);
if (missingOg.length) {
  console.warn(`  ! ${missingOg.length} sharing images missing. Run: npm run images`);
}
const missingPdf = ['en', 'fr'].filter(l => !existsSync(path.join(dist, 'downloads', `quantum-branding-brochure-${l}.pdf`)));
if (missingPdf.length) {
  console.warn(`  ! brochure PDF missing for: ${missingPdf.join(', ')}. Run: npm run brochures`);
}
