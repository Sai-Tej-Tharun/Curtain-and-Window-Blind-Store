/* ==========================================================================
   LOOM & LIGHT — FOOTER JS (Premium)
   Current-year injection, newsletter form feedback, and the new
   back-to-top button.

   NOTE: the year injection and form-feedback logic here duplicate
   initCurrentYear() / initFormFeedback() in global.js. Use ONE of the two
   on a given page to avoid double-binding the newsletter form's submit
   handler. The back-to-top button is new — global.js has no equivalent,
   so this file is required if you want that button to work.
   ========================================================================== */

(function () {
  'use strict';

  function setCurrentYear() {
    var year = new Date().getFullYear();
    document.querySelectorAll('[data-current-year]').forEach(function (el) {
      el.textContent = year;
    });
  }

  function initNewsletterForm() {
    document.querySelectorAll('[data-ajax-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var feedback = form.querySelector('[data-form-feedback]');
        var emailInput = form.querySelector('input[type="email"]');

        if (emailInput && !emailInput.checkValidity()) {
          emailInput.reportValidity();
          return;
        }

        if (feedback) {
          feedback.textContent = form.getAttribute('data-success-message') || 'Thank you!';
          feedback.classList.add('is-visible');
        }
        form.reset();
      });
    });
  }

  function initBackToTop() {
    var btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;

    function update() {
      btn.classList.toggle('is-visible', window.scrollY > 480);
    }

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setCurrentYear();
    initNewsletterForm();
    initBackToTop();
  });
})();