// Read-only external link retrievability audit. Access failure never changes SOT.
import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const projects=JSON.parse(await readFile(new URL('archive/registers/projects.json',root)));
const urls=[...new Set(projects.flatMap(p=>[...(p.sources||[]).map(s=>s.url),...(p.blocks||[]).flatMap(b=>b.type==='film'?[b.youtube?'https://www.youtube.com/watch?v='+b.youtube:b.url]:b.type==='audio'?[b.src]:b.type==='documents'?b.items.map(d=>d.href):[])].filter(Boolean)))];
const pending=urls.slice(),results=[];
await Promise.all(Array.from({length:6},async()=>{
 for(;;){const url=pending.shift();if(!url)return;try{
  const r=await fetch(url,{method:'HEAD',redirect:'follow',signal:AbortSignal.timeout(12000),headers:{'user-agent':'Mozilla/5.0 (local portfolio link review)'}});
  results.push({url,status:r.status,finalUrl:r.url,classification:r.ok?'RETRIEVABLE':[401,403,429].includes(r.status)?'ACCESS RESTRICTED':r.status===404?'NOT FOUND':'CHECK SOURCE ACCESS'});
 }catch(e){results.push({url,status:null,classification:'NETWORK ACCESS UNAVAILABLE',reason:e.message});}}
}));
const report={checkedAt:new Date().toISOString(),policy:'Retrievability measures discoverability. Missing public access does not downgrade owner-attested facts.',results:results.sort((a,b)=>a.url.localeCompare(b.url))};
await writeFile(new URL('archive/registers/link-audit.json',root),JSON.stringify(report,null,2)+'\n');
console.log(`${results.length} links checked: ${results.filter(r=>r.status>=200&&r.status<400).length} retrievable, ${results.filter(r=>r.status===404).length} not found; other results retained as access diagnostics.`);
