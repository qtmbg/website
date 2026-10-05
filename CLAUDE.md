# Quantum Branding — working rules

The practice website for Nizzar Ben Chekroune. Static, bilingual, generated
from `src/` into `dist/`. Read `README.md` for the build and the file layout.

## Governing evidence policy, 4 October 2026

Owner-attested SOT is canonical; first-party files substantiate; public corroboration strengthens authority; retrievability measures discoverability. Missing public evidence never downgrades owner-attested facts. Use canonical SOT dates over old public dates, record discrepancies internally. Flag only unresolved unsuperseded owner-owner conflicts. Confidential is not the same as uncorroborated. Inclusion remains the default; Nizzar makes the final cut. See `archive/EVIDENCE-POLICY.md`.

## Owner handoff and wording correction, 4 October 2026

Continue the recovered visual career archive locally. Inclusion is the default;
Nizzar makes the final editorial cut. Preserve exact relationships, studio credits,
private media status and unresolved facts. Internal canonical evidence may retain
geography, source platform names and verified historical financial results.
Inherited presentation restrictions must not delete that evidence.

Use “since 2006” / “depuis 2006” for experience, per the owner's latest correction.
Do not infer individual project dates from that career starting point.
The current handoff authorizes local research, implementation, assets and QA;
it explicitly withholds deployment, external publication, outreach and commits.
Existing September editorial snapshots are retained as history; the authorized
archive and experience changes receive an October baseline.

## Identité visuelle canonique

### Owner direction, 4 October 2026 — current direction

The owner asked for the site to take the design of https://elenagonci.com/
without losing any information. `assets/desktop.css` is now the only stylesheet
and `assets/desktop.mjs` the only motion module; the earlier layers are no
longer referenced. The typeface is Bricolage Grotesque (SIL OFL, the 14pt optical
size the reference serves, self-hosted in `assets/fonts/`). The vocabulary is the
reference's: a home desktop with menu bar, widgets, folders and app grid; the
header as a macOS dock; pillar folders with notes; achievement tiles; windows,
case transcripts and venture-list rows. Measurements, the colour mapping and
every departure are in `DESKTOP-DESIGN-2026-10-04.md`. This supersedes the
15 and 14 September directions below.

Unchanged: the canonical palette (no colour was added; the reference's roles map
onto paper, ink, muted, line, blue, acid, soft and the Lab surfaces), the
editorial baseline (all 38 pages keep their text, links and metadata), the
no-pricing, no-location and first-person rules, and BrandOS's association with
Observe only. No autoplay loops, no city labels, no second hand. Everything the
presentation layer adds is a wrapper or an aria-hidden duplicate of existing
copy or links, and no "QB" text node is added (monograms are CSS with empty
alternative text). Keep JS-off readability and live reduced-motion switching.
Validate with the existing suites plus `node tests/motion.mjs`, which now covers
the dock, dragging, reveals, touch and JS-off reading.

### Owner correction, 15 September 2026 (superseded)

The owner rejected the circular blue sculpture and the old illustrated icons,
and explicitly extended the Google Labs-inspired direction to every page family.
`assets/studio.css` is now the last presentation layer. Do not restore the
sculpture, cube, pictogram strip or logo symbol. The wordmark is typographic.
The hero uses four expanding typographic panels; Lab products use typographic
previews; method and territories use numerals. Case covers are flat compositions.
Large sans-serif headings, generous spacing and direct pointer/touch response
replace the prior decorative vocabulary. This supersedes the visual preservation
rules below, including their sign mappings and fixed scale restrictions.

Keep the canonical blue, acid, paper and ink tokens. Lab card surfaces also use
`#22363e` and hover `#2a4048`. Preserve the approved editorial source, career dates,
no-pricing requirement and BrandOS's exclusive association with Observe.
No autoplay ornament loops, bouncing logos or scroll hijacking. Keep native touch
scrolling, reduced-motion switching and JS-off readability. Validate with the
existing suites plus `node tests/motion.mjs`. The 14 September document below
records a superseded implementation, not approval of the rejected sculpture.

### Authorized evolution, 14 September 2026

The owner explicitly requested a Google Labs-inspired visual and motion evolution,
including replacing the hero box, then clarified: simple and contemporary, never
kitsch. `assets/kinetic.css` is the final presentation layer. The Picsart-generated
open blue sculpture replaces the hero cube; the logo stays unchanged and static.
Six illustrated tools remain in a quiet strip. Lab and territory cards, case
covers, typography spacing and rounded contact surfaces are deliberate updates.
This is an explicit exception to the historical no-scale/no-composition-change
rules below. The palette and font families remain unchanged.

Motion lives in `assets/motion.mjs`: finite entrances, subtle pointer depth,
short page entrances. No logo rotation, bounces, ambient loops,
custom cursor, scroll hijacking or external animation runtime. Preserve live
reduced-motion handling and readable JS-off pages. Run `node tests/motion.mjs`
alongside the existing suites. The editorial baseline and sign mappings remain
unchanged. See `MOTION-DESIGN-2026-09-14.md` for provenance and verification.

Reference: commit `24eac66`, the `:root` block on **line 147**.

