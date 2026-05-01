import type { RiskLevel, SentimentSignal, TrendDirection, ValuationSignal } from '../types/market';

export function formatPercent(value: number) {
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(1)}%`;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value > 100 ? 0 : 2,
  }).format(value);
}

export function signalTone(signal: RiskLevel | ValuationSignal | SentimentSignal | TrendDirection | string) {
  if (['Low', 'Positive', 'Constructive', 'Up', 'Strong', 'Improving', 'Discounted'].includes(signal)) return 'positive';
  if (['Moderate', 'Neutral', 'Fair', 'Flat'].includes(signal)) return 'neutral';
  if (['Elevated', 'Mixed', 'Premium', 'Weakening'].includes(signal)) return 'caution';
  if (['High', 'Negative', 'Stretched', 'Down', 'Deteriorating'].includes(signal)) return 'risk';
  return 'neutral';
}

export function describeTrend(direction: TrendDirection) {
  if (direction === 'Up') return 'Trend up';
  if (direction === 'Down') return 'Trend down';
  if (direction === 'Mixed') return 'Mixed trend';
  return 'Flat trend';
}

export function riskRank(value: RiskLevel) {
  return { Low: 1, Moderate: 2, Elevated: 3, High: 4 }[value];
}

export function valuationRank(value: ValuationSignal) {
  return { Discounted: 1, Fair: 2, Mixed: 3, Premium: 4, Stretched: 5 }[value];
}
