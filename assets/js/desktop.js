(function () {
  'use strict';

  /* ── Clock ── */
  const clockEl = document.getElementById('clock');
  if (clockEl) {
    const tick = () => {
      clockEl.textContent = new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ── Panel system ── */
  const panel   = document.getElementById('section-panel');
  const overlay = document.getElementById('panel-overlay');
  const titleEl = document.getElementById('panel-title');
  const closeBtn = document.getElementById('panel-close');

  if (!panel) return;

  const icons = Array.from(document.querySelectorAll('.icon-item[data-section]'));

  function openSection(sectionId, label) {
    // deactivate all sections
    document.querySelectorAll('.panel-section').forEach(s => s.classList.remove('is-active'));

    const target = document.getElementById('section-' + sectionId);
    if (target) target.classList.add('is-active');

    if (titleEl) titleEl.textContent = label;

    icons.forEach(i => i.classList.remove('is-active'));
    const activeIcon = document.querySelector('.icon-item[data-section="' + sectionId + '"]');
    if (activeIcon) activeIcon.classList.add('is-active');

    panel.classList.add('is-open');
    overlay.classList.add('is-visible');
    panel.removeAttribute('aria-hidden');
    if (closeBtn) closeBtn.focus();
  }

  function closeSection() {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    panel.setAttribute('aria-hidden', 'true');
    icons.forEach(i => i.classList.remove('is-active'));

    // return focus to the last clicked icon
    if (lastFocused) lastFocused.focus();
  }

  let lastFocused = null;

  icons.forEach(icon => {
    icon.addEventListener('click', () => {
      const id    = icon.dataset.section;
      const label = icon.dataset.label;

      // toggle off if already open
      if (panel.classList.contains('is-open') && icon.classList.contains('is-active')) {
        closeSection();
        return;
      }

      lastFocused = icon;
      openSection(id, label);
    });

    icon.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        icon.click();
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeSection);
  overlay.addEventListener('click', closeSection);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closeSection();
  });

  /* ── Lightbox ── */
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.spread-item[data-src]').forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.src;
        lightboxImg.alt = item.dataset.caption || '';
        lightbox.classList.add('is-open');
        if (lightboxClose) lightboxClose.focus();
      });

      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); }
      });
    });

    const closeLightbox = () => lightbox.classList.remove('is-open');
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }
})();
