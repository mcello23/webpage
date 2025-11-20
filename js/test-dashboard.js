/**
 * Test Dashboard - Live test results display
 * Displays Jest and K6 test results in a live tile
 */

class TestDashboard {
  constructor() {
    // Use .js file for test data (proper MIME type, better semantics)
    this.dataScriptPath = 'test-data.js';
    this.updateInterval = 30000; // 30 seconds
    this.dashboardElement = null;
    this.dataLoaded = false;
    this.intervalId = null; // Store interval ID for cleanup

    // GitHub Gist configuration for K6 results
    this.gistUsername = 'mcello23'; // Replace with your GitHub username
    this.gistId = '357c72c8e92ae6cf7eaef887e076fc42'; // Replace with your Gist ID after creating it
    this.gistFilename = 'k6-results.json';

    // Register instance for global cleanup tracking
    if (!TestDashboard.instances) {
      TestDashboard.instances = [];
    }
    TestDashboard.instances.push(this);
  }

  /**
   * Initialize the dashboard
   */
  init() {
    this.createDashboard();
    this.loadDataScript();
    // Auto-refresh every 30 seconds
    this.intervalId = setInterval(() => this.loadDataScript(), this.updateInterval);
  }

  /**
   * Cleanup method to clear intervals and prevent memory leaks
   */
  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    // Remove from instance registry
    if (TestDashboard.instances) {
      const idx = TestDashboard.instances.indexOf(this);
      if (idx !== -1) TestDashboard.instances.splice(idx, 1);
    }
  }

  /**
   * Destroy all active dashboard instances (used for test cleanup / page unload)
   */
  static destroyAll() {
    if (Array.isArray(TestDashboard.instances)) {
      // Copy to avoid mutation issues during iteration
      const snapshot = [...TestDashboard.instances];
      snapshot.forEach((inst) => {
        try {
          if (inst && typeof inst.destroy === 'function') inst.destroy();
        } catch {
          // Swallow errors in bulk cleanup
        }
      });
      TestDashboard.instances.length = 0;
    }
  }

  /**
   * Create the dashboard HTML structure
   */
  createDashboard() {
    const container = document.getElementById('test-dashboard-container');
    if (!container) return;

    container.innerHTML = `
      <div class="test-dashboard">
        <div class="test-dashboard-header">
          <h3>
            <i class="material-icons">assessment</i>
            Test Results Dashboard
          </h3>
          <span class="last-updated" id="last-updated">Loading...</span>
        </div>
        
        <div class="test-results-grid">
          <!-- Jest Results -->
          <div class="test-card jest-card">
            <div class="test-card-header">
              <h4><i class="material-icons">check_circle</i> Jest Tests</h4>
            </div>
            <div class="test-card-body" id="jest-results">
              <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading Jest results...</p>
              </div>
            </div>
          </div>

          <!-- K6 Performance Results -->
          <div class="test-card k6-card">
            <div class="test-card-header">
              <h4><i class="material-icons">speed</i> K6 Performance</h4>
            </div>
            <div class="test-card-body" id="k6-results">
              <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading K6 results...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Load the data script dynamically
   * Jest results from test-data.js, K6 results from GitHub Gist
   * @returns {Promise} - Returns promise for testing
   */
  loadDataScript() {
    // Load both Jest (from file) and K6 (from Gist) in parallel
    return Promise.all([this.loadJestDataScript(), this.loadK6DataFromGist()])
      .then(() => {
        this.dataLoaded = true;
        this.displayResults();
      })
      .catch((error) => {
        // Check if we should suppress logs (test env with torn-down DOM)
        const isTestEnv =
          typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test';
        const windowExists = typeof window !== 'undefined';
        const domAvailable = typeof document !== 'undefined' && document.getElementById;
        const shouldSuppressLogs = isTestEnv && (!windowExists || !domAvailable);

        if (!shouldSuppressLogs) {
          console.error('Failed to load test data:', error);
        }
        this.displayError();
      });
  }

  /**
   * Load Jest results from test-data.js file
   */
  loadJestDataScript() {
    return new Promise((resolve, reject) => {
      // Check if environment is still valid
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        reject(new Error('Environment torn down'));
        return;
      }

      // Check if data is already available
      if (window.TEST_RESULTS && window.TEST_RESULTS.jest) {
        resolve(window.TEST_RESULTS.jest);
        return;
      }

      // Load script dynamically
      const existingScript = document.getElementById('test-data-script');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = 'test-data-script';
      script.src = `${this.dataScriptPath}?t=${Date.now()}`; // Cache bust
      script.onload = () => {
        if (typeof window !== 'undefined' && window.TEST_RESULTS && window.TEST_RESULTS.jest) {
          resolve(window.TEST_RESULTS.jest);
        } else {
          reject(new Error('Jest data not found in test-data.js'));
        }
      };
      script.onerror = () => {
        reject(new Error('Failed to load test-data.js'));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Load K6 results from GitHub Gist
   */
  async loadK6DataFromGist() {
    // Helper to check if we should suppress logs (test env with torn-down DOM)
    const shouldSuppressLogs = () => {
      const isTestEnv =
        typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test';
      const windowExists = typeof window !== 'undefined';
      const domAvailable = typeof document !== 'undefined' && document.getElementById;

      // Suppress if in test AND (window gone OR DOM not available)
      return isTestEnv && (!windowExists || !domAvailable);
    };

    // Skip if Gist is not configured
    if (this.gistId === 'YOUR_GIST_ID_HERE' || !this.gistId) {
      if (!shouldSuppressLogs()) {
        console.warn('Gist ID not configured, falling back to test-data.js for K6 results');
      }
      // Return K6 data from test-data.js if available
      if (typeof window !== 'undefined' && window.TEST_RESULTS && window.TEST_RESULTS.k6) {
        return window.TEST_RESULTS.k6;
      }
      throw new Error('K6 data not available');
    }

    const gistUrl = `https://gist.githubusercontent.com/${this.gistUsername}/${this.gistId}/raw/${this.gistFilename}`;

    try {
      const response = await fetch(gistUrl + '?t=' + Date.now()); // Cache bust

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Store in window.TEST_RESULTS for compatibility
      if (typeof window !== 'undefined') {
        if (!window.TEST_RESULTS) {
          window.TEST_RESULTS = {};
        }
        window.TEST_RESULTS.k6 = data;
      }

      return data;
    } catch (error) {
      // Only log errors if not suppressing
      if (!shouldSuppressLogs()) {
        console.error('Error loading K6 data from Gist:', error);
      }
      // Fallback to test-data.js if Gist fails
      if (typeof window !== 'undefined' && window.TEST_RESULTS && window.TEST_RESULTS.k6) {
        if (!shouldSuppressLogs()) {
          console.log('Using K6 data from test-data.js as fallback');
        }
        return window.TEST_RESULTS.k6;
      }
      throw error;
    }
  }

  /**
   * Display results from loaded data
   */
  displayResults() {
    // Guard against calling after DOM cleanup (e.g., in tests)
    if (typeof document === 'undefined' || !document.getElementById) {
      return;
    }

    if (!window.TEST_RESULTS) {
      this.displayError();
      return;
    }

    this.loadJestResults(window.TEST_RESULTS.jest);
    this.loadK6Results(window.TEST_RESULTS.k6);
    this.updateLastUpdatedTime();
  }

  /**
   * Display error message
   */
  displayError() {
    // Guard against calling after DOM cleanup (e.g., in tests)
    if (typeof document === 'undefined' || !document.getElementById) {
      return;
    }

    const jestContainer = document.getElementById('jest-results');
    const k6Container = document.getElementById('k6-results');
    const isDev =
      typeof window !== 'undefined' &&
      window.location &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    const errorHTML = `
      <div class="error-message">
        <i class="material-icons">error_outline</i>
        <p>Unable to load test results</p>
        <small>${isDev ? 'Run: <code>npm run test:reports</code> and push to trigger CI/CD' : 'Data file not found. CI/CD may still be deploying.'}</small>
      </div>
    `;

    if (jestContainer) jestContainer.innerHTML = errorHTML;
    if (k6Container) k6Container.innerHTML = errorHTML;
  }

  /**
   * Load Jest test results
   */
  async loadJestResults(data) {
    const container = document.getElementById('jest-results');
    if (!container) return;

    try {
      if (!data) {
        throw new Error('No Jest data provided');
      }

      // Extract test summary from data
      const testsPassed = Number(data.numPassedTests ?? 0);
      const testsFailed = Number(data.numFailedTests ?? 0);
      const testsTotal = Number(data.numTotalTests ?? 0);
      const testSuites = Number(data.numTotalTestSuites ?? data.numPassedTestSuites ?? 0);
      const precomputedRate = data.passRate != null ? Number(data.passRate) : null;
      const passRate = testsTotal > 0 ? ((testsPassed / testsTotal) * 100).toFixed(2) : 100;
      const rate = precomputedRate != null ? precomputedRate.toFixed(2) : passRate;

      // Generate suites detail HTML
      let suitesHTML = '';
      if (data.testSuites && data.testSuites.length > 0) {
        suitesHTML = `
          <div class="test-suites-section">
            <button class="expand-button" onclick="this.classList.toggle('expanded'); this.nextElementSibling.classList.toggle('show');">
              <i class="material-icons">expand_more</i>
              <span>View ${testSuites} Test Suites (${testsTotal} tests)</span>
            </button>
            <div class="suites-list">
              ${data.testSuites
                .map(
                  (suite) => `
                <div class="suite-item ${suite.status || 'passed'}">
                  <div class="suite-header">
                    <span class="suite-name" title="${suite.name}">${suite.name}</span>
                    <span class="suite-stats">
                      <span class="badge success">${suite.numPassedTests || 0} passed</span>
                      ${suite.numFailedTests > 0 ? `<span class="badge error">${suite.numFailedTests} failed</span>` : ''}
                      <span class="badge">${suite.numTests || 0} total</span>
                    </span>
                  </div>
                  ${suite.duration ? `<div class="suite-duration">${(suite.duration / 1000).toFixed(2)}s</div>` : ''}
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="test-stats">
          <div class="stat-item">
            <span class="stat-value success">${testSuites}</span>
            <span class="stat-label">Test Suites</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${testsTotal}</span>
            <span class="stat-label">Total Tests</span>
          </div>
          <div class="stat-item">
            <span class="stat-value success">${testsPassed}</span>
            <span class="stat-label">Passed</span>
          </div>
          <div class="stat-item">
            <span class="stat-value ${testsFailed > 0 ? 'error' : 'success'}">${testsFailed}</span>
            <span class="stat-label">Failed</span>
          </div>
        </div>
        <div class="test-details">
          <div class="detail-row">
            <span class="detail-label">✓ Success Rate:</span>
            <span class="detail-value ${Number(rate) >= 95 ? 'success' : 'warning'}">${rate}%</span>
          </div>
        </div>
        <div class="test-progress">
          <div class="progress-bar">
            <div class="progress-fill ${Number(rate) >= 95 ? 'success' : Number(rate) >= 80 ? 'warning' : 'error'}" style="width: ${rate}%"></div>
          </div>
        </div>
        ${suitesHTML}
      `;
    } catch (error) {
      console.error('Error displaying Jest results:', error);
      const isDev =
        window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      container.innerHTML = `
        <div class="error-message">
          <i class="material-icons">error_outline</i>
          <p>Unable to display Jest results</p>
          <small>${isDev ? 'Run: <code>npm run test:reports</code>' : 'Data parsing error'}</small>
          <details style="margin-top:6px"><summary style="cursor:pointer">Debug info</summary><code>${(error && error.message) || 'No message'}</code></details>
        </div>
      `;
    }
  }

  /**
   * Load K6 performance test results
```
   */
  async loadK6Results(data) {
    const container = document.getElementById('k6-results');
    if (!container) return;

    try {
      if (!data || !data.metrics) {
        throw new Error('No K6 data provided');
      }

      const metrics = data.metrics || {};
      const httpReqs = metrics.http_reqs ? metrics.http_reqs.count : 0;
      const httpRate = metrics.http_reqs ? Number(metrics.http_reqs.rate).toFixed(2) : '0.00';
      const httpDuration = metrics.http_req_duration
        ? Number(metrics.http_req_duration.avg).toFixed(2)
        : '0.00';
      const httpMin = metrics.http_req_duration
        ? Number(metrics.http_req_duration.min).toFixed(2)
        : '0.00';
      const httpMed = metrics.http_req_duration
        ? Number(metrics.http_req_duration.med).toFixed(2)
        : '0.00';
      const httpMax = metrics.http_req_duration
        ? Number(metrics.http_req_duration.max).toFixed(2)
        : '0.00';
      const p90Duration =
        metrics.http_req_duration && metrics.http_req_duration['p(90)']
          ? Number(metrics.http_req_duration['p(90)']).toFixed(2)
          : '0.00';
      const p95Duration =
        metrics.http_req_duration && metrics.http_req_duration['p(95)'] !== undefined
          ? Number(metrics.http_req_duration['p(95)']).toFixed(2)
          : '0.00';
      const checksPass = metrics.checks ? metrics.checks.passes : 0;
      const checksFail = metrics.checks ? metrics.checks.fails : 0;
      const checksTotal = checksPass + checksFail;
      const checksRate = checksTotal > 0 ? ((checksPass / checksTotal) * 100).toFixed(2) : '100.00';
      const threshold =
        metrics.http_req_duration && metrics.http_req_duration.thresholds
          ? metrics.http_req_duration.thresholds['p(95)<2000']
          : false;

      // Generate detailed metrics HTML
      const detailsHTML = `
        <div class="k6-details-section">
          <button class="expand-button" onclick="this.classList.toggle('expanded'); this.nextElementSibling.classList.toggle('show');">
            <i class="material-icons">expand_more</i>
            <span>View Detailed Metrics</span>
          </button>
          <div class="metrics-detail">
            <div class="metric-group">
              <h4>Request Duration (ms)</h4>
              <div class="metric-row"><span class="metric-label">Min:</span><span class="metric-value">${httpMin}ms</span></div>
              <div class="metric-row"><span class="metric-label">Median:</span><span class="metric-value">${httpMed}ms</span></div>
              <div class="metric-row"><span class="metric-label">Average:</span><span class="metric-value">${httpDuration}ms</span></div>
              <div class="metric-row"><span class="metric-label">P90:</span><span class="metric-value">${p90Duration}ms</span></div>
              <div class="metric-row"><span class="metric-label">P95:</span><span class="metric-value ${threshold ? 'success' : 'warning'}">${p95Duration}ms</span></div>
              <div class="metric-row"><span class="metric-label">Max:</span><span class="metric-value">${httpMax}ms</span></div>
            </div>
            <div class="metric-group">
              <h4>Test Configuration</h4>
              <div class="metric-row"><span class="metric-label">Total Requests:</span><span class="metric-value">${httpReqs}</span></div>
              <div class="metric-row"><span class="metric-label">Request Rate:</span><span class="metric-value">${httpRate} req/s</span></div>
              <div class="metric-row"><span class="metric-label">Duration:</span><span class="metric-value">30s</span></div>
              <div class="metric-row"><span class="metric-label">Virtual Users:</span><span class="metric-value">10</span></div>
            </div>
            ${
              data.root_group && data.root_group.checks && Array.isArray(data.root_group.checks)
                ? `
            <div class="metric-group">
              <h4>Checks Breakdown</h4>
              ${data.root_group.checks
                .map(
                  (check) => `
                <div class="metric-row">
                  <span class="metric-label">${check.name}:</span>
                  <span class="metric-value ${check.fails > 0 ? 'error' : 'success'}">
                    ${check.passes} / ${check.passes + check.fails} 
                    (${((check.passes / (check.passes + check.fails)) * 100).toFixed(1)}%)
                  </span>
                </div>
              `
                )
                .join('')}
            </div>
            `
                : ''
            }
          </div>
        </div>
      `;

      container.innerHTML = `
        <div class="test-stats">
          <div class="stat-item">
            <span class="stat-value">${httpReqs}</span>
            <span class="stat-label">HTTP Requests</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${httpDuration}ms</span>
            <span class="stat-label">Avg Duration</span>
          </div>
          <div class="stat-item">
            <span class="stat-value ${threshold ? 'success' : 'warning'}">${p95Duration}ms</span>
            <span class="stat-label">P95 Duration</span>
          </div>
          <div class="stat-item">
            <span class="stat-value ${checksRate >= 95 ? 'success' : 'warning'}">${checksRate}%</span>
            <span class="stat-label">Checks Passing</span>
          </div>
        </div>
        <div class="test-details">
          <div class="detail-row">
            <span class="detail-label">✓ Checks Passed:</span>
            <span class="detail-value success">${checksPass}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">✗ Checks Failed:</span>
            <span class="detail-value ${checksFail > 0 ? 'error' : 'success'}">${checksFail}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Threshold (P95 < 2000ms):</span>
            <span class="detail-value ${threshold ? 'success' : 'error'}">${threshold ? 'PASS' : 'FAIL'}</span>
          </div>
        </div>
        <div class="test-progress">
          <div class="progress-bar">
            <div class="progress-fill ${checksRate >= 95 ? 'success' : 'warning'}" style="width: ${checksRate}%"></div>
          </div>
        </div>
        ${detailsHTML}
      `;
    } catch (error) {
      console.error('Error displaying K6 results:', error);
      const isDev =
        window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      container.innerHTML = `
        <div class="error-message">
          <i class="material-icons">error_outline</i>
          <p>Unable to display K6 results</p>
          <small>${isDev ? 'Run: <code>npm run test:reports</code>' : 'Data parsing error'}</small>
          <details style="margin-top:6px"><summary style="cursor:pointer">Debug info</summary><code>${(error && error.message) || 'No message'}</code></details>
        </div>
      `;
    }
  }

  /**
   * Update the last updated timestamp
   */
  updateLastUpdatedTime() {
    const element = document.getElementById('last-updated');
    if (element) {
      const now = new Date();
      element.textContent = `Last updated: ${now.toLocaleTimeString()}`;
    }
  }
}

// Export for testing and external use
if (typeof window !== 'undefined') {
  window.TestDashboard = TestDashboard;

  // Avoid auto-init during Jest test environment to prevent lingering intervals
  const isTestEnv =
    typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test';

  if (!isTestEnv) {
    // Initialize dashboard when DOM is ready (real browser usage)
    document.addEventListener('DOMContentLoaded', () => {
      const dashboard = new TestDashboard();
      dashboard.init();
    });

    // Ensure cleanup of intervals if user navigates away
    window.addEventListener('beforeunload', () => {
      TestDashboard.destroyAll();
    });
  }
}

// CommonJS/Node.js export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TestDashboard };
}
