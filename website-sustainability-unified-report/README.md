# Website Sustainability Unified Report

A production-structured Next.js application for generating professional website sustainability reports that unify findings from multiple sources while preserving transparency.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + reusable UI primitives
- Zod validation for request/report schemas
- Provider abstraction for data ingestion
- Internal normalized scoring engine
- `@react-pdf/renderer` for client-ready PDF export

## Features
- URL analyzer with mock mode and manual import mode
- Step-based loading state for report generation
- Source-by-source raw findings section
- Normalized metrics with estimated flags
- Unified score + grade + confidence
- Executive summary copy action
- Professional PDF export route
- Report history persistence (`data/reports.json`)

## Project Structure

```txt
website-sustainability-unified-report/
├── app/
│   ├── api/report/generate/route.ts
│   ├── api/report/pdf/route.ts
│   ├── history/page.tsx
│   ├── report/[id]/page.tsx
│   └── page.tsx
├── components/
│   ├── report/
│   └── ui/
├── lib/
│   ├── normalization/
│   ├── providers/
│   ├── scoring/
│   ├── storage/
│   └── report-builder.ts
├── types/report.ts
└── data/mock-websites.json
```

## Run locally

```bash
cd website-sustainability-unified-report
npm install
npm run dev
```

Open `http://localhost:3000`.

## Data Model Highlights
Unified report schema includes:
- `inputUrl`, `analyzedAt`, `pageTitle`
- `overallScore`, `overallGrade`, `confidenceScore`
- `sourceResults[]` for transparent raw source findings
- `normalizedMetrics` including coverage and confidence
- `strengths`, `issues`, `recommendations`
- `methodologyNotes`, `disclaimer`

## Normalization + Scoring Notes
- Missing source fields remain `null`, never silently fabricated.
- Estimates are explicitly flagged (`estimated: true`).
- Score dimensions:
  - Carbon efficiency: **35%**
  - Transfer/page weight efficiency: **25%**
  - Performance efficiency: **20%**
  - Green hosting likelihood: **10%**
  - Evidence quality (coverage + agreement): **10%**

## Provider Integration Roadmap
Current provider files are mock-compatible contracts:
- `lib/providers/websiteCarbon.ts`
- `lib/providers/ecograder.ts`
- `lib/providers/betterweb.ts`

To connect real providers later:
1. Replace mock lookup with API/scraper adapters in each provider.
2. Map external fields to `SourceResult` interface.
3. Keep unknown fields as `null` and include notes in `status`/`notes`.
4. Add retries, timeout guards, and per-provider telemetry.
5. Add signed webhooks or queue workers for long-running scans.

## Stretch-ready foundation
Architecture already supports adding:
- Multi-page crawl results per report
- White-label branding tokens
- Client notes and annotations
- Share-by-link access model
- Before/after report comparisons
