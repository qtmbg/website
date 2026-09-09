// Public Quantum Branding contact: https://nizzar.com/contact.
// Opens a draft in the visitor's email client; never simulates delivery.
export const siteConfig = { contactEmail: 'me@qtmbg.com' };

const icons = [
  `<svg viewBox="0 0 110 110" fill="none" aria-hidden="true"><path d="m64 67 30 29" stroke="#222a25" stroke-width="15" stroke-linecap="round"/><path d="m66 66 12 12" stroke="#8b9c84" stroke-width="17"/><circle cx="44" cy="42" r="31" fill="#d5e6c0" stroke="#344a3a" stroke-width="9"/><circle cx="44" cy="42" r="25" fill="#e4eddd" stroke="#99ad8e" stroke-width="2"/><path d="M25 37c3-13 15-17 25-14" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="44" cy="42" r="11" stroke="#688459"/><path d="M44 25v8m0 18v8M27 42h8m18 0h8" stroke="#688459"/></svg>`,
  `<svg viewBox="0 0 110 110" fill="none" aria-hidden="true"><path d="m20 74 68-4 10 23-73 6Z" fill="#bec7c9"/><path d="m18 72 70-4v20l-70 6Z" fill="#28383e" stroke="#14262d" stroke-width="2"/><path d="m18 72 13-9 60-3-3 8Z" fill="#627780"/><path d="m32 58 46-3 9 14-65 5Z" fill="#f0f4f6" stroke="#516972" stroke-width="2"/><path d="m44 57-2-22 23-1 2 22" fill="#3055cb" stroke="#172f7c" stroke-width="2"/><path d="M36 25c-2-14 36-17 39-3l-2 13-34 3Z" fill="#416bed" stroke="#1d3d94" stroke-width="2"/><path d="m42 24 24-2" stroke="#9eaff2" stroke-width="3" stroke-linecap="round"/><path d="m24 82 57-4" stroke="#9eafba"/><path d="m17 98 70-5" stroke="#bfce5c" stroke-width="5"/><text x="38" y="87" fill="#e8fa64" font-family="monospace" font-size="8" transform="rotate(-4 38 87)">MAKE A MARK</text><path d="m8 20 8 5m2-17 2 9m63-3 7-6" stroke="#526874" stroke-width="2"/></svg>`,
  `<svg viewBox="0 0 110 110" fill="none" aria-hidden="true"><path d="m10 18 83 5 5 68-84 6Z" fill="#dbe6ee" stroke="#617a8c" stroke-width="2"/><path d="m20 33 63 3m-63 13 65 2m-64 14 65 2M33 28l3 53m17-52 2 51m17-49 1 48" stroke="#a5bac8"/><path d="m12 76 73-64 19 86Z" fill="#365cdb" stroke="#19388d" stroke-width="2"/><path d="m43 71 33-29 8 39Z" fill="#dbe6ee" stroke="#19388d" stroke-width="2"/><path d="m84 27 5-1m-3 11 5-1m-3 11 5-1m-3 11 5-1m-3 11 5-1m-3 11 5-1M25 79l-1 5m11-4-1 5m11-4-1 5m11-4-1 5m11-4-1 5m11-4-1 5" stroke="#cad6ff" stroke-width="1.5"/><path d="m19 17 7-5 37 46-7 6Z" fill="#e8fa64" stroke="#74802f" stroke-width="1.5"/><path d="m56 64 12 8-5-14Z" fill="#c5ac87"/><path d="m63 68 5 4-2-6Z" fill="#24323b"/><text x="23" y="38" fill="#526c7a" font-family="monospace" font-size="6">QB—03</text></svg>`,
  `<svg viewBox="0 0 110 110" fill="none" aria-hidden="true"><path d="m15 23 75-5 9 9-2 70-74 6-9-10Z" fill="#172b3b" stroke="#10202b" stroke-width="2"/><path d="m15 23 75-5-2 69-74 6Z" fill="#365cdf" stroke="#1c3b93" stroke-width="2"/><path d="m20 27 63-4" stroke="#8aa4fa"/><circle cx="31" cy="41" r="8" fill="#203546" stroke="#a1b4e4" stroke-width="2"/><circle cx="70" cy="38" r="8" fill="#203546" stroke="#a1b4e4" stroke-width="2"/><circle cx="29" cy="70" r="8" fill="#203546" stroke="#a1b4e4" stroke-width="2"/><circle cx="68" cy="67" r="8" fill="#203546" stroke="#a1b4e4" stroke-width="2"/><path d="M31 41C5 22-7 58 7 69c12 10 23-1 22 1M70 38c27-11 34 19 21 22-9 3-11-3-23 7" stroke="#162c39" stroke-width="7" stroke-linecap="round"/><path d="M31 41C5 22-7 58 7 69c12 10 23-1 22 1M70 38c27-11 34 19 21 22-9 3-11-3-23 7" stroke="#e8fa64" stroke-width="4" stroke-linecap="round"/><circle cx="30" cy="40" r="3" fill="#f0f4f6"/><circle cx="69" cy="38" r="3" fill="#f0f4f6"/><path d="m38 52 19-1m-20 5 18-1" stroke="#a1b4e4"/><text x="40" y="81" fill="#f0f4f6" font-family="monospace" font-size="5">CONNECT</text><path d="m25 96 62-5" stroke="#5c7181"/></svg>`,
  `<svg viewBox="0 0 110 110" fill="none" aria-hidden="true"><path d="M55 25C37 16 23 19 9 24v66c16-6 30-4 46 3 16-7 30-9 46-3V24c-14-5-28-8-46 1Z" fill="#dbe5ef" stroke="#31434e" stroke-width="2"/><path d="M55 25v68" stroke="#31434e" stroke-width="2"/><path d="M17 35c11-3 20-2 29 2m-29 9c11-3 20-2 29 2m-29 9c11-3 20-2 29 2m-29 9c11-3 20-2 29 2" stroke="#93a4b0" stroke-width="2"/><path d="m68 38 21-3v30l-11-5-10 8Z" fill="#e9fa65" stroke="#637142"/><path d="m76 16 12-6m-21 4 2-10" stroke="#566d80" stroke-width="2"/></svg>`,
  `<svg viewBox="0 0 110 110" fill="none" aria-hidden="true"><circle cx="55" cy="55" r="44" fill="#e8eece" stroke="#4d6241" stroke-width="3"/><circle cx="55" cy="55" r="35" stroke="#91a37a"/><path d="M55 16v8m0 62v8M16 55h8m62 0h8" stroke="#4d6241" stroke-width="2"/><path d="m72 31-6 35-35 13 14-35Z" fill="#344c3f"/><path d="m72 31-17 24-10-11Z" fill="#e9fa65"/><path d="m72 31-17 24 11 11Z" fill="#9bb775"/><circle cx="55" cy="55" r="4" fill="#f5f5f2"/></svg>`
];

