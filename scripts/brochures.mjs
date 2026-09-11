// Renders the practice brochure to PDF, one per language, into public/downloads/.
// Content comes from src/shared.mjs so the brochure and the site cannot drift.
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import {
  cases, contactEmail, esc, formats, method, origin, publishTestimonials, references, reviews, territories
} from '../src/shared.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'public', 'downloads');
const font = name => pathToFileURL(path.join(root, 'assets', 'fonts', name)).href;

const styles = `
@font-face{font-family:"Instrument Serif";src:url("${font('instrument-serif-latin-400-normal.ttf')}");font-weight:400;font-style:normal}
@font-face{font-family:"Instrument Serif";src:url("${font('instrument-serif-latin-400-italic.ttf')}");font-weight:400;font-style:italic}
@font-face{font-family:"DM Sans";src:url("${font('dm-sans-latin-variable-normal.ttf')}");font-weight:100 1000}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:"DM Sans",Arial,sans-serif;color:#1b252b;background:#f4f6f8;font-size:10.5pt;line-height:1.6}
.sheet{width:210mm;height:297mm;padding:20mm 18mm 16mm;background:#f4f6f8;position:relative;
 display:flex;flex-direction:column;page-break-after:always;overflow:hidden}
.sheet:last-child{page-break-after:auto}
h1,h2,h3{font-weight:400;letter-spacing:-.03em}
h1,h2{font-family:"Instrument Serif",Georgia,serif;line-height:1.03}
.rule{border:0;border-top:.5pt solid #cdd4d9;margin:0}
.top{display:flex;justify-content:space-between;align-items:flex-start;font-size:8.5pt;
 letter-spacing:.05em;font-weight:500;padding-bottom:5mm;border-bottom:.5pt solid #1b252b}
.top .kicker{color:#59666e;letter-spacing:.05em}
.wordmark b{display:block;font-weight:500}
.foot{margin-top:auto;padding-top:5mm;border-top:.5pt solid #cdd4d9;display:flex;
 justify-content:space-between;font-size:8pt;color:#59666e;letter-spacing:.02em}
.cover{justify-content:space-between}
.cover h1{font-size:46pt;letter-spacing:-.04em;max-width:15ch}
.cover h1 em{font-style:italic}
.cover .lede{font-size:13pt;line-height:1.45;max-width:44ch;margin-top:9mm;color:#1b252b}
.cover .signature{font-size:10pt;line-height:1.6}
.cover .signature strong{font-weight:500}
.states{display:flex;gap:4mm;align-items:center;margin:10mm 0 0}
.states i{display:block;width:13mm;height:13mm;border:.75pt solid #1b252b}
.states i:last-child{background:#3158df;border-color:#3158df}
h2.title{font-size:30pt;margin-bottom:4mm;max-width:20ch}
.standfirst{font-size:11.5pt;line-height:1.5;max-width:58ch;color:#1b252b;margin-bottom:8mm}
.body p{max-width:64ch}
.body p+p{margin-top:3.4mm}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:7mm 9mm;margin-top:6mm}
.item{border-top:.5pt solid #cdd4d9;padding-top:3.2mm}
.item h3{font-size:11.5pt;margin-bottom:1.6mm;font-weight:500;font-family:"DM Sans",Arial,sans-serif}
.item p{font-size:9.5pt;line-height:1.55;color:#59666e}
.movements{margin-top:7mm}
.movement{display:grid;grid-template-columns:11mm 42mm 1fr;gap:0 7mm;align-items:start;
 border-top:.5pt solid #cdd4d9;padding:4.5mm 0}
.movement .no{font-size:8.5pt;color:#59666e;padding-top:2mm}
.movement h3{font-family:"Instrument Serif",Georgia,serif;font-size:21pt;line-height:1.05}
.movement h3 small{display:block;font-family:"DM Sans",Arial,sans-serif;font-size:8.5pt;
 color:#59666e;letter-spacing:.03em;margin-top:1.5mm}
.movement p{font-size:9.5pt;line-height:1.6;color:#59666e;padding-top:1.5mm}
.movement.pick h3{color:#3158df}
.arc{font-size:9pt;color:#59666e;letter-spacing:.06em;margin-top:5mm}
.rows{margin-top:6mm}
.row{display:grid;grid-template-columns:52mm 1fr;gap:7mm;border-top:.5pt solid #cdd4d9;padding:3.6mm 0}
.row h3{font-size:11pt;font-weight:500;font-family:"DM Sans",Arial,sans-serif}
.row p{font-size:9.5pt;line-height:1.55;color:#59666e}
.row .note{font-size:8.5pt;color:#59666e;margin-top:1.2mm}
.quotes{margin-top:6mm;display:grid;gap:5mm}
blockquote{font-family:"Instrument Serif",Georgia,serif;font-size:14pt;line-height:1.2;
 letter-spacing:-.02em;border-top:.5pt solid #cdd4d9;padding-top:3.4mm;max-width:70ch}
figcaption{font-size:8pt;color:#59666e;margin-top:2.4mm;letter-spacing:.02em}
.callout{border:.75pt solid #1b252b;padding:7mm;margin-top:7mm}
.callout h3{font-family:"Instrument Serif",Georgia,serif;font-size:19pt;margin-bottom:2.5mm}
.callout p{font-size:10pt;max-width:62ch;line-height:1.55}
.contact{margin-top:7mm;border-top:.75pt solid #1b252b;padding-top:6mm}
.contact .mail{font-family:"Instrument Serif",Georgia,serif;font-size:26pt;letter-spacing:-.02em;color:#3158df}
.contact p{font-size:9.5pt;color:#59666e;margin-top:2.5mm;max-width:60ch}
.small{font-size:8.5pt;color:#59666e;line-height:1.6;max-width:74ch;margin-top:5mm}
`;

