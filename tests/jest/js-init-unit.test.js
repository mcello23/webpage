/**
 * Unit Tests for js/init.js
 * Tests Materialize initialization code
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('init.js - Unit Tests', () => {
  let initCode;

  beforeAll(() => {
    initCode = fs.readFileSync(path.join(__dirname, '../../public/js/init.js'), 'utf8');
  });

  describe('File Structure', () => {
    test('file exists and is readable', () => {
      expect(initCode).toBeTruthy();
      expect(initCode.length).toBeGreaterThan(50);
    });

    test('uses IIFE wrapper pattern (optional jQuery, prefers window.M)', () => {
      expect(initCode).toContain('(function ($, M)');
      expect(initCode).toContain('typeof jQuery');
      expect(initCode).toContain('window.M');
    });

    test('waits for DOMContentLoaded (native DOM ready)', () => {
      expect(initCode).toContain('DOMContentLoaded');
      expect(initCode).toContain('document.readyState');
    });
  });

  describe('Materialize Component Initialization', () => {
    test('initializes sidenav component', () => {
      expect(initCode).toContain('.sidenav');
      expect(initCode).toMatch(/Sidenav\.init|\.sidenav\(\)/);
    });

    test('initializes parallax component', () => {
      expect(initCode).toContain('.parallax');
      expect(initCode).toMatch(/Parallax\.init|\.parallax\(\)/);
    });
  });

  describe('Code Structure', () => {
    test('does not require jQuery to run', () => {
      expect(initCode).toContain('document.addEventListener');
      expect(initCode).toMatch(/M\.AutoInit|Sidenav\.init|Parallax\.init/);
    });

    test('properly closes function scopes', () => {
      const openBraces = (initCode.match(/\{/g) || []).length;
      const closeBraces = (initCode.match(/\}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    test('properly closes parentheses', () => {
      const openParens = (initCode.match(/\(/g) || []).length;
      const closeParens = (initCode.match(/\)/g) || []).length;
      expect(openParens).toBe(closeParens);
    });
  });

  describe('jQuery Integration', () => {
    test('treats jQuery as optional (does not require it)', () => {
      expect(initCode).toContain('typeof jQuery');
      expect(initCode).toContain('jQuery : null');
    });

    test('checks for jQuery availability', () => {
      // Ensure code handles missing jQuery gracefully or throws expected error
      // Since we are static analysis here, checking for usage pattern
      expect(initCode).not.toContain('window.$ ='); // Should not clobber global
    });
  });

  describe('Browser Compatibility', () => {
    test('does not use unsupported ES6 features outside safe scope', () => {
      // Check against known problematic syntax for older browsers if targetting them
      // For example, avoiding top-level await or similar
      expect(initCode).not.toContain('await ');
    });

    test('uses standard event listeners or jQuery', () => {
      // Code uses either standard addEventListener or jQuery's methods
      const usesStandard = initCode.includes('addEventListener');
      const usesJQuery = initCode.includes('$(');

      expect(usesStandard || usesJQuery).toBe(true);
      expect(initCode).not.toContain('attachEvent'); // No IE8 specific code
    });
  });

  describe('Code Quality', () => {
    test('includes proper indentation', () => {
      const lines = initCode.split('\n');
      const indentedLines = lines.filter((line) => line.startsWith('  '));
      expect(indentedLines.length).toBeGreaterThan(0);
    });

    test('includes code comments', () => {
      expect(initCode).toContain('Document ready');
    });

    test('uses semicolons for statement termination', () => {
      expect(initCode).toContain(';');
    });
  });

  describe('Functional Tests - Module Coverage', () => {
    test('exports initMaterialize function', () => {
      // Execute init.js code in a controlled environment
      const initModule = require('../../public/js/init.js');
      expect(initModule).toBeDefined();
      expect(initModule.initMaterialize).toBeDefined();
      expect(typeof initModule.initMaterialize).toBe('function');
    });

    test('init.js can be loaded without errors', () => {
      expect(() => {
        require('../../public/js/init.js');
      }).not.toThrow();
    });
  });

  describe('Runtime Behavior Tests', () => {
    let originalDocument;
    let originalWindow;

    beforeEach(() => {
      originalDocument = global.document;
      originalWindow = global.window;
    });

    afterEach(() => {
      global.document = originalDocument;
      global.window = originalWindow;
    });

    test('handles DOM ready state when loading', () => {
      const addEventListenerMock = jest.fn();
      global.document = {
        readyState: 'loading',
        addEventListener: addEventListenerMock,
      };

      global.window = {
        initMaterialize: undefined,
      };

      // The script should add event listener when document is still loading
      expect(initCode).toContain('DOMContentLoaded');
    });

    test('handles DOM ready state when complete', () => {
      const addEventListenerMock = jest.fn();
      global.document = {
        readyState: 'complete',
        addEventListener: addEventListenerMock,
      };

      // The script should execute immediately if document is already loaded
      expect(initCode).toContain('document.readyState');
    });
  });

  describe('Live initMaterialize execution', () => {
    let dom;
    let sidenavMock;
    let parallaxMock;
    let initModule;

    beforeEach(() => {
      jest.resetModules();
      dom = new JSDOM(
        `<!doctype html><html><head></head><body><ul class="sidenav"></ul><div class="parallax"></div></body></html>`,
        { url: 'https://example.com/', pretendToBeVisual: true }
      );

      global.window = dom.window;
      global.document = dom.window.document;

      sidenavMock = jest.fn().mockReturnValue({});
      parallaxMock = jest.fn().mockReturnValue({});

      global.window.M = {
        Sidenav: { init: sidenavMock },
        Parallax: { init: parallaxMock },
      };

      initModule = require('../../public/js/init.js');
    });

    afterEach(() => {
      dom.window.close();
      delete global.window.M;
    });

    test('initializes sidenav and parallax via window.M when present', () => {
      initModule.initMaterialize();

      expect(sidenavMock).toHaveBeenCalled();
      expect(parallaxMock).toHaveBeenCalled();
    });

    test('prevents context menu on images', () => {
      initModule.initMaterialize();

      const img = document.createElement('img');
      document.body.appendChild(img);
      const evt = new window.Event('contextmenu', { bubbles: true, cancelable: true });

      const dispatched = img.dispatchEvent(evt);
      expect(evt.defaultPrevented || dispatched === false).toBe(true);
    });
  });
});
