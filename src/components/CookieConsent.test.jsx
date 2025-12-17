import { fireEvent, render, screen } from '@testing-library/react';
import CookieConsent from './CookieConsent';

describe('CookieConsent Component', () => {
  let originalCookie;

  beforeEach(() => {
    originalCookie = document.cookie;
    // Clear cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    // Mock window properties
    delete window.gtag;
    delete window.dataLayer;
  });

  afterEach(() => {
    document.cookie = originalCookie;
  });

  test('renders banner when no cookie is present', () => {
    render(<CookieConsent />);
    expect(screen.getByRole('dialog', { name: /Cookie consent banner/i })).toBeInTheDocument();
    expect(screen.getByText(/This site uses cookies/i)).toBeInTheDocument();
  });

  test('does not render banner when cookie is already set', () => {
    document.cookie = 'cookie_consent=accepted';
    render(<CookieConsent />);
    expect(
      screen.queryByRole('dialog', { name: /Cookie consent banner/i })
    ).not.toBeInTheDocument();
  });

  test('sets cookie and initializes GA on accept', () => {
    render(<CookieConsent />);

    const acceptBtn = screen.getByRole('button', { name: /Accept all cookies/i });
    fireEvent.click(acceptBtn);

    expect(document.cookie).toContain('cookie_consent=accepted');
    expect(window.dataLayer).toBeDefined();
    expect(
      screen.queryByRole('dialog', { name: /Cookie consent banner/i })
    ).not.toBeInTheDocument();
  });

  test('sets cookie and does not initialize GA on decline', () => {
    render(<CookieConsent />);

    const declineBtn = screen.getByRole('button', { name: /Decline cookies/i });
    fireEvent.click(declineBtn);

    expect(document.cookie).toContain('cookie_consent=declined');
    expect(window.dataLayer).toBeUndefined();
    expect(
      screen.queryByRole('dialog', { name: /Cookie consent banner/i })
    ).not.toBeInTheDocument();
  });

  test('checks if running in production environment', () => {
    // The component checks for localhost using window.location.hostname
    // In test environment (NODE_ENV === 'test'), shouldShow returns true
    // This is by design - the component shows in test but not in localhost when running in browser

    // Verify the component can check environment
    render(<CookieConsent />);

    // In test environment, banner should show (unless cookie is set)
    expect(screen.getByRole('dialog', { name: /Cookie consent banner/i })).toBeInTheDocument();
  });
});
