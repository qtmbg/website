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

### 1. Em dash

The em dash rule applies to **page text**: body copy, headings, standfirsts,
essay prose, form labels and the brochures.

It does **not** apply to:

- `<title>` tags — `Quantum Branding — Making got cheap. Deciding didn't.`
- navigation separators
- breadcrumbs

Those are structural separators, not prose, and the em dash is the correct
character for them.

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

No city, country, region, "based in" or "working from". "African" is permitted
only inside the proper name of the 1:54 art fair.

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

`src/shared.mjs` carries `publishTestimonials`. It is `false`: the three client
quotes exist in the data and in the markup but are withheld from `/work` and
from both brochures until each excerpt carries a confirmed name, role and year.
Flip it to `true` once attribution is real — the site and the PDFs both follow it.

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
