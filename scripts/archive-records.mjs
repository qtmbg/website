// Local synthesis outputs. Internal evidence stays in archive/; the public
// model uses a strict field allowlist and preserves the governing owner SOT.
import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const get=async p=>JSON.parse(await readFile(new URL(p,root),'utf8'));
const put=async(p,x)=>writeFile(new URL(p,root),JSON.stringify(x,null,2)+'\n');
const projects=await get('archive/registers/projects.json');
const mapping=await get('archive/media-project-map.json');
const media=await get('archive/media.json');
const bi=(en,fr)=>({en,fr});
for(const p of projects){
 if(p.ownerParticipation===false){
  if(p.listed===undefined)p.listed=true;p.relationship='STUDIO RECORD';
  p.publishingStatus='PUBLIC STUDIO CONTEXT; NO PERSONAL CONTRIBUTION CLAIM';
  p.role=bi('Studio archive; individual participation not established','Archives du studio ; participation individuelle non établie');
 }
 // Refresh image mapping as reviewed first-party local outputs are added.
 const m=mapping[p.slug];
 if(m?.images?.length){
  p.cover=m.images[0];p.gallery=m.images.slice(1);
  p.blocks=p.blocks.filter(b=>b.type!=='gallery');
  if(p.gallery.length)p.blocks.push({type:'gallery',media:p.gallery,layout:'grid',title:bi('From the archive','Dans les archives')});
  p.media={...p.media,images:m.images};
 }
 p.aliases=p.aliases||[];
 if(p.slug==='bananacorp')p.aliases=['BnanaCorp','BananaCorp'];
 if(p.slug==='nception')p.aliases=['Nception','Inception'];
 const clean=s=>s.replace(/owner-attested\s*/gi,'').replace(/, owner-attested/gi,'').replace(/\s+attest[ée]+s? par Nizzar/gi,'').replaceAll('—','·').replaceAll('An Web3','A Web3').replace('Une mission et conservée','Une mission conservée').replace('outcomes preserved as project facts','project outcomes').replace('résultats et conservés comme faits du projet','résultats du projet').replace(/,\s*$/,'').trim();
 const visit=v=>typeof v==='string'?clean(v):Array.isArray(v)?v.map(visit):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,val])=>[k,visit(val)])):v;
 for(const key of ['title','role','oneLine','summary','context','blocks','credits']) if(p[key]!==undefined)p[key]=visit(p[key]);
 p.claimStatus=p.ownerParticipation===false?'STUDIO CONTEXT; NOT PERSONAL CONTRIBUTION':'OWNER-ATTESTED CANONICAL';
}
const find=s=>projects.find(p=>p.slug===s);
const lmc=find('la-minute-creative');
for(const b of lmc.blocks||[]) if(b.type==='text'&&b.body?.en?.some(t=>t.includes('2M+ views'))) b.body=bi(['The programme reached 2M+ views and was used as a case study across six countries.'],['Le programme a atteint plus de 2 millions de vues et a été utilisé comme étude de cas dans six pays.']);
find('energy-cube').role=bi('Energy Cube / Vetren Energy engagement','Mission Energy Cube / Vetren Energy');
find('energy-cube').oneLine=bi('Energy Cube / Vetren Energy, part of my professional work.','Energy Cube / Vetren Energy, une mission de mon parcours professionnel.');
find('energy-cube').summary=bi([find('energy-cube').oneLine.en],[find('energy-cube').oneLine.fr]);
find('energy-cube').blocks[0].body=find('energy-cube').summary;
find('zone-aire').oneLine=bi('Zone Aire, part of my professional work.','Zone Aire, une mission de mon parcours professionnel.');
find('zone-aire').summary=bi([find('zone-aire').oneLine.en],[find('zone-aire').oneLine.fr]);
find('zone-aire').blocks[0].body=find('zone-aire').summary;
// Direct project outcomes, without presenting evidence-management details as copy.
find('unlimitart').oneLine=bi('Founded in 2021. $2.7M raised. An eight-figure exit.','Fondé en 2021. 2,7 millions de dollars levés. Une sortie à huit chiffres.');
find('unlimitart').summary=bi([find('unlimitart').oneLine.en],[find('unlimitart').oneLine.fr]);find('unlimitart').blocks[0].body=find('unlimitart').summary;
await put('archive/registers/projects.json',projects);
const allowed=['slug','title','aliases','era','categories','relationship','role','oneLine','summary','start','end','context','sources','related','blocks','credits','studio','flagship','home','cover','gallery','listed','ownerParticipation'];
const publicProjects=projects.filter(p=>p.listed!==false).map(p=>Object.fromEntries(allowed.filter(k=>p[k]!==undefined).map(k=>[k,p[k]])));
let source=await readFile(new URL('src/archive/projects.mjs',root),'utf8');
source=source.slice(0,source.indexOf('export const projects ='));
if(!source.includes("'STUDIO RECORD':"))source=source.replace("export const relationships = {","export const relationships = {\n  'STUDIO RECORD': { en: 'Studio record', fr: 'Archives du studio' },");
await writeFile(new URL('src/archive/projects.mjs',root),source+'export const projects = '+JSON.stringify(publicProjects,null,2)+';\n');
await put('archive/registers/timeline.json',projects.map(p=>({project:p.slug,title:p.title,start:p.start,end:p.end,era:p.era,ownerParticipation:p.ownerParticipation!==false})));
const sources=[{id:'OWNER-SOT',level:1,type:'OWNER-ATTESTED SOURCE OF TRUTH',path:'/Users/drazicq/Documents/Codex/2026-09-20/we-are-starting-a-public-identity/identity-records/source-of-truth/IDENTITY-SOURCE-OF-TRUTH.md',note:'Governing current owner source and subsequent owner instructions. Public absence does not downgrade attestation.'}];
const urls=new Map();
for(const p of projects)for(const s of p.sources||[]){
 if(!s.url)continue;
 if(!urls.has(s.url)){const id='SOURCE-'+String(sources.length).padStart(3,'0');urls.set(s.url,id);sources.push({id,url:s.url,label:s.label,level:/linkedin|nizzar.com|fiverr|thequantumbranding|quantumbranding.ai/.test(s.url)?1:/arrozconpollo|youtube/.test(s.url)?2:3,scope:'Read alongside owner SOT; corroboration does not redefine reality.',projects:[]});}
 sources.find(x=>x.id===urls.get(s.url)).projects.push(p.slug);
}
for(const m of media)sources.push({id:'MEDIA-'+m.id,level:/nytimes|press/i.test(m.evidenceUrl||m.caption?.en||'')?3:2,source:m.source,evidenceUrl:m.evidenceUrl,project:m.project,publication:m.publishability,rightsNotes:m.rightsNotes});
await put('archive/registers/sources.json',sources);
const claims=projects.map(p=>({id:'PROJECT-'+p.slug,project:p.slug,statement:{role:p.role,scope:p.summary,start:p.start,end:p.end},status:p.ownerParticipation===false?'STUDIO CONTEXT; NOT PERSONAL CONTRIBUTION':p.claimStatus,basis:['OWNER-SOT',...(p.sources||[]).map(s=>urls.get(s.url)).filter(Boolean)],gaps:p.gaps,publication:p.publishingStatus}));
claims.push(...[
 ['UNLIMITART-RESULTS','unlimitart','Founded 2021; $2.7M raised; eight-figure exit','Current owner-confirmed SOT; superlative first NFT fund is superseded and excluded'],
 ['ABS-PERIOD','africa-business-school','February–May 2025; strategic marketing and emerging technologies; three recordings public','Current owner-supplied mission documents. Never narrow to Q1 or AI trainer'],
 ['GDGS-JURY','arts-thread-gdgs','Judge among 150+ expert judges, collaboration with Gucci; show featured by Google Arts & Culture','Owner canonical wording; judge not client or Top150 creative'],
 ['LMC-REACH','la-minute-creative','2M+ views; case study diffusion across six countries','Owner historical programme scope; not sum of current upload view counters'],
 ['DIPTYK-NYT','diptyk','Magazine Instagram account selected among five art accounts, 12 August 2020','Owner and studio first-party evidence; recognition of magazine account, not personal award'],
 ['TIME-WEB3','time-web3','TIME Web3 recognition, June 2022','Owner first-party professional record and recorded channel evidence; absence of time.com corroboration does not downgrade'],
 ['CAREER-2006','quantum-branding','Career experience since 2006','Latest direct owner wording; not assigned to every individual project']
].map(([id,project,statement,note])=>({id,project,statement,status:'OWNER-ATTESTED CANONICAL',note})));
await put('archive/registers/claims.json',claims);
const conflicts=[
 {project:'iom-compass',type:'OWNER-OWNER DATE CONFLICT',versions:['Historical platform portfolio: November–December 2020','Historical LinkedIn record: May–September 2021'],resolution:'Engagement and scope visible; no invented date resolution. Needs Nizzar only if exact period is to be published.'},
 {project:'diesel',type:'SUPERSEDED / UNSPECIFIED DATE',versions:['Historical platform listing includes November 2017–December 2018','Current owner SOT: strategy and marketing for Diesel, date not supplied; do not infer'],resolution:'Current SOT governs. Engagement visible undated. Exact attribution requires owner date clarification.'},
 {project:'diptyk',type:'PUBLIC KICKOFF / OWNER PERIOD',versions:['Studio kickoff October 2019','Canonical owner career span 2020–2021'],resolution:'Use 2020–2021 engagement span. October2019 kickoff documented as studio project context, not hidden.'},
 {project:'audi-driven-by-art',type:'HISTORICAL OWNER PRECISION',versions:['Current SOT previously recorded unspecified Audi attribution','Recovered owner LinkedIn project says January–March2020'],resolution:'Specific first-party owner project record supports year2020. Not used to claim later studio seasons or work after departure.'},
 {project:'un-women-pwe',type:'INSTITUTION LABEL',versions:['Historical portfolio label UN Women','Owner institutional record UNIDO women’s empowerment programme'],resolution:'Use UNIDO programme attribution; preserve historical label internally without claiming UN Women employment.'}
];
await put('archive/registers/conflicts.json',conflicts);
const md=s=>String(s??'').replaceAll('|','\\|').replaceAll('\n',' ');
let map='# Complete career landscape · local review\n\n'+projects.length+' records, including two explicitly labelled studio context records. Owner SOT governs; missing public corroboration is not a restriction. Nizzar makes the final editorial cut. Since2006 is career wording, not an inferred project date.\n\n';
for(const p of projects){
 const m={...(p.media||{}),images:[...new Set([p.cover,...(p.gallery||[]),...((p.media||{}).images||[])].filter(Boolean))]};map+=`## ${p.title}\n\n`;
 const rows={PROJECT:p.title,DATES:p.start?`${p.start}${p.end?' – '+p.end:''}`:'Not precisely dated',RELATIONSHIP:p.relationship,'NIZZAR ROLE':p.role?.en,'STUDIO / TEAM':[p.studio,...(p.credits||[]).map(c=>`${c.name}: ${c.role.en}`)].filter(Boolean).join('; '),CATEGORY:p.categories.join(', '),SUMMARY:p.summary?.en?.join(' '),IMAGES:(m.images||[]).join(', ')||'No publishable image located',VIDEO:(m.videos||[]).map(v=>v.youtube?'https://www.youtube.com/watch?v='+v.youtube:v.url).join('; ')||'None recovered',AUDIO:(m.audio||[]).map(a=>a.src).join('; ')||'None recovered',DOCUMENTS:(m.documents||[]).map(d=>d.href).join('; ')||'None recovered',RESULTS:p.slug==='unlimitart'?'$2.7M raised; eight-figure exit':p.slug==='la-minute-creative'?'2M+ views; diffusion in six countries':'See project summary and claim register',RECOGNITION:p.slug==='diptyk'?'NYT Instagram art-account selection':p.slug==='time-web3'?'TIME Web3 recognition':p.slug==='arts-thread-gdgs'?'Arts Thread judge; Gucci collaboration; Google Arts & Culture show coverage':'See scope and claims',SOURCES:(p.sources||[]).map(s=>s.url).filter(Boolean).join('; '),'CLAIM STATUS':p.claimStatus,'PUBLISHING STATUS':p.publishingStatus,'LOCAL URL':'http://localhost:3017/work/'+p.slug,'GAPS / DECISIONS':(p.gaps||[]).join('; ')||'None affecting current representation'};
 map+='| Field | Record |\n|---|---|\n'+Object.entries(rows).map(([k,v])=>`| ${k} | ${md(v)} |`).join('\n')+'\n\n';
}
await writeFile(new URL('archive/CAREER-MAP.md',root),map);
await put('archive/registers/media.json',media);
console.log(`Recorded ${projects.length} projects, ${sources.length} source records, ${claims.length} claim records, ${conflicts.length} discrepancies; all public records retain precise relationships.`);
