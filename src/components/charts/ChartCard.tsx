import type { ReactNode } from 'react';
import { Card, CardHeader } from '../design-system/Card';

export function ChartCard({
  title,
  caption,
  summary,
  children,
}: {
  title: string;
  caption: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader title={title} description={caption} />
      <div className="min-h-72">{children}</div>
      <p className="mt-4 rounded-lg border border-slate-500/18 bg-slate-950/30 p-3 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-slate-100">Chart summary: </span>
        {summary}
      </p>
    </Card>
  );
}
