document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('[data-related-publications]');
  if (!containers.length || typeof window.getPublications !== 'function') return;

  const allPosts = window.getPublications();
  const PILLAR_LABELS = {
    safety: 'Safety',
    sustainability: 'Sustainability',
    ethics: 'Ethics'
  };

  containers.forEach((container) => {
    const pillar = (container.getAttribute('data-pillar') || '').toLowerCase();
    const limit = Number(container.getAttribute('data-limit') || 2);
    const exclude = container.getAttribute('data-exclude') || '';
    const baseHref = container.getAttribute('data-base-href') || '';

    const posts = allPosts
      .filter((post) => (!pillar || post.pillar === pillar) && post.slug !== exclude)
      .slice(0, limit);

    container.innerHTML = '';
    posts.forEach((post) => {
      const card = document.createElement('article');
      card.className = 'publication-card publication-card--with-cover publication-card--compact';
      const url = baseHref + post.url;
      const cover = baseHref + post.cover;
      card.innerHTML = `
        <a class="publication-card-cover" href="${url}" aria-label="Read ${escapeHtml(post.title)}">
          <img src="${cover}" alt="" loading="lazy" decoding="async">
          <span class="publication-pill publication-pill--${post.pillar}">${PILLAR_LABELS[post.pillar] || post.pillar}</span>
        </a>
        <div class="publication-card-body">
          <div class="publication-card-meta">
            <span>${formatDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>${escapeHtml(post.readingTime)}</span>
          </div>
          <h3><a href="${url}">${escapeHtml(post.title)}</a></h3>
          <p>${escapeHtml(post.excerpt)}</p>
          <ul class="publication-tags">
            ${post.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}
          </ul>
          <a class="modern-card-link" href="${url}">Read publication <span aria-hidden="true">→</span></a>
        </div>
      `;
      container.appendChild(card);
    });
  });
});

function formatDate(dateISO) {
  return new Date(dateISO).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
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
