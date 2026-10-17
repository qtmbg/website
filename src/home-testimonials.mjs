// Owner-selected homepage excerpts. Canonical evidence and full originals remain
// in their existing records; this presentation does not rewrite either corpus.
import {commercialProof} from './evidence.mjs';
import {perspectives} from './perspectives.mjs';
import {esc,route} from './shared.mjs';

const selection=[
 {id:'francoise-rapp-2026-10-15',quote:'His approach took us far beyond traditional branding.',lens:['Strategy','Stratégie'],project:'rapp-esen',projectName:'Rapp & Esen'},
 {id:'leslie-lentz-2026-09-28',lens:['Execution','Réalisation'],role:'Marketing Director',project:'selvaggi',projectName:'Selvaggi'},
 {id:'hanane-el-aafifi-2026-10-06',lens:['Transmission','Transmission']}
];

export function homeTestimonials(lang='en'){
 const fr=lang==='fr';
 return `<div class="home-testimonials">${selection.map((item,i)=>{
  const record=[...perspectives,...commercialProof].find(r=>r.id===item.id);
  const quote=item.quote||record?.approved_excerpt?.[0];
  const originals=record?.full_original_text||record?.approved_excerpt||[];
  if(!record?.source_verified||!originals.some(text=>text.includes(quote)))throw Error('Unverified homepage excerpt: '+item.id);
  const role=item.role||record.author_title||record.author_role_observed;
  if(item.role&&!record.author_role_observed.startsWith(item.role))throw Error('Unverified homepage role: '+item.id);
  const full=i===0?route('/people',lang)+'#p-francoise-rapp':'https://nizzar.com/in-their-words';
  return `<figure class="home-testimonial" data-home-testimonial="${esc(item.id)}"><p class="home-testimonial-lens">0${i+1} · ${esc(item.lens[fr?1:0])}</p><blockquote lang="${esc(record.original_language)}">“${esc(quote)}”</blockquote><figcaption><span class="home-testimonial-author">${esc(record.author_name)}</span><span class="home-testimonial-role">${esc(role)}</span>${record.organization?`<span class="home-testimonial-role">${esc(record.organization)}</span>`:''}<span class="home-testimonial-links"><a href="${esc(full)}">${fr?'Lire le témoignage complet ↗':'Full recommendation ↗'}</a>${item.project?`<a href="${route('/work/'+item.project,lang)}">${esc(item.projectName)} ↗</a>`:''}</span></figcaption></figure>`;
 }).join('')}</div>`;
}
