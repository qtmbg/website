// Acceptance tests against the generated site in dist/.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles } from '../src/articles.mjs';
import { makePages } from '../src/pages.mjs';
import { buildBrief, cases, contactEmail, method, origin, publishTestimonials, reviews } from '../src/shared.mjs';
import { brochure } from '../scripts/brochures.mjs';
import { ogSlug } from '../scripts/meta.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const pages = makePages(articles);

const fileFor = route => path.join(dist, route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`);
const read = route => readFile(fileFor(route), 'utf8');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    out.push(...(entry.isDirectory() ? await walk(full) : [full]));
  }
  return out;
}

const requiredRoutes = [
  '/', '/practice', '/practice/method', '/work', '/thinking', '/lab', '/about', '/start', '/notes'
];

/* ------------------------------------------------------------------ routes */

test('every required English and French route is a real static file', async () => {
  for (const base of requiredRoutes) {
    for (const route of [base, base === '/' ? '/fr' : `/fr${base}`]) {
      const html = await read(route);
      assert.ok(html.startsWith('<!doctype html>'), `${route} is not a full document`);
      assert.ok(html.length > 4000, `${route} looks empty (${html.length} bytes)`);
    }
  }
});

test('every case, essay and instrument has its own address in both languages', async () => {
  const extra = [
    '/work/selvaggi', '/work/verne-jewels',
    '/lab/signal-scan', '/lab/the-brief-before-the-brief',
    ...articles.map(a => `/thinking/${a.slug}`)
  ];
  for (const base of extra) {
    for (const route of [base, `/fr${base}`]) await read(route);
  }
  assert.equal(pages.length, (requiredRoutes.length + extra.length) * 2);
});

/* ------------------------------------------------------------- no pricing */

test('no price, amount or currency appears anywhere in the site or its sources', async () => {
  const banned = [
    /€/, /\bEUR\b/, /\bUSD\b/, /\$\s?\d/, /\bMAD\s?\d/,
    /\bfrom\s+[€$£]?\s?\d[\d,.\s]*\b/i,
    /\bà partir de\s+\d/i,
    /\b[123],5\d\d\b/, /\b[123],500\b/,
    /pricing table/i, /price list/i, /grille tarifaire/i, /tarif(s|aire)\b/i,
    /\bper day\b/i, /\bday rate\b/i, /\btaux journalier\b/i
  ];
  const files = [
    ...(await walk(dist)).filter(f => /\.(html|css|js|mjs|xml|txt|svg|json)$/.test(f)),
    ...(await walk(path.join(root, 'src'))),
    path.join(root, 'index.html')
  ];
  for (const file of files) {
    const text = await readFile(file, 'utf8');
    for (const pattern of banned) {
      const hit = text.match(pattern);
      assert.equal(hit, null, `${path.relative(root, file)} contains a price: ${hit?.[0]}`);
    }
  }
});

test('both brochures exist, are real PDFs and carry no price', async () => {
  for (const lang of ['en', 'fr']) {
    const file = path.join(root, 'public', 'downloads', `quantum-branding-brochure-${lang}.pdf`);
    const info = await stat(file);
    assert.ok(info.size > 40_000, `brochure ${lang} looks truncated`);
    assert.equal((await readFile(file)).subarray(0, 5).toString(), '%PDF-');
    const source = brochure(lang);
    for (const pattern of [/€/, /\bEUR\b/, /\$\s?\d/, /\bfrom\s+\d/i, /à partir de\s+\d/i, /tarif/i]) {
      assert.equal(source.match(pattern), null, `brochure ${lang} contains a price`);
    }
    assert.ok(source.includes(contactEmail), `brochure ${lang} is missing the contact address`);
    assert.ok(source.includes('The Collapse'), `brochure ${lang} is missing the method`);
  }
});

test('the site says how scope and price are settled instead of showing a scale', async () => {
  assert.match(await read('/start'), /Scope and price are defined after we talk/);
  assert.match(await read('/fr/start'), /Le périmètre et le prix sont définis après un échange/);
});

/* ---------------------------------------------------------------- contact */

test('the contact address is visible and functional across the site', async () => {
  assert.equal(contactEmail, 'me@qtmbg.com');
  for (const route of ['/', '/fr', '/start', '/fr/start', '/notes']) {
    assert.ok((await read(route)).includes(`mailto:${contactEmail}`), `${route} has no working contact`);
  }
  assert.ok((await read('/start')).includes(`>${contactEmail}</a>`), 'the address itself is not shown on /start');
});

/* --------------------------------------------------------------- language */

test('French routes are French in the static HTML, with no JavaScript required', async () => {
  const html = await read('/fr');
  assert.match(html, /<html lang="fr">/);
  assert.match(html, /Créer coûte moins/);
  assert.match(html, /Bien décider reste rare/);
  assert.match(html, /Pour les entreprises qui ont quelque chose d’important/);
  const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/g, '');
  assert.match(withoutScripts, /Que faut-il changer/);
  assert.match(await read('/fr/practice/method'), /Observer/);
  assert.match(await read('/fr/work'), /Les choix laissent des traces/);
});

test('each page links to its counterpart in the other language', async () => {
  for (const [en, fr] of [['/', '/fr'], ['/practice/method', '/fr/practice/method'], ['/lab', '/fr/lab']]) {
    assert.ok((await read(en)).includes(`class="language-link" href="${fr}"`), `${en} has no FR switch`);
    assert.ok((await read(fr)).includes(`class="language-link" href="${en}"`), `${fr} has no EN switch`);
  }
});

/* ------------------------------------------------------------- navigation */

test('main navigation is Work, Practice, Thinking, Lab, About with a persistent CTA', async () => {
  for (const [route, labels, cta] of [
    ['/', ['Work', 'Practice', 'Thinking', 'Lab', 'About'], 'Let’s talk'],
    ['/fr', ['Le travail', 'La pratique', 'Les idées', 'Le Lab', 'À propos'], 'Parlons-en']
  ]) {
    const html = await read(route);
    const nav = html.split('<nav id="site-nav"')[1].split('</nav>')[0];
    assert.deepEqual([...nav.matchAll(/>([^<]+)<\/a>/g)].map(m => m[1]), labels);
    assert.ok(html.includes(`class="contact-link" href="${route === '/fr' ? '/fr' : ''}/start">${cta}</a>`));
  }
});

test('no link is a dead anchor and the wordmark points home', async () => {
  for (const file of (await walk(dist)).filter(f => f.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    const dead = [...html.matchAll(/href="(#|)"/g)];
    assert.equal(dead.length, 0, `${path.relative(dist, file)} has ${dead.length} dead link(s)`);
    assert.match(html, /class="wordmark" href="\/(fr)?"/);
  }
});

test('every internal link resolves to a generated page or a shipped file', async () => {
  const files = new Set((await walk(dist)).map(f => '/' + path.relative(dist, f).split(path.sep).join('/')));
  const routes = new Set(pages.map(p => p.path));
  for (const file of [...files].filter(f => f.endsWith('.html'))) {
    const html = await readFile(path.join(dist, file.slice(1)), 'utf8');
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      const ok = routes.has(href) || files.has(href) || files.has(`${href}.html`);
      assert.ok(ok, `${file} links to a missing target: ${href}`);
    }
  }
});

/* -------------------------------------------------------------- metadata */

test('each page carries canonical, reciprocal hreflang, Open Graph and Twitter tags', async () => {
  for (const page of pages) {
    const html = await read(page.path);
    const sibling = pages.find(p => p.basePath === page.basePath && p.lang !== page.lang);
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${page.path}">`), `${page.path}: canonical`);
    assert.ok(html.includes(`hreflang="${page.lang}" href="${origin}${page.path}">`), `${page.path}: self hreflang`);
    assert.ok(html.includes(`hreflang="${sibling.lang}" href="${origin}${sibling.path}">`), `${page.path}: alternate`);
    assert.ok(html.includes('hreflang="x-default"'), `${page.path}: x-default`);
    for (const tag of ['og:title', 'og:description', 'og:url', 'og:image', 'og:locale', 'og:locale:alternate']) {
      assert.ok(html.includes(`property="${tag}"`), `${page.path}: ${tag}`);
    }
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), `${page.path}: twitter card`);
    assert.ok(html.includes(`content="${origin}/og/${ogSlug(page.basePath, page.lang)}.png"`), `${page.path}: og image`);
  }
});

