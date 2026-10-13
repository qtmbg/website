import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {picture,preloadPicture,bySlug} from '../src/archive/render.mjs';
test('the responsive case hero preload matches the displayed image, without promoting gallery images',()=>{
 const id=bySlug.get('selvaggi').cover;
 const image=picture(id,'en',{eager:true});
 const hint=preloadPicture(id);
 assert.ok(image && hint);
 assert.equal(image.match(/src="([^"]+)"/)[1],hint.match(/href="([^"]+)"/)[1]);
 assert.equal(image.match(/srcset="([^"]+)"/)[1],hint.match(/imagesrcset="([^"]+)"/)[1]);
 assert.equal(image.match(/sizes="([^"]+)"/)[1],hint.match(/imagesizes="([^"]+)"/)[1]);
 assert.match(image,/fetchpriority="high"/);
 assert.match(picture(id,'en'),/loading="lazy"/);
 assert.doesNotMatch(picture(id,'en'),/fetchpriority="high"/);
 assert.equal(preloadPicture('unverified-or-private'), '');
});
test('the shipped stylesheet is smaller while retaining accessible interaction states',()=>{
 const original=readFileSync(new URL('../assets/desktop.css',import.meta.url));
 const shipped=readFileSync(new URL('../dist/assets/desktop.css',import.meta.url));
 assert.ok(shipped.length < original.length);
 const css=shipped.toString();
 assert.match(css,/focus-visible/);
 assert.match(css,/prefers-reduced-motion/);
 assert.match(css,/text-underline-offset/);
});
