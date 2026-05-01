import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/classNames';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'dark' | 'light';
}

export function Card({ className, tone = 'dark', ...props }: CardProps) {
  return (
    <section
      className={cn(
        tone === 'dark' ? 'glass-panel text-slate-100' : 'light-panel text-slate-900',
        'rounded-lg p-5',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between', className)}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-analyst-200">{eyebrow}</p>
        ) : null}
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description ? <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-300">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
