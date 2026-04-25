window.VCASSE_PUBLICATIONS = [
  {
    slug: 'safety-evaluations-public-interest',
    title: 'Practical AI Safety Evaluations for Public-Interest Teams',
    pillar: 'safety',
    tags: ['Evaluations', 'Risk', 'Governance'],
    date: '2026-03-15',
    readingTime: '7 min read',
    authors: ['Dr. Mei Tanaka', 'Priya Sandhu'],
    excerpt: 'A practical framework for evaluating model failure modes before deployment in civic and public-service contexts.',
    cover: 'img/publications/safety-evaluations.svg',
    url: 'publications/safety-evaluations-public-interest.html'
  },
  {
    slug: 'incident-reporting-playbook',
    title: 'Incident Reporting Playbook for Responsible AI Teams',
    pillar: 'safety',
    tags: ['Operations', 'Incident Response', 'Monitoring'],
    date: '2025-12-12',
    readingTime: '5 min read',
    authors: ['Priya Sandhu'],
    excerpt: 'A simple operational playbook for classifying incidents, escalating quickly, and learning from postmortems.',
    cover: 'img/publications/incident-reporting.svg',
    url: 'publications/incident-reporting-playbook.html'
  },
  {
    slug: 'sustainability-procurement-checklist',
    title: 'A Sustainability Checklist for AI Procurement',
    pillar: 'sustainability',
    tags: ['Climate', 'Procurement', 'Infrastructure'],
    date: '2026-02-27',
    readingTime: '6 min read',
    authors: ['Dr. Alejandro Ruiz', 'Linh Nguyen'],
    excerpt: 'How organizations can ask better vendor questions around energy use, lifecycle impact, and reporting transparency.',
    cover: 'img/publications/sustainability-procurement.svg',
    url: 'publications/sustainability-procurement-checklist.html'
  },
  {
    slug: 'energy-footprint-reporting-standard',
    title: 'Energy Footprint Reporting: A Starter Standard',
    pillar: 'sustainability',
    tags: ['Reporting', 'Standards', 'Metrics'],
    date: '2025-11-19',
    readingTime: '6 min read',
    authors: ['Dr. Alejandro Ruiz'],
    excerpt: 'A baseline reporting format for teams that want to disclose AI energy impact with minimal overhead.',
    cover: 'img/publications/energy-footprint.svg',
    url: 'publications/energy-footprint-reporting-standard.html'
  },
  {
    slug: 'participatory-ethics-municipal-ai',
    title: 'Participatory Ethics in Municipal AI Decisions',
    pillar: 'ethics',
    tags: ['Inclusion', 'Policy', 'Public Deliberation'],
    date: '2026-01-31',
    readingTime: '8 min read',
    authors: ['Dr. Amara Okafor', 'Jordan Blackwood'],
    excerpt: 'Why public-facing AI decisions should include structured resident participation, not only internal review.',
    cover: 'img/publications/participatory-ethics.svg',
    url: 'publications/participatory-ethics-municipal-ai.html'
  },
  {
    slug: 'human-oversight-design-patterns',
    title: 'Human Oversight Design Patterns That Actually Work',
    pillar: 'ethics',
    tags: ['Human-in-the-loop', 'UX', 'Accountability'],
    date: '2025-10-28',
    readingTime: '7 min read',
    authors: ['Dr. Amara Okafor'],
    excerpt: 'Common oversight patterns fail when reviewers are overloaded. These design patterns improve decision quality.',
    cover: 'img/publications/human-oversight.svg',
    url: 'publications/human-oversight-design-patterns.html'
  }
];

window.getPublications = function getPublications() {
  return [...window.VCASSE_PUBLICATIONS].sort((a, b) => new Date(b.date) - new Date(a.date));
};

window.getPublicationBySlug = function getPublicationBySlug(slug) {
  return window.VCASSE_PUBLICATIONS.find((post) => post.slug === slug) || null;
};
