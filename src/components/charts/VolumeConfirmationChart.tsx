import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { chartSummaries, volumeConfirmationSeries } from '../../data/market';
import { ChartCard } from './ChartCard';

export function VolumeConfirmationChart() {
  const summary = chartSummaries.volumeConfirmation;

  return (
    <ChartCard title={summary.title} caption={summary.caption} summary={summary.summary}>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={volumeConfirmationSeries} margin={{ top: 8, right: 20, bottom: 6, left: 0 }}>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.18)" vertical={false} />
          <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: '#cbd5e1', fontSize: 12 }} interval={4} />
          <YAxis yAxisId="left" stroke="#9ca3af" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#9ca3af"
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
            tickFormatter={(value: number) => `${value}M`}
          />
          <Tooltip
            formatter={(value: number, name) => [
              name === 'volume' ? `${value.toFixed(1)}M shares` : `$${value.toFixed(2)}`,
              name === 'volume' ? 'Mock volume' : 'Mock price',
            ]}
          />
          <Bar yAxisId="right" dataKey="volume" fill="rgba(104, 164, 255, 0.34)" radius={[6, 6, 0, 0]} />
          <Line yAxisId="left" type="monotone" dataKey="price" stroke="#2fc38a" strokeWidth={3} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
