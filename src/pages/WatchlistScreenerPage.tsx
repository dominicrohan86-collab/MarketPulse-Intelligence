import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '../components/design-system/Badge';
import { Button } from '../components/design-system/Button';
import { Card, CardHeader } from '../components/design-system/Card';
import { SelectControl } from '../components/design-system/Controls';
import { EmptyState, RiskDisclosure } from '../components/design-system/State';
import { PageHeader } from '../components/layout/PageHeader';
import { ScreenerPanel } from '../components/watchlist/ScreenerPanel';
import { WatchlistTable } from '../components/watchlist/WatchlistTable';
import { stockTickers } from '../data/tickers';
import { formatCurrency, formatPercent, riskRank, signalTone, valuationRank } from '../lib/format';
import type { FilterState, StockTicker, WatchlistItem } from '../types/market';

const defaultFilters: FilterState = {
  sector: 'All',
  marketCapRange: 'All',
  momentumMin: 50,
  valuationSignal: 'All',
  riskLevel: 'All',
  dividendOnly: false,
  earningsWindow: 'All',
  volumeTrend: 'All',
  sentimentSignal: 'All',
  researchStatus: 'All',
};

type SortKey = 'momentum' | 'risk' | 'valuation' | 'sector';

export function WatchlistScreenerPage({
  watchlist,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  onUpdateNote,
}: {
  watchlist: WatchlistItem[];
  onAddToWatchlist: (ticker: StockTicker) => void;
  onRemoveFromWatchlist: (ticker: string) => void;
  onUpdateNote: (ticker: string, note: string) => void;
}) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortKey, setSortKey] = useState<SortKey>('momentum');
  const tickerMap = useMemo(() => new Map(stockTickers.map((ticker) => [ticker.ticker, ticker])), []);

  const screenedTickers = useMemo(() => {
    const results = stockTickers.filter((ticker) => {
      const matchesSector = filters.sector === 'All' || ticker.sector === filters.sector;
      const matchesCap = filters.marketCapRange === 'All' || ticker.marketCapRange === filters.marketCapRange;
      const matchesMomentum = ticker.momentumScore >= filters.momentumMin;
      const matchesValuation = filters.valuationSignal === 'All' || ticker.valuationSignal === filters.valuationSignal;
      const matchesRisk = filters.riskLevel === 'All' || ticker.riskLevel === filters.riskLevel;
      const matchesDividend = !filters.dividendOnly || Boolean(ticker.dividendYield);
      const matchesVolume = filters.volumeTrend === 'All' || ticker.volumeTrend === filters.volumeTrend;
      const matchesSentiment = filters.sentimentSignal === 'All' || ticker.sentimentSignal === filters.sentimentSignal;
      const matchesStatus = filters.researchStatus === 'All' || ticker.researchStatus === filters.researchStatus;
      const matchesEarnings =
        filters.earningsWindow === 'All' ||
        (filters.earningsWindow === 'No near-term event' && !ticker.earningsDate) ||
        (filters.earningsWindow !== 'No near-term event' && Boolean(ticker.earningsDate));
      return (
        matchesSector &&
        matchesCap &&
        matchesMomentum &&
        matchesValuation &&
        matchesRisk &&
        matchesDividend &&
        matchesVolume &&
        matchesSentiment &&
        matchesStatus &&
        matchesEarnings
      );
    });

    return [...results].sort((a, b) => {
      if (sortKey === 'momentum') return b.momentumScore - a.momentumScore;
      if (sortKey === 'risk') return riskRank(a.riskLevel) - riskRank(b.riskLevel);
      if (sortKey === 'valuation') return valuationRank(a.valuationSignal) - valuationRank(b.valuationSignal);
      return a.sector.localeCompare(b.sector);
    });
  }, [filters, sortKey]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Watchlist & Screener"
        subtitle="Organize research ideas, edit local notes, apply saved screener presets, and compare risk-aware candidates without implying trade execution."
        showDisclosure
      />

      {watchlist.length ? (
        <WatchlistTable
          items={watchlist}
          tickerMap={tickerMap}
          onRemove={onRemoveFromWatchlist}
          onNoteChange={onUpdateNote}
        />
      ) : (
        <EmptyState
          title="Your research watchlist is empty"
          description="Add mock candidates from Ticker Research or the screener results. The watchlist stores local UI state for portfolio demonstration."
        />
      )}

      <ScreenerPanel filters={filters} onFiltersChange={setFilters} onReset={() => setFilters(defaultFilters)} />

      <Card>
        <CardHeader
          title="Screener Results"
          description="Results update as filters and presets change. Sorting changes the table order without altering the underlying mock data."
          action={
            <SelectControl
              label="Sort by"
              value={sortKey}
              options={['momentum', 'risk', 'valuation', 'sector']}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
            />
          }
        />

        {screenedTickers.length === 0 ? (
          <EmptyState
            title="No candidates match this screen"
            description="This empty state is intentional. It helps users recognize when a preset is too restrictive for the current market condition."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {screenedTickers.map((ticker) => {
              const saved = watchlist.some((item) => item.ticker === ticker.ticker);
              return (
                <article key={ticker.ticker} className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-mono text-xl font-semibold text-white">{ticker.ticker}</h3>
                      <p className="text-sm text-slate-300">{ticker.companyName}</p>
                      <p className="text-xs text-slate-500">{ticker.sector}</p>
                    </div>
                    <Badge tone={signalTone(ticker.riskLevel)}>{ticker.riskLevel}</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Badge tone={ticker.momentumScore >= 75 ? 'positive' : ticker.momentumScore >= 55 ? 'caution' : 'risk'}>
                      Momentum {ticker.momentumScore}
                    </Badge>
                    <Badge tone={signalTone(ticker.valuationSignal)}>{ticker.valuationSignal}</Badge>
                    <Badge tone={signalTone(ticker.sentimentSignal)}>{ticker.sentimentSignal}</Badge>
                    <Badge tone="neutral">{ticker.dividendYield ? `${ticker.dividendYield.toFixed(1)}% yield` : 'No dividend'}</Badge>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">Mock price</dt>
                      <dd className="font-mono font-semibold text-white">{formatCurrency(ticker.latestPrice)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">Daily move</dt>
                      <dd className={`font-mono font-semibold ${ticker.priceChangePercent >= 0 ? 'text-emerald-100' : 'text-rose-100'}`}>
                        {formatPercent(ticker.priceChangePercent)}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{ticker.suggestedResearchQuestion}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-500">{ticker.researchStatus}</span>
                    <Button
                      variant={saved ? 'ghost' : 'primary'}
                      disabled={saved}
                      onClick={() => onAddToWatchlist(ticker)}
                      icon={<Plus className="h-4 w-4" aria-hidden="true" />}
                    >
                      {saved ? 'Saved' : 'Add'}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Card>

      <RiskDisclosure />
    </div>
  );
}
