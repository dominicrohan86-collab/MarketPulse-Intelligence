import { Activity, AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight, CircleDot } from 'lucide-react';
import { describeTrend } from '../../lib/format';
import type { DashboardMetric } from '../../types/market';
import { Badge } from '../design-system/Badge';
import { Card } from '../design-system/Card';

const statusTone = {
  positive: 'positive',
  caution: 'caution',
  risk: 'risk',
  neutral: 'neutral',
} as const;

function TrendIcon({ direction }: { direction: DashboardMetric['direction'] }) {
  if (direction === 'Up') return <ArrowUpRight className="h-4 w-4" aria-hidden="true" />;
  if (direction === 'Down') return <ArrowDownRight className="h-4 w-4" aria-hidden="true" />;
  if (direction === 'Mixed') return <Activity className="h-4 w-4" aria-hidden="true" />;
  return <ArrowRight className="h-4 w-4" aria-hidden="true" />;
}

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  const cautionIcon = metric.status === 'risk' ? <AlertTriangle className="h-4 w-4" aria-hidden="true" /> : null;

  return (
    <Card className="flex min-h-48 flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-300">{metric.label}</p>
          <p className="mt-3 font-mono text-3xl font-semibold text-white">{metric.value}</p>
        </div>
        <Badge tone={statusTone[metric.status]} className="gap-1">
          <TrendIcon direction={metric.direction} />
          {describeTrend(metric.direction)}
        </Badge>
      </div>
      <div>
        <p className="text-sm leading-6 text-slate-300">{metric.helperText}</p>
        <p className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          {cautionIcon ?? <CircleDot className="h-3.5 w-3.5" aria-hidden="true" />}
          {metric.comparison}
        </p>
      </div>
    </Card>
  );
}
