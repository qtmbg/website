import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildBrief, escapeHTML, territories, siteConfig } from '../app.js';

test('six coherent territories have complete EN and FR content', () => {
  assert.equal(territories.length,6);
  assert.equal(new Set(territories.map(t=>t.id)).size,6);
  for(const territory of territories) for(const lang of ['en','fr']) {
    for(const field of ['name','short','question','body','entry']) assert.ok(territory[lang][field].length > 5);
    assert.equal(territory[lang].tags.length,4);
  }
});
test('brief organizes user input without inventing advice', () => {
  const brief = buildBrief({route:'A project',company:' Acme ',change:' Rebuild our site ',result:'Clear navigation',constraints:'December'});
  assert.match(brief,/Context\nAcme/);
  assert.match(brief,/What needs to change\nRebuild our site/);
  assert.match(brief,/Not an automated diagnosis/);
  assert.doesNotMatch(brief,/undefined|Contact\n/);
});
test('French brief is localized and optional empty fields are omitted', () => {
  const brief = buildBrief({change:'Repenser le site',result:'Un parcours clair',contact:''},'fr');
  assert.match(brief,/Ce qui doit changer\nRepenser le site/);
  assert.match(brief,/Le résultat recherché/);
  assert.doesNotMatch(brief,/Contact\n|Constraints/);
});
test('user-provided content is escaped for rendered brief', () => {
  assert.equal(escapeHTML('<img src=x onerror="alert(1)"> & \'test\''),'&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;test&#39;');
});
test('preview cannot silently send an enquiry', () => { assert.equal(siteConfig.contactEmail,''); });
test('all local section links resolve and IDs are unique', async () => {
  const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length);
  for(const [,anchor] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(anchor),`Missing target ${anchor}`);
  for(const id of ['main','work','practice','lab','nizzar','start']) assert.ok(ids.includes(id));
  assert.match(html,/<dialog[^>]+aria-labelledby="dialog-title"/);
});