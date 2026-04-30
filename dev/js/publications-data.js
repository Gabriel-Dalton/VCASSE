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
  },
  {
    slug: 'sustainability-procurement-frontier-ai',
    title: 'Energy & Water Footprints of Frontier AI: A Vancouver Procurement Lens',
    pillar: 'sustainability',
    tags: ['Procurement', 'Compute', 'Disclosure', 'Risk'],
    date: '2026-04-08',
    readingTime: '9 min read',
    authors: ['Dr. Léa Moreau', 'Jordan Park'],
    excerpt: 'What public buyers should ask vendors about energy, water, and embodied carbon before signing an AI contract.',
    cover: 'img/publications/sustainability-procurement.svg',
    url: 'publications/sustainability-procurement-frontier-ai.html'
  },
  {
    slug: 'participatory-ethics-civic-ai',
    title: 'Participatory Ethics Reviews for Civic AI',
    pillar: 'ethics',
    tags: ['Public engagement', 'Governance', 'Risk'],
    date: '2026-02-22',
    readingTime: '10 min read',
    authors: ['Dr. Aisha Khan', 'Tomás Rivera'],
    excerpt: 'Bringing residents, frontline staff, and external reviewers into AI ethics processes without slowing them to a halt.',
    cover: 'img/publications/participatory-ethics.svg',
    url: 'publications/participatory-ethics-civic-ai.html'
  }
];

window.getPublications = function getPublications() {
  return [...window.VCASSE_PUBLICATIONS].sort((a, b) => new Date(b.date) - new Date(a.date));
};

window.getPublicationBySlug = function getPublicationBySlug(slug) {
  return window.VCASSE_PUBLICATIONS.find((post) => post.slug === slug) || null;
};

// Suggested-publications scoring. Used by publications-related.js as the
// shared "CRM" for surfacing related reading. Higher score = more relevant.
//   • same pillar              → +3
//   • each shared tag          → +1.2
//   • recency tiebreak (newer) → +0.0001 per day
window.getRelatedPublications = function getRelatedPublications(slug, options) {
  const opts = options || {};
  const limit = typeof opts.limit === 'number' ? opts.limit : 2;
  const all = window.VCASSE_PUBLICATIONS || [];
  const source = all.find((p) => p.slug === slug);
  if (!source) return all.slice(0, limit);

  const sourceTags = new Set((source.tags || []).map((t) => t.toLowerCase()));

  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const sharedTags = (p.tags || []).filter((t) => sourceTags.has(t.toLowerCase())).length;
      let score = 0;
      if (p.pillar === source.pillar) score += 3;
      score += sharedTags * 1.2;
      score += new Date(p.date).getTime() / (1000 * 60 * 60 * 24) * 0.0001;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
};
