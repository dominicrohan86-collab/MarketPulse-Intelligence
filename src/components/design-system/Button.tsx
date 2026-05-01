import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/classNames';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-analyst-400/70 bg-analyst-500 text-white shadow-soft hover:bg-analyst-400 disabled:bg-slate-600',
  secondary:
    'border-slate-500/30 bg-slate-800/74 text-slate-100 hover:border-analyst-400/55 hover:bg-slate-700/80',
  ghost: 'border-transparent bg-transparent text-slate-300 hover:bg-slate-800/70 hover:text-white',
  danger: 'border-market-rose/50 bg-market-rose/15 text-rose-100 hover:bg-market-rose/24',
};

export function Button({ className, variant = 'secondary', icon, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
