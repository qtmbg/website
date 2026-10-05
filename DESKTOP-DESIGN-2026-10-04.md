# Desktop direction · 4 October 2026

The owner asked for the website to take the design of https://elenagonci.com/,
without losing any information. This revision replaces the studio direction of
15 September across every page family, in English and French. The editorial
record is unchanged: all 38 pages keep their exact text, links and metadata
(`tests/fixtures/editorial-2026-09-14-career.json`).

## What was taken from the reference

The reference was measured in Chrome at 1440×900 and 390×844 (computed styles,
its compiled CSS and its component code), not approximated from screenshots.

- **Type.** Bricolage Grotesque everywhere. The reference serves the 14pt optical
  size with a 200–800 weight axis; its glyph advances match that instance
  exactly. The site self-hosts the same instance (SIL OFL 1.1, 45.7 KB woff2,
  Latin and Latin Extended-A, kerning kept): `assets/fonts/`.
  Scale: 48/50.4px headline (60px from 1536px, 30px on a phone), 30/36px
  section titles, 15px bold item names, 14px secondary lines, 10–12px eyebrows
  in spaced capitals.
- **Home desktop.** A board under a 28px menu bar (practice, name, the visitor's
  own date and time), widgets in the reference's positions (clock, calendar,
  a player, a forecast card, a portrait card), folders on the right, an app
  grid lower right, the proposition centred. Below 1000px it becomes the
  reference's phone stack of glass cards.
- **Dock.** The header is a macOS dock: 40px tiles, 24% radius, a glass bar.
  It rests 128px above the foot of the home desktop, rises with the page and
  holds 16px from the top, as on the reference. Tiles within 100px of the
  pointer grow towards 60px on the reference's overdamped spring
  (k 180, c 13, m 0.1); tooltips open above a low dock and below a pinned one.
  The bar is drawn behind the tiles, so magnifying never moves the page.
- **Sections.** Achievements tiles (144px soft tile, 72px squircle) for the
  method, territories and formats; the pillar stack (tab, strip, front panel,
  sticky at 96px) for the two cases and the four movements; the yellow note for
  case chapters, in acid; press cards for the career references; the venture
  list for essays, career rows and the research bench; the about-me.txt window
  for prose sections; the case landing's two choice cards for "What needs to
  change?"; the footer's tile, link column and arrows.
- **Inner pages.** Case studies read as the reference's full case transcript:
  each chapter heading asked in a bubble, the answer beside a monogram tile,
  the closing mailto styled as its input bar. Essays and notes sit in a
  document window. The Lab takes the Playground: a dotted board, a folder
  between the words of its title, a terminal window for Signal Scan.
- **Motion.** The reference's finite entrances: headline lines rise 18px over
  700ms, widgets fade up in sequence (50ms apart), sections reveal 20px over
  700ms once. Folders and widgets drag on the desktop (3px threshold, brought
  to front, no saved positions, a drag never follows a link).

## Mapping onto the canonical palette

No colour was added. The reference's roles map onto the existing tokens:
white and `#fafafa` → white and paper `#f4f6f8`; black with alpha → ink
`#1b252b` with alpha; its blue pills `#57A4F0` → blue `#3158df`; its yellow
notes → acid `#e8fa64`; its folder greys → `--soft` `#e6ebef`; its terminal
→ the Lab surfaces `#22363e` and `#182931`. Dock and app tiles use these tones
with a white gloss. Window lights are grey and take blue, acid and ink on
hover. Body-size grey text uses `--muted` rather than the reference's
black at 50–55%, which falls below 4.5:1 contrast.

## Where the site departs from the reference, and why

- **No autoplay.** The reference's press marquee loops, its playground folder
  toggles itself on touch screens and its about window plays a looping video.
  Here the references are a still row, the Lab folder opens on hover only, and
  there is no video. The clock has no second hand; the clocks change once a
  minute.
- **No location.** The reference's clock and weather name cities. Here the
  clock is unlabelled and the forecast card shows the four movements.
- **JS off and reduced motion.** The reference hides its widgets and reveals
  without JavaScript and keeps its springs under reduced motion. Here
  everything is visible without JavaScript, and reduced motion stops the
  entrances, reveals and dock magnification live.
- **Navigation.** The reference's phone dock sits below the first screen. Here
  it holds at the top from the start so the five sections and "Let's talk"
  stay one tap away; a menu tile unfolds it into a labelled sheet.
- **Between 1000 and 1280px** the reference lets widgets cover the headline;
  here the board keeps one column of widgets.
- **Content.** Every added element is a wrapper or an aria-hidden duplicate of
  what the page already says or links to (widget titles, folder names, the
  note rows quoting each case's own chapter headings and first sentences, the
  table of contents of each case). Nothing is invented. No "QB" text node is
  added; monograms are generated by CSS with empty alternative text.

## Files

| Path | Role |
|---|---|
| `assets/desktop.css` | The only stylesheet the pages load. Tokens, glyph masks, every component. |
| `assets/desktop.mjs` | Clocks and calendars, dock magnification and tips, the essay player, dragging, reveals, live reduced motion. |
| `scripts/presentation.mjs` | Decorative markup: desktop scene, windows, folder tabs, notes, Lab folder, case contents. Editorial strings are untouched. |
| `scripts/build.mjs` | Dock markup (glyph spans, `data-tip`), font preload, one stylesheet, the `js` and `motion-ready` classes. |
| `scripts/images.mjs`, `scripts/brochures.mjs` | Share cards and brochures in the same type and vocabulary. |
| `tests/motion.mjs` | Rewritten for this direction. |

The earlier layers (`styles.css`, `assets/visual-restoration.css`,
`assets/kinetic.css`, `assets/studio.css`, `assets/atomic.css`,
`assets/motion.mjs`) are no longer referenced by any page.

Share cards and brochures previously loaded their fonts from `file://` URLs,
which Chrome refuses inside a `setContent` page, so they had been rendered in
Arial and Georgia. Both now embed the font, and the regenerated
`public/og/*.png` and `public/downloads/*.pdf` use Bricolage Grotesque.

## Verification

All suites pass: 35 acceptance tests; `tests/restoration.mjs` (38 unchanged
editorial snapshots, 84 boundary checks); `tests/motion.mjs`; 52 browser page
loads across 26 routes; 168 visual measurements across 7 widths; the editorial
audit with brochure geometry. Widgets and the headline were checked for
overlap at 768, 1024, 1280, 1440×700 and 1920.
