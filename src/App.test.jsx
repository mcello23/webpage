import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock child components to avoid complexity and dependencies
jest.mock('./components/Navbar', () => ({ onOpenCertificates }) => (
  <div data-testid="navbar">
    Navbar
    <button onClick={onOpenCertificates}>Open Certs</button>
  </div>
));
jest.mock('./components/Hero', () => () => <div data-testid="hero">Hero</div>);
jest.mock('./components/Skills', () => () => <div data-testid="skills">Skills</div>);
jest.mock('./components/Experience', () => () => <div data-testid="experience">Experience</div>);
jest.mock('./components/Articles', () => () => <div data-testid="articles">Articles</div>);
jest.mock('./components/Contact', () => () => <div data-testid="contact">Contact</div>);
jest.mock('./components/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock(
  './components/CertificatesModal',
  () =>
    ({ isOpen, onClose }) =>
      isOpen ? (
        <div data-testid="certificates-modal">
          CertificatesModal <button onClick={onClose}>Close</button>
        </div>
      ) : null
);
jest.mock(
  './components/TestDashboardModal',
  () =>
    ({ isOpen, onClose }) =>
      isOpen ? (
        <div data-testid="test-dashboard-modal">
          TestDashboardModal <button onClick={onClose}>Close</button>
        </div>
      ) : null
);
jest.mock('./components/SideProjects', () => () => (
  <div data-testid="side-projects">SideProjects</div>
));
jest.mock('./components/Frameworks', () => () => <div data-testid="frameworks">Frameworks</div>);
jest.mock('./components/CookieConsent', () => () => (
  <div data-testid="cookie-consent">CookieConsent</div>
));

describe('App Component', () => {
  beforeAll(() => {
    // Mock window.M for Materialize
    window.M = {
      AutoInit: jest.fn(),
    };
  });

  test('renders home route components', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('skills')).toBeInTheDocument();
    expect(screen.getByTestId('experience')).toBeInTheDocument();
    expect(screen.getByTestId('articles')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('cookie-consent')).toBeInTheDocument();
  });

  test('renders side-projects route', () => {
    render(
      <MemoryRouter initialEntries={['/side-projects']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('side-projects')).toBeInTheDocument();
    expect(screen.queryByTestId('hero')).not.toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders frameworks route', () => {
    render(
      <MemoryRouter initialEntries={['/frameworks']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('frameworks')).toBeInTheDocument();
    expect(screen.queryByTestId('hero')).not.toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('opens and closes Test Dashboard Modal', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Modal should be closed initially
    expect(screen.queryByTestId('test-dashboard-modal')).not.toBeInTheDocument();

    // Click FAB to open
    const fab = screen.getByLabelText('Open Test Dashboard');
    fireEvent.click(fab);

    // Modal should be open
    expect(screen.getByTestId('test-dashboard-modal')).toBeInTheDocument();

    // Click close button in modal
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    // Modal should be closed
    expect(screen.queryByTestId('test-dashboard-modal')).not.toBeInTheDocument();
  });

  test('opens and closes Certificates Modal via Navbar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Modal should be closed initially
    expect(screen.queryByTestId('certificates-modal')).not.toBeInTheDocument();

    // Click button in Navbar to open (mocked Navbar has this button)
    const openButton = screen.getByText('Open Certs');
    fireEvent.click(openButton);

    // Modal should be open
    expect(screen.getByTestId('certificates-modal')).toBeInTheDocument();

    // Click close button in modal
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    // Modal should be closed
    expect(screen.queryByTestId('certificates-modal')).not.toBeInTheDocument();
  });
});
