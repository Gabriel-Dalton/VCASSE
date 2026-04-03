(() => {
  const STORAGE_KEY = 'vcasse_extension_totals';
  const SITE_KEY = `vcasse_site_${location.hostname}`;

  const PROFILES = {
    light: { waterPerTokenMl: 0.00022, energyPerTokenWh: 0.0002, carbonPerKwhKg: 0.25 },
    balanced: { waterPerTokenMl: 0.00035, energyPerTokenWh: 0.00032, carbonPerKwhKg: 0.30 },
    heavy: { waterPerTokenMl: 0.0008, energyPerTokenWh: 0.00075, carbonPerKwhKg: 0.38 }
  };

  const host = document.createElement('div');
  host.id = 'vcasse-sustainability-root';
  document.documentElement.appendChild(host);

  const chip = document.createElement('button');
  chip.className = 'vcasse-chip';
  chip.type = 'button';
  chip.textContent = 'AI Sustainability';

  const panel = document.createElement('section');
  panel.className = 'vcasse-panel';
  panel.hidden = true;

  panel.innerHTML = `
    <h3 class="vcasse-title">VCASSE Sustainability Tracker</h3>
    <p class="vcasse-site">${location.hostname}</p>
    <p class="vcasse-row"><span>Detected prompts</span><strong id="vcassePrompts">0</strong></p>
    <p class="vcasse-row"><span>Est. water</span><strong id="vcasseWater">0.000 L</strong></p>
    <p class="vcasse-row"><span>Est. electricity</span><strong id="vcasseEnergy">0.000 kWh</strong></p>
    <p class="vcasse-row"><span>Est. CO₂e</span><strong id="vcasseCarbon">0.0000 kg</strong></p>
    <div class="vcasse-actions">
      <button type="button" id="vcasseMinimize">Minimize</button>
      <button type="button" id="vcasseReset">Reset</button>
    </div>
  `;

  host.append(chip, panel);

  const promptsEl = panel.querySelector('#vcassePrompts');
  const waterEl = panel.querySelector('#vcasseWater');
  const energyEl = panel.querySelector('#vcasseEnergy');
  const carbonEl = panel.querySelector('#vcasseCarbon');

  const minimizeBtn = panel.querySelector('#vcasseMinimize');
  const resetBtn = panel.querySelector('#vcasseReset');

  let totals = { prompts: 0, waterLiters: 0, energyKwh: 0, carbonKg: 0 };

  chip.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
  });

  minimizeBtn.addEventListener('click', () => {
    panel.hidden = true;
  });

  resetBtn.addEventListener('click', async () => {
    totals = { prompts: 0, waterLiters: 0, energyKwh: 0, carbonKg: 0 };
    await chrome.storage.local.set({ [STORAGE_KEY]: totals, [SITE_KEY]: 0 });
    render();
  });

  hydrate().then(() => {
    render();
    bindPromptDetection();
    placeForViewport();
    window.addEventListener('resize', placeForViewport, { passive: true });
  });

  async function hydrate() {
    const stored = await chrome.storage.local.get([STORAGE_KEY]);
    if (stored[STORAGE_KEY]) {
      totals = {
        prompts: Number(stored[STORAGE_KEY].prompts) || 0,
        waterLiters: Number(stored[STORAGE_KEY].waterLiters) || 0,
        energyKwh: Number(stored[STORAGE_KEY].energyKwh) || 0,
        carbonKg: Number(stored[STORAGE_KEY].carbonKg) || 0
      };
    }
  }

  function bindPromptDetection() {
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' || event.shiftKey) return;
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!isPromptInput(target)) return;
      countPrompt(getInputLength(target));
    }, true);

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest('button,[role="button"]');
      if (!button) return;
      const label = `${button.getAttribute('aria-label') || ''} ${button.textContent || ''}`.toLowerCase();
      if (!/(send|submit|arrow up|ask|go)/.test(label)) return;

      const activeInput = findLikelyPromptInput();
      if (activeInput) {
        countPrompt(getInputLength(activeInput));
      }
    }, true);
  }

  function isPromptInput(el) {
    const isText = el.matches('textarea, input[type="text"], [contenteditable="true"], [role="textbox"]');
    if (!isText) return false;
    const idName = `${el.id} ${el.getAttribute('name') || ''} ${el.getAttribute('placeholder') || ''}`.toLowerCase();
    return /(prompt|message|ask|chat|question)/.test(idName) || el.closest('main, form, [data-testid]');
  }

  function findLikelyPromptInput() {
    return document.querySelector('textarea:focus, [contenteditable="true"]:focus, [role="textbox"]:focus')
      || document.querySelector('textarea, [contenteditable="true"], [role="textbox"]');
  }

  function getInputLength(el) {
    if ('value' in el && typeof el.value === 'string') return el.value.length;
    return (el.textContent || '').trim().length;
  }

  async function countPrompt(charCount) {
    const tokenEstimate = Math.max(20, Math.round(charCount / 4));
    const model = chooseProfile(tokenEstimate);
    const coeff = PROFILES[model];

    const waterMl = tokenEstimate * coeff.waterPerTokenMl;
    const energyWh = tokenEstimate * coeff.energyPerTokenWh;
    const carbonKg = (energyWh / 1000) * coeff.carbonPerKwhKg;

    totals.prompts += 1;
    totals.waterLiters += waterMl / 1000;
    totals.energyKwh += energyWh / 1000;
    totals.carbonKg += carbonKg;

    await chrome.storage.local.set({ [STORAGE_KEY]: totals });
    render();
  }

  function chooseProfile(tokens) {
    if (tokens > 1800) return 'heavy';
    if (tokens < 300) return 'light';
    return 'balanced';
  }

  function render() {
    promptsEl.textContent = String(Math.round(totals.prompts));
    waterEl.textContent = `${totals.waterLiters.toFixed(3)} L`;
    energyEl.textContent = `${totals.energyKwh.toFixed(3)} kWh`;
    carbonEl.textContent = `${totals.carbonKg.toFixed(4)} kg`;
    chip.textContent = `AI Sustainability · ${Math.round(totals.prompts)} prompts`;
  }

  function placeForViewport() {
    host.style.top = window.innerWidth < 900 ? '8px' : '16px';
    host.style.right = window.innerWidth < 900 ? '8px' : '16px';
  }
})();
