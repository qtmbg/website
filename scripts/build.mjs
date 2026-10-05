// Static site generator for the Quantum Branding practice.
// Renders every English and French route to plain HTML in dist/.
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles } from '../src/articles.mjs';
import { makePages } from '../src/pages.mjs';
import { searchTitle, searchDescription } from '../src/search-titles.mjs';
import { contactEmail, esc, method, origin, route, territories } from '../src/shared.mjs';
import { ancestors, canonical, crumbLabels, ogSlug, routeSection, routeSlug } from './meta.mjs';
import { anchors, present } from './presentation.mjs';
import { Lastmod, bingSiteAuth, feed, indexNowKey, robots } from './seo.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const buildDate = new Date().toISOString().slice(0, 10);

// The fourth value names the dock glyph drawn by assets/desktop.css.
const nav = [
  ['/work', 'Work', 'Le travail', 'folder'],
  ['/practice', 'Practice', 'La pratique', 'layers'],
  ['/thinking', 'Thinking', 'Les idées', 'notes'],
  ['/lab', 'Lab', 'Le Lab', 'flask'],
  ['/about', 'About', 'À propos', 'person']
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
  // The header is the dock. Each label stays the link's own text, so the
  // accessible name and the editorial record are unchanged; the glyph is
  // decoration and data-tip feeds the hover and focus tooltip.
  const links = nav
    .map(([p, en, f, glyph]) => `<a href="${route(p, lang)}" data-tip="${t(en, f)}"${here(p)}><span class="dock-glyph glyph-${glyph}" aria-hidden="true"></span>${t(en, f)}</a>`)
    .join('');
  const other = fr ? 'en' : 'fr';
  return `<header class="site-header">
<a data-tip="${t('Home', 'Accueil')}" class="wordmark" href="${route('/', lang)}" aria-label="${t('Quantum Branding, home', 'Quantum Branding, accueil')}"><span class="wordmark-type"><span>QUANTUM</span><span>BRANDING</span></span></a>
<span class="dock-divider" aria-hidden="true"></span>
<nav id="site-nav" aria-label="${t('Main navigation', 'Navigation principale')}">${links}</nav>
<div class="header-actions">
<a class="language-link" href="${route(basePath, other)}" hreflang="${other}" lang="${other}" data-tip="${fr ? 'English' : 'Français'}">${fr ? 'EN' : 'FR'}</a>
<a data-tip="${t('Let’s talk', 'Parlons-en')}" class="contact-link" href="${route('/start', lang)}">${t('Let’s talk', 'Parlons-en')}</a>
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
<p>${t('The independent practice of Nizzar Ben Chekroune. In English and French.', 'La pratique indépendante de Nizzar Ben Chekroune. En anglais et en français.')}<br><a href="mailto:${contactEmail}">${contactEmail}</a></p>
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
  jobTitle: 'Brand Strategist',
  url: 'https://nizzar.com',
  worksFor: { '@id': `${origin}/#practice` },
  // Verified profiles. The LinkedIn vanity URL is /in/nizzar — Microsoft owns
  // LinkedIn and Bing's entity graph resolves a person through it, so a wrong
  // URL here splits the entity instead of anchoring it.
  sameAs: [
    'https://nizzar.com',
    'https://www.linkedin.com/in/nizzar',
    'https://www.instagram.com/thenizzar',
    'https://www.imdb.com/name/nm8517643/',
    'https://sessionize.com/nizzar/',
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
  employee: { '@id': `${origin}/#nizzar` },
  knowsLanguage: ['en', 'fr'],
  availableLanguage: ['en', 'fr'],
  // Named so that an engine resolving the practice as an entity can see what it
  // answers for. Each term is a territory already stated on /practice.
  knowsAbout: territories.map(([en]) => en),
  slogan: 'See what is true. Decide what matters. Make it real.',
  sameAs: ['https://nizzar.com', 'https://quantumbranding.ai']
};

const website = {
  '@type': 'WebSite',
  '@id': `${origin}/#website`,
  name: 'Quantum Branding',
  url: origin,
  inLanguage: ['en', 'fr'],
  publisher: { '@id': `${origin}/#practice` },
  copyrightHolder: { '@id': `${origin}/#practice` }
};

// The method is the thing the practice wants to be looked up by. Declared as a
// vocabulary so the four steps are one named entity rather than four headings.
function methodTerms(lang) {
  const fr = lang === 'fr';
  const set = `${origin}/#the-collapse`;
  return [{
    '@type': 'DefinedTermSet',
    '@id': set,
    name: 'The Collapse',
    url: canonical('/practice/method', lang),
    creator: { '@id': `${origin}/#nizzar` },
    hasDefinedTerm: method.map(m => ({ '@id': `${set}-${m.name.toLowerCase()}` }))
  }, ...method.map(m => ({
    '@type': 'DefinedTerm',
    '@id': `${set}-${m.name.toLowerCase()}`,
    name: fr ? `${m.name} · ${m.fr}` : m.name,
    description: fr ? m.bodyFr : m.en,
    inDefinedTermSet: { '@id': set }
  }))];
}

// Territories as services. No offer, no price: what is sold is named, what it
// costs is not, which is the rule the whole site runs on.
function services(lang) {
  const fr = lang === 'fr';
  return {
    '@type': 'ItemList',
    '@id': `${canonical('/practice', lang)}#territories`,
    name: fr ? 'Territoires de la pratique' : 'Territories of the practice',
    itemListElement: territories.map(([en, frName, enCopy, frCopy], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        '@id': `${origin}/#service-${en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
        name: fr ? frName : en,
        serviceType: fr ? frName : en,
        description: fr ? frCopy : enCopy,
        provider: { '@id': `${origin}/#practice` },
        availableLanguage: ['en', 'fr']
      }
    }))
  };
}

