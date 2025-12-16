/**
 * @jest-environment jsdom
 */

/**
 * Functional Tests for certificates.js - Module Exports
 * Tests actual code execution using exported module functions
 */

describe('certificates.js - Module Exports', () => {
  let certificatesModule;

  beforeEach(() => {
    // Reset URL before requiring the module using history API
    window.history.pushState({}, '', '/');

    // Reset module cache to get fresh instance
    jest.resetModules();
    certificatesModule = require('../../public/js/certificates.js');
  });

  describe('getBasePath function', () => {
    test('exports getBasePath function', () => {
      expect(certificatesModule.getBasePath).toBeDefined();
      expect(typeof certificatesModule.getBasePath).toBe('function');
    });

    test('returns empty string for root path', () => {
      window.history.pushState({}, '', '/');
      const result = certificatesModule.getBasePath();
      expect(result).toBe('');
    });

    test('returns ../../ for /pages/something/ path (matches deep regex)', () => {
      window.history.pushState({}, '', '/pages/something/');
      const result = certificatesModule.getBasePath();
      expect(result).toBe('../../');
    });

    test('returns ../../ for nested /pages/folder/ path', () => {
      window.history.pushState({}, '', '/pages/frameworks/index.html');
      const result = certificatesModule.getBasePath();
      expect(result).toBe('../../');
    });

    test('returns ../ for /pages/ root listing', () => {
      window.history.pushState({}, '', '/pages/');
      const result = certificatesModule.getBasePath();
      expect(result).toBe('../');
    });

    test('handles root path with index.html', () => {
      window.history.pushState({}, '', '/index.html');
      const result = certificatesModule.getBasePath();
      expect(result).toBe('');
    });
  });

  describe('escapeHtml function', () => {
    test('exports escapeHtml function', () => {
      expect(certificatesModule.escapeHtml).toBeDefined();
      expect(typeof certificatesModule.escapeHtml).toBe('function');
    });

    test('escapes < and > characters', () => {
      const result = certificatesModule.escapeHtml('<script>');
      expect(result).toBe('&lt;script&gt;');
    });

    test('escapes complete script tag', () => {
      const result = certificatesModule.escapeHtml('<script>alert("xss")</script>');
      expect(result).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
    });

    test('escapes ampersands', () => {
      const result = certificatesModule.escapeHtml('Test & Demo');
      expect(result).toContain('&amp;');
    });

    test('escapes quotes via textContent semantics', () => {
      const result = certificatesModule.escapeHtml('Test "quotes"');
      // jsdom/textContent leaves quotes intact when encoded via innerHTML of a div
      expect(result).toBe('Test "quotes"');
    });

    test('handles empty string', () => {
      const result = certificatesModule.escapeHtml('');
      expect(result).toBe('');
    });

    test('handles regular text without special chars', () => {
      const result = certificatesModule.escapeHtml('Hello World 123');
      expect(result).toBe('Hello World 123');
    });

    test('handles multiple special characters', () => {
      const result = certificatesModule.escapeHtml(
        '<div class="test" data-value=\'test\'>&copy;</div>'
      );
      expect(result).toContain('&lt;');
      expect(result).toContain('&gt;');
      // single quotes remain as-is with textContent; double quotes stay literal
      expect(result).toContain('"test"');
    });
  });

  describe('certificates data', () => {
    test('exports certificates array', () => {
      expect(certificatesModule.certificates).toBeDefined();
      expect(Array.isArray(certificatesModule.certificates)).toBe(true);
    });

    test('has exactly 35 certificates', () => {
      expect(certificatesModule.certificates.length).toBe(35);
    });

    test('all certificates have required properties', () => {
      certificatesModule.certificates.forEach((cert) => {
        expect(cert).toHaveProperty('id');
        expect(cert).toHaveProperty('title');
        expect(cert).toHaveProperty('image');
        expect(cert).toHaveProperty('thumb');
        expect(cert).toHaveProperty('category');

        // Verify properties are not empty
        expect(cert.title).toBeTruthy();
        expect(cert.image).toBeTruthy();
        expect(cert.thumb).toBeTruthy();
        expect(cert.category).toBeTruthy();
      });
    });

    test('certificate IDs are sequential from 1 to 35', () => {
      certificatesModule.certificates.forEach((cert, index) => {
        expect(cert.id).toBe(index + 1);
      });
    });

    test('all image paths start with images/', () => {
      certificatesModule.certificates.forEach((cert) => {
        expect(cert.image).toMatch(/^images\//);
        expect(cert.thumb).toMatch(/^images\/thumbs\//);
      });
    });

    test('all certificates have valid categories', () => {
      const validCategories = [
        'Security',
        'Professional Development',
        'Automation',
        'Cloud',
        'DevOps',
        'Development',
        'Testing',
        'Soft Skills',
        'Methodology',
        'Web Development',
        'API Testing',
        'Programming',
        'Development Tools',
      ];

      certificatesModule.certificates.forEach((cert) => {
        expect(validCategories).toContain(cert.category);
      });
    });

    test('LinkedURL URLs use HTTPS when present', () => {
      certificatesModule.certificates.forEach((cert) => {
        if (cert.linkedinUrl) {
          expect(cert.linkedinUrl).toMatch(/^https:\/\//);
        }
      });
    });
  });

  describe('CertificateModal class', () => {
    test('exports CertificateModal class', () => {
      expect(certificatesModule.CertificateModal).toBeDefined();
      expect(typeof certificatesModule.CertificateModal).toBe('function');
    });

    test('can instantiate CertificateModal', () => {
      const { CertificateModal } = certificatesModule;
      expect(() => new CertificateModal()).not.toThrow();
    });

    test('CertificateModal has expected methods', () => {
      const { CertificateModal } = certificatesModule;
      const modal = new CertificateModal();

      expect(typeof modal.init).toBe('function');
      expect(typeof modal.open).toBe('function');
      expect(typeof modal.close).toBe('function');
      expect(typeof modal.showGrid).toBe('function');
      expect(typeof modal.openCertificate).toBe('function');
      expect(typeof modal.navigate).toBe('function');
    });

    test('CertificateModal initializes currentIndex to 0', () => {
      const { CertificateModal } = certificatesModule;
      const modal = new CertificateModal();
      // constructor sets currentIndex = 0
      expect(modal.currentIndex).toBe(0);
    });
  });
});