test('one sharing image exists per route and language', async () => {
  for (const page of pages) {
    const file = path.join(dist, 'og', `${ogSlug(page.basePath, page.lang)}.png`);
    assert.ok((await stat(file)).size > 8000, `${page.path}: sharing image missing or empty`);
  }
});

test('structured data is valid JSON-LD with the right type per page', async () => {
  for (const page of pages) {
    const html = await read(page.path);
    const block = html.split('<script type="application/ld+json">')[1].split('</script>')[0];
    const data = JSON.parse(block);
    const types = data['@graph'].map(node => node['@type']);
    assert.ok(types.includes('ProfessionalService') && types.includes('Person'), `${page.path}: entity graph`);
    assert.ok(types.includes(page.type), `${page.path}: expected ${page.type}`);
    if (page.path !== '/' && page.path !== '/fr') assert.ok(types.includes('BreadcrumbList'), `${page.path}: breadcrumb`);
  }
  const article = JSON.parse((await read('/thinking/the-collapse')).split('<script type="application/ld+json">')[1].split('</script>')[0]);
  const node = article['@graph'].find(n => n['@type'] === 'Article');
  assert.equal(node.author['@id'], `${origin}/#nizzar`);
  assert.match(node.datePublished, /^\d{4}-\d{2}-\d{2}$/);
});