That stylesheet contains **three** `:root` blocks. Only the last one to declare
a token wins the cascade, so line 147 is the palette the site actually served.
Reading the first block (line 134) gives the wrong answer. This has already
caused one regression — check the line number before quoting a value.

Canonical tokens:

| Token | Value |
|---|---|
| `--paper` | `#f4f6f8` |
| `--ink` | `#1b252b` |
| `--muted` | `#59666e` |
| `--line` | `#cdd4d9` |
| `--blue` | `#3158df` |
| `--acid` | `#e8fa64` |

`--accent` is an alias for `--blue`, not a colour of its own. `--soft`
(`#e6ebef`), `#182931` and `#e1e7ed` are surface and hover values that were
already present in `24eac66`.

**Any colour absent from this list is a regression.** `#f5f0e7` (beige) and
`#d94c32` (vermillion) were introduced in error by commit `eb73e62` and have
been removed. Do not reintroduce them.

The same palette is hard-coded in `scripts/images.mjs` (sharing images) and
`scripts/brochures.mjs` (PDFs). A change to `styles.css` that is not mirrored
in both leaves the site and its artefacts disagreeing.

**No session chooses a colour, a typeface or a scale.** If a value is missing,
ask for it. The typeface and scale now come from the owner's 4 October direction
(the reference's own values); the palette is unchanged.

## Checks

### Visual restoration approved 13 September 2026

The multipage EN/FR editorial pass of 14 September 2026 is approved. Commit `24eac66` is the
visual reference, not the editorial source. Preserve `src/pages.mjs`,
`src/articles.mjs` and `src/shared.mjs` when changing presentation.
`scripts/presentation.mjs` and `assets/visual-restoration.css` restore the
cube, illustrated tools, logo symbol, alternating project compositions,
blue founder poster and acid contact surfaces. These are intentional and
must not be removed by an editorial or routing change. Original illustration
shading and the original project-cover colours are part of the reference.
Do not reintroduce old slogans, prices or product naming with the artwork.
Run `npm run test:restoration` to compare every page's text, metadata and
links with `tests/fixtures/editorial-2026-09-14-career.json`, and to check boundary
widths and reduced motion. Refresh that baseline only for an explicitly
requested editorial change. Preserve the older baseline as a historical record.
The owner explicitly requested tests, commit and deployment for this editorial pass.

### 1. Em dash

The em dash rule applies to **page text**: body copy, headings, standfirsts,
essay prose, form labels and the brochures.

The exception is title tags and their social-title equivalents.
Body text, generated brief text and downloadable diagrams use no em dash.

### 2. No prices

No price, amount, currency symbol or rate appears anywhere: pages, metadata,
generated files or PDFs. The site states only that the first conversation is
free and that scope and price are defined after it.

### 3. First person

"I" for the practice, "the Lab" for research. "We" only where it means Nizzar
and the client together. Never "we", "us" or "our" for Quantum Branding.

### 4. No defensive clauses

Nothing is defined by what it is not. Qualifications are at most two words:
"In development." "Experiment." "Before this practice."

### 5. No location

No city, country, region, "based in" or "working from". The owner explicitly
supplied The New York Times and Los Angeles Lakers in the career-reference
bar. Preserve those proper names and list them as exceptions in the audit.

### 6. Product naming

The product at quantumbranding.ai is **BrandOS by Quantum Branding**, short
form **BrandOS**. "Quantum Branding AI" must not appear. Never modify that
repository from here.

### 7. Contact

`me@qtmbg.com`, everywhere, including the displayed label.

### 8. Invented facts

Never invent a full name, year, role, result, figure or client authorisation.
If a fact is missing, use a cautious formulation and record the gap in
`/notes` and `EVIDENCE.md`.

## Flags

`src/shared.mjs` carries `publishTestimonials=true`. On 14 September 2026 the
owner confirmed Elvin Picardo, Tisa Esen and Shelah J. and requested publication
without platform, role, location or year. Preserve the English quotes verbatim.
The negative construction in the third quote is therefore an explicit quotation
exception. `/notes` retains the originals; `/work` has the EN/FR versions.
The existing PDF template includes the first two quotes.

BrandOS belongs to Observe only in the method. The practitioner owns Collapse,
Build and Hold. Never describe BrandOS as free, paid, required or bundled.
The owner supplied both complete cases in `src/cases.mjs`. Confirmed career dates
live in `src/career.mjs` for /work and /about. UNIDO, USAID, Diptyk, Inception,
BnanaCorp and Quantum Branding are dated. Diesel and Audi / Driven by Art
await clarification of the owner's date attribution; never infer it.
BrandOS has one illustrated sign: mark.svg. compass.svg belongs only to the
hero scene, Collapse and Business & Opportunity. Keep it out of BrandOS.

## Before committing

```sh
npm run assets   # only when brand copy or the palette changed
npm run build
npm test
BASE_URL=http://localhost:3017 npm run test:browser
BASE_URL=http://localhost:3017 npm run test:visual
```

`public/og/*.png` and `public/downloads/*.pdf` are generated locally and
committed, so the Vercel build never needs a browser. Regenerating them is a
deliberate act: check the palette above first.
