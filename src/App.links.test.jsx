import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock window.M for Materialize
window.M = {
  AutoInit: jest.fn(),
  Modal: {
    init: jest.fn(() => ({
      open: jest.fn(),
      close: jest.fn(),
      destroy: jest.fn(),
    })),
    getInstance: jest.fn(() => ({
      open: jest.fn(),
      close: jest.fn(),
      destroy: jest.fn(),
    })),
  },
  Tooltip: {
    init: jest.fn(),
  },
};

// Mock IntersectionObserver
window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.scrollTo
window.scrollTo = jest.fn();

describe('App Integration Tests - Links & Navigation', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  describe('Navigation Bar', () => {
    test('renders brand logo with correct text', () => {
      const brandLogo = screen.getByText(/Marcelo Costa — SDET/i);
      expect(brandLogo).toBeInTheDocument();
    });

    test('renders main navigation links', () => {
      const nav = screen.getByRole('navigation');
      expect(within(nav).getByText(/Side Projects/i)).toBeInTheDocument();
      expect(within(nav).getByText(/Frameworks/i)).toBeInTheDocument();
      expect(within(nav).getByText(/Certificates/i)).toBeInTheDocument();
    });
  });

  describe('External Links Security', () => {
    test('all external links have rel="noopener noreferrer" and target="_blank"', () => {
      const links = screen.getAllByRole('link');
      const externalLinks = links.filter((link) => link.getAttribute('href')?.startsWith('http'));

      externalLinks.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
        expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
      });
    });
  });

  describe('Critical Links Presence', () => {
    test('contains LinkedIn link', () => {
      const linkedInLinks = screen.getAllByRole('link', { name: /linkedin/i });
      expect(linkedInLinks.length).toBeGreaterThan(0);
      expect(linkedInLinks[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/marceloc/');
    });

    test('contains Calendly link', () => {
      const calendlyLinks = screen.getAllByRole('link', { name: /Book 15-min Call/i });
      expect(calendlyLinks.length).toBeGreaterThan(0);
      expect(calendlyLinks[0]).toHaveAttribute('href', 'https://calendly.com/marceloadsc/15min');
    });

    test('contains Medium/Articles links', () => {
      // Check for at least one article link
      const articleLinks = screen
        .getAllByRole('link')
        .filter((link) => link.getAttribute('href')?.includes('medium.com'));
      expect(articleLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Internal Navigation', () => {
    test('internal anchor links start with #', () => {
      const links = screen.getAllByRole('link');
      const internalLinks = links.filter(
        (link) =>
          !link.getAttribute('href')?.startsWith('http') &&
          !link.getAttribute('href')?.startsWith('mailto') &&
          link.getAttribute('href') !== '#' // Ignore empty anchors if any
      );

      internalLinks.forEach((link) => {
        const href = link.getAttribute('href');
        // Some might be relative paths like /images/..., but navigation links should be #id
        if (href && !href.startsWith('/')) {
          expect(href.startsWith('#')).toBe(true);
        }
      });
    });
  });
});
