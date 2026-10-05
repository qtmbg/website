// The desktop's behaviour. Progressive enhancement only: every page reads
// whole without this file. No navigation is intercepted, nothing plays on its
// own, and nothing is sent anywhere. Owner direction, 4 October 2026.
const root = document.documentElement;
const lang = root.lang === 'fr' ? 'fr' : 'en';
const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const desk = matchMedia('(min-width: 1000px)');

/* ------------------------------------------------------------ live time */
// The menu bar, the clock and both calendars show the visitor's own time and
// change once a minute, as a desktop clock does.
const menubarClock = document.querySelector('[data-menubar-clock]');
const hourHand = document.querySelector('[data-clock] .hand-hour');
const minuteHand = document.querySelector('[data-clock] .hand-minute');
const calendar = document.querySelector('[data-calendar]');
const calendarTile = document.querySelector('.site-header .contact-link');
const format = options => new Intl.DateTimeFormat(locale, options);
const dayMonth = format({ weekday: 'short', month: 'short', day: 'numeric' });
const clockTime = format({ hour: 'numeric', minute: '2-digit' });
const weekdayLong = format({ weekday: 'long' });
const weekdayShort = format({ weekday: 'short' });
const weekdayNarrow = format({ weekday: 'narrow' });
let tick = 0;

function monthGrid(now) {
  // Weeks start on Sunday in English and on Monday in French.
  const first = lang === 'fr' ? 1 : 0;
  const cells = [];
  for (let i = 0; i < 7; i += 1) cells.push(`<span>${weekdayNarrow.format(new Date(2026, 1, 1 + ((first + i) % 7)))}</span>`);
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const offset = (start.getDay() - first + 7) % 7;
  const length = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  for (let i = 0; i < offset; i += 1) cells.push('<span></span>');
  for (let d = 1; d <= length; d += 1) cells.push(`<span${d === now.getDate() ? ' class="is-today"' : ''}>${d}</span>`);
  return cells.join('');
}

