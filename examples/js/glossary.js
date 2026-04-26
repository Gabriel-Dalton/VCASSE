(function () {
  const TERMS = [
    {
      term: "Alignment",
      pillar: "safety",
      def: "The problem of getting an AI system to actually pursue the goals its operators intended, even in situations the designers didn't anticipate."
    },
    {
      term: "Algorithmic bias",
      pillar: "ethics",
      def: "Systematic, repeatable error in an AI system that produces unfair outcomes for some groups — usually traceable to training data, modelling choices, or deployment context."
    },
    {
      term: "Audit (AI audit)",
      pillar: "ethics",
      def: "An independent examination of an AI system to check whether it does what it claims, who it works for, and who it leaves behind."
    },
    {
      term: "Carbon-aware computing",
      pillar: "sustainability",
      def: "Scheduling AI workloads — especially training — for times and regions when the local grid is greener, e.g. when hydro or wind output is high."
    },
    {
      term: "Compute",
      pillar: "sustainability",
      def: "The processing power needed to train or run an AI model. Usually measured in GPU-hours and translated into electricity and cooling water at the data centre."
    },
    {
      term: "Deepfake",
      pillar: "ethics",
      def: "Synthetic media — usually images, video, or audio — that depicts a real person doing or saying something they did not. A core ethics concern around consent, fraud, and democratic integrity."
    },
    {
      term: "Disclosure",
      pillar: "ethics",
      def: "Telling people that AI is being used in a decision or service that affects them, in language they can understand and act on."
    },
    {
      term: "Evaluation (eval)",
      pillar: "safety",
      def: "A structured test that probes an AI system for unsafe or unintended behaviour before deployment — for example, testing whether a model can be jailbroken into giving hazardous instructions."
    },
    {
      term: "Foundation model",
      pillar: "safety",
      def: "A large general-purpose AI model trained on broad data, intended to be adapted to many downstream tasks. Most current commercial chat models are foundation models."
    },
    {
      term: "Hallucination",
      pillar: "safety",
      def: "When a language model produces text that sounds confident but is factually wrong or fabricated. Mitigated, not eliminated, by techniques like retrieval and citations."
    },
    {
      term: "Inference",
      pillar: "sustainability",
      def: "Running a trained model in production to answer a query. For widely deployed models, total inference energy can dwarf the cost of original training."
    },
    {
      term: "Jailbreak",
      pillar: "safety",
      def: "A prompt or technique that gets a deployed AI system to bypass its safety guardrails. A common target of red-team evaluations."
    },
    {
      term: "Model card",
      pillar: "ethics",
      def: "A short structured document that ships with a model describing its intended use, known limitations, training data sources, and evaluation results."
    },
    {
      term: "Procurement (responsible AI procurement)",
      pillar: "ethics",
      def: "The discipline of buying AI systems for an organisation in a way that bakes in safety, sustainability, and ethics requirements before the contract is signed."
    },
    {
      term: "Red team",
      pillar: "safety",
      def: "A team whose explicit job is to attack an AI system — find jailbreaks, biases, and failure modes — so that defenders can fix them before launch."
    },
    {
      term: "Retrieval-Augmented Generation (RAG)",
      pillar: "safety",
      def: "A technique where a language model looks up relevant documents at query time and grounds its answer in them, reducing hallucinations."
    },
    {
      term: "Right-sizing",
      pillar: "sustainability",
      def: "Choosing the smallest model that does the job well. Often the highest-leverage way to cut the energy and cost of an AI deployment."
    },
    {
      term: "Training",
      pillar: "sustainability",
      def: "The (usually one-time, expensive) process of teaching a model from data. Frontier-model training is dominated by electricity and cooling water at the data-centre level."
    },
    {
      term: "Watermarking",
      pillar: "ethics",
      def: "Embedding a hidden signal in AI-generated content so it can later be identified as machine-made. An active and contested area of policy."
    },
    {
      term: "Weight (model weight)",
      pillar: "safety",
      def: "The learned numerical parameters that make a model do what it does. Releasing model weights changes the security and safety calculus dramatically."
    },
  ];

  const PILLAR_LABEL = { safety: 'Safety', sustainability: 'Sustainability', ethics: 'Ethics' };

  const listEl = document.getElementById('glossary-list');
  const emptyEl = document.getElementById('glossary-empty');
  const searchEl = document.getElementById('glossary-search');
  const filters = document.querySelectorAll('.glossary-filter');

  const state = { query: '', pillar: 'all' };

  function render() {
    const q = state.query.trim().toLowerCase();
    const items = TERMS
      .filter((t) => state.pillar === 'all' || t.pillar === state.pillar)
      .filter((t) => !q || t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q))
      .sort((a, b) => a.term.localeCompare(b.term));

    if (items.length === 0) {
      listEl.innerHTML = '';
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;

    listEl.innerHTML = items.map((t) => `
      <article class="glossary-item">
        <div class="glossary-item-header">
          <span class="glossary-term">${escapeHtml(t.term)}</span>
          <span class="pill pill--${t.pillar}">${PILLAR_LABEL[t.pillar]}</span>
        </div>
        <p class="glossary-def">${highlight(escapeHtml(t.def), q)}</p>
      </article>
    `).join('');
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function highlight(text, q) {
    if (!q) return text;
    const re = new RegExp('(' + q.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'ig');
    return text.replace(re, '<mark style="background:#fff3cd;color:inherit;border-radius:3px;padding:0 2px;">$1</mark>');
  }

  searchEl.addEventListener('input', (e) => {
    state.query = e.target.value;
    render();
  });

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.pillar = btn.dataset.pillar;
      render();
    });
  });

  render();
})();
