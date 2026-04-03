(function publicationsPageCMS() {
  const pillars = ['safety', 'sustainability', 'ethics'];

  const toDateLabel = (isoDate) => new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const toTitleCase = (value) => value.charAt(0).toUpperCase() + value.slice(1);

  const renderPublicationCard = (item) => {
    const tagMarkup = (item.tags || []).map((tag) => `<li>${tag}</li>`).join('');

    return `
      <article class="publication-card">
        <div class="publication-card-meta">
          <span class="publication-pill publication-pill--${item.pillar}">${toTitleCase(item.pillar)}</span>
          <span>${toDateLabel(item.date)}</span>
          <span>${item.readingTime || 'Brief'}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <ul class="publication-tags">${tagMarkup}</ul>
        <a class="modern-card-link" href="${item.url}">Read publication <span aria-hidden="true">→</span></a>
      </article>
    `;
  };

  const renderNewsCard = (item) => {
    const tagMarkup = (item.tags || []).map((tag) => `<li>${tag}</li>`).join('');
    const href = item.externalUrl || '#';
    const label = item.source || 'VCASSE Update';

    return `
      <article class="news-feed-card">
        <div class="publication-card-meta">
          <span class="publication-pill publication-pill--${item.pillar}">${toTitleCase(item.pillar)}</span>
          <span>${toDateLabel(item.date)}</span>
          <span>${label}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <ul class="publication-tags">${tagMarkup}</ul>
        <a class="modern-card-link" href="${href}">Open briefing <span aria-hidden="true">→</span></a>
      </article>
    `;
  };

  const publications = (window.getPublications ? window.getPublications() : []) || [];
  const newsBriefings = (window.getNewsBriefings ? window.getNewsBriefings() : []) || [];

  pillars.forEach((pillar) => {
    const container = document.getElementById(`${pillar}Publications`);
    if (!container) {
      return;
    }

    const entries = publications.filter((item) => item.pillar === pillar);
    container.innerHTML = entries.map(renderPublicationCard).join('');
  });

  const newsContainer = document.getElementById('newsFeed');
  if (newsContainer) {
    newsContainer.innerHTML = newsBriefings.map(renderNewsCard).join('');
  }
})();