function paintTime() {
  const now = new Date();
  if (menubarClock) menubarClock.textContent = `${dayMonth.format(now)}  ${clockTime.format(now)}`;
  if (hourHand && minuteHand) {
    const minutes = now.getMinutes();
    hourHand.style.setProperty('--a', `${((now.getHours() % 12) + minutes / 60) * 30}deg`);
    minuteHand.style.setProperty('--a', `${minutes * 6}deg`);
  }
  if (calendar) {
    calendar.querySelector('[data-cal-day]').textContent = weekdayLong.format(now);
    calendar.querySelector('[data-cal-date]').textContent = String(now.getDate());
    calendar.querySelector('[data-cal-grid]').innerHTML = monthGrid(now);
  }
  if (calendarTile) {
    calendarTile.dataset.day = weekdayShort.format(now).replace('.', '');
    calendarTile.dataset.date = String(now.getDate());
  }
}
function scheduleTime() {
  clearTimeout(tick);
  if (document.hidden) return;
  paintTime();
  const now = new Date();
  tick = setTimeout(scheduleTime, (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 30);
}

/* ------------------------------------------------------------------ dock */
// Magnification as in the reference: every tile within 100px of the pointer
// grows towards 60px on an overdamped spring, the bar grows with it, the page
// does not move. Mouse only; off when reduced motion is requested.
const dock = document.querySelector('.site-header');
const tiles = dock ? [...dock.querySelectorAll('.wordmark, #site-nav a, .language-link, .contact-link')] : [];
const REST = 40, PEAK = 60, RANGE = 100, K = 180, C = 13, M = 0.1;
const springs = tiles.map(el => ({ el, x: REST, v: 0 }));
let pointerX = Infinity;
let raf = 0;
let last = 0;

const tip = document.createElement('div');
tip.className = 'dock-tip';
tip.setAttribute('aria-hidden', 'true');
tip.hidden = true;
let tipFor = null;

function placeTip() {
  if (!tipFor) return;
  const box = tipFor.getBoundingClientRect();
  const below = box.top < innerHeight / 2;
  tip.style.left = `${box.left + box.width / 2 - tip.offsetWidth / 2}px`;
  tip.style.top = `${below ? box.bottom + 11.5 : box.top - 36}px`;
}
function showTip(el) {
  if (!el?.dataset.tip || dock.classList.contains('menu-open')) return;
  tipFor = el;
  tip.textContent = el.dataset.tip;
  tip.hidden = false;
  placeTip();
}
function hideTip(el) {
  if (el && el !== tipFor) return;
  tipFor = null;
  tip.hidden = true;
}

function magnifies() { return !reduce.matches && desk.matches; }
function step(now) {
  const dt = Math.min(0.05, (now - (last || now)) / 1000 || 1 / 60);
  last = now;
  let moving = false;
  let tallest = REST;
  for (const s of springs) {
    let goal = REST;
    if (pointerX !== Infinity) {
      const box = s.el.getBoundingClientRect();
      goal = REST + (PEAK - REST) * Math.max(0, 1 - Math.abs(pointerX - (box.left + box.width / 2)) / RANGE);
    }
    const n = Math.max(1, Math.ceil(dt / 0.004));
    for (let i = 0; i < n; i += 1) {
      const h = dt / n;
      const a = (-K * (s.x - goal) - C * s.v) / M;
      s.v += a * h;
      s.x += s.v * h;
    }
    if (Math.abs(s.x - goal) > 0.01 || Math.abs(s.v) > 0.5) moving = true;
    else { s.x = goal; s.v = 0; }
    s.el.style.width = s.el.style.height = `${s.x.toFixed(2)}px`;
    tallest = Math.max(tallest, s.x);
  }
  dock.style.setProperty('--bar-h', `${(tallest + 18).toFixed(2)}px`);
  placeTip();
  if (moving) raf = requestAnimationFrame(step);
  else {
    raf = 0;
    last = 0;
    if (pointerX === Infinity) resetTiles();
  }
}
function kick() { if (!raf) raf = requestAnimationFrame(step); }
function resetTiles() {
  cancelAnimationFrame(raf);
  raf = 0;
  last = 0;
  for (const s of springs) { s.x = REST; s.v = 0; s.el.style.removeProperty('width'); s.el.style.removeProperty('height'); }
  dock?.style.removeProperty('--bar-h');
}
if (dock) {
  document.body.append(tip);
  dock.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !magnifies()) return;
    pointerX = event.clientX;
    kick();
  });
  dock.addEventListener('pointerleave', () => {
    if (pointerX === Infinity) return;
    pointerX = Infinity;
    kick();
  });
  for (const el of tiles) {
    el.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') showTip(el); });
    el.addEventListener('pointerleave', () => hideTip(el));
    el.addEventListener('focus', () => { if (el.matches(':focus-visible')) showTip(el); });
    el.addEventListener('blur', () => hideTip(el));
  }
  addEventListener('scroll', () => placeTip(), { passive: true });
}

/* ------------------------------------------------------------ the player */
// Now reading: the essays, one at a time. Steps only when asked.
const player = document.querySelector('[data-player]');
if (player) {
  const tracks = [...player.querySelectorAll('[data-track]')];
  const links = [...player.querySelectorAll('[data-player-link]')];
  const number = player.querySelector('[data-player-no]');
  const position = player.querySelector('[data-player-pos]');
  const progress = player.querySelector('.player-progress');
  let current = 0;
  const show = index => {
    current = (index + tracks.length) % tracks.length;
    tracks.forEach((track, i) => { track.hidden = i !== current; });
    const href = tracks[current].getAttribute('href');
    links.forEach(link => link.setAttribute('href', href));
    const label = String(current + 1).padStart(2, '0');
    if (number) number.textContent = label;
    if (position) position.textContent = label;
    progress?.style.setProperty('--p', current + 1);
  };
  player.querySelectorAll('[data-player-step]').forEach(button => {
    button.addEventListener('click', () => show(current + Number(button.dataset.playerStep)));
  });
  show(0);
}

