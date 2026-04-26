(function () {
  const STORAGE_KEY = 'vcasse_question_wall_v1';
  const VOTED_KEY = 'vcasse_question_wall_voted_v1';
  const PILLAR_LABEL = { safety: 'Safety', sustainability: 'Sustainability', ethics: 'Ethics' };

  const SEEDED = [
    {
      id: 'q-1',
      text: "Should the City of Vancouver be required to publish a list of every AI system it uses in resident-facing services?",
      pillar: "ethics",
      votes: 47,
      created: "2026-04-12",
    },
    {
      id: 'q-2',
      text: "What's a fair way to charge AI providers for the BC water and electricity their data centres use?",
      pillar: "sustainability",
      votes: 38,
      created: "2026-04-08",
    },
    {
      id: 'q-3',
      text: "If an AI tool denies someone a service, who is responsible — the vendor, the City, or the manager who approved it?",
      pillar: "ethics",
      votes: 35,
      created: "2026-04-15",
    },
    {
      id: 'q-4',
      text: "How do we evaluate whether a chatbot deployed by a public agency is actually safe for vulnerable users?",
      pillar: "safety",
      votes: 28,
      created: "2026-04-19",
    },
    {
      id: 'q-5',
      text: "Should AI-generated content in political advertising have to be labelled in BC?",
      pillar: "ethics",
      votes: 22,
      created: "2026-04-22",
    },
  ];

  const form = document.getElementById('qw-form');
  const textEl = document.getElementById('qw-text');
  const counterEl = document.getElementById('qw-counter');
  const listEl = document.getElementById('qw-list');
  const pillarBtns = document.querySelectorAll('.qw-form-pillars button');

  let selectedPillar = 'ethics';

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [...SEEDED];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [...SEEDED];
      return parsed;
    } catch {
      return [...SEEDED];
    }
  }

  function save(qs) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(qs)); } catch { /* noop */ }
  }

  function loadVoted() {
    try {
      const raw = localStorage.getItem(VOTED_KEY);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  }

  function saveVoted(set) {
    try { localStorage.setItem(VOTED_KEY, JSON.stringify([...set])); } catch { /* noop */ }
  }

  let questions = load();
  let voted = loadVoted();

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function formatDate(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  function render() {
    if (questions.length === 0) {
      listEl.innerHTML = `<div class="qw-empty">No questions yet. Be the first to ask.</div>`;
      return;
    }

    const sorted = [...questions].sort((a, b) => b.votes - a.votes);

    listEl.innerHTML = sorted.map((q) => {
      const isVoted = voted.has(q.id);
      return `
        <article class="qw-item" data-id="${q.id}">
          <div class="qw-vote">
            <button type="button" class="qw-upvote ${isVoted ? 'is-voted' : ''}" aria-pressed="${isVoted}" aria-label="Upvote question">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5l7 7H5z"/></svg>
            </button>
            <span class="qw-vote-count">${q.votes}</span>
          </div>
          <div>
            <p class="qw-question">${escapeHtml(q.text)}</p>
            <div class="qw-meta">
              <span class="pill pill--${q.pillar}">${PILLAR_LABEL[q.pillar]}</span>
              <span>${formatDate(q.created)}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    listEl.querySelectorAll('.qw-item').forEach((el) => {
      const id = el.dataset.id;
      const btn = el.querySelector('.qw-upvote');
      btn.addEventListener('click', () => toggleVote(id));
    });
  }

  function toggleVote(id) {
    const q = questions.find((x) => x.id === id);
    if (!q) return;

    if (voted.has(id)) {
      voted.delete(id);
      q.votes = Math.max(0, q.votes - 1);
    } else {
      voted.add(id);
      q.votes += 1;
    }
    save(questions);
    saveVoted(voted);
    render();
  }

  pillarBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      pillarBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      selectedPillar = btn.dataset.pillar;
    });
  });

  textEl.addEventListener('input', () => {
    counterEl.textContent = `${textEl.value.length} / 240`;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = textEl.value.trim();
    if (text.length < 8) return;

    const id = 'q-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
    questions.push({
      id,
      text,
      pillar: selectedPillar,
      votes: 1,
      created: new Date().toISOString().slice(0, 10),
    });
    voted.add(id);
    save(questions);
    saveVoted(voted);

    textEl.value = '';
    counterEl.textContent = '0 / 240';
    render();
  });

  render();
})();
