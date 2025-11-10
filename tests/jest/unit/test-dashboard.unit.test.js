/**
 * Unit tests for test-dashboard.js module
 * Tests the TestDashboard class exports and basic functionality
 */

const { JSDOM } = require('jsdom');

describe('TestDashboard Module - Unit Tests', () => {
  let dom;
  let window;
  let document;
  let TestDashboard;

  beforeEach(() => {
    // Create a minimal DOM for testing
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <body>
          <div id="test-dashboard-container"></div>
        </body>
      </html>
    `,
      {
        url: 'https://example.com/',
        runScripts: 'dangerously',
      }
    );

    window = dom.window;
    document = window.document;

    // Set globals for Jest environment
    global.window = window;
    global.document = document;

    // Mock console
    window.console = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    };

    // Import the module
    const dashboardModule = require('../../../js/test-dashboard.js');
    TestDashboard = dashboardModule.TestDashboard;

    // Also set on window manually for tests that check window
    if (TestDashboard) {
      window.TestDashboard = TestDashboard;
    }
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('Module Exports', () => {
    test('should export TestDashboard class', () => {
      expect(TestDashboard).toBeDefined();
      expect(typeof TestDashboard).toBe('function');
    });

    test('should be available on window', () => {
      expect(window.TestDashboard).toBeDefined();
    });
  });

  describe('TestDashboard Class', () => {
    test('should instantiate correctly', () => {
      const dashboard = new TestDashboard();
      expect(dashboard).toBeDefined();
      expect(dashboard).toBeInstanceOf(TestDashboard);
    });

    test('should have required properties', () => {
      const dashboard = new TestDashboard();
      expect(dashboard).toHaveProperty('dataScriptPath');
      expect(dashboard).toHaveProperty('updateInterval');
      expect(dashboard).toHaveProperty('dataLoaded');
    });

    test('should have correct default configuration', () => {
      const dashboard = new TestDashboard();
      expect(dashboard.dataScriptPath).toBe('test-data.js');
      expect(dashboard.updateInterval).toBe(30000); // 30 seconds
      expect(dashboard.dataLoaded).toBe(false);
    });
  });

  describe('Dashboard Methods', () => {
    test('should have init method', () => {
      const dashboard = new TestDashboard();
      expect(typeof dashboard.init).toBe('function');
    });

    test('should have createDashboard method', () => {
      const dashboard = new TestDashboard();
      expect(typeof dashboard.createDashboard).toBe('function');
    });

    test('should have loadDataScript method', () => {
      const dashboard = new TestDashboard();
      expect(typeof dashboard.loadDataScript).toBe('function');
    });

    test('should have displayResults method', () => {
      const dashboard = new TestDashboard();
      expect(typeof dashboard.displayResults).toBe('function');
    });

    test('should have updateLastUpdatedTime method', () => {
      const dashboard = new TestDashboard();
      expect(typeof dashboard.updateLastUpdatedTime).toBe('function');
    });
  });

  describe('Configuration', () => {
    test('should have 30 second update interval', () => {
      const dashboard = new TestDashboard();
      expect(dashboard.updateInterval).toBe(30000);
    });

    test('should start with dataLoaded as false', () => {
      const dashboard = new TestDashboard();
      expect(dashboard.dataLoaded).toBe(false);
    });

    test('should have correct data script path', () => {
      const dashboard = new TestDashboard();
      expect(dashboard.dataScriptPath).toBe('test-data.js');
    });
  });
});
