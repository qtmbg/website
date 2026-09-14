# Quantum Branding — working rules

The practice website for Nizzar Ben Chekroune. Static, bilingual, generated
from `src/` into `dist/`. Read `README.md` for the build and the file layout.

## Identité visuelle canonique

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
ask for it.

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
links with `tests/fixtures/editorial-2026-09-14.json`, and to check boundary
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
The owner supplied both complete cases in `src/cases.mjs`. Historical dates
for UNIDO, Audi and Diptyk still await the owner's response; never infer them.

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
