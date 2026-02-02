# campaign-dashboard

React + Vite dashboard for visualising outbound campaign metrics and A/B variant comparisons.

## Stack

- **React 18** with TypeScript
- **Vite 5** for dev server and bundling
- **recharts** for bar charts

## Architecture

```
src/
  types/
    campaign.ts         CampaignRow, CampaignSummary, VariantComparison interfaces
  data/
    campaigns.ts        Static campaign data (drop-in for API later)
  utils/
    metrics.ts          summariseCampaigns(), compareVariants(), rate()
  components/
    MetricCard.tsx      KPI stat card
    SummaryChart.tsx    Grouped bar chart — open / reply / booking rates
    VariantTable.tsx    A/B side-by-side table with winner highlight
  App.tsx               Root layout — wires data → components
  main.tsx              React entry point
```

## Quickstart

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production bundle → dist/
```

## Features

- Overall KPI cards: total sent, open rate, reply rate, booking rate
- Grouped bar chart comparing all campaigns side-by-side
- Per-campaign A/B analysis table with winner badge
- Campaign selector dropdown — switches variant view instantly

## Extending with live data

Replace the static import in `src/data/campaigns.ts` with a `fetch()` call to `gtm-metrics-api`:

```typescript
const res = await fetch('/api/campaigns');
const { data } = await res.json();
```
