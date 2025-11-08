/**
 * Test Dashboard - Live test results display
 * Displays Jest and K6 test results in a live tile
 */

class TestDashboard {
  constructor() {
    // Use JavaScript file instead of JSON (GitHub Pages blocks JSON in subdirectories)
    this.dataScriptPath = 'data/test-results.js';
    this.updateInterval = 30000; // 30 seconds
    this.dashboardElement = null;
    this.dataLoaded = false;
  }

  /**
   * Initialize the dashboard
   */
  init() {
    this.createDashboard();
    this.loadDataScript();
    // Auto-refresh every 30 seconds
    setInterval(() => this.loadDataScript(), this.updateInterval);
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
   */
  loadDataScript() {
    // Check if data is already available
    if (window.TEST_RESULTS && !this.dataLoaded) {
      this.dataLoaded = true;
      this.displayResults();
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
      this.dataLoaded = true;
      this.displayResults();
    };
    script.onerror = () => {
      console.error('Failed to load test data script');
      this.displayError();
    };
    document.head.appendChild(script);
  }

  /**
   * Display results from loaded data
   */
  displayResults() {
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
    const jestContainer = document.getElementById('jest-results');
    const k6Container = document.getElementById('k6-results');
    const isDev =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

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
      const httpDuration = metrics.http_req_duration
        ? Number(metrics.http_req_duration.avg).toFixed(2)
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

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const dashboard = new TestDashboard();
  dashboard.init();
});
