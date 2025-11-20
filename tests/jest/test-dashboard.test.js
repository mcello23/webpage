/**
 * Unit tests for test-dashboard.js module
 * Tests the TestDashboard class functionality
 */

const { JSDOM } = require('jsdom');

describe('TestDashboard Module - Unit Tests', () => {
  let dom;
  let window;
  let document;
  let TestDashboard;
  let dashboardInstances = []; // Track all dashboard instances for cleanup

  beforeEach(() => {
    dashboardInstances = []; // Reset for each test

    // Create a fresh DOM for each test
    dom = new JSDOM(
      `
      <!DOCTYPE html>
      <html>
        <head></head>
        <body>
          <div id="test-dashboard-container"></div>
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

    // Mock console
    window.console = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    };

    // Mock test data
    window.TEST_RESULTS = {
      jest: {
        success: true,
        numTotalTests: 989,
        numPassedTests: 989,
        numFailedTests: 0,
        numTotalTestSuites: 20,
        numPassedTestSuites: 20,
        passRate: 100.0,
        avgDuration: 3500000,
        testSuites: [
          {
            name: 'test1.js',
            status: 'passed',
            numTests: 50,
            numPassedTests: 50,
            numFailedTests: 0,
            duration: 1500,
          },
        ],
      },
      k6: {
        metrics: {
          http_reqs: { count: 300, rate: 10.5 },
          http_req_duration: {
            avg: 4.5,
            min: 2.0,
            med: 3.5,
            max: 45.0,
            'p(90)': 5.0,
            'p(95)': 8.5,
          },
          checks: { passes: 300, fails: 0 },
        },
        root_group: {
          checks: [
            { name: 'status 200', passes: 300, fails: 0 },
            { name: 'has content', passes: 300, fails: 0 },
          ],
        },
      },
      coverage: {
        lines: { pct: 75.5 },
      },
      metadata: {
        branch: 'main',
        commit: 'abc1234',
        timestamp: '2025-11-10T10:00:00Z',
      },
    };

    // Import the module
    const dashboardModule = require('../../js/test-dashboard.js');
    TestDashboard = dashboardModule.TestDashboard || window.TestDashboard;

    // Wrap TestDashboard constructor to track instances
    const OriginalTestDashboard = TestDashboard;
    TestDashboard = function (...args) {
      const instance = new OriginalTestDashboard(...args);
      dashboardInstances.push(instance);
      return instance;
    };
    TestDashboard.prototype = OriginalTestDashboard.prototype;
  });

  afterEach(() => {
    // Destroy all dashboard instances to clear intervals
    dashboardInstances.forEach((dashboard) => {
      if (dashboard && typeof dashboard.destroy === 'function') {
        dashboard.destroy();
      }
    });
    dashboardInstances = [];

    // Clear all remaining intervals/timeouts
    const highestId = setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
      clearInterval(i);
      clearTimeout(i);
    }

    // Clean up globals
    global.window = undefined;
    global.document = undefined;

    // Close JSDOM window
    if (dom && dom.window) {
      dom.window.close();
    }
  });
  describe('TestDashboard Class', () => {
    test('should be defined', () => {
      expect(TestDashboard).toBeDefined();
      expect(typeof TestDashboard).toBe('function');
    });

    test('should instantiate correctly', () => {
      const dashboard = new TestDashboard();
      expect(dashboard).toBeDefined();
      expect(dashboard).toBeInstanceOf(TestDashboard);
    });

    test('should have required properties', () => {
      const dashboard = new TestDashboard();
      expect(dashboard).toHaveProperty('dataScriptPath');
      expect(dashboard).toHaveProperty('updateInterval');
      expect(dashboard).toHaveProperty('dashboardElement');
      expect(dashboard).toHaveProperty('dataLoaded');
    });

    test('should have correct default configuration', () => {
      const dashboard = new TestDashboard();
      expect(dashboard.dataScriptPath).toBe('test-data.js');
      expect(dashboard.updateInterval).toBe(30000); // 30 seconds
      expect(dashboard.dataLoaded).toBe(false);
    });
  });

  describe('Dashboard Initialization', () => {
    test('should have init method', () => {
      const dashboard = new TestDashboard();
      expect(typeof dashboard.init).toBe('function');
    });

    test('should create dashboard on init', async () => {
      const dashboard = new TestDashboard();
      dashboard.init();

      // Wait a tick for async initialization
      await new Promise((resolve) => setTimeout(resolve, 0));

      const container = document.getElementById('test-dashboard-container');
      expect(container.innerHTML).not.toBe('');
    });

    test('should create dashboard HTML structure', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();

      const dashboardEl = document.querySelector('.test-dashboard');
      expect(dashboardEl).toBeDefined();
    });

    test('should create header section', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();

      const header = document.querySelector('.test-dashboard-header');
      expect(header).toBeDefined();
    });

    test('should create results grid', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();

      const grid = document.querySelector('.test-results-grid');
      expect(grid).toBeDefined();
    });
  });

  describe('Data Loading', () => {
    test('should have loadDataScript method', () => {
      const dashboard = new TestDashboard();
      expect(typeof dashboard.loadDataScript).toBe('function');
    });

    test('should display results when data exists', async () => {
      const dashboard = new TestDashboard();
      dashboard.init();

      // Wait a tick for async initialization
      await new Promise((resolve) => setTimeout(resolve, 0));

      dashboard.displayResults();

      const jestResults = document.getElementById('jest-results');
      expect(jestResults).toBeDefined();
      expect(jestResults.innerHTML).not.toContain('Loading');
    });

    test('should handle missing data gracefully', async () => {
      window.TEST_RESULTS = undefined;
      const dashboard = new TestDashboard();
      dashboard.init();

      // Wait a tick for async initialization
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Should not crash
      expect(dashboard).toBeDefined();
    });
  });

  describe('Jest Results Display', () => {
    test('should load Jest results', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();
      dashboard.loadJestResults(window.TEST_RESULTS.jest);

      const jestContainer = document.getElementById('jest-results');
      expect(jestContainer).toBeDefined();
      expect(jestContainer.innerHTML).toContain('989'); // total tests
    });

    test('should display pass rate correctly', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();
      dashboard.loadJestResults(window.TEST_RESULTS.jest);

      const jestContainer = document.getElementById('jest-results');
      expect(jestContainer.innerHTML).toContain('100'); // 100% pass rate
    });

    test('should handle failed tests', () => {
      const testData = {
        ...window.TEST_RESULTS.jest,
        numFailedTests: 5,
        numPassedTests: 984,
      };

      const dashboard = new TestDashboard();
      dashboard.createDashboard();
      dashboard.loadJestResults(testData);

      const jestContainer = document.getElementById('jest-results');
      expect(jestContainer.innerHTML).toContain('5'); // failed tests
    });

    test('should display test suites', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();
      dashboard.loadJestResults(window.TEST_RESULTS.jest);

      const jestContainer = document.getElementById('jest-results');
      expect(jestContainer.innerHTML).toContain('test1.js');
    });
  });

  describe('K6 Results Display', () => {
    test('should load K6 results', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();
      dashboard.loadK6Results(window.TEST_RESULTS.k6);

      const k6Container = document.getElementById('k6-results');
      expect(k6Container).toBeDefined();
      expect(k6Container.innerHTML).toContain('300'); // HTTP requests
    });

    test('should display request metrics', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();
      dashboard.loadK6Results(window.TEST_RESULTS.k6);

      const k6Container = document.getElementById('k6-results');
      expect(k6Container.innerHTML).toContain('4.50ms'); // avg duration
    });

    test('should display p95 duration', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();
      dashboard.loadK6Results(window.TEST_RESULTS.k6);

      const k6Container = document.getElementById('k6-results');
      expect(k6Container.innerHTML).toContain('8.50ms'); // p95
    });

    test('should display checks passing rate', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();
      dashboard.loadK6Results(window.TEST_RESULTS.k6);

      const k6Container = document.getElementById('k6-results');
      expect(k6Container.innerHTML).toContain('100'); // 100% checks passing
    });
  });

  describe('Error Handling', () => {
    test('should display error when data loading fails', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();
      dashboard.displayError();

      const jestContainer = document.getElementById('jest-results');
      expect(jestContainer.innerHTML).toContain('Unable to load test results');
    });
  });
  // Skip tests that need window.location mocking (not easily mockable in JSDOM)

  describe('Last Updated Time', () => {
    test('should update last updated timestamp', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();
      dashboard.updateLastUpdatedTime();

      const lastUpdated = document.getElementById('last-updated');
      expect(lastUpdated).toBeDefined();
      expect(lastUpdated.textContent).toContain('Last updated:');
    });

    test('should format time correctly', () => {
      const dashboard = new TestDashboard();
      dashboard.createDashboard();
      dashboard.updateLastUpdatedTime();

      const lastUpdated = document.getElementById('last-updated');
      // Should contain time in some format
      expect(lastUpdated.textContent.length).toBeGreaterThan(15);
    });
  });

  describe('Auto-refresh', () => {
    test('should have updateInterval property', () => {
      const dashboard = new TestDashboard();
      expect(dashboard.updateInterval).toBeDefined();
      expect(typeof dashboard.updateInterval).toBe('number');
    });

    test('should refresh every 30 seconds', () => {
      const dashboard = new TestDashboard();
      expect(dashboard.updateInterval).toBe(30000);
    });
  });
});
