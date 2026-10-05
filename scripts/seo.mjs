// Search discovery: honest lastmod, robots, Atom feeds, IndexNow key, Bing ownership.
// This module never touches page copy. It only describes pages that already exist.
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { esc, origin } from '../src/shared.mjs';
import { canonical } from './meta.mjs';

/* ------------------------------------------------------------- indexnow */

// The IndexNow key is public by design: Bing fetches it back from the origin to
// confirm that whoever submitted the URLs controls the host.
export async function indexNowKey(root) {
  const file = path.join(root, 'seo', 'indexnow.key');
  if (!existsSync(file)) return null;
  const key = (await readFile(file, 'utf8')).trim();
  return /^[a-zA-Z0-9-]{8,128}$/.test(key) ? key : null;
}

/* -------------------------------------------------------------- lastmod */

// A sitemap date is a claim. Bing reads a site that re-dates every URL on every
// deploy as a site whose dates mean nothing, and then ignores them. So the date
// follows the rendered bytes: a page keeps its date until its content changes.
export class Lastmod {
  constructor(file, record, today) {
    this.file = file;
    this.record = record;
    this.today = today;
    this.next = {};
  }

  static async open(root, today) {
    const file = path.join(root, 'seo', 'lastmod.json');
    const record = existsSync(file) ? JSON.parse(await readFile(file, 'utf8')) : {};
    return new Lastmod(file, record, today);
  }

  // Yearly furniture (the footer copyright) must not count as a content change.
  static fingerprint(html) {
    return createHash('sha256').update(String(html).replace(/©\s*\d{4}/g, '©')).digest('hex').slice(0, 32);
  }

  observe(url, html) {
    const hash = Lastmod.fingerprint(html);
    const previous = this.record[url];
    const date = previous && previous.hash === hash ? previous.date : this.today;
    this.next[url] = { hash, date };
    return date;
  }

  dateFor(url) {
    return (this.next[url] || this.record[url] || {}).date || this.today;
  }

  // Compared by content, not by date: two changes on the same day are still two
  // changes, and a date comparison would silently report the second as nothing.
  changed() {
    return Object.keys(this.next).filter(url => this.record[url]?.hash !== this.next[url].hash);
  }

  async save() {
    const sorted = Object.fromEntries(Object.keys(this.next).sort().map(url => [url, this.next[url]]));
    await writeFile(this.file, JSON.stringify(sorted, null, 2) + '\n');
  }
}

/* ----------------------------------------------------------------- feeds */

// Atom is a second front door. Bing Webmaster Tools accepts a feed in the same
// slot as a sitemap, and reads it as the freshness signal for the essays.
export function feed(pages, lang, lastmod) {
  const fr = lang === 'fr';
  const essays = pages
    .filter(p => p.lang === lang && p.type === 'Article')
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const self = `${origin}${fr ? '/fr' : ''}/feed.xml`;
  const updated = essays.map(p => lastmod.dateFor(canonical(p.basePath, lang))).sort().pop();
  const stamp = day => `${day}T00:00:00Z`;

  const entries = essays.map(page => {
    const url = canonical(page.basePath, lang);
    return `  <entry>
    <title>${esc(page.title)}</title>
    <link rel="alternate" type="text/html" href="${url}"/>
    <id>${url}</id>
    <published>${stamp(page.date)}</published>
    <updated>${stamp(lastmod.dateFor(url))}</updated>
    <author><name>Nizzar Ben Chekroune</name></author>
    <summary type="text">${esc(page.description)}</summary>
  </entry>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${lang}">
  <title>${fr ? 'Quantum Branding · Les idées' : 'Quantum Branding · Thinking'}</title>
  <subtitle>${fr ? 'Les textes de la pratique de Nizzar Ben Chekroune.' : 'Essays from the practice of Nizzar Ben Chekroune.'}</subtitle>
  <link rel="self" type="application/atom+xml" href="${self}"/>
  <link rel="alternate" type="text/html" href="${canonical('/thinking', lang)}"/>
  <id>${self}</id>
  <updated>${stamp(updated || lastmod.today)}</updated>
  <author><name>Nizzar Ben Chekroune</name></author>
  <rights>© ${new Date().getFullYear()} Quantum Branding</rights>
${entries}
</feed>
`;
}

/* ---------------------------------------------------------------- robots */

// bingbot is named on its own line so the directive survives any future
// tightening of the wildcard group, and so the intent is readable.
export function robots() {
  return `User-agent: *
Allow: /

User-agent: bingbot
Allow: /

User-agent: msnbot
Allow: /

Sitemap: ${origin}/sitemap.xml
Sitemap: ${origin}/feed.xml
Sitemap: ${origin}/fr/feed.xml
`;
}

/* ------------------------------------------------- bing site ownership */

// Bing Webmaster Tools issues the token. It is never invented here: without the
// environment variable the file is simply not written.
export function bingSiteAuth(token) {
  if (!token || !/^[A-Za-z0-9]{16,128}$/.test(token)) return null;
  return `<?xml version="1.0"?>
<users>
  <user>${token}</user>
</users>
`;
}