function jsonLd(page) {
  const { basePath, lang, title, description, type } = page;
  const url = canonical(basePath, lang);
  const graph = [practice, person, website];

  const main = {
    '@type': type,
    '@id': `${url}#page`,
    name: plain(title),
    headline: plain(title),
    description: plain(description),
    url,
    inLanguage: lang === 'fr' ? 'fr-FR' : 'en',
    isPartOf: { '@id': `${origin}/#website` },
    image: `${origin}/og/${ogSlug(basePath, lang)}.png`,
    publisher: { '@id': `${origin}/#practice` }
  };
  if (type === 'Article') {
    main.author = { '@id': `${origin}/#nizzar` };
    main.datePublished = page.date;
    main.dateModified = page.date;
    main.mainEntityOfPage = url;
  }
  if (type === 'CreativeWork') {
    const project = page.archiveProject;
    if (!project) main.creator = { '@id': `${origin}/#nizzar` };
    else {
      // Archive relationships include juries, institutional mandates and studio
      // work. Participation must never imply sole authorship or a client contract.
      if (project.ownerParticipation !== false) main.contributor = { '@id': `${origin}/#nizzar` };
      if (project.studio) main.creator = { '@type': 'Organization', name: project.studio === 'arroz-con-pollo' ? 'Arroz Con Pollo' : project.studio };
      if (project.relationship === 'FOUNDER' && !project.studio) main.creator = { '@id': `${origin}/#nizzar` };
      const pick = v => v && typeof v === 'object' ? (v[lang] ?? v.en) : v;
      main.creditText = [project.relationship, pick(project.role), ...(project.credits || []).map(c => `${c.name}: ${pick(c.role)}`)].filter(Boolean).join(' · ');
      main.citation = (project.sources || []).filter(s => s.url).map(s => s.url);
      if (project.start) main.temporalCoverage = `${project.start}${project.end ? '/' + (project.end === 'present' ? '..' : project.end) : ''}`;
    }
  }
  // Each argument declared as a part with its own address, so an engine can
  // cite the section rather than the page.
  const parts = anchors(page);
  if (parts.length) {
    main.hasPart = parts.map(part => ({
      '@type': 'WebPageElement',
      '@id': `${url}#${part.id}`,
      name: part.name,
      url: `${url}#${part.id}`,
      isPartOf: { '@id': `${url}#page` }
    }));
  }
  if (basePath === '/practice') main.mainEntity = { '@id': `${canonical('/practice', lang)}#territories` };
  if (basePath === '/practice/method') main.mainEntity = { '@id': `${origin}/#the-collapse` };
  graph.push(main);
  if (basePath === '/practice') graph.push(services(lang));
  if (basePath === '/practice/method') graph.push(...methodTerms(lang));

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
  // A search title, when one is defined, is the complete title tag: it already
  // carries the practice name, so the suffix is not appended a second time.
  const override = searchTitle(basePath, lang);
  const fullTitle = override
    ? override
    : basePath === '/'
      ? `Quantum Branding — ${plainTitle}`
      : `${plainTitle} — Quantum Branding`;
  const image = `${origin}/og/${ogSlug(basePath, lang)}.png`;
  const desc = plain(searchDescription(basePath, lang) || description);

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="Nizzar Ben Chekroune">
<meta name="theme-color" content="#f4f6f8">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
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
<meta property="og:image:alt" content="${esc(plainTitle)} · Quantum Branding">
<meta property="og:locale" content="${fr ? 'fr_FR' : 'en_US'}">
<meta property="og:locale:alternate" content="${fr ? 'en_US' : 'fr_FR'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${image}">
<meta name="twitter:image:alt" content="${esc(plainTitle)} · Quantum Branding">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/bricolage-grotesque-latin-variable.woff2" crossorigin>
<link rel="stylesheet" href="/assets/desktop.css">
<script>document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ready')</script>
<script type="application/ld+json">${jsonLd(page)}</script>
<script type="module" src="/app.js" defer></script>
<script type="module" src="/assets/desktop.mjs"></script>
<script type="module" src="/assets/archive.mjs"></script>
</head>
<body data-page="${esc(routeSlug(basePath))}" data-section="${esc(routeSection(basePath))}">
<a class="skip-link" href="#main">${fr ? 'Aller au contenu' : 'Skip to content'}</a>
${header(lang, basePath)}
<main id="main">
${breadcrumbs(basePath, lang)}
${present(page)}
</main>
${footer(lang)}
</body>
</html>
`;
}

/* --------------------------------------------------------- method diagram */

function methodDiagram(lang) {
  const fr = lang === 'fr';
  const accent = '#3158df';
  const ink = '#1b252b';
  const paper = '#f4f6f8';
  const muted = '#59666e';
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
<text x="${x}" y="266" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="800" letter-spacing="-0.8" font-size="30" fill="${ink}">${esc(label)}</text>
${lines.slice(0, 4).map((l, k) => `<text x="${x}" y="${300 + k * 22}" font-family="Bricolage Grotesque, Arial, sans-serif" font-size="15" fill="${muted}">${esc(l)}</text>`).join('\n')}
<text x="${x}" y="128" font-family="Bricolage Grotesque, Arial, sans-serif" font-size="13" fill="${muted}">0${i + 1}</text>`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="1200" height="480" role="img" aria-label="The Collapse · Observe, Collapse, Build, Hold">
<title>The Collapse · Observe → Collapse → Build → Hold</title>
<rect width="1200" height="480" fill="${paper}"/>
<text x="80" y="72" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="800" letter-spacing="-1.3" font-size="48" fill="${ink}">The Collapse</text>
<text x="80" y="100" font-family="Bricolage Grotesque, Arial, sans-serif" font-size="15" fill="${muted}">Observe → Collapse → Build → Hold</text>
<line x1="80" y1="112" x2="1120" y2="112" stroke="#cdd4d9"/>
${cells}
<line x1="80" y1="410" x2="1120" y2="410" stroke="#cdd4d9"/>
<text x="80" y="440" font-family="Bricolage Grotesque, Arial, sans-serif" font-size="14" fill="${muted}">The Collapse · Nizzar Ben Chekroune / Quantum Branding · thequantumbranding.com</text>
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

const lastmod = await Lastmod.open(root, buildDate);

for (const page of pages) {
  const file = page.path === '/' ? 'index.html' : `${page.path.replace(/^\//, '')}.html`;
  const target = path.join(dist, file);
  const html = document_(page, pages);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
  lastmod.observe(canonical(page.basePath, page.lang), html);
}
await lastmod.save();

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

// sitemap.xml with reciprocal alternates. The date is the date the page's own
// bytes last changed, never the date of this build: see scripts/seo.mjs.
const bases = [...new Set(pages.map(p => p.basePath))];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${bases.flatMap(base => ['en', 'fr'].map(lang => {
  const alts = ['en', 'fr']
    .map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${canonical(base, l)}"/>`)
    .join('\n');
  return `  <url>
    <loc>${canonical(base, lang)}</loc>
    <lastmod>${lastmod.dateFor(canonical(base, lang))}</lastmod>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical(base, 'en')}"/>
  </url>`;
})).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);

await writeFile(path.join(dist, 'robots.txt'), robots());

// Atom, one per language. Bing Webmaster Tools reads a feed in the same slot as
// a sitemap, so the essays get a freshness channel of their own.
await writeFile(path.join(dist, 'feed.xml'), feed(pages, 'en', lastmod));
await mkdir(path.join(dist, 'fr'), { recursive: true });
await writeFile(path.join(dist, 'fr', 'feed.xml'), feed(pages, 'fr', lastmod));

// IndexNow: the key has to answer at the origin for a submission to be trusted.
const key = await indexNowKey(root);
if (key) await writeFile(path.join(dist, `${key}.txt`), key);
else console.warn('  ! no IndexNow key in seo/indexnow.key; submissions will be refused');

// Bing Webmaster Tools ownership, only when the tool has issued a token.
const auth = bingSiteAuth(process.env.BING_SITE_AUTH);
if (auth) await writeFile(path.join(dist, 'BingSiteAuth.xml'), auth);

// A generated index page also replaces the tracked root index.html
await cp(path.join(dist, 'index.html'), path.join(root, 'index.html'));

const missingOg = pages.filter(p => !existsSync(path.join(dist, 'og', `${ogSlug(p.basePath, p.lang)}.png`)));
const moved = lastmod.changed();
console.log(`Built ${pages.length} pages (${bases.length} routes × 2 languages) → dist/`);
console.log(moved.length
  ? `  ${moved.length} URL(s) changed content today. After deploying: node scripts/indexnow.mjs --submit`
  : '  no URL changed content; sitemap dates are unchanged');
if (!auth) console.log('  BingSiteAuth.xml not written (set BING_SITE_AUTH to the Bing Webmaster Tools token)');
if (missingOg.length) {
  console.warn(`  ! ${missingOg.length} sharing images missing. Run: npm run images`);
}
const missingPdf = ['en', 'fr'].filter(l => !existsSync(path.join(dist, 'downloads', `quantum-branding-brochure-${l}.pdf`)));
if (missingPdf.length) {
  console.warn(`  ! brochure PDF missing for: ${missingPdf.join(', ')}. Run: npm run brochures`);
}
