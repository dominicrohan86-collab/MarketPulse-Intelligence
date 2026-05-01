import type { ReactNode } from 'react';
import { RiskDisclosure } from '../design-system/State';

export function PageHeader({
  title,
  subtitle,
  action,
  showDisclosure = false,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
  showDisclosure?: boolean;
}) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-analyst-200">Fictional market research</p>
          <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-4xl text-base leading-7 text-slate-300">{subtitle}</p>
        </div>
        {action}
      </div>
      {showDisclosure ? <RiskDisclosure /> : null}
    </div>
  );
}
