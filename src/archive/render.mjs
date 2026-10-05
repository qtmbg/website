// The Work archive, rendered. Records live in src/archive/projects.mjs;
// public media records in src/archive/media-public.json (provenance stays
// internal in archive/media.json), derived sizes in src/archive/media-built.json.
// Every visible word comes from those records: nothing here writes copy
// beyond interface labels.
import { readFileSync, existsSync } from 'node:fs';
import { esc, route } from '../shared.mjs';
import { projects, eras, categories, relationships } from './projects.mjs';

const here = new URL('.', import.meta.url);
const read = (file, fallback) => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : fallback);
const built = read(new URL('./media-built.json', here), {});
// Public media records only (written by scripts/media-public.mjs). Never read
// archive/ here: it is not deployed, and reading it made local builds show
// images that the deployed build dropped.
const mediaList = read(new URL('./media-public.json', here), []);
const mediaById = new Map(mediaList.map(m => [m.id, m]));

const L = lang => (en, fr) => (lang === 'fr' ? fr : en);
const pick = (value, lang) => (value && typeof value === 'object' && !Array.isArray(value) ? value[lang] ?? value.en : value);
const list = (value, lang) => { const selected = pick(value, lang); return Array.isArray(selected) ? selected : selected ? [selected] : []; };

export const bySlug = new Map(projects.map(p => [p.slug, p]));
export const workPath = (slug, lang) => route(`/work/${slug}`, lang);

/* ------------------------------------------------------------- facts */
export function years(p, lang) {
  if (!p.start) return L(lang)('Date to confirm', 'Date à confirmer');
  return p.end && p.end !== p.start ? `${p.start} – ${p.end === 'present' ? L(lang)('present', 'aujourd’hui') : p.end}` : String(p.start);
}
export const relation = (p, lang) => pick(relationships[p.relationship], lang) || p.relationship;

/* ------------------------------------------------------------- media */
// An image with its real dimensions, responsive sources and a placeholder
// colour, lazy by default. Only derived (public) assets can render.
export function picture(id, lang, { sizes = '(max-width: 800px) 100vw, 1060px', eager = false, cls = '' } = {}) {
  const b = built[id];
  const m = mediaById.get(id);
  if (!b || !m || !['PUBLIC SAFE', 'PUBLIC WITH CREDIT'].includes(m.publishability) || !b.sizes?.length) return '';
  const largest = b.sizes.at(-1);
  const srcset = b.sizes.map(s => `${s.src} ${s.width}w`).join(', ');
  const small = b.sizes.find(s => s.width >= 960) || largest;
  return `<img${cls ? ` class="${cls}"` : ''} src="${small.src}" srcset="${srcset}" sizes="${sizes}" width="${largest.width}" height="${largest.height}" alt="${esc(pick(m.alt, lang) || '')}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" style="--ph:${b.colour}">`;
}
const hasMedia = id => Boolean(built[id]?.sizes?.length && ['PUBLIC SAFE', 'PUBLIC WITH CREDIT'].includes(mediaById.get(id)?.publishability));
const largest = id => built[id].sizes.at(-1).src;
const credit = (m, lang) => (m.credit ? ` <b>${esc(pick(m.credit, lang))}</b>` : '');

export function artifact(id, lang, options = {}) {
  if (!hasMedia(id)) return '';
  const m = mediaById.get(id);
  const caption = pick(m.caption, lang);
  return `<figure class="artifact"><a class="artifact-open" href="${largest(id)}" style="--ph:${built[id].colour}">${picture(id, lang, options)}</a>${caption || m.credit ? `<figcaption>${esc(caption || '')}${credit(m, lang)}</figcaption>` : ''}</figure>`;
}

