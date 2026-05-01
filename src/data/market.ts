import type {
  ChartSummary,
  DashboardMetric,
  EarningsEvent,
  MarketInsight,
  MarketRegimeFilter,
  MarketTheme,
  PricePoint,
  RiskAppetite,
  Sector,
  SectorPerformance,
  ScreenerPreset,
  TimeRange,
  VolumePoint,
} from '../types/market';
import { stockTickers } from './tickers';

const rangeMultipliers: Record<TimeRange, number> = {
  '1W': 0.22,
  '1M': 0.5,
  '3M': 1,
  '6M': 1.62,
  '1Y': 2.35,
};

export const sectors: Sector[] = [
  'Technology',
  'Communication Services',
  'Consumer Discretionary',
  'Financials',
  'Healthcare',
  'Industrials',
  'Energy',
  'Consumer Staples',
  'Utilities',
  'Real Estate',
  'Materials',
];

export const sectorPerformance: SectorPerformance[] = [
  {
    sector: 'Technology',
    oneWeek: 2.1,
    oneMonth: 6.8,
    threeMonths: 14.2,
    sixMonths: 21.4,
    oneYear: 34.6,
    momentumScore: 88,
    breadth: 69,
    riskLevel: 'Elevated',
    narrative: 'AI infrastructure and large-cap software remain the strongest fictional leadership areas.',
  },
  {
    sector: 'Communication Services',
    oneWeek: 1.4,
    oneMonth: 4.6,
    threeMonths: 10.9,
    sixMonths: 17.2,
    oneYear: 26.4,
    momentumScore: 79,
    breadth: 64,
    riskLevel: 'Moderate',
    narrative: 'Advertising and platform efficiency keep the sector constructive but not uniformly cheap.',
  },
  {
    sector: 'Financials',
    oneWeek: 1.8,
    oneMonth: 4.1,
    threeMonths: 7.7,
    sixMonths: 12.1,
    oneYear: 15.4,
    momentumScore: 73,
    breadth: 61,
    riskLevel: 'Moderate',
    narrative: 'Large banks and payment networks are improving as rate volatility stabilizes.',
  },
  {
    sector: 'Healthcare',
    oneWeek: 1.1,
    oneMonth: 3.7,
    threeMonths: 8.6,
    sixMonths: 11.8,
    oneYear: 17.9,
    momentumScore: 76,
    breadth: 66,
    riskLevel: 'Low',
    narrative: 'Healthcare mixes defensive strength with select growth leadership.',
  },
  {
    sector: 'Industrials',
    oneWeek: 1.6,
    oneMonth: 3.9,
    threeMonths: 7.1,
    sixMonths: 13.6,
    oneYear: 18.8,
    momentumScore: 72,
    breadth: 58,
    riskLevel: 'Moderate',
    narrative: 'Aerospace and automation are improving, while machinery remains more cyclical.',
  },
  {
    sector: 'Energy',
    oneWeek: 0.7,
    oneMonth: 1.8,
    threeMonths: 3.2,
    sixMonths: 6.4,
    oneYear: 9.7,
    momentumScore: 61,
    breadth: 49,
    riskLevel: 'Moderate',
    narrative: 'Cash-flow stability helps integrated energy, but breadth is selective.',
  },
  {
    sector: 'Consumer Staples',
    oneWeek: 0.9,
    oneMonth: 2.2,
    threeMonths: 5.4,
    sixMonths: 8.6,
    oneYear: 11.3,
    momentumScore: 68,
    breadth: 57,
    riskLevel: 'Low',
    narrative: 'Defensive quality is working, especially in scale retail and staples compounders.',
  },
  {
    sector: 'Consumer Discretionary',
    oneWeek: -0.4,
    oneMonth: 0.8,
    threeMonths: 2.1,
    sixMonths: 6.7,
    oneYear: 12.6,
    momentumScore: 56,
    breadth: 43,
    riskLevel: 'Elevated',
    narrative: 'Platform leaders are constructive, but discretionary breadth is mixed.',
  },
  {
    sector: 'Utilities',
    oneWeek: 0.3,
    oneMonth: 1.1,
    threeMonths: 3.8,
    sixMonths: 5.1,
    oneYear: 7.4,
    momentumScore: 52,
    breadth: 48,
    riskLevel: 'Low',
    narrative: 'Utilities show defensive participation but limited growth momentum.',
  },
  {
    sector: 'Materials',
    oneWeek: -0.1,
    oneMonth: 0.9,
    threeMonths: 2.8,
    sixMonths: 5.9,
    oneYear: 8.8,
    momentumScore: 49,
    breadth: 44,
    riskLevel: 'Moderate',
    narrative: 'Materials need stronger cyclical confirmation before leadership broadens.',
  },
  {
    sector: 'Real Estate',
    oneWeek: -0.6,
    oneMonth: -1.4,
    threeMonths: -2.2,
    sixMonths: 1.7,
    oneYear: 4.2,
    momentumScore: 38,
    breadth: 32,
    riskLevel: 'Elevated',
    narrative: 'Rate sensitivity keeps real estate on the lagging side of the mock market.',
  },
];

