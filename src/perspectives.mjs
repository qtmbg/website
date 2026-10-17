// People & Perspectives — a curated collection of firsthand accounts of working
// with Nizzar, organised by the different ways people worked with him. Original
// quotations are stored verbatim and never rewritten; the UI around them is
// translated. The excerpt-only records quote the person's own LinkedIn
// recommendation; the full text lives in nizzar.com/in-their-words.
import {esc} from './shared.mjs';

const LINKEDIN = 'https://www.linkedin.com/in/nizzar/details/recommendations/?detailScreenTabIndex=0';
const NIZZAR_FULL = 'https://nizzar.com/in-their-words';

export const perspectives = [
  {
    id: 'francoise-rapp-2026-10-15',
    author_name: 'Françoise Rapp',
    author_title: 'Olfactive Strategist & Perfumer',
    organization: 'Co-founder, Rapp & Esen',
    lens_en: 'The client',
    lens_fr: 'La cliente',
    relationship_en: 'Nizzar led the Quantum Branding of Rapp & Esen.',
    relationship_fr: 'Nizzar a mené le Quantum Branding de Rapp & Esen.',
    original_language: 'en',
    full_original_text: [
      'Working with Nizzar on the Quantum Branding of Rapp & Esen has been a truly profound and transformative experience.',
      'His approach took us far beyond traditional branding. It invited us to explore the deepest values, intentions and essence of our brand, creating a genuine alignment between my co-founder and me.',
      'From this clarity, everything began to unfold naturally. The typography, colors, perfume bottle shapes, visual identity and communication all emerged as coherent expressions of who we are and what we want our brand to convey. Nothing feels arbitrary; every detail has meaning and purpose.',
      'What makes Nizzar exceptional is his rare combination of experience, remarkable sensitivity and creative intuition. He has an extraordinary ability to perceive what lies beneath the surface, bring it into focus and translate it into a brand identity that feels both deeply authentic and immediately recognizable.',
      'The result is much more than a beautiful brand. It is an identity that feels entirely aligned, one whose coherence and authenticity we believe our future customers will instinctively perceive.',
      'We are thrilled to be launching Rapp & Esen with such a strong sense of clarity, confidence and connection to every aspect of our brand.',
      'I wholeheartedly recommend Nizzar to anyone seeking a branding experience that goes beyond aesthetics to reveal and express the true essence of a brand.'
    ],
    approved_excerpt: 'What makes Nizzar exceptional is his rare combination of experience, remarkable sensitivity and creative intuition.',
    source_platform: 'LinkedIn',
    source_url: LINKEDIN,
    source_verified: true,
    date: '2026-10-15',
    related_projects: ['rapp-esen'],
    display_locations: ['people', 'work:rapp-esen'],
    category: 'client',
    context_en: 'On the Quantum Branding of Rapp & Esen, a bespoke perfume house.',
    context_fr: 'À propos du Quantum Branding de Rapp & Esen, une maison de parfum sur mesure.'
  },
  {
    id: 'frank-poncelet-2026-10-06',
    author_name: 'Frank Poncelet',
    author_title: 'Operations Architect, Xplore Group',
    lens_en: 'On positioning',
    lens_fr: 'Sur le positionnement',
    original_language: 'en',
    approved_excerpt: "Nizzar sees within minutes how a project or a person should be positioned, what story to tell and to whom, and he hands out that advice even when there's nothing in it for him.",
    source_platform: 'LinkedIn',
    source_url: LINKEDIN,
    full_source: NIZZAR_FULL,
    source_verified: true,
    date: '2026-10-06',
    display_locations: ['people'],
    category: 'strategy'
  },
  {
    id: 'eva-shalenko-2026-10-06',
    author_name: 'Eva Shalenko',
    author_title: 'Business development & growth advisor',
    lens_en: 'On brand thinking',
    lens_fr: 'Sur la pensée de marque',
    original_language: 'en',
    approved_excerpt: 'what stands out is the way he combines deep thinking about branding with a genuine curiosity for what’s next.',
    source_platform: 'LinkedIn',
    source_url: LINKEDIN,
    full_source: NIZZAR_FULL,
    source_verified: true,
    date: '2026-10-06',
    display_locations: ['people'],
    category: 'strategy'
  },
  {
    id: 'danosch-zahedi-2026-10-07',
    author_name: 'Danosch Zahedi',
    author_title: 'Board of Advisors, TheBlock FZCO',
    lens_en: 'On working together, over time',
    lens_fr: 'Sur la durée',
    original_language: 'en',
    approved_excerpt: 'I’ve chosen to work with Nizzar again and again over the years, and that probably says more than anything else could.',
    source_platform: 'LinkedIn',
    source_url: LINKEDIN,
    full_source: NIZZAR_FULL,
    source_verified: true,
    date: '2026-10-07',
    display_locations: ['people'],
    category: 'collaboration'
  },
  {
    id: 'sander-gansen-2026-10-05',
    author_name: 'Sander Gansen',
    author_title: 'Founder, Perxify',
    lens_en: 'On results',
    lens_fr: 'Sur les résultats',
    original_language: 'en',
    approved_excerpt: "Nizzar's someone who talks the talk and actually brings results.",
    source_platform: 'LinkedIn',
    source_url: LINKEDIN,
    full_source: NIZZAR_FULL,
    source_verified: true,
    date: '2026-10-05',
    display_locations: ['people'],
    category: 'collaboration'
  }
];

