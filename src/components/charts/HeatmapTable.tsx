import type { SectorPerformance } from '../../types/market';
import { Card, CardHeader } from '../design-system/Card';

const columns = [
  ['1 Week', 'oneWeek'],
  ['1 Month', 'oneMonth'],
  ['3 Months', 'threeMonths'],
  ['6 Months', 'sixMonths'],
  ['1 Year', 'oneYear'],
] as const;

function cellTone(value: number) {
  if (value >= 8) return 'border-market-green/24 bg-market-green/18 text-emerald-50';
  if (value >= 1) return 'border-analyst-400/24 bg-analyst-500/14 text-blue-50';
  if (value >= -1) return 'border-market-amber/24 bg-market-amber/14 text-amber-50';
  return 'border-market-rose/24 bg-market-rose/14 text-rose-50';
}

function cellLabel(value: number) {
  if (value >= 8) return 'positive';
  if (value >= 1) return 'positive';
  if (value >= -1) return 'mixed';
  return 'negative';
}

export function HeatmapTable({ data }: { data: SectorPerformance[] }) {
  return (
    <Card>
      <CardHeader
        title="Sector x Timeframe Heatmap"
        description="Percent performance by sector and timeframe. Cells include positive, mixed, or negative labels for accessible interpretation."
      />
      <div className="mb-3 flex flex-wrap gap-2 text-xs text-slate-300" aria-label="Heatmap legend">
        <span className="rounded-full border border-market-green/24 bg-market-green/18 px-2.5 py-1">positive</span>
        <span className="rounded-full border border-market-amber/24 bg-market-amber/14 px-2.5 py-1">mixed</span>
        <span className="rounded-full border border-market-rose/24 bg-market-rose/14 px-2.5 py-1">negative</span>
      </div>
      <div className="overflow-x-auto scrollbar-soft">
        <table className="min-w-[760px] w-full border-separate border-spacing-0 text-left text-sm">
          <caption className="sr-only">Sector performance heatmap by timeframe</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 bg-ink-850/95 p-3 text-xs uppercase text-slate-400">
                Sector
              </th>
              {columns.map(([label]) => (
                <th key={label} scope="col" className="p-3 text-xs uppercase text-slate-400">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.sector}>
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-t border-slate-700/40 bg-ink-850/95 p-3 font-semibold text-white"
                >
                  {row.sector}
                </th>
                {columns.map(([label, key]) => {
                  const value = row[key];
                  return (
                    <td key={label} className="border-t border-slate-700/40 p-2">
                      <span
                        className={`flex min-h-14 min-w-28 flex-col justify-center rounded-lg border px-3 py-2 ${cellTone(
                          value,
                        )}`}
                      >
                        <span className="font-mono text-base font-semibold">
                          {value > 0 ? '+' : ''}
                          {value.toFixed(1)}%
                        </span>
                        <span className="text-xs">{cellLabel(value)} signal</span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
