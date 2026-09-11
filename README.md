# Quantum Branding — the practice website

Static, bilingual site for Nizzar Ben Chekroune’s independent practice.
Every route is generated as plain HTML: no framework, no runtime dependency,
no content injected after hydration.

- **Positioning** — *Making got cheap. Deciding didn’t.* / *Créer coûte moins. Bien décider reste rare.*
- **Method** — The Collapse: Observe → Collapse → Build → Hold.
- **Contact** — me@qtmbg.com. The first conversation is free; scope and price are defined after it. No prices appear on the site.
- **Product** — the product at quantumbranding.ai is called **BrandOS by Quantum Branding**. This repository never touches it.

## Run

Node.js 22+. Serving the site and running unit tests need no installation.
Browser tests use the locked Playwright dev dependency and an installed Google Chrome.

```sh
npm start                                     # build, then serve dist/ on :3017
npm test                                      # build, then the acceptance suite
BASE_URL=http://localhost:3017 npm run test:browser
BASE_URL=http://localhost:3017 npm run test:visual
```

## Layout

| Path | What it holds |
|---|---|
| `src/shared.mjs` | Data model: contact, method, cases, reviews, territories, references, formats, brief builder. One source of truth for the site *and* the brochures. |
| `src/articles.mjs` | Five essays, English and French. |
| `src/pages.mjs` | `makePages(articles)` — the body of every route in both languages. |
| `scripts/build.mjs` | Renders `dist/`: HTML shell, metadata, JSON-LD, sitemap, robots, method diagrams, asset copying. |
| `scripts/meta.mjs` | Route identity: canonical URLs, OG slugs, breadcrumb chains. |
| `scripts/images.mjs` | One 1200×630 sharing image per route → `public/og/` (committed). |
| `scripts/brochures.mjs` | The two brochure PDFs → `public/downloads/` (committed). |
| `styles.css`, `app.js` | Warm paper, near-black ink, one vermillion accent. Instrument Serif + DM Sans, no monospace. `app.js` handles only the mobile menu and the brief. |
| `server.mjs` | Local preview of `dist/`, mirroring Vercel’s `cleanUrls`. |

`public/og/*.png` and `public/downloads/*.pdf` are generated locally and committed,
so the Vercel build never needs a browser. Regenerate them with `npm run assets`
after changing brand copy, then rebuild.

## Routes

`/` `/practice` `/practice/method` `/work` `/work/:case` `/thinking` `/thinking/:essay`
`/lab` `/lab/signal-scan` `/lab/the-brief-before-the-brief` `/about` `/start` `/notes`
— each mirrored under `/fr`, with reciprocal `hreflang` and `x-default`.

## Rules the tests enforce

- No price, amount or currency anywhere — site, metadata, generated files or PDFs.
- French routes are French in the static HTML, without JavaScript.
- Navigation is Work · Practice · Thinking · Lab · About, with a persistent “Let’s talk”.
- No dead `#` anchors; every internal link resolves.
- Canonical, reciprocal hreflang, Open Graph, Twitter Card and JSON-LD on every page.
- The hero carries exactly three things and fits the first screen at 380px.
- Fiverr is named only in `/notes`; the product is called BrandOS.
- The brief instrument never transmits anything on its own.

Claims, sources and their qualifications are recorded in `EVIDENCE.md` and surfaced publicly at `/notes`.