export const marketIndices = [
  { name: 'S&P 500', value: '5,128', change: 0.38, direction: 'Up' },
  { name: 'Nasdaq 100', value: '18,240', change: 0.52, direction: 'Up' },
  { name: 'Russell 2000', value: '2,048', change: -0.37, direction: 'Mixed' },
  { name: 'Dow Industrials', value: '39,840', change: 0.21, direction: 'Flat' },
] as const;

export const marketBreadth = [
  {
    label: 'Above 20-day moving average',
    value: 67,
    helper: 'Short-term participation is improving beyond a handful of mega-cap leaders.',
  },
  {
    label: 'Above 50-day moving average',
    value: 61,
    helper: 'Intermediate breadth is constructive but not yet broad enough to ignore risk controls.',
  },
  {
    label: 'Above 200-day moving average',
    value: 54,
    helper: 'Longer-term participation remains mixed, especially across small caps and real estate.',
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: 'S&P 500 Trend',
    value: '+7.6%',
    direction: 'Up',
    helperText: 'Broad-market trend is positive, with improving but still selective participation.',
    comparison: 'vs. prior 90 days',
    status: 'positive',
  },
  {
    label: 'Nasdaq Momentum',
    value: '84 / 100',
    direction: 'Up',
    helperText: 'Growth leadership remains strong, led by AI infrastructure and cloud software.',
    comparison: 'vs. prior 30 days',
    status: 'positive',
  },
  {
    label: 'Market Breadth',
    value: '61%',
    direction: 'Mixed',
    helperText: 'Breadth improved, but small-cap participation is still uneven.',
    comparison: 'above 50-day average',
    status: 'caution',
  },
  {
    label: 'Leading Sector',
    value: 'Technology',
    direction: 'Up',
    helperText: 'Technology leads the 90-day view, while valuation risk is above the dashboard average.',
    comparison: 'ranked by 3-month return',
    status: 'positive',
  },
  {
    label: 'Volatility Regime',
    value: 'Elevated',
    direction: 'Mixed',
    helperText: 'Momentum signals should be evaluated with position sizing discipline and confirmation.',
    comparison: 'vs. calm regime baseline',
    status: 'risk',
  },
  {
    label: 'Earnings Momentum',
    value: 'Constructive',
    direction: 'Up',
    helperText: 'Revision trends improved for technology, healthcare, and select industrials.',
    comparison: 'vs. prior reporting cycle',
    status: 'positive',
  },
  {
    label: 'Watchlist Opportunities',
    value: '18 of 42',
    direction: 'Mixed',
    helperText: 'Quality momentum is available, but several candidates carry valuation or event risk.',
    comparison: 'meet research benchmark',
    status: 'caution',
  },
];

export const marketInsights: MarketInsight[] = [
  {
    title: 'AI infrastructure still leads',
    body: 'AI infrastructure remains the strongest theme, but valuation risk is elevated and varies sharply by ticker.',
    type: 'caution',
  },
  {
    title: 'Financials are broadening',
    body: 'Financials improved over the last 30 days as rate expectations stabilized and large-bank breadth firmed.',
    type: 'opportunity',
  },
  {
    title: 'Healthcare is acting defensive',
    body: 'Healthcare shows lower volatility than the broader market while retaining pockets of growth leadership.',
    type: 'education',
  },
  {
    title: 'Small caps need confirmation',
    body: 'Small caps remain mixed, with weak breadth despite isolated breakouts and cheaper valuation signals.',
    type: 'risk',
  },
];

