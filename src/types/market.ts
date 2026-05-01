export type AssetClass = 'Equity' | 'ETF' | 'Index';

export type Sector =
  | 'Technology'
  | 'Communication Services'
  | 'Consumer Discretionary'
  | 'Financials'
  | 'Healthcare'
  | 'Industrials'
  | 'Energy'
  | 'Consumer Staples'
  | 'Utilities'
  | 'Real Estate'
  | 'Materials'
  | 'Broad Market'
  | 'Small Caps';

export type Industry =
  | 'AI Infrastructure'
  | 'Cloud Software'
  | 'Semiconductors'
  | 'Consumer Platforms'
  | 'Streaming'
  | 'Payments'
  | 'Banking'
  | 'Asset Management'
  | 'Medical Devices'
  | 'Managed Care'
  | 'Pharmaceuticals'
  | 'Energy Integrated'
  | 'Energy Services'
  | 'Industrial Machinery'
  | 'Aerospace'
  | 'Retail'
  | 'Consumer Staples'
  | 'Market ETF'
  | 'Sector ETF';

export type MarketIndex = 'S&P 500' | 'Nasdaq 100' | 'Russell 2000' | 'Dow Industrials';

export type MarketTrend = 'Expansion' | 'Selective Growth' | 'Risk-Off Defense' | 'Rangebound' | 'Recovery';

export type TrendDirection = 'Up' | 'Down' | 'Flat' | 'Mixed';

export type MomentumSignal = 'Strong' | 'Improving' | 'Neutral' | 'Weakening' | 'Deteriorating';

export type RiskLevel = 'Low' | 'Moderate' | 'Elevated' | 'High';

export type ValuationSignal = 'Discounted' | 'Fair' | 'Premium' | 'Stretched' | 'Mixed';

export type SentimentSignal = 'Positive' | 'Constructive' | 'Neutral' | 'Mixed' | 'Negative';

export type AnalystRating = 'Positive' | 'Neutral' | 'Cautious' | 'Under Review';

export type ResearchStatus =
  | 'New breakout'
  | 'Needs confirmation'
  | 'Quality compounder'
  | 'Valuation watch'
  | 'Earnings watch'
  | 'Defensive candidate'
  | 'Pullback candidate'
  | 'High risk / high momentum'
  | 'Watch only'
  | 'Value rotation';

export type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y';

export type PortfolioTheme =
  | 'AI Infrastructure'
  | 'Cloud & Software'
  | 'Consumer Platforms'
  | 'Defensive Healthcare'
  | 'Financial Strength'
  | 'Energy Reacceleration'
  | 'Industrial Automation'
  | 'Dividend Quality'
  | 'Small-Cap Recovery';

export type DisclosureType = 'Mock Data' | 'Educational' | 'Risk' | 'No Advice';

export type MarketRegimeFilter = 'Growth-led' | 'Balanced' | 'Risk-off' | 'Value rotation';

export type RiskAppetite = 'Balanced' | 'Conservative' | 'Opportunistic' | 'Risk-aware growth';

export interface PricePoint {
  date: string;
  price: number;
}

export interface VolumePoint {
  date: string;
  volume: number;
}

export interface SectorPerformance {
  sector: Sector;
  oneWeek: number;
  oneMonth: number;
  threeMonths: number;
  sixMonths: number;
  oneYear: number;
  momentumScore: number;
  breadth: number;
  riskLevel: RiskLevel;
  narrative: string;
}

export interface StockPerformance {
  ticker: string;
  oneWeek: number;
  oneMonth: number;
  threeMonths: number;
  sixMonths: number;
  oneYear: number;
}

export interface StockTicker {
  ticker: string;
  companyName: string;
  assetClass: AssetClass;
  sector: Sector;
  industry: Industry;
  latestPrice: number;
  priceChange: number;
  priceChangePercent: number;
  thirtyDayTrend: TrendDirection;
  ninetyDayTrend: TrendDirection;
  momentumScore: number;
  relativeStrengthScore: number;
  valuationSignal: ValuationSignal;
  sentimentSignal: SentimentSignal;
  analystRating: AnalystRating;
  riskLevel: RiskLevel;
  researchStatus: ResearchStatus;
  marketCapRange: string;
  peRatio?: number;
  dividendYield?: number;
  revenueGrowthEstimate: number;
  earningsDate?: string;
  volumeTrend: MomentumSignal;
  beta: number;
  qualityScore: number;
  growthScore: number;
  riskScore: number;
  bullCase: string;
  bearCase: string;
  keyResearchQuestions: string[];
  relatedTickers: string[];
  suggestedResearchQuestion: string;
}

export interface WatchlistItem {
  ticker: string;
  companyName: string;
  sector: Sector;
  addedDate: string;
  researchStatus: ResearchStatus;
  momentumScore: number;
  valuationSignal: ValuationSignal;
  riskLevel: RiskLevel;
  priceAlertLevel: number;
  userNote: string;
  nextReviewAction: string;
}

export interface ResearchArticle {
  id: string;
  headline: string;
  sourceType: 'Market Desk' | 'Earnings Brief' | 'Sector Note' | 'Risk Monitor' | 'Analyst Digest';
  date: string;
  relatedTickers: string[];
  summary: string;
  sentimentLabel: SentimentSignal;
  readingTime: string;
  whyItMatters: string;
}

export interface ResearchBrief {
  id: string;
  title: string;
  audience: string;
  generatedAt: string;
  summary: string;
  observations: string[];
  riskNotes: string[];
  candidateTickers: string[];
  sections: string[];
}

export interface EarningsEvent {
  ticker: string;
  companyName: string;
  date: string;
  expectedMove: string;
  uncertainty: RiskLevel;
  focusArea: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  direction: TrendDirection;
  helperText: string;
  comparison: string;
  status: 'positive' | 'caution' | 'risk' | 'neutral';
}

export interface ScreenerFilter {
  id: string;
  label: string;
  description: string;
}

export interface FilterState {
  sector: Sector | 'All';
  marketCapRange: string;
  momentumMin: number;
  valuationSignal: ValuationSignal | 'All';
  riskLevel: RiskLevel | 'All';
  dividendOnly: boolean;
  earningsWindow: string;
  volumeTrend: MomentumSignal | 'All';
  sentimentSignal: SentimentSignal | 'All';
  researchStatus: ResearchStatus | 'All';
}

export interface ChartSummary {
  title: string;
  caption: string;
  summary: string;
}

export interface DesignToken {
  name: string;
  value: string;
  usage: string;
}

export interface MarketTheme {
  name: PortfolioTheme;
  explanation: string;
  representativeTickers: string[];
  momentumScore: number;
  riskLevel: RiskLevel;
  valuationNote: string;
  researchQuestion: string;
}

export interface MarketInsight {
  title: string;
  body: string;
  type: 'opportunity' | 'caution' | 'risk' | 'education';
}

export interface ScreenerPreset {
  name: string;
  description: string;
  filters: Partial<FilterState>;
}
