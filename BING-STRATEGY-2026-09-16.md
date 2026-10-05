# Bing referencement strategy — 16 September 2026

For the owner. It records what is now live in the repository, what only an
account holder can do, and the one editorial decision that carries most of the
ranking value. Nothing here changed a word of any page.

---

## 1. Why Bing is the right place to be deliberate

Bing is not a smaller Google. It ranks differently, and the differences happen
to suit an independent practice with a strong name and a thin link profile.

**It reads more literally.** Bing weights the exact terms in the title tag, the
H1 and the first paragraph more mechanically than Google does. A precisely
worded page can outrank a more authoritative one on a specific phrase. This is
the whole opening.

**It publishes its ranking factors:** relevance, quality and credibility, user
engagement, freshness, page load time, and location. Five of those six are
available to this site. The sixth is not, and that has consequences below.

**It accepts being told.** IndexNow is Bing's push protocol: submit a URL and
Bing fetches it in minutes rather than finding it in weeks. Google refuses the
protocol entirely. On Bing this is a free head start, and it is now wired in.

**It is the substrate for Copilot.** Copilot in Windows, Edge and Microsoft 365
is grounded on the Bing index. For a practice that sells judgment to people who
run companies, being the source a Copilot answer cites inside a Microsoft 365
tab is worth more than a blue link.

**Microsoft owns LinkedIn.** Bing's entity graph resolves a person partly
through their LinkedIn presence. The site's structured data already names that
profile. That connection is an asset, not a coincidence.

**The blocker, stated plainly:** location is an official Bing ranking factor and
a documented Bing Places surface, and the site's own rules forbid naming a city,
country or region. That door is closed by choice. The strategy below therefore
overweights everything else. It is worth knowing what it costs: no map pack, no
"near me" surface, weaker relevance on any query a searcher localises. If that
trade ever gets reopened, tell me and the picture changes.

---

## 2. The positioning bet

Nobody types "quantum branding". Ranking for "brand agency" is unwinnable
without links, without a location and without a decade of domain history. So the
go-to position is not bought on head terms. It is built on four moves.

**Own a term rather than rent a category.** *The Collapse* is the practice's own
vocabulary. A named method is the only kind of number one an independent
practice can actually hold, because nobody else is competing for it. The method
is now declared to Bing as a formal vocabulary — a `DefinedTermSet` with
Observe, Collapse, Build and Hold as its four defined terms, attributed to
Nizzar. That is how an engine learns that a phrase is a thing with an owner
rather than a common noun.

**Be an entity, not a site.** Bing resolves people and organisations before it
ranks documents. The graph now states one practice, one founder, one website and
six named services, all cross-referenced by stable `@id`. The practice declares
what it knows about. A query about the person, or about who runs this, now has a
machine-readable answer.

**Rank on the decision vocabulary, not the deliverable vocabulary.** The
competition for "branding" is infinite. The competition for *diagnosis before
prescription*, *the brief before the brief*, *what automation should earn*,
*holding a decision* is close to nothing — and those pages already exist and are
already good. This is the rare case where the essays were written before the
keyword research and happen to be right.

**Exploit French.** Nineteen French routes exist and have never had a single
hour of ranking effort spent on them. French commercial queries are thinner than
English ones on every engine, and Bing's share in French-speaking professional
and enterprise desktop contexts is not marginal. The cheapest available win on
this site is French, and it needs no new content — only the title work in §4.

---

## 3. What is live in the repository now

All of it is generated at build time and covered by the existing suites.

| Change | Why Bing specifically |
|---|---|
| `scripts/indexnow.mjs` + key served at `/<key>.txt` | Push indexing. Bing learns about a change in minutes. Google does not support it, so this is pure Bing upside. |
| Honest `lastmod` (`seo/lastmod.json`) | The sitemap previously stamped every URL with the build date, so every deploy claimed all 38 pages had changed. Bing treats a sitemap whose dates always move as a sitemap whose dates mean nothing, and stops reading them. Dates now follow a content hash of the rendered page and only move when the page really moves. |
| `robots.txt` names `bingbot` and `msnbot` | Explicit permission that survives any future tightening of the wildcard group, and three `Sitemap:` lines instead of one. |
| Atom feeds at `/feed.xml` and `/fr/feed.xml` | Bing Webmaster Tools accepts a feed in the same slot as a sitemap and reads it as the freshness channel for the essays. Freshness is a named ranking factor. |
| `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">` | Removes the snippet and image-preview ceilings. A longer permitted snippet is what lets a Copilot answer quote a full argument rather than a fragment. |
| Richer JSON-LD: `WebSite` node, `DefinedTermSet` for The Collapse, six `Service` nodes on `/practice`, `knowsAbout`, `sameAs` | Bing leans on declared structured data more mechanically than Google. This is the entity work from §2, made machine-readable. No offer and no price anywhere: what is sold is named, what it costs is not. |
| `BING_SITE_AUTH` support | Set the environment variable in Vercel and `BingSiteAuth.xml` appears at the origin. The token is issued by Bing and is never invented here. |
| Feed and sitemap content types in `vercel.json` | The feed is served as `application/atom+xml`, not generic XML. |

