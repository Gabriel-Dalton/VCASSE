document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('[data-publications-grid]');
  if (!grid || typeof window.getPublications !== 'function') return;

  const posts = window.getPublications();
  grid.innerHTML = '';

  posts.forEach((post) => {
    const card = document.createElement('article');
    card.className = 'publication-card';
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
    grid.appendChild(card);
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
