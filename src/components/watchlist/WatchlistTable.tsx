import { Trash2 } from 'lucide-react';
import { formatCurrency, signalTone } from '../../lib/format';
import type { StockTicker, WatchlistItem } from '../../types/market';
import { Badge } from '../design-system/Badge';
import { Button } from '../design-system/Button';
import { Card, CardHeader } from '../design-system/Card';

export function WatchlistTable({
  items,
  tickerMap,
  onRemove,
  onNoteChange,
}: {
  items: WatchlistItem[];
  tickerMap: Map<string, StockTicker>;
  onRemove: (ticker: string) => void;
  onNoteChange: (ticker: string, note: string) => void;
}) {
  return (
    <Card>
      <CardHeader
        title="Research Watchlist"
        description="Local watchlist for monitoring research candidates, alerts, notes, and next review actions."
      />
      <div className="hidden overflow-x-auto scrollbar-soft lg:block">
        <table className="min-w-[1120px] w-full text-left text-sm">
          <caption className="sr-only">Watchlist candidates and research notes</caption>
          <thead>
            <tr className="border-b border-slate-700/60 text-xs uppercase tracking-[0.12em] text-slate-500">
              <th scope="col" className="pb-3">Ticker</th>
              <th scope="col" className="pb-3">Status</th>
              <th scope="col" className="pb-3">Momentum</th>
              <th scope="col" className="pb-3">Valuation</th>
              <th scope="col" className="pb-3">Risk</th>
              <th scope="col" className="pb-3">Alert</th>
              <th scope="col" className="pb-3">Note</th>
              <th scope="col" className="pb-3">Next action</th>
              <th scope="col" className="pb-3">Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.ticker} className="border-b border-slate-700/35 last:border-0">
                <th scope="row" className="py-3 pr-4">
                  <span className="block font-mono text-base font-semibold text-white">{item.ticker}</span>
                  <span className="block text-xs font-medium text-slate-400">{item.companyName}</span>
                  <span className="block text-xs text-slate-500">Added {item.addedDate}</span>
                </th>
                <td className="py-3 pr-4 text-slate-300">{item.researchStatus}</td>
                <td className="py-3 pr-4">
                  <Badge tone={item.momentumScore >= 75 ? 'positive' : 'caution'}>{item.momentumScore} / 100</Badge>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={signalTone(item.valuationSignal)}>{item.valuationSignal}</Badge>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={signalTone(item.riskLevel)}>{item.riskLevel}</Badge>
                </td>
                <td className="py-3 pr-4 font-mono text-slate-100">{formatCurrency(item.priceAlertLevel)}</td>
                <td className="py-3 pr-4">
                  <WatchlistNoteEditor
                    ticker={item.ticker}
                    note={item.userNote}
                    onNoteChange={onNoteChange}
                  />
                </td>
                <td className="py-3 pr-4 text-slate-300">{item.nextReviewAction}</td>
                <td className="py-3 pr-4">
                  <Button
                    variant="ghost"
                    aria-label={`Remove ${item.ticker} from watchlist`}
                    onClick={() => onRemove(item.ticker)}
                    icon={<Trash2 className="h-4 w-4" aria-hidden="true" />}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 lg:hidden">
        {items.map((item) => {
          const ticker = tickerMap.get(item.ticker);
          return (
            <article key={item.ticker} className="rounded-lg border border-slate-600/25 bg-slate-950/30 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-mono text-xl font-semibold text-white">{item.ticker}</h3>
                  <p className="text-sm text-slate-300">{item.companyName}</p>
                  <p className="text-xs text-slate-500">{item.sector}</p>
                </div>
                <Badge tone={signalTone(item.riskLevel)}>{item.riskLevel}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Badge tone={item.momentumScore >= 75 ? 'positive' : 'caution'}>Momentum {item.momentumScore}</Badge>
                <Badge tone={signalTone(item.valuationSignal)}>{item.valuationSignal}</Badge>
                <Badge tone="neutral">Alert {formatCurrency(item.priceAlertLevel)}</Badge>
                <Badge tone="research">{item.researchStatus}</Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{ticker?.suggestedResearchQuestion}</p>
              <WatchlistNoteEditor ticker={item.ticker} note={item.userNote} onNoteChange={onNoteChange} />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-sm text-slate-300">{item.nextReviewAction}</p>
                <Button variant="ghost" onClick={() => onRemove(item.ticker)}>
                  Remove
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </Card>
  );
}

export function WatchlistNoteEditor({
  ticker,
  note,
  onNoteChange,
}: {
  ticker: string;
  note: string;
  onNoteChange: (ticker: string, note: string) => void;
}) {
  return (
    <label className="block min-w-72 text-xs font-semibold text-slate-400">
      <span className="sr-only">Watchlist note for {ticker}</span>
      <textarea
        value={note}
        onChange={(event) => onNoteChange(ticker, event.target.value)}
        rows={3}
        className="mt-1 w-full resize-none rounded-lg border border-slate-600/28 bg-slate-900/68 p-2 text-sm leading-5 text-slate-100"
      />
    </label>
  );
}
