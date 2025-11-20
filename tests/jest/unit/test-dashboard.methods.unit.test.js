/**
 * Additional unit tests for test-dashboard.js to boost function coverage
 */

const { JSDOM } = require('jsdom');

describe('TestDashboard Unit - Methods coverage', () => {
  let dom;
  let window;
  let document;
  let TestDashboard;

  beforeEach(() => {
    process.env.NODE_ENV = 'test';

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
        pretendToBeVisual: true,
      }
    );

    window = dom.window;
    document = window.document;

    global.window = window;
    global.document = document;

    // Mock console to suppress expected error logs in tests
    global.console = {
      ...console,
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    };
    window.console = global.console;

    // Minimal test data
    window.TEST_RESULTS = {
      jest: {
        numTotalTests: 2,
        numPassedTests: 2,
        numFailedTests: 0,
        numTotalTestSuites: 1,
        testSuites: [
          { name: 'suite.js', status: 'passed', numTests: 2, numPassedTests: 2, duration: 10 },
        ],
      },
      k6: {
        metrics: {
          http_reqs: { count: 1, rate: 1 },
          http_req_duration: {
            avg: 1,
            min: 1,
            med: 1,
            max: 1,
            'p(90)': 1,
            'p(95)': 1,
            thresholds: { 'p(95)<2000': true },
          },
          checks: { passes: 1, fails: 0 },
        },
        root_group: { checks: [{ name: 'ok', passes: 1, fails: 0 }] },
      },
    };

    const mod = require('../../../js/test-dashboard.js');
    TestDashboard = mod.TestDashboard || window.TestDashboard;
  });

  afterEach(() => {
    if (TestDashboard && typeof TestDashboard.destroyAll === 'function') {
      TestDashboard.destroyAll();
    }
    // Clear any pending timers
    const highest = setTimeout(() => {}, 0);
    for (let i = 0; i <= highest; i++) {
      clearTimeout(i);
      clearInterval(i);
    }
    dom.window.close();
  });

  test('createDashboard builds base structure', () => {
    const d = new TestDashboard();
    d.createDashboard();
    expect(document.querySelector('.test-dashboard')).toBeTruthy();
    // cover updateLastUpdatedTime via call
    d.updateLastUpdatedTime();
    expect(document.getElementById('last-updated')).toBeTruthy();
  });

  test('displayError renders error messages', () => {
    const d = new TestDashboard();
    d.createDashboard();
    d.displayError();
    expect(document.getElementById('jest-results').innerHTML).toContain(
      'Unable to load test results'
    );
  });

  test('loadJestResults renders stats and handles error path', async () => {
    const d = new TestDashboard();
    d.createDashboard();
    await d.loadJestResults(window.TEST_RESULTS.jest);
    expect(document.getElementById('jest-results').innerHTML).toContain('Total Tests');

    // Error branch
    await d.loadJestResults(null);
    expect(document.getElementById('jest-results').innerHTML).toContain(
      'Unable to display Jest results'
    );
  });

  test('loadK6Results renders stats and handles error path', async () => {
    const d = new TestDashboard();
    d.createDashboard();
    await d.loadK6Results(window.TEST_RESULTS.k6);
    expect(document.getElementById('k6-results').innerHTML).toContain('HTTP Requests');

    // Error branch
    await d.loadK6Results(null);
    expect(document.getElementById('k6-results').innerHTML).toContain(
      'Unable to display K6 results'
    );
  });

  test('loadDataScript uses existing TEST_RESULTS fast-path', async () => {
    const d = new TestDashboard();
    d.createDashboard();
    
    // Wait for async loadDataScript to complete
    await new Promise((resolve) => {
      d.loadDataScript();
      // Give it a tick to resolve the Promise
      setTimeout(resolve, 50);
    });
    
    expect(d.dataLoaded).toBe(true);
    expect(document.getElementById('jest-results').innerHTML).not.toContain('Loading');
  });

  test('loadDataScript error branch triggers displayError', async () => {
    const d = new TestDashboard();
    d.createDashboard();

    // Remove TEST_RESULTS to force script path
    delete window.TEST_RESULTS;
    
    // Mock fetch to fail for Gist
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    d.loadDataScript();
    
    // Wait for script to be added
    await new Promise((resolve) => setTimeout(resolve, 10));
    
    const script = document.getElementById('test-data-script');
    expect(script).toBeTruthy();

    // Trigger error on both paths
    script.onerror();
    
    // Wait for error handling
    await new Promise((resolve) => setTimeout(resolve, 50));
    
    expect(document.getElementById('jest-results').innerHTML).toContain(
      'Unable to load test results'
    );
  });

  test('init sets interval and destroy clears it; destroyAll clears all', () => {
    const d1 = new TestDashboard();
    const d2 = new TestDashboard();

    // Provide TEST_RESULTS so init fast-path renders without fetching
    window.TEST_RESULTS = window.TEST_RESULTS || {
      jest: { numTotalTests: 0 },
      k6: { metrics: {} },
    };

    d1.init();
    d2.init();

    expect(d1.intervalId).toBeTruthy();
    expect(d2.intervalId).toBeTruthy();

    d1.destroy();
    expect(d1.intervalId).toBeNull();

    // bulk cleanup for remaining instances
    TestDashboard.destroyAll();
    expect(Array.isArray(TestDashboard.instances) && TestDashboard.instances.length === 0).toBe(
      true
    );
  });
});
