// The practice lens on the Work record. Copy lives in practice-copy.json
// (EN/FR, written from the canonical records on nizzar.com/work); routing and
// destinations in lens.mjs. Interface labels only here.
import { readFileSync, existsSync } from 'node:fs';
import { esc, route, territories } from '../shared.mjs';
import { projects } from './projects.mjs';
import { lens, lensOf, nizzarCase, proofTerritory, proofWall, NIZZAR_WORK } from './lens.mjs';
import { artifact, wall, film } from './render.mjs';

const file = new URL('./practice-copy.json', import.meta.url);
export const practiceCopy = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
const bySlug = new Map(projects.map(p => [p.slug, p]));
const L = lang => (en, fr) => (lang === 'fr' ? fr : en);

export const copyFor = (slug, lang) => practiceCopy[slug]?.[lang];
export const recordFor = slug => practiceCopy[slug];

function yearsOf(slug, lang) {
  const c = practiceCopy[slug];
  if (c && Object.hasOwn(c, 'start')) {
    if (!c.start) return '';
    const end = c.ongoing ? L(lang)('present', "aujourd'hui") : c.end;
    return end && end !== c.start ? `${c.start} – ${end}` : String(c.start);
  }
  const p = bySlug.get(slug);
  if (!p?.start) return '';
  return p.end && p.end !== p.start ? `${p.start} – ${p.end === 'present' ? L(lang)('present', 'aujourd’hui') : p.end}` : String(p.start);
}

function row(slug, lang, n) {
  const c = copyFor(slug, lang);
  if (!c) return '';
  const meta = [c.context, yearsOf(slug, lang)].filter(Boolean).join(' · ');
  return `<a href="${route('/work/' + slug, lang)}"><article><span class="essay-number">${String(n).padStart(2, '0')}</span><h3>${esc(c.title)}</h3><p>${esc(c.lede)}${meta ? `<br><small>${esc(meta)}</small>` : ''}</p><span class="text-link">${L(lang)('Read the case', 'Lire le cas')}</span></article></a>`;
}

// The /work landing: practice engagements, then experience behind the practice
// grouped by the six territories, then the way to the complete record.
export function practiceWork(lang, { caseCards, section, link }) {
  const t = L(lang);
  const keep = Object.keys(lens).filter(s => lens[s] === 'KEEP');
  const keepCases = keep.filter(s => s === 'verne-jewels' || s === 'selvaggi');
  const keepRows = keep.filter(s => !keepCases.includes(s) && copyFor(s, lang));
  const engagements = section(`<div class="section-heading"><h2>${t('Work of the practice.', 'Le travail de la pratique.')}</h2><p>${t('Engagements, products and partnerships around Quantum Branding since the work began, in late 2023.', 'Missions, produits et partenariats autour de Quantum Branding depuis le début du travail, fin 2023.')}</p></div>`) + section(caseCards()) + (keepRows.length ? section(`<div class="essay-list">${keepRows.map((s, i) => row(s, lang, i + 1)).join('')}</div>`) : '');
  let n = 0;
  const groups = territories.map((terr, i) => {
    const slugs = Object.keys(proofTerritory).filter(s => proofTerritory[s] === i && copyFor(s, lang));
    if (!slugs.length) return '';
    return `<h3 class="territory-head">${esc(t(terr[0], terr[1]))}</h3><div class="essay-list">${slugs.map(s => row(s, lang, ++n)).join('')}</div>`;
  }).join('');
  // The wall uses committed archive covers, so the landing keeps production's media even before proof copy exists.
  const withCovers = proofWall.filter(s => bySlug.get(s)?.cover).map(s => [s]);
  const experience = groups || withCovers.length ? section(`<div class="section-heading"><h2>${t('The experience behind the practice.', 'L’expérience derrière la pratique.')}</h2><p>${t('Before Quantum Branding existed, the same way of working was already at work: in institutions, in a studio I co-founded, in ventures and in advisory. These projects keep their own history. They show what the practice brings to each of its six territories.', 'Avant que Quantum Branding existe, la même manière de travailler était déjà à l’œuvre : dans des institutions, dans un studio que j’ai cofondé, dans des projets entrepreneuriaux et en conseil. Ces projets gardent leur propre histoire. Ils montrent ce que la pratique apporte à chacun de ses six terrains.')}</p></div>${withCovers.length ? wall(lang, withCovers) : ''}${groups}`) : '';
  const record = section(`<div class="split"><h2>${t('The complete record.', 'Le parcours complet.')}</h2><div class="prose"><p>${t('Every project since 2006, with its dates, its attribution and its evidence, lives on nizzar.com.', 'Chaque projet depuis 2006, avec ses dates, son attribution et ses preuves, se trouve sur nizzar.com.')}</p><p><a class="text-link" href="${NIZZAR_WORK}">${t('The full body of work on nizzar.com ↗', 'L’ensemble du travail sur nizzar.com ↗')}</a></p></div></div>`);
  return engagements + experience + record;
}

