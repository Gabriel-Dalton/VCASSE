document.addEventListener('DOMContentLoaded', () => {
  const PROFILES = {
    light: { waterPerTokenMl: 0.00022, energyPerTokenWh: 0.0002, carbonPerKwhKg: 0.25 },
    balanced: { waterPerTokenMl: 0.00035, energyPerTokenWh: 0.00032, carbonPerKwhKg: 0.30 },
    heavy: { waterPerTokenMl: 0.0008, energyPerTokenWh: 0.00075, carbonPerKwhKg: 0.38 }
  };

  const STORAGE_KEY = 'vcasseCheckerTotals';
  const form = document.getElementById('impactForm');
  if (!form) return;

  const platformInput = document.getElementById('platform');
  const promptCountInput = document.getElementById('promptCount');
  const avgTokensInput = document.getElementById('avgTokens');

  const waterOutput = document.getElementById('waterOutput');
  const energyOutput = document.getElementById('energyOutput');
  const carbonOutput = document.getElementById('carbonOutput');

  const sessionPrompts = document.getElementById('sessionPrompts');
  const sessionWater = document.getElementById('sessionWater');
  const sessionEnergy = document.getElementById('sessionEnergy');
  const sessionCarbon = document.getElementById('sessionCarbon');

  const heroPromptCount = document.getElementById('heroPromptCount');
  const heroWaterMl = document.getElementById('heroWaterMl');
  const heroEnergyWh = document.getElementById('heroEnergyWh');

  const addToTrackerBtn = document.getElementById('addToTracker');
  const resetTrackerBtn = document.getElementById('resetTracker');

  let latestEstimate = null;
  let totals = loadTotals();
  renderTotals();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const promptCount = clampNumber(promptCountInput.value, 1, 10000, 25);
    const avgTokens = clampNumber(avgTokensInput.value, 20, 120000, 750);
    const profile = PROFILES[platformInput.value] || PROFILES.balanced;

    const totalTokens = promptCount * avgTokens;
    const totalWaterMl = totalTokens * profile.waterPerTokenMl;
    const totalEnergyWh = totalTokens * profile.energyPerTokenWh;
    const totalCarbonKg = (totalEnergyWh / 1000) * profile.carbonPerKwhKg;

    latestEstimate = {
      prompts: promptCount,
      waterLiters: totalWaterMl / 1000,
      energyKwh: totalEnergyWh / 1000,
      carbonKg: totalCarbonKg,
      waterMl: totalWaterMl,
      energyWh: totalEnergyWh
    };

    waterOutput.textContent = `${latestEstimate.waterLiters.toFixed(3)} L`;
    energyOutput.textContent = `${latestEstimate.energyKwh.toFixed(3)} kWh`;
    carbonOutput.textContent = `${latestEstimate.carbonKg.toFixed(4)} kg`;

    heroPromptCount.textContent = String(latestEstimate.prompts);
    heroWaterMl.textContent = `${Math.round(latestEstimate.waterMl).toLocaleString()} mL`;
    heroEnergyWh.textContent = `${Math.round(latestEstimate.energyWh).toLocaleString()} Wh`;
  });

  addToTrackerBtn.addEventListener('click', () => {
    if (!latestEstimate) {
      form.requestSubmit();
      if (!latestEstimate) return;
    }

    totals.prompts += latestEstimate.prompts;
    totals.waterLiters += latestEstimate.waterLiters;
    totals.energyKwh += latestEstimate.energyKwh;
    totals.carbonKg += latestEstimate.carbonKg;

    persistTotals();
    renderTotals();
  });

  resetTrackerBtn.addEventListener('click', () => {
    totals = { prompts: 0, waterLiters: 0, energyKwh: 0, carbonKg: 0 };
    persistTotals();
    renderTotals();
  });

  function renderTotals() {
    sessionPrompts.textContent = String(Math.round(totals.prompts));
    sessionWater.textContent = `${totals.waterLiters.toFixed(3)} L`;
    sessionEnergy.textContent = `${totals.energyKwh.toFixed(3)} kWh`;
    sessionCarbon.textContent = `${totals.carbonKg.toFixed(4)} kg CO₂e`;
  }

  function persistTotals() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(totals));
  }

  function loadTotals() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { prompts: 0, waterLiters: 0, energyKwh: 0, carbonKg: 0 };

    try {
      const parsed = JSON.parse(raw);
      return {
        prompts: Number(parsed.prompts) || 0,
        waterLiters: Number(parsed.waterLiters) || 0,
        energyKwh: Number(parsed.energyKwh) || 0,
        carbonKg: Number(parsed.carbonKg) || 0
      };
    } catch {
      return { prompts: 0, waterLiters: 0, energyKwh: 0, carbonKg: 0 };
    }
  }

  function clampNumber(value, min, max, fallback) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return fallback;
    return Math.min(max, Math.max(min, numeric));
  }
});
