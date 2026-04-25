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
    const resultsCount = document.getElementById('publicationsCount');

    const state = { pillar: 'all' };
    render();

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        state.pillar = btn.getAttribute('data-pub-filter');
        filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
        filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        render();
      });
    });

    function render() {
      const filtered = posts.filter((post) => state.pillar === 'all' || post.pillar === state.pillar);

      grid.innerHTML = '';
      filtered.forEach((post) => grid.appendChild(buildCard(post)));

      if (resultsCount) {
        const numEl = resultsCount.querySelector('.publications-count-num');
        if (numEl) numEl.textContent = String(filtered.length);
      }
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
        </div>
      `;
      return article;
    }
  });

  function formatDate(dateISO) {
    return new Date(dateISO).toLocaleDateString('en-CA', {
      year: 'numeric', month: 'short', day: 'numeric'
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
