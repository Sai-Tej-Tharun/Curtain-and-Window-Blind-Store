/* ==========================================================================
   LOOM & LIGHT — BLOG / JOURNAL PAGE SCRIPT
   Client-side search, category filtering and pagination over the post
   cards already rendered in blogs.html. Newsletter submit + accordion
   behaviors (if any) are handled globally by global.js.
   ========================================================================== */

(function () {
  'use strict';

  var PER_PAGE = 4;

  function initJournal() {
    var grid = document.querySelector('[data-blog-grid]');
    if (!grid) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-post]'));
    var searchInputs = document.querySelectorAll('[data-blog-search-input]');
    var categoryButtons = document.querySelectorAll('[data-category-filter] [data-category], [data-sidebar-categories] [data-category]');
    var emptyMessage = document.querySelector('[data-blog-empty]');
    var paginationEl = document.querySelector('[data-blog-pagination]');

    var state = { query: '', category: 'all', page: 1 };

    function matches(card) {
      var title = (card.getAttribute('data-title') || '').toLowerCase();
      var excerpt = (card.getAttribute('data-excerpt') || '').toLowerCase();
      var category = card.getAttribute('data-category') || '';
      var queryMatch = !state.query || title.indexOf(state.query) !== -1 || excerpt.indexOf(state.query) !== -1;
      var categoryMatch = state.category === 'all' || category === state.category;
      return queryMatch && categoryMatch;
    }

    function renderPagination(totalPages) {
      if (!paginationEl) return;
      paginationEl.innerHTML = '';
      if (totalPages <= 1) return;

      var prev = document.createElement('button');
      prev.type = 'button';
      prev.textContent = 'Prev';
      prev.disabled = state.page === 1;
      prev.addEventListener('click', function () { state.page -= 1; render(); });
      paginationEl.appendChild(prev);

      for (var i = 1; i <= totalPages; i++) {
        (function (pageNum) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = String(pageNum);
          btn.classList.toggle('is-active', pageNum === state.page);
          btn.addEventListener('click', function () { state.page = pageNum; render(); });
          paginationEl.appendChild(btn);
        })(i);
      }

      var next = document.createElement('button');
      next.type = 'button';
      next.textContent = 'Next';
      next.disabled = state.page === totalPages;
      next.addEventListener('click', function () { state.page += 1; render(); });
      paginationEl.appendChild(next);
    }

    function render() {
      var visible = cards.filter(matches);
      var totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
      if (state.page > totalPages) state.page = totalPages;

      var start = (state.page - 1) * PER_PAGE;
      var end = start + PER_PAGE;

      cards.forEach(function (card) { card.style.display = 'none'; });
      visible.slice(start, end).forEach(function (card) { card.style.display = ''; });

      if (emptyMessage) emptyMessage.hidden = visible.length !== 0;
      renderPagination(totalPages);
    }

    // Keep every search box (hero + sidebar) in sync with one another.
    searchInputs.forEach(function (input) {
      input.addEventListener('input', function () {
        state.query = input.value.trim().toLowerCase();
        state.page = 1;
        searchInputs.forEach(function (other) {
          if (other !== input) other.value = input.value;
        });
        render();
      });
    });

    document.querySelectorAll('[data-blog-search-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) { e.preventDefault(); });
    });

    categoryButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = btn.getAttribute('data-category');
        state.category = category;
        state.page = 1;

        document.querySelectorAll('[data-category-filter] [data-category]').forEach(function (b) {
          b.classList.toggle('is-active', b.getAttribute('data-category') === category);
        });
        document.querySelectorAll('[data-sidebar-categories] [data-category]').forEach(function (b) {
          b.classList.toggle('is-active', b.getAttribute('data-category') === category);
        });

        render();
      });
    });

    render();
  }

  document.addEventListener('DOMContentLoaded', initJournal);
})();
