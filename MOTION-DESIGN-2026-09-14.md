# Contemporary motion pass

Owner direction: learn from Google Labs, strengthen style across pages and tools,
reimagine the box. Follow-up: simple, cool motion; no kitsch or rotating old-style
logo. Editorial sources, EN/FR routes, prices policy and sign mapping preserved.

## Delivered direction

- One open blue sculpture on the homepage replaces the box. The logo stays fixed.
- Existing six tool signs move to a quiet strip, with no orbital clutter.
- Lab tools get generous framed scenes; BrandOS retains only mark.svg.
- Six practice territories become a responsive gallery. Case covers gain gentle
  depth; Thinking gains a clearer index; headings and contact surfaces are refined.
- Native CSS page entrances, 480ms reveals and a 1.1s sculpture entrance. Pointer
  depth stays below two degrees. No infinite animation, cursor replacement or
  scroll interception. No animation library or additional third-party runtime.
- Reduced-motion changes cancel active effects immediately. Offscreen object
  animations and hidden-tab animations pause. All text remains readable when
  JavaScript is disabled.

## References and media

Google Labs main page: https://labs.google/ (large visual scenes, experiment gallery).
Putty: https://labs.google/playwithputty (bold type and room for demonstrations).
Dreambeans: https://labs.google/dreambeans (individual product identity).
Science: https://labs.google/science/ (clear editorial hierarchy).
Flow's public page was inspected visually (large media scenes and simple controls).
Public entry pages for Stitch, Mixboard and Opal were inspected via web fetch;
several are client-rendered and provided little readable content. This is
an inspiration study, not a claim to have audited every signed-in Google tool.
No Google assets, copy or code were copied.

Higgsfield rejected the request because the connected account requires Basic or
higher. No purchase or upgrade was made. Picsart Nano Banana 2 generated the hero
sculpture (job 4559de0d-c839-431a-aab2-2916f08aa1ef). Picsart removed the background
(job cc6e7f8d-4e89-46d4-9943-3cc498f39548). Local Sharp optimized WebP copies:
520px 29,326 bytes and 1000px 71,646 bytes. Responsive sources and explicit
dimensions avoid oversized mobile downloads and image layout shifts.

## Verification

- Unit suite: 35 passing assertions including editorial constraints, all routes,
  contact links, metadata, no prices and exact sign mapping.
- Restoration: 38 exact text/link/metadata fingerprints unchanged; 84 responsive
  boundary checks; reduced-motion, keyboard menus and dark-page print checks pass.
- Motion: finite animation; responsive image budgets; pointer reset; live change
  to/from reduced motion; offscreen pause; keyboard focus; eight JS-off routes pass.
- Browser: 52 loads across 26 routes at desktop/mobile, menu, language switching,
  brief creation/copy/download/email draft and brochure/diagram downloads pass;
  no browser errors, failed requests or horizontal overflow.
- Visual: 168 measurements (12 routes × 2 languages × 7 widths), no element or
  document overflow; complete mobile hero proposition visible at 375/380/390px.

An initial mobile overflow from the rotated image canvas was corrected by clipping
the decorative stage. Picsart cutout removes the visible rectangular background.
The old cube-only reduced-motion assertion now checks the new sculpture; editorial
fixtures and sign assertions are unchanged. No PDF or sharing-image regeneration:
palette, font families and editorial copy have not changed.

Native cross-document View Transitions were tested, then removed after Chrome
reported skipped-transition errors during rapid navigation. The final solution
uses a simpler CSS page entrance with normal browser navigation. Pointer exit
resets pointer depth without resetting the separate scroll offset.
Completed CSS entrances are remembered, so switching motion preferences does not
replay them. Independent code review found no blocking issue; both minor motion
lifecycle findings were corrected and covered by the dedicated motion suite.
