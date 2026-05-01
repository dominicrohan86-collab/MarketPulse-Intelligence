import { useMemo, useState } from 'react';
import { HeatmapTable } from '../components/charts/HeatmapTable';
import { RelativeStrengthChart } from '../components/charts/RelativeStrengthChart';
import { SectorMomentumChart } from '../components/charts/SectorMomentumChart';
import { VolumeConfirmationChart } from '../components/charts/VolumeConfirmationChart';
import { Badge } from '../components/design-system/Badge';
import { Card, CardHeader } from '../components/design-system/Card';
import { FilterBar, SelectControl } from '../components/design-system/Controls';
import { LoadingPanel } from '../components/design-system/State';
import { PageHeader } from '../components/layout/PageHeader';
import { getAdjustedSectorPerformance, marketThemes, sectorPerformance, sectors } from '../data/market';
import { useLoadingOnChange } from '../hooks/useLoadingOnChange';
import { signalTone } from '../lib/format';
import type { MarketRegimeFilter, Sector, TimeRange } from '../types/market';

const timeRanges: TimeRange[] = ['1W', '1M', '3M', '6M', '1Y'];
const regimes: MarketRegimeFilter[] = ['Growth-led', 'Balanced', 'Risk-off', 'Value rotation'];

export function TrendExplorerPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('3M');
  const [regime, setRegime] = useState<MarketRegimeFilter>('Growth-led');
  const [sector, setSector] = useState<Sector | 'All'>('All');
  const isLoading = useLoadingOnChange([timeRange, regime, sector], 420);

  const rankedSectors = useMemo(
    () => getAdjustedSectorPerformance(timeRange, regime, 'Balanced', sector),
    [timeRange, regime, sector],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trend Explorer"
        subtitle="Compare sectors, themes, and ticker groups to understand where fictional market momentum is developing and what needs confirmation."
      />

      <FilterBar>
        <SelectControl label="Timeframe" value={timeRange} options={timeRanges} onChange={(event) => setTimeRange(event.target.value as TimeRange)} />
        <SelectControl label="Market regime" value={regime} options={regimes} onChange={(event) => setRegime(event.target.value as MarketRegimeFilter)} />
        <SelectControl label="Sector focus" value={sector} options={['All', ...sectors]} onChange={(event) => setSector(event.target.value as Sector | 'All')} />
      </FilterBar>

      {isLoading ? (
        <LoadingPanel label="Re-ranking sectors and trend signals" />
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <SectorMomentumChart
              data={rankedSectors}
              title="Sector Momentum Ranking"
              caption="Ranks sectors by selected timeframe performance and adjusts the view for the selected fictional market regime."
              summary={`${rankedSectors[0]?.sector ?? 'Technology'} leads this filtered view. Lagging sectors require breadth or volume confirmation before deeper research.`}
            />
            <RelativeStrengthChart />
          </div>

          <VolumeConfirmationChart />
          <HeatmapTable data={sectorPerformance} />

          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white">Market Theme Cards</h2>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                Narrative cards connect quantitative momentum with valuation, risk, and a suggested research question.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {marketThemes.map((theme) => (
                <Card key={theme.name} className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-white">{theme.name}</h3>
                      <Badge tone={signalTone(theme.riskLevel)}>{theme.riskLevel}</Badge>
                    </div>
                    <p className="text-sm leading-6 text-slate-300">{theme.explanation}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {theme.representativeTickers.map((ticker) => (
                        <span key={ticker} className="rounded-md border border-slate-600/30 bg-slate-950/35 px-2 py-1 font-mono text-xs text-slate-200">
                          {ticker}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-semibold text-slate-200">Momentum score</span>
                        <span className="font-mono text-slate-300">{theme.momentumScore} / 100</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800" aria-hidden="true">
                        <div className="h-2 rounded-full bg-gradient-to-r from-analyst-500 to-market-green" style={{ width: `${theme.momentumScore}%` }} />
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-slate-300">
                      <span className="font-semibold text-white">Valuation note: </span>
                      {theme.valuationNote}
                    </p>
                    <div className="rounded-lg border border-market-violet/24 bg-market-violet/10 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-100">Suggested research question</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{theme.researchQuestion}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <InterpretationPanel
            leading={rankedSectors[0]?.sector ?? 'Technology'}
            lagging={rankedSectors[rankedSectors.length - 1]?.sector ?? 'Real Estate'}
          />
        </>
      )}
    </div>
  );
}

function InterpretationPanel({ leading, lagging }: { leading: Sector; lagging: Sector }) {
  const rows = [
    ['What changed?', 'Growth leadership remains intact, but financials and industrials are gaining enough breadth to deserve comparison.'],
    ['Which sectors are leading?', `${leading} leads this filtered view, with healthcare and financials acting as stabilizing secondary groups.`],
    ['Which sectors are lagging?', `${lagging} trails the dashboard and needs breadth confirmation before it can be treated as a durable recovery area.`],
    ['Where is momentum broadening?', 'Financials, healthcare, and select industrials show broadening signals beyond mega-cap technology.'],
    ['Which trend needs confirmation?', 'Small-cap recovery and energy reacceleration need stronger volume and breadth before becoming higher-conviction research themes.'],
    ['Which area has elevated risk?', 'AI infrastructure still carries the most obvious valuation and volatility risk despite strong momentum.'],
  ] as const;

  return (
    <Card>
      <CardHeader
        title="Interpretation Panel"
        description="Plain-language answers translate the charts into research context without crossing into advice."
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {rows.map(([label, body]) => (
          <div key={label} className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-analyst-200">{label}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
