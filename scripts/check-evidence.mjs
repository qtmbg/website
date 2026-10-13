import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
const digest=raw=>createHash('sha256').update(raw).digest('hex');
export function checkEvidence(projectionPath,lockPath,canonicalPath=process.env.EVIDENCE_REGISTRY) {
 const raw=readFileSync(projectionPath);
 const projection=JSON.parse(raw),lock=JSON.parse(readFileSync(lockPath));
 if(digest(raw)!==lock.projection_sha256 || projection.registry_sha256!==lock.registry_sha256)throw new Error('Evidence projection changed without canonical regeneration');
 if(canonicalPath && digest(readFileSync(canonicalPath))!==lock.registry_sha256)throw new Error('Canonical registry changed; regenerate both public projections');
 for(const r of projection.items) {
  const original=r.full_original_text, excerpts=r.excerpts;
  if(original && excerpts && !excerpts.every(q=>original.includes(q)))throw new Error('Nonliteral evidence excerpt: '+r.id);
 }
}
if(process.argv[1]===new URL(import.meta.url).pathname) {
 checkEvidence(resolve('src/evidence.json'),resolve('evidence-lock.json'));
 console.log('Evidence projection fingerprint verified');
}
