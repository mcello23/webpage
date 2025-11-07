/**
 * Test Dashboard - Live test results display
 * Displays Jest and K6 test results in a live tile
 */

class TestDashboard {
  constructor() {
    this.jestDataPath = 'tests/jest/reports/results-20251107_204823.json';
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
      // For now, we'll use coverage data as the JSON results file appears to be corrupted
      const response = await fetch('coverage/lcov.info');
      const text = await response.text();

      // Parse lcov info for basic stats
      const lines = text.split('\n');
      const testFiles = lines.filter((line) => line.startsWith('SF:')).length;
      const linesFound = lines
        .filter((line) => line.startsWith('LF:'))
        .reduce((acc, line) => {
          return acc + parseInt(line.split(':')[1]) || 0;
        }, 0);
      const linesHit = lines
        .filter((line) => line.startsWith('LH:'))
        .reduce((acc, line) => {
          return acc + parseInt(line.split(':')[1]) || 0;
        }, 0);

      const coverage = linesFound > 0 ? ((linesHit / linesFound) * 100).toFixed(2) : 0;

      container.innerHTML = `
        <div class="test-stats">
          <div class="stat-item">
            <span class="stat-value success">${testFiles}</span>
            <span class="stat-label">Test Files</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${linesFound}</span>
            <span class="stat-label">Total Lines</span>
          </div>
          <div class="stat-item">
            <span class="stat-value success">${linesHit}</span>
            <span class="stat-label">Lines Covered</span>
          </div>
          <div class="stat-item coverage-stat">
            <span class="stat-value ${coverage >= 80 ? 'success' : coverage >= 60 ? 'warning' : 'error'}">${coverage}%</span>
            <span class="stat-label">Coverage</span>
          </div>
        </div>
        <div class="test-progress">
          <div class="progress-bar">
            <div class="progress-fill success" style="width: ${coverage}%"></div>
          </div>
        </div>
        <div class="test-footer">
          <a href="coverage/lcov-report/index.html" target="_blank" class="view-details-btn">
            View Full Report <i class="material-icons">open_in_new</i>
          </a>
        </div>
      `;
    } catch (error) {
      container.innerHTML = `
        <div class="error-message">
          <i class="material-icons">error_outline</i>
          <p>Unable to load Jest results</p>
          <small>${error.message}</small>
        </div>
      `;
    }
  }

  /**
   * Load K6 performance test results
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
      container.innerHTML = `
        <div class="error-message">
          <i class="material-icons">error_outline</i>
          <p>Unable to load K6 results</p>
          <small>${error.message}</small>
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
