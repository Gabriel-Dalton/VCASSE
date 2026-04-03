const PROFILES = {
  light: { waterPerTokenMl: 0.00022, energyPerTokenWh: 0.0002, carbonPerKwhKg: 0.25 },
  balanced: { waterPerTokenMl: 0.00035, energyPerTokenWh: 0.00032, carbonPerKwhKg: 0.30 },
  heavy: { waterPerTokenMl: 0.0008, energyPerTokenWh: 0.00075, carbonPerKwhKg: 0.38 }
};

const STORAGE_KEY = 'vcasse_extension_totals';

const form = document.getElementById('extForm');
const profile = document.getElementById('extPlatform');
const promptCount = document.getElementById('extPromptCount');
const avgTokens = document.getElementById('extAvgTokens');

const waterOut = document.getElementById('extWater');
const energyOut = document.getElementById('extEnergy');
const carbonOut = document.getElementById('extCarbon');

const totalPrompts = document.getElementById('extTotalPrompts');
const totalWater = document.getElementById('extTotalWater');
const totalEnergy = document.getElementById('extTotalEnergy');
const totalCarbon = document.getElementById('extTotalCarbon');

const addBtn = document.getElementById('extAdd');
const resetBtn = document.getElementById('extReset');

let latestEstimate = null;
let totals = { prompts: 0, waterLiters: 0, energyKwh: 0, carbonKg: 0 };

boot();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  latestEstimate = calculate();
  renderEstimate(latestEstimate);
});

addBtn.addEventListener('click', async () => {
  if (!latestEstimate) {
    latestEstimate = calculate();
    renderEstimate(latestEstimate);
  }

  totals.prompts += latestEstimate.prompts;
  totals.waterLiters += latestEstimate.waterLiters;
  totals.energyKwh += latestEstimate.energyKwh;
  totals.carbonKg += latestEstimate.carbonKg;

  await saveTotals();
  renderTotals();
});

resetBtn.addEventListener('click', async () => {
  totals = { prompts: 0, waterLiters: 0, energyKwh: 0, carbonKg: 0 };
  await saveTotals();
  renderTotals();
});

function calculate() {
  const selected = PROFILES[profile.value] || PROFILES.balanced;
  const prompts = clampNumber(promptCount.value, 1, 10000, 15);
  const tokens = clampNumber(avgTokens.value, 20, 120000, 600);

  const totalTokens = prompts * tokens;
  const waterMl = totalTokens * selected.waterPerTokenMl;
  const energyWh = totalTokens * selected.energyPerTokenWh;
  const carbonKg = (energyWh / 1000) * selected.carbonPerKwhKg;

  return {
    prompts,
    waterLiters: waterMl / 1000,
    energyKwh: energyWh / 1000,
    carbonKg
  };
}

function renderEstimate(data) {
  waterOut.textContent = `${data.waterLiters.toFixed(3)} L`;
  energyOut.textContent = `${data.energyKwh.toFixed(3)} kWh`;
  carbonOut.textContent = `${data.carbonKg.toFixed(4)} kg`;
}

function renderTotals() {
  totalPrompts.textContent = `${Math.round(totals.prompts)} prompts`;
  totalWater.textContent = `${totals.waterLiters.toFixed(3)} L water`;
  totalEnergy.textContent = `${totals.energyKwh.toFixed(3)} kWh electricity`;
  totalCarbon.textContent = `${totals.carbonKg.toFixed(4)} kg CO₂e`;
}

function clampNumber(value, min, max, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
}

async function boot() {
  const stored = await chrome.storage.local.get(STORAGE_KEY);
  if (stored[STORAGE_KEY]) {
    totals = {
      prompts: Number(stored[STORAGE_KEY].prompts) || 0,
      waterLiters: Number(stored[STORAGE_KEY].waterLiters) || 0,
      energyKwh: Number(stored[STORAGE_KEY].energyKwh) || 0,
      carbonKg: Number(stored[STORAGE_KEY].carbonKg) || 0
    };
  }
  renderTotals();
}

function saveTotals() {
  return chrome.storage.local.set({ [STORAGE_KEY]: totals });
}
