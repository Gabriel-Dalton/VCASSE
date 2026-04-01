document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('[data-related-publications]');
  if (!containers.length || typeof window.getPublications !== 'function') return;

  const allPosts = window.getPublications();

  containers.forEach((container) => {
    const pillar = (container.getAttribute('data-pillar') || '').toLowerCase();
    const limit = Number(container.getAttribute('data-limit') || 2);
    if (!pillar) return;

    const posts = allPosts.filter((post) => post.pillar === pillar).slice(0, limit);
    container.innerHTML = '';

    posts.forEach((post) => {
      const card = document.createElement('article');
      card.className = 'publication-card publication-card--compact';
      card.innerHTML = `
        <div class="publication-card-meta">
          <span class="publication-pill publication-pill--${post.pillar}">${titleCase(post.pillar)}</span>
          <span>${formatDate(post.date)}</span>
          <span>${post.readingTime}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <ul class="publication-tags">
          ${post.tags.map((tag) => `<li>${tag}</li>`).join('')}
        </ul>
        <a class="modern-card-link" href="${post.url}">Read publication <span aria-hidden="true">→</span></a>
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

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
