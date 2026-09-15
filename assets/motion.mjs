// Presentation enhancement: no navigation interception and no hidden content.
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const root = document.documentElement;
const stages = [...document.querySelectorAll('.visual-scene,.kinetic-stage,.method-grid>article,.visual-territory,.lab-card,.case-art,.visual-founder-poster')];
const visible = new Set();
const played = new WeakSet();
const reveals = new Set();
const pendingPointers = new Map();
const gallery = document.querySelector('.process-gallery');
const processCards = [...document.querySelectorAll('[data-process]')];
let activePointer = null;
let frame = 0;
let observer;

stages.forEach(stage => stage.classList.add('kinetic-stage'));

function allowed() { return !preference.matches && !document.hidden; }
function schedule() {
  if (!allowed() || frame) return;
  frame = requestAnimationFrame(update);
}
function update() {
  frame = 0;
  if (!allowed()) return;
  const distance = Math.max(1, root.scrollHeight - innerHeight);
  root.style.setProperty('--read-progress', Math.min(1, scrollY / distance));
  // Read all geometry before writing custom properties.
  const depths = [...visible].filter(el => el.matches('.visual-scene'))
    .map(el => [el, Math.max(-18, Math.min(18, (innerHeight / 2 - el.getBoundingClientRect().top) * .035))]);
  for (const [el, depth] of depths) el.style.setProperty('--depth', `${depth}px`);
  for (const [el, point] of pendingPointers) {
    el.style.setProperty('--pointer-x', point.x);
    el.style.setProperty('--pointer-y', point.y);
    el.style.setProperty('--tilt-x', `${point.x * 4}deg`);
    el.style.setProperty('--tilt-y', `${point.y * -3}deg`);
  }
  pendingPointers.clear();
}
function resetPointer(el, resetDepth = false) {
  ['--pointer-x','--pointer-y','--tilt-x','--tilt-y'].forEach(key => el.style.removeProperty(key));
  if (resetDepth) el.style.removeProperty('--depth');
  pendingPointers.delete(el);
}
for (const el of stages) {
  el.addEventListener('pointermove', event => {
    if (!allowed() || !finePointer.matches || event.pointerType !== 'mouse') return;
    const bounds = el.getBoundingClientRect();
    pendingPointers.set(el, {x: (event.clientX - bounds.left) / bounds.width - .5, y: (event.clientY - bounds.top) / bounds.height - .5});
    schedule();
  }, {passive:true});
  el.addEventListener('pointerleave', () => resetPointer(el));
  el.addEventListener('pointercancel', () => resetPointer(el));
}

// A decorative counterpart to the fully readable method below. Horizontal
// scrubbing directly opens panels; vertical touch scrolling stays native.
function selectProcess(index) {
  processCards.forEach((card,i) => card.classList.toggle('is-selected', i === index));
}
function scrubProcess(event) {
  if (!allowed() || !gallery) return;
  if (event.pointerType !== 'mouse' && activePointer !== event.pointerId) return;
  const hit=document.elementFromPoint(event.clientX,event.clientY)?.closest('[data-process]');
  if (hit && gallery.contains(hit)) selectProcess(Number(hit.dataset.process));
}
gallery?.addEventListener('pointermove', scrubProcess, {passive:true});
gallery?.addEventListener('pointerdown', event => {
  if (!allowed() || event.button !== 0) return;
  activePointer=event.pointerId;
  gallery.setPointerCapture(event.pointerId);
  gallery.classList.add('is-dragging');
  scrubProcess(event);
});
function releaseProcess() {
  const pointer = activePointer;
  activePointer=null;
  if (pointer !== null && gallery?.hasPointerCapture(pointer)) gallery.releasePointerCapture(pointer);
  gallery?.classList.remove('is-dragging');
}
gallery?.addEventListener('pointerup', releaseProcess);
gallery?.addEventListener('pointercancel', releaseProcess);
gallery?.addEventListener('lostpointercapture', releaseProcess);
document.querySelectorAll('.brief-form textarea,.brief-form input').forEach(field => {
  field.addEventListener('input', () => { field.dataset.filled=String(Boolean(field.value.trim())); });
});

function reveal(el) {
  if (played.has(el) || !allowed() || !el.animate) return;
  played.add(el);
  const animation = el.animate([
    {opacity:.4, transform:'translateY(12px)'},
    {opacity:1, transform:'translateY(0)'}
  ], {duration:480, easing:'cubic-bezier(.16,1,.3,1)'});
  reveals.add(animation);
  animation.finished.catch(() => {}).finally(() => reveals.delete(animation));
}

function configure() {
  releaseProcess();
  observer?.disconnect();
  cancelAnimationFrame(frame); frame = 0;
  pendingPointers.clear(); visible.clear();
  for (const animation of reveals) animation.cancel();
  reveals.clear();
  stages.forEach(el => { resetPointer(el, true); el.classList.remove('is-in-view'); });
  if (preference.matches) {
    document.querySelectorAll('main,.kinetic-stage.has-entered img').forEach(el => el.classList.add('motion-complete'));
  }
  root.classList.toggle('motion-ready', !preference.matches);
  if (preference.matches) { root.style.removeProperty('--read-progress'); return; }
  if (!('IntersectionObserver' in window)) return;
  observer = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      target.classList.toggle('is-in-view', isIntersecting);
      if (isIntersecting) {
        target.classList.add('has-entered');
        visible.add(target);
        if (target.dataset.reveal !== undefined) reveal(target);
      } else {
        visible.delete(target); resetPointer(target, true);
      }
    }
    schedule();
  }, {threshold:.08});
  const targets = document.querySelectorAll('.hero h1,.hero-description,.page-head h1,.page-head .standfirst,.section-heading,.case-info,.essay-list>a,.format-list article,.case-stages article,.quote-grid figure,.fork-option');
  targets.forEach(el => {el.dataset.reveal = ''; observer.observe(el);});
  stages.forEach(el => observer.observe(el));
  schedule();
}
function visibility() {
  root.classList.toggle('motion-suspended', document.hidden);
  if (document.hidden) {
    cancelAnimationFrame(frame); frame = 0;
    pendingPointers.clear();
    for (const animation of reveals) animation.pause();
  } else {
    if (!preference.matches) for (const animation of reveals) animation.play();
    schedule();
  }
}
addEventListener('scroll', schedule, {passive:true});
addEventListener('resize', schedule, {passive:true});
document.addEventListener('visibilitychange', visibility);
preference.addEventListener('change', configure);
document.addEventListener('animationend', event => {
  if (['page-in','aperture-arrive','object-arrive'].includes(event.animationName)) event.target.classList.add('motion-complete');
});
finePointer.addEventListener('change', () => stages.forEach(el => resetPointer(el)));
addEventListener('pagehide', () => { cancelAnimationFrame(frame); frame = 0; });
addEventListener('pageshow', visibility);
configure(); visibility();
