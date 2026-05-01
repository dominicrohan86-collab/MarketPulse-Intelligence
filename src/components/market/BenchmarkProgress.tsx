import { Target } from 'lucide-react';
import { Card } from '../design-system/Card';

export function BenchmarkProgress({ current, total }: { current: number; total: number }) {
  const percent = Math.round((current / total) * 100);

  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-market-green/28 bg-market-green/12 text-emerald-100">
          <Target className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Quality Momentum Benchmark</h3>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            {current} of {total} tracked tickers meet the fictional benchmark for positive trend, acceptable risk, and
            sufficient research coverage.
          </p>
        </div>
      </div>
      <div className="w-full sm:w-56">
        <div className="mb-2 flex justify-between text-sm font-semibold text-slate-200">
          <span>Benchmark coverage</span>
          <span>{percent}%</span>
        </div>
        <div className="h-3 rounded-full bg-slate-800" aria-hidden="true">
          <div className="h-3 rounded-full bg-gradient-to-r from-market-green to-analyst-500" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </Card>
  );
}
