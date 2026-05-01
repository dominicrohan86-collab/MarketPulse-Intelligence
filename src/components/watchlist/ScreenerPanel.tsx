import { RotateCcw } from 'lucide-react';
import { sectors, screenerPresets } from '../../data/market';
import type { FilterState, MomentumSignal, ResearchStatus, RiskLevel, SentimentSignal, ValuationSignal } from '../../types/market';
import { Button } from '../design-system/Button';
import { Card, CardHeader } from '../design-system/Card';
import { SelectControl } from '../design-system/Controls';

const valuations: Array<ValuationSignal | 'All'> = ['All', 'Discounted', 'Fair', 'Mixed', 'Premium', 'Stretched'];
const risks: Array<RiskLevel | 'All'> = ['All', 'Low', 'Moderate', 'Elevated', 'High'];
const volumes: Array<MomentumSignal | 'All'> = ['All', 'Strong', 'Improving', 'Neutral', 'Weakening', 'Deteriorating'];
const sentiments: Array<SentimentSignal | 'All'> = ['All', 'Positive', 'Constructive', 'Neutral', 'Mixed', 'Negative'];
const statuses: Array<ResearchStatus | 'All'> = [
  'All',
  'New breakout',
  'Needs confirmation',
  'Quality compounder',
  'Valuation watch',
  'Earnings watch',
  'Defensive candidate',
  'Pullback candidate',
  'High risk / high momentum',
  'Watch only',
  'Value rotation',
];

export function ScreenerPanel({
  filters,
  onFiltersChange,
  onReset,
}: {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}) {
  return (
    <Card>
      <CardHeader
        title="Screener Filters"
        description="Combine market structure, risk labels, valuation context, and research status."
        action={
          <Button variant="ghost" onClick={onReset} icon={<RotateCcw className="h-4 w-4" aria-hidden="true" />}>
            Reset
          </Button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <SelectControl
          label="Sector"
          value={filters.sector}
          options={['All', ...sectors]}
          onChange={(event) => onFiltersChange({ ...filters, sector: event.target.value as FilterState['sector'] })}
        />
        <SelectControl
          label="Market cap range"
          value={filters.marketCapRange}
          options={['All', 'Mega cap', 'Large cap', 'Broad index', 'Growth index', 'Small cap index', 'Sector ETF']}
          onChange={(event) => onFiltersChange({ ...filters, marketCapRange: event.target.value })}
        />
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-300">
          Momentum score
          <input
            type="range"
            min={0}
            max={95}
            value={filters.momentumMin}
            onChange={(event) => onFiltersChange({ ...filters, momentumMin: Number(event.target.value) })}
            className="min-h-10 accent-analyst-500"
          />
          <span className="font-mono text-sm text-slate-100">{filters.momentumMin}+ minimum</span>
        </label>
        <SelectControl
          label="Valuation signal"
          value={filters.valuationSignal}
          options={valuations}
          onChange={(event) =>
            onFiltersChange({ ...filters, valuationSignal: event.target.value as FilterState['valuationSignal'] })
          }
        />
        <SelectControl
          label="Risk level"
          value={filters.riskLevel}
          options={risks}
          onChange={(event) => onFiltersChange({ ...filters, riskLevel: event.target.value as FilterState['riskLevel'] })}
        />
        <SelectControl
          label="Earnings window"
          value={filters.earningsWindow}
          options={['All', 'Next 7 days', 'Next 30 days', 'No near-term event']}
          onChange={(event) => onFiltersChange({ ...filters, earningsWindow: event.target.value })}
        />
        <SelectControl
          label="Volume trend"
          value={filters.volumeTrend}
          options={volumes}
          onChange={(event) => onFiltersChange({ ...filters, volumeTrend: event.target.value as FilterState['volumeTrend'] })}
        />
        <SelectControl
          label="Analyst sentiment"
          value={filters.sentimentSignal}
          options={sentiments}
          onChange={(event) =>
            onFiltersChange({ ...filters, sentimentSignal: event.target.value as FilterState['sentimentSignal'] })
          }
        />
        <SelectControl
          label="Research status"
          value={filters.researchStatus}
          options={statuses}
          onChange={(event) =>
            onFiltersChange({ ...filters, researchStatus: event.target.value as FilterState['researchStatus'] })
          }
        />
        <label className="flex min-h-10 items-center gap-2 rounded-lg border border-slate-600/25 bg-slate-900/60 px-3 text-sm font-semibold text-slate-200">
          <input
            type="checkbox"
            checked={filters.dividendOnly}
            onChange={(event) => onFiltersChange({ ...filters, dividendOnly: event.target.checked })}
            className="h-4 w-4 accent-analyst-500"
          />
          Dividend yield available
        </label>
      </div>
      <div className="mt-5">
        <h3 className="mb-3 text-sm font-semibold text-white">Saved screener presets</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {screenerPresets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => onFiltersChange({ ...filters, ...preset.filters })}
              className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-3 text-left transition hover:border-analyst-400/40 hover:bg-slate-900/65"
            >
              <span className="block font-semibold text-white">{preset.name}</span>
              <span className="mt-1 block text-sm leading-5 text-slate-400">{preset.description}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
