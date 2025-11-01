/**
 * Unit Tests for js/certificates.js
 * Tests JavaScript code structure, data integrity, and logic
 */

const fs = require('fs');
const path = require('path');

describe('certificates.js - Unit Tests', () => {
  let certCode;

  beforeAll(() => {
    certCode = fs.readFileSync(path.join(__dirname, '../js/certificates.js'), 'utf8');
  });

  describe('File Structure and Exports', () => {
    test('file exists and is readable', () => {
      expect(certCode).toBeTruthy();
      expect(certCode.length).toBeGreaterThan(5000);
    });

    test('contains certificate data array', () => {
      expect(certCode).toContain('const certificates = [');
    });

    test('contains CertificateModal class definition', () => {
      expect(certCode).toContain('class CertificateModal {');
    });

    test('contains getBasePath function', () => {
      expect(certCode).toContain('const getBasePath = ()');
    });

    test('exports to window object', () => {
      expect(certCode).toContain('window.certificateModal');
      expect(certCode).toContain('window.openCertificateModal');
    });
  });

  describe('Certificate Data Validation', () => {
    test('has exactly 33 certificates', () => {
      const certMatch = certCode.match(/const certificates = \[([\s\S]*?)\];/);
      expect(certMatch).toBeTruthy();

      const certArrayStr = certMatch[1];
      const certCount = (certArrayStr.match(/\{\s*id:/g) || []).length;
      expect(certCount).toBe(33);
    });

    test('all certificates have required properties', () => {
      const certMatch = certCode.match(/const certificates = \[([\s\S]*?)\];/);
      const certArrayStr = certMatch[1];

      const certObjects = certArrayStr.match(/\{[\s\S]*?category:[\s\S]*?\},?/g);
      expect(certObjects).toBeTruthy();
      expect(certObjects.length).toBe(33);

      certObjects.forEach((certStr) => {
        expect(certStr).toContain('id:');
        expect(certStr).toContain('title:');
        expect(certStr).toContain('image:');
        expect(certStr).toContain('thumb:');
        expect(certStr).toContain('category:');
      });
    });

    test('all image paths use relative paths without ../', () => {
      const imageMatches = certCode.match(/image:\s*'([^']+)'/g);
      expect(imageMatches).toBeTruthy();
      expect(imageMatches.length).toBeGreaterThan(30);

      imageMatches.forEach((match) => {
        const imagePath = match.match(/'([^']+)'/)[1];
        expect(imagePath).toMatch(/^images\//);
        expect(imagePath).not.toContain('../');
      });
    });

    test('all thumb paths are in thumbs folder', () => {
      const thumbMatches = certCode.match(/thumb:\s*'([^']+)'/g);
      expect(thumbMatches).toBeTruthy();
      expect(thumbMatches.length).toBe(33);

      thumbMatches.forEach((match) => {
        const thumbPath = match.match(/'([^']+)'/)[1];
        expect(thumbPath).toMatch(/^images\/thumbs\//);
      });
    });

    test('LinkedIn URLs use HTTPS protocol', () => {
      const linkedinMatches = certCode.match(/linkedinUrl:\s*'([^']+)'/g);
      if (linkedinMatches) {
        linkedinMatches.forEach((match) => {
          const url = match.match(/'([^']+)'/)[1];
          expect(url).toMatch(/^https:\/\//);
        });
      }
    });

    test('all categories are from valid list', () => {
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

      const categoryMatches = certCode.match(/category:\s*'([^']+)'/g);
      expect(categoryMatches).toBeTruthy();

      categoryMatches.forEach((match) => {
        const category = match.match(/'([^']+)'/)[1];
        expect(validCategories).toContain(category);
      });
    });
  });

  describe('CertificateModal Class Methods', () => {
    test('has constructor method', () => {
      expect(certCode).toContain('constructor()');
    });

    test('has all required methods', () => {
      const requiredMethods = [
        'init()',
        'createModal()',
        'generateCertificateGrid()',
        'attachEventListeners()',
        'open()',
        'close()',
        'showGrid()',
        'openCertificate(index)',
        'navigate(direction)',
        'updateViewer()',
      ];

      requiredMethods.forEach((method) => {
        expect(certCode).toContain(method);
      });
    });
  });

  describe('Navigation Logic', () => {
    test('uses modulo arithmetic for wrap-around', () => {
      expect(certCode).toContain('% certificates.length');
    });

    test('handles both forward and backward navigation', () => {
      expect(certCode).toContain('+ direction');
    });

    test('prevents negative index with + certificates.length', () => {
      expect(certCode).toContain('+ certificates.length');
    });
  });

  describe('Error Handling', () => {
    test('checks if container exists', () => {
      expect(certCode).toContain('if (!this.container)');
    });

    test('logs error when container missing', () => {
      expect(certCode).toContain("console.error('Certificate modal container not found!')");
    });

    test('has early return on error', () => {
      expect(certCode).toContain('return;');
    });

    test('warns when modal not initialized', () => {
      expect(certCode).toContain("console.warn('Certificate modal not yet initialized')");
    });
  });

  describe('Event Handling', () => {
    test('handles close button click', () => {
      expect(certCode).toContain('.cert-close');
      expect(certCode).toContain('.onclick =');
    });

    test('handles navigation buttons', () => {
      expect(certCode).toContain('.cert-prev');
      expect(certCode).toContain('.cert-next');
    });

    test('implements keyboard navigation', () => {
      expect(certCode).toContain("addEventListener('keydown'");
      expect(certCode).toContain("e.key === 'Escape'");
      expect(certCode).toContain("e.key === 'ArrowLeft'");
      expect(certCode).toContain("e.key === 'ArrowRight'");
    });

    test('closes modal on background click', () => {
      expect(certCode).toContain('e.target === this.container');
    });
  });

  describe('Accessibility', () => {
    test('includes ARIA labels for buttons', () => {
      expect(certCode).toContain('aria-label="Close modal"');
      expect(certCode).toContain('aria-label="Previous certificate"');
      expect(certCode).toContain('aria-label="Next certificate"');
    });

    test('implements lazy loading for images', () => {
      expect(certCode).toContain('loading="lazy"');
    });

    test('uses semantic button elements', () => {
      expect(certCode).toContain('<button');
    });
  });

  describe('UI State Management', () => {
    test('toggles active class for visibility', () => {
      expect(certCode).toContain("classList.add('active')");
      expect(certCode).toContain("classList.remove('active')");
    });

    test('controls body scroll overflow', () => {
      expect(certCode).toContain("document.body.style.overflow = 'hidden'");
      expect(certCode).toContain("document.body.style.overflow = ''");
    });

    test('switches between grid and viewer display', () => {
      expect(certCode).toContain("style.display = 'grid'");
      expect(certCode).toContain("style.display = 'none'");
      expect(certCode).toContain("style.display = 'flex'");
    });
  });

  describe('Code Quality', () => {
    test('uses strict equality (===)', () => {
      const strictCount = (certCode.match(/===/g) || []).length;
      expect(strictCount).toBeGreaterThan(5);
    });

    test('uses const for immutable values', () => {
      expect(certCode).toContain('const certificates');
      expect(certCode).toContain('const getBasePath');
    });

    test('uses template literals for HTML generation', () => {
      expect(certCode).toMatch(/`[\s\S]*?<div/);
    });

    test('includes code documentation comments', () => {
      // JSDoc-style documentation is now used instead of single-line comments
      expect(certCode).toContain('/**');
      expect(certCode).toContain('* @');
    });
  });

  describe('Initialization', () => {
    test('waits for DOMContentLoaded', () => {
      expect(certCode).toContain("addEventListener('DOMContentLoaded'");
    });

    test('creates global window reference', () => {
      expect(certCode).toContain('window.certificateModal = new CertificateModal()');
    });

    test('provides fallback helper function', () => {
      expect(certCode).toContain('window.openCertificateModal = function');
    });

    test('logs initialization messages', () => {
      expect(certCode).toContain('console.log');
    });
  });
});
