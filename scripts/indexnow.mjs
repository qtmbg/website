// IndexNow submission. Tells Bing which URLs changed, instead of waiting to be asked.
//
//   node scripts/indexnow.mjs                      show what would be submitted
//   node scripts/indexnow.mjs --submit             submit the URLs whose content changed since HEAD
//   node scripts/indexnow.mjs --submit --since HEAD~1   ... since another git ref
//   node scripts/indexnow.mjs --submit --all       submit every URL (first registration, or from CI)
//
// Run it after `npm run build`, on the deployed origin. Submitting a URL that
// has not been deployed yet teaches Bing the old page.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { origin } from '../src/shared.mjs';
import { indexNowKey } from './seo.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const endpoint = 'https://api.indexnow.org/IndexNow';
const argv = process.argv.slice(2);
const has = flag => argv.includes(flag);
const after = (flag, fallback) => {
  const i = argv.indexOf(flag);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback;
};

const key = await indexNowKey(root);
if (!key) {
  console.error('No usable key in seo/indexnow.key. Expected 8 to 128 characters of [a-zA-Z0-9-].');
  process.exit(1);
}

const file = path.join(root, 'seo', 'lastmod.json');
if (!existsSync(file)) {
  console.error('seo/lastmod.json is missing. Run `npm run build` first.');
  process.exit(1);
}
const record = JSON.parse(await readFile(file, 'utf8'));
const all = Object.keys(record).sort();

// What changed is a question about content, not about dates: comparing this
// build's hashes with the hashes recorded at a git ref answers it exactly. The
// date fallback exists only for a checkout with no git history.
function recordedAt(ref) {
  try {
    return JSON.parse(execFileSync('git', ['show', `${ref}:seo/lastmod.json`], {
      cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']
    }));
  } catch { return null; }
}

const since = after('--since', 'HEAD');
let urlList;
let basis;
if (has('--all')) {
  urlList = all;
  basis = 'every URL';
} else {
  const before = recordedAt(since);
  if (before) {
    urlList = all.filter(url => before[url]?.hash !== record[url].hash);
    basis = `changed since ${since}`;
  } else {
    const today = new Date().toISOString().slice(0, 10);
    urlList = all.filter(url => record[url].date === today);
    basis = `dated today, because seo/lastmod.json is not readable at ${since}`;
  }
}

if (!urlList.length) {
  console.log(`Nothing ${basis}. Use --all to submit every URL.`);
  process.exit(0);
}

const body = {
  host: new URL(origin).host,
  key,
  keyLocation: `${origin}/${key}.txt`,
  urlList
};

if (!has('--submit')) {
  console.log(`Dry run. ${urlList.length} URL(s) (${basis}) would go to ${endpoint}:`);
  for (const url of urlList) console.log(`  ${url}`);
  console.log(`\nKey served from ${body.keyLocation}. Add --submit to send.`);
  process.exit(0);
}

// Preflight: a submission is only trusted if the key answers at the origin, so
// there is no point sending one before the key file is deployed. Checking here
// turns a silent rejection into a readable message, and makes an accidental
// --submit against an undeployed key harmless.
const served = await fetch(body.keyLocation).catch(() => null);
if (!served || !served.ok || (await served.text()).trim() !== key) {
  console.error(`${body.keyLocation} does not return the key (${served ? served.status : 'unreachable'}).`);
  console.error('Deploy the build first. Nothing was submitted.');
  process.exit(1);
}

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body)
});
const detail = (await response.text()).trim();

// 200 accepted, 202 accepted while the key is still being verified.
if (response.status === 200 || response.status === 202) {
  console.log(`${response.status} ${response.statusText}: ${urlList.length} URL(s) submitted.${detail ? ` ${detail}` : ''}`);
  process.exit(0);
}
const hint = {
  400: 'Malformed request.',
  403: `Key rejected. Confirm ${body.keyLocation} is live and returns exactly the key.`,
  422: 'A URL does not belong to the host, or the key does not match the host.',
  429: 'Too many submissions. Wait, then retry.'
}[response.status] || 'Unexpected response.';
console.error(`${response.status} ${response.statusText}. ${hint}${detail ? ` ${detail}` : ''}`);
process.exit(1);
