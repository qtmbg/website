# Quantum Branding — The Quantum Box

Original interactive website for Nizzar Ben Chekroune’s independent practice. The Trevor Noah reference informs experiential ambition and connected worlds, not copied assets, colors, typography or layout.

## Run

Requires Node.js 22+. Serving the site and running unit tests require no package installation or framework. Browser tests use the locked Playwright development dependency and an installed Google Chrome browser.

```sh
cd /Users/drazicq/.cline/data/workspaces/chat/quantum-branding
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

The browser suite checks EN/FR layouts at 375, 390, 540, 541, 768, 1024, 1440 and 1920px, tool dialogs, keyboard focus, brief export and preview access controls. Screenshots are written to `/Users/drazicq/.cline/data/workspaces/chat/quantum-branding/test-results/`. It currently runs in Google Chrome only; it is not a cross-browser accessibility audit.

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

1. Set the real, approved recipient in `siteConfig.contactEmail` in `/Users/drazicq/.cline/data/workspaces/chat/quantum-branding/app.js`. This enables an explicit email draft from the reviewed brief; it is not a backend delivery integration. Until configured, the UI clearly says contact delivery is unavailable. Add a verified booking link if preferred.
2. Approve the Selvaggi and Verne scopes, exact deliverables, dates/status and any documented outcomes. Current panels deliberately expose evidence limitations; they are not finished public case studies.
3. Replace editorial client covers with approved real project imagery. Supply an approved Nizzar portrait if a photographic founder treatment is desired; the current poster avoids a fake likeness.
4. Confirm Quantum Branding.ai’s public availability and approved destination before linking it as a live product.
5. Review French copy, structured-format prices and legal business details. Add the appropriate legal disclosures for the business and deployment jurisdiction.
6. Google Fonts supplies DM Sans and Instrument Serif. Self-host licensed font files if third-party font requests should be removed. The site has system-font fallbacks.
7. The included Node server is a local development preview, bound to localhost. Deploy the four public assets (`index.html`, `styles.css`, `app.js`, `favicon.svg`) on a static hosting provider, or harden a production server separately. Internal project/test files are not served by the preview server.

The brief tool is deterministic: it formats the visitor’s own words. It is not an AI assessment or automated business diagnosis. Data remains in browser memory unless explicitly copied, downloaded or passed to an email client.

## September 2026 design continuation

The original Cline project remains the source. No framework, alternate project or runtime dependency was introduced.

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
