/**
 * Test Dashboard - Live test results display
 * Displays Jest and K6 test results in a live tile
 */

class TestDashboard {
  constructor() {
    this.jestDataPath = 'tests/jest/reports/results-latest.json';
    this.k6SummaryPath = 'tests/k6/reports/http-summary-20251107_204829.json';
    this.k6PerformancePath = 'tests/k6/reports/http-performance-20251107_204829.json';
    this.updateInterval = 30000; // 30 seconds
    this.dashboardElement = null;
  }

  /**
   * Initialize the dashboard
   */
  init() {
    this.createDashboard();
    this.loadTestResults();
    // Auto-refresh every 30 seconds
    setInterval(() => this.loadTestResults(), this.updateInterval);
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
   * Load all test results
   */
  async loadTestResults() {
    try {
      await Promise.all([this.loadJestResults(), this.loadK6Results()]);
      this.updateLastUpdatedTime();
    } catch (error) {
      console.error('Error loading test results:', error);
    }
  }

  /**
   * Load Jest test results
   */
  async loadJestResults() {
    const container = document.getElementById('jest-results');
    if (!container) return;

    try {
      // Try to load Jest JSON results first
      const response = await fetch(this.jestDataPath);

      if (!response.ok) {
        throw new Error('Jest results not found');
      }

      const data = await response.json();

      // Extract test summary from Jest JSON
      const testsPassed = data.numPassedTests || 0;
      const testsFailed = data.numFailedTests || 0;
      const testsTotal = data.numTotalTests || 0;
      const testSuites = data.numTotalTestSuites || 0;
      const passRate = testsTotal > 0 ? ((testsPassed / testsTotal) * 100).toFixed(2) : 100;

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
            <span class="detail-value ${passRate >= 95 ? 'success' : 'warning'}">${passRate}%</span>
          </div>
        </div>
        <div class="test-progress">
          <div class="progress-bar">
            <div class="progress-fill ${passRate >= 95 ? 'success' : passRate >= 80 ? 'warning' : 'error'}" style="width: ${passRate}%"></div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error loading Jest results:', error);
      const isDev =
        window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      container.innerHTML = `
        <div class="error-message">
          <i class="material-icons">error_outline</i>
          <p>Unable to load Jest results</p>
          <small>${isDev ? 'Run: <code>npm run test:reports</code>' : 'Reports are being generated... Please wait for CI/CD to complete.'}</small>
        </div>
      `;
    }
  }

  /**
   * Load K6 performance test results
```
   */
  async loadK6Results() {
    const container = document.getElementById('k6-results');
    if (!container) return;

    try {
      const response = await fetch(this.k6SummaryPath);
      const data = await response.json();

      const metrics = data.metrics;
      const httpReqs = metrics.http_reqs.count;
      const httpDuration = metrics.http_req_duration.avg.toFixed(2);
      const p95Duration = metrics.http_req_duration['p(95)'].toFixed(2);
      const checksPass = metrics.checks.passes;
      const checksFail = metrics.checks.fails;
      const checksTotal = checksPass + checksFail;
      const checksRate = ((checksPass / checksTotal) * 100).toFixed(2);
      const threshold = metrics.http_req_duration.thresholds['p(95)<2000'];

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
      console.error('Error loading K6 results:', error);
      const isDev =
        window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      container.innerHTML = `
        <div class="error-message">
          <i class="material-icons">error_outline</i>
          <p>Unable to load K6 results</p>
          <small>${isDev ? 'Run: <code>npm run test:reports</code>' : 'Reports are being generated... Please wait for CI/CD to complete.'}</small>
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
