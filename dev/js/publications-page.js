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
    const emptyState = document.getElementById('publicationsEmpty');
    const resetBtn = document.getElementById('publicationsReset');

    const state = { pillar: 'all', sort: 'newest' };

    const sortDropdown = initDropdown(document.getElementById('publicationsSort'), (value) => {
      state.sort = value;
      render();
    });

    render();

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        state.pillar = btn.getAttribute('data-pub-filter');
        filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
        filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        render();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.pillar = 'all';
        state.sort = 'newest';
        if (sortDropdown) sortDropdown.set('newest');
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

  // ── Custom dropdown ──────────────────────────────────────────────────────
  // Drop-in replacement for a native <select>. Keyboard-accessible:
  //   - Click trigger or Enter/Space/ArrowDown opens the menu
  //   - ArrowUp/Down navigate options, Enter selects, Esc closes
  //   - Click outside closes
  // onChange(value) fires whenever a new option is selected.
  function initDropdown(root, onChange) {
    if (!root) return null;
    const trigger = root.querySelector('.vc-dropdown-trigger');
    const valueEl = root.querySelector('.vc-dropdown-value');
    const menu = root.querySelector('.vc-dropdown-menu');
    const options = Array.from(root.querySelectorAll('.vc-dropdown-option'));
    if (!trigger || !menu || !options.length) return null;

    let activeIndex = options.findIndex((o) => o.classList.contains('is-selected'));
    if (activeIndex < 0) activeIndex = 0;

    const open = () => {
      root.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      const sel = root.querySelector('.vc-dropdown-option.is-selected') || options[0];
      activeIndex = options.indexOf(sel);
      highlight(activeIndex);
      document.addEventListener('mousedown', onOutside, true);
      document.addEventListener('keydown', onKeyOpen);
    };

    const close = () => {
      root.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      options.forEach((o) => o.classList.remove('is-active'));
      document.removeEventListener('mousedown', onOutside, true);
      document.removeEventListener('keydown', onKeyOpen);
    };

    const select = (value) => {
      const opt = options.find((o) => o.dataset.value === value);
      if (!opt) return;
      options.forEach((o) => {
        const on = o === opt;
        o.classList.toggle('is-selected', on);
        o.setAttribute('aria-selected', String(on));
      });
      if (valueEl) valueEl.textContent = opt.querySelector('.vc-dropdown-option-label').textContent;
      onChange && onChange(value);
    };

    const highlight = (idx) => {
      options.forEach((o, i) => o.classList.toggle('is-active', i === idx));
      if (options[idx]) options[idx].scrollIntoView({ block: 'nearest' });
    };

    const onOutside = (e) => {
      if (!root.contains(e.target)) close();
    };

    const onKeyOpen = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        trigger.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % options.length;
        highlight(activeIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + options.length) % options.length;
        highlight(activeIndex);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const opt = options[activeIndex];
        if (opt) {
          select(opt.dataset.value);
          close();
          trigger.focus();
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        activeIndex = 0;
        highlight(activeIndex);
      } else if (e.key === 'End') {
        e.preventDefault();
        activeIndex = options.length - 1;
        highlight(activeIndex);
      }
    };

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (root.classList.contains('is-open')) close();
      else open();
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!root.classList.contains('is-open')) open();
      }
    });

    options.forEach((opt) => {
      opt.addEventListener('click', () => {
        select(opt.dataset.value);
        close();
        trigger.focus();
      });
      opt.addEventListener('mouseenter', () => {
        const idx = options.indexOf(opt);
        if (idx >= 0) highlight(idx);
      });
    });

    return {
      get: () => (options.find((o) => o.classList.contains('is-selected')) || {}).dataset?.value,
      set: (v) => select(v)
    };
  }

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
