/* ==========================================================================
   LOOM & LIGHT — CUSTOM SIZING PAGE SCRIPT
   Highlights the matching part of the measurement diagram as each
   accordion item opens. Global accordion open/close logic lives in
   global.js (data-accordion-trigger / data-accordion-item); this file
   only reacts to it.
   ========================================================================== */

(function () {
  'use strict';

  function initGuideHighlight() {
    var items = document.querySelectorAll('.cs-guide-accordion [data-accordion-item]');
    var svg = document.querySelector('[data-guide-svg]');
    if (!items.length || !svg) return;

    function highlightFrom(item) {
      var target = item.getAttribute('data-highlight');
      if (target) svg.setAttribute('data-active', target);
    }

    items.forEach(function (item) {
      var trigger = item.querySelector('[data-accordion-trigger]');
      if (!trigger) return;
      trigger.addEventListener('click', function () { highlightFrom(item); });
      if (item.classList.contains('is-open')) highlightFrom(item);
    });
  }

  document.addEventListener('DOMContentLoaded', initGuideHighlight);
})();
