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

    const lockedPillar = grid.dataset.pillar && grid.dataset.pillar !== 'all'
      ? grid.dataset.pillar
      : null;
    const baseHref = grid.dataset.baseHref || '';
    const allPosts = window.getPublications();
    const posts = lockedPillar
      ? allPosts.filter((p) => p.pillar === lockedPillar)
      : allPosts;
    updateHeroStats(lockedPillar ? posts : allPosts);
    const filterButtons = Array.from(document.querySelectorAll('[data-pub-filter]'));
    const tagSelect = document.getElementById('publicationsTag');
    const sortSelect = document.getElementById('publicationsSort');
    const searchInput = document.getElementById('publicationsSearch');
    const resultsCount = document.getElementById('publicationsCount');
    const emptyState = document.getElementById('publicationsEmpty');
    const resetBtn = document.getElementById('publicationsReset');

    const state = { pillar: 'all', tag: 'all', sort: 'newest', query: '' };

    populateTags(tagSelect, posts);
    render();

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        state.pillar = btn.getAttribute('data-pub-filter');
        filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
        filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        render();
      });
    });

    if (tagSelect) {
      tagSelect.addEventListener('change', () => {
        state.tag = tagSelect.value;
        render();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        state.sort = sortSelect.value;
        render();
      });
    }

    if (searchInput) {
      let timer;
      searchInput.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          state.query = searchInput.value.trim().toLowerCase();
          render();
        }, 120);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.pillar = 'all';
        state.tag = 'all';
        state.sort = 'newest';
        state.query = '';
        if (searchInput) searchInput.value = '';
        if (tagSelect) tagSelect.value = 'all';
        if (sortSelect) sortSelect.value = 'newest';
        filterButtons.forEach((b) => {
          const isAll = b.getAttribute('data-pub-filter') === 'all';
          b.classList.toggle('active', isAll);
          b.setAttribute('aria-pressed', String(isAll));
        });
        render();
      });
    }

    function populateTags(select, list) {
      if (!select) return;
      const tags = new Set();
      list.forEach((p) => p.tags.forEach((t) => tags.add(t)));
      const sorted = Array.from(tags).sort((a, b) => a.localeCompare(b));
      sorted.forEach((tag) => {
        const opt = document.createElement('option');
        opt.value = tag;
        opt.textContent = tag;
        select.appendChild(opt);
      });
    }

    function render() {
      const filtered = posts.filter((post) => {
        if (state.pillar !== 'all' && post.pillar !== state.pillar) return false;
        if (state.tag !== 'all' && !post.tags.includes(state.tag)) return false;
        if (state.query) {
          const haystack = [post.title, post.excerpt, post.tags.join(' '), (post.authors || []).join(' ')]
            .join(' ')
            .toLowerCase();
          if (!haystack.includes(state.query)) return false;
        }
        return true;
      });

      filtered.sort((a, b) => {
        if (state.sort === 'oldest') return new Date(a.date) - new Date(b.date);
        if (state.sort === 'az') return a.title.localeCompare(b.title);
        return new Date(b.date) - new Date(a.date);
      });

      grid.innerHTML = '';
      filtered.forEach((post) => grid.appendChild(buildCard(post)));

      if (resultsCount) {
        const total = posts.length;
        const shown = filtered.length;
        resultsCount.textContent = shown === total
          ? `Showing all ${total} publications`
          : `Showing ${shown} of ${total} publications`;
      }

      if (emptyState) {
        emptyState.hidden = filtered.length > 0;
      }
      grid.hidden = filtered.length === 0;
    }

    function updateHeroStats(list) {
      const total = list.length;
      const heroCount = document.getElementById('publicationsHeroCount');
      if (heroCount) heroCount.textContent = String(total);
      const pillarCounts = list.reduce((acc, p) => {
        acc[p.pillar] = (acc[p.pillar] || 0) + 1;
        return acc;
      }, {});
      document.querySelectorAll('.publications-hero-pillars li').forEach((li) => {
        const pill = li.querySelector('.publication-pill');
        if (!pill) return;
        const key = ['safety', 'sustainability', 'ethics'].find((k) => pill.classList.contains(`publication-pill--${k}`));
        const valueEl = li.querySelector('span:last-child');
        if (key && valueEl) valueEl.textContent = String(pillarCounts[key] || 0);
      });
    }

    function buildCard(post) {
      const article = document.createElement('article');
      article.className = 'publication-card publication-card--with-cover';
      article.setAttribute('data-pillar', post.pillar);

      const pillarLabel = PILLAR_LABELS[post.pillar] || post.pillar;
      const dateText = formatDate(post.date);
      const tags = post.tags.map((t) => `<li>${escapeHtml(t)}</li>`).join('');
      const authors = (post.authors || []).join(', ');
      const url = baseHref + post.url;
      const cover = baseHref + post.cover;

      article.innerHTML = `
        <a class="publication-card-cover" href="${url}" aria-label="Read ${escapeHtml(post.title)}">
          <img src="${cover}" alt="" loading="lazy" decoding="async">
        </a>
        <div class="publication-card-body">
          <div class="publication-card-meta">
            <span class="publication-pill publication-pill--${post.pillar}">${pillarLabel}</span>
            <span>${dateText}</span>
            <span aria-hidden="true">·</span>
            <span>${escapeHtml(post.readingTime)}</span>
          </div>
          <h3><a href="${url}">${escapeHtml(post.title)}</a></h3>
          <p>${escapeHtml(post.excerpt)}</p>
          ${authors ? `<p class="publication-card-authors">By ${escapeHtml(authors)}</p>` : ''}
          <ul class="publication-tags">${tags}</ul>
          <a class="modern-card-link" href="${url}">Read it <span aria-hidden="true">→</span></a>
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
