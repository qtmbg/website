# Kinetic field implementation plan

> Execute within this session. Owner has granted creative and implementation authority.

**Goal:** Give the existing bilingual practice a distinctive motion identity while
preserving all approved content.

**Architecture:** Keep src editorial modules untouched. Add presentation markup,
one scoped CSS layer and one native motion module, copied by the existing build.

**Tech Stack:** Static HTML, CSS, native Web Animations, Playwright, optimized WebP.

- [x] Prepare optimized Picsart sculpture and record provenance.
- [x] Change `scripts/presentation.mjs`: new hero sculpture and quiet tool strip.
  Keep BrandOS mark-only and compass only in hero/Collapse/Business. Hide only art
  from accessibility, preserving all labels and content. Omit decorative headers
  following the owner's request for simplicity.
- [x] Create `assets/kinetic.css`: hero, Lab, territories, cases, index, founder,
  forms, responsive and print layouts; motion timings and static reduced mode.
- [x] Create `assets/motion.mjs`: observers, bounded pointer/scroll effects, finite
  entrances, offscreen/visibility lifecycle, reduced-motion change handling.
- [x] Load new assets in `scripts/build.mjs`; retire obsolete scene handler in app.
- [x] Build and inspect home/Lab/practice at desktop and mobile before broad tests.
- [x] Update cube-only test, add meaningful motion lifecycle and fallback tests;
  run npm test and browser, visual, restoration plus motion suites.
- [x] Document authorization/provenance/results and review diff.
- [ ] Commit and publish;
  compare live HTML and CSS with local generated output and show live result.
