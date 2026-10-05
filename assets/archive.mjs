// The Work archive's behaviour. Progressive enhancement only: without this
// file every project is listed, every image opens on its own and every film
// opens at its source. Nothing plays or loads from elsewhere until asked.
const fr = document.documentElement.lang === 'fr';
const t = (en, f) => (fr ? f : en);

/* ------------------------------------------------------------- Finder */
// Category and era filters. The grid stays whole until a filter is chosen.
for (const finder of document.querySelectorAll('[data-archive]')) {
  const panel = finder.querySelector('.finder-filter-panel');
  if (panel) {
    const phone = matchMedia('(max-width: 599.98px)');
    panel.open = !phone.matches;
    phone.addEventListener('change', () => { panel.open = !phone.matches; });
  }
  const buttons = [...finder.querySelectorAll('[data-filter]')];
  const items = [...finder.querySelectorAll('.finder-item')];
  const groups = [...finder.querySelectorAll('.finder-group')];
  const count = finder.querySelector('[data-count]');
  const active = { cats: null, era: null };
  const apply = (kind, value) => {
    if (kind === 'all') { active.cats = null; active.era = null; }
    else active[kind] = active[kind] === value ? null : value;
    let shown = 0;
    for (const item of items) {
      const match = Object.entries(active).every(([key, selected]) => !selected || (item.dataset[key] || '').split(' ').includes(selected));
      item.hidden = !match;
      if (match) shown += 1;
    }
    for (const group of groups) group.hidden = !group.querySelector('.finder-item:not([hidden])');
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === 'all' ? !active.cats && !active.era : active[button.dataset.filter] === button.dataset.value)));
    if (count) count.textContent = t(`${shown} ${shown === 1 ? 'project' : 'projects'}`, `${shown} ${shown === 1 ? 'projet' : 'projets'}`);
  };
  for (const button of buttons) button.addEventListener('click', () => apply(button.dataset.filter, button.dataset.value));
}

/* --------------------------------------------------------- Quick Look */
// Images open in a window over the page; arrows move through the set on the
// page, Escape closes it, focus returns to the image that opened it.
const openers = [...document.querySelectorAll('.artifact-open')];
if (openers.length && 'HTMLDialogElement' in window) {
  const dialog = document.createElement('dialog');
  dialog.className = 'quicklook';
  dialog.setAttribute('aria-label', t('Image viewer', 'Visionneuse'));
  dialog.innerHTML = `<div class="quicklook-bar"><span class="quicklook-title"></span><button class="quicklook-prev" type="button" aria-label="${t('Previous image', 'Image précédente')}"></button><button class="quicklook-next" type="button" aria-label="${t('Next image', 'Image suivante')}"></button><button class="quicklook-close" type="button" aria-label="${t('Close', 'Fermer')}"></button></div><figure><img alt=""><figcaption></figcaption></figure>`;
  document.body.append(dialog);
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  const title = dialog.querySelector('.quicklook-title');
  let index = 0;
  let opener = null;
  const show = i => {
    index = (i + openers.length) % openers.length;
    const link = openers[index];
    const source = link.querySelector('img');
    image.src = link.getAttribute('href');
    image.alt = source?.alt || '';
    caption.textContent = link.closest('figure')?.querySelector('figcaption')?.textContent || '';
    title.textContent = `${index + 1} / ${openers.length}`;
  };
  openers.forEach((link, i) => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    opener = link;
    show(i);
    dialog.showModal();
  }));
  dialog.querySelector('.quicklook-prev').addEventListener('click', () => show(index - 1));
  dialog.querySelector('.quicklook-next').addEventListener('click', () => show(index + 1));
  dialog.querySelector('.quicklook-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); opener?.focus(); });
}

/* -------------------------------------------------------------- films */
// A poster until pressed, then the film from its source, privacy-enhanced.
for (const film of document.querySelectorAll('a.film[data-youtube]')) {
  film.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(film.dataset.youtube)}?autoplay=1&rel=0`;
    frame.title = film.querySelector('.film-meta')?.textContent.trim() || 'Film';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    const box = document.createElement('div');
    box.className = film.className;
    box.append(frame);
    film.replaceWith(box);
    frame.focus();
  });
}

// Reviewed local films use the same click-to-load interaction.
for (const film of document.querySelectorAll('a.film[data-video]')) {
  film.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'none';
    video.playsInline = true;
    video.src = film.dataset.video;
    const poster = film.querySelector('img');
    if (poster) video.poster = poster.currentSrc || poster.src;
    video.setAttribute('aria-label', film.querySelector('.film-meta')?.textContent.trim() || t('Archive film', 'Film des archives'));
    const box = document.createElement('div');
    box.className = film.className;
    box.append(video);
    film.replaceWith(box);
    video.focus();
  });
}
