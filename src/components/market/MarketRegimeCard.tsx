import { Radar } from 'lucide-react';
import type { MarketRegimeFilter, RiskAppetite, Sector } from '../../types/market';
import { Badge } from '../design-system/Badge';
import { Card, CardHeader } from '../design-system/Card';

export function MarketRegimeCard({
  regime,
  riskAppetite,
  sectorFilter,
}: {
  regime: MarketRegimeFilter;
  riskAppetite: RiskAppetite;
  sectorFilter: Sector | 'All';
}) {
  const focusCopy =
    sectorFilter === 'All'
      ? 'Momentum is strongest in AI infrastructure and large-cap software, while energy and defensive staples show more selective participation.'
      : `${sectorFilter} is isolated for review, so leadership and risk language should be compared with the broader market before drawing conclusions.`;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-market-violet/30 bg-market-violet/14 text-violet-100">
          <Radar className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <CardHeader
            className="mb-2"
            title="Market Regime"
            description="Plain-language summary of the current fictional market environment."
          />
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge tone="research">{regime} profile</Badge>
            <Badge tone="info">{riskAppetite} risk appetite</Badge>
            <Badge tone="neutral">{sectorFilter === 'All' ? 'All sectors' : sectorFilter}</Badge>
          </div>
          <p className="max-w-4xl text-sm leading-6 text-slate-300">
            The market is currently showing a {regime.toLowerCase()} environment. {focusCopy} This view is intended to
            shape research priorities, not produce personalized buy or sell instructions.
          </p>
        </div>
      </div>
    </Card>
  );
}