// Short proof page: labelled as experience before the practice, links to the full case.
export function proofBody(slug, lang, { heading, section, link }) {
  const t = L(lang);
  const c = copyFor(slug, lang);
  const p = bySlug.get(slug);
  const eyebrow = [t('Experience before the practice', 'Expérience antérieure à la pratique'), c.context, yearsOf(slug, lang)].filter(Boolean).join(' · ');
  const terr = territories[proofTerritory[slug]];
  const hero = p?.cover ? `<section class="section wrap case-hero">${artifact(p.cover, lang, { eager: true })}</section>` : '';
  const story = (c.sections || []).map(s => section(`<div class="prose">${s.heading ? `<h2>${esc(s.heading)}</h2>` : ''}${s.body.map(x => `<p>${esc(x)}</p>`).join('')}</div>`)).join('');
  const shows = c.shows ? section(`<div class="split"><h2>${t('What it shows.', 'Ce que cela montre.')}</h2><div class="prose"><p>${esc(c.shows)}</p>${terr ? `<p>${link('/practice', esc(t(terr[0], terr[1])))}</p>` : ''}</div></div>`) : '';
  const full = section(`<div class="prose"><p><a class="button" href="${nizzarCase(slug)}">${t('Read the full case on nizzar.com', 'Lire le cas complet sur nizzar.com')}</a></p><p>${link('/work', t('Back to the work', 'Retour au travail'))}</p></div>`);
  return heading(esc(c.title), esc(c.lede), esc(eyebrow)) + hero + story + shows + full;
}

// Commercial expression of a shared career record. KEEP is a routing decision;
// relationship, role and provenance stay independent of the visible context.
export function keepBody(slug, lang, { heading, section, link, contact }) {
  const t = L(lang);
  const r = recordFor(slug);
  const c = copyFor(slug, lang);
  const p = bySlug.get(slug);
  const eyebrow = [c.context, yearsOf(slug, lang)].filter(Boolean).join(' · ');
  const hero = p?.cover ? `<section class="section wrap case-hero">${artifact(p.cover, lang, { eager: true })}</section>` : '';
  const facts = [
    [t('Entity', 'Entité'), r.name],
    [t('Relationship', 'Relation'), r.relationshipLabel[lang]],
    [t('Role', 'Rôle'), r.role[lang]],
    [t('Context', 'Contexte'), c.context],
    [t('Attribution', 'Attribution'), r.attributionLabel[lang]],
    [t('Period', 'Période'), yearsOf(slug, lang)]
  ].filter(([, value]) => value);
  const panel = section(`<dl class="info-panel">${facts.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>`, 'case-block is-info');
  const story = c.sections.map(s => section(`<div class="prose"><h2>${esc(s.heading)}</h2>${s.body.map(x => `<p>${esc(x)}</p>`).join('')}</div>`)).join('');
  // Reuse existing public recording components, without repeating archive prose.
  const films = (p?.blocks || []).flatMap(b => b.type === 'film' ? [b] : b.type === 'films' ? b.items : []);
  const evidence = films.length ? section(`<h2>${t('Recordings', 'Enregistrements')}</h2><div class="films">${films.map(f => film(f, lang)).join('')}</div>`) : '';
  const shows = c.shows ? section(`<div class="split"><h2>${t('What it shows.', 'Ce que cela montre.')}</h2><div class="prose"><p>${esc(c.shows)}</p></div></div>`) : '';
  const related = r.related.length ? section(`<div class="prose"><h2>${t('Related work', 'Travaux liés')}</h2><ul>${r.related.map(item => `<li><a href="${esc(item.lens === 'KEEP' ? route('/work/' + item.slug, lang) : nizzarCase(item.slug))}">${esc(item.name)}</a></li>`).join('')}</ul></div>`) : '';
  const career = r.canonicalCareerUrl ? `<p><a class="text-link" href="${esc(r.canonicalCareerUrl)}">${t('Explore the full case on nizzar.com', 'Explorer le cas complet sur nizzar.com')}</a></p>` : '';
  return heading(esc(c.title), esc(c.lede), esc(eyebrow)) + hero + panel + story + evidence + shows + related + section(`<div class="prose">${career}${contact(t('Ask me about this work', 'Parlons de ce travail'))}<p>${link('/work', t('Back to the work', 'Retour au travail'))}</p></div>`);
}

// Interim notice on archive pages whose canonical home is now nizzar.com.
export function migratedNotice(slug, lang, { section }) {
  const t = L(lang);
  return section(`<div class="prose archive-moved"><p>${t('The complete record of this project, with its context and evidence, now lives with the full body of work on nizzar.com.', 'Le dossier complet de ce projet, avec son contexte et ses preuves, se trouve désormais avec l’ensemble du travail sur nizzar.com.')}</p><p><a class="text-link" href="${nizzarCase(slug)}">${t('Open the record on nizzar.com ↗', 'Ouvrir le dossier sur nizzar.com ↗')}</a></p></div>`);
}

export { lensOf, nizzarCase };
