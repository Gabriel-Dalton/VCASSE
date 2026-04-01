window.VCASSE_PUBLICATIONS = [
  {
    slug: 'safety-evals-for-public-interest',
    title: 'Practical AI Safety Evaluations for Public-Interest Teams',
    pillar: 'safety',
    tags: ['Evaluations', 'Risk', 'Governance'],
    date: '2026-03-15',
    author: 'VCASSE Research Team',
    readingTime: '7 min read',
    excerpt: 'A practical framework for evaluating model failure modes before deployment in civic and public-service contexts.',
    featured: true,
    content: `
      <p>AI evaluations need to be understandable, repeatable, and proportionate to risk. For most public-interest teams, the challenge is not whether to evaluate systems, but how to do it with limited staff and budget.</p>
      <p>This brief outlines a lightweight evaluation loop: define high-impact failure classes, design representative test sets, review with non-technical stakeholders, and publish plain-language findings.</p>
      <p>We recommend starting with a narrow deployment scope, documenting known limitations, and adding stronger controls before expanding use cases.</p>
    `
  },
  {
    slug: 'sustainable-ai-procurement-guide',
    title: 'A Sustainability Checklist for AI Procurement',
    pillar: 'sustainability',
    tags: ['Climate', 'Procurement', 'Infrastructure'],
    date: '2026-02-27',
    author: 'VCASSE Sustainability Desk',
    readingTime: '6 min read',
    excerpt: 'How organizations can ask better vendor questions around energy use, lifecycle impact, and reporting transparency.',
    featured: true,
    content: `
      <p>Many organizations buy AI capabilities without visibility into compute intensity, infrastructure sourcing, or lifecycle environmental costs.</p>
      <p>Our checklist introduces procurement prompts that are easy to adopt: request usage-envelope estimates, compare model classes by energy profile, and include sustainability disclosure clauses in contracts.</p>
      <p>Even small procurement shifts can reduce waste, improve accountability, and create market pressure for better defaults.</p>
    `
  },
  {
    slug: 'ethics-participatory-ai-decisions',
    title: 'Participatory Ethics in Municipal AI Decisions',
    pillar: 'ethics',
    tags: ['Inclusion', 'Policy', 'Public Deliberation'],
    date: '2026-01-31',
    author: 'VCASSE Ethics Program',
    readingTime: '8 min read',
    excerpt: 'Why public-facing AI decisions should include structured resident participation, not only internal review.',
    featured: true,
    content: `
      <p>Ethics reviews are strongest when affected communities can shape both criteria and outcomes, not only react after deployment.</p>
      <p>We propose a participatory model: publish use-case briefs, host targeted listening sessions, and incorporate feedback into explicit decision logs.</p>
      <p>This process adds legitimacy, surfaces lived-experience risks, and improves long-term trust in AI governance.</p>
    `
  },
  {
    slug: 'incident-reporting-playbook',
    title: 'Incident Reporting Playbook for Responsible AI Teams',
    pillar: 'safety',
    tags: ['Operations', 'Incident Response', 'Monitoring'],
    date: '2025-12-12',
    author: 'VCASSE Safety Lab',
    readingTime: '5 min read',
    excerpt: 'A simple operational playbook for classifying incidents, escalating quickly, and learning from postmortems.',
    featured: false,
    content: `
      <p>Teams often detect AI failures but lack a shared response protocol. This playbook gives clear severity tiers, response ownership, and communication pathways.</p>
      <p>We also include a post-incident template to ensure lessons become concrete design and policy updates.</p>
    `
  },
  {
    slug: 'energy-footprint-reporting-basics',
    title: 'Energy Footprint Reporting: A Starter Standard',
    pillar: 'sustainability',
    tags: ['Reporting', 'Standards', 'Metrics'],
    date: '2025-11-19',
    author: 'VCASSE Sustainability Desk',
    readingTime: '6 min read',
    excerpt: 'A baseline reporting format for teams that want to disclose AI energy impact with minimal overhead.',
    featured: false,
    content: `
      <p>Energy reporting remains inconsistent across organizations. A small common format can dramatically improve comparability and accountability.</p>
      <p>Our starter standard recommends reporting by workload class, region, and model family, plus quarterly trend summaries.</p>
    `
  },
  {
    slug: 'human-oversight-design-patterns',
    title: 'Human Oversight Design Patterns That Actually Work',
    pillar: 'ethics',
    tags: ['Human-in-the-loop', 'UX', 'Accountability'],
    date: '2025-10-28',
    author: 'VCASSE Ethics Program',
    readingTime: '7 min read',
    excerpt: 'Common oversight patterns fail when reviewers are overloaded. These design patterns improve decision quality.',
    featured: false,
    content: `
      <p>Human-in-the-loop can become a checkbox if review interfaces are poorly designed. Effective oversight requires context, confidence cues, and escalation affordances.</p>
      <p>We present practical UI and workflow patterns to reduce reviewer fatigue and improve accountability outcomes.</p>
    `
  }
];

window.getPublications = function getPublications() {
  return [...window.VCASSE_PUBLICATIONS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

window.getPublicationBySlug = function getPublicationBySlug(slug) {
  return window.VCASSE_PUBLICATIONS.find((post) => post.slug === slug) || null;
};
