import { GitCompare, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { TickerComparisonChart } from '../components/charts/TickerComparisonChart';
import { Badge } from '../components/design-system/Badge';
import { Button } from '../components/design-system/Button';
import { Card, CardHeader } from '../components/design-system/Card';
import { FilterBar, SearchInput, SelectControl } from '../components/design-system/Controls';
import { EmptyState } from '../components/design-system/State';
import { PageHeader } from '../components/layout/PageHeader';
import { ResearchArticleCard } from '../components/research/ResearchArticleCard';
import { TickerDetailPanel } from '../components/research/TickerDetailPanel';
import { sectors } from '../data/market';
import { researchArticles } from '../data/research';
import { stockTickers } from '../data/tickers';
import { formatCurrency, formatPercent, signalTone } from '../lib/format';
import type { MomentumSignal, RiskLevel, Sector, StockTicker, ValuationSignal } from '../types/market';

const momentumFilters: Array<MomentumSignal | 'All'> = ['All', 'Strong', 'Improving', 'Neutral', 'Weakening', 'Deteriorating'];
const riskFilters: Array<RiskLevel | 'All'> = ['All', 'Low', 'Moderate', 'Elevated', 'High'];
const valuationFilters: Array<ValuationSignal | 'All'> = ['All', 'Discounted', 'Fair', 'Mixed', 'Premium', 'Stretched'];

export function TickerResearchPage({
  watchlistTickers,
  onAddToWatchlist,
}: {
  watchlistTickers: string[];
  onAddToWatchlist: (ticker: StockTicker) => void;
}) {
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState<Sector | 'All'>('All');
  const [momentum, setMomentum] = useState<MomentumSignal | 'All'>('All');
  const [risk, setRisk] = useState<RiskLevel | 'All'>('All');
  const [valuation, setValuation] = useState<ValuationSignal | 'All'>('All');
  const [selectedTicker, setSelectedTicker] = useState(stockTickers[0]);
  const [comparison, setComparison] = useState<string[]>(['NVDA', 'MSFT']);

  const filteredTickers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return stockTickers.filter((ticker) => {
      const matchesSearch =
        !query ||
        ticker.ticker.toLowerCase().includes(query) ||
        ticker.companyName.toLowerCase().includes(query) ||
        ticker.industry.toLowerCase().includes(query);
      const matchesSector = sector === 'All' || ticker.sector === sector;
      const matchesMomentum = momentum === 'All' || ticker.volumeTrend === momentum || ticker.momentumScore >= 75;
      const matchesRisk = risk === 'All' || ticker.riskLevel === risk;
      const matchesValuation = valuation === 'All' || ticker.valuationSignal === valuation;
      return matchesSearch && matchesSector && matchesMomentum && matchesRisk && matchesValuation;
    });
  }, [search, sector, momentum, risk, valuation]);

  const relatedArticles = researchArticles.filter((article) => article.relatedTickers.includes(selectedTicker.ticker)).slice(0, 3);

  const toggleComparison = (ticker: string) => {
    setComparison((current) => {
      if (current.includes(ticker)) return current.filter((item) => item !== ticker);
      if (current.length >= 4) return [current[1], current[2], current[3], ticker].filter(Boolean);
      return [...current, ticker];
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ticker Research"
        subtitle="Search, filter, compare, and inspect fictional research candidates with risk-aware context, article previews, and factor breakdowns."
      />

      <FilterBar>
        <SearchInput
          label="Search ticker or company"
          value={search}
          placeholder="Search NVDA, healthcare, cloud..."
          onChange={(event) => setSearch(event.target.value)}
        />
        <SelectControl label="Sector" value={sector} options={['All', ...sectors]} onChange={(event) => setSector(event.target.value as Sector | 'All')} />
        <SelectControl label="Momentum" value={momentum} options={momentumFilters} onChange={(event) => setMomentum(event.target.value as MomentumSignal | 'All')} />
        <SelectControl label="Risk" value={risk} options={riskFilters} onChange={(event) => setRisk(event.target.value as RiskLevel | 'All')} />
        <SelectControl label="Valuation" value={valuation} options={valuationFilters} onChange={(event) => setValuation(event.target.value as ValuationSignal | 'All')} />
      </FilterBar>

      {comparison.length >= 2 ? <TickerComparisonChart tickers={comparison} /> : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
        <Card>
          <CardHeader
            title="Ticker Comparison List"
            description="Select a row to update the research panel. Add two to four tickers to the comparison chart."
            action={<Badge tone="info">{filteredTickers.length} results</Badge>}
          />
          {filteredTickers.length === 0 ? (
            <EmptyState
              title="No tickers match the current filters"
              description="Try broadening the sector, risk, or valuation filters. The mock universe intentionally includes mixed and conflicting signals."
            />
          ) : (
            <>
              <div className="hidden overflow-x-auto scrollbar-soft lg:block">
                <table className="min-w-[1100px] w-full text-left text-sm">
                  <caption className="sr-only">Ticker research candidates</caption>
                  <thead>
                    <tr className="border-b border-slate-700/60 text-xs uppercase tracking-[0.12em] text-slate-500">
                      <th scope="col" className="pb-3">Ticker</th>
                      <th scope="col" className="pb-3">Sector</th>
                      <th scope="col" className="pb-3">Price</th>
                      <th scope="col" className="pb-3">Change</th>
                      <th scope="col" className="pb-3">30D / 90D</th>
                      <th scope="col" className="pb-3">Momentum</th>
                      <th scope="col" className="pb-3">Valuation</th>
                      <th scope="col" className="pb-3">Sentiment</th>
                      <th scope="col" className="pb-3">Risk</th>
                      <th scope="col" className="pb-3">Status</th>
                      <th scope="col" className="pb-3">Compare</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickers.map((ticker) => (
                      <tr
                        key={ticker.ticker}
                        className={`cursor-pointer border-b border-slate-700/35 last:border-0 hover:bg-slate-800/36 ${selectedTicker.ticker === ticker.ticker ? 'bg-analyst-500/10' : ''}`}
                        onClick={() => setSelectedTicker(ticker)}
                      >
                        <th scope="row" className="py-3 pr-4">
                          <span className="block font-mono text-base font-semibold text-white">{ticker.ticker}</span>
                          <span className="block max-w-48 truncate text-xs font-medium text-slate-400">{ticker.companyName}</span>
                        </th>
                        <td className="py-3 pr-4 text-slate-300">{ticker.sector}</td>
                        <td className="py-3 pr-4 font-mono text-slate-100">{formatCurrency(ticker.latestPrice)}</td>
                        <td className={`py-3 pr-4 font-mono ${ticker.priceChangePercent >= 0 ? 'text-emerald-100' : 'text-rose-100'}`}>
                          {formatPercent(ticker.priceChangePercent)}
                        </td>
                        <td className="py-3 pr-4 text-slate-300">{ticker.thirtyDayTrend} / {ticker.ninetyDayTrend}</td>
                        <td className="py-3 pr-4"><Badge tone={ticker.momentumScore >= 75 ? 'positive' : ticker.momentumScore >= 55 ? 'caution' : 'risk'}>{ticker.momentumScore}</Badge></td>
                        <td className="py-3 pr-4"><Badge tone={signalTone(ticker.valuationSignal)}>{ticker.valuationSignal}</Badge></td>
                        <td className="py-3 pr-4"><Badge tone={signalTone(ticker.sentimentSignal)}>{ticker.sentimentSignal}</Badge></td>
                        <td className="py-3 pr-4"><Badge tone={signalTone(ticker.riskLevel)}>{ticker.riskLevel}</Badge></td>
                        <td className="py-3 pr-4 text-slate-300">{ticker.researchStatus}</td>
                        <td className="py-3 pr-4" onClick={(event) => event.stopPropagation()}>
                          <Button
                            variant={comparison.includes(ticker.ticker) ? 'primary' : 'ghost'}
                            onClick={() => toggleComparison(ticker.ticker)}
                            icon={<GitCompare className="h-4 w-4" aria-hidden="true" />}
                          >
                            {comparison.includes(ticker.ticker) ? 'Added' : 'Add'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 lg:hidden">
                {filteredTickers.map((ticker) => (
                  <article
                    key={ticker.ticker}
                    className={`rounded-lg border p-4 ${selectedTicker.ticker === ticker.ticker ? 'border-analyst-400/45 bg-analyst-500/10' : 'border-slate-600/25 bg-slate-950/30'}`}
                  >
                    <button type="button" className="w-full text-left" onClick={() => setSelectedTicker(ticker)}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-mono text-xl font-semibold text-white">{ticker.ticker}</h3>
                          <p className="text-sm text-slate-300">{ticker.companyName}</p>
                          <p className="text-xs text-slate-500">{ticker.sector}</p>
                        </div>
                        <Badge tone={signalTone(ticker.riskLevel)}>{ticker.riskLevel}</Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Badge tone="neutral">{formatCurrency(ticker.latestPrice)}</Badge>
                        <Badge tone={ticker.priceChangePercent >= 0 ? 'positive' : 'risk'}>{formatPercent(ticker.priceChangePercent)}</Badge>
                        <Badge tone={ticker.momentumScore >= 75 ? 'positive' : 'caution'}>Momentum {ticker.momentumScore}</Badge>
                        <Badge tone={signalTone(ticker.valuationSignal)}>{ticker.valuationSignal}</Badge>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{ticker.suggestedResearchQuestion}</p>
                    </button>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        variant={comparison.includes(ticker.ticker) ? 'primary' : 'secondary'}
                        onClick={() => toggleComparison(ticker.ticker)}
                        icon={<GitCompare className="h-4 w-4" aria-hidden="true" />}
                      >
                        {comparison.includes(ticker.ticker) ? 'Compared' : 'Compare'}
                      </Button>
                      <Button
                        variant="ghost"
                        disabled={watchlistTickers.includes(ticker.ticker)}
                        onClick={() => onAddToWatchlist(ticker)}
                        icon={<Plus className="h-4 w-4" aria-hidden="true" />}
                      >
                        {watchlistTickers.includes(ticker.ticker) ? 'Saved' : 'Watchlist'}
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </Card>

        <div className="space-y-6">
          <TickerDetailPanel
            ticker={selectedTicker}
            onAddToWatchlist={onAddToWatchlist}
            isInWatchlist={watchlistTickers.includes(selectedTicker.ticker)}
          />
        </div>
      </div>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">Research Article Previews</h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            Fictional source cards explain why market narratives matter without copying real article content.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(relatedArticles.length ? relatedArticles : researchArticles.slice(0, 3)).map((article) => (
            <ResearchArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
