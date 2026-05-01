import { render, screen } from '@testing-library/react';
import { MarketOverviewPage } from './MarketOverviewPage';

describe('MarketOverviewPage', () => {
  it('renders KPI cards for the market overview', () => {
    render(<MarketOverviewPage />);

    expect(screen.getByText('S&P 500 Trend')).toBeInTheDocument();
    expect(screen.getByText('Nasdaq Momentum')).toBeInTheDocument();
    expect(screen.getAllByText('Market Breadth')[0]).toBeInTheDocument();
    expect(screen.getByText('Watchlist Opportunities')).toBeInTheDocument();
  });
});
