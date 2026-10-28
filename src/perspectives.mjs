// People & Perspectives — firsthand accounts of working with Nizzar. Original
// quotations are stored verbatim and never rewritten; the UI around them is
// translated. The excerpt-only records quote the person's own LinkedIn
// recommendation; the full text lives in nizzar.com/in-their-words.
//
// The page leads with an owner-approved selection of people recognised in their
// own fields (curatedSelection). Their profile, territory and relationship lines
// are editorial; the quotation is theirs, copied verbatim from the nizzar.com
// recommendation registry or, for William Entriken, from the owner-supplied
// original. Records outside the selection stay here as source material: the
// homepage and the Rapp & Esen case still quote Françoise Rapp, whose full
// account remains on the page as a project account.
import {esc} from './shared.mjs';

const LINKEDIN = 'https://www.linkedin.com/in/nizzar/details/recommendations/?detailScreenTabIndex=0';
const NIZZAR_FULL = 'https://nizzar.com/in-their-words';

export const curatedSelection = [
  'william-entriken',
  'georg-bak-2026-10-07',
  'mike-mongo-2026-10-15',
  'jake-hirsch-allen-2026-10-10',
  'mo-el-sayed-2026-10-09',
  'olivier-stoullig-2026-10-11'
];
export const projectAccounts = ['francoise-rapp-2026-10-15'];

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
  },
  {
    id: 'william-entriken',
    author_name: 'William Entriken',
    author_title: 'Coauthor of ERC-721',
    author_title_fr: 'Coauteur de l’ERC-721',
    territory_en: 'Technology',
    territory_fr: 'Technologie',
    profile_en: 'ERC-721 is the Ethereum standard that established the foundation for non-fungible tokens (NFTs).',
    profile_fr: 'L’ERC-721 est le standard Ethereum qui a posé les fondations des jetons non fongibles (NFT).',
    relationship_en: 'Worked with Nizzar on BananaConf events, 2022–2024. His recommendation is about that collaboration, not about ERC-721.',
    relationship_fr: 'A travaillé avec Nizzar sur les événements BananaConf, de 2022 à 2024. Sa recommandation porte sur cette collaboration, pas sur l’ERC-721.',
    original_language: 'en',
    full_original_text: [
      'I worked with Nizzar on BananaConf events, running 2022–2024. He is a ball of energy and I have seen him take ownership of making guests feel welcome, ensuring programming is smooth and getting in front of sponsors/stakeholders to make the production a success. This is a large, high-paced multimodal event including: talks, workshops, entrepreneurship, dancing, bananas, art installations and government policymaking... all in a rapidly changing industry. I look fondly on our time working together and hope to have another opportunity again!'
    ],
    approved_excerpt: 'He is a ball of energy and I have seen him take ownership of making guests feel welcome, ensuring programming is smooth and getting in front of sponsors/stakeholders to make the production a success.',
    // Owner-supplied original (October 2026); no registry record or public permalink.
    source_platform: 'Owner-supplied',
    source_verified: true,
    // His own self-portrait (EXIF Artist: William Entriken, 2018), released by him
    // under CC BY 4.0 at source_url. Cropped to 4:5 and resized; no retouching.
    portrait: {
      src: '/portraits/william-entriken',
      widths: [160, 240, 320],
      width: 320,
      height: 400,
      source_url: 'https://phor.net/self-portraits',
      original_url: 'https://phor.net/assets/portraits/william-suit.jpg',
      credit: 'William Entriken',
      license: 'CC BY 4.0',
      license_url: 'https://creativecommons.org/licenses/by/4.0/',
      basis: 'licence',
      changes: 'cropped'
    },
    display_locations: ['people'],
    category: 'curated'
  },
  {
    id: 'georg-bak-2026-10-07',
    author_name: 'Georg Bak',
    author_title: 'Art advisor and curator, digital and generative art',
    author_title_fr: 'Conseiller artistique et commissaire, art numérique et génératif',
    territory_en: 'Art',
    territory_fr: 'Art',
    profile_en: 'A Swiss-based advisor specialising in digital and generative art, he curated Ex Machina: A History of Generative Art at Phillips, London, in 2022.',
    profile_fr: 'Conseiller basé en Suisse, spécialiste de l’art numérique et génératif, il a été le commissaire d’Ex Machina: A History of Generative Art chez Phillips, à Londres, en 2022.',
    relationship_en: 'Worked with Nizzar from a different company, across AI, NFTs and Web3.',
    relationship_fr: 'A collaboré avec Nizzar depuis une autre structure, autour de l’IA, des NFT et du Web3.',
    original_language: 'en',
    full_original_text: [
      'It was always a great pleasure to work with Nizzar. He is very professional, creative and a great communicator. His profound knowledge in AI, NFTs and Web3 is very valuable.'
    ],
    approved_excerpt: 'He is very professional, creative and a great communicator.',
    source_platform: 'LinkedIn',
    source_url: LINKEDIN,
    source_url_type: 'recommendations_section',
    full_source: NIZZAR_FULL,
    source_verified: true,
    date: '2026-10-07',
    // The photo he uses on his own LinkedIn profile, 200 × 200 at source.
    portrait: {
      src: '/portraits/georg-bak',
      widths: [160],
      width: 160,
      height: 200,
      source_url: 'https://www.linkedin.com/in/artadvisorgeorgbak/',
      credit: 'LinkedIn',
      basis: 'owner-direction'
    },
    display_locations: ['people'],
    category: 'curated'
  },
  {
    id: 'mike-mongo-2026-10-15',
    author_name: 'Mike Mongo',
    author_title: 'Astronaut teacher and author',
    author_title_fr: 'Enseignant en éducation spatiale et auteur',
    territory_en: 'Culture & Space',
    territory_fr: 'Culture et espace',
    profile_en: 'Author of The Astronaut Instruction Manual, he visits schools worldwide to teach young people about space exploration, and created Astronaut Job Camp.',
    profile_fr: 'Auteur de The Astronaut Instruction Manual, il intervient dans des écoles du monde entier pour transmettre l’exploration spatiale aux jeunes, et a créé l’Astronaut Job Camp.',
    relationship_en: 'Worked with Nizzar over several years, socially as well as professionally.',
    relationship_fr: 'A travaillé avec Nizzar au fil des années, dans un cadre social comme professionnel.',
    original_language: 'en',
    full_original_text: [
      'Building teams means having people on the team who people trust, love, and can depend on. In a nutshell, Nizzar embodies all of those qualities. Getting to work with Nizzar over the years, seeing him engage socially as well as professionally, it is a pleasure to get to endorse someone whose company has made for some of the best professional experiences of mine and other peers’ lives. May I live long enough to get to work with Nizzar again!'
    ],
    approved_excerpt: 'Building teams means having people on the team who people trust, love, and can depend on. In a nutshell, Nizzar embodies all of those qualities.',
    source_platform: 'LinkedIn',
    source_url: LINKEDIN,
    source_url_type: 'recommendations_section',
    full_source: NIZZAR_FULL,
    source_verified: true,
    date: '2026-10-15',
    // His publisher's author photo; the full-size file is the one he supplied
    // as a speaker to the National Space Society (ISDC 2017).
    portrait: {
      src: '/portraits/mike-mongo',
      widths: [160, 240, 320],
      width: 320,
      height: 400,
      source_url: 'https://www.penguinrandomhouse.com/authors/2145209/mike-mongo/',
      original_url: 'https://isdc2017.nss.org/wordpress/wp-content/uploads/2017/05/Astronaut-Teacher-Mike-Mongo-The-Astronaut-Instruction-Manual.Marrero-headshot.jpg',
      credit: 'Penguin Random House',
      basis: 'owner-direction'
    },
    display_locations: ['people'],
    category: 'curated'
  },
  {
    id: 'jake-hirsch-allen-2026-10-10',
    author_name: 'Jake Hirsch-Allen',
    author_title: 'Director of Partnerships, The Dais',
    author_title_fr: 'Directeur des partenariats, The Dais',
    territory_en: 'AI & Society',
    territory_fr: 'IA et société',
    profile_en: 'He builds public–private partnerships at The Dais, a public policy and leadership think tank at Toronto Metropolitan University. He co-founded Lighthouse Labs and previously built workforce partnerships for LinkedIn.',
    profile_fr: 'Il bâtit des partenariats public-privé au sein de The Dais, think tank de politiques publiques et de leadership de la Toronto Metropolitan University. Il a cofondé Lighthouse Labs et a auparavant développé des partenariats de formation pour LinkedIn.',
    relationship_en: 'Worked with Nizzar on the same team during the BananaConf years, while Web3 was moving fast.',
    relationship_fr: 'A travaillé dans la même équipe que Nizzar pendant les années BananaConf, quand le Web3 évoluait très vite.',
    original_language: 'en',
    full_original_text: [
      'I got to know Nizzar during the BananaConf years, at a time when Web3 was moving incredibly fast and it was often difficult to separate genuine shifts in technology, culture and community from the noise around them.',
      'What stood out to me about Nizzar was his ability to see beyond the technology itself. He understood that what made these new ecosystems interesting was the combination of people, identity, culture, community and business, and he had a rare ability to connect those dimensions.',
      'Through BananaConf and the broader ecosystem around it, I saw him bring together people who would not necessarily have found each other otherwise, turn online relationships into real-world collaborations and experiences, and help create the conditions for ideas and communities to become something tangible.',
      'Nizzar is also unusually comfortable moving between worlds. He can speak with founders, technologists, creatives, investors and community builders while keeping sight of the larger strategic question: what actually matters here, and what is worth building?',
      'Looking back, what I value most about working with Nizzar was not simply his knowledge of Web3 at that moment. It was his curiosity, strategic instinct and ability to recognize meaningful change early, understand the human dynamics underneath it, and connect the right people and ideas around it. Those qualities extend well beyond Web3, and I would gladly work with him again.'
    ],
    approved_excerpt: 'He understood that what made these new ecosystems interesting was the combination of people, identity, culture, community and business, and he had a rare ability to connect those dimensions.',
    source_platform: 'LinkedIn',
    source_url: LINKEDIN,
    source_url_type: 'recommendations_section',
    full_source: NIZZAR_FULL,
    source_verified: true,
    date: '2026-10-10',
    // His headshot on The Dais team page, the same photograph as his LinkedIn profile.
    portrait: {
      src: '/portraits/jake-hirsch-allen',
      widths: [160, 240, 320],
      width: 320,
      height: 400,
      source_url: 'https://dais.ca/team/jake-hirsch-allen/',
      original_url: 'https://dais.ca/wp-content/uploads/2026/06/Jake-Hirsch-Allen.jpg',
      credit: 'The Dais',
      basis: 'owner-direction'
    },
    display_locations: ['people'],
    category: 'curated'
  },
  {
    id: 'mo-el-sayed-2026-10-09',
    author_name: 'Mo El-Sayed',
    author_title: 'Head of Brand Development, Ledger',
    author_title_fr: 'Responsable du développement de la marque, Ledger',
    territory_en: 'Brand & Culture',
    territory_fr: 'Marque et culture',
    profile_en: 'He leads brand development at Ledger, the French company behind widely used hardware wallets for digital assets.',
    profile_fr: 'Il dirige le développement de la marque chez Ledger, l’entreprise française à l’origine de portefeuilles matériels largement utilisés pour les actifs numériques.',
    relationship_en: 'Met Nizzar in 2022 through NFT communities. They worked together from different companies.',
    relationship_fr: 'A rencontré Nizzar en 2022 dans les communautés NFT. Ils ont collaboré depuis des entreprises différentes.',
    original_language: 'en',
    full_original_text: [
      'I met Nizzar in 2022 through NFT communities. What stood out was his ability to bring people together and build meaningful connections. He communicates clearly and warmly, listens thoughtfully, and understands what makes people want to be part of a community.',
      'Nizzar has a strong understanding of marketing and branding, grounded in the human relationships that give a brand its meaning. I’ve always appreciated his perspective, his warmth, and the care he brings to conversations.'
    ],
    approved_excerpt: 'He communicates clearly and warmly, listens thoughtfully, and understands what makes people want to be part of a community.',
    source_platform: 'LinkedIn',
    source_url: LINKEDIN,
    source_url_type: 'recommendations_section',
    full_source: NIZZAR_FULL,
    source_verified: true,
    date: '2026-10-09',
    // The photo he uses on his own LinkedIn profile, 200 × 200 at source.
    portrait: {
      src: '/portraits/mo-el-sayed',
      widths: [160],
      width: 160,
      height: 200,
      source_url: 'https://www.linkedin.com/in/mohsen-el-sayed/',
      credit: 'LinkedIn',
      basis: 'owner-direction'
    },
    display_locations: ['people'],
    category: 'curated'
  },
  {
    id: 'olivier-stoullig-2026-10-11',
    author_name: 'Olivier Stoullig',
    author_title: 'Chief Industrial Policy Officer, African Development Bank Group',
    author_title_fr: 'Chief Industrial Policy Officer, Groupe de la Banque africaine de développement',
    territory_en: 'Industry & Development',
    territory_fr: 'Industrie et développement',
    profile_en: 'He works on industrial policy at the African Development Bank Group. Earlier, at UNIDO, he coordinated a regional programme developing cultural and creative industry clusters in the Southern Mediterranean.',
    profile_fr: 'Il travaille sur la politique industrielle au sein du Groupe de la Banque africaine de développement. Auparavant, à l’ONUDI, il a coordonné un programme régional de clusters des industries culturelles et créatives en Méditerranée du Sud.',
    relationship_en: 'Managed Nizzar directly during his time as Cluster Coordinator of the Marrakech Creative Interiors Cluster.',
    relationship_fr: 'A été le responsable direct de Nizzar lorsque celui-ci coordonnait le Marrakech Creative Interiors Cluster.',
    original_language: 'en',
    full_original_text: [
      'I had the pleasure of working with Nizzar during his time as Cluster Coordinator in Marrakech, and I can confidently recommend him as an outstanding professional.',
      'Nizzar is a dynamic, results-oriented individual who combines strong business acumen with exceptional communication and interpersonal skills. He has a natural ability to build relationships, engage with diverse stakeholders, and bring people together around shared objectives.',
      'What particularly sets Nizzar apart is his positive energy, emotional intelligence, and ability to navigate complex situations with confidence and diplomacy. He is proactive, resourceful, and genuinely skilled at creating connections and turning opportunities into tangible results.',
      'Beyond his professional capabilities, Nizzar is a pleasure to work with: approachable, enthusiastic, and always willing to go the extra mile.',
      'I would highly recommend him to any organization looking for a talented professional with strong leadership potential, excellent people skills, and a sharp business mindset.'
    ],
    approved_excerpt: 'He has a natural ability to build relationships, engage with diverse stakeholders, and bring people together around shared objectives.',
    source_platform: 'LinkedIn',
    source_url: LINKEDIN,
    source_url_type: 'recommendations_section',
    full_source: NIZZAR_FULL,
    source_verified: true,
    date: '2026-10-11',
    display_locations: ['people'],
    category: 'curated'
  }
];

