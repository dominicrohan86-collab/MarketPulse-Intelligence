import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { priceSeriesByTicker } from '../../data/market';
import { ChartCard } from './ChartCard';

const palette = ['#68a4ff', '#2fc38a', '#f0b84a', '#9b8cff'];

export function TickerComparisonChart({ tickers }: { tickers: string[] }) {
  const limited = tickers.slice(0, 4);
  const chartData = Array.from({ length: 28 }, (_, index) => {
    const row: Record<string, number | string> = { date: `Day ${index + 1}` };
    limited.forEach((ticker) => {
      const series = priceSeriesByTicker[ticker] ?? [];
      const start = series[0]?.price ?? 100;
      const point = series[index]?.price ?? start;
      row[ticker] = Number(((point / start) * 100).toFixed(1));
    });
    return row;
  });

  return (
    <ChartCard
      title="Ticker Comparison"
      caption="Indexes selected tickers to 100 so momentum can be compared without price-scale distortion."
      summary={`Comparison includes ${limited.join(', ') || 'no selected tickers'}. Values are fictional indexed price paths, not real market data.`}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 8, right: 20, bottom: 6, left: 0 }}>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.18)" vertical={false} />
          <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: '#cbd5e1', fontSize: 12 }} interval={5} />
          <YAxis stroke="#9ca3af" tick={{ fill: '#cbd5e1', fontSize: 12 }} domain={['dataMin - 3', 'dataMax + 3']} />
          <Tooltip formatter={(value: number) => [`${value.toFixed(1)} indexed`, 'Relative move']} />
          <Legend wrapperStyle={{ color: '#cbd5e1', fontSize: 12 }} />
          {limited.map((ticker, index) => (
            <Line key={ticker} type="monotone" dataKey={ticker} stroke={palette[index]} strokeWidth={3} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
