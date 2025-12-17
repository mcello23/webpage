import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

describe('Booking Functionality', () => {
  describe('Navbar Booking Button', () => {
    test('renders booking button with correct attributes', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );

      // Match the aria-label "Book a 15-minute call"
      const bookingLink = screen.getByRole('link', { name: /book a 15-minute call/i });

      expect(bookingLink).toBeInTheDocument();
      expect(bookingLink).toHaveAttribute('href', 'https://calendly.com/marceloadsc/15min');
      expect(bookingLink).toHaveAttribute('target', '_blank');
      expect(bookingLink).toHaveAttribute('rel', 'noopener noreferrer');

      // Check for icon
      const icon = within(bookingLink).getByText('schedule');
      expect(icon).toHaveClass('material-icons');
    });
  });

  describe('Footer Booking Button', () => {
    test('renders booking button with correct attributes', () => {
      render(<Footer />);

      const bookingLink = screen.getByRole('link', { name: /book 15-min call/i });

      expect(bookingLink).toBeInTheDocument();
      expect(bookingLink).toHaveAttribute('href', 'https://calendly.com/marceloadsc/15min');
      expect(bookingLink).toHaveAttribute('target', '_blank');
      expect(bookingLink).toHaveAttribute('rel', 'noopener noreferrer');

      // Check for icon
      const icon = within(bookingLink).getByText('event'); // Footer uses 'event' icon
      expect(icon).toHaveClass('material-icons');
    });
  });
});
