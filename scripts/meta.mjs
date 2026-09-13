// Shared metadata helpers: route identity, OG slugs, breadcrumbs.
import {origin, route} from '../src/shared.mjs';

// Route identity, reused for OG slugs and for the <body> styling hook.
export const routeSlug = basePath =>
  basePath === '/' ? 'home' : basePath.replace(/^\//, '').replace(/\//g, '-');

// Top-level branch of a route, e.g. /lab/signal-scan -> lab
export const routeSection = basePath =>
  basePath === '/' ? 'home' : basePath.split('/').filter(Boolean)[0];

export const ogSlug = (basePath, lang) => `${lang}-${routeSlug(basePath)}`;

export const canonical = (basePath, lang) => origin + route(basePath, lang);

export const crumbLabels = {
  '/practice': ['Practice', 'La pratique'],
  '/practice/method': ['The Collapse', 'The Collapse'],
  '/work': ['Work', 'Le travail'],
  '/thinking': ['Thinking', 'Les idées'],
  '/lab': ['Lab', 'Le Lab'],
  '/about': ['About', 'À propos'],
  '/start': ["Let's talk", 'Parlons-en'],
  '/notes': ['Notes', 'Notes']
};

// Ancestor chain for a route, e.g. /work/selvaggi -> ['/', '/work', '/work/selvaggi']
export function ancestors(basePath) {
  if (basePath === '/') return ['/'];
  const parts = basePath.split('/').filter(Boolean);
  const chain = ['/'];
  for (let i = 0; i < parts.length; i += 1) chain.push('/' + parts.slice(0, i + 1).join('/'));
  return chain;
}
