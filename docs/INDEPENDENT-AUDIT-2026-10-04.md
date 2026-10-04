# Independent Quantum Branding homepage audit

## Repository and deployment evidence

- Actual repository: https://github.com/qtmbg/website, origin main at 23b06348aa576c1b450e12d83d37cd8fa8b11cd1. The expected qtmbg/quantum-branding repository could not be resolved.
- Production Vercel project: website, prj_gxgIltcMr3ctPPAq6LvDtWs7vS6f. The GitHub Production deployment records identify this commit. Production custom domains remain unchanged by this pass.
- Supplied preview: quantum-branding-preview, prj_WvGOtijHNFO4G7Lu67uzNy0p4s4H. Vercel reports link=null and gitSource=null. It is an independently uploaded static presentation, not the repository's current main deployment.
- Captured preview initially used the older thesis-led homepage. Its English method page and both practice PDF links returned 404. The preview also carried older biography, career, and founding-date copy.
- AI Value Mapping task was inactive. Its separate checkout is on feat/ai-value-mapping with uncommitted changes to shared files and new funnel files. This pass uses a fresh clone, leaves that checkout untouched, and does not add /ai-value-mapping or change offer formats. Both deployed sites returned 404 for that unfinished route.

## Findings

Production's block order already solves the main hierarchy problem: business definition, territories, real work, thesis, client method, Nizzar and personal method, Lab, thinking, contact. Its headline, six canonical territories, case bodies, first-person voice, and conversion fork should stay.

The preview regressed that order. Its first screen required visitors to infer what the practice was from a thesis and multiple method shortcuts. It lacked the homepage territories, personal-method relationship, and Lab explanation. A blanket diagnosis that both sites needed the same hierarchy rebuild would therefore be wrong.

Production still left execution implicit in “make it real,” repeated five abbreviated disciplines immediately before the full six territories, gave the territories large numeral treatments, and offered problem descriptions without the resulting work in its case introductions. The founder paragraph described connecting patterns more readily than entering the company's reality. The Lab's “Idea in, brand out” line conveyed output more strongly than the practice/product/judgment distinction. “More than two decades” contradicted the documented professional start in 2008.

## Exact homepage copy changes, English

Hero line removed:
> Brand · Marketing & Sales · Digital · AI · Business

Hero line introduced:
> From strategic diagnosis and decision through implementation.

The hero eyebrow, headline, founder/value paragraph and both action labels remain unchanged in the repository. The preview now uses these same lines, including:
> Quantum Branding · An independent strategy practice
>
> Strategy across Brand × AI × Business.
>
> Quantum Branding is the independent practice of Nizzar Ben Chekroune. I help companies see what is true, decide what matters and make it real.
>
> Start a project
>
> See the work

Selvaggi introduction added:
> Named the occupied-site expertise, rebuilt the website and put brand rules into the team’s tools.

Verne Jewels introduction added:
> Replaced a weekly content rhythm with a monthly production system, then handed it over.

These summarize the founder-supplied cases and their confirmed handover status. No outcomes or figures were invented. The complete case bodies remain unchanged.

Reference caption removed:
> More than two decades across brand, marketing and emerging technology.

Reference caption introduced:
> Selected references from my career, beginning in 2008.

Behind the practice paragraph replaced:
> I’m Nizzar Ben Chekroune, a brand strategist and the founder of Quantum Branding. I connect patterns across brand, business and technology, choose a direction with you, then build what the decision requires. You work directly with me.

With:
> I’m Nizzar Ben Chekroune, a brand strategist and the founder of Quantum Branding. I enter the reality of a company or project to understand what is there, what is emerging and where the real problem lies. Then I choose a direction with you and build what it requires. You work directly with me.

Lab paragraph replaced:
> I also build instruments, in Quantum Lab. BrandOS is the main one: a brand intelligence product. Idea in, brand out.

With:
> BrandOS grew out of the practice, in Quantum Lab. It is a brand intelligence product that helps organize the first reading of a company. It surfaces the patterns. I decide what matters.

The last two sentences already existed on /practice and remain there verbatim. Existing Lab product copy on /lab is retained.

Homepage metadata description introduced:
> Quantum Branding is Nizzar Ben Chekroune’s independent strategy practice across Brand × AI × Business, from diagnosis and decision through implementation.

## Exact homepage copy changes, French

Hero line removed:
> Marque · Marketing & Ventes · Digital · IA · Business

