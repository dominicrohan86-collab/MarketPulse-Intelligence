import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Plus, X } from 'lucide-react';
import { priceSeriesByTicker, volumeSeriesByTicker } from '../../data/market';
import { formatCurrency, formatPercent, signalTone } from '../../lib/format';
import type { StockTicker } from '../../types/market';
import { Badge } from '../design-system/Badge';
import { Button } from '../design-system/Button';
import { Card, CardHeader } from '../design-system/Card';
import { RiskDisclosure } from '../design-system/State';

const factorLabels = ['Momentum', 'Valuation', 'Quality', 'Growth', 'Sentiment', 'Risk'] as const;

export function TickerDetailPanel({
  ticker,
  onAddToWatchlist,
  isInWatchlist,
  onClose,
}: {
  ticker: StockTicker;
  onAddToWatchlist: (ticker: StockTicker) => void;
  isInWatchlist: boolean;
  onClose?: () => void;
}) {
  const priceSeries = priceSeriesByTicker[ticker.ticker] ?? [];
  const volumeSeries = volumeSeriesByTicker[ticker.ticker] ?? [];
  const chartData = priceSeries.map((point, index) => ({
    ...point,
    volume: volumeSeries[index]?.volume ?? 0,
  }));
  const factorScores = {
    Momentum: ticker.momentumScore,
    Valuation:
      ticker.valuationSignal === 'Discounted'
        ? 82
        : ticker.valuationSignal === 'Fair'
          ? 72
          : ticker.valuationSignal === 'Mixed'
            ? 58
            : ticker.valuationSignal === 'Premium'
              ? 46
              : 34,
    Quality: ticker.qualityScore,
    Growth: ticker.growthScore,
    Sentiment:
      ticker.sentimentSignal === 'Positive'
        ? 86
        : ticker.sentimentSignal === 'Constructive'
          ? 76
          : ticker.sentimentSignal === 'Neutral'
            ? 58
            : ticker.sentimentSignal === 'Mixed'
              ? 46
              : 32,
    Risk: 100 - ticker.riskScore,
  };

  return (
    <Card className="sticky top-24 max-h-none overflow-visible lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto scrollbar-soft">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-mono text-3xl font-semibold text-white">{ticker.ticker}</h2>
            <Badge tone={signalTone(ticker.riskLevel)}>{ticker.riskLevel} risk</Badge>
            <Badge tone={signalTone(ticker.valuationSignal)}>{ticker.valuationSignal} valuation</Badge>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-300">{ticker.companyName}</p>
          <p className="text-xs text-slate-500">
            {ticker.sector} / {ticker.industry}
          </p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close ticker detail"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600/40 bg-slate-900/60 text-slate-200"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Metric label="Mock price" value={formatCurrency(ticker.latestPrice)} />
        <Metric label="Daily change" value={formatPercent(ticker.priceChangePercent)} tone={ticker.priceChangePercent >= 0 ? 'positive' : 'risk'} />
        <Metric label="Market cap range" value={ticker.marketCapRange} />
        <Metric label="P/E or label" value={ticker.peRatio ? ticker.peRatio.toFixed(1) : ticker.valuationSignal} />
        <Metric label="Revenue growth est." value={`${ticker.revenueGrowthEstimate.toFixed(1)}%`} />
        <Metric label="Earnings date" value={ticker.earningsDate ?? 'No event'} />
        <Metric label="Dividend yield" value={ticker.dividendYield ? `${ticker.dividendYield.toFixed(1)}%` : 'N/A'} />
        <Metric label="Momentum score" value={`${ticker.momentumScore} / 100`} tone={ticker.momentumScore >= 75 ? 'positive' : 'caution'} />
      </div>

      <div className="mt-5">
        <CardHeader
          title="Price and Volume Trend"
          description="Fictionalized price path with mock volume bars to support confirmation research."
        />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 8, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.16)" vertical={false} />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} interval={6} />
              <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
              <Tooltip
                formatter={(value: number, name) => [
                  name === 'volume' ? `${value.toFixed(1)}M shares` : `$${value.toFixed(2)}`,
                  name === 'volume' ? 'Mock volume' : 'Mock price',
                ]}
              />
              <Bar yAxisId="right" dataKey="volume" fill="rgba(104,164,255,0.28)" radius={[4, 4, 0, 0]} />
              <Line yAxisId="left" type="monotone" dataKey="price" stroke="#2fc38a" strokeWidth={3} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Chart summary: {ticker.ticker} shows {ticker.ninetyDayTrend.toLowerCase()} 90-day momentum with{' '}
          {ticker.volumeTrend.toLowerCase()} volume confirmation in fictional data.
        </p>
      </div>

      <div className="mt-5">
        <CardHeader
          title="Research Factor Breakdown"
          description="Scores are directional prompts for comparison, not advice."
        />
        <div className="space-y-3">
          {factorLabels.map((label) => (
            <div key={label}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-semibold text-slate-200">{label}</span>
                <span className="font-mono text-slate-300">{factorScores[label]} / 100</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800" aria-hidden="true">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-analyst-500 to-market-green"
                  style={{ width: `${factorScores[label]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <CaseBlock title="Bull case summary" body={ticker.bullCase} tone="positive" />
        <CaseBlock title="Bear case summary" body={ticker.bearCase} tone="risk" />
      </div>

      <div className="mt-5 rounded-lg border border-slate-600/25 bg-slate-950/30 p-4">
        <h3 className="font-semibold text-white">Key research questions</h3>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
          {ticker.keyResearchQuestions.map((question) => (
            <li key={question}>- {question}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {ticker.relatedTickers.map((related) => (
            <Badge key={related} tone="neutral">{related}</Badge>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4" aria-hidden="true" />}
          onClick={() => onAddToWatchlist(ticker)}
          disabled={isInWatchlist}
        >
          {isInWatchlist ? 'Already in watchlist' : 'Add to watchlist'}
        </Button>
      </div>
      <div className="mt-5">
        <RiskDisclosure compact />
      </div>
    </Card>
  );
}

function Metric({ label, value, tone = 'neutral' }: { label: string; value: string; tone?: 'positive' | 'risk' | 'neutral' | 'caution' }) {
  return (
    <div className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className={`mt-1 font-mono text-lg font-semibold ${tone === 'positive' ? 'text-emerald-100' : tone === 'risk' ? 'text-rose-100' : 'text-white'}`}>
        {value}
      </p>
    </div>
  );
}

function CaseBlock({ title, body, tone }: { title: string; body: string; tone: 'positive' | 'risk' }) {
  return (
    <div className={`rounded-lg border p-4 ${tone === 'positive' ? 'border-market-green/24 bg-market-green/10' : 'border-market-rose/24 bg-market-rose/10'}`}>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
    </div>
  );
}