export const territories = [
  { id:'brand', en:{name:'Brand & Positioning', short:'Brand & positioning', question:'“We’ve changed. Our brand hasn’t.”', body:'Find the position, story and identity that reflect what your business has become—and where it needs to go.', tags:['Repositioning','Brand clarity','Narrative','Brand systems'], entry:'Tell us what your brand needs to change'}, fr:{name:'Marque & Positionnement', short:'Marque & positionnement', question:'« Nous avons évolué. Pas notre marque. »', body:'Trouver le positionnement, le récit et l’identité qui reflètent ce que votre entreprise est devenue et ce qu’elle doit devenir.', tags:['Repositionnement','Clarté de marque','Récit','Systèmes de marque'], entry:'Parlons de votre marque'} },
  { id:'sales', en:{name:'Marketing & Sales', short:'Marketing & sales', question:'“The offer is good. It’s not connecting.”', body:'Make the path from interest to purchase clearer. Rethink the offer, the message and the commercial materials around the actual decision.', tags:['Offer architecture','Sales materials','Launch strategy','Conversion'], entry:'Let’s look at the commercial problem'}, fr:{name:'Marketing & Ventes', short:'Marketing & ventes', question:'« L’offre est bonne. Elle ne convainc pas. »', body:'Clarifier le chemin entre intérêt et achat. Repenser l’offre, le message et les supports commerciaux autour de la décision réelle.', tags:['Architecture d’offre','Supports de vente','Lancement','Conversion'], entry:'Parlons de votre enjeu commercial'} },
  { id:'digital', en:{name:'Digital & Experience', short:'Digital & experience', question:'“Our website is getting in the way.”', body:'A website, customer journey or digital product should help people do something. We rethink the experience and build around that purpose.', tags:['Websites','Customer journeys','UX','Digital products'], entry:'Tell us what the experience should do'}, fr:{name:'Digital & Expérience', short:'Digital & expérience', question:'« Notre site nous freine. »', body:'Un site, un parcours client ou un produit digital doit permettre d’agir. Nous repensons l’expérience et construisons autour de cette finalité.', tags:['Sites web','Parcours clients','UX','Produits digitaux'], entry:'Parlons de l’expérience à créer'} },
  { id:'systems', en:{name:'AI & Intelligent Systems', short:'Intelligent systems', question:'“There has to be a better way to do this.”', body:'Start with the workflow, not the technology. Identify what can improve, then build the automation, internal tool or prototype that earns its place.', tags:['Workflow redesign','Automation','Internal tools','Prototypes'], entry:'Show us what is slowing you down'}, fr:{name:'IA & Systèmes Intelligents', short:'Systèmes intelligents', question:'« On doit pouvoir faire mieux. »', body:'Partir du travail, pas de la technologie. Identifier ce qui mérite de changer, puis construire l’automatisation, l’outil ou le prototype utile.', tags:['Refonte des workflows','Automatisation','Outils internes','Prototypes'], entry:'Montrez-nous ce qui vous ralentit'} },
  { id:'adoption', en:{name:'AI Training & Adoption', short:'AI training & adoption', question:'“Our team needs more than another AI demo.”', body:'What does AI change for your business, and what should your team do now? Practical sessions built around your context, responsibilities and real work.', tags:['Executive sessions','Team training','Governance','Workflow adoption'], entry:'Let’s talk about your team'}, fr:{name:'Formation & Adoption IA', short:'Formation & adoption IA', question:'« Notre équipe a besoin de plus qu’une démo IA. »', body:'Que change l’IA pour votre entreprise et que doit faire votre équipe maintenant ? Des sessions pratiques ancrées dans vos enjeux et votre travail.', tags:['Sessions dirigeants','Formation équipes','Gouvernance','Adoption métier'], entry:'Parlons de votre équipe'} },
  { id:'business', en:{name:'Business & Opportunity', short:'Business & opportunity', question:'“We see a possibility. We need a clearer way forward.”', body:'An unclear problem, a new market, a different business model. We investigate what is happening and help decide which opportunity deserves to become real.', tags:['Opportunity mapping','Business models','New products','Strategic exploration'], entry:'Tell us what you’re exploring'}, fr:{name:'Business & Opportunités', short:'Business & opportunités', question:'« Nous voyons une possibilité. Il faut clarifier la suite. »', body:'Un problème flou, un nouveau marché, un modèle différent. Nous explorons la situation et identifions l’opportunité qui mérite de devenir réelle.', tags:['Opportunités','Modèles économiques','Nouveaux produits','Exploration stratégique'], entry:'Parlons de ce que vous explorez'} }
];

