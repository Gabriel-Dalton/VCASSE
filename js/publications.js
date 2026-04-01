document.addEventListener('DOMContentLoaded', () => {
  const posts = typeof window.getPublications === 'function' ? window.getPublications() : [];
  if (!posts.length) return;

  renderFeaturedPosts(posts);
  renderPublicationsIndex(posts);
  renderPublicationPost(posts);
});

function formatDate(dateISO) {
  const date = new Date(dateISO);
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function toTitleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createPublicationCard(post, compact = false) {
  const article = document.createElement('article');
  article.className = compact ? 'publication-card publication-card--compact' : 'publication-card';
  article.innerHTML = `
    <div class="publication-card-meta">
      <span class="publication-pill publication-pill--${post.pillar}">${toTitleCase(post.pillar)}</span>
      <span>${formatDate(post.date)}</span>
      <span>${post.readingTime}</span>
    </div>
    <h3>${post.title}</h3>
    <p>${post.excerpt}</p>
    <ul class="publication-tags">
      ${post.tags.map((tag) => `<li>${tag}</li>`).join('')}
    </ul>
    <a class="modern-card-link" href="publication-post.html?slug=${encodeURIComponent(post.slug)}">Read publication <span aria-hidden="true">→</span></a>
  `;
  return article;
}

function renderFeaturedPosts(posts) {
  const target = document.getElementById('featuredPublications');
  if (!target) return;

  const byPillar = ['safety', 'sustainability', 'ethics']
    .map((pillar) => posts.find((post) => post.pillar === pillar))
    .filter(Boolean);

  byPillar.forEach((post) => {
    target.appendChild(createPublicationCard(post, true));
  });
}

function renderPublicationsIndex(posts) {
  const grid = document.getElementById('publicationsGrid');
  if (!grid) return;

  const filterButtons = document.querySelectorAll('[data-publication-filter]');
  let currentFilter = 'all';

  const draw = () => {
    const filtered = currentFilter === 'all'
      ? posts
      : posts.filter((post) => post.pillar === currentFilter);

    grid.innerHTML = '';
    filtered.forEach((post) => grid.appendChild(createPublicationCard(post)));
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentFilter = button.getAttribute('data-publication-filter') || 'all';
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      draw();
    });
  });

  draw();
}

function renderPublicationPost(posts) {
  const root = document.getElementById('publicationPost');
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    root.innerHTML = `
      <section class="legal-content">
        <h1>Publication not found</h1>
        <p>The article you requested does not exist yet. Please return to the publications page.</p>
        <p><a href="publications.html" class="modern-card-link">Back to publications <span aria-hidden="true">→</span></a></p>
      </section>
    `;
    return;
  }

  document.title = `${post.title} — VCASSE Publications`;
  root.innerHTML = `
    <section class="page-hero publication-hero">
      <div class="container">
        <div class="page-hero-content">
          <div class="section-label">PUBLICATION</div>
          <h1 class="page-hero-title">${post.title}</h1>
          <p class="page-hero-description">${post.excerpt}</p>
          <div class="publication-post-meta">
            <span class="publication-pill publication-pill--${post.pillar}">${toTitleCase(post.pillar)}</span>
            <span>${formatDate(post.date)}</span>
            <span>${post.author}</span>
            <span>${post.readingTime}</span>
          </div>
          <ul class="publication-tags publication-tags--inline">
            ${post.tags.map((tag) => `<li>${tag}</li>`).join('')}
          </ul>
        </div>
      </div>
    </section>
    <section class="publication-body">
      <div class="container">
        <article class="publication-prose">
          ${post.content}
        </article>
        <p><a href="publications.html" class="modern-card-link">Back to all publications <span aria-hidden="true">→</span></a></p>
      </div>
    </section>
  `;
}