export function film(v, lang) {
  const t = L(lang);
  const poster = v.poster && hasMedia(v.poster) ? picture(v.poster, lang, { sizes: '(max-width: 800px) 100vw, 1060px' }) : '';
  const meta = `${esc(pick(v.title, lang))}${v.meta ? `<small>${esc(pick(v.meta, lang))}</small>` : ''}`;
  const local = v.media && built[v.media]?.file?.src && ['PUBLIC SAFE', 'PUBLIC WITH CREDIT'].includes(mediaById.get(v.media)?.publishability) ? built[v.media].file.src : v.src;
  const href = v.youtube ? `https://www.youtube.com/watch?v=${v.youtube}` : local || v.url;
  if (!href) return ''; 
  return `<a class="film" href="${esc(href)}"${v.youtube ? ` data-youtube="${esc(v.youtube)}"` : local ? ` data-video="${esc(local)}"` : ''} aria-label="${esc(t('Play film: ', 'Lire le film : ') + pick(v.title, lang))}">${poster}<span class="film-play" aria-hidden="true"></span><span class="film-meta" aria-hidden="true">${meta}</span></a>`;
}

function document_(d, lang) {
  return `<a class="document" href="${esc(d.href)}"${d.download ? ' download' : ''}>${d.thumb && hasMedia(d.thumb) ? picture(d.thumb, lang, { sizes: '220px' }) : ''}<span>${esc(pick(d.title, lang))}</span>${d.meta ? `<small>${esc(pick(d.meta, lang))}</small>` : ''}</a>`;
}

/* ------------------------------------------------------- the landing */
function thumbFor(p) { return [p.cover, ...(p.gallery || [])].find(hasMedia); }

function finderItem(p, lang) {
  const t = L(lang);
  const cover = thumbFor(p);
  const cats = (p.categories || []).join(' ');
  return `<li class="finder-item${p.flagship ? ' is-flagship' : ''}" data-cats="${cats}" data-era="${p.era}"><a href="${workPath(p.slug, lang)}"><span class="finder-thumb${cover ? '' : ' is-empty'}"${cover ? ` style="--thumb:${built[cover].colour}"` : ''}>${cover ? picture(cover, lang, { sizes: p.flagship ? '(max-width: 800px) 100vw, 420px' : '(max-width: 800px) 50vw, 200px' }) : ''}${p.flagship ? `<span class="finder-badge">${t('Case', 'Cas')}</span>` : ''}</span><span class="finder-name">${esc(p.title)}</span><span class="finder-context">${esc(pick(p.oneLine, lang) || '')}</span><span class="finder-role">${esc(pick(p.role, lang) || '')}</span><span class="finder-meta">${[years(p, lang), relation(p, lang)].filter(Boolean).map(esc).join(' · ')}</span>${cover && mediaById.get(cover)?.credit ? `<span class="finder-credit">${esc(pick(mediaById.get(cover).credit, lang))}</span>` : ''}</a></li>`;
}