const byId = new Map(perspectives.map(p => [p.id, p]));
const anchorId = id => 'p-' + id.replace(/-\d{4}-\d{2}-\d{2}$/, '');

function perspectiveFigure(p, lang) {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const lens = fr ? p.lens_fr : p.lens_en;
  const rel = fr ? p.relationship_fr : p.relationship_en;
  const body = p.full_original_text
    ? p.full_original_text.map(x => `<p>${esc(x)}</p>`).join('')
    : `<p>“${esc(p.approved_excerpt)}”</p>`;
  const links = [
    `<a class="text-link" href="${esc(p.source_url)}" target="_blank" rel="noopener noreferrer">${t('On LinkedIn ↗', 'Sur LinkedIn ↗')}</a>`,
    p.full_source ? `<a class="text-link" href="${esc(p.full_source)}">${t('The full recommendation ↗', 'La recommandation complète ↗')}</a>` : ''
  ].filter(Boolean).join('<span aria-hidden="true"> · </span>');
  return `<figure class="perspective" id="${anchorId(p.id)}" data-perspective="${esc(p.id)}">
${lens ? `<p class="perspective-lens">${esc(lens)}</p>` : ''}
<blockquote lang="${esc(p.original_language)}">${body}</blockquote>
<figcaption>
<span class="perspective-author">${esc(p.author_name)}</span>
<span class="perspective-role">${esc(p.author_title)}${p.organization ? ' · ' + esc(p.organization) : ''}</span>
${rel ? `<span class="field-hint">${esc(rel)}</span>` : ''}
<span class="perspective-links">${links}</span>
</figcaption>
</figure>`;
}

// The full People & Perspectives reading experience, with a small index to move
// between accounts while staying inside the window.
export function peoplePanel(ids, lang = 'en') {
  const fr = lang === 'fr';
  const chosen = ids.map(id => byId.get(id)).filter(Boolean);
  if (!chosen.length) return '';
  const index = chosen.length > 1
    ? `<nav class="perspective-index" aria-label="${fr ? 'Les personnes' : 'The people'}">${chosen.map(p => `<a href="#${anchorId(p.id)}">${esc(p.author_name)}</a>`).join('')}</nav>`
    : '';
  return `${index}<div class="people-stream">${chosen.map(p => perspectiveFigure(p, lang)).join('')}</div>`;
}

// Compact "from the people involved" block for a work/project page: the excerpt
// plus a link to the full account in People & Perspectives.
export function fromThePeopleInvolved(ids, lang = 'en', peopleHref = '/people') {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const chosen = ids.map(id => byId.get(id)).filter(Boolean);
  if (!chosen.length) return '';
  return `<div class="people-involved"><p class="field-hint">${t('From the people involved', 'Par les personnes concernées')}</p>${chosen.map(p => `<figure class="perspective perspective-compact" data-perspective="${esc(p.id)}"><blockquote lang="${esc(p.original_language)}"><p>“${esc(p.approved_excerpt)}”</p></blockquote><figcaption><span class="perspective-author">${esc(p.author_name)}</span><span class="perspective-role">${esc(p.author_title)}${p.organization ? ' · ' + esc(p.organization) : ''}</span></figcaption></figure>`).join('')}<a class="text-link" href="${esc(peopleHref)}">${t('Read the full account ↗', 'Lire le témoignage complet ↗')}</a></div>`;
}
