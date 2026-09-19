/* ==========================================================================
   LOOM & LIGHT — COLLECTION DETAIL PAGE JS
   This one template renders whichever collection is passed in the URL as
   ?collection=<slug> (see the six cards on collections.html). Shared UI
   (theme, RTL, nav, mobile menu, header scroll state, form feedback) lives
   in global.js and is already initialized from there — do not duplicate it here.
   ========================================================================== */

(function () {
  'use strict';

  var COLLECTIONS = {
    'linen-curtains': {
      name: 'Linen Curtains',
      category: 'Curtains',
      price: 'Starting from \u20B91,200 / sq. ft.',
      description: 'Relaxed, breathable linen that softens daylight without losing the room\u2019s warmth. Woven from natural fibres sourced from small mills, chosen for how they drape and hold colour over time.',
      material: '100% natural linen',
      light: 'Medium \u2014 softens direct sun',
      privacy: 'Medium',
      rooms: 'Living rooms, bedrooms',
      sizes: 'Made to measure from 24" to 120" wide and 36" to 108" drop, in single or pair panels.',
      care: 'Machine washable on a gentle cold cycle. Line dry or tumble dry low; iron on a linen setting while slightly damp.',
      installation: 'Fits standard rods, tracks or rings. Our installers hang, dress and steam every panel on site.',
      colors: ['#D8C7AD', '#F7F3EC', '#A89580', '#625D57'],
      gallery: [
        'linear-gradient(135deg, #F7F3EC, #D8C7AD)',
        'linear-gradient(135deg, #D8C7AD, #A89580)',
        'linear-gradient(135deg, #EDE5D8, #F7F3EC)',
        'linear-gradient(135deg, #A89580, #625D57)'
      ]
    },
    'velvet-curtains': {
      name: 'Velvet Curtains',
      category: 'Curtains',
      price: 'Starting from \u20B91,800 / sq. ft.',
      description: 'A dense, plush drape with a soft sheen \u2014 built for formal living rooms and bedrooms. Heavy enough to insulate a room against both light and outside noise.',
      material: '100% cotton velvet',
      light: 'Low \u2014 heavy, insulating drape',
      privacy: 'High',
      rooms: 'Bedrooms, formal living rooms',
      sizes: 'Made to measure from 24" to 120" wide and 36" to 108" drop, in single or pair panels.',
      care: 'Dry clean recommended. Steam to refresh the pile; avoid direct ironing.',
      installation: 'Best hung on a reinforced track given the fabric weight. Our installers handle the full fitting.',
      colors: ['#9A7653', '#625D57', '#292725', '#CFC2B0'],
      gallery: [
        'linear-gradient(135deg, #9A7653, #D8C7AD)',
        'linear-gradient(135deg, #625D57, #292725)',
        'linear-gradient(135deg, #9A7653, #292725)',
        'linear-gradient(135deg, #CFC2B0, #9A7653)'
      ]
    },
    'blackout-curtains': {
      name: 'Blackout Curtains',
      category: 'Curtains',
      price: 'Starting from \u20B91,500 / sq. ft.',
      description: 'A tightly woven fabric that blocks nearly all light \u2014 built for bedrooms and media rooms where full darkness matters, without giving up a finished, tailored look.',
      material: 'Triple-woven blackout blend',
      light: 'Very low \u2014 blocks nearly all light',
      privacy: 'High',
      rooms: 'Bedrooms, media rooms',
      sizes: 'Made to measure from 24" to 120" wide and 36" to 108" drop, in single or pair panels.',
      care: 'Spot clean only to preserve the light-blocking backing.',
      installation: 'Fits standard rods and tracks; side channels available for a fully sealed fit.',
      colors: ['#33302C', '#625D57', '#292725', '#A89580'],
      gallery: [
        'linear-gradient(135deg, #33302C, #625D57)',
        'linear-gradient(135deg, #292725, #625D57)',
        'linear-gradient(135deg, #33302C, #A89580)',
        'linear-gradient(135deg, #625D57, #292725)'
      ]
    },
    'roller-blinds': {
      name: 'Roller Blinds',
      category: 'Blinds',
      price: 'Starting from \u20B9900 / sq. ft.',
      description: 'Clean, architectural lines with precise light control. Available in blackout and sunscreen weaves for whichever balance of privacy and daylight a room needs.',
      material: 'Polyester-blend roller fabric',
      light: 'Adjustable \u2014 blackout or sunscreen weave',
      privacy: 'Medium to high',
      rooms: 'Kitchens, home offices, kids\u2019 rooms',
      sizes: 'Made to measure from 18" to 96" wide, chain or motorised operation.',
      care: 'Wipe clean with a damp cloth; avoid soaking the fabric roll.',
      installation: 'Top or face fixed inside or outside the recess; installed and levelled on site.',
      colors: ['#EDE5D8', '#CFC2B0', '#625D57', '#292725'],
      gallery: [
        'linear-gradient(135deg, #EDE5D8, #F7F3EC)',
        'linear-gradient(135deg, #CFC2B0, #EDE5D8)',
        'linear-gradient(135deg, #625D57, #CFC2B0)',
        'linear-gradient(135deg, #292725, #625D57)'
      ]
    },
    'vertical-blinds': {
      name: 'Vertical Blinds',
      category: 'Blinds',
      price: 'Starting from \u20B9850 / sq. ft.',
      description: 'Practical, adjustable light control built for large windows and sliding doors, where a roller or curtain isn\u2019t the right fit.',
      material: 'PVC or fabric vane options',
      light: 'Adjustable via rotating vanes',
      privacy: 'Medium',
      rooms: 'Large windows, sliding doors, home offices',
      sizes: 'Made to measure up to 180" wide per track, 3.5" or 5" vane widths.',
      care: 'Wipe individual vanes with a damp cloth; fabric vanes can be spot cleaned.',
      installation: 'Ceiling or wall mounted track; vanes fitted and aligned during installation.',
      colors: ['#D8C7AD', '#A89580', '#625D57', '#EDE5D8'],
      gallery: [
        'linear-gradient(135deg, #F7F3EC, #D8C7AD)',
        'linear-gradient(135deg, #A89580, #625D57)',
        'linear-gradient(135deg, #D8C7AD, #A89580)',
        'linear-gradient(135deg, #EDE5D8, #CFC2B0)'
      ]
    },
    'sheers': {
      name: 'Sheers',
      category: 'Sheers',
      price: 'Starting from \u20B9700 / sq. ft.',
      description: 'Voile-like and translucent \u2014 softens daylight without blocking it. Our most requested pairing is a sheer layered over a blind or blackout curtain.',
      material: 'Voile / sheer polyester blend',
      light: 'High \u2014 diffuses rather than blocks',
      privacy: 'Low',
      rooms: 'Living rooms, dining rooms',
      sizes: 'Made to measure from 24" to 120" wide and 36" to 108" drop.',
      care: 'Gentle machine wash or dry clean; iron on a low, synthetic setting.',
      installation: 'Hangs on a second track or rod in front of or behind a primary curtain or blind.',
      colors: ['#F3EEE4', '#F7F3EC', '#FFFDF9', '#EDE5D8'],
      gallery: [
        'linear-gradient(135deg, #F7F3EC, #FFFDF9)',
        'linear-gradient(135deg, #FFFDF9, #EDE5D8)',
        'linear-gradient(135deg, #F3EEE4, #F7F3EC)',
        'linear-gradient(135deg, #EDE5D8, #FFFDF9)'
      ]
    }
  };

  var ORDER = ['linen-curtains', 'velvet-curtains', 'blackout-curtains', 'roller-blinds', 'vertical-blinds', 'sheers'];
  var DEFAULT_SLUG = 'linen-curtains';

  function getSlugFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('collection');
    return COLLECTIONS[slug] ? slug : DEFAULT_SLUG;
  }

  function renderGallery(data) {
    var main = document.querySelector('[data-gallery-main]');
    var thumbs = document.querySelector('[data-gallery-thumbs]');
    if (!main || !thumbs) return;

    thumbs.innerHTML = '';

    function setActive(index) {
      main.style.backgroundImage = data.gallery[index];
      thumbs.querySelectorAll('.detail-gallery__thumb').forEach(function (t, i) {
        t.classList.toggle('is-active', i === index);
        t.setAttribute('aria-selected', String(i === index));
      });
    }

    data.gallery.forEach(function (bg, i) {
      var thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'detail-gallery__thumb';
      thumb.setAttribute('role', 'tab');
      thumb.setAttribute('aria-label', data.name + ' image ' + (i + 1));
      var swatch = document.createElement('span');
      swatch.style.backgroundImage = bg;
      thumb.appendChild(swatch);
      thumb.addEventListener('click', function () { setActive(i); });
      thumbs.appendChild(thumb);
    });

    setActive(0);
  }

  function renderColors(data) {
    var wrap = document.querySelector('[data-detail-colors]');
    if (!wrap) return;
    wrap.innerHTML = '';
    data.colors.forEach(function (hex) {
      var swatch = document.createElement('span');
      swatch.className = 'detail-colors__swatch';
      swatch.style.backgroundColor = hex;
      swatch.setAttribute('title', hex);
      wrap.appendChild(swatch);
    });
  }

  function renderRelated(currentSlug) {
    var grid = document.querySelector('[data-related-grid]');
    if (!grid) return;
    grid.innerHTML = '';

    var others = ORDER.filter(function (slug) { return slug !== currentSlug; }).slice(0, 3);

    others.forEach(function (slug) {
      var data = COLLECTIONS[slug];
      var href = 'collection-detail.html?collection=' + encodeURIComponent(slug);

      var card = document.createElement('article');
      card.className = 'related-card card';
      card.innerHTML =
        '<a href="' + href + '" class="related-card__media" style="background-image: ' + data.gallery[0] + ';" aria-hidden="true"></a>' +
        '<div class="card-body">' +
          '<span class="tag">' + data.category + '</span>' +
          '<h4><a href="' + href + '">' + data.name + '</a></h4>' +
          '<p class="related-card__price">' + data.price + '</p>' +
          '<a href="' + href + '" class="btn btn-outline btn-sm">View Collection</a>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  function renderPage() {
    var slug = getSlugFromUrl();
    var data = COLLECTIONS[slug];
    if (!data) return;

    document.title = data.name + ' | Loom & Light';
    var metaDesc = document.querySelector('[data-detail-meta-description]');
    if (metaDesc) metaDesc.setAttribute('content', data.description);
    var ogTitle = document.querySelector('[data-detail-og-title]');
    if (ogTitle) ogTitle.setAttribute('content', data.name + ' | Loom & Light');

    var setText = function (selector, value) {
      var el = document.querySelector(selector);
      if (el) el.textContent = value;
    };

    setText('[data-detail-category]', data.category);
    setText('[data-detail-name]', data.name);
    setText('[data-detail-price]', data.price);
    setText('[data-detail-description]', data.description);
    setText('[data-spec-material]', data.material);
    setText('[data-spec-light]', data.light);
    setText('[data-spec-privacy]', data.privacy);
    setText('[data-spec-rooms]', data.rooms);
    setText('[data-detail-sizes]', data.sizes);
    setText('[data-detail-care]', data.care);
    setText('[data-detail-installation]', data.installation);

    renderGallery(data);
    renderColors(data);
    renderRelated(slug);
  }

  document.addEventListener('DOMContentLoaded', renderPage);
})();
