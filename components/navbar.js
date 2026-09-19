/* ==========================================================================
   LOOM & LIGHT — NAVBAR JS
   Self-contained: paste this file (or its contents) once per page, right
   before </body>, after the navbar.html markup. No other script calls into
   this — it wires itself up on DOMContentLoaded.
   Breakpoint is 992px — keep this in sync with navbar.css.
   ========================================================================== */

(function () {
  'use strict';

  var BREAKPOINT = 992;
  var STORAGE_THEME = 'll-theme';
  var STORAGE_DIR = 'll-dir';
  var root = document.documentElement;

  document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('[data-llnav]');
    if (!header) return; // navbar markup not on this page — nothing to do

    initTheme(header);
    initDirection(header);
    initDropdown(header);
    initMobileMenu(header);
    initHeaderScroll(header);
    initActiveLink(header);
  });

  /* ------------------------------------------------------------------------
     THEME TOGGLE
     ------------------------------------------------------------------------ */
  function initTheme(header) {
    var saved = safeGet(STORAGE_THEME);
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);

    var toggles = header.querySelectorAll('[data-llnav-theme-toggle]');
    toggles.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        safeSet(STORAGE_THEME, next);
        toggles.forEach(function (b) { b.setAttribute('aria-pressed', String(next === 'dark')); });
      });
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  /* ------------------------------------------------------------------------
     RTL TOGGLE
     ------------------------------------------------------------------------ */
  function initDirection(header) {
    var saved = safeGet(STORAGE_DIR) || 'ltr';
    applyDirection(saved);

    var toggles = header.querySelectorAll('[data-llnav-rtl-toggle]');
    toggles.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(saved === 'rtl'));
      btn.addEventListener('click', function () {
        var next = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        applyDirection(next);
        safeSet(STORAGE_DIR, next);
        toggles.forEach(function (b) { b.setAttribute('aria-pressed', String(next === 'rtl')); });
      });
    });
  }

  function applyDirection(dir) {
    root.setAttribute('dir', dir);
  }

  /* ------------------------------------------------------------------------
     "HOME" DROPDOWN — click to toggle, hover to open on desktop,
     closes on outside click and on Escape.
     ------------------------------------------------------------------------ */
  function initDropdown(header) {
    var dropdown = header.querySelector('[data-llnav-dropdown]');
    var trigger = header.querySelector('[data-llnav-dropdown-trigger]');
    var menu = header.querySelector('[data-llnav-dropdown-menu]');
    if (!dropdown || !trigger || !menu) return;

    var closeTimer = null;

    function open() {
      clearTimeout(closeTimer);
      dropdown.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function close() {
      dropdown.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(close, 300);
    }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      dropdown.classList.contains('is-open') ? close() : open();
    });

    dropdown.addEventListener('mouseenter', function () {
      if (window.innerWidth >= BREAKPOINT) open();
    });
    dropdown.addEventListener('mouseleave', function () {
      if (window.innerWidth >= BREAKPOINT) scheduleClose();
    });

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ------------------------------------------------------------------------
     MOBILE MENU
     ------------------------------------------------------------------------ */
  function initMobileMenu(header) {
    var burger = header.querySelector('[data-llnav-burger]');
    var panel = header.querySelector('[data-llnav-panel]');
    var backdrop = header.querySelector('[data-llnav-backdrop]');
    if (!burger || !panel) return;

    function isOpen() { return panel.classList.contains('is-open'); }

    function openMenu() {
      panel.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Close menu');
      root.classList.add('llnav-lock');
    }

    function closeMenu() {
      panel.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
      root.classList.remove('llnav-lock');
    }

    burger.addEventListener('click', function () {
      isOpen() ? closeMenu() : openMenu();
    });

    if (backdrop) backdrop.addEventListener('click', closeMenu);

    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= BREAKPOINT && isOpen()) closeMenu();
    });
  }

  /* ------------------------------------------------------------------------
     HEADER SCROLL STATE
     ------------------------------------------------------------------------ */
  function initHeaderScroll(header) {
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ------------------------------------------------------------------------
     ACTIVE LINK — works out the current page from the URL, so the same
     pasted markup highlights the right link on every page automatically.
     ------------------------------------------------------------------------ */
  function initActiveLink(header) {
    var current = (window.location.pathname.split('/').pop() || 'home-1.html').toLowerCase();

    var dropdownHasMatch = false;

    header.querySelectorAll('[data-llnav-link]').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('/').pop().toLowerCase();
      if (href && href === current) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
        if (link.closest('[data-llnav-dropdown-menu]')) dropdownHasMatch = true;
      }
    });

    if (dropdownHasMatch) {
      var trigger = header.querySelector('[data-llnav-dropdown-trigger]');
      if (trigger) trigger.classList.add('is-active');
    }
  }

  /* ------------------------------------------------------------------------
     localStorage helpers — degrade quietly if storage is unavailable
     (private browsing, restricted iframes, etc.)
     ------------------------------------------------------------------------ */
  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }
})();
