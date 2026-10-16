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
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg'
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
    const type = types[path.extname(file)] || 'application/octet-stream';
    const body = await readFile(file);
    // Honour Range requests (as Vercel's static serving does) so audio can seek.
    const range = req.headers.range;
    const match = range && /^bytes=(\d*)-(\d*)$/.exec(range);
    if (match) {
      const size = body.length;
      let start = match[1] === '' ? size - Number(match[2]) : Number(match[1]);
      let end = match[2] === '' || match[1] === '' ? size - 1 : Number(match[2]);
      if (Number.isNaN(start) || Number.isNaN(end) || start > end || start < 0 || end >= size) {
        res.writeHead(416, { 'Content-Range': `bytes */${size}`, 'Accept-Ranges': 'bytes' });
        res.end();
        return;
      }
      res.writeHead(206, {
        'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache',
        'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1
      });
      res.end(body.subarray(start, end + 1));
      return;
    }
    res.writeHead(200, {
      'Content-Type': type,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache',
      'Accept-Ranges': 'bytes'
    });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`Server error: ${error.message}`);
  }
}).listen(port, '127.0.0.1', () => console.log(`Quantum Branding → http://localhost:${port}`));
