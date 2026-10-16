// People & Perspectives — curated, firsthand accounts of working with Nizzar.
// Original quotations are stored verbatim and never rewritten. UI around them is
// translated; the quotations stay in their original language. Model is ready for
// expansion: add records here, reference them by id from a page or a work case.
import {esc} from './shared.mjs';

export const perspectives = [
  {
    id: 'francoise-rapp-2026-10-15',
    author_name: 'Françoise Rapp',
    author_title: 'Olfactive Strategist & Perfumer',
    organization: 'Co-founder, Rapp & Esen',
    relationship_en: 'A branding client. Nizzar led the Quantum Branding of Rapp & Esen.',
    relationship_fr: 'Une cliente de la pratique. Nizzar a mené le Quantum Branding de Rapp & Esen.',
    original_language: 'en',
    // Verbatim, as received. Paragraphs preserved.
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
    source_url: 'https://www.linkedin.com/in/nizzar/details/recommendations/?detailScreenTabIndex=0',
    source_url_type: 'recommendations_section',
    source_verified: true,
    date: '2026-10-15',
    related_projects: ['rapp-esen'],
    display_locations: ['people'],
    category: 'strategic-creative',
    verification_status: 'owner-provided',
    context_en: 'On the Quantum Branding of Rapp & Esen, a perfume house.',
    context_fr: 'À propos du Quantum Branding de Rapp & Esen, une maison de parfum.'
  }
];

const byId = new Map(perspectives.map(p => [p.id, p]));

// Reusable "From the people involved" reading experience. Give it one or more ids.
// Each quotation is typeset with room to breathe; attribution and source are clear.
export function peoplePanel(ids, lang = 'en') {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  return ids.map(id => byId.get(id)).filter(Boolean).map(p => {
    const paras = p.full_original_text.map(x => `<p>${esc(x)}</p>`).join('');
    return `<figure class="perspective" data-perspective="${esc(p.id)}">
<blockquote lang="${esc(p.original_language)}">${paras}</blockquote>
<figcaption>
<span class="perspective-author">${esc(p.author_name)}</span>
<span class="perspective-role">${esc(p.author_title)} · ${esc(p.organization)}</span>
<span class="field-hint">${esc(fr ? p.context_fr : p.context_en)}</span>
<span class="field-hint">${t('LinkedIn recommendation received', 'Recommandation LinkedIn reçue')} ${esc(p.date)}</span>
<a class="text-link" href="${esc(p.source_url)}" target="_blank" rel="noopener noreferrer">${t('Open the recommendations section ↗', 'Ouvrir la rubrique des recommandations ↗')}</a>
<span class="field-hint">${t('Section link; sign-in may be required.', 'Lien vers la rubrique ; connexion parfois nécessaire.')}</span>
</figcaption>
</figure>`;
  }).join('');
}

// Compact variant for a work/project page: the excerpt plus a link to the full account.
export function fromThePeopleInvolved(ids, lang = 'en', peopleHref = '/people') {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const chosen = ids.map(id => byId.get(id)).filter(Boolean);
  if (!chosen.length) return '';
  return `<div class="people-involved"><p class="field-hint">${t('From the people involved', 'Par les personnes concernées')}</p>${chosen.map(p => `<figure class="perspective perspective-compact" data-perspective="${esc(p.id)}"><blockquote lang="${esc(p.original_language)}"><p>“${esc(p.approved_excerpt)}”</p></blockquote><figcaption><span class="perspective-author">${esc(p.author_name)}</span><span class="perspective-role">${esc(p.author_title)} · ${esc(p.organization)}</span></figcaption></figure>`).join('')}<a class="text-link" href="${esc(peopleHref)}">${t('Read the full account ↗', 'Lire le témoignage complet ↗')}</a></div>`;
}
