(function () {
  const TERMS = [
    {
      id: 'alignment',
      term: "Alignment",
      pillar: "safety",
      level: "intermediate",
      def: "The problem of getting an AI system to actually pursue the goals its operators intended, even in situations the designers didn't anticipate.",
      seeAlso: ['evaluation', 'red-team']
    },
    {
      id: 'algorithmic-bias',
      term: "Algorithmic bias",
      pillar: "ethics",
      level: "beginner",
      def: "Systematic, repeatable error in an AI system that produces unfair outcomes for some groups — usually traceable to training data, modelling choices, or deployment context.",
      seeAlso: ['audit', 'model-card']
    },
    {
      id: 'audit',
      term: "Audit (AI audit)",
      pillar: "ethics",
      level: "intermediate",
      def: "An independent examination of an AI system to check whether it does what it claims, who it works for, and who it leaves behind.",
      seeAlso: ['algorithmic-bias', 'evaluation']
    },
    {
      id: 'carbon-aware',
      term: "Carbon-aware computing",
      pillar: "sustainability",
      level: "intermediate",
      def: "Scheduling AI workloads — especially training — for times and regions when the local grid is greener, e.g. when hydro or wind output is high.",
      seeAlso: ['compute', 'right-sizing']
    },
    {
      id: 'compute',
      term: "Compute",
      pillar: "sustainability",
      level: "beginner",
      def: "The processing power needed to train or run an AI model. Usually measured in GPU-hours and translated into electricity and cooling water at the data centre.",
      seeAlso: ['training', 'inference']
    },
    {
      id: 'deepfake',
      term: "Deepfake",
      pillar: "ethics",
      level: "beginner",
      def: "Synthetic media — usually images, video, or audio — that depicts a real person doing or saying something they did not. A core ethics concern around consent, fraud, and democratic integrity.",
      seeAlso: ['watermarking', 'disclosure']
    },
    {
      id: 'disclosure',
      term: "Disclosure",
      pillar: "ethics",
      level: "beginner",
      def: "Telling people that AI is being used in a decision or service that affects them, in language they can understand and act on.",
      seeAlso: ['procurement', 'audit']
    },
    {
      id: 'evaluation',
      term: "Evaluation (eval)",
      pillar: "safety",
      level: "intermediate",
      def: "A structured test that probes an AI system for unsafe or unintended behaviour before deployment — for example, testing whether a model can be jailbroken into giving hazardous instructions.",
      seeAlso: ['red-team', 'jailbreak', 'alignment']
    },
    {
      id: 'foundation-model',
      term: "Foundation model",
      pillar: "safety",
      level: "intermediate",
      def: "A large general-purpose AI model trained on broad data, intended to be adapted to many downstream tasks. Most current commercial chat models are foundation models.",
      seeAlso: ['weight', 'training']
    },
    {
      id: 'hallucination',
      term: "Hallucination",
      pillar: "safety",
      level: "beginner",
      def: "When a language model produces text that sounds confident but is factually wrong or fabricated. Mitigated, not eliminated, by techniques like retrieval and citations.",
      seeAlso: ['rag', 'evaluation']
    },
    {
      id: 'inference',
      term: "Inference",
      pillar: "sustainability",
      level: "beginner",
      def: "Running a trained model in production to answer a query. For widely deployed models, total inference energy can dwarf the cost of original training.",
      seeAlso: ['training', 'compute', 'right-sizing']
    },
    {
      id: 'jailbreak',
      term: "Jailbreak",
      pillar: "safety",
      level: "beginner",
      def: "A prompt or technique that gets a deployed AI system to bypass its safety guardrails. A common target of red-team evaluations.",
      seeAlso: ['red-team', 'evaluation']
    },
    {
      id: 'model-card',
      term: "Model card",
      pillar: "ethics",
      level: "intermediate",
      def: "A short structured document that ships with a model describing its intended use, known limitations, training data sources, and evaluation results.",
      seeAlso: ['disclosure', 'audit']
    },
    {
      id: 'procurement',
      term: "Procurement (responsible AI procurement)",
      pillar: "ethics",
      level: "advanced",
      def: "The discipline of buying AI systems for an organisation in a way that bakes in safety, sustainability, and ethics requirements before the contract is signed.",
      seeAlso: ['disclosure', 'audit', 'model-card']
    },
    {
      id: 'red-team',
      term: "Red team",
      pillar: "safety",
      level: "intermediate",
      def: "A team whose explicit job is to attack an AI system — find jailbreaks, biases, and failure modes — so that defenders can fix them before launch.",
      seeAlso: ['jailbreak', 'evaluation']
    },
    {
      id: 'rag',
      term: "Retrieval-Augmented Generation (RAG)",
      pillar: "safety",
      level: "advanced",
      def: "A technique where a language model looks up relevant documents at query time and grounds its answer in them, reducing hallucinations.",
      seeAlso: ['hallucination', 'inference']
    },
    {
      id: 'right-sizing',
      term: "Right-sizing",
      pillar: "sustainability",
      level: "intermediate",
      def: "Choosing the smallest model that does the job well. Often the highest-leverage way to cut the energy and cost of an AI deployment.",
      seeAlso: ['inference', 'compute', 'carbon-aware']
    },
    {
      id: 'training',
      term: "Training",
      pillar: "sustainability",
      level: "beginner",
      def: "The (usually one-time, expensive) process of teaching a model from data. Frontier-model training is dominated by electricity and cooling water at the data-centre level.",
      seeAlso: ['inference', 'compute']
    },
    {
      id: 'watermarking',
      term: "Watermarking",
      pillar: "ethics",
      level: "advanced",
      def: "Embedding a hidden signal in AI-generated content so it can later be identified as machine-made. An active and contested area of policy.",
      seeAlso: ['deepfake', 'disclosure']
    },
    {
      id: 'weight',
      term: "Weight (model weight)",
      pillar: "safety",
      level: "advanced",
      def: "The learned numerical parameters that make a model do what it does. Releasing model weights changes the security and safety calculus dramatically.",
      seeAlso: ['foundation-model', 'training']
    },
  ];

  const TERM_BY_ID = Object.fromEntries(TERMS.map(t => [t.id, t]));
  const PILLAR_LABEL = { safety: 'Safety', sustainability: 'Sustainability', ethics: 'Ethics' };
  const LEVEL_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };

  const listEl = document.getElementById('glossary-list');
  const emptyEl = document.getElementById('glossary-empty');
  const searchEl = document.getElementById('glossary-search');
  const countEl = document.getElementById('glossary-count');
  const lettersEl = document.getElementById('glossary-letters');
  const pillarFilters = document.querySelectorAll('.glossary-filter:not(.glossary-filter--level)');
  const levelFilters = document.querySelectorAll('.glossary-filter--level');

  const state = { query: '', pillar: 'all', level: 'all' };

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function highlight(text, q) {
    if (!q) return text;
    const re = new RegExp('(' + q.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'ig');
    return text.replace(re, '<mark>$1</mark>');
  }

  function renderLetters(items) {
    const present = new Set(items.map(t => t.term[0].toUpperCase()));
    const all = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    lettersEl.innerHTML = all.split('').map(L => {
      const has = present.has(L);
      return `<button type="button" class="glossary-letter ${has ? '' : 'is-disabled'}" data-letter="${L}" ${has ? '' : 'disabled aria-disabled="true"'}>${L}</button>`;
    }).join('');
  }

  function render() {
    const q = state.query.trim().toLowerCase();
    const items = TERMS
      .filter((t) => state.pillar === 'all' || t.pillar === state.pillar)
      .filter((t) => state.level === 'all' || t.level === state.level)
      .filter((t) => !q || t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q))
      .sort((a, b) => a.term.localeCompare(b.term));

    const total = TERMS.length;
    countEl.innerHTML = items.length === total
      ? `Showing all <strong>${total}</strong> terms.`
      : `Showing <strong>${items.length}</strong> of <strong>${total}</strong> terms.`;

    renderLetters(items);

    if (items.length === 0) {
      listEl.innerHTML = '';
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;

    listEl.innerHTML = items.map((t) => {
      const seeAlso = (t.seeAlso || [])
        .map(id => TERM_BY_ID[id])
        .filter(Boolean)
        .map(ref => `<a class="glossary-xref" href="#${ref.id}" data-jump="${ref.id}">${escapeHtml(ref.term.split(' (')[0])}</a>`)
        .join(' · ');

      return `
        <article class="glossary-item" id="${t.id}" data-letter="${t.term[0].toUpperCase()}">
          <div class="glossary-item-header">
            <a class="glossary-term" href="#${t.id}" data-copy="${t.id}" title="Copy link to this term">${escapeHtml(t.term)}</a>
            <span class="pill pill--${t.pillar}">${PILLAR_LABEL[t.pillar]}</span>
            <span class="glossary-level glossary-level--${t.level}">${LEVEL_LABEL[t.level]}</span>
          </div>
          <p class="glossary-def">${highlight(escapeHtml(t.def), q)}</p>
          ${seeAlso ? `<p class="glossary-seealso"><span>See also:</span> ${seeAlso}</p>` : ''}
        </article>
      `;
    }).join('');

    // Cross-reference jumping (animated highlight on the target).
    listEl.querySelectorAll('[data-jump]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.dataset.jump;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        history.replaceState(null, '', '#' + id);
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.remove('is-flash');
        // Force reflow so the animation can re-trigger.
        void target.offsetWidth;
        target.classList.add('is-flash');
      });
    });

    // Click on the term heading copies a deep link.
    listEl.querySelectorAll('[data-copy]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const id = a.dataset.copy;
        const url = location.origin + location.pathname + '#' + id;
        history.replaceState(null, '', '#' + id);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => flashCopied(a)).catch(() => {});
        }
      });
    });

    // Initial deep-link target — flash highlight if URL has a hash.
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.classList.add('is-flash');
        target.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
  }

  function flashCopied(a) {
    const prev = a.getAttribute('data-prev-text') || a.textContent;
    a.setAttribute('data-prev-text', prev);
    a.classList.add('is-copied');
    a.textContent = 'Link copied ✓';
    setTimeout(() => {
      a.classList.remove('is-copied');
      a.textContent = prev;
      a.removeAttribute('data-prev-text');
    }, 1300);
  }

  // Letter index click → scroll to first term starting with that letter.
  lettersEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.glossary-letter');
    if (!btn || btn.disabled) return;
    const L = btn.dataset.letter;
    const target = listEl.querySelector(`.glossary-item[data-letter="${L}"]`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  searchEl.addEventListener('input', (e) => {
    state.query = e.target.value;
    render();
  });

  pillarFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      pillarFilters.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.pillar = btn.dataset.pillar;
      render();
    });
  });

  levelFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      levelFilters.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.level = btn.dataset.level;
      render();
    });
  });

  // Keyboard: '/' to focus search, Esc to clear.
  document.addEventListener('keydown', (e) => {
    const tag = (e.target.tagName || '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
    if (e.key === '/' && !typing) {
      e.preventDefault();
      searchEl.focus();
      searchEl.select();
    } else if (e.key === 'Escape' && document.activeElement === searchEl) {
      searchEl.value = '';
      state.query = '';
      render();
      searchEl.blur();
    }
  });

  render();
})();
