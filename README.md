# MarketPulse Intelligence

MarketPulse Intelligence is a fictional stock market trends and investment research dashboard built as a fintech product design portfolio project. It presents sector momentum, ticker research candidates, watchlists, screener workflows, article previews, and research brief generation using local mock market data.

> This project uses fictionalized mock market data for portfolio demonstration purposes. It is not financial advice and should not be used to make investment decisions.

## Project Overview

MarketPulse Intelligence is positioned as a calm market research workspace for spotting sector momentum, comparing stock trends, and organizing investment ideas before deeper due diligence. The app is built with React, TypeScript, Vite, Tailwind CSS, Recharts, and lucide-react.

## Product Problem

Investors and analysts often need to compare market trends, sector leadership, ticker candidates, risk signals, valuation context, and research notes without being pushed into impulsive decisions. MarketPulse organizes those signals into a structured research workflow that helps users ask better questions before deeper diligence.

## Target Users

- Individual investors
- Financial analysts
- Portfolio managers
- Financial advisors
- Investment research associates
- Students learning market analysis

## Key Screens

- Market Overview
- Trend Explorer
- Ticker Research
- Watchlist & Screener
- Research Brief Builder
- Design System

## Key Design Decisions

- Research over recommendations: the product frames securities as research candidates, not buy or sell instructions.
- Sector-first discovery: users start with market regime, breadth, and sector leadership before drilling into tickers.
- Risk-aware language: momentum, valuation, sentiment, and risk labels appear together to avoid overconfidence.
- Calm financial UX: deep neutral surfaces, restrained market colors, and editorial microcopy avoid hype.
- Layered information architecture: KPI summaries, chart analysis, ticker tables, and detailed panels support progressive disclosure.
- Accessible charts: every chart includes a title, caption, tooltip labels, and text summary.
- Responsive layout: dense desktop analysis adapts into stacked cards and mobile-friendly controls.

## Data Visualization Rationale

- KPI cards summarize high-level market state and mixed signals.
- Line charts show trend direction and relative strength over time.
- Bar charts compare sector performance without overloading the user.
- Heatmaps compare sector performance across timeframes with text labels.
- Composed charts pair price and volume to show whether moves have confirmation.
- Research cards add qualitative context around market narratives.
- Watchlist tables structure follow-up actions, notes, and alerts.

## Accessibility Considerations

- Semantic page structure, tables, labels, and buttons are used throughout.
- Keyboard-accessible controls include visible focus states.
- ARIA labels are included for icon-only navigation actions.
- Statuses are communicated with text labels, not color alone.
- Charts include summaries and accessible captions.
- Financial abbreviations are paired with explanatory copy where useful.
- Responsive layouts preserve readable content and comfortable tap targets.

## Responsive Behavior

- Desktop: persistent sidebar, multi-column dashboards, wide tables, and side-by-side research panels.
- Tablet: grids reflow, filters wrap, and detail panels stack below dense lists.
- Mobile: navigation becomes a drawer, KPI cards stack, tables become cards or scroll safely, and brief-builder panels stack vertically.

## Mock Data Disclaimer

This project uses fictionalized mock market data for portfolio demonstration purposes. It is not financial advice and should not be used to make investment decisions.

## How To Run Locally

```bash
npm install
npm run dev
npm run build
```

## Testing / QA

Automated tests cover:

- Market Overview renders KPI cards.
- Ticker search filters results.
- Research Brief Builder updates preview when options change.

Run tests:

```bash
npm run test
```

Manual QA checklist:

- Market Overview loads.
- Navigation works.
- Filters update dashboard values.
- Loading skeleton appears on filter changes.
- Charts render responsively.
- Ticker search works.
- Ticker filters work.
- Ticker detail panel opens and updates.
- Add to watchlist works.
- Screener presets update results.
- Empty states appear.
- Research brief preview updates.
- Generate Research Brief works.
- Design System page is reachable.
- Mobile navigation works.
- Build succeeds.

## Suggested Portfolio Screenshots

- Market Overview dashboard
- Sector momentum chart
- Trend Explorer heatmap
- Ticker Research detail panel
- Research article cards
- Watchlist & Screener
- Research Brief Builder preview
- Design System page
- Mobile ticker cards
- Mobile research brief layout

## Case Study Notes

This project demonstrates financial dashboard design, analytics product design, information architecture, data visualization, product thinking, risk-aware UX, accessibility, design system thinking, responsive product design, and engineering fluency with React, TypeScript, Tailwind CSS, and Recharts.
