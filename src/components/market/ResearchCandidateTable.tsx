import { formatCurrency, signalTone } from '../../lib/format';
import type { StockTicker } from '../../types/market';
import { Badge } from '../design-system/Badge';
import { Card, CardHeader } from '../design-system/Card';

export function ResearchCandidateTable({ tickers }: { tickers: StockTicker[] }) {
  return (
    <Card>
      <CardHeader
        title="Top Research Candidates"
        description="Candidates are ranked by momentum, quality, and research usefulness. They are not recommendations."
      />
      <div className="overflow-x-auto scrollbar-soft">
        <table className="min-w-[850px] w-full text-left text-sm">
          <caption className="sr-only">Top research candidates with risk and valuation labels</caption>
          <thead>
            <tr className="border-b border-slate-700/60 text-xs uppercase tracking-[0.12em] text-slate-500">
              <th scope="col" className="pb-3">Ticker</th>
              <th scope="col" className="pb-3">Sector</th>
              <th scope="col" className="pb-3">Price</th>
              <th scope="col" className="pb-3">Momentum</th>
              <th scope="col" className="pb-3">Valuation</th>
              <th scope="col" className="pb-3">Risk</th>
              <th scope="col" className="pb-3">Research status</th>
            </tr>
          </thead>
          <tbody>
            {tickers.map((ticker) => (
              <tr key={ticker.ticker} className="border-b border-slate-700/35 last:border-0">
                <th scope="row" className="py-3 pr-4">
                  <span className="block font-mono text-base font-semibold text-white">{ticker.ticker}</span>
                  <span className="block text-xs font-medium text-slate-400">{ticker.companyName}</span>
                </th>
                <td className="py-3 pr-4 text-slate-300">{ticker.sector}</td>
                <td className="py-3 pr-4 font-mono text-slate-100">{formatCurrency(ticker.latestPrice)}</td>
                <td className="py-3 pr-4">
                  <Badge tone={ticker.momentumScore >= 75 ? 'positive' : ticker.momentumScore >= 55 ? 'caution' : 'risk'}>
                    {ticker.momentumScore} / 100
                  </Badge>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={signalTone(ticker.valuationSignal)}>{ticker.valuationSignal}</Badge>
                </td>
                <td className="py-3 pr-4">
                  <Badge tone={signalTone(ticker.riskLevel)}>{ticker.riskLevel}</Badge>
                </td>
                <td className="py-3 pr-4 text-slate-300">{ticker.researchStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
