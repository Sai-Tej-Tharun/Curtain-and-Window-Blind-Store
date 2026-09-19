/* ==========================================================================
   LOOM & LIGHT — GLOBAL JS
   Shared across every page: theme toggle, RTL toggle, navbar behavior,
   password visibility, notification dropdown, misc UI helpers.
   Load this file at the end of <body> on every page.
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_THEME = 'll-theme';
  var STORAGE_DIR = 'll-dir';
  var root = document.documentElement;

  /* ------------------------------------------------------------------------
     1. THEME TOGGLE  ([data-theme="dark"] on <html>)
     ------------------------------------------------------------------------ */
  function initTheme() {
    var saved = localStorage.getItem(STORAGE_THEME);
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);

    var toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(function (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark');
      btn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(STORAGE_THEME, next);
        toggles.forEach(function (b) { b.setAttribute('aria-pressed', next === 'dark'); });
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
     2. RTL TOGGLE  (dir="rtl" on <html>)
     ------------------------------------------------------------------------ */
  function initDirection() {
    var saved = localStorage.getItem(STORAGE_DIR) || 'ltr';
    applyDirection(saved);

    var toggles = document.querySelectorAll('[data-rtl-toggle]');
    toggles.forEach(function (btn) {
      btn.setAttribute('aria-pressed', saved === 'rtl');
      btn.addEventListener('click', function () {
        var next = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        applyDirection(next);
        localStorage.setItem(STORAGE_DIR, next);
        toggles.forEach(function (b) { b.setAttribute('aria-pressed', next === 'rtl'); });
      });
    });
  }

  function applyDirection(dir) {
    root.setAttribute('dir', dir);
  }

  /* ------------------------------------------------------------------------
     3. DESKTOP NAV DROPDOWN (Home ▾ home-1 / home-2)
        Stays open on hover with a grace-period timeout so it doesn't
        vanish while the pointer travels from trigger to menu.
     ------------------------------------------------------------------------ */
  function initNavDropdown() {
    var dropdowns = document.querySelectorAll('.nav-dropdown');
    var CLOSE_DELAY = 350;

    dropdowns.forEach(function (dropdown) {
      var closeTimer = null;
      var trigger = dropdown.querySelector('.nav-dropdown-trigger');
      var menu = dropdown.querySelector('.nav-dropdown-menu');
      if (!trigger || !menu) return;

      function open() {
        clearTimeout(closeTimer);
        dropdown.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }

      function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(function () {
          dropdown.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        }, CLOSE_DELAY);
      }

      dropdown.addEventListener('mouseenter', open);
      dropdown.addEventListener('mouseleave', scheduleClose);
      dropdown.addEventListener('focusin', open);
      dropdown.addEventListener('focusout', scheduleClose);

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        dropdown.classList.contains('is-open') ? scheduleClose() : open();
      });
    });

    document.addEventListener('click', function (e) {
      dropdowns.forEach(function (dropdown) {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('is-open');
          var t = dropdown.querySelector('.nav-dropdown-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. MOBILE MENU
        - Home 1 / Home 2 shown as separate flat tabs (no dropdown)
        - Theme + RTL toggles live inside the mobile panel
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    var menuToggle = document.querySelector('[data-mobile-menu-toggle]');
    var mobileMenu = document.querySelector('[data-mobile-menu]');
    if (!menuToggle || !mobileMenu) return;

    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mobile-menu-active');
    }

    function openMenu() {
      mobileMenu.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mobile-menu-active');
    }

    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 991) closeMenu();
    });
  }

  /* ------------------------------------------------------------------------
     5. ACTIVE NAV LINK (underline / highlight current page)
     ------------------------------------------------------------------------ */
  function initActiveLink() {
    /* Compare resolved pathnames rather than bare filenames — every page
       folder has its own home.html/index.html, so "home.html" alone would
       match Home 1 and Home 2 at the same time. */
    var current = window.location.pathname.replace(/\/+$/, '');
    document.querySelectorAll('.nav-item, .mobile-nav-item, .nav-dropdown-link').forEach(function (link) {
      if (!link.href) return;
      var linkPath = link.pathname.replace(/\/+$/, '');
      if (linkPath === current) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ------------------------------------------------------------------------
     6. PASSWORD VISIBILITY TOGGLE (login / register / forms)
     ------------------------------------------------------------------------ */
  function initPasswordToggle() {
    document.querySelectorAll('[data-password-toggle]').forEach(function (btn) {
      var targetId = btn.getAttribute('data-password-toggle');
      var input = document.getElementById(targetId);
      if (!input) return;
      btn.addEventListener('click', function () {
        var isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');
        btn.classList.toggle('is-visible', isPassword);
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. NOTIFICATION DROPDOWN (admin / customer dashboard)
     ------------------------------------------------------------------------ */
  function initNotifications() {
    var bell = document.querySelector('[data-notification-toggle]');
    var panel = document.querySelector('[data-notification-panel]');
    if (!bell || !panel) return;

    function closePanel() {
      panel.classList.remove('is-open');
      bell.setAttribute('aria-expanded', 'false');
    }

    bell.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !panel.classList.contains('is-open');
      panel.classList.toggle('is-open', willOpen);
      bell.setAttribute('aria-expanded', String(willOpen));
      if (willOpen) {
        var badge = bell.querySelector('[data-notification-count]');
        if (badge) badge.style.display = 'none';
      }
    });

    document.addEventListener('click', function (e) {
      if (!panel.contains(e.target) && !bell.contains(e.target)) closePanel();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePanel();
    });
  }

  /* ------------------------------------------------------------------------
     8. GENERIC ACCORDION (FAQs, service details, fabric guide)
     ------------------------------------------------------------------------ */
  function initAccordions() {
    document.querySelectorAll('[data-accordion-trigger]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('[data-accordion-item]');
        if (!item) return;
        var isOpen = item.classList.contains('is-open');
        var parent = item.parentElement;

        if (parent && parent.hasAttribute('data-accordion-single')) {
          parent.querySelectorAll('[data-accordion-item].is-open').forEach(function (openItem) {
            if (openItem !== item) {
              openItem.classList.remove('is-open');
              var t = openItem.querySelector('[data-accordion-trigger]');
              if (t) t.setAttribute('aria-expanded', 'false');
            }
          });
        }

        item.classList.toggle('is-open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  /* ------------------------------------------------------------------------
     9. HEADER SCROLL STATE (adds .is-scrolled for compact/fixed styling)
     ------------------------------------------------------------------------ */
  function initHeaderScroll() {
    var header = document.querySelector('[data-site-header]');
    if (!header) return;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ------------------------------------------------------------------------
     10. NEWSLETTER / GENERIC FORM FEEDBACK (no page reload, no redirects)
     ------------------------------------------------------------------------ */
  function initFormFeedback() {
    document.querySelectorAll('[data-ajax-form]').forEach(function (form) {
      if (form.dataset.feedbackBound) return;
      form.dataset.feedbackBound = 'true';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var feedback = form.querySelector('[data-form-feedback]');
        if (feedback) {
          feedback.textContent = form.getAttribute('data-success-message') || 'Thank you \u2014 we\u2019ll be in touch shortly.';
          feedback.classList.add('is-visible');
        }
        form.reset();
      });
    });
  }

  /* ------------------------------------------------------------------------
     11. CURRENT YEAR (footer copyright)
     ------------------------------------------------------------------------ */
  function initCurrentYear() {
    var year = new Date().getFullYear();
    document.querySelectorAll('[data-current-year]').forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ------------------------------------------------------------------------
     12. COMPONENT LOADER
        Fetches shared partials (navbar, footer) into placeholders marked
        with [data-include="../components/navbar.html"] and injects them
        in place. Everything that depends on navbar/footer markup
        (dropdown, mobile menu, active link, header scroll, notifications,
        current-year, form feedback) is initialized only AFTER every
        partial has resolved, so it always finds the real elements.
     ------------------------------------------------------------------------ */
  function loadPartial(el) {
    var src = el.getAttribute('data-include');
    return fetch(src)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load partial: ' + src);
        return res.text();
      })
      .then(function (html) {
        el.outerHTML = html;
      })
      .catch(function (err) {
        el.innerHTML = '';
        if (window.console) console.error(err);
      });
  }

  function loadAllPartials() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-include]'));
    if (!els.length) return Promise.resolve();
    return Promise.all(els.map(loadPartial));
  }

  /* ------------------------------------------------------------------------
     INIT
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    /* Apply theme/direction immediately to avoid a flash of wrong styling —
       these only touch <html>, so they don't need the navbar to exist yet. */
    var savedTheme = localStorage.getItem(STORAGE_THEME);
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    applyDirection(localStorage.getItem(STORAGE_DIR) || 'ltr');

    loadAllPartials().then(function () {
      /* Everything below may depend on markup that lives inside the
         just-injected navbar/footer, so it runs only once loading settles. */
      initTheme();
      initDirection();
      initNavDropdown();
      initMobileMenu();
      initActiveLink();
      initPasswordToggle();
      initNotifications();
      initAccordions();
      initHeaderScroll();
      initFormFeedback();
      initCurrentYear();
    });
  });
})();
