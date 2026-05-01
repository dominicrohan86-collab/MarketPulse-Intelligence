import type { MarketInsight } from '../../types/market';
import { Badge } from '../design-system/Badge';
import { Card, CardHeader } from '../design-system/Card';

const toneMap = {
  opportunity: 'positive',
  caution: 'caution',
  risk: 'risk',
  education: 'research',
} as const;

export function InsightSummaryCard({ insights }: { insights: MarketInsight[] }) {
  return (
    <Card>
      <CardHeader
        title="Insight Summary"
        description="Four concise observations that turn market structure into research prompts."
      />
      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.title} className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-3">
            <div className="mb-2 flex items-start justify-between gap-3">
              <h3 className="font-semibold text-white">{insight.title}</h3>
              <Badge tone={toneMap[insight.type]}>{insight.type}</Badge>
            </div>
            <p className="text-sm leading-6 text-slate-300">{insight.body}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ResearchActionsCard({ actions }: { actions: string[] }) {
  return (
    <Card>
      <CardHeader
        title="Recommended Research Actions"
        description="Next steps are framed as due-diligence prompts rather than recommendations."
      />
      <ol className="space-y-3">
        {actions.map((action, index) => (
          <li key={action} className="flex gap-3 rounded-lg border border-slate-600/25 bg-slate-950/30 p-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-analyst-500/18 text-sm font-semibold text-blue-100">
              {index + 1}
            </span>
            <p className="text-sm leading-6 text-slate-300">{action}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}
