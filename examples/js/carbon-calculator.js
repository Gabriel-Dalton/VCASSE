(function () {
  // Per-query (or per-unit) inference energy in watt-hours, by model class.
  // Illustrative figures from public reporting on commercial AI inference;
  // intended to show scale, not to be a research instrument.
  const PER_UNIT_WH = {
    chat:  { small: 0.3,  mid: 1.0,  frontier: 3.0 },   // per message
    long:  { small: 1.5,  mid: 5.0,  frontier: 15.0 },  // per long-form generation
    code:  { small: 0.2,  mid: 0.6,  frontier: 1.8 },   // per completion
    image: { small: 1.0,  mid: 2.5,  frontier: 6.0 },   // per image
    voice: { small: 0.05, mid: 0.15, frontier: 0.4 },   // per minute of audio
    video: { small: 30,   mid: 80,   frontier: 200 },   // per short clip
  };

  const ACTIVITY_LABEL = {
    chat: 'Chat',
    long: 'Long-form',
    code: 'Code',
    image: 'Images',
    voice: 'Voice',
    video: 'Video',
  };

  const ACTIVITY_COLOR = {
    chat:  '#1a6db5',
    long:  '#0d4f8b',
    code:  '#1f8a6b',
    image: '#8a4a8a',
    voice: '#c2410c',
    video: '#374151',
  };

  // Water (mL) consumed in cooling per Wh of inference, by grid scenario.
  const WATER_ML_PER_WH = { bc: 0.05, us: 0.5, coal: 0.7 };
  // gCO2e per Wh of electricity, by scenario.
  const CO2_PER_WH      = { bc: 0.05, us: 0.40, coal: 0.95 };

  const DAYS_PER_WEEK = 7;

  // Rough Vancouver-resident benchmark in gCO2e/week. Tunable.
  const VANCOUVER_AVG_WEEKLY_CO2 = 35;

  // Categories with their daily/weekly cadence (video is a weekly slider).
  const CATEGORIES = [
    { key: 'chat',  cadence: 'daily',  inputId: 'chats'  },
    { key: 'long',  cadence: 'daily',  inputId: 'long'   },
    { key: 'code',  cadence: 'daily',  inputId: 'code'   },
    { key: 'image', cadence: 'daily',  inputId: 'images' },
    { key: 'voice', cadence: 'daily',  inputId: 'voice'  },
    { key: 'video', cadence: 'weekly', inputId: 'video'  },
  ];

  const PRESETS = {
    light:   { chats: 5,   long: 1,  code: 0,   images: 0, voice: 0,  video: 0, model: 'small',    grid: 'bc' },
    typical: { chats: 20,  long: 3,  code: 15,  images: 2, voice: 0,  video: 0, model: 'mid',      grid: 'bc' },
    heavy:   { chats: 60,  long: 10, code: 80,  images: 6, voice: 15, video: 1, model: 'mid',      grid: 'us' },
    power:   { chats: 150, long: 25, code: 250, images: 20,voice: 60, video: 5, model: 'frontier', grid: 'us' },
  };

  const inputs = {
    chats:  document.getElementById('chats'),
    long:   document.getElementById('long'),
    code:   document.getElementById('code'),
    images: document.getElementById('images'),
    voice:  document.getElementById('voice'),
    video:  document.getElementById('video'),
    model:  document.getElementById('model'),
    grid:   document.getElementById('grid'),
  };

  const outs = {
    chats:  document.querySelector('[data-out="chats"]'),
    long:   document.querySelector('[data-out="long"]'),
    code:   document.querySelector('[data-out="code"]'),
    images: document.querySelector('[data-out="images"]'),
    voice:  document.querySelector('[data-out="voice"]'),
    video:  document.querySelector('[data-out="video"]'),
    co2:    document.getElementById('co2-out'),
    kwh:    document.getElementById('kwh-out'),
    water:  document.getElementById('water-out'),
    annual: document.getElementById('annual-out'),
    equiv:  document.getElementById('equiv-out'),
    bench:  document.getElementById('bench-out'),
    bar:    document.getElementById('attr-bar'),
    legend: document.getElementById('attr-legend'),
    tips:   document.getElementById('tips-out'),
  };

  const presetBtns = document.querySelectorAll('.calc-preset');

  function fmt(n) {
    if (!isFinite(n)) return '0';
    if (n >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
    if (n >= 10) return n.toFixed(0);
    if (n >= 1) return n.toFixed(1);
    return n.toFixed(2);
  }

  function compute() {
    const model = inputs.model.value;
    const grid = inputs.grid.value;

    // Reflect raw inputs into their counters.
    ['chats', 'long', 'code', 'images', 'voice', 'video'].forEach((k) => {
      outs[k].textContent = inputs[k].value;
    });

    // Per-activity Wh per week.
    const perActivityWh = {};
    CATEGORIES.forEach(({ key, cadence, inputId }) => {
      const count = +inputs[inputId].value;
      const wh = count * PER_UNIT_WH[key][model] * (cadence === 'daily' ? DAYS_PER_WEEK : 1);
      perActivityWh[key] = wh;
    });

    const weeklyWh = Object.values(perActivityWh).reduce((a, b) => a + b, 0);
    const weeklyCO2   = weeklyWh * CO2_PER_WH[grid];
    const weeklyWater = weeklyWh * WATER_ML_PER_WH[grid];
    const annualKg    = (weeklyCO2 * 52) / 1000;

    outs.co2.textContent    = fmt(weeklyCO2);
    outs.kwh.textContent    = fmt(weeklyWh);
    outs.water.textContent  = fmt(weeklyWater);
    outs.annual.textContent = fmt(annualKg);

    renderAttribution(perActivityWh, weeklyWh);
    outs.equiv.innerHTML = describeEquivalents(weeklyCO2, weeklyWater, weeklyWh);
    outs.bench.innerHTML = describeBenchmark(weeklyCO2);
    outs.tips.innerHTML  = renderTips(perActivityWh, weeklyWh, model, grid);
  }

  function renderAttribution(perActivityWh, total) {
    if (total <= 0) {
      outs.bar.innerHTML = '<span class="calc-attr-empty">No usage entered yet — try a preset.</span>';
      outs.legend.innerHTML = '';
      return;
    }

    const ranked = Object.entries(perActivityWh)
      .filter(([, wh]) => wh > 0)
      .sort((a, b) => b[1] - a[1]);

    outs.bar.innerHTML = ranked.map(([key, wh]) => {
      const pct = (wh / total) * 100;
      return `<span class="calc-attr-seg" style="width:${pct}%;background:${ACTIVITY_COLOR[key]};" title="${ACTIVITY_LABEL[key]} — ${pct.toFixed(0)}%"></span>`;
    }).join('');

    outs.legend.innerHTML = ranked.map(([key, wh]) => {
      const pct = (wh / total) * 100;
      return `<li>
        <span class="calc-attr-swatch" style="background:${ACTIVITY_COLOR[key]};"></span>
        <span>${ACTIVITY_LABEL[key]}</span>
        <span class="calc-attr-pct">${pct.toFixed(0)}%</span>
      </li>`;
    }).join('');
  }

  function describeEquivalents(co2, waterMl, wh) {
    if (co2 < 0.1) {
      return "<strong>Effectively zero.</strong> Your weekly AI use is below the noise floor of common household activities.";
    }
    // Reference points (rounded for legibility):
    //   Boiling 1L of water in a kettle ≈ 100 Wh
    //   Driving 1 km in a typical car   ≈ 180 g CO₂
    //   A standard cup of tap water     ≈ 250 mL
    const kettles = wh / 100;
    const km = co2 / 180;
    const cups = waterMl / 250;

    const parts = [];
    if (kettles >= 0.1) parts.push(`<strong>${fmt(kettles)}</strong> kettles boiled`);
    if (km >= 0.05)     parts.push(`<strong>${fmt(km)}</strong> km of car driving`);
    if (cups >= 0.05)   parts.push(`<strong>${fmt(cups)}</strong> cups of cooling water`);

    if (parts.length === 0) return "<strong>Roughly nothing.</strong> Below the threshold of common equivalents.";
    return "Roughly equivalent each week to: " + parts.join(', ') + ".";
  }

  function describeBenchmark(co2) {
    if (co2 <= 0) return '';
    const ratio = co2 / VANCOUVER_AVG_WEEKLY_CO2;
    let label, tone;
    if (ratio < 0.5)      { label = `${(ratio * 100).toFixed(0)}% of a typical Vancouverite's AI footprint`; tone = 'low'; }
    else if (ratio < 1.5) { label = 'about average for a Vancouver resident'; tone = 'mid'; }
    else if (ratio < 3)   { label = `${ratio.toFixed(1)}× the typical Vancouverite`; tone = 'high'; }
    else                  { label = `${ratio.toFixed(0)}× the typical Vancouverite`; tone = 'high'; }

    return `<span class="calc-bench-pill calc-bench--${tone}">${label}</span>`;
  }

  function renderTips(perActivityWh, total, model, grid) {
    if (total <= 0) return '';
    const ranked = Object.entries(perActivityWh).filter(([, w]) => w > 0).sort((a, b) => b[1] - a[1]);
    const top = ranked[0] && ranked[0][0];
    const tips = [];

    if (model === 'frontier') {
      tips.push(`Switch the <strong>default model class</strong> to mid-size for routine work — frontier models cost roughly 3× the energy per query.`);
    }
    if (grid !== 'bc') {
      tips.push(`Where possible, choose providers that run on <strong>low-carbon grids</strong>. The same query can cost 8–19× more CO₂ on a coal-heavy grid than on BC hydro.`);
    }
    if (top === 'video') {
      tips.push(`Video generation is your top contributor. Each clip can equal hundreds of chat messages — only generate when you'd otherwise commission a video.`);
    } else if (top === 'image') {
      tips.push(`Image generation dominates your week. Reuse outputs and avoid 'regenerate' loops — each retry has the same cost as the first.`);
    } else if (top === 'long') {
      tips.push(`Long-form generations are your biggest line item. Shorter, more iterative prompts often beat one giant request and use far less compute.`);
    } else if (top === 'code') {
      tips.push(`Code completions are dominating. Limit autocomplete to files you're actively editing rather than triggering it on every keystroke.`);
    } else if (top === 'voice') {
      tips.push(`Voice is your top contributor. Batch transcriptions instead of running them in real time when latency doesn't matter.`);
    } else if (top === 'chat') {
      tips.push(`Most of your footprint is short chats. Caching frequent questions or using a smaller model for them is the single highest-leverage change you can make.`);
    }

    if (tips.length === 0) return '';
    return `<p class="calc-tips-title">How to lower this</p><ul class="calc-tips-list">${tips.map(t => `<li>${t}</li>`).join('')}</ul>`;
  }

  function applyPreset(name) {
    const p = PRESETS[name];
    if (!p) return;
    Object.keys(p).forEach((k) => { if (inputs[k]) inputs[k].value = p[k]; });
    presetBtns.forEach((b) => b.classList.toggle('is-active', b.dataset.preset === name));
    compute();
  }

  presetBtns.forEach((btn) => btn.addEventListener('click', () => applyPreset(btn.dataset.preset)));

  Object.values(inputs).forEach((el) => el.addEventListener('input', () => {
    presetBtns.forEach((b) => b.classList.remove('is-active'));
    compute();
  }));

  compute();
})();