export const french = {
historyTitle:'Quelques repères. Avant cette pratique.',
historyNote:'Contextes sélectionnés dans le portfolio publié de Nizzar : ni missions actuelles de Quantum Branding, ni caution institutionnelle.',
historyInstitution:'Un projet initié par l’ONUDI : conception, contenus digitaux et réalisation de campagne. Un contexte institutionnel pour rendre la création accessible au-delà de son propre domaine.',
historyBusiness:'Conception du projet, stratégie sociale et contenus événementiels autour de la foire d’art africain 1:54. Une entreprise à la rencontre d’un public culturel.',
historyCulture:'Stratégie digitale, contenus et gestion des comptes d’un magazine d’art. Traduire un regard éditorial en présence digitale.',
historySource:'Source : le portfolio publié de Nizzar',
voicesTitle:'Ce que les clients ont remarqué.',
voicesNote:'Extraits d’avis publics Fiverr sur des travaux antérieurs de Nizzar. Traductions françaises ; originaux anglais ci-dessous. Des expériences individuelles, pas des promesses de résultats.',
voiceUnderstanding:'COMPRENDRE',voiceExecution:'DE LA COMPRÉHENSION À LA RÉALISATION',voiceJudgment:'DISCERNEMENT & PARTENARIAT',
quoteUnderstanding:'« Son savoir-faire pour faire émerger les bonnes informations et les mettre au service de la stratégie est excellent. »',
quoteExecution:'« Il comprend ma marque, sait s’y identifier et enrichit ma propre compréhension de celle-ci. Il va au-delà des attentes du début à la fin, travaille vite et efficacement, dans le calendrier convenu. »',
quoteJudgment:'« Il a apporté un excellent design, fondé sur une stratégie d’entreprise solide et des années d’expérience. […] Nizzar n’est pas un prestataire, il fait partie de l’équipe ! »',
countryCanada:'Canada',countryUS:'États-Unis',originalReview:'Extrait original en anglais',
researchTitle:'Sur la table de recherche.',
labTaxonomy:'Une expérience met une question à l’épreuve. Un instrument rend une méthode utilisable. Un produit la rend accessible au-delà de la pratique.',
toolboxStatus:'PRODUIT · EN DÉVELOPPEMENT',toolboxDescription:'Des instruments pour la personne derrière l’entreprise.',
toolboxDimensions:'Soi / Environnement / Partenaires / Ambition',toolboxNote:'Un produit en développement, pas un service de Quantum Branding.',
instrumentType:'INSTRUMENT',experimentType:'EXPÉRIENCE',
signalDescription:'Une première lecture des signaux d’une marque. Un instrument du Lab intégré à Quantum Branding AI.',signalLink:'Explorer Signal Scan dans le produit',
compassDescription:'Une piste de recherche sur la perception d’une marque. Présentée ici comme un instrument, pas comme un service distinct ni un produit déjà lancé.',
mirrorDescription:'Une exploration de la réflexion et de la perception de soi. Présentée ici au stade expérimental, sans revendiquer un instrument abouti ni un lancement public.',
labRelationship:'Le Lab développe des méthodes. La pratique applique ce qui est utile. Le travail documente ce qui s’est passé. Les produits rendent autonome ce qui peut l’être. Un même instrument peut traverser ces contextes sans devenir trois services.',
proofTitle:'Plus de 17 ans derrière la pratique.',
proofDepth:'La pratique est indépendante. L’expérience est cumulative : plus de 17 ans en branding et marketing, entre programmes institutionnels, marques commerciales et projets culturels.',
proofHistory:'Voir les repères du parcours et les avis clients',
founderTerritory:'Mes écrits, mes recherches et mon territoire créatif plus large se trouvent sur nizzar.com. Quantum Branding est le lieu où cette pensée rencontre le problème d’une entreprise ; Quantum Lab, celui où je poursuis mes propres questions.',
proofRecognition:'Juré du Global Design Graduate Show, lancé par Arts Thread avec Gucci. Rôle documenté sur Google Arts & Culture.',
founderWider:'Explorer le travail de Nizzar',
directContact:'Vous préférez écrire directement ? Aucun brief à remplir.',
emailNizzar:'Écrire à Nizzar',
productIndex:'PRODUIT 001',productLive:'EN LIGNE',instrumentIndex:'INSTRUMENT 002',
productProvenance:'Né au sein de Quantum Lab.',exploreProduct:'Explorer Quantum Branding AI',
labPurpose:'Vous nous apportez un problème : c’est la pratique. Nous trouvons une question à poursuivre nous-mêmes : c’est Quantum Lab, notre espace de R&D. Nos propres questions y deviennent des expériences, des instruments et des produits.',
productDescription:'Un système d’intelligence de marque issu des méthodes utilisées au sein de la pratique.',
founderJudgment:'Quantum Branding est ma pratique indépendante. Passer du business aux institutions, à la culture et à la technologie m’a appris à reconnaître les schémas entre secteurs : mieux questionner, voir l’essentiel, puis agir. Le discernement vient d’abord. L’IA raccourcit le chemin entre compréhension et réalisation ; elle ne crée pas ce discernement.',
edition:'NIZZAR BEN CHEKROUNE / PRATIQUE INDÉPENDANTE',invitationIndex:'UN BON POINT DE DÉPART ↘',processEyebrow:'DANS LA BOÎTE QUANTUM',processHint:'QUATRE ÉTAPES. UNE MÊME PRATIQUE.',selvaggiSummary:'Relier la marque, la présence digitale et la conversation commerciale.',verneSummary:'Un regard stratégique et commercial sur une maison de joaillerie.',openContext:'Explorer le contexte ↗',posterType:'VOIR.<br> <span class="poster-plus">+</span><br> FAIRE.',experimentIndex:'EXPÉRIENCE 001',toolIndex:'OUTIL 002',paperTitle:'LA BONNE<br> QUESTION',paperFoot:'MOINS DE BRUIT. UN DÉPART CLAIR.',footerBig:'L’ESPRIT OUVERT.',ticker:'VOIR L’ESSENTIEL <span>↗</span> CONSTRUIRE CE QUI COMPTE <span>↗</span> VOIR L’ESSENTIEL <span>↗</span> CONSTRUIRE CE QUI COMPTE <span>↗</span>',

skip:'Aller au contenu',navWork:'Le travail',navPractice:'La pratique',navLab:'Le Lab <span class="tiny-dot"></span>',letsTalk:'Parlons-en',heroEyebrow:'ESPRIT INDÉPENDANT. CHANGEMENT CONCRET.',heroTitle:'Mieux décider.<br> <span class="serif">Puis réaliser.</span>',heroDescription:'Pour les entreprises qui ont quelque chose<br class="desktop-break"> d’important à améliorer, lancer, repenser ou construire.',heroCta:'Dites-nous ce que vous voulez changer',possibilities:'DES POSSIBLES À L’INTÉRIEUR',boxNote:'Différents outils.<br> Une même pensée.',boxHint:'UN OUTIL. UNE PORTE D’ENTRÉE.',pauseMotion:'Pause animation',founderLed:'Une pratique indépendante portée par Nizzar Ben Chekroune',scrollExplore:'Un peu plus loin, un peu plus clair',introLabel:'LA PENSÉE DERRIÈRE LA BOÎTE',introTitle:'L’outil n’est<br> <span class="serif">pas le sujet.</span>',introLead:'Savoir quoi changer.<br> Puis le concrétiser.<br> C’est ça, le travail.',introBody:'De bonnes questions. Un discernement clair. Quelque chose d’utile. La reconnaissance des schémas vient d’abord ; l’IA accélère le passage de la compréhension à la réalisation. Elle ne décide pas de ce qui compte.',introLink:'Découvrir la pratique',understand:'Comprendre',decide:'Décider',make:'Réaliser',verify:'Vérifier',workLabel:'DES ACTES, PAS SEULEMENT DES MOTS',workTitle:'Le travail.<br> <span class="serif">En contexte.</span>',workDescription:'Deux contextes clients.<br> Un parcours qui va plus loin.',contextStudy:'CONTEXTE / MARQUE & DIGITAL',editorialCover:'VISUEL ÉDITORIAL · PAS UNE CRÉATION CLIENT',verneContext:'CONTEXTE / JOAILLERIE DE LUXE',selvaggiMeta:'Marque · Digital · Commercial',verneMeta:'Stratégie · Marketing · Direction commerciale',workFoot:'Les projets clients partent d’une entreprise. Le Lab part d’une question.',visitLab:'Dans le Lab',practiceLabel:'PLUSIEURS ENTRÉES. UNE SEULE PRATIQUE.',practiceTitle:'Qu’avez-vous<br> <span class="serif">en tête ?</span>',practiceBody:'Pas besoin de savoir quelle discipline il vous faut.<br> Juste de reconnaître ce qui doit bouger.',practiceBottom:'Assez large pour reconnaître le problème.<br> <strong>Assez précis pour porter le travail.</strong>',labLabel:'LA CURIOSITÉ, AVEC QUELQUE CHOSE À MONTRER',labStamp:'PAS DU TRAVAIL CLIENT.<br> DE LA VRAIE RÉFLEXION.',labTitle:'Moins de « et si ».<br> <span class="serif">Plus de « voyons ».</span>',labBody:'Produits, prototypes et petites obsessions utiles. Au Lab, les idées deviennent des objets qui fonctionnent. Certaines vont loin. Toutes nous apprennent quelque chose.',workingExperiment:'EXPÉRIENCE EN COURS',tryHere:'À ESSAYER ICI',quantumLabCopy:'Une idée entre. Une marque prend forme. Un système de marque en exploration.',briefToolTitle:'Le brief avant le brief',briefToolCopy:'Transformer « quelque chose doit changer » en point de départ utile.',posterBottom:'UN ESPRIT CURIEUX.<br> UN HUMAIN RESPONSABLE.',founderLabel:'PAS UN COLLECTIF ANONYME',founderTitle:'Un regard large.<br> <span class="serif">Un lien humain.</span>',founderIntro:'Moi, c’est Nizzar. Je relie les points.<br> Puis je construis ce qui manque.',founderBody:'Quantum Branding est ma pratique indépendante. Je navigue entre stratégie de marque, business, technologies émergentes et éducation à l’IA. Pas pour les outils, mais parce que le problème tient rarement dans une seule discipline.',founderAccountability:'Vous travaillez directement avec moi. Quand le projet demande un spécialiste, je le fais intervenir. La responsabilité reste ici.',founderLink:'Dites-moi ce qui se passe',startLabel:'PARTEZ DE LÀ OÙ VOUS EN ÊTES',startTitle:'Que faut-il<br> <span class="serif">changer ?</span>',startBody:'Un projet défini ou le sentiment que quelque chose ne va pas.<br> Pas besoin d’un brief parfait pour commencer.',projectTitle:'Je sais ce qu’il me faut.',projectBody:'Parlons du résultat, du périmètre et du chemin pour y arriver. Sans diagnostic obligatoire.',projectCta:'Parlez-nous de votre projet',problemTitle:'Quelque chose doit changer.',problemBody:'Partez de ce qui se passe. Nous verrons ensemble si une investigation ciblée serait utile.',problemCta:'Trouvons le point de départ',formatsSummary:'Besoin d’un point de départ structuré ? Découvrez les formats ciblés.',sessionPrice:'À partir de 1 500 €',sessionBody:'Une session de travail autour d’une question IA et business importante.',dayBody:'Une journée pour identifier où l’IA peut créer une valeur réelle.',diagnosisPrice:'À partir de 3 500 €',diagnosisBody:'Une investigation quand le bon projet reste à définir.',formatsNote:'Le premier échange commercial est gratuit. Les projets clairs sont cadrés directement. Ces formats sont facultatifs, jamais un passage obligé.',footerThought:'Tout explorer.<br> Réaliser l’essentiel.',backTop:'Retour à la boîte',footerIndependent:'Indépendant par choix. Porté par Nizzar.',privacy:'Confidentialité & notes du site'
};


