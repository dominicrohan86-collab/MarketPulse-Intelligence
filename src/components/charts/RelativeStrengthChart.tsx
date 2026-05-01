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
import { chartSummaries, relativeStrengthSeries } from '../../data/market';
import { ChartCard } from './ChartCard';

export function RelativeStrengthChart() {
  const summary = chartSummaries.relativeStrength;

  return (
    <ChartCard title={summary.title} caption={summary.caption} summary={summary.summary}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={relativeStrengthSeries} margin={{ top: 8, right: 22, bottom: 6, left: 0 }}>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.18)" vertical={false} />
          <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: '#cbd5e1', fontSize: 12 }} interval={5} />
          <YAxis stroke="#9ca3af" tick={{ fill: '#cbd5e1', fontSize: 12 }} domain={['dataMin - 4', 'dataMax + 4']} />
          <Tooltip formatter={(value: number) => [`${value.toFixed(1)} index`, 'Relative strength']} />
          <Legend wrapperStyle={{ color: '#cbd5e1', fontSize: 12 }} />
          <Line type="monotone" dataKey="Technology" stroke="#68a4ff" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="Healthcare" stroke="#2fc38a" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="Financials" stroke="#f0b84a" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="Industrials" stroke="#9b8cff" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="Small Caps" stroke="#e36d79" strokeWidth={2.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
