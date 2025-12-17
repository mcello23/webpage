import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  test('renders footer content', () => {
    render(<Footer />);
    expect(screen.getByText(/Thanks for exploring my testing portfolio/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Ready to build robust, scalable testing solutions together/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/© 2025 Marcelo Costa/i)).toBeInTheDocument();
  });

  test('renders social links with correct hrefs', () => {
    render(<Footer />);

    const calendlyLink = screen.getByRole('link', { name: /Book 15-min Call/i });
    expect(calendlyLink).toHaveAttribute(
      'href',
      expect.stringContaining('calendly.com/marceloadsc/15min')
    );

    const linkedinLink = screen.getByRole('link', { name: /Let's Connect/i });
    expect(linkedinLink).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin.com/in/marceloc')
    );
  });
});
