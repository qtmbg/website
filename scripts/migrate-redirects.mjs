// Activates the 301s for archive pages whose canonical home is nizzar.com/work.
// Owner decision, 6 October 2026: no mass 301 until the map is approved.
// Map: src/archive/lens.mjs (MIGRATE). Interim state: canonical + noindex (FR).
//
//   node scripts/migrate-redirects.mjs           # dry run: prints the redirects
//   node scripts/migrate-redirects.mjs --write   # writes them into vercel.json
//   node scripts/migrate-redirects.mjs --remove  # takes them out again
//
// Redirects are marked with "x-work-migration" so they can be removed as a set.
import { readFile, writeFile } from 'node:fs/promises';
import { lens, NIZZAR_WORK } from '../src/archive/lens.mjs';

const file = new URL('../vercel.json', import.meta.url);
const config = JSON.parse(await readFile(file, 'utf8'));
const migrate = Object.keys(lens).filter(s => lens[s] === 'MIGRATE');
const rules = [
  ['/work/index', `${NIZZAR_WORK}#index`],
  ['/work/timeline', `${NIZZAR_WORK}#timeline`],
  ...migrate.map(s => [`/work/${s}`, `${NIZZAR_WORK}/${s}`])
].flatMap(([source, destination]) => [
  { source, destination, permanent: true, 'x-work-migration': true },
  { source: `/fr${source}`, destination, permanent: true, 'x-work-migration': true }
]);

const kept = (config.redirects || []).filter(r => !r['x-work-migration']);
if (process.argv.includes('--write')) {
  config.redirects = [...kept, ...rules];
  await writeFile(file, JSON.stringify(config, null, 2) + '\n');
  console.log(`wrote ${rules.length} redirects into vercel.json. Also set REDIRECT_MIGRATED = true in src/archive/lens.mjs.`);
} else if (process.argv.includes('--remove')) {
  config.redirects = kept;
  await writeFile(file, JSON.stringify(config, null, 2) + '\n');
  console.log(`removed ${(config.redirects || []).length === kept.length ? rules.length : 0} work-migration redirects`);
} else {
  console.log(`${rules.length} redirects (dry run):`);
  for (const r of rules.slice(0, 6)) console.log(`  ${r.source} → ${r.destination}`);
  console.log('  …');
}
