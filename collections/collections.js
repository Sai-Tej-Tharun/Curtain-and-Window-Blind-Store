/* ==========================================================================
   LOOM & LIGHT — COLLECTIONS PAGE JS
   Page-specific behaviour only. Shared UI (theme, RTL, nav, mobile menu,
   header scroll state, form feedback) lives in global.js and is already
   initialized from there — do not duplicate it here.
   ========================================================================== */

(function () {
  'use strict';

  function initCollectionsFilter() {
    var filterBar = document.querySelector('[data-collections-filter]');
    var grid = document.querySelector('[data-collections-grid]');
    var emptyState = document.querySelector('[data-collections-empty]');
    if (!filterBar || !grid) return;

    var buttons = filterBar.querySelectorAll('[data-filter]');
    var cards = grid.querySelectorAll('[data-category]');

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;

      var value = btn.getAttribute('data-filter');

      buttons.forEach(function (b) {
        var isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-selected', String(isActive));
      });

      var visibleCount = 0;
      cards.forEach(function (card) {
        var matches = value === 'all' || card.getAttribute('data-category') === value;
        card.classList.toggle('is-hidden', !matches);
        if (matches) visibleCount++;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCollectionsFilter();
  });
})();
