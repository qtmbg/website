# Quantum Branding — the practice website

Static, bilingual site for Nizzar Ben Chekroune’s independent practice.
Every route is generated as plain HTML: no framework, no runtime dependency,
no content injected after hydration.

- **Positioning** — Brand Strategist, founder of Quantum Branding. Brand × AI × Business. Work since 2006. See what is true. Decide what matters. Make it real.
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
| `scripts/seo.mjs` | Search discovery: content-hashed `lastmod`, `robots.txt`, Atom feeds, IndexNow key, Bing ownership file. Touches no copy. |
| `scripts/indexnow.mjs` | Submits changed URLs to IndexNow. Dry run unless `--submit`. |
| `seo/` | The public IndexNow key and the per-URL content hashes behind `lastmod`. Commit `seo/lastmod.json` with the change that moved it. |
| `scripts/images.mjs` | One 1200×630 sharing image per route → `public/og/` (committed). |
| `scripts/brochures.mjs` | The two brochure PDFs → `public/downloads/` (committed). |
| `assets/desktop.css` | The only stylesheet: the desktop direction of 4 October 2026 (see `DESKTOP-DESIGN-2026-10-04.md`). Canonical palette, Bricolage Grotesque self-hosted in `assets/fonts/`. |
| `assets/desktop.mjs`, `app.js` | `desktop.mjs`: clocks and calendars, dock magnification and tips, the essay player, dragging, reveals, live reduced motion. `app.js`: the mobile menu and the brief. Nothing is sent anywhere. |
| `scripts/presentation.mjs` | Decorative markup only (desktop scene, windows, folder tabs, notes). Every addition is a wrapper or an aria-hidden duplicate. |
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

## Search discovery

Generated on every build: `sitemap.xml`, `robots.txt`, `feed.xml`, `fr/feed.xml`
and the IndexNow key file. Sitemap dates move only when a page's rendered bytes
move, so the dates stay worth believing.

```sh
npm run build
npm run indexnow                       # show what changed
npm run indexnow -- --submit           # after deploying, tell Bing
npm run indexnow -- --submit --all     # first registration only
```

`BingSiteAuth.xml` is written when `BING_SITE_AUTH` holds the token from Bing
Webmaster Tools. See `BING-STRATEGY-2026-09-16.md` for the reasoning and for the
title work that still needs an editorial decision.

Claims, sources and their qualifications are recorded in `EVIDENCE.md` and surfaced publicly at `/notes`.

## Career archive recovery · October 2026

The owner requested continuation of Claude's interrupted career excavation,
with inclusion by default and precise relationships. The career archive is
local review work. This handoff does not authorize deployment, publication,
outreach, a commit or a push.

The internal `archive/` directory is deliberately ignored by Git because this
repository is public. Keep the canonical local records and private source
material there; only reviewed public projections and media are versioned.

`archive/registers/projects.json` is the canonical internal project model.
`src/archive/projects.mjs` is its public projection. Its records generate
the Work browser, full index, timeline, home selection and case pages.
`archive/registers/` holds internal source and claim registers;
`scripts/archive-records.mjs` refreshes public records through a field allowlist and writes the registers; `archive/CAREER-MAP.md` records the complete landscape for editorial review.
Original downloads and partial research are preserved under ignored
`archive/originals/`. Never copy that directory into the build.

Media provenance and publishing status live in `archive/media.json`.
`node scripts/media.mjs --derive` creates optimized copies from cached originals.
Only PUBLIC SAFE and PUBLIC WITH CREDIT entries may produce public derivatives.
Review the source and credit before changing an asset's publishing status.
Internal facts can retain geography, historical financial results and source
platform names even where public practice copy omits them.

```sh
node scripts/media.mjs --derive
node scripts/archive-records.mjs
npm run assets
npm test
npm start
BASE_URL=http://localhost:3017 npm run test:browser
BASE_URL=http://localhost:3017 npm run test:visual
BASE_URL=http://localhost:3017 node tests/archive.mjs
```

The earlier September editorial snapshots remain historical records. The October
archive intentionally changes Work, home, experience wording and corresponding
metadata; unrelated pages still compare against the previous approved snapshot.
The owner's latest wording correction is “since 2006” / “depuis 2006”. It does
not assign that date to individual projects lacking evidence.
