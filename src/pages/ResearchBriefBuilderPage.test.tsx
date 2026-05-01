import { fireEvent, render, screen } from '@testing-library/react';
import { ResearchBriefBuilderPage } from './ResearchBriefBuilderPage';

describe('ResearchBriefBuilderPage', () => {
  it('updates the preview when audience changes', () => {
    render(<ResearchBriefBuilderPage />);

    fireEvent.change(screen.getByLabelText('Audience'), { target: { value: 'Individual Investor' } });

    expect(screen.getByText('Broad Market Research Brief for Individual Investor')).toBeInTheDocument();
    expect(screen.getByText(/plain language over a 3 months window/i)).toBeInTheDocument();
  });
});
