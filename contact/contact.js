/* ==========================================================================
   LOOM & LIGHT — CONTACT PAGE JS
   Page-specific behavior only. Form submission feedback, accordion (FAQ),
   theme/RTL toggles, and mobile menu are already handled by global.js
   after the navbar/footer partials load.
   ========================================================================== */

(function () {
  'use strict';

  /* Stop the "Preferred Date" field from accepting past dates. */
  function initMinBookingDate() {
    var dateInput = document.getElementById('cf-date');
    if (!dateInput) return;
    var today = new Date();
    var iso = today.toISOString().split('T')[0];
    dateInput.setAttribute('min', iso);
  }

  /* Basic inline validation messaging beyond the browser default, kept
     minimal and accessible (no extra libraries). */
  function initBookingFormValidation() {
    var form = document.querySelector('.booking-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      var invalidField = form.querySelector(':invalid');
      if (invalidField) {
        e.preventDefault();
        e.stopImmediatePropagation();
        invalidField.reportValidity();
        invalidField.focus();
      }
      /* If the form is valid, global.js's data-ajax-form handler takes it
         from here (shows the feedback message and resets the form). */
    }, true); // capture phase so this runs before global.js's submit handler
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMinBookingDate();
    initBookingFormValidation();
  });
})();
