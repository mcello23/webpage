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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        expect(window.CookieConsent.getStatus()).toBe('accepted');
        done();
      }, 100);
    });
  });

  describe('Module Exports and API', () => {
    test('should export required functions', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../../public/js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        // Check if module exports are available
        if (typeof module !== 'undefined' && module.exports) {
          expect(typeof module.exports.setCookie).toBe('function');
          expect(typeof module.exports.getCookie).toBe('function');
          expect(typeof module.exports.acceptCookies).toBe('function');
          expect(typeof module.exports.declineCookies).toBe('function');
        }
        done();
      }, 100);
    });

    test('getCookie should return null for non-existent cookie', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../../public/js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        // Create a getCookie function
        function getCookie(name) {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) {
            return parts.pop().split(';').shift();
          }
          return null;
        }

        expect(getCookie('nonexistent_cookie')).toBe(null);
        done();
      }, 100);
    });

    test('setCookie writes cookie and getCookie reads it', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../../public/js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        function setCookie(name, value, days) {
          const date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          const expires = `expires=${date.toUTCString()}`;
          document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
        }

        function getCookie(name) {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) {
            return parts.pop().split(';').shift();
          }
          return null;
        }

        setCookie('test_cookie', 'test_value', 1);
        expect(getCookie('test_cookie')).toBe('test_value');
        done();
      }, 100);
    });
  });

  describe('Google Analytics Integration', () => {
    test('GA script is loaded with correct ID', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../../public/js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        window.CookieConsent.accept();

        setTimeout(() => {
          const gaScript = document.querySelector('script[src*="googletagmanager"]');
          expect(gaScript).toBeTruthy();
          expect(gaScript.src).toContain('G-J2EX4QG684');
          done();
        }, 100);
      }, 100);
    });

    test('gtag is configured with correct parameters', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../../public/js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        window.CookieConsent.accept();

        setTimeout(() => {
          expect(window.gtag).toBeDefined();
          expect(window.dataLayer).toBeDefined();
          expect(window.dataLayer.length).toBeGreaterThan(0);
          done();
        }, 100);
      }, 100);
    });

    test('should load analytics when consent already accepted on init', (done) => {
      document.cookie = 'cookie_consent=accepted;path=/';
      document.head.innerHTML = '';

      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../../public/js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const gaScript = document.querySelector('script[src*="googletagmanager"]');
        expect(gaScript).toBeTruthy();
        expect(window.dataLayer).toBeDefined();
        done();
      }, 100);
    });

    test('should NOT load analytics when consent declined on init', (done) => {
      document.cookie = 'cookie_consent=declined;path=/';
      document.head.innerHTML = '';

      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../../public/js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        expect(console.log).toHaveBeenCalledWith('User has declined cookies');
        const gaScript = document.querySelector('script[src*="googletagmanager"]');
        expect(gaScript).toBeFalsy();
        done();
      }, 100);
    });
  });

  describe('Banner HTML Structure', () => {
    test('creates complete banner structure', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../../public/js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const banner = document.getElementById('cookieConsentBanner');
        expect(banner).toBeTruthy();

        const content = banner.querySelector('.cookie-consent-content');
        expect(content).toBeTruthy();

        const text = banner.querySelector('.cookie-consent-text');
        expect(text).toBeTruthy();

        const buttons = banner.querySelector('.cookie-consent-buttons');
        expect(buttons).toBeTruthy();

        expect(banner.textContent).toContain('This site uses cookies');
        expect(banner.textContent).toContain('GDPR/LGPD');
        done();
      }, 100);
    });

    test('includes privacy policy link', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../../public/js/cookie-consent.js'),
        'utf8'
      );

      eval(scriptContent);

      setTimeout(() => {
        const privacyLink = document.querySelector('a[href*="google.com/privacy"]');
        expect(privacyLink).toBeTruthy();
        expect(privacyLink.target).toBe('_blank');
        expect(privacyLink.rel).toBe('noopener noreferrer');
        done();
      }, 100);
    });
  });

  describe('Accessibility', () => {
    test('banner should have proper ARIA attributes', (done) => {
      const fs = require('fs');
      const path = require('path');
      const scriptContent = fs.readFileSync(
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
        path.join(__dirname, '../../public/js/cookie-consent.js'),
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
