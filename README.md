# Quantum Branding — The Quantum Box

Original interactive website for Nizzar Ben Chekroune’s independent practice. The Trevor Noah reference informs experiential ambition and connected worlds, not copied assets, colors, typography or layout.

## Run

Requires Node.js 22+. Serving the site and running unit tests require no package installation or framework. Browser tests use the locked Playwright development dependency and an installed Google Chrome browser.

```sh
cd /Users/drazicq/quantum-branding-website
npm start
```

Open http://localhost:3000. Use `PORT=3001 npm start` for another port. `npm run dev` watches the development server; refresh the browser after frontend edits.

```sh
npm test
```

For browser verification, keep the preview running at http://localhost:3000, then run:

```sh
npm ci
npm run test:browser
```

The browser suite checks EN/FR layouts at 375, 390, 540, 541, 768, 1024, 1440 and 1920px, tool dialogs, keyboard focus, brief export and preview access controls. Screenshots are written to `/Users/drazicq/quantum-branding-website/test-results/`. It currently runs in Google Chrome only; it is not a cross-browser accessibility audit. Both browser and visual suites accept `BASE_URL` for a local preview on another port.

## Included

- Original SVG box with animated lid, pointer-responsive perspective and six illustrated instruments.
- Tool detail dialogs and corresponding accessible territory accordions.
- Editorial client-context covers, clearly distinguished from approved client creative.
- Separate Lab with a working, local-only brief builder, text download, clipboard copy and editable answers.
- EN/FR translation for main content, territories, dialogs and form flow. Language preference is saved locally.
- Responsive layouts, native modal focus containment, keyboard controls, escape-to-close and reduced-motion support.
- Optional starting formats subordinate to direct projects.
- No runtime JS dependencies, no analytics and no simulated submissions.

## Before public launch

1. Contact uses `me@qtmbg.com`, the operational brand-work address published at https://nizzar.com/contact (checked 9 September 2026). Direct email is available without filling a brief, including without JavaScript. Reviewed briefs can open an email draft; this is not backend delivery and does not confirm receipt. Keep `siteConfig.contactEmail` and the static address in `/Users/drazicq/quantum-branding-website/index.html` synchronized if it changes.
2. Approve the Selvaggi and Verne scopes, exact deliverables, dates/status and any documented outcomes. Current panels deliberately expose evidence limitations; they are not finished public case studies.
3. Replace editorial client covers with approved real project imagery. Supply an approved Nizzar portrait if a photographic founder treatment is desired; the current poster avoids a fake likeness.
4. Quantum Branding AI links to https://quantumbranding.ai, whose public landing page and Signal Scan entry were checked on 9 September 2026. “Live” describes public availability, not an audit of every product tool or paid workflow.
5. Review French copy, structured-format prices and legal business details. Add the appropriate legal disclosures for the business and deployment jurisdiction.
6. Google Fonts supplies DM Sans and Instrument Serif. Self-host licensed font files if third-party font requests should be removed. The site has system-font fallbacks.
7. The included Node server is a local development preview, bound to localhost. Deploy the four public assets (`index.html`, `styles.css`, `app.js`, `favicon.svg`) on a static hosting provider, or harden a production server separately. Internal project/test files are not served by the preview server.

The brief tool is deterministic: it formats the visitor’s own words. It is not an AI assessment or automated business diagnosis. Data remains in browser memory unless explicitly copied, downloaded or passed to an email client.

## September 2026 design continuation

The production source is GitHub `qtmbg/website`, deployed through Vercel project `website`. The current local Git checkout is `/Users/drazicq/quantum-branding-website`; the earlier Cline folder is a source mirror, not a Git checkout. No framework or runtime dependency was introduced.

- Centered Quantum Box stage, bespoke stamp / drafting tools / patchboard illustrations, and a working lid closure.
- Interactive Understand → Decide → Make → Verify workbench with the same box, four explicit states and contextual next steps. Arrow keys, Home and End navigate the tabs; changing language preserves the selected step.
- Staggered client dossiers and an open Lab layout. Existing evidence limitations remain explicit; no client outcomes or live product availability were invented.
- Cool white / cobalt art direction; revised mobile and French type, spacing and line breaks; visible mobile contact entry.
- EN/FR localization extends to the process, ticker, Lab paper, founder statement and footer. OS reduced-motion changes are respected during the visit.

The browser test now covers all four method states, keyboard behavior, case panels, formats and live reduced-motion changes in addition to the original regression suite.

```sh
npm test
npm run test:browser
npm run test:visual
```

The visual suite saves section captures for EN/FR at 375, 390, 768, 1024, 1440 and 1920px in `test-results/visual/`, alongside a geometry report. Captures supplement human inspection; they do not certify art direction or cross-browser accessibility.

