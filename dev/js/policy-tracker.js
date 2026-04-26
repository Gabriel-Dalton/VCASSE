(function () {
  const STAGES = ['Draft', 'Internal review', 'Submitted', 'Adopted / cited'];
  const GOV_LABEL = { city: 'City', province: 'Province', federal: 'Federal' };

  // Each entry pairs a government policy / initiative with VCASSE's commentary
  // brief on it. The `policy` block describes the government action; the
  // `brief` block describes our response and where it currently stands.
  // Note: policy details below are illustrative for this widget mock-up — they
  // should be replaced with verified live filings before publishing.
  const BRIEFS = [
    {
      // The government policy or consultation we're commenting on.
      policy: "Municipal AI Procurement Standards (consultation)",
      issuer: "City of Vancouver — Procurement",
      pillar: "ethics",
      gov: "city",
      // VCASSE's response.
      title: "VCASSE comment on the City's AI procurement consultation",
      lead: "Priya Sandhu",
      stage: 3,
      blurb: "We argued for explicit disclosure, contestability, and bias-evaluation clauses in any AI tool the City buys, with worked language for each.",
      updated: "2026-03-02",
      history: [
        { stage: 0, date: "2025-09-14", note: "Initial draft circulated internally." },
        { stage: 1, date: "2025-10-22", note: "Internal review with two external reviewers." },
        { stage: 2, date: "2025-12-01", note: "Submitted to City Procurement Office." },
        { stage: 3, date: "2026-03-02", note: "Cited in updated procurement guidelines (s.4.2)." },
      ],
    },
    {
      policy: "Civic chatbot pilot — pre-deployment review",
      issuer: "City of Vancouver — Service Innovation",
      pillar: "safety",
      gov: "city",
      title: "VCASSE response on safety evaluations for the 311-style chatbot",
      lead: "Dr. Mei Tanaka",
      stage: 2,
      blurb: "A short, audit-friendly checklist of safety evals the City should require before a public-facing chatbot goes live.",
      updated: "2026-03-29",
      history: [
        { stage: 0, date: "2026-01-08", note: "Drafted alongside Service Innovation team." },
        { stage: 1, date: "2026-02-12", note: "Reviewed by VCASSE safety pillar." },
        { stage: 2, date: "2026-03-29", note: "Submitted; awaiting council response." },
      ],
    },
    {
      policy: "BC CleanBC — disclosure rules for compute-intensive industry",
      issuer: "Province of BC — Climate Action Secretariat",
      pillar: "sustainability",
      gov: "province",
      title: "VCASSE submission on AI water and energy reporting",
      lead: "Dr. Aria Lin",
      stage: 2,
      blurb: "What AI vendors operating in BC should disclose about training and inference resource use, mapped to existing CleanBC reporting forms.",
      updated: "2026-04-08",
      history: [
        { stage: 0, date: "2025-11-10", note: "Drafted with sustainability working group." },
        { stage: 1, date: "2026-01-30", note: "External review with two grid researchers." },
        { stage: 2, date: "2026-04-08", note: "Submitted to Secretariat." },
      ],
    },
    {
      policy: "Online Harms Act — synthetic media provisions",
      issuer: "Federal — Heritage Canada",
      pillar: "ethics",
      gov: "federal",
      title: "VCASSE comment on plain-language disclosure for AI-generated media",
      lead: "Jonas Beaumont",
      stage: 1,
      blurb: "When AI-generated content reaches Canadians, what must be disclosed, in what language, and at what point in the experience.",
      updated: "2026-04-14",
      history: [
        { stage: 0, date: "2026-02-20", note: "Drafted." },
        { stage: 1, date: "2026-04-14", note: "In internal review." },
      ],
    },
    {
      policy: "City IT — annual AI tooling refresh",
      issuer: "City of Vancouver — IT",
      pillar: "sustainability",
      gov: "city",
      title: "VCASSE note on right-sizing public-sector AI deployments",
      lead: "Dr. Aria Lin",
      stage: 1,
      blurb: "When the City should choose a small distilled model over a frontier model — with three worked municipal examples.",
      updated: "2026-04-18",
      history: [
        { stage: 0, date: "2026-03-04", note: "Drafted with municipal IT contacts." },
        { stage: 1, date: "2026-04-18", note: "In internal review." },
      ],
    },
    {
      policy: "Ombudsperson Act — handling of automated-decision complaints",
      issuer: "Province of BC — Office of the Ombudsperson",
      pillar: "safety",
      gov: "province",
      title: "VCASSE proposal for an AI incident reporting flow",
      lead: "Priya Sandhu",
      stage: 0,
      blurb: "A draft reporting path for when AI-driven decisions produce a harmful outcome for a BC resident.",
      updated: "2026-04-22",
      history: [
        { stage: 0, date: "2026-04-22", note: "Initial draft started." },
      ],
    },
    {
      policy: "Federal Artificial Intelligence and Data Act (AIDA)",
      issuer: "Federal — Innovation, Science and Economic Development",
      pillar: "ethics",
      gov: "federal",
      title: "VCASSE submission on high-impact-system thresholds",
      lead: "Jonas Beaumont",
      stage: 0,
      blurb: "How AIDA's 'high-impact system' definition should be operationalised, with edge cases drawn from BC public-service deployments.",
      updated: "2026-04-23",
      history: [
        { stage: 0, date: "2026-04-23", note: "Initial draft underway." },
      ],
    },
    {
      policy: "BC Employment Standards review — algorithmic scheduling",
      issuer: "Province of BC — Ministry of Labour",
      pillar: "ethics",
      gov: "province",
      title: "VCASSE comment on worker consultation requirements",
      lead: "Jonas Beaumont",
      stage: 0,
      blurb: "Frontline workers should be consulted before AI-driven scheduling tools are introduced; here is the minimum process we propose.",
      updated: "2026-04-24",
      history: [
        { stage: 0, date: "2026-04-24", note: "Initial draft underway." },
      ],
    },
  ];

  const PILLAR_LABEL = { safety: 'Safety', sustainability: 'Sustainability', ethics: 'Ethics' };

  const listEl = document.getElementById('tracker-list');
  const kanbanEl = document.getElementById('tracker-kanban');
  const emptyEl = document.getElementById('tracker-empty');
  const statsEl = document.getElementById('tracker-stats');
  const countEl = document.getElementById('tracker-count');
  const searchEl = document.getElementById('tracker-search');
  const sortEl = document.getElementById('tracker-sort');
  const viewBtns = document.querySelectorAll('.tracker-view-toggle button');
  const pillarBtns = document.querySelectorAll('.tracker-filters [data-pillar]');
  const govBtns = document.querySelectorAll('.tracker-filters [data-gov]');

  const state = {
    pillar: 'all',
    gov: 'all',
    query: '',
    sort: 'recent',
    view: 'list',
    expanded: new Set(),
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function formatDate(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function briefId(b) {
    return 'b-' + (b.policy || b.title).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  function filtered() {
    const q = state.query.trim().toLowerCase();
    return BRIEFS.filter((b) => state.pillar === 'all' || b.pillar === state.pillar)
      .filter((b) => state.gov === 'all' || b.gov === state.gov)
      .filter((b) => {
        if (!q) return true;
        return (b.policy || '').toLowerCase().includes(q)
          || b.title.toLowerCase().includes(q)
          || (b.issuer || '').toLowerCase().includes(q)
          || (b.lead || '').toLowerCase().includes(q)
          || b.blurb.toLowerCase().includes(q);
      });
  }

  function sorted(items) {
    const arr = [...items];
    switch (state.sort) {
      case 'oldest':    arr.sort((a, b) => new Date(a.updated) - new Date(b.updated)); break;
      case 'stage-desc':arr.sort((a, b) => b.stage - a.stage || new Date(b.updated) - new Date(a.updated)); break;
      case 'stage-asc': arr.sort((a, b) => a.stage - b.stage || new Date(b.updated) - new Date(a.updated)); break;
      case 'title':     arr.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'recent':
      default:          arr.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }
    return arr;
  }

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

  function renderItem(b) {
    const id = briefId(b);
    const isOpen = state.expanded.has(id);

    return `
      <article class="tracker-item ${isOpen ? 'is-open' : ''}" data-id="${id}">
        <div class="tracker-item-head">
          <span class="pill pill--${b.pillar}">${PILLAR_LABEL[b.pillar]}</span>
          <span class="pill pill--all">${GOV_LABEL[b.gov]}</span>
          <h3 class="tracker-item-title">${escapeHtml(b.policy || b.title)}</h3>
          <span class="tracker-item-meta">Updated ${formatDate(b.updated)}</span>
        </div>
        <p class="tracker-item-issuer">${escapeHtml(b.issuer || '')}</p>
        <p class="tracker-item-response">
          <span class="tracker-item-response-tag">VCASSE comment</span>
          ${escapeHtml(b.title)}
        </p>
        <p class="tracker-item-blurb">
          ${escapeHtml(b.blurb)}
          <span class="tracker-item-target">— Lead: ${escapeHtml(b.lead || 'TBD')}</span>
        </p>
        <div class="tracker-stages" role="list" aria-label="Brief progress">
          ${STAGES.map((label, i) => `
            <div class="tracker-stage ${i < b.stage ? 'is-done' : ''} ${i === b.stage ? 'is-current' : ''}" role="listitem">
              <span class="tracker-stage-dot"></span>
              <span class="tracker-stage-label">${label}</span>
            </div>
          `).join('')}
        </div>
        <button type="button" class="tracker-toggle" data-toggle="${id}" aria-expanded="${isOpen}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          ${isOpen ? 'Hide' : 'Show'} stage history
        </button>
        <div class="tracker-history" ${isOpen ? '' : 'hidden'}>
          <ol>
            ${(b.history || []).map((h) => `
              <li>
                <span class="tracker-history-dot"></span>
                <div>
                  <span class="tracker-history-stage">${STAGES[h.stage]}</span>
                  <span class="tracker-history-date">${formatDate(h.date)}</span>
                  <p class="tracker-history-note">${escapeHtml(h.note)}</p>
                </div>
              </li>
            `).join('')}
          </ol>
        </div>
      </article>
    `;
  }

  function renderList() {
    const items = sorted(filtered());

    countEl.innerHTML = items.length === BRIEFS.length
      ? `Showing all <strong>${BRIEFS.length}</strong> briefs.`
      : `Showing <strong>${items.length}</strong> of <strong>${BRIEFS.length}</strong> briefs.`;

    if (items.length === 0) {
      listEl.hidden = true;
      kanbanEl.hidden = true;
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;

    if (state.view === 'list') {
      listEl.hidden = false;
      kanbanEl.hidden = true;
      listEl.innerHTML = items.map(renderItem).join('');
      bindListInteractions();
    } else {
      listEl.hidden = true;
      kanbanEl.hidden = false;
      kanbanEl.innerHTML = STAGES.map((label, i) => {
        const col = items.filter((b) => b.stage === i);
        return `
          <section class="tracker-col" aria-label="${label}">
            <header class="tracker-col-head">
              <span class="tracker-col-title">${label}</span>
              <span class="tracker-col-count">${col.length}</span>
            </header>
            <div class="tracker-col-body">
              ${col.length === 0
                ? `<p class="tracker-col-empty">—</p>`
                : col.map((b) => `
                    <article class="tracker-card">
                      <div class="tracker-card-head">
                        <span class="pill pill--${b.pillar}">${PILLAR_LABEL[b.pillar]}</span>
                        <span class="pill pill--all">${GOV_LABEL[b.gov]}</span>
                      </div>
                      <h4>${escapeHtml(b.policy || b.title)}</h4>
                      <p class="tracker-card-meta">${escapeHtml(b.issuer || '')}</p>
                      <p class="tracker-card-meta tracker-card-meta--response">VCASSE: ${escapeHtml(b.title)}</p>
                      <p class="tracker-card-date">Updated ${formatDate(b.updated)}</p>
                    </article>
                  `).join('')
              }
            </div>
          </section>
        `;
      }).join('');
    }
  }

  function bindListInteractions() {
    listEl.querySelectorAll('[data-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.toggle;
        if (state.expanded.has(id)) state.expanded.delete(id);
        else state.expanded.add(id);
        renderList();
      });
    });
  }

  searchEl.addEventListener('input', (e) => {
    state.query = e.target.value;
    renderList();
  });

  sortEl.addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderList();
  });

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      viewBtns.forEach((b) => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      state.view = btn.dataset.view;
      renderList();
    });
  });

  pillarBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      pillarBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.pillar = btn.dataset.pillar;
      renderList();
    });
  });

  govBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      govBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.gov = btn.dataset.gov;
      renderList();
    });
  });

  renderStats();
  renderList();
})();
