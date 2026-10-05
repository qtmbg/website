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
import { projects } from '../src/archive/projects.mjs';

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
  assert.equal(new Set(pages.map(p => p.path)).size, pages.length, 'duplicate routes');
  for (const p of projects) for (const lang of ['en', 'fr']) await read(`${lang === 'fr' ? '/fr' : ''}/work/${p.slug}`);
});

/* ------------------------------------------------------------- no pricing */

test('no pricing appears in public output; canonical evidence remains internal', async () => {
  const banned = [
    /€/, /\bEUR\b/, /\bUSD\b/, /\$\s?\d/, /\bMAD\s?\d/,
    /\bfrom\s+[€$£]\s?\d[\d,.\s]*\b/i,
    /\bà partir de\s+\d/i,
    /\b[123],5\d\d\b/, /\b[123],500\b/,
    /pricing table/i, /price list/i, /grille tarifaire/i, /tarif(s|aire)\b/i,
    /\bper day\b/i, /\bday rate\b/i, /\btaux journalier\b/i
  ];
  const files = [
    ...(await walk(dist)).filter(f => /\.(html|css|js|mjs|xml|txt|svg|json)$/.test(f)),
    path.join(root, 'index.html')
  ];
  for (const file of files) {
    const text = await readFile(file, 'utf8');
    const archive = /^work(?:[/.]|$)|^fr[\/]work(?:[/.]|$)/.test(path.relative(dist, file));
    const patterns = archive ? banned.slice(5) : banned;
    for (const pattern of patterns) {
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
  assert.match(html, /Voir ce qui est vrai/);
  assert.match(html, /Décider de ce qui compte/);
  assert.match(html, /Pour les entreprises qui ont quelque chose d’important/);
  const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/g, '');
  assert.match(withoutScripts, /Que faut-il changer/);
  assert.match(await read('/fr/practice/method'), /Observer/);
  assert.match(await read('/fr/work'), /Le travail\. Dans son ensemble/);
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

test('the review platform is absent from public copy', async () => {
  for (const file of (await walk(dist))) {
    if (!/\.(html|xml|txt|svg|mjs|js|css)$/.test(file)) continue;
    assert.equal(/fiverr/i.test((await readFile(file, 'utf8')).replace(/<script[\s\S]*?<\/script>/g, '').replace(/(?:href|src)="[^"]*"/g, '')), false, `${path.relative(root, file)} names the platform`);
  }
});

test('practice claims no geographic service location', async () => {
  // "African" is allowed: it belongs to the proper name of the 1:54 fair.
  const banned = /(?:I am|I'm|I’m|the practice is|Quantum Branding is) based in|working from|addressLocality|areaServed/i;
  const files = [
    ...(await walk(dist)).filter(f => /\.(html|xml|txt|svg|css|js)$/.test(f))
  ];
  for (const file of files) {
    const archive = path.relative(dist, file).replace(/^fr\//, '').startsWith('work');
    const hit = (await readFile(file, 'utf8')).match(archive ? /based in|working from|addressLocality|areaServed/i : banned);
    assert.equal(hit, null, `${path.relative(root, file)} claims a location: ${hit?.[0]}`);
  }
});

test('“we” appears only where it means the client and me', async () => {
  const allowed = [/We can work out the right starting point together/, /we talk/,
    /Nous trouverons ensemble/, /nous définirons ensemble/, /nous explicitons/, /us had walked the funnel/];
  for (const file of (await walk(dist)).filter(f => f.endsWith('.html'))) {
    const text = (await readFile(file, 'utf8')).replace(/<script[\s\S]*?<\/script>/g, '').replace(/\bUS\b/g, 'United States');
    for (const [phrase] of text.matchAll(/(?<![\p{L}\p{N}_])(?:we|us|our)(?![\p{L}\p{N}_])[^<.!?]{0,60}/giu)) {
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

test('the founder practice record never returns as a client case', async () => {
  assert.equal(cases.some(c => c.slug === 'quantum-branding'), false);
  const founder = projects.find(p => p.slug === 'quantum-branding');
  if (founder) {
    assert.equal(founder.relationship, 'FOUNDER');
    for (const route of ['/work/quantum-branding', '/fr/work/quantum-branding']) assert.match(await read(route), /Quantum Branding/);
  }
  for (const slug of ['selvaggi', 'verne-jewels']) assert.match(await read('/work'), new RegExp(`/work/${slug}`));
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

test('confirmed client names and verbatim excerpts are published', async () => {
  assert.equal(publishTestimonials, true);
  assert.deepEqual(reviews.map(r=>r.name), ['Elvin Picardo','Tisa Esen','Shelah J.']);
  for (const route of ['/work','/fr/work']) {
    const html=await read(route);
    assert.equal((html.match(/<blockquote>/g)||[]).length,3);
    for(const r of reviews)assert.ok(html.includes(r.name));
  }
  const notes=await read('/notes');
  for(const r of reviews){
    assert.ok(notes.includes(r.name));
    assert.ok(notes.includes(r.en.replaceAll("'",'&#39;')));
  }
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
    ['/', /See what is true/, /Tell me what needs to change/],
    ['/fr', /Voir ce qui est vrai/, /Dites-moi ce qui doit changer/]
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

test('rendered pages and brochures interpolate every variable and remove em dashes from body copy', async () => {
  for(const page of pages){
    const html=await read(page.path);
    assert.doesNotMatch(html,/\$\{[^}]*\}/,page.path);
    const body=html.split('<body')[1].replace(/<script[\s\S]*?<\/script>/g,'');
    assert.doesNotMatch(body,/—/,page.path);
  }
  for(const lang of ['en','fr'])assert.doesNotMatch(brochure(lang).split('<body>')[1],/—|\$\{[^}]*\}/);
});

test('branch B is a direct conversation and start has no repeated fork', async () => {
  for(const p of pages){
    const html=await read(p.path);
    const forks=[...html.matchAll(/class="fork-option" href="([^"]+)"/g)];
    if(forks.length)assert.equal(forks[1][1],p.lang==='fr'?'/fr/start':'/start',p.path);
  }
  for(const route of ['/start','/fr/start']){
    const html=await read(route);
    assert.doesNotMatch(html,/closing-fork/);
    assert.match(html,/the-brief-before-the-brief/);
    assert.equal((html.match(/<h1>/g)||[]).length,1);
  }
});

test('case studies have five sections, a closing note and confirmed status', async () => {
  for(const route of ['/work/selvaggi','/fr/work/selvaggi','/work/verne-jewels','/fr/work/verne-jewels']){
    const html=await read(route);
    assert.ok((html.match(/<h2[\s>]/g)||[]).length>=5,route+': retain five original narrative sections alongside archive evidence');
    assert.doesNotMatch(html,/The documented scope|Project documentation|Le périmètre documenté/);
    assert.match(html,/mailto:me@qtmbg.com/);
    assert.ok(html.includes(route.includes('selvaggi')?'Zero-Disruption Protocol':'Verne Style Oracle'));
  }
});

test('BrandOS belongs only to Observe in the method and decorative poster is hidden', async () => {
  for(const route of ['/practice/method','/fr/practice/method']){
    const html=await read(route);
    const cards=html.split('<div class="method-grid">')[1].split('</article>');
    assert.match(cards[0],/BrandOS/);
    for(const card of cards.slice(1,4))assert.doesNotMatch(card,/BrandOS/);
  }
  for(const route of ['/about','/fr/about']){
    const html=await read(route);
    assert.match(html,/class="visual-founder-poster" aria-hidden="true"/);
    assert.doesNotMatch(html,/class="history-list"/);
  }
});

test('the rejected sculpture and legacy pictograms never appear in the redesigned pages', async () => {
  for(const p of pages){
    const html=await read(p.path);
    assert.doesNotMatch(html,/src="\/assets\/illustrations\/(?:quantum-aperture[^" ]*|compass\.svg|mark\.svg|observe\.svg|digital\.svg|systems\.svg|learning\.svg)/,p.path);
    if(p.basePath==='/lab'){
      const art=html.split('<div class="lab-product-object" aria-hidden="true">')[1].split('</div>')[0];
      assert.equal((art.match(/<img /g)||[]).length,0);
      assert.match(art,/brand-preview/);
      assert.doesNotMatch(art,/compass|product-spark/);
    }
  }
});

test('owner career dates and since 2006 wording remain visible', async () => {
  const expected=[['UNIDO / La Minute Creative','2015 - 2019'],['USAID / Career Centers','2017 - 2019'],['Diptyk','2020 - 2021'],['Inception','2021 - 2023'],['BnanaCorp','2021 - 2023']];
  for(const route of ['/about','/fr/about']){
    const html=await read(route);
    for(const [name,date]of expected) assert.ok(html.includes(name) && html.includes(date),route+': '+name);
  }
  for(const route of ['/','/practice','/about','/work','/fr','/fr/practice','/fr/about','/fr/work']) {
    const html=await read(route);
    assert.match(html, /(?:since|Since|depuis|Depuis) 2006/, route);
    assert.doesNotMatch(html, /seventeen years|Seventeen years|Dix-sept ans|20\+ years/);
  }
  for(const lang of ['en','fr']) assert.match(brochure(lang), /(?:since|depuis) 2006/);
});

test('archive media renders from committed data, so production matches the local build', async () => {
  // archive/ is not deployed. A renderer that reads it shows images locally
  // and none on Vercel, which is what happened on 5 October 2026.
  const renderer = await readFile(path.join(root, 'src', 'archive', 'render.mjs'), 'utf8');
  assert.doesNotMatch(renderer, /\.\.\/\.\.\/archive\//, 'the renderer must not read the internal archive folder');
  const records = JSON.parse(await readFile(path.join(root, 'src', 'archive', 'media-public.json'), 'utf8'));
  const built = JSON.parse(await readFile(path.join(root, 'src', 'archive', 'media-built.json'), 'utf8'));
  for (const record of records) {
    for (const key of ['localPath', 'source', 'sha256', 'rightsNotes', 'evidenceUrl']) assert.equal(key in record, false, `${record.id}: internal field ${key} in the public manifest`);
    assert.ok(['PUBLIC SAFE', 'PUBLIC WITH CREDIT'].includes(record.publishability), `${record.id}: not cleared to publish`);
  }
  const ids = new Set(records.map(r => r.id));
  for (const id of Object.keys(built)) assert.ok(ids.has(id), `${id}: derived but missing from media-public.json (run: node scripts/media-public.mjs)`);
  for (const route of ['/work', '/fr/work', '/', '/work/diptyk', '/work/la-minute-creative']) {
    assert.ok(((await read(route)).match(/<img /g) || []).length >= 5, `${route}: archive images missing from the built page`);
  }
  for (const file of (await walk(dist)).filter(f => f.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    for (const [film] of html.matchAll(/<a class="film"[\s\S]*?<\/a>/g)) {
      assert.match(film, /<img /, `${path.relative(dist, file)}: film without a poster`);
      assert.match(film, /href="(\/work\/media\/[^"]+\.mp4|https:\/\/www\.youtube\.com\/watch\?v=[\w-]+)"/, `${path.relative(dist, file)}: film must play from the site or YouTube`);
    }
  }
});