test('sitemap and robots cover both languages', async () => {
  const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
  for (const page of pages) assert.ok(sitemap.includes(`<loc>${origin}${page.path}</loc>`), `sitemap: ${page.path}`);
  assert.ok(sitemap.includes('hreflang="x-default"'));
  const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
  assert.match(robots, /^User-agent: \*$/m);
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
});

/* ------------------------------------------------------------- editorial */

test('the product is called BrandOS on the practice site', async () => {
  for (const file of (await walk(dist)).filter(f => f.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    assert.equal(html.match(/Quantum Branding AI/), null, `${path.relative(dist, file)} still says Quantum Branding AI`);
  }
  const lab = await read('/lab');
  assert.match(lab, /BrandOS/);
  assert.match(lab, /by Quantum Branding/);
});

test('the review platform is named nowhere', async () => {
  for (const file of [...(await walk(dist)), ...(await walk(path.join(root, 'src'))), ...(await walk(path.join(root, 'scripts')))]) {
    if (!/\.(html|xml|txt|svg|mjs|js|css)$/.test(file)) continue;
    assert.equal(/fiverr/i.test(await readFile(file, 'utf8')), false, `${path.relative(root, file)} names the platform`);
  }
});

test('no location is claimed anywhere', async () => {
  // "African" is allowed: it belongs to the proper name of the 1:54 fair.
  const banned = /marrakech|morocco|maroc\b|united states|états-unis|guadeloupe|\bcanada\b|\bfrance\b|based in|working from|working across|addressLocality|areaServed/i;
  const files = [
    ...(await walk(dist)).filter(f => /\.(html|xml|txt|svg|css|js)$/.test(f)),
    ...(await walk(path.join(root, 'src'))),
    ...(await walk(path.join(root, 'scripts')))
  ];
  for (const file of files) {
    const hit = (await readFile(file, 'utf8')).match(banned);
    assert.equal(hit, null, `${path.relative(root, file)} claims a location: ${hit?.[0]}`);
  }
});

test('“we” appears only where it means the client and me', async () => {
  const allowed = [/We can work out the right starting point together/, /we talk/,
    /Nous trouverons ensemble/, /nous définirons ensemble/, /nous explicitons/];
  for (const file of (await walk(dist)).filter(f => f.endsWith('.html'))) {
    const text = (await readFile(file, 'utf8')).replace(/<script[\s\S]*?<\/script>/g, '');
    for (const [phrase] of text.matchAll(/\b(?:we|us|our)\b[^<.!?]{0,60}/gi)) {
      assert.ok(allowed.some(ok => ok.test(phrase)),
        `${path.relative(dist, file)} uses a collective pronoun for the practice: "${phrase.trim()}"`);
    }
  }
});

test('no placeholder reaches the published HTML', async () => {
  for (const file of (await walk(dist)).filter(f => f.endsWith('.html'))) {
    const text = (await readFile(file, 'utf8')).replace(/<script[\s\S]*?<\/script>/g, '');
    const hits = [...text.matchAll(/\[[^\]]{3,60}\]/g)].map(m => m[0]);
    assert.deepEqual(hits, [], `${path.relative(dist, file)} still shows ${hits.join(', ')}`);
  }
});

test('the retired case is unreachable and unindexable', async () => {
  assert.equal(cases.some(c => c.slug === 'quantum-branding'), false, 'the case is still in the data');
  for (const route of ['/work/quantum-branding', '/fr/work/quantum-branding']) {
    await assert.rejects(read(route), 'the page is still generated');
  }
  const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
  assert.equal(/work\/quantum-branding/.test(sitemap), false, 'the sitemap still lists it');
  for (const file of (await walk(dist)).filter(f => /\.(html|xml|txt)$/.test(f))) {
    assert.equal(/work\/quantum-branding/.test(await readFile(file, 'utf8')), false,
      `${path.relative(dist, file)} still links to it`);
  }
  assert.deepEqual((await read('/work')).match(/class="case-name">([^<]+)/g).map(m => m.split('>')[1]),
    ['Selvaggi', 'Verne Jewels']);
});

test('its argument survives as an essay, with no client-project framing', async () => {
  for (const [route, title] of [['/thinking/one-page-many-arguments', 'One page, many arguments'],
                                ['/fr/thinking/one-page-many-arguments', 'Une page, plusieurs arguments']]) {
    const html = await read(route);
    assert.ok(html.includes(title), `${route}: title`);
    assert.equal(/case|client work|projet client|projet de la pratique/i.test(
      html.split('<article class="article-body')[1].split('</article>')[0]), false,
      `${route}: the essay still frames itself as a project`);
  }
  assert.ok((await read('/thinking')).includes('One page, many arguments'), 'the index does not list it');
});

