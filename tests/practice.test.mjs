import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, cpSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { articles } from '../src/articles.mjs';
import { makePages } from '../src/pages.mjs';
const root = path.resolve(import.meta.dirname, '..');
// The six approved practice records live in the identity workspace; set PRACTICE_SOURCE when the
// checkout is elsewhere.
const source = process.env.PRACTICE_SOURCE || path.resolve(root, '../../work-v5/practice');
const slugs = ['africa-business-school', 'quantum-branding', 'brandos', 'rbmg', 'energy-cube', 'zone-aire'];
const records = Object.fromEntries(slugs.map(s => [s, JSON.parse(readFileSync(path.join(source, s + '.json')))]));
const pages = makePages(articles);
const read = p => readFileSync(path.join(root, 'dist', p.replace(/^\//, '') + '.html'), 'utf8');

test('generator preserves approved copy and separates facts from context', () => {
  const script = path.join(root, 'scripts/gen_practice.py');
  assert.ok(existsSync(script), 'gen_practice.py must exist');
  const dir = mkdtempSync(path.join(tmpdir(), 'practice-generator-'));
  try {
    const output = path.join(dir, 'practice.json');
    const result = spawnSync('python3', [script, '--data-only', '--output', output], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const generated = JSON.parse(readFileSync(output));
    for (const slug of slugs) {
      const r = generated[slug];
      assert.ok(r.name && r.relationship && r.role && r.provenance, slug);
      assert.equal('years' in r, false);
      assert.ok(r.end === null || Number.isInteger(r.end));
      assert.equal(typeof r.ongoing, 'boolean');
      assert.equal(r.canonicalCareerUrl, `https://nizzar.com/work/${slug}`);
      for (const lang of ['en', 'fr']) for (const key of ['title', 'lede', 'sections', 'shows', 'description', 'context'])
        assert.deepEqual(r[lang][key], records[slug][lang][key], `${slug}/${lang}/${key}`);
    }
    assert.equal(generated['quantum-branding'].start, 2023);
    assert.equal(generated['quantum-branding'].ongoing, true);
    assert.equal(generated.rbmg.practiceEngagement, false);
    assert.equal(generated.brandos.practiceEngagement, false);
    assert.equal(generated['africa-business-school'].practiceEngagement, true);
    assert.equal(generated['zone-aire'].start, 2026);
    assert.equal('evidence' in generated['zone-aire'], false);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('twelve pages preserve short sections and localize dates while linking to career records', () => {
  for (const slug of slugs) for (const lang of ['en', 'fr']) {
    const p = pages.find(p => p.basePath === '/work/' + slug && p.lang === lang);
    assert.ok(p?.practiceRecord, `${slug}/${lang}: normalized practice record missing`);
    assert.equal(p.practiceRecord[lang].sections.length, records[slug][lang].sections.length);
    assert.ok(p.body.includes(`href="https://nizzar.com/work/${slug}"`));
    if (lang === 'fr') assert.doesNotMatch(p.body, /\bpresent\b|Operating Partner|>Founder</);
  }
});

test('self canonicals, reciprocal alternates and unique metadata in both languages', () => {
  const titles = [], descriptions = [];
  for (const slug of slugs) for (const lang of ['en', 'fr']) {
    const route = `${lang === 'fr' ? '/fr' : ''}/work/${slug}`;
    const html = read(route);
    assert.ok(html.includes(`rel="canonical" href="https://thequantumbranding.com${route}"`));
    for (const l of ['en', 'fr']) assert.ok(html.includes(`hreflang="${l}" href="https://thequantumbranding.com${l === 'fr' ? '/fr' : ''}/work/${slug}"`));
    titles.push(html.match(/<title>(.*?)<\/title>/)[1]);
    const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
    descriptions.push(description);
    assert.equal(description, records[slug][lang].description.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;'));
  }
  assert.equal(new Set(titles).size, 12);
  assert.equal(new Set(descriptions).size, 12);
});

test('structured data separates page publication from historically attributed work', () => {
  for (const slug of slugs) for (const lang of ['en', 'fr']) {
    const html = read(`${lang === 'fr' ? '/fr' : ''}/work/${slug}`);
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1])['@graph'];
    const page = graph.find(n => n['@id'].endsWith('#page'));
    assert.equal(page['@type'], 'WebPage');
    const work = graph.find(n => n['@id'] === page.mainEntity?.['@id']);
    assert.equal(work['@type'], 'CreativeWork');
    assert.ok(work.creditText);
    assert.equal(work.contributor['@id'], 'https://nizzar.com/#person');
    if (slug === 'africa-business-school') assert.equal(work.provider['@id'], 'https://thequantumbranding.com/#organization');
    else assert.equal(work.provider, undefined, slug);
    assert.doesNotMatch(html, /thequantumbranding\.com\/#(?:nizzar|practice)["']/);
    if (slug === 'zone-aire') assert.equal(work.temporalCoverage, '2026');
  }
});

test('generator rejects missing translations before writing and preserves other authored records', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'practice-validation-'));
  try {
    const output = path.join(dir, 'output.json');
    const original = { diptyk: { en: { lede: 'Existing proof copy' } } };
    writeFileSync(output, JSON.stringify(original));
    const script = path.join(root, 'scripts/gen_practice.py');
    let run = spawnSync('python3', [script, '--data-only', '--output', output], { encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    const built = readFileSync(output, 'utf8');
    assert.deepEqual(JSON.parse(built).diptyk, original.diptyk);
    run = spawnSync('python3', [script, '--data-only', '--output', output], { encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    assert.equal(readFileSync(output, 'utf8'), built, 'generation is deterministic');
    const badSource = path.join(dir, 'records');
    cpSync(source, badSource, { recursive: true });
    const bad = structuredClone(records.brandos);
    delete bad.fr;
    writeFileSync(path.join(badSource, 'brandos.json'), JSON.stringify(bad));
    run = spawnSync('python3', [script, '--data-only', '--records-dir', badSource, '--output', output], { encoding: 'utf8' });
    assert.notEqual(run.status, 0, 'missing French copy must stop generation');
    assert.equal(readFileSync(output, 'utf8'), built, 'failed validation must leave prior output intact');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