export function finder(lang) {
  const t = L(lang);
  const visible = projects.filter(p => p.listed !== false);
  const counts = key => visible.filter(p => (p.categories || []).includes(key)).length;
  const filters = `<p class="finder-label">${t('Show', 'Afficher')}</p><button class="finder-filter" type="button" data-filter="all" data-value="all" aria-pressed="true">${t('Everything', 'Tout')}<span class="count">${visible.length}</span></button>`
    + `<p class="finder-label">${t('Kind of work', 'Nature du travail')}</p>${Object.entries(categories).filter(([key]) => counts(key)).map(([key, label]) => `<button class="finder-filter" type="button" data-filter="cats" data-value="${key}" aria-pressed="false">${esc(pick(label, lang))}<span class="count">${counts(key)}</span></button>`).join('')}`
    + `<p class="finder-label">${t('Chapter', 'Chapitre')}</p>${eras.filter(e => visible.some(p => p.era === e.key)).map(e => `<button class="finder-filter" type="button" data-filter="era" data-value="${e.key}" aria-pressed="false">${esc(pick(e.label, lang))}<span class="count">${visible.filter(p => p.era === e.key).length}</span></button>`).join('')}`;
  const featured = visible.filter(p => p.flagship);
  const featureGroup = featured.length ? `<section class="finder-group finder-featured" aria-labelledby="featured-work"><h3 class="finder-group-head" id="featured-work">${t('Open the work', 'Entrer dans le travail')}</h3><ul class="finder-grid">${featured.map(p => finderItem(p, lang)).join('')}</ul></section>` : '';
  const groups = featureGroup + eras.map(e => {
    const items = visible.filter(p => p.era === e.key && !p.flagship);
    if (!items.length) return '';
    return `<section class="finder-group" aria-labelledby="era-${e.key}"><h3 class="finder-group-head" id="era-${e.key}">${esc(pick(e.label, lang))}<span>${esc(pick(e.span, lang) || '')}</span></h3><ul class="finder-grid">${items.map(p => finderItem(p, lang)).join('')}</ul></section>`;
  }).join('');
  return `<div class="window finder" data-archive><div class="window-bar" aria-hidden="true"><span class="window-lights"><i></i><i></i><i></i></span><span class="window-title">${t('Archive', 'Archives')}</span></div><div class="finder-body"><details class="finder-filter-panel" open><summary>${t('Filters', 'Filtres')}</summary><nav class="finder-sidebar" aria-label="${t('Filter the archive', 'Filtrer les archives')}">${filters}</nav></details><div class="finder-main"><div class="finder-toolbar"><strong>${t('Work since 2006', 'Le travail depuis 2006')}</strong><span data-count aria-live="polite">${visible.length} ${t('projects', 'projets')}</span></div>${groups}</div></div></div>`;
}

export function pillars(lang, slugs) {
  const t = L(lang);
  return `<div class="pillar-stack">${slugs.map(slug => bySlug.get(slug)).filter(Boolean).map((p, i) => {
    const shots = [p.cover, ...(p.gallery || [])].filter(hasMedia).slice(0, 3);
    return `<a class="pillar" href="${workPath(p.slug, lang)}" style="z-index:${10 + i}"><span class="folder-tab" aria-hidden="true"><span>${esc(p.tab || p.title)}</span></span><div class="pillar-info"><p class="eyebrow">${[relation(p, lang), years(p, lang)].filter(Boolean).map(esc).join(' · ')}</p><h3>${esc(p.title)}</h3><p>${esc(pick(p.oneLine, lang))}</p><span class="text-link">${t('Open the case', 'Ouvrir le cas')}</span></div>${shots.length ? `<div class="pillar-preview" aria-hidden="true"><div class="window-bar"><span class="window-lights"><i></i><i></i><i></i></span><span class="window-title">${esc(p.title)}</span></div><div class="pillar-shots${shots.length === 1 ? ' is-single' : ''}">${shots.map(id => picture(id, lang, { sizes: '(max-width: 800px) 100vw, 560px' })).join('')}</div></div>` : ''}</a>`;
  }).join('')}</div>`;
}

export function timeline(lang) {
  const t = L(lang);
  const dated = projects.filter(p => p.listed !== false && p.start && /^\d{4}$/.test(String(p.start)));
  const now = new Date().getFullYear();
  const first = Math.min(2006, ...dated.map(p => Number(p.start)));
  const span = Math.max(1, now - first + 1);
  const rows = eras.map(e => {
    const items = dated.filter(p => p.era === e.key).sort((a, b) => a.start - b.start);
    if (!items.length) return '';
    return `<div class="timeline-era era-${e.css}"><h3>${esc(pick(e.label, lang))}</h3><ol class="timeline-rows">${items.map(p => {
      const end = p.end === 'present' ? now : Number(p.end || p.start);
      return `<li><a href="${workPath(p.slug, lang)}"><span class="tl-name">${esc(p.title)}<small>${esc(years(p, lang))}</small></span><span class="tl-track" aria-hidden="true"><span class="tl-bar" style="--s:${p.start};--e:${end}"></span></span></a></li>`;
    }).join('')}</ol></div>`;
  }).join('');
  const undated = projects.filter(p => p.listed !== false && !p.start);
  const axis = Array.from({ length: span }, (_, i) => `<li>${first + i}</li>`).join('');
  return `<div class="timeline" style="--first:${first};--span:${span}"><ol class="timeline-axis" aria-hidden="true">${axis}</ol>${rows}</div>${undated.length ? `<p class="timeline-undated">${t('Not yet dated: ', 'Pas encore datés : ')}${undated.map(p => `<a href="${workPath(p.slug, lang)}">${esc(p.title)}</a>`).join(', ')}.</p>` : ''}`;
}