## Editorial provenance — 9 September 2026

- Founder proof: [Meet the Judges of the Global Design Graduate Show](https://artsandculture.google.com/story/meet-the-judges-of-the-global-design-graduate-show-global-design-graduate-show/IAUxkXdAFpJIsA?hl=en), published by Global Creative Graduate Showcase on Google Arts & Culture. Names Nizzar Ben Chekroune (Nception NFT) in Digital, Visual Communication and Film. Describes the show as launched by Arts Thread with Gucci in 2020. The site makes no ranking, Google endorsement, or Gucci client claim.
- Selected UNIDO, Audi and Diptyk career scopes now appear as explicitly attributed published-portfolio history, not independently verified case studies. Three public Fiverr review excerpts support understanding, execution and judgment/partnership. Fresh Fiverr retrieval returned 403; the supplied verbatim corpus is the source. See `/Users/drazicq/quantum-branding-website/EVIDENCE.md` for exact attribution and limits. NYT rankings and impact metrics are not published.
- Selvaggi and Verne panels remain unchanged. No deliverables, engagement dates or outcomes were invented.
- The existing founder poster and client-cover areas remain intact for approved real assets. No blank public placeholders were added.
- Lab provenance is stated in the existing card and dialog. A subordinate research index distinguishes Founder Toolbox (product in development), Signal Scan and Perception Compass (instruments), and The Mirror (experiment). No instrument was added to Capabilities or credited to client work without documentation. No new page or visual redesign was introduced.

## Proof / R&D continuation validation — 9 September 2026

- `node --check app.js` and `git diff --check`: passed.
- `npm test`: 9/9 passed, including exact review excerpts, attribution, complete French keys, section anchors and unchanged capability boundaries.
- `BASE_URL=http://localhost:3017 npm run test:browser`: passed in Chrome at 375, 390, 540, 541, 768, 1024, 1440 and 1920px, EN/FR. Includes original-review disclosures, Lab status/link checks, no-JS proof/contact/product content and existing interactions.
- `BASE_URL=http://localhost:3017 npm run test:visual`: passed all 12 EN/FR viewport combinations; 96 section screenshots; no geometry violations. Eight Work/Lab/Founder screenshots were also visually inspected across EN/FR, 390px and 1440px.
- Logs: `/tmp/qb-browser-proof.log`, `/tmp/qb-visual-proof.log`; both exit markers record `0`. Both test processes exited. Screenshots and geometry report remain under `/Users/drazicq/quantum-branding-website/test-results/visual/` (Git-ignored).
- No commit, push or deployment performed. This validation does not certify external review availability, mailbox delivery, product workflows, legal readiness or every browser.

## Local design takeover — 9 September 2026

The takeover inherited `main` at `c582af1`, with existing unstaged editorial, localization and test changes plus untracked `EVIDENCE.md`. Those changes were retained. The working tree showed an established cool-white, cobalt and acid palette, DM Sans / Instrument Serif typography, a centered Quantum Box, staggered client dossiers and an open dark Lab. The newly added proof and research sections were functional but visually less developed than those established sections; there was no evidence of a separate unfinished visual direction.

This continuation gives career history numbered dossier rows, establishes a lead client quotation with two supporting quotations, and differentiates the research product from instruments and experiments through typography and spacing. The founder poster now aligns with the biography on desktop, its small caption has the correct typography, and mobile spacing keeps the rotated poster clear of the biography label. The direct email address is more prominent and is included in the existing mail link. All approved copy, quotations, attributions, statuses, six territories and interactive behavior are preserved. `app.js` is byte-identical to the inherited working copy; the established stylesheet after the introductory editorial block is unchanged.

Files changed by this takeover: `styles.css`, `index.html`, and this `README.md`. No dependencies, tests, evidence records or server files were changed during the takeover.

Baseline and final checks both passed: 9 unit tests; Chrome functional checks in EN/FR at 375, 390, 540, 541, 768, 1024, 1440 and 1920px; 12 visual language/viewport combinations producing 96 section captures with an empty geometry-violation report. Manual inspection covered Work, Lab, Founder and Contact across mobile, tablet and desktop, including the corrected French mobile poster spacing. The preview browser console had no warnings or errors. `node --check app.js` and `git diff --check` passed. An initial unprivileged Chrome attempt could not launch in the sandbox; the completed browser runs used the permitted execution environment.

```sh
npm test
BASE_URL=http://localhost:3017 npm run test:browser
BASE_URL=http://localhost:3017 npm run test:visual
```

Review at http://localhost:3017/. The existing local server remains running. No commit, push or deployment was performed. No unresolved regression was found in the tested Chrome scope. The pre-existing launch dependencies above remain: approved client evidence and imagery, business/legal details, and verification of external services and mailbox delivery. These were not part of this local visual continuation.
