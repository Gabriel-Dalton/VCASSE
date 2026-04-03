window.VCASSE_PUBLICATIONS = [
  {
    type: 'publication',
    title: 'Practical AI Safety Evaluations for Public-Interest Teams',
    pillar: 'safety',
    tags: ['Evaluations', 'Risk', 'Governance'],
    date: '2026-03-15',
    readingTime: '7 min read',
    excerpt: 'A practical framework for evaluating model failure modes before deployment in civic and public-service contexts.',
    url: 'publications/safety-evaluations-public-interest.html'
  },
  {
    type: 'publication',
    title: 'Incident Reporting Playbook for Responsible AI Teams',
    pillar: 'safety',
    tags: ['Operations', 'Incident Response', 'Monitoring'],
    date: '2025-12-12',
    readingTime: '5 min read',
    excerpt: 'A simple operational playbook for classifying incidents, escalating quickly, and learning from postmortems.',
    url: 'publications/incident-reporting-playbook.html'
  },
  {
    type: 'publication',
    title: 'A Sustainability Checklist for AI Procurement',
    pillar: 'sustainability',
    tags: ['Climate', 'Procurement', 'Infrastructure'],
    date: '2026-02-27',
    readingTime: '6 min read',
    excerpt: 'How organizations can ask better vendor questions around energy use, lifecycle impact, and reporting transparency.',
    url: 'publications/sustainability-procurement-checklist.html'
  },
  {
    type: 'publication',
    title: 'Energy Footprint Reporting: A Starter Standard',
    pillar: 'sustainability',
    tags: ['Reporting', 'Standards', 'Metrics'],
    date: '2025-11-19',
    readingTime: '6 min read',
    excerpt: 'A baseline reporting format for teams that want to disclose AI energy impact with minimal overhead.',
    url: 'publications/energy-footprint-reporting-standard.html'
  },
  {
    type: 'publication',
    title: 'Participatory Ethics in Municipal AI Decisions',
    pillar: 'ethics',
    tags: ['Inclusion', 'Policy', 'Public Deliberation'],
    date: '2026-01-31',
    readingTime: '8 min read',
    excerpt: 'Why public-facing AI decisions should include structured resident participation, not only internal review.',
    url: 'publications/participatory-ethics-municipal-ai.html'
  },
  {
    type: 'publication',
    title: 'Human Oversight Design Patterns That Actually Work',
    pillar: 'ethics',
    tags: ['Human-in-the-loop', 'UX', 'Accountability'],
    date: '2025-10-28',
    readingTime: '7 min read',
    excerpt: 'Common oversight patterns fail when reviewers are overloaded. These design patterns improve decision quality.',
    url: 'publications/human-oversight-design-patterns.html'
  },
  {
    type: 'news',
    title: 'AI Snapshot: New model evaluations benchmark transparency',
    pillar: 'safety',
    tags: ['News', 'Benchmarks'],
    date: '2026-04-01',
    source: 'VCASSE Desk Briefing',
    readingTime: '4 min read',
    excerpt: 'A concise update on emerging evaluation standards and what they mean for public-sector model procurement.',
    url: 'publications/ai-snapshot-evaluations-transparency.html'
  },
  {
    type: 'news',
    title: 'AI Climate Update: Policy momentum on compute-energy disclosures',
    pillar: 'sustainability',
    tags: ['News', 'Climate Policy'],
    date: '2026-03-29',
    source: 'VCASSE Desk Briefing',
    readingTime: '4 min read',
    excerpt: 'Recent policy and standards conversations are converging on clearer disclosure requirements for AI energy use.',
    url: 'publications/ai-climate-disclosures-update.html'
  }
];

window.getPublications = function getPublications() {
  return [...window.VCASSE_PUBLICATIONS]
    .filter((entry) => entry.type !== 'news')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

window.getNewsBriefings = function getNewsBriefings() {
  return [...window.VCASSE_PUBLICATIONS]
    .filter((entry) => entry.type === 'news')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};
