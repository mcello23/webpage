/**
 * Tests for JSDoc Documentation, XSS Protection, and Lazy Loading
 * Validates code documentation quality, security measures, and performance optimizations
 */

const fs = require('fs');
const path = require('path');

describe('Code Documentation and Security Enhancements', () => {
  describe('Certificate Gallery - JSDoc Documentation Quality', () => {
    let certCode;

    beforeAll(() => {
      certCode = fs.readFileSync(path.join(__dirname, '../../js/certificates.js'), 'utf8');
    });

    test('has file-level JSDoc documentation', () => {
      expect(certCode).toContain('@fileoverview');
      expect(certCode).toContain('@author');
      expect(certCode).toContain('@version');
    });

    test('defines Certificate typedef', () => {
      expect(certCode).toContain('@typedef {Object} Certificate');
      expect(certCode).toContain('@property {number} id');
      expect(certCode).toContain('@property {string} title');
      expect(certCode).toContain('@property {string} image');
      expect(certCode).toContain('@property {string} thumb');
    });

    test('getBasePath has JSDoc with examples', () => {
      expect(certCode).toContain('@returns {string} Base path');
      expect(certCode).toContain('@example');
      expect(certCode).toMatch(/getBasePath\(\);.*returns ''/);
      expect(certCode).toMatch(/getBasePath\(\);.*returns '\.\.\/\.\.\/'|returns '\.\.\/'/);
    });

    test('escapeHtml has JSDoc with security note', () => {
      expect(certCode).toContain('Escapes HTML special characters to prevent XSS');
      expect(certCode).toContain('@param {string} text');
      expect(certCode).toContain('@returns {string}');
      expect(certCode).toContain('@example');
    });

    test('certificates array has JSDoc', () => {
      expect(certCode).toContain('@type {Certificate[]}');
      expect(certCode).toContain('@constant');
    });

    test('CertificateModal class has JSDoc', () => {
      expect(certCode).toContain('@class CertificateModal');
      expect(certCode).toContain('@constructor');
    });

    test('constructor has parameter documentation', () => {
      expect(certCode).toContain('@throws {Error}');
      expect(certCode).toContain('@private');
    });

    test('all major methods have JSDoc', () => {
      const methods = [
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

      methods.forEach((method) => {
        // Find method definition and check for JSDoc above it
        const methodPattern = new RegExp(`\\/\\*\\*[\\s\\S]*?${method.replace(/[()]/g, '\\$&')}`);
        expect(certCode).toMatch(methodPattern);
      });
    });

    test('key public methods marked with @public', () => {
      // Check at least some methods are marked as public
      const publicCount = (certCode.match(/@public/g) || []).length;

      // Should have 5 public methods marked
      expect(publicCount).toBeGreaterThanOrEqual(5);
    });

    test('methods have clear visibility documentation', () => {
      // Verify that JSDoc includes visibility indicators (@public or @private)
      const publicCount = (certCode.match(/@public/g) || []).length;
      const privateCount = (certCode.match(/@private/g) || []).length;

      // Should have both public and private methods documented
      expect(publicCount).toBeGreaterThan(0);
      expect(privateCount).toBeGreaterThan(0);
    });

    test('methods with parameters have @param documentation', () => {
      expect(certCode).toContain('@param {number} index');
      expect(certCode).toContain('@param {number} direction');
      expect(certCode).toContain('@param {string} text');
    });

    test('methods have @returns documentation', () => {
      const returnsCount = (certCode.match(/@returns/g) || []).length;
      expect(returnsCount).toBeGreaterThan(10);
    });

    test('complex methods have @example sections', () => {
      expect(certCode).toContain('@example');
      const exampleCount = (certCode.match(/@example/g) || []).length;
      expect(exampleCount).toBeGreaterThan(3);
    });
  });

  describe('Materialize Initialization - JSDoc Documentation Quality', () => {
    let initCode;

    beforeAll(() => {
      initCode = fs.readFileSync(path.join(__dirname, '../../js/init.js'), 'utf8');
    });

    test('has file-level JSDoc documentation', () => {
      expect(initCode).toContain('@fileoverview');
      expect(initCode).toContain('@author');
      expect(initCode).toContain('@version');
    });

    test('documents jQuery dependency', () => {
      expect(initCode).toContain('@requires jquery');
      expect(initCode).toContain('@requires materialize-css');
    });

    test('IIFE has JSDoc', () => {
      expect(initCode).toContain('IIFE');
      expect(initCode).toContain('@param {jQuery} $');
    });

    test('document ready function has JSDoc', () => {
      expect(initCode).toContain('@function');
      expect(initCode).toContain('@name documentReady');
    });

    test('component initializations have comments', () => {
      expect(initCode).toContain('Initialize Materialize sidenav');
      expect(initCode).toContain('Initialize Materialize parallax');
    });

    test('includes links to Materialize documentation', () => {
      expect(initCode).toContain('@see {@link https://materializecss.com/sidenav.html}');
      expect(initCode).toContain('@see {@link https://materializecss.com/parallax.html}');
    });
  });

  describe('XSS Attack Prevention and Input Sanitization', () => {
    let certCode;

    beforeAll(() => {
      certCode = fs.readFileSync(path.join(__dirname, '../../js/certificates.js'), 'utf8');
    });

    test('escapeHtml function is defined', () => {
      expect(certCode).toContain('const escapeHtml = (text) =>');
    });

    test('uses createElement for safe escaping', () => {
      expect(certCode).toContain("document.createElement('div')");
      expect(certCode).toContain('div.textContent = text');
      expect(certCode).toContain('return div.innerHTML');
    });

    test('escapeHtml is used in generateCertificateGrid', () => {
      const gridMethodMatch = certCode.match(
        /generateCertificateGrid\(\)[^}]+\{[\s\S]*?return[\s\S]*?\.join/
      );
      expect(gridMethodMatch).toBeTruthy();

      const gridMethod = gridMethodMatch[0];
      expect(gridMethod).toContain('escapeHtml(cert.thumb)');
      expect(gridMethod).toContain('escapeHtml(cert.title)');
      expect(gridMethod).toContain('escapeHtml(cert.category)');
    });

    test('alt attributes use escapeHtml', () => {
      expect(certCode).toContain('alt="${escapeHtml(');
    });

    test('updateViewer uses textContent for XSS safety', () => {
      const updateViewerMatch = certCode.match(/updateViewer\(\)[^}]+\{[\s\S]*?\n  \}/);
      expect(updateViewerMatch).toBeTruthy();

      const updateViewer = updateViewerMatch[0];
      expect(updateViewer).toContain('.textContent = cert.title');
      expect(updateViewer).toContain('.textContent = cert.category');
      expect(updateViewer).toContain('XSS-safe');
    });

    test('does not use innerHTML for user content', () => {
      const updateViewerSection = certCode.substring(
        certCode.indexOf('updateViewer()'),
        certCode.indexOf('updateViewer()') + 1000
      );

      // Should not directly set innerHTML with cert data
      expect(updateViewerSection).not.toContain('innerHTML = cert.title');
      expect(updateViewerSection).not.toContain('innerHTML = cert.category');
    });
  });

  describe('Image Performance Optimization - Lazy Loading', () => {
    let certCode;

    beforeAll(() => {
      certCode = fs.readFileSync(path.join(__dirname, '../../js/certificates.js'), 'utf8');
    });

    test('thumbnail images have loading="lazy" attribute', () => {
      expect(certCode).toContain('loading="lazy"');
      const lazyMatches = certCode.match(/loading="lazy"/g);
      expect(lazyMatches.length).toBeGreaterThan(1);
    });

    test('images have decoding="async" for performance', () => {
      expect(certCode).toContain('decoding="async"');
    });

    test('grid images have both lazy loading and async decoding', () => {
      const gridImagePattern = /loading="lazy" decoding="async"/;
      expect(certCode).toMatch(gridImagePattern);
    });

    test('main viewer image has lazy loading', () => {
      const viewerImageMatch = certCode.match(/id="certImage"[^>]+>/);
      expect(viewerImageMatch).toBeTruthy();
      expect(viewerImageMatch[0]).toContain('loading="lazy"');
    });

    test('main viewer image has async decoding', () => {
      const viewerImageMatch = certCode.match(/id="certImage"[^>]+>/);
      expect(viewerImageMatch).toBeTruthy();
      expect(viewerImageMatch[0]).toContain('decoding="async"');
    });

    test('all img tags use performance attributes', () => {
      const imgTags = certCode.match(/<img[^>]+>/g) || [];

      imgTags.forEach((imgTag) => {
        // Every img should have either loading="lazy" or be the placeholder
        if (!imgTag.includes('src=""')) {
          expect(
            imgTag.includes('loading="lazy"') || imgTag.includes('loading=') // Allow other loading strategies
          ).toBe(true);
        }
      });
    });
  });

  describe('Code Quality Standards and Best Practices', () => {
    let certCode;

    beforeAll(() => {
      certCode = fs.readFileSync(path.join(__dirname, '../../js/certificates.js'), 'utf8');
    });

    test('consistent JSDoc formatting', () => {
      const jsdocBlocks = certCode.match(/\/\*\*[\s\S]*?\*\//g) || [];
      expect(jsdocBlocks.length).toBeGreaterThan(15);

      jsdocBlocks.forEach((block) => {
        // Each block should have proper star alignment
        expect(block).toMatch(/\*\s/);
      });
    });

    test('no TODO or FIXME comments', () => {
      expect(certCode).not.toContain('TODO');
      expect(certCode).not.toContain('FIXME');
    });

    test('security comments are present', () => {
      expect(certCode).toContain('XSS');
      expect(certCode).toContain('prevent');
    });

    test('performance comments are present', () => {
      expect(certCode).toContain('lazy');
      expect(certCode).toContain('performance');
    });
  });

  describe('Overall Documentation Coverage and Completeness', () => {
    test('all JavaScript files have JSDoc', () => {
      const certCode = fs.readFileSync(path.join(__dirname, '../../js/certificates.js'), 'utf8');
      const initCode = fs.readFileSync(path.join(__dirname, '../../js/init.js'), 'utf8');

      expect(certCode).toContain('@fileoverview');
      expect(initCode).toContain('@fileoverview');
    });

    test('documentation is comprehensive', () => {
      const certCode = fs.readFileSync(path.join(__dirname, '../../js/certificates.js'), 'utf8');

      // Count JSDoc blocks
      const jsdocBlocks = (certCode.match(/\/\*\*[\s\S]*?\*\//g) || []).length;
      expect(jsdocBlocks).toBeGreaterThan(15);

      // Count documented parameters
      const paramCount = (certCode.match(/@param/g) || []).length;
      expect(paramCount).toBeGreaterThan(1);

      // Count return types
      const returnsCount = (certCode.match(/@returns/g) || []).length;
      expect(returnsCount).toBeGreaterThan(10);

      // Count examples
      const examplesCount = (certCode.match(/@example/g) || []).length;
      expect(examplesCount).toBeGreaterThan(3);
    });
  });
});
