/* ==========================================================================
   LOOM & LIGHT — BLOG DETAILS PAGE SCRIPT
   Reading progress bar + active table-of-contents highlighting.
   Newsletter submit is handled globally by global.js (data-ajax-form).
   ========================================================================== */

(function () {
  'use strict';

  function initReadingProgress() {
    var bar = document.querySelector('[data-reading-progress]');
    var article = document.querySelector('.article-content');
    if (!bar || !article) return;

    function update() {
      var rect = article.getBoundingClientRect();
      var articleTop = rect.top + window.scrollY;
      var articleHeight = article.offsetHeight;
      var viewportHeight = window.innerHeight;
      var scrolled = window.scrollY - articleTop + viewportHeight * 0.5;
      var percent = Math.min(100, Math.max(0, (scrolled / articleHeight) * 100));
      bar.style.width = percent + '%';
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  function initTocHighlight() {
    var links = document.querySelectorAll('.sidebar-toc a');
    if (!links.length) return;

    var headings = Array.prototype.map.call(links, function (link) {
      var id = link.getAttribute('href').replace('#', '');
      return document.getElementById(id);
    }).filter(Boolean);

    if (!headings.length) return;

    function update() {
      var scrollPos = window.scrollY + 140;
      var activeIndex = 0;
      headings.forEach(function (heading, i) {
        if (heading.offsetTop <= scrollPos) activeIndex = i;
      });
      links.forEach(function (link, i) {
        link.classList.toggle('is-active', i === activeIndex);
      });
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReadingProgress();
    initTocHighlight();
  });
})();
