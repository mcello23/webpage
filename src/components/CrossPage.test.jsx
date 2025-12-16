import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

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

describe('Cross-Page Consistency', () => {
  const pages = [
    { name: 'Home', route: '/' },
    { name: 'Frameworks', route: '/frameworks' },
    { name: 'SideProjects', route: '/side-projects' },
  ];

  pages.forEach(({ name, route }) => {
    describe(`${name} Page`, () => {
      test('renders Navbar with brand logo', () => {
        render(
          <MemoryRouter initialEntries={[route]}>
            <App />
          </MemoryRouter>
        );
        const brandLogo = screen.getByText(/Marcelo Costa — SDET/i);
        expect(brandLogo).toBeInTheDocument();
        // Check if it's within a nav
        const nav = screen.getByRole('navigation');
        expect(nav).toContainElement(brandLogo);
      });

      test('renders Footer', () => {
        render(
          <MemoryRouter initialEntries={[route]}>
            <App />
          </MemoryRouter>
        );
        const footerHeading = screen.getByText(/Thanks for exploring my testing portfolio/i);
        expect(footerHeading).toBeInTheDocument();
      });

      test('renders main navigation links', () => {
        render(
          <MemoryRouter initialEntries={[route]}>
            <App />
          </MemoryRouter>
        );
        const nav = screen.getByRole('navigation');
        expect(within(nav).getByText(/Side Projects/i)).toBeInTheDocument();
        expect(within(nav).getByText(/Frameworks/i)).toBeInTheDocument();
        expect(within(nav).getByText(/Certificates/i)).toBeInTheDocument();
      });
    });
  });
});
