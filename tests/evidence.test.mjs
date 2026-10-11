import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {proof} from '../src/evidence.mjs';
const html=p=>readFileSync(new URL('../dist/'+p+'.html',import.meta.url),'utf8');
test('commercial quotes identify source precision and keep original wording in both locales',()=>{
  for(const p of ['work','fr/work']) {
    const s=html(p);
    assert.ok(s.includes('Leslie Lentz'));
    assert.ok(s.includes('Hanane El Aafifi'));
    assert.ok(s.includes('https://www.linkedin.com/in/nizzar/details/recommendations/?detailScreenTabIndex=0'));
    assert.ok(s.includes('noopener noreferrer'));
    assert.ok(s.includes('Ma rencontre avec Nizar lors d’une formation'));
    assert.ok(!s.includes('His knowledge and skill in eliciting'));
  }
});
test('an unapproved placement does not render a quote',()=>{
  assert.equal(proof(['leslie-lentz-2026-09-28'],'en','/lab'), '<div class="quote-grid"></div>');
});
test('Selvaggi gets client evidence and notes do not publish unreconciled historical quotes',()=>{
  assert.ok(html('work/selvaggi').includes('Leslie Lentz'));
  assert.ok(!html('notes').includes('His knowledge and skill in eliciting'));
  assert.ok(html('notes').includes('https://nizzar.com/in-their-words'));
});
