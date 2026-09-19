/* ==========================================================================
   LOOM & LIGHT — FABRIC & MATERIALS PAGE JS
   Page-specific behaviour only. Shared UI (theme, RTL, nav, mobile menu,
   header scroll state, accordion, form feedback) lives in global.js and is
   already initialized from there — do not duplicate it here.
   ========================================================================== */

(function () {
  'use strict';

  var FABRICS = {
    linen: {
      label: 'Linen',
      texture: 'Relaxed, slightly nubby weave',
      appearance: 'Natural, ivory-to-taupe tone',
      light: 'Medium — softens direct sun',
      privacy: 'Medium',
      durability: 'High',
      maintenance: 'Machine washable, gentle cycle',
      rooms: 'Living rooms, bedrooms'
    },
    cotton: {
      label: 'Cotton',
      texture: 'Smooth, even plain weave',
      appearance: 'Crisp, off-white to sand',
      light: 'Medium–high',
      privacy: 'Medium',
      durability: 'High',
      maintenance: 'Machine washable',
      rooms: 'Kitchens, children\u2019s rooms'
    },
    velvet: {
      label: 'Velvet',
      texture: 'Dense, plush pile',
      appearance: 'Deep tone with a soft sheen',
      light: 'Low — heavy, insulating drape',
      privacy: 'High',
      durability: 'High',
      maintenance: 'Dry clean recommended',
      rooms: 'Bedrooms, formal living rooms'
    },
    polyester: {
      label: 'Polyester',
      texture: 'Smooth, tightly woven synthetic',
      appearance: 'Consistent colour, slight sheen',
      light: 'Medium',
      privacy: 'Medium',
      durability: 'Very high — resists fading',
      maintenance: 'Machine washable',
      rooms: 'High-traffic rooms, rentals'
    },
    sheer: {
      label: 'Sheer',
      texture: 'Fine, voile-like weave',
      appearance: 'Translucent, airy',
      light: 'High — diffuses rather than blocks',
      privacy: 'Low',
      durability: 'Medium',
      maintenance: 'Gentle wash or dry clean',
      rooms: 'Living rooms, dining rooms'
    },
    blackout: {
      label: 'Blackout',
      texture: 'Dense, tightly bonded layers',
      appearance: 'Solid, matte finish',
      light: 'Very low — blocks nearly all light',
      privacy: 'High',
      durability: 'High',
      maintenance: 'Spot clean',
      rooms: 'Bedrooms, media rooms'
    },
    textured: {
      label: 'Textured Weave',
      texture: 'Dimensional, nubby weave',
      appearance: 'Varied tone, subtle pattern',
      light: 'Medium',
      privacy: 'Medium',
      durability: 'High',
      maintenance: 'Dry clean recommended',
      rooms: 'Living rooms, studies'
    }
  };

  function initSwatchTool() {
    var list = document.querySelector('[data-swatch-list]');
    var preview = document.querySelector('[data-curtain-preview]');
    var label = document.querySelector('[data-curtain-label]');
    var details = document.querySelector('[data-swatch-details]');
    if (!list || !preview || !details) return;

    var buttons = list.querySelectorAll('[data-fabric]');

    function render(key) {
      var data = FABRICS[key];
      if (!data) return;

      preview.setAttribute('data-active', key);
      if (label) label.textContent = data.label;

      details.querySelector('[data-detail="texture"]').textContent = data.texture;
      details.querySelector('[data-detail="appearance"]').textContent = data.appearance;
      details.querySelector('[data-detail="light"]').textContent = data.light;
      details.querySelector('[data-detail="privacy"]').textContent = data.privacy;
      details.querySelector('[data-detail="durability"]').textContent = data.durability;
      details.querySelector('[data-detail="maintenance"]').textContent = data.maintenance;
      details.querySelector('[data-detail="rooms"]').textContent = data.rooms;

      buttons.forEach(function (btn) {
        var isActive = btn.getAttribute('data-fabric') === key;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        render(btn.getAttribute('data-fabric'));
      });
    });

    // Initialize with whichever button is marked active in the markup, else the first.
    var initial = list.querySelector('.is-active') || buttons[0];
    if (initial) render(initial.getAttribute('data-fabric'));
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSwatchTool();
  });
})();
const curtainImage = document.querySelector("[data-curtain-image]");
const curtainLabel = document.querySelector("[data-curtain-label]");

document.querySelectorAll(".swatch-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.dataset.fabricImage;
    const fabric = button.dataset.fabric;

    if (curtainImage && image) {
      curtainImage.src = image;
      curtainImage.alt = `${fabric} curtain fabric preview`;
    }

    if (curtainLabel) {
      curtainLabel.textContent =
        fabric.charAt(0).toUpperCase() + fabric.slice(1);
    }
  });
});