import projection from './evidence.json' with { type: 'json' };
import {canPublishEvidence} from './evidence-policy.mjs';
import {esc} from './shared.mjs';
export const commercialProof = projection.items;
export function proof(ids, lang='en', placement) {
 const fr=lang==='fr';
 return `<div class="quote-grid">${commercialProof.filter(r=>ids.includes(r.id)&&canPublishEvidence(r,'thequantumbranding.com',placement)).map(r=>`<figure data-evidence="${esc(r.id)}"><blockquote lang="${esc(r.original_language)}">“${esc(r.approved_excerpt[0])}”</blockquote><figcaption>${esc(r.author_name)}<br>${esc(r.author_role_observed)}<br><a href="${esc(r.source_url)}" target="_blank" rel="noopener noreferrer">${fr?'LinkedIn · section des recommandations ↗':'LinkedIn · recommendations section ↗'}</a></figcaption></figure>`).join('')}</div>`;
}
