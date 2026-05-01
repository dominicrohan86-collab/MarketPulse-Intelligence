import { Search } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/classNames';

interface SelectControlProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export function SelectControl({ label, options, className, ...props }: SelectControlProps) {
  return (
    <label className={cn('flex min-w-40 flex-col gap-1.5 text-xs font-semibold text-slate-300', className)}>
      {label}
      <select
        className="min-h-10 rounded-lg border border-slate-500/28 bg-slate-900/72 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:border-analyst-400/45"
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function SearchInput({ label, className, ...props }: SearchInputProps) {
  return (
    <label className={cn('flex flex-1 flex-col gap-1.5 text-xs font-semibold text-slate-300', className)}>
      {label}
      <span className="relative">
        <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className="min-h-10 w-full rounded-lg border border-slate-500/28 bg-slate-900/72 py-2 pl-9 pr-3 text-sm font-medium text-white shadow-sm transition placeholder:text-slate-500 hover:border-analyst-400/45"
          {...props}
        />
      </span>
    </label>
  );
}

export function FilterBar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-3 rounded-lg border border-slate-500/20 bg-slate-950/32 p-3 md:flex-row md:flex-wrap md:items-end', className)}>
      {children}
    </div>
  );
}
