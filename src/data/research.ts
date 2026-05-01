import type { ResearchArticle } from '../types/market';

export const researchArticles: ResearchArticle[] = [
  {
    id: 'ai-infra-valuations',
    headline: 'AI Infrastructure Demand Remains Strong, But Valuations Diverge',
    sourceType: 'Sector Note',
    date: '2026-04-29',
    relatedTickers: ['NVDA', 'AVGO', 'AMD', 'SMCI'],
    summary:
      'Mock demand indicators remain constructive for AI infrastructure, but valuation and volatility signals differ widely across semiconductor and server candidates.',
    sentimentLabel: 'Constructive',
    readingTime: '5 min read',
    whyItMatters:
      'The theme is still a leadership area, but research quality depends on separating durable earnings growth from momentum alone.',
  },
  {
    id: 'financial-breadth',
    headline: 'Financials Show Early Breadth Improvement After Rate Volatility',
    sourceType: 'Market Desk',
    date: '2026-04-27',
    relatedTickers: ['JPM', 'BAC', 'V', 'MA', 'XLF'],
    summary:
      'Large banks and payment networks show improving fictional breadth as rate expectations stabilize and credit concerns remain contained.',
    sentimentLabel: 'Constructive',
    readingTime: '4 min read',
    whyItMatters:
      'Financial leadership is more useful when the move broadens beyond one quality bank or defensive payment network.',
  },
  {
    id: 'healthcare-broadening',
    headline: 'Healthcare Leadership Broadens Beyond Mega-Cap Growth',
    sourceType: 'Analyst Digest',
    date: '2026-04-25',
    relatedTickers: ['LLY', 'UNH', 'ISRG', 'TMO', 'XLV'],
    summary:
      'The fictional healthcare tape combines growth leadership with defensive participation, creating useful contrasts for risk-aware research.',
    sentimentLabel: 'Positive',
    readingTime: '6 min read',
    whyItMatters:
      'Lower volatility does not remove valuation risk, so growth and defensive candidates should be compared separately.',
  },
  {
    id: 'small-cap-confirmation',
    headline: 'Small-Cap Breakouts Need Volume Confirmation',
    sourceType: 'Risk Monitor',
    date: '2026-04-23',
    relatedTickers: ['IWM'],
    summary:
      'Cheaper valuation signals are emerging in smaller companies, but mock breadth and volume participation are not yet convincing.',
    sentimentLabel: 'Mixed',
    readingTime: '3 min read',
    whyItMatters:
      'A lower valuation signal can be a research prompt, not proof that a durable recovery is underway.',
  },
  {
    id: 'energy-cash-flow',
    headline: 'Energy Cash Flows Remain Resilient as Momentum Rotates',
    sourceType: 'Earnings Brief',
    date: '2026-04-20',
    relatedTickers: ['XOM', 'CVX', 'SLB', 'XLE'],
    summary:
      'Integrated energy candidates show cash-flow stability in the mock data, while service exposure carries higher cyclical upside and risk.',
    sentimentLabel: 'Neutral',
    readingTime: '4 min read',
    whyItMatters:
      'Energy research should separate dividend resilience from higher-beta reacceleration signals.',
  },
  {
    id: 'defensive-quality',
    headline: 'Defensive Quality Holds Up During Uneven Breadth',
    sourceType: 'Market Desk',
    date: '2026-04-18',
    relatedTickers: ['COST', 'WMT', 'PG', 'KO'],
    summary:
      'Staples and scale retail candidates provide lower-volatility comparison points while growth leadership stays concentrated.',
    sentimentLabel: 'Constructive',
    readingTime: '4 min read',
    whyItMatters:
      'Defensive quality can reduce portfolio anxiety, but premium valuations still require patient research framing.',
  },
  {
    id: 'industrial-recovery',
    headline: 'Industrial Automation and Aerospace Lead Cyclical Recovery Watch',
    sourceType: 'Sector Note',
    date: '2026-04-16',
    relatedTickers: ['CAT', 'GE', 'DE', 'RTX', 'XLI'],
    summary:
      'Aerospace and automation trends are improving, while machinery candidates need order confirmation before the trend looks broad.',
    sentimentLabel: 'Constructive',
    readingTime: '5 min read',
    whyItMatters:
      'Cyclical recovery ideas can look attractive early, but order quality and volume confirmation matter.',
  },
  {
    id: 'valuation-discipline',
    headline: 'Momentum Screens Need Valuation Discipline as Leadership Narrows',
    sourceType: 'Risk Monitor',
    date: '2026-04-12',
    relatedTickers: ['NVDA', 'LLY', 'COST', 'QQQ', 'XLK'],
    summary:
      'The strongest mock momentum candidates often carry premium or stretched valuations, making risk labels essential to interpretation.',
    sentimentLabel: 'Mixed',
    readingTime: '6 min read',
    whyItMatters:
      'Research workflows should help users ask better questions, not imply that strong momentum is automatically attractive.',
  },
];
