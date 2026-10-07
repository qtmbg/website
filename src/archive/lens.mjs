// The practice lens on the shared Work record (owner decision, 6 October 2026).
//
// nizzar.com/work is the canonical career record: every project, in full.
// This site shows the commercial evidence of the practice:
//   KEEP     practice-era engagements, rebuilt here as full commercial cases
//   PROOF    experience before the practice: a short page here, labelled as such,
//            linking to the full case on nizzar.com. Never a Quantum Branding engagement.
//   MIGRATE  everything else. Final destination: 301 to nizzar.com/work/<slug>.
//            Until the owner activates the redirects (REDIRECT_MIGRATED below), the EN page
//            points its canonical to nizzar.com, the FR page is noindex, and both leave the sitemap.
// Map and rationale: outputs/work-v5/ARCHITECTURE.json in the identity workspace.

export const NIZZAR_WORK = 'https://nizzar.com/work';
export const REDIRECT_MIGRATED = false;

export const lens = {
 "diptyk": "PROOF",
 "la-minute-creative": "PROOF",
 "diesel": "PROOF",
 "audi-driven-by-art": "PROOF",
 "verne-jewels": "KEEP",
 "selvaggi": "KEEP",
 "africa-business-school": "KEEP",
 "energy-cube": "KEEP",
 "zone-aire": "KEEP",
 "stan-wawrinka": "PROOF",
 "baccarat": "PROOF",
 "bugatti-asprey-nft": "PROOF",
 "kareem-abdul-jabbar": "PROOF",
 "french-tennis-federation": "MIGRATE",
 "la-lakers": "MIGRATE",
 "unlimitart": "PROOF",
 "nception": "MIGRATE",
 "bananacorp": "MIGRATE",
 "bananaconf": "PROOF",
 "the-future-fashion": "MIGRATE",
 "dubai-holding": "PROOF",
 "unitar": "PROOF",
 "arts-thread-gdgs": "MIGRATE",
 "unido-creative-mediterranean": "PROOF",
 "eu-unido-creative-mediterranean": "MIGRATE",
 "marrakech-creative-interiors-cluster": "MIGRATE",
 "un-women-pwe": "MIGRATE",
 "usaid-career-centers": "PROOF",
 "iom-compass": "PROOF",
 "oif-francophonie": "PROOF",
 "nepad": "MIGRATE",
 "houna-design-talks": "MIGRATE",
 "creative-forum-ljubljana-2018": "MIGRATE",
 "oasis-festival": "MIGRATE",
 "arroz-con-pollo": "MIGRATE",
 "street-view-inside": "MIGRATE",
 "la-cuisine-de-mami-bahia": "MIGRATE",
 "quantum-branding": "KEEP",
 "brandos": "KEEP",
 "rbmg": "KEEP",
 "technikart": "MIGRATE",
 "unov": "MIGRATE",
 "beachcomber": "MIGRATE",
 "es-saadi-theatro": "MIGRATE",
 "hanoot": "MIGRATE",
 "myah-bay": "MIGRATE",
 "destination-evasion-maroc": "MIGRATE",
 "kechnight": "MIGRATE",
 "suite-club": "MIGRATE",
 "marrakech-du-rire": "MIGRATE",
 "hivos-african-crossroads": "MIGRATE",
 "high-atlas-foundation": "MIGRATE",
 "hult-prize": "MIGRATE",
 "water-hackathon": "MIGRATE",
 "arts-dao": "MIGRATE",
 "european-web3-organization": "MIGRATE",
 "would-jamaa-el-fna": "MIGRATE",
 "mobile-photography": "MIGRATE",
 "nft-nyc": "MIGRATE",
 "nft-liverpool": "MIGRATE",
 "time-web3": "MIGRATE",
 "laly-couture": "MIGRATE",
 "lamanche": "MIGRATE",
 "mysticspur": "MIGRATE",
 "hiya-magazine-paris": "MIGRATE",
 "beyond-catstore": "MIGRATE",
 "tribalist-africa": "MIGRATE",
 "jolt-qatar": "MIGRATE",
 "lit-action-usa": "MIGRATE",
 "doc-hygiene-usa": "MIGRATE",
 "moodys-medicinals": "MIGRATE",
 "marrakech-poker-open": "MIGRATE",
 "ocp": "MIGRATE",
 "sergine": "MIGRATE",
 "kleanops": "MIGRATE",
 "trnscnd": "MIGRATE",
 "wow-protein-donuts": "MIGRATE",
 "harvest-festival": "MIGRATE",
 "qisas-rbati": "MIGRATE",
 "3kool": "MIGRATE",
 "anderson-silva": "MIGRATE",
 "charly-palmer": "PROOF",
 "red-cross": "MIGRATE",
 "who": "MIGRATE",
 "tv5-monde": "MIGRATE",
 "timepieces": "NEW-PROOF"
};

// Index into `territories` (src/shared.mjs) for each proof page.
export const proofTerritory = {
 "unido-creative-mediterranean": 5,
 "la-minute-creative": 0,
 "diptyk": 2,
 "audi-driven-by-art": 2,
 "usaid-career-centers": 1,
 "oif-francophonie": 2,
 "iom-compass": 0,
 "unitar": 3,
 "bugatti-asprey-nft": 1,
 "baccarat": 5,
 "stan-wawrinka": 4,
 "kareem-abdul-jabbar": 5,
 "charly-palmer": 4,
 "unlimitart": 5,
 "bananaconf": 2,
 "dubai-holding": 5,
 "diesel": 1,
 "timepieces": 1
};

export const lensOf = slug => lens[slug] || 'MIGRATE';
export const nizzarCase = slug => `${NIZZAR_WORK}/${slug}`;

// The eight covers on /work (owner decision, 7 October 2026: a curated wall, not the full gallery).
// One deliberate spread across sectors and territories: culture, luxury, institutions, sport, fashion.
export const proofWall = ['diptyk', 'bugatti-asprey-nft', 'baccarat', 'unido-creative-mediterranean', 'la-minute-creative', 'stan-wawrinka', 'diesel', 'audi-driven-by-art'];
