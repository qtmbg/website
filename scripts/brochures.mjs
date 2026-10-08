// Renders the practice brochure to PDF, one per language, into public/downloads/.
// Content comes from src/shared.mjs so the brochure and the site cannot drift.
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import {
  cases, contactEmail, esc, formats, method, origin, publishTestimonials, references, reviews, territories
} from '../src/shared.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'public', 'downloads');

// Bricolage Grotesque travels inside the document as data: a page made with
// setContent may not load file:// resources, and the fallback would be used
// silently (which is what happened to the earlier editions).
const bricolage = `data:font/woff2;base64,${readFileSync(path.join(root, 'assets', 'fonts', 'bricolage-grotesque-latin-variable.woff2')).toString('base64')}`;

// The desktop direction of 4 October 2026, set for A4: Bricolage Grotesque,
// the canonical palette, folder notes and app tiles from the site.
const styles = `
@font-face{font-family:"Bricolage Grotesque";src:url("${bricolage}") format("woff2");font-weight:200 800}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:"Bricolage Grotesque",Arial,sans-serif;color:#1b252b;background:#f4f6f8;font-size:9.6pt;line-height:1.6}
.sheet{width:210mm;height:297mm;padding:18mm 18mm 15mm;background:#fff;position:relative;
 display:flex;flex-direction:column;page-break-after:always;overflow:hidden}
.sheet:last-child{page-break-after:auto}
h1,h2,h3{font-weight:800;letter-spacing:-.025em}
h1,h2{line-height:1.06}
.rule{border:0;border-top:.5pt solid #cdd4d9;margin:0}
.top{display:flex;justify-content:space-between;align-items:center;margin:-18mm -18mm 0;padding:0 18mm;height:10mm;
 font-size:7.6pt;font-weight:500;color:rgb(27 37 43/.55);background:#f4f6f8;border-bottom:.5pt solid rgb(27 37 43/.1)}
.top .wordmark{display:flex;gap:4mm;font-weight:600;color:rgb(27 37 43/.75)}
.top .wordmark b{font-weight:500;color:rgb(27 37 43/.4)}
.top .kicker{color:rgb(27 37 43/.55)}
.foot{margin-top:auto;padding-top:4mm;border-top:.5pt solid #cdd4d9;display:flex;
 justify-content:space-between;font-size:7.6pt;color:#59666e}
.cover{justify-content:space-between;background:#f4f6f8}
.cover .top{background:#fff}
.cover h1{font-size:40pt;max-width:14ch}
.cover h1 em{font-style:normal;color:#3158df}
.cover .lede{font-size:12.5pt;line-height:1.5;max-width:40ch;margin-top:8mm;color:#59666e}
.cover .signature{font-size:9.6pt;line-height:1.6;color:#59666e}
.cover .signature strong{font-weight:700;color:#1b252b}
.states{display:flex;gap:3mm;align-items:center;margin:10mm 0 0;padding:2.6mm 3.2mm;width:max-content;border-radius:4mm;
 background:rgb(255 255 255/.7);box-shadow:0 2mm 6mm rgb(27 37 43/.12)}
.states i{display:block;width:10mm;height:10mm;border-radius:24%;background:#fff;box-shadow:0 .4mm 1.2mm rgb(27 37 43/.25)}
.states i:nth-child(1){background:#3158df}.states i:nth-child(2){background:#1b252b}
.states i:nth-child(3){background:#e8fa64}.states i:nth-child(4){background:#22363e}
h2.title{font-size:27pt;margin-bottom:4mm;max-width:20ch}
.standfirst{font-size:11pt;line-height:1.5;max-width:58ch;color:#59666e;margin-bottom:7mm}
.body p{max-width:64ch}
.body p+p{margin-top:3.2mm}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:6mm 8mm;margin-top:5mm}
.item{border-top:.5pt solid #cdd4d9;padding-top:3mm}
.item h3{font-size:10.5pt;font-weight:700;letter-spacing:0;margin-bottom:1.4mm}
.item p{font-size:9pt;line-height:1.55;color:#59666e}
.movements{margin-top:6mm}
.movement{display:grid;grid-template-columns:10mm 40mm 1fr;gap:0 6mm;align-items:start;
 border-top:.5pt solid #cdd4d9;padding:4mm 0}
.movement .no{font-size:7.6pt;font-weight:600;letter-spacing:.15em;color:#59666e;padding-top:1.6mm}
.movement h3{font-size:16pt;line-height:1.1}
.movement h3 small{display:block;font-size:7.6pt;font-weight:600;color:#59666e;letter-spacing:.12em;margin-top:1.4mm}
.movement p{font-size:9pt;line-height:1.6;color:#59666e;padding-top:1mm}
.movement.pick h3{color:#3158df}
.arc{font-size:7.6pt;font-weight:600;color:#59666e;letter-spacing:.15em;margin-top:4mm}
.rows{margin-top:5mm}
.row{display:grid;grid-template-columns:50mm 1fr;gap:6mm;border-top:.5pt solid #cdd4d9;padding:3.2mm 0}
.row h3{font-size:10.5pt;font-weight:700;letter-spacing:0}
.row p{font-size:9pt;line-height:1.55;color:#59666e}
.row .note{font-size:7.8pt;color:#59666e;margin-top:1mm}
.quotes{margin-top:5mm;display:grid;grid-template-columns:1fr 1fr;gap:5mm;align-items:start}
.quotes figure{padding:4.4mm;background:#e8fa64;box-shadow:0 2.4mm 4mm -1.6mm rgb(27 37 43/.3)}
.quotes figure:nth-child(1){transform:rotate(-1deg)}.quotes figure:nth-child(2){transform:rotate(.8deg)}
blockquote{font-size:9.6pt;line-height:1.45;font-weight:600;letter-spacing:0}
figcaption{font-size:7.6pt;font-weight:600;color:rgb(27 37 43/.7);margin-top:2.4mm}
.callout{margin-top:6mm;border-radius:2.4mm;overflow:hidden;box-shadow:0 0 0 .6pt rgb(27 37 43/.15),0 2.4mm 6mm rgb(27 37 43/.08)}
.callout::before{content:"";display:block;height:5.4mm;background:#f4f6f8;border-bottom:.5pt solid rgb(27 37 43/.1);
 background-image:radial-gradient(circle at 4.6mm 50%,#cdd4d9 1mm,transparent 1.1mm),radial-gradient(circle at 8.4mm 50%,#cdd4d9 1mm,transparent 1.1mm),radial-gradient(circle at 12.2mm 50%,#cdd4d9 1mm,transparent 1.1mm)}
.callout h3{font-size:14pt;margin:5mm 6mm 2mm}
.callout p{font-size:9.4pt;max-width:62ch;line-height:1.55;margin:0 6mm 5mm;color:#59666e}
.contact{margin-top:6mm;border-top:.75pt solid #1b252b;padding-top:5mm}
.contact .mail{font-size:22pt;font-weight:800;letter-spacing:-.025em;color:#3158df}
.contact p{font-size:9pt;color:#59666e;margin-top:2.4mm;max-width:60ch}
.small{font-size:7.8pt;color:#59666e;line-height:1.6;max-width:74ch;margin-top:4mm}
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
    <h1>${t('See what is true.<br>Decide what matters.<br><em>Make it real.</em>', 'Voir ce qui est vrai.<br>Décider de ce qui compte.<br><em>Le concrétiser.</em>')}</h1>
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
      <p>${t('I start there. Experience since 2006 across institutions, company building and independent consulting has developed the judgment behind this practice. Hundreds of varied client situations taught me to listen, identify the relevant decision and organise delivery. Quantum Branding developed from late 2023 and was formally established in 2024. Today I connect brand, business and AI with the tools and specialists each mandate requires.', 'Je pars de là. Une expérience depuis 2006 entre missions institutionnelles, entrepreneuriat et conseil indépendant a développé le discernement qui nourrit cette pratique. Des centaines de situations clients m’ont appris à écouter, à trouver la décision utile et à organiser la réalisation. L’activité devenue Quantum Branding a commencé fin 2023 ; la pratique a été formellement établie en 2024. Aujourd’hui, je relie marque, business et IA avec les outils et les spécialistes adaptés à chaque mission.')}</p>
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
    <p class="standfirst">${t('Before you commit, your company is several plausible companies at once. The premium one. The playful one. The technical one. At 2am they all look right. The collapse is choosing one and holding it. The one that survives your market, your competitors and your own attention.', 'Avant de vous engager, votre entreprise est plusieurs entreprises plausibles à la fois. La haut de gamme. La ludique. La technique. À deux heures du matin, elles semblent toutes justes. Le collapse consiste à en choisir une et à la tenir. Celle qui résiste à votre marché, à vos concurrents et à votre propre attention.')}</p>
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
    <div class="rows">${formats.map(f => `<div class="row"><h3>${esc(t(f[0], f[1]))}</h3><div><p>${esc(t(f[2], f[3]))}</p><p>${esc(t(f[4], f[5]))}</p></div></div>`).join('')}</div>
    <div class="callout">
      <h3>${t('Scope and price are defined after we talk.', 'Le périmètre et le prix sont définis après un échange.')}</h3>
      <p>${t('Tell me what needs to change. We will define the scope together.', 'Dites-moi ce qui doit changer. Nous définirons le périmètre ensemble.')}</p>
    </div>
    <div class="contact">
      <a class="mail" href="mailto:${contactEmail}" style="text-decoration:none">${contactEmail}</a>
      <p>${t('Write to me directly. Or prepare a starting brief first:', 'Écrivez-moi directement. Ou préparez d’abord un point de départ :')} ${origin}${fr ? '/fr' : ''}/lab/the-brief-before-the-brief</p>
    </div>
    <p class="small">${t('Quantum Branding: Nizzar Ben Chekroune’s independent practice. Quantum Lab: research. BrandOS by Quantum Branding: the product at quantumbranding.ai. Sources, attribution and privacy:', 'Quantum Branding : la pratique indépendante de Nizzar Ben Chekroune. Quantum Lab : la recherche. BrandOS by Quantum Branding : le produit sur quantumbranding.ai. Sources, attribution et confidentialité :')} ${origin}${fr ? '/fr' : ''}/notes</p>
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
