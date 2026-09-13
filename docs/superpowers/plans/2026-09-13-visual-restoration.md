# Visual Restoration Implementation Plan

> For agentic workers: execute in this session using superpowers:executing-plans. User has approved the design direction and requested implementation.

**Goal:** Restore the 24eac66 aesthetic while preserving the current bilingual multipage publication's content.

**Architecture:** Add a build-time presentation module in scripts/presentation.mjs and a scoped visual stylesheet. Leave all three editorial source modules unchanged. Extract the original SVG artwork into assets/illustrations; decorate existing blocks using exact stable markup boundaries.

**Tech Stack:** Static HTML generator, CSS, browser JavaScript, Node, Playwright.

- [x] Save current generated pages as editorial comparison baseline. Extract the cube and six tool SVGs from 24eac66, without importing historical prose or scripts.
- [x] Create scripts/presentation.mjs: shared logo mark, home scene, route-specific decorative art, founder poster and section classes. Integrate it in scripts/build.mjs. Keep all existing text and links.
- [x] Create assets/visual-restoration.css: recover the blue/acid composition, original serif/sans contrast, alternating work layouts, dark Lab, founder poster and contact surfaces. Fix project card intrinsic-width overflow. Preserve hero coefficients.
- [x] Enhance app.js with pointer/focus response for the scene, with reduced-motion support and no new external requests or network submission.
- [x] Add an editorial integrity and responsive/interaction check. Update only old tests whose retired-cube requirement conflicts with the approved restoration. Run npm test, browser suite, visual suite and focused boundary checks.
- [x] Inspect home, practice, work, Lab, about, start and essay screenshots in EN/FR on desktop and mobile. Save a local review gallery, update working rules to prevent aesthetic drift, and commit the verified changes locally. No production push.
