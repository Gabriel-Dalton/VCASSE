window.VCASSE_PUBLICATIONS = [
  {
    title: 'Practical AI Safety Evaluations for Public-Interest Teams',
    pillar: 'safety',
    tags: ['Evaluations', 'Risk', 'Governance'],
    date: '2026-03-15',
    readingTime: '7 min read',
    excerpt: 'A practical framework for evaluating model failure modes before deployment in civic and public-service contexts.',
    url: 'publications/safety-evaluations-public-interest.html'
  },
  {
    title: 'Incident Reporting Playbook for Responsible AI Teams',
    pillar: 'safety',
    tags: ['Operations', 'Incident Response', 'Monitoring'],
    date: '2025-12-12',
    readingTime: '5 min read',
    excerpt: 'A simple operational playbook for classifying incidents, escalating quickly, and learning from postmortems.',
    url: 'publications/incident-reporting-playbook.html'
  },
  {
    title: 'A Sustainability Checklist for AI Procurement',
    pillar: 'sustainability',
    tags: ['Climate', 'Procurement', 'Infrastructure'],
    date: '2026-02-27',
    readingTime: '6 min read',
    excerpt: 'How organizations can ask better vendor questions around energy use, lifecycle impact, and reporting transparency.',
    url: 'publications/sustainability-procurement-checklist.html'
  },
  {
    title: 'Energy Footprint Reporting: A Starter Standard',
    pillar: 'sustainability',
    tags: ['Reporting', 'Standards', 'Metrics'],
    date: '2025-11-19',
    readingTime: '6 min read',
    excerpt: 'A baseline reporting format for teams that want to disclose AI energy impact with minimal overhead.',
    url: 'publications/energy-footprint-reporting-standard.html'
  },
  {
    title: 'Participatory Ethics in Municipal AI Decisions',
    pillar: 'ethics',
    tags: ['Inclusion', 'Policy', 'Public Deliberation'],
    date: '2026-01-31',
    readingTime: '8 min read',
    excerpt: 'Why public-facing AI decisions should include structured resident participation, not only internal review.',
    url: 'publications/participatory-ethics-municipal-ai.html'
  },
  {
    title: 'Human Oversight Design Patterns That Actually Work',
    pillar: 'ethics',
    tags: ['Human-in-the-loop', 'UX', 'Accountability'],
    date: '2025-10-28',
    readingTime: '7 min read',
    excerpt: 'Common oversight patterns fail when reviewers are overloaded. These design patterns improve decision quality.',
    url: 'publications/human-oversight-design-patterns.html'
  }
];

window.getPublications = function getPublications() {
  return [...window.VCASSE_PUBLICATIONS].sort((a, b) => new Date(b.date) - new Date(a.date));
};
