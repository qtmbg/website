import projection from './evidence.json' with { type: 'json' };
import {canPublishEvidence} from './evidence-policy.mjs';
import {esc} from './shared.mjs';
export const commercialProof = projection.items;
export function proof(ids, lang='en', placement) {
 const fr=lang==='fr';
 return `<div class="quote-grid">${commercialProof.filter(r=>ids.includes(r.id)&&canPublishEvidence(r,'thequantumbranding.com',placement)).map(r=>`<figure data-evidence="${esc(r.id)}"><p class="field-hint">${fr?'Extrait · citation originale':'Excerpt · original wording'}</p><blockquote lang="${esc(r.original_language)}">“${esc(r.approved_excerpt[0])}”</blockquote><figcaption>${esc(r.author_name)}<br>${esc(r.author_role_observed)}<br><span class="field-hint">${fr?'Présentation du profil au 11 octobre 2026':'Profile headline observed 11 October 2026'} · ${esc(r.date)}</span><br>${esc(fr?r.context_fr:r.context_en)}<br><a href="${esc(r.source_url)}" target="_blank" rel="noopener noreferrer">${fr?'LinkedIn · section des recommandations ↗':'LinkedIn · recommendations section ↗'}</a><br><span class="field-hint">${fr?'Lien vers la section ; connexion parfois nécessaire.':'Section link; sign-in may be required.'}</span></figcaption></figure>`).join('')}</div>`;
}
