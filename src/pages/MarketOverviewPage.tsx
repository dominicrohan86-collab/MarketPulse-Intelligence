import { useMemo, useState } from 'react';
import { BreadthVisual } from '../components/charts/BreadthVisual';
import { SectorMomentumChart } from '../components/charts/SectorMomentumChart';
import { Badge } from '../components/design-system/Badge';
import { SelectControl, FilterBar } from '../components/design-system/Controls';
import { LoadingPanel } from '../components/design-system/State';
import { PageHeader } from '../components/layout/PageHeader';
import { BenchmarkProgress } from '../components/market/BenchmarkProgress';
import { InsightSummaryCard, ResearchActionsCard } from '../components/market/InsightCard';
import { MarketRegimeCard } from '../components/market/MarketRegimeCard';
import { MetricCard } from '../components/market/MetricCard';
import { ResearchCandidateTable } from '../components/market/ResearchCandidateTable';
import {
  dashboardMetrics,
  getAdjustedSectorPerformance,
  marketIndices,
  marketInsights,
  recommendedResearchActions,
  sectors,
} from '../data/market';
import { stockTickers } from '../data/tickers';
import { useLoadingOnChange } from '../hooks/useLoadingOnChange';
import type { MarketRegimeFilter, RiskAppetite, Sector, TimeRange } from '../types/market';

const timeRanges: TimeRange[] = ['1W', '1M', '3M', '6M', '1Y'];
const regimes: MarketRegimeFilter[] = ['Growth-led', 'Balanced', 'Risk-off', 'Value rotation'];
const riskAppetites: RiskAppetite[] = ['Balanced', 'Conservative', 'Opportunistic', 'Risk-aware growth'];

export function MarketOverviewPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('3M');
  const [regime, setRegime] = useState<MarketRegimeFilter>('Growth-led');
  const [sectorFilter, setSectorFilter] = useState<Sector | 'All'>('All');
  const [riskAppetite, setRiskAppetite] = useState<RiskAppetite>('Balanced');
  const [indexFilter, setIndexFilter] = useState('S&P 500');

  const isLoading = useLoadingOnChange([timeRange, regime, sectorFilter, riskAppetite, indexFilter], 460);

  const adjustedSectors = useMemo(
    () => getAdjustedSectorPerformance(timeRange, regime, riskAppetite, sectorFilter),
    [timeRange, regime, riskAppetite, sectorFilter],
  );

  const metrics = useMemo(() => {
    const leading = adjustedSectors[0]?.sector ?? 'Technology';
    const breadthAdjustment = riskAppetite === 'Conservative' ? '57%' : riskAppetite === 'Opportunistic' ? '64%' : '61%';
    return dashboardMetrics.map((metric) => {
      if (metric.label === 'Leading Sector') {
        return { ...metric, value: leading, helperText: `${leading} leads the selected filtered view; review valuation and risk labels before deeper research.` };
      }
      if (metric.label === 'Market Breadth') {
        return { ...metric, value: breadthAdjustment };
      }
      if (metric.label === 'S&P 500 Trend') {
        return { ...metric, label: `${indexFilter} Trend` };
      }
      return metric;
    });
  }, [adjustedSectors, riskAppetite, indexFilter]);

  const candidates = useMemo(() => {
    return stockTickers
      .filter((ticker) => sectorFilter === 'All' || ticker.sector === sectorFilter)
      .filter((ticker) => (riskAppetite === 'Conservative' ? ticker.riskLevel !== 'High' && ticker.riskLevel !== 'Elevated' : true))
      .sort((a, b) => b.momentumScore + b.qualityScore - (a.momentumScore + a.qualityScore))
      .slice(0, 8);
  }, [sectorFilter, riskAppetite]);

  const benchmarkCount = stockTickers.filter(
    (ticker) => ticker.momentumScore >= 70 && ticker.riskLevel !== 'High' && ticker.valuationSignal !== 'Stretched',
  ).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Market Trends Overview"
        subtitle="Track sector momentum, market breadth, and research candidates using fictionalized market data designed for product demonstration."
        showDisclosure
        action={
          <div className="flex flex-wrap gap-2">
            <Badge tone="info">Selected range: {timeRange}</Badge>
            <Badge tone="research">{regime}</Badge>
          </div>
        }
      />

      <FilterBar>
        <SelectControl label="Time range" value={timeRange} options={timeRanges} onChange={(event) => setTimeRange(event.target.value as TimeRange)} />
        <SelectControl label="Market regime" value={regime} options={regimes} onChange={(event) => setRegime(event.target.value as MarketRegimeFilter)} />
        <SelectControl
          label="Sector filter"
          value={sectorFilter}
          options={['All', ...sectors]}
          onChange={(event) => setSectorFilter(event.target.value as Sector | 'All')}
        />
        <SelectControl
          label="Risk appetite"
          value={riskAppetite}
          options={riskAppetites}
          onChange={(event) => setRiskAppetite(event.target.value as RiskAppetite)}
        />
        <SelectControl
          label="Benchmark index"
          value={indexFilter}
          options={marketIndices.map((index) => index.name)}
          onChange={(event) => setIndexFilter(event.target.value)}
        />
      </FilterBar>

      {isLoading ? (
        <LoadingPanel label="Refreshing overview with selected market filters" />
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Market KPI cards">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <MarketRegimeCard regime={regime} riskAppetite={riskAppetite} sectorFilter={sectorFilter} />

          <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <SectorMomentumChart data={adjustedSectors} title="Sector Leadership Chart" />
            <BreadthVisual />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <InsightSummaryCard insights={marketInsights} />
            <ResearchActionsCard actions={recommendedResearchActions} />
          </div>

          <ResearchCandidateTable tickers={candidates} />
          <BenchmarkProgress current={benchmarkCount} total={stockTickers.length} />
        </>
      )}
    </div>
  );
}
