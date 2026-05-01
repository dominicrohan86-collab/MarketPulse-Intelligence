import {
  BarChart3,
  BookOpenCheck,
  Building2,
  ClipboardList,
  Compass,
  Menu,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { cn } from '../../lib/classNames';
import { RiskDisclosure } from '../design-system/State';

export type PageId = 'overview' | 'trends' | 'ticker' | 'watchlist' | 'brief' | 'system';

const navItems: Array<{ id: PageId; label: string; icon: ReactNode }> = [
  { id: 'overview', label: 'Market Overview', icon: <BarChart3 className="h-4 w-4" /> },
  { id: 'trends', label: 'Trend Explorer', icon: <Compass className="h-4 w-4" /> },
  { id: 'ticker', label: 'Ticker Research', icon: <Search className="h-4 w-4" /> },
  { id: 'watchlist', label: 'Watchlist & Screener', icon: <ClipboardList className="h-4 w-4" /> },
  { id: 'brief', label: 'Research Brief Builder', icon: <BookOpenCheck className="h-4 w-4" /> },
  { id: 'system', label: 'Design System', icon: <Building2 className="h-4 w-4" /> },
];

export function AppShell({
  activePage,
  onNavigate,
  title,
  timeframe,
  children,
}: {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  title: string;
  timeframe: string;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen text-slate-100">
      <a
        href="#main-content"
        className="sr-only rounded-md bg-analyst-500 px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to main content
      </a>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-700/50 bg-ink-950/86 px-4 py-5 backdrop-blur-xl lg:block">
        <Brand />
        <nav className="mt-8 space-y-1" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={cn(
                'flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold transition',
                activePage === item.id
                  ? 'bg-analyst-500/18 text-white ring-1 ring-analyst-400/35'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white',
              )}
              aria-current={activePage === item.id ? 'page' : undefined}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-5 left-4 right-4 space-y-3">
          <div className="rounded-lg border border-market-violet/28 bg-market-violet/12 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-violet-100">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Research mode
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              Signals are framed as due-diligence prompts, never personalized advice.
            </p>
          </div>
          <RiskDisclosure compact />
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-700/42 bg-ink-950/78 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600/45 bg-slate-900/65 text-slate-100 lg:hidden"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-analyst-200">
                MarketPulse Intelligence
              </p>
              <h1 className="truncate text-lg font-semibold text-white sm:text-2xl">{title}</h1>
            </div>
            <div className="hidden items-center gap-3 rounded-lg border border-slate-600/35 bg-slate-900/60 px-3 py-2 text-sm text-slate-300 sm:flex">
              <span className="font-semibold text-white">{timeframe}</span>
              <span>Research analyst workspace</span>
            </div>
          </div>
        </header>
        <main id="main-content" className="px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-ink-950/90 backdrop-blur-xl lg:hidden" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between border-b border-slate-700/50 p-4">
            <Brand />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600/45 bg-slate-900/65"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="space-y-2 p-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={cn(
                  'flex min-h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold',
                  activePage === item.id ? 'bg-analyst-500/20 text-white' : 'text-slate-300',
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
          <div className="px-4">
            <RiskDisclosure compact />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-analyst-400/35 bg-analyst-500/16 text-analyst-200">
        <BarChart3 className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-bold text-white">MarketPulse</p>
        <p className="text-xs font-semibold text-slate-400">Intelligence</p>
      </div>
    </div>
  );
}