export const recommendedResearchActions = [
  'Compare NVDA, AVGO, and AMD on momentum, valuation, earnings revision trends, and volume confirmation.',
  'Review defensive healthcare tickers for lower-volatility exposure and clearer earnings visibility.',
  'Add financial-sector leaders to the watchlist and monitor whether breadth confirms the move.',
  'Treat single-day price spikes as research prompts, not durable trends, until volume confirms participation.',
];

export const marketThemes: MarketTheme[] = [
  {
    name: 'AI Infrastructure',
    explanation:
      'High-momentum infrastructure demand is visible across chips, networking, and servers, but valuation dispersion is wide.',
    representativeTickers: ['NVDA', 'AVGO', 'AMD', 'SMCI'],
    momentumScore: 91,
    riskLevel: 'Elevated',
    valuationNote: 'Premium to stretched; compare earnings durability before assuming uniform attractiveness.',
    researchQuestion: 'Which AI infrastructure names have volume confirmation and realistic earnings support?',
  },
  {
    name: 'Cloud & Software',
    explanation:
      'Cloud demand and software quality remain constructive, especially where margins are improving alongside AI investment.',
    representativeTickers: ['MSFT', 'AMZN', 'SHOP'],
    momentumScore: 78,
    riskLevel: 'Moderate',
    valuationNote: 'Mostly premium, with better support where margins are expanding.',
    researchQuestion: 'Are cloud growth and margins improving together?',
  },
  {
    name: 'Consumer Platforms',
    explanation:
      'Advertising, marketplace scale, and consumer engagement support platform leaders, while discretionary breadth is uneven.',
    representativeTickers: ['AMZN', 'META', 'NFLX', 'SHOP'],
    momentumScore: 74,
    riskLevel: 'Moderate',
    valuationNote: 'Fair to premium depending on margin recovery.',
    researchQuestion: 'Which platform trends are backed by cash-flow improvement rather than narrative?',
  },
  {
    name: 'Defensive Healthcare',
    explanation:
      'Healthcare blends lower volatility with select growth leadership, making it useful when market breadth is uneven.',
    representativeTickers: ['LLY', 'UNH', 'ISRG', 'TMO'],
    momentumScore: 76,
    riskLevel: 'Low',
    valuationNote: 'Mixed; growth leaders are expensive while defensive names look fair.',
    researchQuestion: 'Is leadership broadening beyond a handful of growth-oriented healthcare names?',
  },
  {
    name: 'Financial Strength',
    explanation:
      'Large banks, payments, and asset managers are improving as rate volatility cools, but credit quality remains a watch item.',
    representativeTickers: ['JPM', 'BAC', 'V', 'MA', 'BLK'],
    momentumScore: 72,
    riskLevel: 'Moderate',
    valuationNote: 'Fair to discounted for banks; premium for payment networks.',
    researchQuestion: 'Is financial strength broad-based or concentrated in quality leaders?',
  },
  {
    name: 'Energy Reacceleration',
    explanation:
      'Energy cash flows remain resilient, but sector momentum is selective and tied to commodity confirmation.',
    representativeTickers: ['XOM', 'CVX', 'SLB', 'XLE'],
    momentumScore: 61,
    riskLevel: 'Moderate',
    valuationNote: 'Generally fair with dividend support, but cyclical sensitivity remains.',
    researchQuestion: 'Does volume confirm a real sector rotation or only isolated energy strength?',
  },
  {
    name: 'Industrial Automation',
    explanation:
      'Aerospace and automation leadership is improving, while machinery remains more cyclical and order-sensitive.',
    representativeTickers: ['CAT', 'GE', 'DE', 'RTX'],
    momentumScore: 73,
    riskLevel: 'Moderate',
    valuationNote: 'Fair overall, with premium signals where aerospace margins are strongest.',
    researchQuestion: 'Which industrial leaders have order confirmation and reasonable valuation?',
  },
  {
    name: 'Dividend Quality',
    explanation:
      'Dividend quality helps stabilize research candidates when volatility is elevated and growth leadership narrows.',
    representativeTickers: ['COST', 'PG', 'KO', 'XOM', 'V'],
    momentumScore: 66,
    riskLevel: 'Low',
    valuationNote: 'Often fair to premium because quality remains in demand.',
    researchQuestion: 'Which dividend candidates balance stability with enough trend confirmation?',
  },
  {
    name: 'Small-Cap Recovery',
    explanation:
      'Small caps look cheaper in the mock model, but breadth and volume confirmation are still weak.',
    representativeTickers: ['IWM'],
    momentumScore: 46,
    riskLevel: 'Elevated',
    valuationNote: 'Discounted, but cheaper valuation is not enough without breadth improvement.',
    researchQuestion: 'What would confirm that small-cap breakouts are broadening rather than isolated?',
  },
];

