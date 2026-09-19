/* ==========================================================================
   LOOM & LIGHT — HOME 1 PAGE SCRIPT
   Hero "Unveiling" choreography + cursor-follow curtain parallax + stat counters.
   Loads after ../global-js/global.js.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  /* ------------------------------------------------------------------------
     HERO REVEAL
     A short pause on load, then the curtains open and the copy fades up.
     Once the opening animation finishes, control of the curtains' transform
     hands off to a live CSS variable (--parallax) driven by the pointer.
     ------------------------------------------------------------------------ */
  function initHeroReveal() {
    var stage = document.querySelector('.hero-stage');
    if (!stage) return;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        stage.classList.add('hero-animate');
      });
    });

    var leftCurtain = stage.querySelector('.curtain-left');
    if (leftCurtain) {
      leftCurtain.addEventListener('animationend', function (e) {
        if (e.animationName === 'curtainOpenLeft') {
          stage.classList.add('parallax-ready');
          initCurtainParallax(stage);
        }
      });
    } else {
      initCurtainParallax(stage);
    }

    var cue = stage.querySelector('[data-scroll-cue]');
    if (cue) {
      cue.addEventListener('click', function () {
        var next = document.querySelector('.hero').nextElementSibling;
        if (next) next.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    }
  }

  /* ------------------------------------------------------------------------
     CURSOR-FOLLOW PARALLAX
     The gathered curtain panels drift a few pixels toward the pointer,
     smoothed with a simple lerp so the motion feels like fabric, not a snap.
     ------------------------------------------------------------------------ */
  function initCurtainParallax(stage) {
    if (reduceMotion || !hasFinePointer) return;

    var current = 0;
    var target = 0;
    var maxShift = 16;
    var maxTilt = 4;           // degrees of 3D hinge-tilt at full cursor travel
    var bgDriftRatio = -0.16;  // background drifts a touch opposite the curtains, for depth
    var raf = null;

    function readMaxShift() {
      var v = parseFloat(getComputedStyle(stage).getPropertyValue('--hero-max-shift'));
      maxShift = isNaN(v) ? 16 : v;
    }
    readMaxShift();
    window.addEventListener('resize', readMaxShift);

    function onPointerMove(e) {
      var rect = stage.getBoundingClientRect();
      var fromCenter = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      target = Math.max(-1, Math.min(1, fromCenter * 2)) * maxShift;
    }

    function onPointerLeave() {
      target = 0;
    }

    function tick() {
      current += (target - current) * 0.07;
      if (Math.abs(target - current) < 0.01) current = target;
      stage.style.setProperty('--parallax', current.toFixed(2));
      stage.style.setProperty('--tilt', (current / maxShift * maxTilt).toFixed(2));
      stage.style.setProperty('--bg-drift', (current * bgDriftRatio).toFixed(2));
      raf = requestAnimationFrame(tick);
    }

    stage.addEventListener('mousemove', onPointerMove);
    stage.addEventListener('mouseleave', onPointerLeave);
    raf = requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------------
     STAT COUNTERS — count up once when the impact section enters view
     ------------------------------------------------------------------------ */
  function initStatCounters() {
    var stats = document.querySelectorAll('[data-count-to]');
    if (!stats.length) return;

    if (!('IntersectionObserver' in window) || reduceMotion) {
      stats.forEach(function (el) { el.textContent = el.getAttribute('data-count-to') + (el.getAttribute('data-count-suffix') || ''); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    stats.forEach(function (el) { observer.observe(el); });

    function animateCount(el) {
      var target = parseFloat(el.getAttribute('data-count-to'));
      var suffix = el.getAttribute('data-count-suffix') || '';
      var duration = 1400;
      var start = null;

      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeroReveal();
    initStatCounters();
  });
})();