Hero line introduced:
> Du diagnostic stratégique et de la décision à la réalisation.

Selvaggi introduction added:
> L’expertise en site occupé a été nommée, le site reconstruit et les règles de marque intégrées aux outils de l’équipe.

Verne Jewels introduction added:
> Le rythme hebdomadaire a laissé place à un système de production mensuel, puis à une passation.

Reference caption removed:
> Plus de vingt ans entre marque, marketing et technologies émergentes.

Reference caption introduced:
> Quelques références de mon parcours, commencé en 2008.

Behind the practice paragraph replaced:
> Je suis Nizzar Ben Chekroune, stratège de marque et fondateur de Quantum Branding. Je relie les schémas entre marque, business et technologie, choisis une direction avec vous, puis construis ce qu’elle exige. Vous travaillez directement avec moi.

With:
> Je suis Nizzar Ben Chekroune, stratège de marque et fondateur de Quantum Branding. J’entre dans la réalité d’une entreprise ou d’un projet pour comprendre ce qui existe, ce qui émerge et où se situe le vrai problème. Puis je choisis une direction avec vous et construis ce qu’elle exige. Vous travaillez directement avec moi.

Lab paragraph replaced:
> Je construis aussi des instruments, dans Quantum Lab. BrandOS est le principal : un produit d’intelligence de marque. Une idée entre, une marque prend forme.

With:
> BrandOS est né de la pratique, au sein de Quantum Lab. Ce produit d’intelligence de marque aide à structurer la première lecture d’une entreprise. Il fait apparaître les schémas. Je décide de ce qui compte.

Homepage metadata description introduced:
> Quantum Branding est la pratique indépendante de stratégie de Nizzar Ben Chekroune. Brand × AI × Business, du diagnostic et de la décision à la réalisation.

## Layout and preview alignment

Repository: retain the current order. Give the six territories a concise introduction with existing headings and descriptions, without large decorative numerals. /practice retains its full territory treatment. Add source-supported proof sentences; keep both complete cases and all references.

Preview before: thesis hero and method widgets → method caption → judgment/thesis window → proof → references → method → thinking → contact.

Preview after: practice hero → six territories → proof/references → thesis → client method → Nizzar/Perceptual Composition → BrandOS/Lab → thinking → contact.

The preview's existing folders, dock, typography, colors, document windows and proof notes stay. Method/reading widgets move to their corresponding later sections; the method folder shortcut becomes Practice. Phone visitors proceed directly from the hero to the territories; duplicate decorative desktop shortcuts no longer delay comprehension. A narrow-dock spacing correction avoids overflow at 320px. Moved reading controls receive accessible labels.

“Making got cheap. Deciding didn’t.” stays as the thesis. The preview's old “Judgment, then execution” window becomes the thesis window; the founder receives the separate Behind the practice block. The redundant method notification and “See how engagements start” section are removed. Observe/Collapse/Build/Hold and the full method remain. Preview interior biography and identity metadata are aligned with the already-published repository source, including the canonical personal-method link and established 2024 founding date.

## Ecosystem boundaries

Nizzar is the strategist/founder and person whose judgment directs the work. Perceptual Composition is the personal method, lightly explained and linked to nizzar.com/perceptual-composition. Quantum Branding is the commercial strategy practice. The Collapse is its client engagement method. BrandOS is a product born from the practice; it surfaces patterns while human judgment decides what matters. SIGNAL is the separate publication and remains outside this homepage's commercial/method architecture; Signal Scan remains a distinct BrandOS instrument. AI Value Mapping remains the unfinished commercial entry funnel in its separate branch.

## Verification

Repository: build and all 35 tests; 52 browser route loads with menu/language/brief/download checks; 168 responsive measurements; motion and JS-off checks; 84 restoration boundary checks. A new authorized editorial fixture preserves the previous fixtures. Comparing the previous and new fingerprints changes only / and /fr. The location test's pre-existing “working across” false positive is removed; its geographical protections remain.

Preview: 168 responsive measurements; 52 browser route loads; additional 18 homepage layouts at 320–1920px; all 45 internal page/resource paths and external personal-method/BrandOS links. All four original English/French preview case bodies and both original contact forks are unchanged. No new metrics, testimonials, logos or client claims.

The final first screen identifies the practice, Nizzar, Brand × AI × Business and execution, with a visible action. The next section answers what can be hired; the case introductions and full cases connect diagnosis to decisions and built work. The personal-method and product explanations follow that commercial comprehension.
