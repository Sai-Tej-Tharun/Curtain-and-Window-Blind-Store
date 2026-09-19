/* ==========================================================================
   LOOM & LIGHT — ABOUT PAGE JS
   Page-specific behaviour only. Shared UI (theme, RTL, nav, mobile menu,
   header scroll state, form feedback) lives in global.js and is already
   initialized from there — do not duplicate it here.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     Process timeline reveal
     One deliberate scroll-triggered moment: steps light up in order as the
     timeline enters view, instead of animating on every section of the page.
     ------------------------------------------------------------------------ */
  function initProcessReveal() {
    var steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      steps.forEach(function (step) { step.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var timeline = entry.target;
        var items = timeline.querySelectorAll('.process-step');
        items.forEach(function (step, i) {
          setTimeout(function () { step.classList.add('is-visible'); }, i * 120);
        });
        obs.unobserve(timeline);
      });
    }, { threshold: 0.3 });

    var timelineEl = document.querySelector('.process-timeline');
    if (timelineEl) observer.observe(timelineEl);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initProcessReveal();
  });
})();
