/* ==========================================================================
   LOOM & LIGHT — LOGIN / REGISTER JS
   Shared by login.html and register.html.

   Theme toggle, RTL toggle and the eye-icon password visibility toggle are
   already handled generically by global.js (data-theme-toggle, data-rtl-toggle,
   data-password-toggle) — this file only covers what's specific to the
   auth forms themselves: confirm-password matching and submit handling.
   There is no backend here, so submission is simulated client-side.
   ========================================================================== */

(function () {
  'use strict';

  function initConfirmPasswordMatch() {
    var password = document.getElementById('rg-password');
    var confirm = document.getElementById('rg-confirm');
    var error = document.querySelector('[data-error-for="rg-confirm"]');
    if (!password || !confirm || !error) return;

    function validate() {
      if (confirm.value && confirm.value !== password.value) {
        error.textContent = 'Passwords do not match.';
        error.classList.add('is-visible');
        confirm.setCustomValidity('Passwords do not match.');
      } else {
        error.textContent = '';
        error.classList.remove('is-visible');
        confirm.setCustomValidity('');
      }
    }

    password.addEventListener('input', validate);
    confirm.addEventListener('input', validate);
  }

  function initAuthForm() {
    var form = document.querySelector('.auth-form');
    if (!form) return;
    var type = form.getAttribute('data-form');
    var feedback = form.querySelector('[data-form-feedback]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        var invalidField = form.querySelector(':invalid');
        if (invalidField) {
          invalidField.reportValidity();
          invalidField.focus();
        }
        return;
      }

      if (feedback) {
        feedback.textContent = type === 'register'
          ? 'Account created! Redirecting to your dashboard\u2026'
          : 'Welcome back! Redirecting to your dashboard\u2026';
        feedback.classList.add('is-visible');
      }

      var submitBtn = form.querySelector('.auth-submit');
      if (submitBtn) submitBtn.disabled = true;

      /* No backend in this template — this is where a real auth request
         would go. On success, this is where you'd redirect to the
         customer dashboard, e.g.:
         window.location.href = '../user-dashboard/dashboard.html'; */
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initConfirmPasswordMatch();
    initAuthForm();
  });
})();
