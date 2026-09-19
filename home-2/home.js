/* ==========================================================================
   LOOM & LIGHT — HOME 2 PAGE SCRIPT
   Interactive "Light Control" comparison widget.
   Global behaviors (theme, RTL, nav, mobile menu, etc.) live in global.js.
   ========================================================================== */

(function () {
  'use strict';

  var COPY = {
    sheer: {
      title: 'Sheer',
      desc: 'Soft daylight and visual openness — ideal where you want a room to feel bright and open while softening direct sun.'
    },
    filtering: {
      title: 'Light Filtering',
      desc: 'Diffuses harsh sun into a warm, even glow — keeps rooms bright while cutting glare on screens and furniture.'
    },
    darkening: {
      title: 'Room Darkening',
      desc: 'Blocks most daylight for restful afternoons and better screen contrast, while still allowing soft ambient light in.'
    },
    blackout: {
      title: 'Blackout',
      desc: 'Engineered layers block light completely — privacy, comfort and controlled darkness for bedrooms and media rooms.'
    }
  };

  function initLightControl() {
    var widget = document.querySelector('[data-light-control]');
    if (!widget) return;

    var tabs = widget.querySelectorAll('.light-tab');
    var scrim = widget.querySelector('[data-light-scrim]');
    var meter = widget.querySelector('[data-light-meter]');
    var percentEl = widget.querySelector('[data-light-percent]');
    var titleEl = widget.querySelector('[data-light-title]');
    var descEl = widget.querySelector('[data-light-desc]');

    function setLevel(tab) {
      var level = tab.getAttribute('data-level');
      var key = tab.getAttribute('data-target');
      var info = COPY[key];
      if (!info) return;

      tabs.forEach(function (t) {
        var isActive = t === tab;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });

      if (scrim) scrim.style.height = level + '%';
      if (meter) meter.style.width = level + '%';
      if (percentEl) percentEl.textContent = level;
      if (titleEl) titleEl.textContent = info.title;
      if (descEl) descEl.textContent = info.desc;
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { setLevel(tab); });
    });

    // Keyboard support: left/right arrows move between tabs (standard tab pattern)
    widget.querySelector('.light-control-tabs').addEventListener('keydown', function (e) {
      var list = Array.prototype.slice.call(tabs);
      var currentIndex = list.findIndex(function (t) { return t.classList.contains('is-active'); });
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        var nextIndex = e.key === 'ArrowRight'
          ? (currentIndex + 1) % list.length
          : (currentIndex - 1 + list.length) % list.length;
        list[nextIndex].focus();
        setLevel(list[nextIndex]);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initLightControl);
})();