export const processSteps = [
  { tool:0, href:'#practice', en:{title:'Find the real question.', body:'Ask the questions that bring useful information to the surface. Draw on patterns across industries to understand quickly, without assuming that two businesses are the same.', label:'INPUT', value:'The situation.', output:'Look closer before choosing a tool.', link:'Find your starting point ↗'}, fr:{title:'Trouver la vraie question.', body:'Poser les questions qui font émerger les informations utiles. S’appuyer sur les schémas observés entre secteurs pour comprendre vite, sans supposer que deux entreprises se ressemblent.', label:'POINT DE DÉPART', value:'La situation.', output:'Regarder avant de choisir un outil.', link:'Trouver votre point de départ ↗'} },
  { tool:5, href:'#start', en:{title:'Choose what matters.', body:'Identify what matters. Be direct about what does not. Suggest a better direction when needed, then agree on the result and scope. If the project is clear, go straight to the work.', label:'DIRECTION', value:'A clear choice.', output:'One priority. An agreed scope.', link:'Bring your project ↗'}, fr:{title:'Choisir ce qui compte.', body:'Identifier l’essentiel. Dire clairement ce qui ne l’est pas. Proposer une meilleure direction si nécessaire, puis convenir du résultat et du périmètre. Si le projet est clair, passer au travail.', label:'DIRECTION', value:'Un choix clair.', output:'Une priorité. Un périmètre défini.', link:'Parlons de votre projet ↗'} },
  { tool:3, href:'#lab', en:{title:'Make the thinking tangible.', body:'A brand, a website, a workflow, a tool. Bring together the disciplines the problem needs, and turn the direction into something people can use.', label:'IN THE MAKING', value:'Something real.', output:'From an idea to a working object.', link:'See what is in the Lab ↗'}, fr:{title:'Donner forme aux idées.', body:'Une marque, un site, un workflow, un outil. Réunir les disciplines utiles au problème et transformer la direction en quelque chose que l’on peut utiliser.', label:'EN CONSTRUCTION', value:'Du concret.', output:'De l’idée à un objet qui fonctionne.', link:'Explorer le Lab ↗'} },
  { tool:0, href:'#work', en:{title:'Put it up against reality.', body:'Stay involved as the work meets reality. Test against the agreed result, refine what needs to change and help the people who will own it use it. Separate evidence from assumptions.', label:'REALITY CHECK', value:'Does it work?', output:'Test. Refine. Put it to use.', link:'Explore the work ↗'}, fr:{title:'Confronter au réel.', body:'Rester impliqué quand le travail rencontre le réel. Tester selon le résultat convenu, affiner ce qui doit changer et aider les personnes qui le feront vivre à se l’approprier. Distinguer les faits des hypothèses.', label:'À L’ÉPREUVE DU RÉEL', value:'Ça fonctionne ?', output:'Tester. Affiner. Mettre en pratique.', link:'Explorer le travail ↗'} }
];

