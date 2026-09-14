export const origin='https://thequantumbranding.com';
export const contactEmail='me@qtmbg.com';
export const contactUrl='https://nizzar.com/contact';
export const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const route=(path,lang)=>(lang==='fr'?'/fr':'')+(path==='/'&&lang==='fr'?'':path);
export const method=[
 {name:'Observe',fr:'Observer',en:'Look at what happens. Listen to customers, examine the work and separate evidence from assumptions.',bodyFr:'Regarder ce qui se passe. Écouter les clients, examiner le travail et distinguer les faits des hypothèses.'},
 {name:'Collapse',fr:'Choisir',en:'Choose the direction that deserves to exist. Make the trade-off explicit and agree on what success will look like.',bodyFr:'Choisir la direction qui mérite d’exister. Expliciter le compromis et définir ensemble le résultat attendu.'},
 {name:'Build',fr:'Construire',en:'Turn the decision into something people can use: a brand, a website, a commercial system or a working tool.',bodyFr:'Donner au choix une forme utilisable : une marque, un site, un dispositif commercial ou un outil qui fonctionne.'},
 {name:'Hold',fr:'Tenir',en:'Put the work in use. Watch what holds. Adjust what moves. Leave the team a basis for the next decision.',bodyFr:'Mettre le travail en usage. Observer ce qui tient. Ajuster ce qui bouge. Donner à l’équipe une base pour la prochaine décision.'}
];
export const cases=[
 {slug:'selvaggi',name:'Selvaggi',type:['Brand · Digital · Commercial','Marque · Digital · Commercial'],summary:['A contractor that builds inside working hospitals. The brand said none of it.','Un constructeur qui intervient dans des hôpitaux en activité. La marque passait cette expertise sous silence.'],fact:['Ongoing engagement.','Mission en cours.'],complete:true},
 {slug:'verne-jewels',name:'Verne Jewels',meta:['Beautiful images where you could not see the jewellery. A production system replaced a rhythm.','De belles images où le bijou devenait illisible. Un système de production a remplacé un rythme.'],type:['Strategy · Jewelry','Stratégie · Joaillerie'],summary:['Beautiful images where you could not see the jewellery.','De belles images où le bijou devenait illisible.'],fact:['Completed engagement, 2026.','Mission terminée, 2026.'],complete:true},
];
export const publishTestimonials=true;
export const reviews=[
 {name:'Elvin Picardo',attribution:['Elvin Picardo','Elvin Picardo'],en:'His knowledge and skill in eliciting the right information so it can be used for strategy is extremely good.',fr:'Son savoir-faire pour faire émerger les bonnes informations et les mettre au service de la stratégie est excellent.'},
 {name:'Tisa Esen',attribution:['Tisa Esen','Tisa Esen'],en:'He understands my brand, is able to relate and enhance my own understanding of my brand. He over-delivers from the start till the end, working fast and efficient, within the schedule of the process as agreed.',fr:'Il comprend ma marque, sait s’y identifier et enrichit ma propre compréhension de celle-ci. Il va au-delà des attentes du début à la fin, travaille vite et efficacement, dans le calendrier convenu.'},
 {name:'Shelah J.',attribution:['Shelah J.','Shelah J.'],en:"He brought great design, built on solid business strategy that is backed by years of experience. […] Nizzar is not a vendor, he's part of the team!",fr:'Il a apporté un excellent design, fondé sur une stratégie d’entreprise solide et des années d’expérience. […] Nizzar n’est pas un prestataire, il fait partie de l’équipe !'}
];
export function buildBrief(values,language='en'){
 const fields=language==='fr'?[['Contexte',values.company],['Ce qui doit changer',values.change],['Le résultat recherché',values.result],['Contraintes / calendrier',values.constraints],['Contact',values.contact]]:[['Context',values.company],['What needs to change',values.change],['Desired result',values.result],['Constraints / timeline',values.constraints],['Contact',values.contact]];
 return `QUANTUM BRANDING · ${language==='fr'?'POINT DE DÉPART':'STARTING POINT'}\n\n`+fields.filter(([,v])=>v?.trim()).map(([k,v])=>`${k}\n${v.trim()}`).join('\n\n');
}
export const territories=[
 ['Brand & Positioning','Marque & Positionnement','Choose the position, narrative and identity that express where the business is going.','Choisir le positionnement, le récit et l’identité qui expriment la direction de l’entreprise.'],
 ['Marketing & Sales','Marketing & Ventes','Clarify the offer and the path from interest to a commercial decision.','Clarifier l’offre et le chemin qui mène de l’intérêt à la décision commerciale.'],
 ['Digital & Experience','Digital & Expérience','Build a website, journey or product around what people need to do.','Construire un site, un parcours ou un produit autour de ce que les personnes doivent pouvoir faire.'],
 ['AI & Intelligent Systems','IA & Systèmes intelligents','Improve a workflow with an automation, an internal tool or a useful prototype.','Améliorer un processus avec une automatisation, un outil interne ou un prototype utile.'],
 ['AI Training & Adoption','Formation & Adoption IA','Help leaders and teams make practical choices about AI in their own work.','Aider les dirigeants et les équipes à faire des choix concrets sur l’IA dans leur travail.'],
 ['Business & Opportunity','Business & Opportunités','Investigate a market, a model or a possibility before committing resources.','Explorer un marché, un modèle ou une possibilité avant d’engager les ressources.']
];
export const references=[
 ['UNIDO / La Minute Creative','I designed the concept and ran the campaign for UNIDO’s La Minute Creative.','J’ai conçu le concept et mené la campagne La Minute Creative pour l’ONUDI.'],
 ['Audi / Driven by Art','I designed Audi’s Driven by Art programme around the 1:54 art fair.','J’ai conçu le programme Driven by Art d’Audi autour de la foire d’art 1:54.'],
 ['Diptyk','I ran digital strategy and content for Diptyk.','J’ai piloté la stratégie digitale et les contenus de Diptyk.']
];
export const formats=[
 ['Engagement','Mission','An agreed scope, a clear direction and the work to make it real.','Un périmètre convenu, une direction claire et le travail pour la concrétiser.','You leave with the work built and in use.','Vous repartez avec un travail réalisé et mis en usage.'],
 ['Quantum Diagnosis','Quantum Diagnosis','An investigation to define the right project.','Une investigation pour définir le bon projet.','You leave with the real problem named and the right project defined.','Vous repartez avec le vrai problème nommé et le bon projet défini.'],
 ['AI Opportunity Day','Journée d’opportunités IA','A working day to examine where AI could improve the business.','Une journée pour examiner où l’IA peut améliorer l’entreprise.','You leave with a mapped list of where AI would actually pay off.','Vous repartez avec une cartographie des usages où l’IA apporterait une valeur réelle.'],
 ['AI Working Session','Session de travail IA','A focused working session around an AI and business question.','Une session de travail ciblée sur une question IA et business.','You leave with a decision on one AI question.','Vous repartez avec une décision sur une question d’IA.']
];
