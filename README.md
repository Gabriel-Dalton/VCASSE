# VCASSE
Vancouver Centre for AI Safety, Sustainability, &amp; Ethics

## Project: AI Sustainability Checker

This repository includes an expanded **VCASSE AI Sustainability Checker** project:

- **Web project page + live estimator:** `ai-sustainability-checker.html`
- **Estimator logic:** `js/sustainability-checker.js`
- **Chrome extension MVP (popup + in-page tracker):** `extension/ai-sustainability-checker/`

## What it does

The checker helps people understand directional AI usage impact by translating prompts into estimated:

- Water usage
- Electricity use
- CO₂ equivalent emissions

It supports per-session estimates and running totals stored locally in browser storage.

## Evidence and source transparency

The project page now includes footnotes and links to primary sources used for context and baseline assumptions, including:

- IEA (Energy and AI)
- U.S. DOE / FEMP data center fact sheet
- Microsoft sustainability report
- Google environmental reporting
- Google Research inference LCA paper

## Chrome extension (local dev install)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select `extension/ai-sustainability-checker`
5. Pin and open **VCASSE AI Sustainability Checker**

### In-page tracker behavior

On supported AI sites (ChatGPT, Claude, Gemini, Copilot, Perplexity), the extension injects a compact top-right chip and expandable panel designed to avoid blocking core chat controls.
