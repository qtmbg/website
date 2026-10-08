// Progressive enhancement only: the mobile menu and the brief instrument.
// Nothing on this page sends data anywhere. Answers stay in this browser
// until you copy them, download them or open an email you send yourself.
import { buildBrief, contactEmail } from '/assets/shared.mjs';

const fr = document.documentElement.lang === 'fr';
const t = (en, frText) => (fr ? frText : en);

/* ------------------------------------------------------------ mobile menu */

const header = document.querySelector('.site-header');
const toggle = header?.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

function setMenu(open) {
  if (!header || !toggle) return;
  toggle.setAttribute('aria-expanded', String(open));
  header.classList.toggle('menu-open', open);
  toggle.textContent = open ? t('Close', 'Fermer') : t('Menu', 'Menu');
}

toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav?.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !header?.classList.contains('menu-open')) return;
  setMenu(false);
  toggle.focus();
});
document.addEventListener('click', event => {
  if (!header?.classList.contains('menu-open') || header.contains(event.target)) return;
  setMenu(false);
});
addEventListener('resize', () => { if (innerWidth > 800) setMenu(false); });

/* --------------------------------------------------------------- the brief */

const form = document.querySelector('#brief-form');
const output = document.querySelector('#brief-output');

if (form && output) {
  const status = output.querySelector('.form-status');
  const preview = output.querySelector('pre');
  const draft = output.querySelector('[data-email-draft]');
  let brief = '';
  // Keep the export complete. Mail clients impose differing URI limits; use a
  // conservative encoded length and offer the full copy/file for longer drafts.
  const draftHelp = document.createElement('p');
  draftHelp.id = 'email-draft-help';
  draftHelp.className = 'field-hint';
  draft?.parentElement.after(draftHelp);
  draft?.setAttribute('aria-describedby', draftHelp.id);
  draft?.addEventListener('click', event => {
    if (draft.getAttribute('aria-disabled') === 'true') event.preventDefault();
  });

  const say = message => { if (status) status.textContent = message; };

  form.addEventListener('input', event => event.target.setCustomValidity?.(''));

  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form));
    for (const key of ['change', 'result']) {
      const field = form.elements.namedItem(key);
      if (!field) continue;
      field.setCustomValidity(String(values[key] ?? '').trim() ? '' : t('Please add a few words.', 'Ajoutez quelques mots.'));
      if (!field.reportValidity()) return;
    }
    brief = buildBrief(values, fr ? 'fr' : 'en');
    preview.textContent = brief;
    output.hidden = false;
    if (draft && contactEmail) {
      // A draft the visitor sends. Nothing leaves the browser on its own.
      const uri = `mailto:${contactEmail}?subject=${encodeURIComponent(t('Quantum Branding · starting point', 'Quantum Branding · point de départ'))}&body=${encodeURIComponent(brief)}`;
      const fits = uri.length <= 2000;
      if (fits) {
        draft.href = uri;
        draft.removeAttribute('aria-disabled');
        draftHelp.textContent = t('Opens your email app with the complete brief. You send it yourself.',
          'Ouvre votre messagerie avec le brief complet. Vous l’envoyez vous-même.');
      } else {
        draft.removeAttribute('href');
        draft.setAttribute('aria-disabled', 'true');
        draft.setAttribute('tabindex', '0');
        draftHelp.textContent = t(`This brief is too long for a reliable email link. Copy the complete brief or download the .txt file, then send it to ${contactEmail}.`,
          `Ce brief est trop long pour un lien email fiable. Copiez le brief complet ou téléchargez le fichier .txt, puis envoyez-le à ${contactEmail}.`);
      }
      draft.setAttribute('role', 'link');
    }
    say(t('Nothing has been sent. Your complete brief is ready to copy or download.',
      'Rien n’a été envoyé. Votre brief complet est prêt à être copié ou téléchargé.'));
    output.querySelector('h2')?.focus();
  });

  output.querySelector('#copy-brief')?.addEventListener('click', async () => {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(brief);
      say(t('Brief copied.', 'Brief copié.'));
    } catch {
      say(t('Copying was blocked. Use the download button to keep your brief.',
        'La copie a été bloquée. Utilisez le téléchargement pour conserver votre brief.'));
    }
  });

  output.querySelector('#download-brief')?.addEventListener('click', () => {
    if (!brief) return;
    const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `quantum-brief-${fr ? 'fr' : 'en'}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    say(t('Brief downloaded.', 'Brief téléchargé.'));
  });

  output.querySelector('#edit-brief')?.addEventListener('click', () => {
    // Answers were never cleared, so editing simply returns to the form.
    form.elements.namedItem('change')?.focus();
    say('');
  });
}
