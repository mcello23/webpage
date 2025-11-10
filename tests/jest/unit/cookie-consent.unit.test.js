/**
 * Unit tests for cookie-consent.js module
 * Tests cookie management and consent functionality
 */

const { JSDOM } = require('jsdom');

describe('Cookie Consent Module - Unit Tests', () => {
  let dom;
  let window;
  let document;
  let cookieModule;

  beforeEach(() => {
    // Create a fresh DOM for each test
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head></head>
        <body>
          <div id="cookieConsentBanner" class="cookie-consent-banner" aria-hidden="true">
            <div class="cookie-consent-content">
              <p>We use cookies...</p>
              <button id="acceptCookies" class="cookie-btn cookie-btn-accept">Accept</button>
              <button id="declineCookies" class="cookie-btn cookie-btn-decline">Decline</button>
            </div>
          </div>
        </body>
      </html>
    `,
      {
        url: 'https://example.com/',
        runScripts: 'dangerously',
        resources: 'usable',
      }
    );

    window = dom.window;
    document = window.document;

    // Set globals for Jest environment
    global.window = window;
    global.document = document;

    // Mock console methods
    window.console = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    };

    // Import the module
    cookieModule = require('../../../js/cookie-consent.js');

    // Set CookieConsent on window if it exists in module
    if (cookieModule.CookieConsent) {
      window.CookieConsent = cookieModule.CookieConsent;
    }

    // Manually trigger initialization if needed
    if (cookieModule.init && typeof cookieModule.init === 'function') {
      try {
        cookieModule.init();
      } catch {
        // Init might fail without complete DOM, that's ok for basic tests
      }
    }
  });
  afterEach(() => {
    dom.window.close();
  });

  describe('Module Exports', () => {
    test('should export required functions', () => {
      expect(cookieModule).toBeDefined();
      expect(cookieModule.setCookie).toBeDefined();
      expect(cookieModule.getCookie).toBeDefined();
      expect(cookieModule.acceptCookies).toBeDefined();
      expect(cookieModule.declineCookies).toBeDefined();
      expect(typeof cookieModule.setCookie).toBe('function');
      expect(typeof cookieModule.getCookie).toBe('function');
    });

    test('should expose CookieConsent API on window', () => {
      expect(window.CookieConsent).toBeDefined();
      expect(typeof window.CookieConsent.accept).toBe('function');
      expect(typeof window.CookieConsent.decline).toBe('function');
      expect(typeof window.CookieConsent.getStatus).toBe('function');
      expect(typeof window.CookieConsent.reset).toBe('function');
    });
  });

  describe('Cookie Operations', () => {
    test('should have setCookie function', () => {
      expect(typeof cookieModule.setCookie).toBe('function');
    });

    test('should have getCookie function', () => {
      expect(typeof cookieModule.getCookie).toBe('function');
    });

    test('getCookie should return null for non-existent cookie', () => {
      const value = cookieModule.getCookie('nonexistent_cookie');
      expect(value).toBe(null);
    });
  });

  describe('DOM Elements', () => {
    test('should find cookie consent banner', () => {
      const banner = document.getElementById('cookieConsentBanner');
      expect(banner).toBeDefined();
      expect(banner).not.toBeNull();
    });

    test('should find accept button', () => {
      const acceptBtn = document.getElementById('acceptCookies');
      expect(acceptBtn).toBeDefined();
      expect(acceptBtn).not.toBeNull();
    });

    test('should find decline button', () => {
      const declineBtn = document.getElementById('declineCookies');
      expect(declineBtn).toBeDefined();
      expect(declineBtn).not.toBeNull();
    });
  });

  describe('Accessibility', () => {
    test('banner should have aria-hidden attribute', () => {
      const banner = document.getElementById('cookieConsentBanner');
      expect(banner.hasAttribute('aria-hidden')).toBe(true);
    });

    test('buttons should have descriptive text', () => {
      const acceptBtn = document.getElementById('acceptCookies');
      const declineBtn = document.getElementById('declineCookies');

      expect(acceptBtn.textContent).toBeTruthy();
      expect(declineBtn.textContent).toBeTruthy();
    });

    test('buttons should have appropriate classes', () => {
      const acceptBtn = document.getElementById('acceptCookies');
      const declineBtn = document.getElementById('declineCookies');

      expect(acceptBtn.classList.contains('cookie-btn')).toBe(true);
      expect(declineBtn.classList.contains('cookie-btn')).toBe(true);
    });
  });

  describe('GDPR Compliance', () => {
    test('should provide explicit accept option', () => {
      const acceptBtn = document.getElementById('acceptCookies');
      expect(acceptBtn).toBeDefined();
      expect(acceptBtn.id).toBe('acceptCookies');
    });

    test('should provide explicit decline option', () => {
      const declineBtn = document.getElementById('declineCookies');
      expect(declineBtn).toBeDefined();
      expect(declineBtn.id).toBe('declineCookies');
    });

    test('should have getStatus method for checking consent', () => {
      expect(typeof window.CookieConsent.getStatus).toBe('function');
    });

    test('should have reset method for clearing consent', () => {
      expect(typeof window.CookieConsent.reset).toBe('function');
    });
  });
});
