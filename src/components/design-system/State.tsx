import { AlertCircle, FileSearch } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/classNames';
import { Card } from './Card';

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-slate-600/24', className)} aria-hidden="true" />;
}

export function LoadingPanel({ label = 'Updating market view' }: { label?: string }) {
  return (
    <Card className="space-y-4" aria-live="polite" aria-busy="true">
      <p className="text-sm font-semibold text-slate-200">{label}</p>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-36 w-full" />
      <div className="grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
    </Card>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <FileSearch aria-hidden="true" className="h-10 w-10 text-analyst-200" />
      <div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-1 max-w-xl text-sm leading-6 text-slate-300">{description}</p>
      </div>
      {action}
    </Card>
  );
}

export function RiskDisclosure({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-amber-300/24 bg-amber-300/10 text-amber-50',
        compact ? 'px-3 py-2 text-xs' : 'p-4 text-sm',
      )}
      role="note"
    >
      <div className="flex gap-2">
        <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="leading-6">
          MarketPulse Intelligence is a research workspace using fictionalized mock market data. It is not financial
          advice.
        </p>
      </div>
    </div>
  );
}
