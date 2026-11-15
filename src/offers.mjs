import {origin} from './shared.mjs';

export const offers = [
  {
    id: 'positioning-review',
    name: {en: 'Positioning Review', fr: 'Revue de positionnement'},
    eur: 490, usd: 590,
    scope: {
      en: 'Send one website and one decision you’re facing. I review the offer and how clearly the homepage communicates it to your intended buyer.',
      fr: 'Envoyez un site et la décision que vous devez prendre. J’examine votre offre et la façon dont la page d’accueil la présente au client visé.'
    },
    outcome: {
      en: 'You get a one-page written review with three changes to make first. The review runs by email.',
      fr: 'Vous recevez une revue écrite d’une page avec trois modifications à traiter en priorité. La revue se fait par e-mail.'
    },
    action: {en: 'Request a positioning review', fr: 'Demander une revue de positionnement'}
  },
  {
    id: 'quantum-diagnosis',
    name: {en: 'Quantum Diagnosis', fr: 'Quantum Diagnosis'},
    eur: 1950, usd: 2250,
    scope: {
      en: 'One business line and one commercial decision. I review the website and sales materials, with up to two stakeholder conversations and one findings call.',
      fr: 'Une activité et une décision commerciale. J’examine le site et les supports de vente, avec deux entretiens au maximum et un échange de restitution.'
    },
    outcome: {
      en: 'You get a positioning decision and a written Opportunity Map with the evidence, what to fix first and what to build or test next.',
      fr: 'Vous repartez avec une décision de positionnement et une cartographie écrite des opportunités, avec les éléments de preuve, les premières corrections et les pistes à construire ou à tester.'
    },
    action: {en: 'Request a diagnosis', fr: 'Demander un diagnostic'},
    proof: '/work/selvaggi'
  },
  {
    id: 'ai-working-session',
    name: {en: 'AI Working Session', fr: 'Session de travail IA'},
    eur: 950, usd: 1100,
    scope: {
      en: 'A 90-minute remote session for up to six people working on one existing process. Bring a real example from your team.',
      fr: 'Une séance à distance de 90 minutes pour six personnes au maximum, sur un seul processus existant. Préparez un exemple de votre équipe.'
    },
    outcome: {
      en: 'You get a tested working example and a short written handoff your team can reuse.',
      fr: 'Vous recevez un exemple testé et une note que votre équipe peut réutiliser.'
    },
    action: {en: 'Request a session', fr: 'Demander une session'}
  },
  {
    id: 'ai-opportunity-day',
    name: {en: 'AI Opportunity Day', fr: 'Journée d’opportunités IA'},
    eur: 2950, usd: 3500,
    scope: {
      en: 'Preparation and one private remote working day for up to eight leaders. Bring up to three workflows where better tools or decisions could make a difference.',
      fr: 'Un travail préparatoire et une journée à distance pour huit responsables au maximum. Apportez jusqu’à trois processus où de meilleurs outils ou de meilleures décisions pourraient faire la différence.'
    },
    outcome: {
      en: 'You get an AI Opportunity Map and a 90-day plan that identifies the first pilot to run.',
      fr: 'Vous recevez une cartographie des opportunités IA et un plan à 90 jours qui indique le premier pilote à lancer.'
    },
    action: {en: 'Request a workshop date', fr: 'Demander une date d’atelier'}
  }
];

function csvCell(value) {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function discoveryFeed() {
  const fields = ['item_id', 'title', 'description', 'url', 'brand', 'seller_name', 'image_url',
    'availability', 'price', 'target_countries', 'store_country', 'is_eligible_search',
    'is_ads_eligible', 'is_eligible_checkout'];
  const rows = offers.map(offer => [
    `qb-${offer.id}-remote`, `${offer.name.en} (US remote)`, `${offer.scope.en} ${offer.outcome.en} Scope and schedule are confirmed by email.`,
    `${origin}/start#${offer.id}`, 'Quantum Branding', 'Quantum Branding', `${origin}/catalog/${offer.id}.png`,
    'unknown', `${offer.usd}.00 USD`, '["US"]', 'US', true, false, false
  ]);
  return [fields, ...rows].map(row => row.map(csvCell).join(',')).join('\n') + '\n';
}
