import {origin} from './shared.mjs';

export const offers = [
  {
    id: 'positioning-review',
    name: {en: 'Positioning Review', fr: 'Revue de positionnement'},
    catalogLabel: 'Website and offer review',
    promise: {
      en: 'Find out what your homepage tells a buyer and what to change first.',
      fr: 'Découvrez ce que votre page d’accueil dit à un acheteur et quoi modifier en premier.'
    },
    eur: 490, usd: 590,
    scope: {
      en: 'Send one website and one decision you’re facing. I review the offer and how clearly the homepage communicates it to your intended buyer.',
      fr: 'Envoyez un site et la décision que vous devez prendre. J’examine votre offre et la façon dont la page d’accueil la présente au client visé.'
    },
    outcome: {
      en: 'A one-page written review, delivered by email, with three changes in order of priority.',
      fr: 'Une revue écrite d’une page, livrée par e-mail, avec trois changements classés par priorité.'
    },
    action: {en: 'Request a positioning review', fr: 'Demander une revue de positionnement'}
  },
  {
    id: 'quantum-diagnosis',
    name: {en: 'Quantum Diagnosis', fr: 'Quantum Diagnosis'},
    catalogLabel: 'Brand positioning diagnosis',
    promise: {
      en: 'Choose a clearer position before committing to a new offer, website or sales story.',
      fr: 'Clarifiez votre positionnement avant de revoir votre offre, votre site ou votre discours commercial.'
    },
    eur: 1950, usd: 2250,
    scope: {
      en: 'One business line and one commercial decision. I review the website and sales materials, with up to two stakeholder conversations and one findings call.',
      fr: 'Une activité et une décision commerciale. J’examine le site et les supports de vente, avec deux entretiens au maximum et un échange de restitution.'
    },
    outcome: {
      en: 'A recommended position, the evidence behind it and a written Opportunity Map showing what to fix, build or test next.',
      fr: 'Un positionnement recommandé, les éléments qui le justifient et une cartographie écrite des corrections, des projets et des tests à prioriser.'
    },
    action: {en: 'Request a diagnosis', fr: 'Demander un diagnostic'},
    proof: '/work/selvaggi'
  },
  {
    id: 'ai-working-session',
    name: {en: 'AI Working Session', fr: 'Session de travail IA'},
    catalogLabel: 'Practical AI workflow session',
    promise: {
      en: 'Test how AI can improve one task your team already does.',
      fr: 'Testez comment l’IA peut améliorer une tâche que votre équipe réalise déjà.'
    },
    eur: 950, usd: 1100,
    scope: {
      en: 'A 90-minute remote session for up to six people working on one existing process. Bring a real example from your team.',
      fr: 'Une séance à distance de 90 minutes pour six personnes au maximum, sur un seul processus existant. Préparez un exemple de votre équipe.'
    },
    outcome: {
      en: 'A tested example based on your own workflow and a short guide the team can reuse.',
      fr: 'Un exemple testé sur votre propre processus et un guide court que l’équipe peut réutiliser.'
    },
    action: {en: 'Request a session', fr: 'Demander une session'}
  },
  {
    id: 'ai-opportunity-day',
    name: {en: 'AI Opportunity Day', fr: 'Journée d’opportunités IA'},
    catalogLabel: 'Leadership workshop and 90-day plan',
    promise: {
      en: 'Choose the first AI pilot your leadership team should run.',
      fr: 'Choisissez avec votre équipe de direction le premier pilote IA à lancer.'
    },
    eur: 2950, usd: 3500,
    scope: {
      en: 'One private remote working day, including preparation, for up to eight leaders. The team examines up to three real workflows.',
      fr: 'Une journée de travail privée à distance, préparation incluse, pour huit responsables au maximum. L’équipe examine jusqu’à trois processus réels.'
    },
    outcome: {
      en: 'A written AI Opportunity Map and a 90-day plan that identifies where to start.',
      fr: 'Une cartographie écrite des opportunités IA et un plan à 90 jours qui indique par où commencer.'
    },
    action: {en: 'Request a workshop date', fr: 'Demander une date d’atelier'}
  }
];

export const offerImage = id => `/catalog/${id}-illustration.jpg`;

function csvCell(value) {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function discoveryFeed() {
  const fields = ['item_id', 'title', 'description', 'url', 'brand', 'seller_name', 'image_url',
    'availability', 'price', 'target_countries', 'store_country', 'is_eligible_search',
    'is_ads_eligible', 'is_eligible_checkout'];
  const rows = offers.map(offer => [
    `qb-${offer.id}-remote`, `${offer.name.en} — ${offer.catalogLabel}`,
    `${offer.promise.en} ${offer.scope.en} You receive: ${offer.outcome.en} The service is remote. Timing is confirmed by email.`,
    `${origin}/start#${offer.id}`, 'Quantum Branding', 'Quantum Branding', `${origin}${offerImage(offer.id)}`,
    'unknown', `${offer.usd}.00 USD`, '["US"]', 'US', true, false, false
  ]);
  return [fields, ...rows].map(row => row.map(csvCell).join(',')).join('\n') + '\n';
}
