(function () {
  const QUESTIONS = [
    {
      pillar: 'safety',
      question: "What is an 'AI evaluation' in the safety sense?",
      options: [
        "A performance benchmark for new GPUs.",
        "A structured test that probes a model for unsafe or unintended behaviour before deployment.",
        "A user satisfaction survey collected after launch.",
        "A code review of the training pipeline."
      ],
      correct: 1,
      explain: "Safety evaluations are pre-deployment tests that surface failure modes — like jailbreaks, biased outputs, or hazardous instructions — so they can be mitigated before users are affected."
    },
    {
      pillar: 'safety',
      question: "Which of these is closest to the AI safety idea of 'alignment'?",
      options: [
        "Making sure the model's outputs match the goals and values its operators intended.",
        "Aligning the model's training data against a fixed schema.",
        "Centring the chat window on the page.",
        "Quantising weights for efficient inference."
      ],
      correct: 0,
      explain: "Alignment is the problem of getting an AI system to actually pursue the goals we want, including in situations its designers did not anticipate."
    },
    {
      pillar: 'safety',
      question: "If a deployed model starts producing harmful outputs, what is usually the first responsible step?",
      options: [
        "Wait and see if users complain.",
        "Quietly retrain on the affected prompts.",
        "Roll back or gate the feature, then investigate root cause and disclose appropriately.",
        "Blame the user for prompt engineering."
      ],
      correct: 2,
      explain: "Incident response in AI safety mirrors security incident response: contain the impact, investigate, and be transparent with affected stakeholders."
    },
    {
      pillar: 'sustainability',
      question: "Roughly, what is the dominant resource cost of training a frontier-scale language model?",
      options: [
        "Paper and printer toner in the office.",
        "Electricity for compute and cooling, with associated water for data-centre cooling.",
        "Bandwidth for downloading training data.",
        "Carbon offsets purchased afterwards."
      ],
      correct: 1,
      explain: "Frontier model training is dominated by electricity and cooling water use at the data-centre level. Reporting both is becoming a baseline expectation for responsible AI labs."
    },
    {
      pillar: 'sustainability',
      question: "Why might 'inference' (running a model in production) matter more than training over a model's lifetime?",
      options: [
        "Because training only happens once.",
        "Because inference happens billions of times across users, and small per-call costs add up.",
        "Because models forget their training without inference.",
        "Inference is always cheaper than training, so it doesn't matter."
      ],
      correct: 1,
      explain: "Training is large but bounded; inference is small per call but runs at scale. For widely deployed models, total inference energy can dwarf the training cost."
    },
    {
      pillar: 'sustainability',
      question: "Which of these is a credible way to reduce the environmental cost of using AI?",
      options: [
        "Always pick the largest model available.",
        "Match model size to the task — use smaller distilled models when they suffice.",
        "Run inference twice to double-check answers.",
        "Disable caching to keep results fresh."
      ],
      correct: 1,
      explain: "Right-sizing models is one of the highest-leverage levers. A well-chosen 8B model often matches a 70B model on narrow tasks at a fraction of the energy."
    },
    {
      pillar: 'ethics',
      question: "What does 'algorithmic bias' typically refer to?",
      options: [
        "A preference one engineer has for Python over Rust.",
        "Systematic, repeatable error in an AI system that produces unfair outcomes for some groups.",
        "A floating-point rounding error.",
        "An advertising preference set by the user."
      ],
      correct: 1,
      explain: "Algorithmic bias is structural: it flows from training data, modelling choices, and deployment context, and it lands hardest on groups that were under-represented or mis-represented in those steps."
    },
    {
      pillar: 'ethics',
      question: "A city is buying an AI system to triage 311 service requests. Which question matters MOST from an ethics standpoint?",
      options: [
        "Does the vendor's logo look professional?",
        "Will residents and frontline workers be told the system is in use, and can decisions be appealed?",
        "Is it the cheapest option?",
        "Does it use the latest model version?"
      ],
      correct: 1,
      explain: "Disclosure and contestability — knowing AI is involved and being able to challenge an outcome — are core procurement-ethics questions for civic AI."
    }
  ];

  const PILLAR_LABEL = { safety: 'Safety', sustainability: 'Sustainability', ethics: 'Ethics' };

  const root = document.getElementById('quiz-root');
  const state = {
    index: 0,
    selected: null,
    answers: [],
  };

  function render() {
    if (state.index >= QUESTIONS.length) return renderResult();
    const q = QUESTIONS[state.index];
    const pct = Math.round((state.index / QUESTIONS.length) * 100);

    root.innerHTML = `
      <div class="quiz-progress">
        <span>Question ${state.index + 1} of ${QUESTIONS.length}</span>
        <span class="quiz-progress-track"><span class="quiz-progress-fill" style="width:${pct}%"></span></span>
        <span class="pill pill--${q.pillar}">${PILLAR_LABEL[q.pillar]}</span>
      </div>
      <h2 class="quiz-question">${q.question}</h2>
      <div class="quiz-options" role="radiogroup" aria-label="Answer choices">
        ${q.options.map((opt, i) => `
          <button type="button" class="quiz-option" data-i="${i}" role="radio" aria-checked="false">${opt}</button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback" hidden></div>
      <div class="quiz-controls">
        <button type="button" class="btn btn-primary" id="quiz-next" disabled>
          ${state.index === QUESTIONS.length - 1 ? 'See results' : 'Next question'}
        </button>
        <span style="color:var(--text-muted);font-size:13px;">Pick the option that best matches what VCASSE would teach.</span>
      </div>
    `;

    root.querySelectorAll('.quiz-option').forEach((btn) => {
      btn.addEventListener('click', () => onSelect(parseInt(btn.dataset.i, 10)));
    });
    root.querySelector('#quiz-next').addEventListener('click', onNext);
  }

  function onSelect(i) {
    const q = QUESTIONS[state.index];
    state.selected = i;

    root.querySelectorAll('.quiz-option').forEach((btn) => {
      const idx = parseInt(btn.dataset.i, 10);
      btn.classList.remove('is-selected', 'is-correct', 'is-wrong');
      btn.setAttribute('aria-checked', idx === i ? 'true' : 'false');
      if (idx === q.correct) btn.classList.add('is-correct');
      else if (idx === i) btn.classList.add('is-wrong');
      btn.disabled = true;
    });

    const fb = root.querySelector('#quiz-feedback');
    fb.hidden = false;
    fb.innerHTML = (i === q.correct ? '<strong>Correct.</strong> ' : '<strong>Not quite.</strong> ') + q.explain;

    root.querySelector('#quiz-next').disabled = false;
  }

  function onNext() {
    const q = QUESTIONS[state.index];
    state.answers.push({ pillar: q.pillar, correct: state.selected === q.correct });
    state.selected = null;
    state.index += 1;
    render();
  }

  function renderResult() {
    const total = state.answers.length;
    const correct = state.answers.filter((a) => a.correct).length;
    const pct = Math.round((correct / total) * 100);

    const byPillar = { safety: { c: 0, t: 0 }, sustainability: { c: 0, t: 0 }, ethics: { c: 0, t: 0 } };
    state.answers.forEach((a) => {
      byPillar[a.pillar].t += 1;
      if (a.correct) byPillar[a.pillar].c += 1;
    });

    let verdict;
    if (pct >= 87) verdict = "Excellent — you could comfortably explain VCASSE's three pillars to a friend.";
    else if (pct >= 62) verdict = "Solid grounding. A few gaps to fill in with our publications.";
    else if (pct >= 37) verdict = "Good start. Our plain-language briefs are written exactly for this stage.";
    else verdict = "Welcome — start with our 'About' page and one publication from each pillar.";

    root.innerHTML = `
      <div class="quiz-result">
        <p class="example-hero-kicker" style="margin-bottom:8px;">Your score</p>
        <div class="quiz-result-score">${correct} / ${total}</div>
        <p style="color:var(--text-muted);margin-top:8px;">${pct}% correct overall</p>

        <div class="quiz-result-pillars">
          ${['safety', 'sustainability', 'ethics'].map((p) => `
            <div class="quiz-pillar-stat">
              <div class="quiz-pillar-stat-value">${byPillar[p].c}/${byPillar[p].t}</div>
              <div class="quiz-pillar-stat-label">${PILLAR_LABEL[p]}</div>
            </div>
          `).join('')}
        </div>

        <p style="font-family:var(--font-serif);font-size:1.1rem;font-style:italic;color:var(--text-dark);margin:18px 0 26px;">${verdict}</p>

        <div class="quiz-controls" style="justify-content:center;">
          <button type="button" class="btn btn-secondary" id="quiz-restart">Take it again</button>
          <a class="btn btn-primary" href="../dev/publications.html">Read VCASSE publications</a>
        </div>
      </div>
    `;

    root.querySelector('#quiz-restart').addEventListener('click', () => {
      state.index = 0;
      state.selected = null;
      state.answers = [];
      render();
    });
  }

  render();
})();
