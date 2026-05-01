import { marketBreadth } from '../../data/market';
import { Card, CardHeader } from '../design-system/Card';

export function BreadthVisual() {
  return (
    <Card>
      <CardHeader
        title="Market Breadth"
        description="Tracked stocks above common moving-average levels. Each row includes text so the signal is not color-only."
      />
      <div className="space-y-4">
        {marketBreadth.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-100">{item.label}</p>
              <span className="font-mono text-lg font-semibold text-white">{item.value}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800" aria-hidden="true">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-analyst-500 to-market-green"
                style={{ width: `${item.value}%` }}
              />
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{item.helper}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
