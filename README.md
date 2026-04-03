# VCASSE
Vancouver Centre for AI Safety, Sustainability, &amp; Ethics

## New project: AI Sustainability Checker

This repository now includes a full concept + MVP implementation for a **VCASSE AI Sustainability Checker**:

- **Web project page + live estimator:** `ai-sustainability-checker.html`
- **Estimator logic:** `js/sustainability-checker.js`
- **Chrome extension MVP:** `extension/ai-sustainability-checker/`

### What it does

The checker helps people understand rough AI usage impact by translating prompt activity into estimated:

- Water usage
- Electricity use
- CO₂ equivalent emissions

It supports both per-session estimates and running totals stored locally in the browser.

### Chrome extension (local dev install)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select `extension/ai-sustainability-checker`
5. Pin and open **VCASSE AI Sustainability Checker**