export const earningsCalendar: EarningsEvent[] = stockTickers
  .filter((ticker) => ticker.earningsDate)
  .slice(0, 18)
  .map((ticker) => ({
    ticker: ticker.ticker,
    companyName: ticker.companyName,
    date: ticker.earningsDate ?? '2026-06-01',
    expectedMove:
      ticker.riskLevel === 'High' || ticker.riskLevel === 'Elevated' ? 'Elevated range' : 'Moderate range',
    uncertainty: ticker.riskLevel,
    focusArea:
      ticker.valuationSignal === 'Stretched'
        ? 'Margin durability and valuation sensitivity'
        : ticker.sector === 'Financials'
          ? 'Credit quality and rate sensitivity'
          : ticker.sector === 'Healthcare'
            ? 'Guidance quality and demand breadth'
            : 'Revenue growth and operating leverage',
  }));

export const screenerPresets: ScreenerPreset[] = [
  {
    name: 'Quality Momentum',
    description: 'High momentum, reasonable risk, and constructive sentiment.',
    filters: { momentumMin: 75, riskLevel: 'Moderate', sentimentSignal: 'Constructive' },
  },
  {
    name: 'Defensive Compounders',
    description: 'Lower volatility, consistent trend, and strong quality.',
    filters: { riskLevel: 'Low', momentumMin: 60, valuationSignal: 'Fair' },
  },
  {
    name: 'Earnings Watch',
    description: 'Upcoming earnings with elevated volatility or catalyst sensitivity.',
    filters: { earningsWindow: 'Next 30 days', riskLevel: 'Elevated', researchStatus: 'Earnings watch' },
  },
  {
    name: 'Pullback Candidates',
    description: 'Stronger long-term profile with recent weakness.',
    filters: { researchStatus: 'Pullback candidate', momentumMin: 45 },
  },
  {
    name: 'High Risk / High Momentum',
    description: 'Strong price movement paired with elevated valuation or volatility.',
    filters: { momentumMin: 80, riskLevel: 'Elevated', valuationSignal: 'Stretched' },
  },
  {
    name: 'Value Rotation',
    description: 'Improving trend with cheaper valuation signal.',
    filters: { valuationSignal: 'Discounted', momentumMin: 45, researchStatus: 'Value rotation' },
  },
];

export const chartSummaries: Record<string, ChartSummary> = {
  sectorLeadership: {
    title: 'Sector Leadership',
    caption: 'Ranks sectors by selected timeframe performance and shows whether leadership is concentrated.',
    summary:
      'Technology, communication services, healthcare, and financials lead the current mock market, while real estate and materials lag.',
  },
  relativeStrength: {
    title: 'Relative Strength Over Time',
    caption: 'Compares trend durability across selected research areas.',
    summary:
      'Growth sectors lead early, healthcare catches up during risk-aware periods, and small caps remain inconsistent.',
  },
  volumeConfirmation: {
    title: 'Price and Volume Confirmation',
    caption: 'Pairs price direction with volume to identify whether moves have participation.',
    summary:
      'The selected ticker shows a constructive price trend with two visible volume spikes that deserve follow-up research.',
  },
};

