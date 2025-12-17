import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  test('renders brand logo and text', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const brandLink = screen.getByLabelText('Home');
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
    expect(brandLink).toHaveTextContent('Marcelo Costa — SDET');

    // Verify home icon
    const icon = brandLink.querySelector('.material-icons');
    expect(icon).toHaveTextContent('home');
  });

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Side Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Frameworks/i)).toBeInTheDocument();
    expect(screen.getByText(/Certificates/i)).toBeInTheDocument();
  });

  test('renders social and CTA links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Booking link
    const bookingLink = screen.getByLabelText('Book a 15-minute call');
    expect(bookingLink).toBeInTheDocument();
    expect(bookingLink).toHaveAttribute('href', 'https://calendly.com/marceloadsc/15min');
    expect(bookingLink).toHaveAttribute('target', '_blank');
    expect(bookingLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(bookingLink).toHaveClass('cta-link', 'book-call');

    // Verify icon and text
    const icon = bookingLink.querySelector('.material-icons');
    expect(icon).toHaveTextContent('schedule');
    expect(bookingLink).toHaveTextContent('Book 15-min call');

    // Social links
    expect(screen.getByLabelText('github-link')).toHaveAttribute(
      'href',
      'https://github.com/mcello23'
    );
    expect(screen.getByLabelText('linkedin-link')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/marceloc/'
    );
  });

  test('calls onOpenCertificates when Certificates link is clicked', () => {
    const handleOpenCertificates = jest.fn();
    render(
      <MemoryRouter>
        <Navbar onOpenCertificates={handleOpenCertificates} />
      </MemoryRouter>
    );

    const certLink = screen.getByText(/Certificates/i);
    fireEvent.click(certLink);

    expect(handleOpenCertificates).toHaveBeenCalledTimes(1);
  });

  test('renders mobile menu toggle button', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const toggle = screen.getByLabelText('Toggle navigation');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-controls', 'mobileMenu');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('toggles mobile menu on click', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const toggle = screen.getByLabelText('Toggle navigation');
    const menu = container.querySelector('#mobileMenu');

    expect(menu).not.toHaveClass('open');

    // Click toggle
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(menu).toHaveClass('active');

    // Click again to close
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(menu).not.toHaveClass('active');
  });
});
