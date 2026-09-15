# Studio direction — 15 September 2026

The owner rejected the circular sculpture and illustrated pictograms from the
previous deployment, and asked for the Google Labs direction across the site.
This revision preserves the approved EN/FR content while replacing that visual
vocabulary. It supersedes the presentation described in the 14 September report.

## Reference and decisions

Reference sites inspected: https://labs.google/, https://labs.google/playwithputty,
https://labs.google/dreambeans and https://flow.google.com/about.
The adopted principles are generous panels, large sans-serif type, clear hierarchy
and immediate responses to exploration. No Google copy, images or brand assets
are included. Quantum's blue, acid, paper and ink remain the core palette.

- Home: four expanding panels with typographic, grid and bar compositions.
  Hover or touch selects the visible panel under the pointer; dragging follows
  actual card bounds rather than dividing the gallery into fixed quarters.
- Lab: BrandOS typography, three brief rows and a Signal Scan field replace the
  stamp, illustrated paper and magnifier. Product links and descriptions stay intact.
- Practice and method: oversized numerals and ruled grids replace pictograms.
- Work: flat project compositions with restrained pointer displacement.
- Thinking and case pages: sans-serif display headings, reactive article rows
  and preserved long-form reading structure.
- About: a flat typographic founder panel without the decorative star.
- Contact: clearer surfaces and input feedback, with no change to data handling.
- Header: typographic wordmark without the old cube symbol.

## Implementation and limits

`assets/studio.css` is the final cascade layer. `scripts/presentation.mjs` owns
decorative markup; the editorial `src/` files and fixture are unchanged.
`assets/motion.mjs` handles pointer and touch response plus finite entrance motion.
There is no new runtime dependency or generated media in this revision.

Animation does not drive navigation or hide content. Native vertical scrolling
remains enabled; the decorative gallery is redundant with the readable method.
Reduced-motion preferences are observed live. Keyboard links, focus states and
JS-off reading remain available. Brief answers still remain in the browser.

The original artwork files and historical CSS are retained in repository history
and the asset folder, but the new generated pages do not reference the rejected
sculpture or illustrated tool files. They are not downloaded during page loads.

## Verification

Run `npm test`, `node tests/motion.mjs`, `npm run test:browser`,
`npm run test:visual` and `npm run test:restoration` before release.
The immutable editorial fixture compares text, links and metadata for all 38 pages.
Browser tests cover instrument workflows and language switching. Visual checks
cover 168 route/language/width combinations, plus 84 breakpoint checks.
Motion tests include visible-card activation, drag release, touch taps, live
reduced-motion switching, keyboard focus and eight readable JS-off routes.

A separate code review found the fixed-quarter hit-testing defect; activation now
uses the actual card under the gesture, with a regression check for card centers.

Release checks passed: 35 static tests; interaction tests including touch taps;
52 browser page loads across 26 routes; 168 visual measurements; 38 unchanged
editorial snapshots and 84 breakpoint checks. No page errors or horizontal
overflow were reported. Desktop and mobile screenshots were visually inspected.