const byId = new Map(perspectives.map(p => [p.id, p]));
const anchorId = id => 'p-' + id.replace(/-\d{4}-\d{2}-\d{2}$/, '');

function perspectiveFigure(p, lang) {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const lens = fr ? p.lens_fr : p.lens_en;
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
<span class="perspective-links">${links}</span>
</figcaption>
</figure>`;
}

// A portrait is the person's own published photograph, never a substitute; a
// profile without one keeps the text-only header. basis records why it may be
// shown: an open licence, or the owner's direction (EVIDENCE.md, 26 October
// 2026). Intrinsic dimensions reserve the space before the image loads.
function profilePortrait(p, lang) {
  const fr = lang === 'fr';
  const {src, widths, width, height} = p.portrait;
  const srcset = widths.map(w => `${src}-${w}.webp ${w}w`).join(', ');
  const fallback = widths[Math.min(1, widths.length - 1)];
  return `<img class="profile-portrait" src="${esc(`${src}-${fallback}.webp`)}" srcset="${esc(srcset)}" sizes="(max-width:599.98px) 80px, 104px" width="${width}" height="${height}" alt="${esc(`${fr ? 'Portrait de' : 'Portrait of'} ${p.author_name}`)}" loading="lazy" decoding="async">`;
}

function portraitCredit(p, lang) {
  const fr = lang === 'fr';
  const c = p.portrait;
  const licence = c.license
    ? `, <a href="${esc(c.license_url)}" target="_blank" rel="noopener noreferrer license">${esc(c.license)}</a>${c.changes === 'cropped' ? (fr ? ', recadré' : ', cropped') : ''}`
    : '';
  return `<span class="field-hint profile-credit">${fr ? 'Portrait :' : 'Portrait:'} <a href="${esc(c.source_url)}" target="_blank" rel="noopener noreferrer">${esc(c.credit)}</a>${licence}.</span>`;
}

// A curated profile reads person → why they matter → their words. The
// relationship fields stay in the record but are not shown (owner, 28 October
// 2026). The excerpt leads; the full original stays one
// native disclosure away, so it works with keyboard and screen readers.
function profileArticle(p, i, lang) {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const anchor = anchorId(p.id);
  const full = p.full_original_text.map(x => `<p>${esc(x)}</p>`).join('');
  const source = (p.source_platform === 'LinkedIn'
    ? `<a class="text-link" href="${esc(p.source_url)}" target="_blank" rel="noopener noreferrer">${t('LinkedIn · recommendations section ↗', 'LinkedIn · section des recommandations ↗')}</a><span class="field-hint">${t('Section link, not an individual permalink. Sign-in may be required.', 'Lien vers la section, pas vers une recommandation individuelle. Connexion parfois nécessaire.')}</span>`
    : `<span class="field-hint">${t('Original recommendation, provided by Nizzar Ben Chekroune.', 'Recommandation originale, transmise par Nizzar Ben Chekroune.')}</span>`)
    + (p.portrait ? portraitCredit(p, lang) : '');
  const identity = `<p class="perspective-lens">${String(i + 1).padStart(2, '0')} · ${esc(fr ? p.territory_fr : p.territory_en)}</p>
<h2 class="perspective-author" id="${anchor}-name">${esc(p.author_name)}</h2>
<p class="perspective-role">${esc(fr ? p.author_title_fr : p.author_title)}</p>`;
  const head = p.portrait
    ? `<header class="profile-head has-portrait">
${profilePortrait(p, lang)}
<div class="profile-id">
${identity}
</div>
</header>`
    : `<header class="profile-head">
${identity}
</header>`;
  return `<article class="perspective profile" id="${anchor}" data-perspective="${esc(p.id)}" aria-labelledby="${anchor}-name">
${head}
<p class="profile-context">${esc(fr ? p.profile_fr : p.profile_en)}</p>
<figure class="profile-quote">
<blockquote lang="${esc(p.original_language)}"><p>“${esc(p.approved_excerpt)}”</p></blockquote>
<details class="profile-full">
<summary>${t('Read the full recommendation', 'Lire la recommandation complète')}</summary>
<blockquote lang="${esc(p.original_language)}">${full}</blockquote>
</details>
<figcaption class="perspective-links">${source}</figcaption>
</figure>
</article>`;
}

// The full People & Perspectives reading experience, with a small index to move
// between profiles while staying inside the window. Project accounts follow the
// selection, each kept at its own anchor for the pages that link to it.
export function peoplePanel(ids, lang = 'en', accountIds = []) {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const chosen = ids.map(id => byId.get(id)).filter(Boolean);
  const accounts = accountIds.map(id => byId.get(id)).filter(Boolean);
  if (chosen.length !== ids.length || accounts.length !== accountIds.length) throw new Error('Unknown perspective id');
  if (!chosen.length) return '';
  const index = chosen.length > 1
    ? `<nav class="perspective-index" aria-label="${t('The people', 'Les personnes')}">${chosen.map((p, i) => `<a href="#${anchorId(p.id)}"><span aria-hidden="true">${String(i + 1).padStart(2, '0')}</span> ${esc(p.author_name)}</a>`).join('')}</nav>`
    : '';
  const projects = accounts.length
    ? `<section class="people-accounts" aria-labelledby="people-accounts-title"><h2 id="people-accounts-title">${t('Project accounts', 'Témoignages de projet')}</h2><p class="field-hint">${t('A client’s account of a specific engagement, kept with the work it describes.', 'Le témoignage d’une cliente sur une mission précise, rattaché au travail qu’il décrit.')}</p>${accounts.map(p => perspectiveFigure(p, lang)).join('')}</section>`
    : '';
  return `${index}<div class="people-stream">${chosen.map((p, i) => profileArticle(p, i, lang)).join('')}</div>${projects}`;
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
