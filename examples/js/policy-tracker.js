(function () {
  const STAGES = ['Draft', 'Internal review', 'Submitted', 'Adopted / cited'];

  const BRIEFS = [
    {
      title: "Procurement standards for municipal AI tools",
      pillar: "ethics",
      target: "City of Vancouver — Procurement",
      stage: 3,
      blurb: "Recommended disclosure, contestability, and bias-evaluation clauses for any AI system the City buys.",
      updated: "2026-03-02",
    },
    {
      title: "Pre-deployment evaluation checklist for civic chatbots",
      pillar: "safety",
      target: "City of Vancouver — Service Innovation",
      stage: 2,
      blurb: "A short, audit-friendly checklist of safety evals to run before a 311-style chatbot goes live.",
      updated: "2026-03-29",
    },
    {
      title: "Reporting standards for AI water and energy use",
      pillar: "sustainability",
      target: "Province of BC — Climate Action Secretariat",
      stage: 2,
      blurb: "What AI vendors operating in BC should disclose about training and inference resource use.",
      updated: "2026-04-08",
    },
    {
      title: "Plain-language disclosure rules for synthetic media",
      pillar: "ethics",
      target: "Federal — Heritage Canada",
      stage: 1,
      blurb: "When AI-generated content is shown to residents, what must be disclosed and how.",
      updated: "2026-04-14",
    },
    {
      title: "Right-sizing guidance for public sector AI deployments",
      pillar: "sustainability",
      target: "City of Vancouver — IT",
      stage: 1,
      blurb: "When to choose a small distilled model over a frontier model — with worked examples.",
      updated: "2026-04-18",
    },
    {
      title: "Incident reporting for harms from AI in services",
      pillar: "safety",
      target: "Provincial — Office of the Ombudsperson",
      stage: 0,
      blurb: "A draft reporting flow for when AI-driven decisions produce a harmful outcome for a resident.",
      updated: "2026-04-22",
    },
    {
      title: "Worker consultation requirements for AI-driven scheduling",
      pillar: "ethics",
      target: "Provincial — Labour",
      stage: 0,
      blurb: "Frontline workers should be consulted before AI-driven scheduling tools are introduced.",
      updated: "2026-04-23",
    },
  ];

  const PILLAR_LABEL = { safety: 'Safety', sustainability: 'Sustainability', ethics: 'Ethics' };

  const listEl = document.getElementById('tracker-list');
  const statsEl = document.getElementById('tracker-stats');
  const filters = document.querySelectorAll('#tracker-filters .glossary-filter');

  const state = { pillar: 'all' };

  function renderStats() {
    const total = BRIEFS.length;
    const adopted = BRIEFS.filter((b) => b.stage === 3).length;
    const submitted = BRIEFS.filter((b) => b.stage >= 2).length;
    const inProgress = BRIEFS.filter((b) => b.stage < 2).length;

    statsEl.innerHTML = `
      <div class="tracker-stat">
        <div class="tracker-stat-value">${total}</div>
        <div class="tracker-stat-label">Total briefs</div>
      </div>
      <div class="tracker-stat">
        <div class="tracker-stat-value">${inProgress}</div>
        <div class="tracker-stat-label">In progress</div>
      </div>
      <div class="tracker-stat">
        <div class="tracker-stat-value">${submitted}</div>
        <div class="tracker-stat-label">Submitted+</div>
      </div>
      <div class="tracker-stat">
        <div class="tracker-stat-value">${adopted}</div>
        <div class="tracker-stat-label">Adopted / cited</div>
      </div>
    `;
  }

  function renderList() {
    const items = BRIEFS
      .filter((b) => state.pillar === 'all' || b.pillar === state.pillar)
      .sort((a, b) => new Date(b.updated) - new Date(a.updated));

    if (items.length === 0) {
      listEl.innerHTML = `<div class="qw-empty">No briefs in this pillar yet.</div>`;
      return;
    }

    listEl.innerHTML = items.map((b) => `
      <article class="tracker-item">
        <div class="tracker-item-head">
          <span class="pill pill--${b.pillar}">${PILLAR_LABEL[b.pillar]}</span>
          <h3 class="tracker-item-title">${escapeHtml(b.title)}</h3>
          <span class="tracker-item-meta">Updated ${formatDate(b.updated)}</span>
        </div>
        <p class="tracker-item-blurb">${escapeHtml(b.blurb)} <span style="color:var(--text-muted);">— ${escapeHtml(b.target)}</span></p>
        <div class="tracker-stages" role="list" aria-label="Brief progress">
          ${STAGES.map((label, i) => `
            <div class="tracker-stage ${i < b.stage ? 'is-done' : ''} ${i === b.stage ? 'is-current' : ''}" role="listitem">
              <span class="tracker-stage-dot"></span>
              <span class="tracker-stage-label">${label}</span>
            </div>
          `).join('')}
        </div>
      </article>
    `).join('');
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.pillar = btn.dataset.pillar;
      renderList();
    });
  });

  renderStats();
  renderList();
})();