export function brochure(lang) {
  const fr = lang === 'fr';
  const t = (en, f) => (fr ? f : en);
  const i = fr ? 1 : 0;
  const chrome = (kicker, n) => ({
    top: `<div class="top"><span class="wordmark">QUANTUM<b>BRANDING</b></span><span class="kicker">${esc(kicker)}</span></div>`,
    foot: `<div class="foot"><span>Quantum Branding · Nizzar Ben Chekroune</span><span>thequantumbranding.com · ${n}</span></div>`
  });

  const p2 = chrome(t('The practice', 'La pratique'), '02');
  const p3 = chrome(t('The method', 'La méthode'), '03');
  const p4 = chrome(t('The proof', 'La preuve'), '04');
  const p5 = chrome(t('Getting started', 'Commencer'), '05');

  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>${styles}</style></head><body>

<section class="sheet cover">
  <div class="top"><span class="wordmark">QUANTUM<b>BRANDING</b></span><span class="kicker">${t('Independent practice', 'Pratique indépendante')}</span></div>
  <div>
    <h1>${t('Making got cheap.<br><em>Deciding didn’t.</em>', 'Créer coûte moins.<br><em>Bien décider reste rare.</em>')}</h1>
    <p class="lede">${t('For companies with something important to improve, launch, rethink or build.', 'Pour les entreprises qui ont quelque chose d’important à améliorer, lancer, repenser ou construire.')}</p>
    <div class="states"><i></i><i></i><i></i><i></i></div>
  </div>
  <div class="signature">
    <strong>Nizzar Ben Chekroune</strong><br>
    ${t('Founder, Quantum Branding', 'Fondateur, Quantum Branding')}<br>
    ${t('English &amp; French', 'Anglais et français')}<br>
    <a href="mailto:${contactEmail}" style="color:#3158df;text-decoration:none">${contactEmail}</a> · thequantumbranding.com
  </div>
</section>

<section class="sheet">
  ${p2.top}
  <div style="padding-top:9mm">
    <h2 class="title">${t('One practice.<br>A clear responsibility.', 'Une pratique.<br>Une responsabilité claire.')}</h2>
    <p class="standfirst">${t('I bring strategy, design and implementation into the same conversation. You work directly with me. I bring in specialists when the scope calls for them.', 'Je réunis stratégie, design et réalisation dans une même conversation. Vous travaillez directement avec moi. Je fais intervenir des spécialistes selon le périmètre.')}</p>
    <div class="body">
      <p>${t('A company rarely experiences its problem as a discipline. The offer may be hard to explain. The website may obstruct a sale. A new technology may change the work before anyone has agreed what it should improve.', 'Une entreprise vit rarement son problème comme une discipline. L’offre se raconte difficilement. Le site freine la vente. Une technologie change le travail avant même que l’on ait décidé ce qu’elle doit améliorer.')}</p>
      <p>${t('I start there. I work across brand, marketing, digital products and intelligent systems, with seventeen years of experience informing the connections I make. I also build AI products, which is why the question before the build matters more than ever: what is worth making, and why?', 'Je pars de là. Je travaille entre marque, marketing, produits digitaux et systèmes intelligents, avec dix-sept ans d’expérience pour nourrir les liens que je fais. Je construis aussi des produits d’IA : la question qui précède la fabrication compte donc plus que jamais — qu’est-ce qui mérite d’exister, et pourquoi ?')}</p>
    </div>
    <h3 style="font-size:9pt;letter-spacing:.06em;color:#59666e;margin-top:9mm;font-weight:500">${t('WHERE THE WORK TAKES SHAPE', 'LES TERRAINS DU TRAVAIL')}</h3>
    <div class="grid2">${territories.map(a => `<div class="item"><h3>${esc(t(a[0], a[1]))}</h3><p>${esc(t(a[2], a[3]))}</p></div>`).join('')}</div>
  </div>
  ${p2.foot}
</section>

<section class="sheet">
  ${p3.top}
  <div style="padding-top:9mm">
    <h2 class="title">The Collapse</h2>
    <p class="standfirst">${t('Before you commit, a brand exists in many plausible states. The premium one. The playful one. The technical one. Each could become a coherent business. Choosing gives the work its direction.', 'Avant de choisir, une marque existe dans plusieurs états possibles. Haut de gamme. Ludique. Technique. Chacun pourrait devenir cohérent. Le choix donne au travail sa direction.')}</p>
    <div class="movements">${method.map((m, n) => `<div class="movement${n === 1 ? ' pick' : ''}"><span class="no">0${n + 1}</span><h3>${m.name}${fr ? `<small>${esc(m.fr).toUpperCase()}</small>` : ''}</h3><p>${esc(fr ? m.bodyFr : m.en)}</p></div>`).join('')}</div>
    <p class="arc">OBSERVE → COLLAPSE → BUILD → HOLD</p>
    <div class="callout">
      <h3>${t('A decision leaves a record.', 'Un choix laisse une trace.')}</h3>
      <p>${t('For each engagement I make the chosen direction, its evidence, its trade-offs and its review conditions explicit. Return to Observe when reality changes the premises. Holding a direction includes knowing when to reopen it.', 'Pour chaque mission, j’explicite la direction choisie, les éléments qui l’appuient, les compromis et les conditions de révision. Revenir à Observe quand le réel change les prémisses. Tenir une direction, c’est aussi savoir quand la rouvrir.')}</p>
    </div>
  </div>
  ${p3.foot}
</section>

<section class="sheet">
  ${p4.top}
  <div style="padding-top:9mm">
    <h2 class="title">${t('Decisions leave traces.', 'Les choix laissent des traces.')}</h2>
    <p class="standfirst">${t('The scope, the decisions and the work they produce.', 'Le périmètre, les décisions et le travail qui en découle.')}</p>
    <div class="rows">${cases.map(c => `<div class="row"><div><h3>${esc(c.name)}</h3><p class="note">${esc(c.type[i])}</p></div><div><p>${esc((c.meta||c.summary)[i])}</p><p class="note">${esc(c.fact[i])}</p></div></div>`).join('')}</div>
    <h3 style="font-size:9pt;letter-spacing:.06em;color:#59666e;margin-top:9mm;font-weight:500">${t('BEFORE THIS PRACTICE', 'AVANT CETTE PRATIQUE')}</h3>
    <p class="small" style="margin-top:2mm">${t('Work I did before this practice existed.', 'Des travaux réalisés avant l’existence de cette pratique.')}</p>
    <div class="rows">${references.map(r => `<div class="row"><h3>${esc(r[0])}</h3><p>${esc(t(r[1], r[2]))}</p></div>`).join('')}</div>
    ${publishTestimonials ? `<div class="quotes">${reviews.slice(0, 2).map(r => `<figure><blockquote>“${esc(fr ? r.fr : r.en)}”</blockquote><figcaption>${esc(r.attribution[i])}</figcaption></figure>`).join('')}</div>` : ''}
  </div>
  ${p4.foot}
</section>

<section class="sheet">
  ${p5.top}
  <div style="padding-top:9mm">
    <h2 class="title">${t('What needs<br>to change?', 'Que faut-il<br>changer ?')}</h2>
    <p class="standfirst">${t('A clear project or a question worth investigating. I can meet you at either starting point.', 'Un projet défini ou une question à explorer. Je peux vous rejoindre à chacun de ces points de départ.')}</p>
    <div class="rows">${formats.map(f => `<div class="row"><h3>${esc(t(f[0], f[1]))}</h3><p>${esc(t(f[2], f[3]))}</p></div>`).join('')}</div>
    <div class="callout">
      <h3>${t('Scope and price are defined after we talk.', 'Le périmètre et le prix sont définis après un échange.')}</h3>
      <p>${t('Every engagement is scoped around the work it requires. Tell me what needs to change and we will define the right starting point together.', 'Chaque mission se définit autour du travail à mener. Dites-moi ce qui doit changer et nous définirons ensemble le bon point de départ.')}</p>
    </div>
    <div class="contact">
      <a class="mail" href="mailto:${contactEmail}" style="text-decoration:none">${contactEmail}</a>
      <p>${t('Write to me directly. Or prepare a starting brief first:', 'Écrivez-moi directement. Ou préparez d’abord un point de départ :')} ${origin}${fr ? '/fr' : ''}/lab/the-brief-before-the-brief</p>
    </div>
    <p class="small">${t('Quantum Branding is the independent practice of Nizzar Ben Chekroune. Quantum Lab is its research layer. BrandOS by Quantum Branding is the product, at quantumbranding.ai. Sources, attribution and privacy notes:', 'Quantum Branding est la pratique indépendante de Nizzar Ben Chekroune. Quantum Lab en est la couche de recherche. BrandOS by Quantum Branding est le produit, sur quantumbranding.ai. Sources, attribution et confidentialité :')} ${origin}${fr ? '/fr' : ''}/notes</p>
  </div>
  ${p5.foot}
</section>

</body></html>`;
}

export async function render() {
  await mkdir(out, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const lang of ['en', 'fr']) {
      const page = await browser.newPage();
      await page.setContent(brochure(lang), { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
      await writeFile(path.join(out, `quantum-branding-brochure-${lang}.pdf`), pdf);
      await page.close();
    }
    console.log('Rendered 2 brochures \u2192 public/downloads/');
  } finally {
    await browser.close();
  }
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) await render();
