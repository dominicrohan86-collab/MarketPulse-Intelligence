import { fireEvent, render, screen } from '@testing-library/react';
import { TickerResearchPage } from './TickerResearchPage';

describe('TickerResearchPage', () => {
  it('filters ticker results by search query', () => {
    render(<TickerResearchPage watchlistTickers={[]} onAddToWatchlist={() => undefined} />);

    fireEvent.change(screen.getByLabelText('Search ticker or company'), { target: { value: 'Thermo' } });

    expect(screen.getByText('1 results')).toBeInTheDocument();
    expect(screen.getAllByText('Thermo Fisher Scientific').length).toBeGreaterThan(0);
  });
});
