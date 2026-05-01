import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatPercent } from '../../lib/format';
import type { SectorPerformance } from '../../types/market';
import { ChartCard } from './ChartCard';

const colors = ['#68a4ff', '#2fc38a', '#9b8cff', '#2bb7a7', '#f0b84a', '#e36d79'];

interface SectorMomentumChartProps {
  data: Array<SectorPerformance & { selectedPerformance?: number }>;
  title?: string;
  caption?: string;
  summary?: string;
}

export function SectorMomentumChart({
  data,
  title = 'Sector Momentum Ranking',
  caption = 'Horizontal ranking of sector performance for the selected timeframe.',
  summary = 'Technology, healthcare, communication services, and financials show stronger participation than real estate, materials, and consumer discretionary.',
}: SectorMomentumChartProps) {
  const chartData = data.map((item) => ({
    sector: item.sector,
    performance: item.selectedPerformance ?? item.threeMonths,
    riskLevel: item.riskLevel,
  }));

  return (
    <ChartCard title={title} caption={caption} summary={summary}>
      <ResponsiveContainer width="100%" height={310}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 20, bottom: 8, left: 18 }}>
          <CartesianGrid stroke="rgba(148, 163, 184, 0.18)" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={(value: number) => `${value}%`}
            stroke="#9ca3af"
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="sector"
            width={142}
            stroke="#9ca3af"
            tick={{ fill: '#dbeafe', fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(104, 164, 255, 0.08)' }}
            formatter={(value: number, name, item) => [
              `${formatPercent(value)} (${item.payload.riskLevel} risk)`,
              name === 'performance' ? 'Performance' : name,
            ]}
            labelFormatter={(label) => `${label} sector`}
          />
          <Bar dataKey="performance" radius={[0, 8, 8, 0]} barSize={18}>
            {chartData.map((item, index) => (
              <Cell key={item.sector} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
