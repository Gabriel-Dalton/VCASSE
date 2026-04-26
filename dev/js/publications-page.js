(function () {
  'use strict';

  const PILLAR_LABELS = {
    safety: 'Safety',
    sustainability: 'Sustainability',
    ethics: 'Ethics'
  };

  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('publicationsGrid');
    if (!grid || typeof window.getPublications !== 'function') return;

    const posts = window.getPublications();
    const filterButtons = Array.from(document.querySelectorAll('[data-pub-filter]'));
    const sortSelect = document.getElementById('publicationsSort');
    const resultsCount = document.getElementById('publicationsCount');
    const emptyState = document.getElementById('publicationsEmpty');
    const resetBtn = document.getElementById('publicationsReset');

    const state = { pillar: 'all', sort: 'newest' };

    render();

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        state.pillar = btn.getAttribute('data-pub-filter');
        filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
        filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        render();
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        state.sort = sortSelect.value;
        render();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.pillar = 'all';
        state.sort = 'newest';
        if (sortSelect) sortSelect.value = 'newest';
        filterButtons.forEach((b) => {
          const isAll = b.getAttribute('data-pub-filter') === 'all';
          b.classList.toggle('active', isAll);
          b.setAttribute('aria-pressed', String(isAll));
        });
        render();
      });
    }

    function render() {
      const filtered = state.pillar === 'all'
        ? posts.slice()
        : posts.filter((p) => p.pillar === state.pillar);

      filtered.sort((a, b) => {
        const da = new Date(a.date).getTime();
        const db = new Date(b.date).getTime();
        return state.sort === 'oldest' ? da - db : db - da;
      });

      grid.innerHTML = '';
      filtered.forEach((post) => grid.appendChild(buildCard(post)));

      updateCount(filtered.length);

      if (emptyState) emptyState.hidden = filtered.length > 0;
      grid.hidden = filtered.length === 0;
    }

    function updateCount(shown) {
      if (!resultsCount) return;
      const numEl = resultsCount.querySelector('.publications-count-num');
      const labelEl = resultsCount.querySelector('.publications-count-label');
      if (numEl) numEl.textContent = String(shown);
      if (labelEl) labelEl.textContent = shown === 1 ? 'item' : 'items';
    }

    function buildCard(post) {
      const article = document.createElement('article');
      article.className = 'publication-card publication-card--with-cover';
      article.setAttribute('data-pillar', post.pillar);

      const pillarLabel = PILLAR_LABELS[post.pillar] || post.pillar;
      const dateText = formatDate(post.date);

      article.innerHTML = `
        <a class="publication-card-cover" href="${post.url}" aria-label="Read ${escapeHtml(post.title)}">
          <img src="${post.cover}" alt="" loading="lazy" decoding="async">
          <span class="publication-pill publication-pill--${post.pillar}">${pillarLabel}</span>
        </a>
        <div class="publication-card-body">
          <div class="publication-card-meta">
            <span>${dateText}</span>
            <span aria-hidden="true">·</span>
            <span>${escapeHtml(post.readingTime)}</span>
          </div>
          <h3><a href="${post.url}">${escapeHtml(post.title)}</a></h3>
          <p>${escapeHtml(post.excerpt)}</p>
          <a class="publication-card-link" href="${post.url}">Read brief <span aria-hidden="true">→</span></a>
        </div>
      `;
      return article;
    }
  });

  function formatDate(dateISO) {
    return new Date(dateISO).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short'
    });
  }

  function escapeHtml(value) {
    if (value == null) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();
