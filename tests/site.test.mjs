import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildBrief, escapeHTML, territories, siteConfig, french } from '../app.js';

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
test('contact uses the public practice address with a no-JS direct route', async () => {
  assert.equal(siteConfig.contactEmail,'me@qtmbg.com');
  const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
  assert.ok(html.includes(`data-contact-link href="mailto:${siteConfig.contactEmail}"`));
  assert.match(html,/href="https:\/\/nizzar.com"/);
  assert.match(html,/href="https:\/\/quantumbranding.ai"/);
});
test('all local section links resolve and IDs are unique', async () => {
  const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length);
  for(const [,anchor] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(anchor),`Missing target ${anchor}`);
  for(const id of ['main','work','practice','lab','nizzar','start']) assert.ok(ids.includes(id));
  assert.match(html,/<dialog[^>]+aria-labelledby="dialog-title"/);
});
test('every static editorial key has an explicit French translation', async () => {
  const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
  for(const [,key] of html.matchAll(/data-i18n="([^"]+)"/g)) {
    assert.equal(typeof french[key],'string',`Missing French key: ${key}`);
    assert.ok(french[key].trim(),`Empty French key: ${key}`);
  }
});
test('selected reviews preserve attribution and exact English excerpts without metrics', async () => {
  const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
  const voices = html.split('class="client-voices')[1].split('class="work-foot')[0];
  const evidence = [
    ['elvinpicardo','Canada','His knowledge and skill in eliciting the right information so it can be used for strategy is extremely good.'],
    ['tisasen','Guadeloupe','He understands my brand, is able to relate and enhance my own understanding of my brand. He over-delivers from the start till the end, working fast and efficient, within the schedule of the process as agreed.'],
    ['shelahj','United States',"He brought great design, built on solid business strategy that is backed by years of experience. […] Nizzar is not a vendor, he's part of the team!"]
  ];
  assert.equal((voices.match(/<figure /g)||[]).length,3);
  for(const [handle,country,quote] of evidence) {
    assert.ok(voices.includes(`data-review="${handle}"`));
    assert.ok(voices.includes(country));
    assert.ok(voices.includes(`<p lang="en">“${quote}”</p>`));
  }
  assert.doesNotMatch(voices,/100X|5★|\$|years ago/);
});
test('proof and R&D remain nested in the existing section architecture', async () => {
  const html = await readFile(new URL('../index.html',import.meta.url),'utf8');
  assert.equal((html.match(/<section\b/g)||[]).length,7);
  assert.ok(html.includes('17+ years behind the practice.'));
  assert.ok(html.includes('Pattern recognition comes first; AI accelerates'));
  assert.ok(html.includes('not claims of current Quantum Branding engagements'));
  const lab = html.split('id="lab"')[1].split('</section>')[0];
  for(const id of ['founder-toolbox','signal-scan','perception-compass','the-mirror']) assert.ok(lab.includes(`id="${id}"`));
  assert.ok(lab.includes('PRODUCT · IN DEVELOPMENT'));
  assert.ok(lab.includes('not a Quantum Branding service'));
  assert.ok(lab.includes('https://app.quantumbranding.ai/signal-scan.html'));
  assert.doesNotMatch(JSON.stringify(territories),/Founder Toolbox|Signal Scan|Perception Compass|The Mirror/);
});