Verified: `npm test` 35/35, browser 52 loads, visual 168 measurements, motion,
and `test:restoration` 38 editorial snapshots **unchanged** — the fingerprint
covers title, description, canonical, alternates, Open Graph and Twitter, so
that pass is the proof that none of this touched the editorial surface.

**Deploy note.** IndexNow submits live URLs. Deploy first, then run
`npm run indexnow -- --submit --all` once to seed, and `npm run indexnow --
--submit` after each later deploy. Without `--submit` it prints what it would
send and sends nothing. Submitting before deploying teaches Bing the old page.

---

## 4. The decision that carries the most value

**The title tags are the largest single gap, and they are yours to decide.**

Every page title today is a slogan. `Making got cheap. Deciding didn't.` is the
best line on the site and I would not touch the hero. But as a *title tag* it
contains no term a buyer would ever type, and on Bing — which matches title
terms literally — that is the difference between existing and not.

The precise proposal: **change only the `<title>` element and the meta
description. Leave every H1, every standfirst and every word of body copy
exactly as it is.** The title tag is already treated as a separate surface by
the house rules — it is the one place em dashes are allowed. A visitor reads the
H1; the title tag is read by the engine and by the result page.

Sketch, English, for you to accept, edit or refuse:

| Route | Now | Proposed |
|---|---|---|
| `/` | Quantum Branding — Making got cheap. Deciding didn't. | Quantum Branding — brand strategy, positioning and AI decisions |
| `/practice` | One practice. A clear responsibility. | Brand, marketing, digital and AI consulting — Quantum Branding |
| `/practice/method` | The Collapse | The Collapse — a method for brand and business decisions |
| `/work` | The work, in context. | Brand and business case studies — Quantum Branding |
| `/thinking` | Thinking from the practice. | Essays on brand strategy and decision making — Quantum Branding |
| `/lab` | Quantum Lab | Quantum Lab — diagnostic instruments and experiments |
| `/about` | I'm Nizzar. | Nizzar Ben Chekroune — independent brand and business practitioner |
| `/start` | Let's talk. | Start a brand or business project — Quantum Branding |

French needs its own pass, not a translation of the above — the French terms
buyers use are different, and French is where the thinnest competition is.

This is an editorial change under the repository's own rules. I have not made
it. If you want it, it needs your approval and a refresh of the editorial
baseline, and I would do the two together in one reviewable change.

---

## 5. What only you can do

1. **Bing Webmaster Tools.** Create the account. Fastest route: import from
   Google Search Console in one click. Otherwise take the verification token and
   set `BING_SITE_AUTH` in the Vercel project; the file then appears on the next
   deploy.
2. **Submit three URLs** in the sitemaps panel: `/sitemap.xml`, `/feed.xml`,
   `/fr/feed.xml`.
3. **Confirm the IndexNow key** in the Webmaster Tools IndexNow panel once the
   key file is live.
4. **LinkedIn consistency.** Microsoft owns it and Bing's entity graph reads it.
   The headline, the practice name and the site URL on the profile should match
   the site's wording exactly. Mismatched names split one entity into two.
5. **Credibility signals.** Bing names quality and credibility as a ranking
   factor and it reads links as evidence. The three confirmed references and the
   Google Arts & Culture judge page are the honest starting points; a mention
   from any of them that links here is worth more than any on-page work left in
   this document.

Not recommended: Bing Places, which requires an address the site's rules forbid.
Optional and your call: Microsoft Clarity — it feeds engagement data and is
free, but it is third-party JavaScript on a site that currently ships none, so I
did not add it unilaterally.

---

## 6. What I deliberately did not do

- **No `llms.txt`.** Copilot is grounded on the Bing index. Bing has never
  documented reading that file. It would be decoration.
- **No FAQ schema.** Bing's guidelines treat structured data without matching
  visible content as spam, and there is no FAQ on the site. Adding one is a
  content decision, not a markup trick.
- **No geo or location metadata.** Site rule, honoured.
- **No feed autodiscovery `<link>` in the head.** It belongs there, but the
  editorial fingerprint hashes every `link[rel="alternate"]`, so adding it would
  require a baseline refresh. It is a one-line change to bundle with §4.
- **No page copy changed.** Not mine to change.

## 7. One performance note

Bing names page load time as a ranking factor. Every page blocks on four
stylesheets, about 86 KB uncompressed, and preloads a 253 KB TrueType font. The
same faces as subsetted WOFF2 would cut roughly two thirds of that with no
visible difference. It touches locked design assets, so it is a separate
decision and I have not touched it.

## 8. What to expect, honestly

With IndexNow live and the sitemap trustworthy, indexing should be days rather
than weeks. Owned-term queries — the practice name, the practitioner's name,
*The Collapse* — should resolve within weeks of the titles landing. Competitive
category terms are a matter of months and links, not markup. The one number to
watch in Webmaster Tools is impressions by query: it tells you which vocabulary
Bing has decided this practice belongs to, which is the only measure of whether
the positioning in §2 is taking hold.
