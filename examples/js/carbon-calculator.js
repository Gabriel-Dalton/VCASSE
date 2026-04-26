(function () {
  // Per-query energy estimates in watt-hours. These are illustrative figures
  // sourced from public reporting on commercial AI inference; the calculator
  // is meant to convey scale and tradeoffs, not to be a research instrument.
  const PER_QUERY_WH = {
    chat:  { small: 0.3,  mid: 1.0,  frontier: 3.0 },
    long:  { small: 1.5,  mid: 5.0,  frontier: 15.0 },
    image: { small: 1.0,  mid: 2.5,  frontier: 6.0 },
  };

  // Water (mL) consumed in cooling per Wh of inference, by grid scenario.
  const WATER_ML_PER_WH = { bc: 0.05, us: 0.5, coal: 0.7 };

  // gCO2e per Wh of electricity, by scenario.
  const CO2_PER_WH = { bc: 0.05, us: 0.40, coal: 0.95 };

  const DAYS_PER_WEEK = 7;

  const inputs = {
    chats:  document.getElementById('chats'),
    long:   document.getElementById('long'),
    images: document.getElementById('images'),
    model:  document.getElementById('model'),
    grid:   document.getElementById('grid'),
  };

  const outs = {
    chats:  document.querySelector('[data-out="chats"]'),
    long:   document.querySelector('[data-out="long"]'),
    images: document.querySelector('[data-out="images"]'),
    co2:    document.getElementById('co2-out'),
    kwh:    document.getElementById('kwh-out'),
    water:  document.getElementById('water-out'),
    annual: document.getElementById('annual-out'),
    equiv:  document.getElementById('equiv-out'),
  };

  function fmt(n, digits) {
    if (!isFinite(n)) return '0';
    if (n >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
    if (n >= 10) return n.toFixed(0);
    if (n >= 1) return n.toFixed(1);
    return n.toFixed(2);
  }

  function compute() {
    const chats = +inputs.chats.value;
    const longs = +inputs.long.value;
    const images = +inputs.images.value;
    const model = inputs.model.value;
    const grid = inputs.grid.value;

    outs.chats.textContent  = chats;
    outs.long.textContent   = longs;
    outs.images.textContent = images;

    const dailyWh =
      chats  * PER_QUERY_WH.chat[model] +
      longs  * PER_QUERY_WH.long[model] +
      images * PER_QUERY_WH.image[model];

    const weeklyWh = dailyWh * DAYS_PER_WEEK;
    const weeklyCO2 = weeklyWh * CO2_PER_WH[grid];   // grams
    const weeklyWater = weeklyWh * WATER_ML_PER_WH[grid];
    const annualKg = (weeklyCO2 * 52) / 1000;

    outs.co2.textContent    = fmt(weeklyCO2);
    outs.kwh.textContent    = fmt(weeklyWh);
    outs.water.textContent  = fmt(weeklyWater);
    outs.annual.textContent = fmt(annualKg);

    outs.equiv.innerHTML = describeEquivalents(weeklyCO2, weeklyWater, weeklyWh);
  }

  function describeEquivalents(co2, waterMl, wh) {
    if (co2 < 0.1) {
      return "<strong>Effectively zero.</strong> Your weekly AI use is below the noise floor of common household activities.";
    }
    // Reference points (rounded for legibility):
    //   Boiling 1L of water in a kettle ≈ 100 Wh
    //   Driving 1 km in a typical car  ≈ 180 g CO₂
    //   A standard cup of tap water    ≈ 250 mL
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

  Object.values(inputs).forEach((el) => el.addEventListener('input', compute));
  compute();
})();
