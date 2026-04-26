window.VCASSE_PUBLICATIONS = [
  {
    slug: 'safety-evaluations-public-interest',
    title: 'Practical AI Safety Evaluations for Public-Interest Teams',
    pillar: 'safety',
    tags: ['Evaluations', 'Risk', 'Governance'],
    date: '2026-03-15',
    readingTime: '12 min read',
    authors: ['Dr. Mei Tanaka', 'Priya Sandhu'],
    excerpt: 'A practical framework for evaluating model failure modes before deployment in civic and public-service contexts.',
    cover: 'img/publications/safety-evaluations.svg',
    url: 'publications/safety-evaluations-public-interest.html'
  }
];

window.getPublications = function getPublications() {
  return [...window.VCASSE_PUBLICATIONS].sort((a, b) => new Date(b.date) - new Date(a.date));
};

window.getPublicationBySlug = function getPublicationBySlug(slug) {
  return window.VCASSE_PUBLICATIONS.find((post) => post.slug === slug) || null;
};
