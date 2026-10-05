// Search titles and descriptions.
//
// The title tag is a separate surface from the page. A visitor reads the H1;
// Bing reads this. Bing matches the terms in a title far more literally than
// Google does, so a page whose title is only a slogan cannot be found by
// anyone who does not already know the practice by name.
//
// These override the <title> and the meta description ONLY. No H1, standfirst
// or body copy is touched, which is why tests/restoration.mjs still reports an
// unchanged `text` and `links` hash on every route and moves only `metadata`.
//
// French is not a translation of English. The terms a French buyer types are
// their own, and French is the thinner field of the two.
//
// Keyed by basePath, then language. A route absent here keeps the built title.

export const searchTitles = {
  '/': {
    en: 'Quantum Branding — brand strategy, positioning and repositioning',
    fr: 'Quantum Branding — stratégie de marque et positionnement'
  },
  '/practice': {
    en: 'Brand strategy, positioning and digital consulting — Quantum Branding',
    fr: 'Conseil en stratégie de marque, marketing et digital — Quantum Branding'
  },
  '/practice/method': {
    en: 'The Collapse — a decision method for brand strategy',
    fr: 'The Collapse — une méthode de décision pour la stratégie de marque'
  },
  '/work': {
    en: 'Brand strategy case studies — Quantum Branding',
    fr: 'Études de cas en stratégie de marque — Quantum Branding'
  },
  '/thinking': {
    en: 'Essays on brand strategy and decision making — Quantum Branding',
    fr: 'Articles sur la stratégie de marque et la décision — Quantum Branding'
  },
  '/lab': {
    en: 'Quantum Lab — brand diagnostic instruments and experiments',
    fr: 'Quantum Lab — instruments de diagnostic de marque'
  },
  '/lab/signal-scan': {
    en: 'Signal Scan — brand signal diagnostic — Quantum Branding',
    fr: 'Signal Scan — diagnostic des signaux de marque — Quantum Branding'
  },
  '/lab/the-brief-before-the-brief': {
    en: 'The Brief Before the Brief — a brand briefing instrument',
    fr: 'Le brief avant le brief — un instrument de cadrage de marque'
  },
  '/about': {
    en: 'Nizzar Ben Chekroune — independent brand strategist and consultant',
    fr: 'Nizzar Ben Chekroune — consultant indépendant en stratégie de marque'
  },
  '/start': {
    en: 'Start a brand strategy project — Quantum Branding',
    fr: 'Démarrer un projet de stratégie de marque — Quantum Branding'
  }
};

// Descriptions are a Bing ranking factor, not only a display string. Changed
// only where the editorial line carries no term a buyer would ever type.
export const searchDescriptions = {
  '/': {
    en: 'Brand strategy, positioning and repositioning by Nizzar Ben Chekroune. The independent practice for companies with something important to improve, launch, rethink or build.',
    fr: 'Stratégie de marque, positionnement et repositionnement par Nizzar Ben Chekroune. La pratique indépendante pour les entreprises qui ont quelque chose d’important à améliorer, lancer, repenser ou construire.'
  },
  '/practice': {
    en: 'Brand and positioning, marketing and sales, digital and experience, intelligent systems. Strategy, design and implementation in the same conversation.',
    fr: 'Marque et positionnement, marketing et vente, digital et expérience, systèmes intelligents. Stratégie, design et réalisation dans une même conversation.'
  },
  '/about': {
    en: 'Nizzar Ben Chekroune, Brand Strategist and founder of Quantum Branding. Brand, marketing, institutional programmes, commercial brands and cultural projects since 2006.',
    fr: 'Nizzar Ben Chekroune, stratège de marque et fondateur de Quantum Branding. Marque, marketing, programmes institutionnels et projets culturels depuis 2006.'
  }
};

export const searchTitle = (basePath, lang) => searchTitles[basePath]?.[lang];
export const searchDescription = (basePath, lang) => searchDescriptions[basePath]?.[lang];