export function getSectorPerformanceValue(sector: SectorPerformance, range: TimeRange) {
  if (range === '1W') return sector.oneWeek;
  if (range === '1M') return sector.oneMonth;
  if (range === '3M') return sector.threeMonths;
  if (range === '6M') return sector.sixMonths;
  return sector.oneYear;
}

export function getAdjustedSectorPerformance(
  range: TimeRange,
  regime: MarketRegimeFilter,
  riskAppetite: RiskAppetite,
  sectorFilter: Sector | 'All',
) {
  const filtered = sectorFilter === 'All' ? sectorPerformance : sectorPerformance.filter((item) => item.sector === sectorFilter);

  return filtered
    .map((sector) => {
      let modifier = rangeMultipliers[range];
      if (regime === 'Risk-off' && ['Healthcare', 'Consumer Staples', 'Utilities'].includes(sector.sector)) modifier += 0.24;
      if (regime === 'Growth-led' && ['Technology', 'Communication Services'].includes(sector.sector)) modifier += 0.16;
      if (regime === 'Value rotation' && ['Financials', 'Industrials', 'Energy'].includes(sector.sector)) modifier += 0.14;
      if (riskAppetite === 'Conservative' && sector.riskLevel === 'Elevated') modifier -= 0.18;
      if (riskAppetite === 'Opportunistic' && sector.riskLevel !== 'Low') modifier += 0.12;

      return {
        ...sector,
        selectedPerformance: Number((sector.threeMonths * modifier).toFixed(1)),
      };
    })
    .sort((a, b) => b.selectedPerformance - a.selectedPerformance);
}

export function makeSeries(seed = 1, points = 28, base = 100, drift = 0.9): PricePoint[] {
  return Array.from({ length: points }, (_, index) => {
    const wave = Math.sin((index + seed) / 3.2) * 1.8 + Math.cos((index + seed) / 5.4) * 1.2;
    const bump = index > points * 0.65 ? (index - points * 0.65) * 0.18 : 0;
    const price = base + index * drift + wave + bump;
    return {
      date: `Day ${index + 1}`,
      price: Number(price.toFixed(2)),
    };
  });
}

export function makeVolumeSeries(seed = 1, points = 28, base = 2.1): VolumePoint[] {
  return Array.from({ length: points }, (_, index) => {
    const wave = Math.abs(Math.sin((index + seed) / 2.4)) * 0.9;
    const spike = index === 8 || index === 21 ? 1.7 : 0;
    return {
      date: `Day ${index + 1}`,
      volume: Number((base + wave + spike + index * 0.015).toFixed(2)),
    };
  });
}

export const relativeStrengthSeries = makeSeries(2, 32, 100, 0.78).map((point, index) => ({
  date: point.date,
  Technology: Number((point.price + Math.sin(index / 3) * 3).toFixed(1)),
  Healthcare: Number((98 + index * 0.52 + Math.cos(index / 4) * 2.2).toFixed(1)),
  Financials: Number((97 + index * 0.46 + Math.sin(index / 5) * 2.7).toFixed(1)),
  Industrials: Number((96 + index * 0.5 + Math.cos(index / 4.5) * 1.9).toFixed(1)),
  'Small Caps': Number((95 + index * 0.18 + Math.sin(index / 2.8) * 3.2).toFixed(1)),
}));

export const volumeConfirmationSeries = makeSeries(5, 28, 162, 0.82).map((point, index) => ({
  ...point,
  volume: makeVolumeSeries(4, 28, 2.4)[index].volume,
}));

export const priceSeriesByTicker: Record<string, PricePoint[]> = Object.fromEntries(
  stockTickers.map((ticker, index) => [
    ticker.ticker,
    makeSeries(
      index + 1,
      34,
      Math.max(45, ticker.latestPrice * 0.82),
      Math.max(-0.4, (ticker.latestPrice * (ticker.momentumScore - 48)) / 10000),
    ),
  ]),
);

export const volumeSeriesByTicker: Record<string, VolumePoint[]> = Object.fromEntries(
  stockTickers.map((ticker, index) => [
    ticker.ticker,
    makeVolumeSeries(index + 2, 34, ticker.riskLevel === 'High' ? 3.8 : ticker.riskLevel === 'Elevated' ? 3 : 2.2),
  ]),
);
