import type { ReactNode } from 'react';
import { cn } from '../../lib/classNames';

type Tone = 'positive' | 'neutral' | 'caution' | 'risk' | 'info' | 'research';

const toneStyles: Record<Tone, string> = {
  positive: 'border-market-green/30 bg-market-green/12 text-emerald-100',
  neutral: 'border-slate-500/28 bg-slate-700/42 text-slate-200',
  caution: 'border-market-amber/34 bg-market-amber/14 text-amber-100',
  risk: 'border-market-rose/34 bg-market-rose/14 text-rose-100',
  info: 'border-analyst-400/34 bg-analyst-500/15 text-blue-100',
  research: 'border-market-violet/34 bg-market-violet/14 text-violet-100',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-xs font-semibold leading-tight',
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
