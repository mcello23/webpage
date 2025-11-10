/**
 * Unit tests for init.js module
 * Tests initialization and mobile menu functionality
 */

const { JSDOM } = require('jsdom');

describe('Init Module - Unit Tests', () => {
  let dom;
  let window;
  let document;
  let initMaterialize;

  beforeEach(() => {
    // Create a fresh DOM for each test
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head></head>
        <body>
          <ul class="sidenav"></ul>
          <div class="parallax"></div>
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

    // Mock jQuery for init.js BEFORE loading the module
    const sidenavMock = jest.fn().mockReturnValue({});
    const parallaxMock = jest.fn().mockReturnValue({});

    const mockjQuery = function () {
      return {
        sidenav: sidenavMock,
        parallax: parallaxMock,
      };
    };

    // Mock jQuery at global level before require
    global.jQuery = mockjQuery;
    global.$ = mockjQuery;
    window.jQuery = mockjQuery;
    window.$ = mockjQuery;

    // Mock console
    window.console = {
      log: jest.fn(),
      error: jest.fn(),
    };

    // Import the module (jQuery must be mocked first)
    jest.resetModules(); // Clear module cache
    const initModule = require('../../../js/init.js');
    initMaterialize = initModule.initMaterialize || window.initMaterialize;
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('Initialization Function', () => {
    test('should export initMaterialize function', () => {
      expect(initMaterialize).toBeDefined();
      expect(typeof initMaterialize).toBe('function');
    });

    test('should handle missing jQuery gracefully', () => {
      window.jQuery = null;
      window.$ = null;

      // Should not throw
      expect(() => {
        if (initMaterialize) initMaterialize();
      }).not.toThrow();
    });

    test('should be available on window', () => {
      expect(window.initMaterialize).toBeDefined();
    });
  });
});
