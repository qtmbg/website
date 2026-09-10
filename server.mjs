// Local preview server for dist/. Mirrors Vercel's cleanUrls behaviour.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const port = Number(process.env.PORT || 3017);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.pdf': 'application/pdf',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.ico': 'image/x-icon'
};

const readable = async file => {
  try { return (await stat(file)).isFile() ? file : null; } catch { return null; }
};

// A request path resolves to an exact file, then <path>.html, then <path>/index.html.
async function resolve(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const relative = path.normalize(decodeURIComponent(clean)).replace(/^(\.\.[/\\])+/, '');
  const base = path.join(dist, relative);
  if (!base.startsWith(dist)) return null;
  if (clean === '/') return readable(path.join(dist, 'index.html'));
  return (await readable(base)) || (await readable(`${base}.html`)) || readable(path.join(base, 'index.html'));
}

http.createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, 'http://localhost');
    const file = await resolve(pathname);
    if (!file) {
      const fallback = await readable(path.join(dist, 'index.html'));
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fallback ? await readFile(fallback) : 'Not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache'
    });
    res.end(await readFile(file));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Server error: ${error.message}`);
  }
}).listen(port, '127.0.0.1', () => console.log(`Quantum Branding → http://localhost:${port}`));