export function index(lang) {
  const t = L(lang);
  const rows = projects.filter(p => p.listed !== false)
    .sort((a, b) => (Number(b.start) || 0) - (Number(a.start) || 0) || a.title.localeCompare(b.title));
  return `<div class="index-wrap"><table class="index-table"><thead><tr><th scope="col">${t('Project', 'Projet')}</th><th scope="col">${t('Years', 'Années')}</th><th scope="col">${t('Relationship', 'Relation')}</th><th scope="col">${t('My role', 'Mon rôle')}</th></tr></thead><tbody>${rows.map(p => `<tr><td><a href="${workPath(p.slug, lang)}">${esc(p.title)}</a></td><td>${esc(years(p, lang))}</td><td>${esc(relation(p, lang))}</td><td>${esc(pick(p.role, lang) || '')}</td></tr>`).join('')}</tbody></table></div>`;
}

/* ------------------------------------------------------ project pages */
function infoPanel(p, lang) {
  const t = L(lang);
  const rows = [
    [t('Relationship', 'Relation'), relation(p, lang)],
    [t('Years', 'Années'), years(p, lang)],
    [t('With', 'Avec'), pick(p.context, lang)],
    [t('My role', 'Mon rôle'), pick(p.role, lang)],
    [t('Studio / team', 'Studio / équipe'), p.studio ? bySlug.get(p.studio)?.title || p.studio : pick(p.team, lang) || '']
  ].filter(([, v]) => v);
  return `<dl class="info-panel">${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
}

function block(b, p, lang) {
  const t = L(lang);
  switch (b.type) {
    case 'text': return `<section class="section wrap case-block is-text"><div class="prose">${b.kicker ? `<span class="kicker">${esc(pick(b.kicker, lang))}</span>` : ''}${b.heading ? `<h2>${esc(pick(b.heading, lang))}</h2>` : ''}${list(b.body, lang).map(para => `<p>${esc(para)}</p>`).join('')}</div></section>`;
    case 'image': return `<section class="section wrap case-block${b.paper ? ' is-paper' : ''}">${artifact(b.media, lang)}</section>`;
    case 'gallery': {
      const items = b.media.filter(hasMedia);
      if (!items.length) return '';
      return `<section class="section wrap case-block${b.paper ? ' is-paper' : ''}">${b.title ? `<h2 class="block-title is-wide">${esc(pick(b.title, lang))}</h2>` : ''}<div class="gallery is-${b.layout || 'grid'}">${items.map(id => artifact(id, lang, { sizes: b.layout === 'pair' || b.layout === 'spread' ? '(max-width: 800px) 100vw, 530px' : '(max-width: 800px) 100vw, 340px' })).join('')}</div></section>`;
    }
    case 'film': return `<section class="section wrap case-block${b.paper ? ' is-paper' : ''}">${b.title ? `<h2 class="block-title is-wide">${esc(pick(b.title, lang))}</h2>` : ''}${film(b, lang)}</section>`;
    case 'films': return `<section class="section wrap case-block${b.paper ? ' is-paper' : ''}">${b.title ? `<h2 class="block-title is-wide">${esc(pick(b.title, lang))}</h2>` : ''}<div class="films">${b.items.map(v => film(v, lang)).join('')}</div></section>`;
    case 'audio': return `<section class="section wrap case-block"><figure class="track"><audio controls preload="none" aria-label="${esc(pick(b.caption, lang) || t('Archive audio', 'Audio des archives'))}" src="${esc(b.src)}"></audio><figcaption>${esc(pick(b.caption, lang))}</figcaption></figure></section>`;
    case 'documents': return `<section class="section wrap case-block">${b.title ? `<h2 class="block-title is-wide">${esc(pick(b.title, lang))}</h2>` : ''}<div class="documents">${b.items.map(d => document_(d, lang)).join('')}</div></section>`;
    case 'quote': return `<section class="section wrap case-block"><figure class="case-quote"><blockquote>“${esc(pick(b.quote, lang))}”</blockquote><figcaption>${esc(pick(b.author, lang))}</figcaption></figure></section>`;
    case 'info': return `<section class="section wrap case-block is-info">${infoPanel(p, lang)}</section>`;
    default: return '';
  }
}

export function projectBody(p, lang, heading) {
  const t = L(lang);
  const hero = p.cover && hasMedia(p.cover) ? `<section class="section wrap case-hero">${artifact(p.cover, lang, { eager: true })}</section>` : '';
  const story = (p.blocks || [{ type: 'text', body: p.summary }, ...(p.gallery?.length ? [{ type: 'gallery', media: p.gallery }] : [])]).map(b => block(b, p, lang)).join('');
  const credits = (p.credits || []).length ? `<section class="section wrap case-block" id="project-credits"><h2 class="block-title">${t('Credits', 'Crédits')}</h2><dl class="credits">${p.credits.map(c => `<div><dt>${esc(c.name)}</dt><dd>${esc(pick(c.role, lang))}</dd></div>`).join('')}</dl></section>` : '';
  const sources = (p.sources || []).length ? `<section class="section wrap case-block" id="project-sources"><h2 class="block-title">${t('Sources', 'Sources')}</h2><ul class="source-list">${p.sources.map(s => `<li>${s.url ? `<a href="${esc(s.url)}">${esc(pick(s.label, lang))}</a>` : esc(pick(s.label, lang))}${s.note ? ` · ${esc(pick(s.note, lang))}` : ''}</li>`).join('')}</ul></section>` : '';
  const related = (p.related || []).map(slug => bySlug.get(slug)).filter(Boolean);
  const more = related.length ? `<section class="section wrap case-block is-paper"><h2 class="block-title is-wide">${t('Related work', 'Travaux liés')}</h2><ul class="finder-grid">${related.map(r => finderItem(r, lang)).join('')}</ul></section>` : '';
  return `<div class="archive-case"><nav class="case-tabs wrap" aria-label="${t('Project sections', 'Sections du projet')}"><a href="#project-facts">${t('Facts', 'Faits')}</a><a href="#project-evidence">${t('Work and evidence', 'Travail et preuves')}</a>${credits ? `<a href="#project-credits">${t('Credits', 'Crédits')}</a>` : ''}${sources ? `<a href="#project-sources">${t('Sources', 'Sources')}</a>` : ''}</nav>` + heading + hero + `<section class="section wrap case-block is-info" id="project-facts">${infoPanel(p, lang)}</section><div id="project-evidence">` + story + `</div>` + credits + sources + more + `</div>`;
}

/* ------------------------------------------------ home: selected work */
export function wall(lang, picks) {
  return `<div class="gallery-wall">${picks.map(([slug, shape]) => {
    const p = bySlug.get(slug);
    const cover = p && thumbFor(p);
    if (!cover) return '';
    return `<a class="wall-item${shape ? ` is-${shape}` : ''}" href="${workPath(slug, lang)}" style="--ph:${built[cover].colour}">${picture(cover, lang, { sizes: '(max-width: 800px) 50vw, 360px' })}<span>${esc(p.title)}<small>${esc([years(p, lang), relation(p, lang)].filter(Boolean).join(' · '))}</small>${mediaById.get(cover)?.credit ? `<small class="finder-credit">${esc(pick(mediaById.get(cover).credit, lang))}</small>` : ''}</span></a>`;
  }).join('')}</div>`;
}
