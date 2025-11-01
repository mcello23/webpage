/**
 * @jest-environment jsdom
 */

describe('Cookie Consent System', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    document.head.innerHTML = '';

    // Reset cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    // Reset window objects
    delete window.dataLayer;
    delete window.gtag;
    delete window.CookieConsent;

    // Mock console methods
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Banner Display', () => {
    test('should show banner when no consent cookie exists', (done) => {
      // Load and execute the script
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      // Execute script
      eval(scriptContent);

      // Wait for DOM ready
      setTimeout(() => {
        const banner = document.getElementById('cookieConsentBanner');
        expect(banner).toBeTruthy();
        expect(banner.classList.contains('show')).toBe(true);
        expect(banner.getAttribute('aria-hidden')).toBe('false');
        done();
      }, 100);
    });

    test('should not show banner when consent is already accepted', (done) => {
      // Set accepted cookie
      document.cookie = 'cookie_consent=accepted;path=/';

      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const banner = document.getElementById('cookieConsentBanner');
        if (banner) {
          expect(banner.classList.contains('show')).toBe(false);
        }
        done();
      }, 100);
    });

    test('should not show banner when consent is declined', (done) => {
      document.cookie = 'cookie_consent=declined;path=/';

      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const banner = document.getElementById('cookieConsentBanner');
        if (banner) {
          expect(banner.classList.contains('show')).toBe(false);
        }
        done();
      }, 100);
    });
  });

  describe('Accept Cookies', () => {
    test('should set cookie when accepting', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const acceptBtn = document.getElementById('acceptCookies');
        expect(acceptBtn).toBeTruthy();

        // Click accept
        acceptBtn.click();

        // Check cookie
        expect(document.cookie).toContain('cookie_consent=accepted');

        // Check banner is hidden
        const banner = document.getElementById('cookieConsentBanner');
        expect(banner.classList.contains('show')).toBe(false);
        expect(banner.getAttribute('aria-hidden')).toBe('true');

        done();
      }, 100);
    });

    test('should initialize Google Analytics when accepting', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const acceptBtn = document.getElementById('acceptCookies');
        acceptBtn.click();

        // Wait for GA initialization
        setTimeout(() => {
          expect(window.dataLayer).toBeDefined();
          expect(window.gtag).toBeDefined();
          expect(console.log).toHaveBeenCalledWith('Google Analytics initialized with debug mode');
          done();
        }, 100);
      }, 100);
    });
  });

  describe('Decline Cookies', () => {
    test('should set cookie when declining', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const declineBtn = document.getElementById('declineCookies');
        expect(declineBtn).toBeTruthy();

        // Click decline
        declineBtn.click();

        // Check cookie
        expect(document.cookie).toContain('cookie_consent=declined');

        // Check banner is hidden
        const banner = document.getElementById('cookieConsentBanner');
        expect(banner.classList.contains('show')).toBe(false);

        done();
      }, 100);
    });

    test('should NOT initialize Google Analytics when declining', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const declineBtn = document.getElementById('declineCookies');
        declineBtn.click();

        setTimeout(() => {
          // GA script should not be loaded
          const gaScript = document.querySelector('script[src*="googletagmanager"]');
          expect(gaScript).toBeFalsy();
          done();
        }, 100);
      }, 100);
    });
  });

  describe('Public API', () => {
    test('should expose CookieConsent API', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        expect(window.CookieConsent).toBeDefined();
        expect(typeof window.CookieConsent.accept).toBe('function');
        expect(typeof window.CookieConsent.decline).toBe('function');
        expect(typeof window.CookieConsent.reset).toBe('function');
        expect(typeof window.CookieConsent.getStatus).toBe('function');
        done();
      }, 100);
    });

    test('getStatus should return consent status', (done) => {
      document.cookie = 'cookie_consent=accepted;path=/';

      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        expect(window.CookieConsent.getStatus()).toBe('accepted');
        done();
      }, 100);
    });
  });

  describe('Accessibility', () => {
    test('banner should have proper ARIA attributes', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const banner = document.getElementById('cookieConsentBanner');
        expect(banner.getAttribute('role')).toBe('dialog');
        expect(banner.getAttribute('aria-live')).toBe('polite');
        expect(banner.getAttribute('aria-label')).toBe('Cookie consent banner');
        expect(banner.getAttribute('aria-describedby')).toBe('cookieConsentText');
        done();
      }, 100);
    });

    test('buttons should have proper aria-label', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const acceptBtn = document.getElementById('acceptCookies');
        const declineBtn = document.getElementById('declineCookies');

        expect(acceptBtn.getAttribute('aria-label')).toBe('Accept all cookies');
        expect(declineBtn.getAttribute('aria-label')).toBe('Decline cookies');
        done();
      }, 100);
    });
  });

  describe('Banner Content', () => {
    test('should display English text', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const banner = document.getElementById('cookieConsentBanner');
        const text = banner.textContent;

        expect(text).toContain('This site uses cookies');
        expect(text).toContain('Google Analytics');
        expect(text).toContain('GDPR/LGPD');
        expect(text).toContain('Accept');
        expect(text).toContain('Decline');
        done();
      }, 100);
    });

    test('should have privacy policy link', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const banner = document.getElementById('cookieConsentBanner');
        const link = banner.querySelector('a[href*="google.com/privacy"]');

        expect(link).toBeTruthy();
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toContain('noopener');
        done();
      }, 100);
    });
  });
});
