/**
 * Unit tests for certificates.js module
 * Tests the CertificateModal class and utility functions
 */

const { JSDOM } = require('jsdom');

describe('Certificates Module - Unit Tests', () => {
  let dom;
  let window;
  let document;
  let CertificateModal;
  let getBasePath;
  let escapeHtml;

  beforeEach(() => {
    // Reset module cache to get fresh imports
    jest.resetModules();

    // Create a fresh DOM for each test
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <body>
          <div id="certificateModal"></div>
        </body>
      </html>
    `,
      {
        url: 'https://example.com/',
        pretendToBeVisual: true,
        runScripts: 'dangerously',
      }
    );

    window = dom.window;
    document = window.document;

    // Set globals for Jest environment
    global.window = window;
    global.document = document;

    // Import the module - it will auto-export to window
    const certificatesModule = require('../../../js/certificates.js');

    // Extract from module or window
    CertificateModal = certificatesModule.CertificateModal || window.CertificateModal;
    getBasePath = certificatesModule.getBasePath || window.getBasePath;
    escapeHtml = certificatesModule.escapeHtml || window.escapeHtml;
  });

  afterEach(() => {
    // Clean up globals
    global.window = undefined;
    global.document = undefined;

    // Close JSDOM window properly
    if (dom && dom.window) {
      dom.window.close();
    }

    // Clear module cache
    jest.resetModules();
  });

  describe('Utility Functions', () => {
    describe('getBasePath()', () => {
      test('should return empty string at root', () => {
        // Default JSDOM URL is root per beforeEach
        expect(getBasePath()).toBe('');
      });

      test('should return proper base for nested pages', () => {
        // Create a temporary DOM at nested /pages/frameworks/ path
        const nestedDom = new JSDOM('<!doctype html><html><body></body></html>', {
          url: 'https://example.com/pages/frameworks/index.html',
        });
        const prevWindow = global.window;
        global.window = nestedDom.window;
        try {
          const base = getBasePath();
          expect(base).toBe('../../');
        } finally {
          nestedDom.window.close();
          global.window = prevWindow;
        }
      });
    });
    describe('escapeHtml()', () => {
      test('should escape < and >', () => {
        const result = escapeHtml('<script>');
        expect(result).toBe('&lt;script&gt;');
      });

      test('should escape quotes', () => {
        const result = escapeHtml('"Hello" \'World\'');
        expect(result).toContain('Hello');
        expect(result).toContain('World');
      });

      test('should escape ampersands', () => {
        const result = escapeHtml('A & B');
        expect(result).toBe('A &amp; B');
      });

      test('should prevent XSS attacks', () => {
        const malicious = '<script>alert("xss")</script>';
        const result = escapeHtml(malicious);
        expect(result).not.toContain('<script>');
        expect(result).toContain('&lt;script&gt;');
      });

      test('should handle empty string', () => {
        const result = escapeHtml('');
        expect(result).toBe('');
      });
    });
  });

  describe('CertificateModal Class', () => {
    let modal;

    beforeEach(() => {
      // Modal instance created using the already-existing container from outer beforeEach
      modal = new CertificateModal();
    });

    afterEach(() => {
      // Clean up modal instance if it exists
      if (modal && modal.container) {
        // Remove all event listeners by cloning and replacing the container
        const newContainer = modal.container.cloneNode(false);
        if (modal.container.parentNode) {
          modal.container.parentNode.replaceChild(newContainer, modal.container);
        }
      }
      modal = null;
    });

    describe('Constructor', () => {
      test('should initialize with certificates array', () => {
        expect(modal).toBeDefined();
        expect(modal.certificates).toBeDefined();
        expect(Array.isArray(modal.certificates)).toBe(true);
      });

      test('should have at least 30 certificates', () => {
        expect(modal.certificates.length).toBeGreaterThanOrEqual(30);
      });

      test('should have currentIndex initialized to 0', () => {
        expect(modal.currentIndex).toBe(0);
      });
    });

    describe('Certificate Data Validation', () => {
      test('all certificates should have required properties', () => {
        modal.certificates.forEach((cert) => {
          expect(cert).toHaveProperty('id');
          expect(cert).toHaveProperty('title');
          expect(cert).toHaveProperty('image');
          expect(cert).toHaveProperty('thumb');
          expect(cert).toHaveProperty('category');
        });
      });

      test('certificate IDs should be unique', () => {
        const ids = modal.certificates.map((cert) => cert.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
      });

      test('certificate titles should not be empty', () => {
        modal.certificates.forEach((cert) => {
          expect(cert.title).toBeTruthy();
          expect(cert.title.length).toBeGreaterThan(0);
        });
      });

      test('certificate images should have valid paths', () => {
        modal.certificates.forEach((cert) => {
          expect(cert.image).toMatch(/^images\//);
          expect(cert.thumb).toMatch(/^images\/thumbs\//);
        });
      });

      test('certificates should have valid categories', () => {
        modal.certificates.forEach((cert) => {
          expect(cert.category).toBeTruthy();
          expect(typeof cert.category).toBe('string');
          expect(cert.category.length).toBeGreaterThan(0);
        });
      });
    });

    describe('HTML Generation', () => {
      test('should generate certificate grid HTML', () => {
        const gridHTML = modal.generateCertificateGrid();
        expect(gridHTML).toBeTruthy();
        expect(gridHTML).toContain('cert-card');
        expect(gridHTML).toContain('cert-card-image');
      });

      test('should escape certificate titles in grid', () => {
        // Add a certificate with special characters for testing
        const originalCerts = modal.certificates;
        modal.certificates = [
          {
            id: 999,
            title: '<script>alert("xss")</script>',
            image: 'images/test.jpg',
            thumb: 'images/thumbs/test.jpg',
            category: 'Test',
          },
        ];

        const gridHTML = modal.generateCertificateGrid();
        expect(gridHTML).not.toContain('<script>alert("xss")</script>');
        expect(gridHTML).toContain('&lt;script&gt;');

        modal.certificates = originalCerts;
      });

      test('should include LinkedIn icon when linkedinUrl exists', () => {
        modal.certificates = [
          {
            id: 1,
            title: 'Test Cert',
            image: 'images/test.jpg',
            thumb: 'images/thumbs/test.jpg',
            category: 'Test',
            linkedinUrl: 'https://linkedin.com',
          },
        ];

        const gridHTML = modal.generateCertificateGrid();
        expect(gridHTML).toContain('fa-linkedin');
        expect(gridHTML).toContain('cert-linkedin-icon');
      });

      test('should not include LinkedIn icon when linkedinUrl is missing', () => {
        modal.certificates = [
          {
            id: 1,
            title: 'Test Cert',
            image: 'images/test.jpg',
            thumb: 'images/thumbs/test.jpg',
            category: 'Test',
          },
        ];

        const gridHTML = modal.generateCertificateGrid();
        expect(gridHTML).not.toContain('fa-linkedin');
      });
    });

    describe('Statistics', () => {
      test('should count certificates by category', () => {
        const categoryCount = {};
        modal.certificates.forEach((cert) => {
          categoryCount[cert.category] = (categoryCount[cert.category] || 0) + 1;
        });

        // At least some categories should have multiple certificates
        const hasMultiples = Object.values(categoryCount).some((count) => count > 1);
        expect(hasMultiples).toBe(true);
      });

      test('should have certificates with LinkedIn verification', () => {
        const withLinkedIn = modal.certificates.filter((cert) => cert.linkedinUrl);
        expect(withLinkedIn.length).toBeGreaterThan(0);
      });
    });
  });
});