export function buildBrief(values, language = 'en') {
  const fr = language === 'fr';
  const fields = fr ? [['Point de départ', values.route],['Contexte',values.company],['Ce qui doit changer',values.change],['Le résultat recherché',values.result],['Contraintes / calendrier',values.constraints],['Contact',values.contact]] : [['Starting point',values.route],['Context',values.company],['What needs to change',values.change],['Desired result',values.result],['Constraints / timeline',values.constraints],['Contact',values.contact]];
  return `${fr ? 'QUANTUM BRANDING — POINT DE DÉPART' : 'QUANTUM BRANDING — STARTING POINT'}\n\n${fields.filter(([,v]) => v?.trim()).map(([k,v]) => `${k}\n${v.trim()}`).join('\n\n')}\n\n${fr ? 'Un point de départ pour une conversation. Pas un diagnostic automatisé, ni une proposition.' : 'A starting point for a conversation. Not an automated diagnosis or a proposal.'}`;
}

export function escapeHTML(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

if (typeof document !== 'undefined') init();

function init() {
  const $ = s => document.querySelector(s);
  let lang = 'en';
  try { lang = localStorage.getItem('quantum-language') === 'fr' ? 'fr' : 'en'; } catch {}
  const english = {};
  document.querySelectorAll('[data-i18n]').forEach(el => { english[el.dataset.i18n] ??= el.innerHTML; });
  const t = (en,fr) => lang === 'fr' ? fr : en;
  const world = $('#box-world');
  const dialog = $('#detail-dialog');
  let returnFocus = null;
  let activePanel = null;
  let toastTimer;
  let briefText = '';
  let processStep = 0;
  let motionPaused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.toggle('motion-paused',motionPaused);

  function renderLanguage() {
    document.documentElement.lang = lang;
    document.title = t('Quantum Branding — Better decisions, made real.','Quantum Branding — Mieux décider. Puis réaliser.');
    document.querySelector('meta[name="description"]').content = t('Quantum Branding is Nizzar Ben Chekroune’s independent practice for companies with something important to improve, launch, rethink or build.','Quantum Branding, la pratique indépendante de Nizzar Ben Chekroune pour les entreprises qui ont quelque chose d’important à améliorer, lancer, repenser ou construire.');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = (lang === 'fr' ? french : english)[el.dataset.i18n] ?? english[el.dataset.i18n]; });
    $('#language').innerHTML = lang === 'en' ? 'EN <span>/ FR</span>' : 'FR <span>/ EN</span>';
    $('#language').setAttribute('aria-label', t('Switch to French','Passer en anglais'));
    $('.desktop-nav').setAttribute('aria-label',t('Main navigation','Navigation principale'));
    $('#mobile-nav').setAttribute('aria-label',t('Mobile navigation','Navigation mobile'));
    $('.dialog-close').setAttribute('aria-label',t('Close dialog','Fermer la fenêtre'));
    $('#instruments').setAttribute('aria-label',t('Explore six connected areas of the practice','Explorer les six territoires de la pratique'));
    updateBoxLabel(); updateMotionLabel(); updateMenuLabel();
    $('#instruments').innerHTML = territories.map((territory,i) => `<button class="instrument instrument-${i}" data-territory="${territory.id}" aria-label="${escapeHTML(territory[lang].name)}"${world.classList.contains('is-open') ? '' : ' tabindex="-1"'}>${icons[i]}<span class="instrument-label">${territory[lang].short} ↗</span></button>`).join('');
    $('#territory-list').innerHTML = territories.map((territory,i) => `<div class="territory-row"><button class="territory-trigger" aria-expanded="false" aria-controls="territory-${territory.id}" data-accordion="${territory.id}"><span class="row-number">0${i+1}</span><h3>${territory[lang].name}</h3><span aria-hidden="true">＋</span></button><div class="territory-content" id="territory-${territory.id}" hidden><p>${territory[lang].question}<br> ${territory[lang].body}</p><button class="text-link" data-territory="${territory.id}" style="background:none;padding:0">${t('Explore this starting point','Explorer ce point de départ')} ↗</button></div></div>`).join('');
    document.querySelectorAll('[data-contact-link]').forEach(link => link.href = `mailto:${siteConfig.contactEmail}`);
    $('#year').textContent = new Date().getFullYear();
    $('.process-tabs').setAttribute('aria-label', t('How we work', 'Notre manière de travailler'));
    renderProcess();
  }

  // One decorative instance of the same box. Rewrite SVG IDs to avoid paint-server collisions.
  const processBox = $('.box-svg').cloneNode(true);
  processBox.removeAttribute('class');
  processBox.querySelectorAll('[id]').forEach(el => el.id = `process-${el.id}`);
  processBox.querySelectorAll('[fill]').forEach(el => { const fill = el.getAttribute('fill'); if(fill.startsWith('url(#')) el.setAttribute('fill',fill.replace('url(#','url(#process-')); });
  $('#process-box').append(processBox);

  function renderProcess() {
    const step = processSteps[processStep];
    const data = step[lang];
    $('#process-workbench').dataset.step = String(processStep);
    $('#process-panel').setAttribute('aria-labelledby', `step-${processStep}`);
    document.querySelectorAll('[data-process-step]').forEach((button,index) => {
      button.setAttribute('aria-selected',String(index === processStep));
      button.tabIndex = index === processStep ? 0 : -1;
    });
    $('#process-title').textContent = data.title;
    $('#process-description').textContent = data.body;
    $('#process-link').textContent = data.link;
    $('#process-link').href = step.href;
    $('#process-count').textContent = `0${processStep+1} / 04`;
    $('#process-ticket-label').textContent = data.label;
    $('#process-ticket-value').textContent = data.value;
    $('#process-ticket-foot').textContent = data.output;
    $('#process-object').innerHTML = icons[step.tool];
  }
  $('.process-tabs').addEventListener('click',event => {
    const button = event.target.closest('[data-process-step]');
    if (!button) return;
    processStep = Number(button.dataset.processStep);
    renderProcess();
  });
  $('.process-tabs').addEventListener('keydown',event => {
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
    event.preventDefault();
    processStep = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : (processStep + (event.key === 'ArrowRight' ? 1 : 3)) % 4;
    renderProcess();
    $(`#step-${processStep}`).focus();
  });

  function updateBoxLabel() { $('#box-toggle').setAttribute('aria-label',world.classList.contains('is-open') ? t('Close the Quantum Box','Fermer la boîte Quantum') : t('Open the Quantum Box','Ouvrir la boîte Quantum')); }
  function updateMotionLabel() { $('#motion-toggle').textContent = motionPaused ? t('Resume motion','Reprendre l’animation') : t('Pause motion','Pause animation'); $('#motion-toggle').setAttribute('aria-pressed',String(motionPaused)); }
  function updateMenuLabel() { $('#menu-toggle').setAttribute('aria-label',$('#mobile-nav').hidden ? t('Open navigation','Ouvrir la navigation') : t('Close navigation','Fermer la navigation')); }
  function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'),3200); }

  function openPanel(html, state) {
    if (!dialog.open) returnFocus = document.activeElement;
    activePanel = state;
    $('#dialog-content').innerHTML = html;
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.scrollTop = 0;
    $('.dialog-close').focus();
  }

  function showTerritory(id) {
    const territory = territories.find(item => item.id === id);
    if (!territory) return;
    const data = territory[lang];
    openPanel(`<p class="dialog-kicker">${t('ONE PRACTICE / MANY WAYS IN','UNE PRATIQUE / PLUSIEURS ENTRÉES')}</p><h2 id="dialog-title">${data.name}</h2><p class="dialog-lead">${data.question}</p><p>${data.body}</p><div class="dialog-tags">${data.tags.map(tag => `<span>${tag}</span>`).join('')}</div><p>${t('If the project is clear, we scope it directly. If it isn’t, we agree on the right way to investigate. The first commercial conversation is free.','Si le projet est clair, nous le cadrons directement. Sinon, nous définissons la bonne façon d’explorer. Le premier échange commercial est gratuit.')}</p><button class="button" data-brief-territory="${id}">${data.entry} <span>↗</span></button>`,{type:'territory',id});
  }

  function showCase(id) {
    const cases = {
      selvaggi:{title:'Selvaggi', kicker:t('CLIENT CONTEXT / BRAND, DIGITAL, COMMERCIAL','CONTEXTE CLIENT / MARQUE, DIGITAL, COMMERCIAL'), lead:t('Connecting brand, digital presence and commercial work.','Relier la marque, la présence digitale et le travail commercial.'), facts: t([['Context','Selvaggi.'],['Role','Brand, digital and commercial work.'],['Problem & deliverables','A detailed, approved scope and project assets are not included in this preview.'],['Status','Referenced in the practice’s source material. Current engagement status is not asserted.'],['Outcomes','No quantitative outcomes are published without documentation and approval.']],[['Contexte','Selvaggi.'],['Rôle','Travail de marque, digital et commercial.'],['Problème & livrables','Le périmètre détaillé approuvé et les créations du projet ne sont pas inclus dans cet aperçu.'],['Statut','Référencé dans la documentation de la pratique. Aucun statut actuel de mission n’est affirmé.'],['Résultats','Aucun résultat chiffré publié sans preuve et approbation.']])},
      verne:{title:'Verne Jewels', kicker:t('CLIENT CONTEXT / LUXURY JEWELRY','CONTEXTE CLIENT / JOAILLERIE DE LUXE'),lead:t('Strategic, marketing and commercial direction.','Direction stratégique, marketing et commerciale.'),facts:t([['Context','Luxury jewelry.'],['Role','Strategic, marketing and commercial direction, in a fractional CMO context.'],['Problem & deliverables','Detailed project scope and approved client assets are required for a full case study.'],['Status','Referenced in the practice’s source material. Current engagement status is not asserted.'],['Outcomes','No sales, growth or performance claims are made.']],[['Contexte','Joaillerie de luxe.'],['Rôle','Direction stratégique, marketing et commerciale dans un contexte de CMO à temps partagé.'],['Problème & livrables','Le périmètre détaillé et les créations approuvées sont nécessaires pour une étude de cas complète.'],['Statut','Référencé dans la documentation de la pratique. Aucun statut actuel de mission n’est affirmé.'],['Résultats','Aucune affirmation de ventes, de croissance ou de performance.']])},
      quantum:{title:'Quantum Branding AI',kicker:t('QUANTUM LAB / PRODUCT · LIVE','QUANTUM LAB / PRODUIT · EN LIGNE'),lead:t('Brand intelligence, made into a working system.','L’intelligence de marque, dans un système concret.'),facts:t([['Origin','Born in Quantum Lab, developed from methods used inside the practice.'],['Product','A connected brand operating system, from an idea to positioning and concrete brand work.'],['Instrument','Signal Scan is available inside the product. An instrument can inform the work without becoming a separate service.'],['Availability','Publicly available at quantumbranding.ai. Explore the product for its current tools and access options.']],[['Origine','Né au sein de Quantum Lab, à partir des méthodes utilisées dans la pratique.'],['Produit','Un système de marque connecté, de l’idée au positionnement et aux réalisations concrètes.'],['Instrument','Signal Scan est disponible dans le produit. Un instrument peut nourrir le travail sans devenir un service distinct.'],['Disponibilité','Accessible sur quantumbranding.ai. Le site du produit présente les outils et les modalités d’accès actuels.']])}
    };
    const data = cases[id]; if (!data) return;
    openPanel(`<p class="dialog-kicker">${data.kicker}</p><h2 id="dialog-title">${data.title}</h2><p class="dialog-lead">${data.lead}</p><dl class="case-facts">${data.facts.map(([key,value])=>`<div><dt>${key}</dt><dd>${value}</dd></div>`).join('')}</dl>${id !== 'quantum' ? `<p>${t('The cover on this site is an original editorial treatment, not a client-approved identity or deliverable.','Le visuel présenté est une création éditoriale originale, pas une identité ni un livrable approuvé par le client.')}</p>` : ''}${id === 'quantum' ? `<a class="button" href="https://quantumbranding.ai">${t('Explore product','Explorer le produit')} ↗</a>` : `<button class="button" data-start="project">${t('Bring us your project','Parlez-nous de votre projet')} ↗</button>`}`,{type:'case',id});
  }

  function showBrief(route = 'problem',territoryId = '') {
    const territory = territories.find(item => item.id === territoryId);
    const routeLabel = territory ? territory[lang].name : route === 'project' ? t('I have a defined project','J’ai un projet défini') : t('Something needs to change','Quelque chose doit changer');
    openPanel(`<p class="dialog-kicker">${t('A USEFUL START, NOT A PERFECT BRIEF','UN DÉBUT UTILE, PAS UN BRIEF PARFAIT')}</p><h2 id="dialog-title">${t('Tell us what<br> <span class="serif">needs to change.</span>','Dites-nous ce qui<br> <span class="serif">doit changer.</span>')}</h2><p>${t('A few questions to make your starting point clearer. This tool organizes your words—it does not use AI or diagnose your business.','Quelques questions pour clarifier votre point de départ. Cet outil structure vos mots, sans IA ni diagnostic automatique.')}</p><div class="direct-email"><a class="text-link" href="mailto:${siteConfig.contactEmail}">${t('Or email Nizzar directly','Ou écrire directement à Nizzar')} ↗</a><span>${siteConfig.contactEmail}</span></div><form class="brief-form" id="brief-form"><input type="hidden" name="route" value="${escapeHTML(routeLabel)}"><label>${t('Your company / context','Votre entreprise / contexte')}<input name="company" maxlength="250" autocomplete="organization" placeholder="${t('A little context goes a long way','Un peu de contexte fait la différence')}"></label><label>${t('What needs to change? *','Que faut-il changer ? *')}<textarea name="change" required maxlength="3000" placeholder="${t('What is happening, or what do you want to build?','Que se passe-t-il, ou que voulez-vous construire ?')}"></textarea></label><label>${t('What would a good result look like? *','À quoi ressemblerait un bon résultat ? *')}<textarea name="result" required maxlength="2000" placeholder="${t('What should be different when the work is done?','Qu’est-ce qui devrait être différent à la fin ?')}"></textarea></label><label>${t('Constraints / timeline','Contraintes / calendrier')}<input name="constraints" maxlength="500" placeholder="${t('Timing, budget, people, dependencies…','Délais, budget, équipe, dépendances…')}"></label><label>${t('Your email (optional, included in your export only)','Votre e-mail (facultatif, uniquement dans l’export)')}<input name="contact" type="email" maxlength="250" autocomplete="email" placeholder="vous@entreprise.com"></label><small>${siteConfig.contactEmail ? t('Your answers stay in this browser. After reviewing, you can open an email draft to Nizzar. Nothing is sent automatically.','Vos réponses restent dans ce navigateur. Après relecture, vous pourrez ouvrir un brouillon d’e-mail à Nizzar. Rien n’est envoyé automatiquement.') : t('Preview mode: contact delivery is not connected yet. You can prepare, copy and download your brief. Nothing is sent or stored on a server.','Mode aperçu : l’envoi n’est pas encore connecté. Vous pouvez préparer, copier et télécharger votre brief. Rien n’est envoyé ni stocké sur un serveur.')}</small><button class="button" type="submit">${t('Make my starting brief','Préparer mon point de départ')} <span>↗</span></button></form>`,{type:'brief',route,territoryId});
  }

  function showBriefResult(values) {
    briefText = buildBrief(values,lang);
    openPanel(`<p class="dialog-kicker">${t('YOUR WORDS. A CLEARER START.','VOS MOTS. UN DÉPART PLUS CLAIR.')}</p><h2 id="dialog-title">${t('Something to<br> <span class="serif">start with.</span>','De quoi<br> <span class="serif">commencer.</span>')}</h2><p>${t('This is your brief, not an enquiry submission. Review it, keep a copy, and use it to start a conversation.','Ceci est votre brief, pas un message envoyé. Relisez-le, gardez-en une copie et utilisez-le pour ouvrir la conversation.')}</p><div class="brief-result">${escapeHTML(briefText)}</div><div class="brief-actions"><button class="button" id="copy-brief">${t('Copy brief','Copier le brief')} ↗</button><button class="button button-secondary" id="download-brief">${t('Download .txt','Télécharger .txt')} ↓</button>${siteConfig.contactEmail ? `<a class="button" href="mailto:${encodeURIComponent(siteConfig.contactEmail)}?subject=${encodeURIComponent(t('Something to change — Quantum Branding','Quelque chose à changer — Quantum Branding'))}&body=${encodeURIComponent(briefText)}">${t('Open email draft','Ouvrir un brouillon d’e-mail')} ↗</a>` : ''}<button class="button button-secondary" id="edit-brief">${t('Edit answers','Modifier mes réponses')}</button></div><p style="margin-top:22px">${t('Nothing has been sent. The first commercial conversation is free; a clear project can go directly to scope.','Rien n’a été envoyé. Le premier échange commercial est gratuit ; un projet clair peut être cadré directement.')}</p>`,{type:'result',values});
  }

  function showPrivacy() { openPanel(`<p class="dialog-kicker">${t('A SMALL, HONEST NOTE','UNE NOTE SIMPLE ET TRANSPARENTE')}</p><h2 id="dialog-title">${t('Privacy &<br> <span class="serif">site notes.</span>','Confidentialité &<br> <span class="serif">notes du site.</span>')}</h2><p>${t('This site uses no analytics, advertising trackers or cookies. Your language preference is saved in local storage on this device.','Ce site n’utilise ni analytics, ni traceurs publicitaires, ni cookies. Votre préférence de langue est enregistrée localement sur cet appareil.')}</p><p>${t('The brief tool runs in your browser. Answers are kept in memory only, are not automatically sent anywhere, and disappear when you reload. A downloaded brief stays wherever you save it.','L’outil de brief fonctionne dans votre navigateur. Les réponses restent en mémoire, ne sont envoyées nulle part automatiquement et disparaissent au rechargement. Un brief téléchargé reste à l’endroit où vous l’enregistrez.')}</p><p>${t('Typography is requested from Google Fonts, which receives standard connection data such as your IP address. System-font fallbacks keep the site usable if those requests are blocked.','Les polices proviennent de Google Fonts, qui reçoit les données de connexion habituelles, dont l’adresse IP. Des polices système prennent le relais si ces requêtes sont bloquées.')}</p><p>${t('Work covers are original editorial compositions, not client-approved creative. The founder portrait is typographic. Email links open your email application; nothing is sent until you choose to send it.','Les visuels de projets sont des compositions éditoriales originales, pas des créations approuvées par les clients. Le portrait est typographique. Les liens e-mail ouvrent votre messagerie ; rien n’est envoyé sans votre action.')}</p>`,{type:'privacy'}); }

  $('#language').addEventListener('click', () => { lang = lang === 'en' ? 'fr' : 'en'; try { localStorage.setItem('quantum-language',lang); } catch {} renderLanguage(); });
  $('#box-toggle').addEventListener('click', () => { const open = world.classList.toggle('is-open'); $('#box-toggle').setAttribute('aria-expanded',String(open)); $('#instruments').inert = !open; $('#instruments').querySelectorAll('button').forEach(button => button.tabIndex = open ? 0 : -1); updateBoxLabel(); });
  $('#motion-toggle').addEventListener('click', () => { motionPaused = !motionPaused; document.body.classList.toggle('motion-paused',motionPaused); updateMotionLabel(); });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',event => { motionPaused = event.matches; document.body.classList.toggle('motion-paused',motionPaused); updateMotionLabel(); });
  world.addEventListener('pointermove',event => { if (motionPaused || event.pointerType === 'touch') return; const rect = world.getBoundingClientRect(); world.style.setProperty('--mx',`${((event.clientX-rect.left)/rect.width-.5)*9}deg`); world.style.setProperty('--my',`${-((event.clientY-rect.top)/rect.height-.5)*5}deg`); });
  world.addEventListener('pointerleave',()=> { world.style.setProperty('--mx','0deg'); world.style.setProperty('--my','0deg'); });
  $('#menu-toggle').addEventListener('click',()=> { const nav = $('#mobile-nav'); nav.hidden = !nav.hidden; $('#menu-toggle').setAttribute('aria-expanded',String(!nav.hidden)); updateMenuLabel(); });
  $('#mobile-nav').addEventListener('click',event => { if (event.target.closest('a')) { $('#mobile-nav').hidden = true; $('#menu-toggle').setAttribute('aria-expanded','false'); updateMenuLabel(); } });
  document.addEventListener('keydown',event => { if(event.key === 'Escape' && !$('#mobile-nav').hidden) { $('#mobile-nav').hidden = true; $('#menu-toggle').setAttribute('aria-expanded','false'); updateMenuLabel(); $('#menu-toggle').focus(); } });
  $('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('keydown',event => {
    if(event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),textarea:not(:disabled),select:not(:disabled),[tabindex="0"]')].filter(el => el.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if(event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if(!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  dialog.addEventListener('click',event => { if(event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close',()=> { document.body.classList.remove('dialog-open'); returnFocus?.focus(); });

  document.addEventListener('click',async event => {
    const target = event.target.closest('button'); if(!target) return;
    if(target.dataset.territory) showTerritory(target.dataset.territory);
    if(target.dataset.case) showCase(target.dataset.case);
    if(target.dataset.start) showBrief(target.dataset.start);
    if(target.dataset.briefTerritory) showBrief('project',target.dataset.briefTerritory);
    if(target.dataset.accordion) { const expanded = target.getAttribute('aria-expanded') === 'true'; target.setAttribute('aria-expanded',String(!expanded)); document.getElementById(target.getAttribute('aria-controls')).hidden = expanded; }
    if(target.id === 'lab-brief') showBrief('problem');
    if(target.id === 'privacy-button') showPrivacy();
    if(target.id === 'copy-brief') { try { await navigator.clipboard.writeText(briefText); toast(t('Brief copied. Nothing has been sent.','Brief copié. Rien n’a été envoyé.')); } catch { toast(t('Clipboard unavailable. Use Download .txt instead.','Presse-papiers indisponible. Utilisez Télécharger .txt.')); } }
    if(target.id === 'download-brief') { const url = URL.createObjectURL(new Blob([briefText],{type:'text/plain;charset=utf-8'})); const link = document.createElement('a'); link.href=url; link.download=`quantum-brief-${lang}.txt`; document.body.append(link); link.click(); link.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000); }
    if(target.id === 'edit-brief' && activePanel?.type === 'result') { const values = activePanel.values; showBrief(); const form = $('#brief-form'); for(const [key,value] of Object.entries(values)) { if(form.elements.namedItem(key)) form.elements.namedItem(key).value = value; } }
  });
  document.addEventListener('submit', event => { if(event.target.id !== 'brief-form') return; event.preventDefault(); const values = Object.fromEntries(new FormData(event.target)); for(const field of ['change','result']) { const input = event.target.elements.namedItem(field); input.setCustomValidity(values[field]?.trim() ? '' : t('Please add a few words.','Ajoutez quelques mots.')); if(!input.reportValidity()) return; } showBriefResult(values); });
  document.addEventListener('input',event => { if(event.target.closest('#brief-form') && typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity(''); });
  renderLanguage();
}