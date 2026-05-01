import { useMemo, useState } from 'react';
import { AppShell, type PageId } from './components/layout/AppShell';
import { initialWatchlist, stockTickers } from './data/tickers';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { MarketOverviewPage } from './pages/MarketOverviewPage';
import { ResearchBriefBuilderPage } from './pages/ResearchBriefBuilderPage';
import { TickerResearchPage } from './pages/TickerResearchPage';
import { TrendExplorerPage } from './pages/TrendExplorerPage';
import { WatchlistScreenerPage } from './pages/WatchlistScreenerPage';
import type { StockTicker, WatchlistItem } from './types/market';

const pageTitles: Record<PageId, string> = {
  overview: 'Market Trends Overview',
  trends: 'Trend Explorer',
  ticker: 'Ticker Research',
  watchlist: 'Watchlist & Screener',
  brief: 'Research Brief Builder',
  system: 'Design System',
};

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('overview');
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(initialWatchlist);
  const watchlistTickers = useMemo(() => watchlist.map((item) => item.ticker), [watchlist]);

  const addToWatchlist = (ticker: StockTicker) => {
    setWatchlist((current) => {
      if (current.some((item) => item.ticker === ticker.ticker)) return current;
      return [
        ...current,
        {
          ticker: ticker.ticker,
          companyName: ticker.companyName,
          sector: ticker.sector,
          addedDate: '2026-05-01',
          researchStatus: ticker.researchStatus,
          momentumScore: ticker.momentumScore,
          valuationSignal: ticker.valuationSignal,
          riskLevel: ticker.riskLevel,
          priceAlertLevel: Number((ticker.latestPrice * 1.04).toFixed(2)),
          userNote: ticker.suggestedResearchQuestion,
          nextReviewAction:
            ticker.riskLevel === 'High' || ticker.riskLevel === 'Elevated'
              ? 'Check whether volume confirms breakout'
              : ticker.earningsDate
                ? 'Review after earnings'
                : 'Compare valuation against sector peers',
        },
      ];
    });
  };

  const removeFromWatchlist = (ticker: string) => {
    setWatchlist((current) => current.filter((item) => item.ticker !== ticker));
  };

  const updateWatchlistNote = (ticker: string, note: string) => {
    setWatchlist((current) => current.map((item) => (item.ticker === ticker ? { ...item, userNote: note } : item)));
  };

  return (
    <AppShell activePage={activePage} onNavigate={setActivePage} title={pageTitles[activePage]} timeframe="3M view">
      {activePage === 'overview' ? <MarketOverviewPage /> : null}
      {activePage === 'trends' ? <TrendExplorerPage /> : null}
      {activePage === 'ticker' ? (
        <TickerResearchPage watchlistTickers={watchlistTickers} onAddToWatchlist={addToWatchlist} />
      ) : null}
      {activePage === 'watchlist' ? (
        <WatchlistScreenerPage
          watchlist={watchlist}
          onAddToWatchlist={addToWatchlist}
          onRemoveFromWatchlist={removeFromWatchlist}
          onUpdateNote={updateWatchlistNote}
        />
      ) : null}
      {activePage === 'brief' ? <ResearchBriefBuilderPage /> : null}
      {activePage === 'system' ? <DesignSystemPage /> : null}
      <span className="sr-only">Tracked mock universe contains {stockTickers.length} securities.</span>
    </AppShell>
  );
}