test('testimonials are withheld until attribution is confirmed', async () => {
  assert.equal(publishTestimonials, false);
  assert.equal(reviews.length, 3, 'the quotes must stay in the data');
  for (const route of ['/work', '/fr/work']) {
    const html = await read(route);
    assert.equal(/<blockquote>/.test(html), false, `${route} still publishes quotes`);
    assert.equal(/In clients|Ce que les clients/.test(html), false, `${route} still shows the section`);
  }
  // /notes keeps the sourcing record and the English originals.
  const notes = await read('/notes');
  for (const review of reviews) assert.ok(notes.includes(review.handle), `/notes lost ${review.handle}`);
});

test('defensive qualifications and the retired visual furniture are gone', async () => {
  const banned = [
    /not client work/i, /not a service/i, /not a Quantum Branding service/i,
    /no finished instrument/i, /not claims of/i, /not a faceless/i,
    /never a tollbooth/i, /not a separate service/i, /Pause motion/i,
    /QB—001/i, /INDEPENDENT MINDS/i, /SEE WHAT MATTERS/i
  ];
  for (const file of (await walk(dist)).filter(f => /\.(html|css|js)$/.test(f))) {
    const text = await readFile(file, 'utf8');
    for (const pattern of banned) {
      assert.equal(text.match(pattern), null, `${path.relative(dist, file)}: ${text.match(pattern)?.[0]}`);
    }
  }
});

test('the hero carries exactly a headline, a positioning line and one call to action', async () => {
  for (const [route, headline, cta] of [
    ['/', /Making got cheap/, /Tell me what needs to change/],
    ['/fr', /Créer coûte moins/, /Dites-moi ce qui doit changer/]
  ]) {
    const hero = (await read(route)).split('<section class="hero wrap">')[1].split('</section>')[0];
    assert.equal((hero.match(/<h1>/g) || []).length, 1);
    assert.equal((hero.match(/<p /g) || []).length, 1);
    assert.equal((hero.match(/<a /g) || []).length, 1);
    assert.match(hero, headline);
    assert.match(hero, cta);
  }
});

test('the method is named, described and downloadable', async () => {
  const page = await read('/practice/method');
  for (const movement of method) assert.ok(page.includes(`<h3>${movement.name}`), `missing ${movement.name}`);
  assert.match(page, /href="\/assets\/the-collapse-en\.svg" download/);
  const svg = await readFile(path.join(dist, 'assets', 'the-collapse-en.svg'), 'utf8');
  assert.match(svg, /^<svg /);
  assert.ok(svg.includes('Observe → Collapse → Build → Hold'));
  assert.ok(svg.includes('Nizzar Ben Chekroune'));
  const french = await readFile(path.join(dist, 'assets', 'the-collapse-fr.svg'), 'utf8');
  assert.ok(french.includes('Observer'));
});

test('the practice speaks in the first person', async () => {
  const html = await read('/practice');
  assert.match(html, /I bring strategy, design and implementation/);
  assert.equal(html.match(/\bwe (offer|provide|deliver|believe|are a)\b/i), null);
});

/* ----------------------------------------------------------- brief helper */

test('the brief arranges the visitor’s own words and drops empty fields', () => {
  const english = buildBrief({ company: ' Acme ', change: ' Rebuild the site ', result: 'A clear offer', constraints: '', contact: '' });
  assert.match(english, /Context\nAcme/);
  assert.match(english, /What needs to change\nRebuild the site/);
  assert.equal(english.match(/Constraints|Contact\n/), null);
  assert.equal(english.match(/undefined/), null);

  const french = buildBrief({ change: 'Repenser le site', result: 'Un parcours clair' }, 'fr');
  assert.match(french, /POINT DE DÉPART/);
  assert.match(french, /Ce qui doit changer\nRepenser le site/);
});

test('the brief instrument keeps answers in the browser and never posts them', async () => {
  const page = await read('/lab/the-brief-before-the-brief');
  const form = page.split('<form id="brief-form"')[1].split('</form>')[0];
  assert.equal(form.match(/\baction=/), null, 'the form must not post anywhere');
  assert.ok(page.includes('id="copy-brief"') && page.includes('id="download-brief"') && page.includes('id="edit-brief"'));
  assert.ok(page.includes(`data-email-draft href="mailto:${contactEmail}"`));
  const script = await readFile(path.join(dist, 'app.js'), 'utf8');
  assert.equal(script.match(/\bfetch\(|XMLHttpRequest|navigator\.sendBeacon/), null, 'app.js must not transmit answers');
});