/* --------------------------------------------------------- the desktop */
// Widgets and folders move with a mouse or pen, as on the reference: a 3px
// threshold, the pressed item comes to the front, it stays where it is
// dropped, inside the board. A press without movement is an ordinary click.
// Positions are not kept: a new visit starts with a tidy desk.
const board = document.querySelector('.desktop');
const movable = [...document.querySelectorAll('.desk-scene .widget, .desk-scene .desk-icon')];
const order = [];
for (const item of movable) {
  let start = null;
  let moved = false;
  item.addEventListener('pointerdown', event => {
    if (!desk.matches || event.button !== 0 || event.pointerType === 'touch') return;
    const [x = 0, y = 0] = (item.style.translate || '0px 0px').split(' ').map(parseFloat);
    start = { px: event.clientX, py: event.clientY, x, y, id: event.pointerId };
    moved = false;
    const at = order.indexOf(item);
    if (at >= 0) order.splice(at, 1);
    order.push(item);
    order.forEach((el, i) => { el.style.zIndex = String(21 + i); });
  });
  item.addEventListener('pointermove', event => {
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.px;
    const dy = event.clientY - start.py;
    if (!moved && Math.hypot(dx, dy) < 3) return;
    if (!moved) { moved = true; item.setPointerCapture(event.pointerId); item.classList.add('is-dragging'); }
    const area = board.getBoundingClientRect();
    const box = item.getBoundingClientRect();
    const [cx = 0, cy = 0] = (item.style.translate || '0px 0px').split(' ').map(parseFloat);
    const left = box.left - cx;
    const top = box.top - cy;
    const nx = Math.min(Math.max(start.x + dx, area.left - left), area.right - box.width - left);
    const ny = Math.min(Math.max(start.y + dy, area.top - top), area.bottom - box.height - top);
    item.style.translate = `${Math.round(nx)}px ${Math.round(ny)}px`;
  });
  const release = event => {
    if (!start || (event && event.pointerId !== start.id)) return;
    item.classList.remove('is-dragging');
    start = null;
  };
  item.addEventListener('pointerup', release);
  item.addEventListener('pointercancel', release);
  item.addEventListener('lostpointercapture', release);
  // A drag that ends over a link must not follow it.
  item.addEventListener('click', event => {
    if (!moved) return;
    event.preventDefault();
    event.stopPropagation();
    moved = false;
  }, true);
}
desk.addEventListener('change', () => movable.forEach(item => { item.style.removeProperty('translate'); item.style.removeProperty('z-index'); }));
document.querySelectorAll('.desk-scene :is(.widget,.desk-icon)').forEach((el, i) => el.style.setProperty('--n', i));

/* --------------------------------------------------------------- reveals */
// The reference's reveal: 20px and transparent, then in over 700ms, once.
const revealSelector = [
  '.section-heading', '.section>h2', '.press-band .field-hint', '.method-grid>article', '.visual-territory',
  '.format-list>article', '.essay-list>a', '.history-list>article:not(.visual-territory)', '.career-list>li',
  '.quote-grid>figure', '.fork-option', '.lab-card', '.related', '.contact-line'
].join(',');
let observer;
function configure() {
  observer?.disconnect();
  const motion = !reduce.matches && 'IntersectionObserver' in window;
  root.classList.toggle('motion-ready', motion);
  if (!motion) resetTiles();
  const targets = [...document.querySelectorAll(revealSelector)].filter(el => !el.closest('body[data-page="practice-method"] .method-grid'));
  if (!motion) {
    targets.forEach(el => { el.classList.add('is-revealed'); el.removeAttribute('data-reveal'); });
    return;
  }
  observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      target.classList.add('is-revealed');
      observer.unobserve(target);
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
  for (const el of targets) {
    if (el.classList.contains('is-revealed')) continue;
    const siblings = [...el.parentElement.children].filter(child => child.matches(revealSelector));
    el.style.setProperty('--delay', `${Math.min(Math.max(siblings.indexOf(el), 0), 5) * 80}ms`);
    el.dataset.reveal = '';
    observer.observe(el);
  }
}

/* ------------------------------------------------------------ the brief */
document.querySelectorAll('.brief-form textarea,.brief-form input').forEach(field => {
  field.addEventListener('input', () => { field.dataset.filled = String(Boolean(field.value.trim())); });
});

/* ---------------------------------------------------------------- wiring */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) clearTimeout(tick);
  else scheduleTime();
});
reduce.addEventListener('change', configure);
desk.addEventListener('change', resetTiles);
addEventListener('pageshow', scheduleTime);
configure();
scheduleTime();
