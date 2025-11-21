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

    // Update modal if it's open
    const modal = document.getElementById('testDashboardModal');
    if (modal && modal.style.display === 'flex') {
      if (typeof initializeModalDashboard === 'function') {
        initializeModalDashboard();
      }
    }
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
        <details style="margin-top:6px"><summary style="cursor:pointer">Debug info</summary><code>${'Check console for details'}</code></details>
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

      // Additional network timing metrics
      const httpReqBlocked = metrics.http_req_blocked?.avg || null;
      const httpReqConnecting = metrics.http_req_connecting?.avg || null;
      const httpReqTlsHandshaking = metrics.http_req_tls_handshaking?.avg || null;
      const httpReqSending = metrics.http_req_sending?.avg || null;
      const httpReqWaiting = metrics.http_req_waiting?.avg || null;
      const httpReqReceiving = metrics.http_req_receiving?.avg || null;

      // Data transfer metrics
      const dataReceived = metrics.data_received?.count || null;
      const dataSent = metrics.data_sent?.count || null;

      // Virtual users and iterations
      const vusMax = metrics.vus_max?.max || metrics.vus_max?.value || metrics.vus?.value || null;
      const iterations = metrics.iterations?.count || null;
      const iterationDuration = metrics.iteration_duration?.avg || null;

      // Failure rate
      const httpReqFailed = metrics.http_req_failed?.rate || 0;
      const failureRate = (httpReqFailed * 100).toFixed(2);
      const successRate = (100 - httpReqFailed * 100).toFixed(2);

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
              <div class="metric-row"><span class="metric-label">Success Rate:</span><span class="metric-value ${Number(successRate) >= 95 ? 'success' : 'warning'}">${successRate}%</span></div>
              ${vusMax !== null ? `<div class="metric-row"><span class="metric-label">Max Virtual Users:</span><span class="metric-value">${Math.round(vusMax)}</span></div>` : ''}
              ${iterations !== null ? `<div class="metric-row"><span class="metric-label">Iterations:</span><span class="metric-value">${iterations}</span></div>` : ''}
              ${iterationDuration !== null ? `<div class="metric-row"><span class="metric-label">Avg Iteration:</span><span class="metric-value">${Number(iterationDuration).toFixed(2)}ms</span></div>` : ''}
            </div>
            ${
              httpReqWaiting !== null ||
              httpReqBlocked !== null ||
              httpReqConnecting !== null ||
              httpReqSending !== null ||
              httpReqReceiving !== null
                ? `
            <div class="metric-group">
              <h4>Network Timing Breakdown</h4>
              ${httpReqBlocked !== null ? `<div class="metric-row"><span class="metric-label">⏱️ Blocked:</span><span class="metric-value">${Number(httpReqBlocked).toFixed(2)}ms</span></div>` : ''}
              ${httpReqConnecting !== null ? `<div class="metric-row"><span class="metric-label">🔌 Connecting:</span><span class="metric-value">${Number(httpReqConnecting).toFixed(2)}ms</span></div>` : ''}
              ${httpReqTlsHandshaking !== null ? `<div class="metric-row"><span class="metric-label">🔐 TLS Handshake:</span><span class="metric-value">${Number(httpReqTlsHandshaking).toFixed(2)}ms</span></div>` : ''}
              ${httpReqSending !== null ? `<div class="metric-row"><span class="metric-label">📤 Sending:</span><span class="metric-value">${Number(httpReqSending).toFixed(2)}ms</span></div>` : ''}
              ${httpReqWaiting !== null ? `<div class="metric-row"><span class="metric-label">⏳ Waiting (TTFB):</span><span class="metric-value">${Number(httpReqWaiting).toFixed(2)}ms</span></div>` : ''}
              ${httpReqReceiving !== null ? `<div class="metric-row"><span class="metric-label">📥 Receiving:</span><span class="metric-value">${Number(httpReqReceiving).toFixed(2)}ms</span></div>` : ''}
            </div>
            `
                : ''
            }
            ${
              dataReceived !== null || dataSent !== null
                ? `
            <div class="metric-group">
              <h4>Data Transfer</h4>
              ${dataReceived !== null ? `<div class="metric-row"><span class="metric-label">📥 Data Received:</span><span class="metric-value">${(Number(dataReceived) / 1024).toFixed(2)} KB</span></div>` : ''}
              ${dataSent !== null ? `<div class="metric-row"><span class="metric-label">📤 Data Sent:</span><span class="metric-value">${(Number(dataSent) / 1024).toFixed(2)} KB</span></div>` : ''}
              ${dataReceived !== null && dataSent !== null ? `<div class="metric-row"><span class="metric-label">🔄 Total Traffic:</span><span class="metric-value">${((Number(dataReceived) + Number(dataSent)) / 1024).toFixed(2)} KB</span></div>` : ''}
            </div>
            `
                : ''
            }
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
            <span class="stat-value ${Number(successRate) >= 95 ? 'success' : 'warning'}">${successRate}%</span>
            <span class="stat-label">Success Rate</span>
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
            <span class="detail-label">✓ HTTP Success Rate:</span>
            <span class="detail-value ${Number(successRate) >= 95 ? 'success' : 'warning'}">${successRate}%</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">✗ HTTP Failure Rate:</span>
            <span class="detail-value ${Number(failureRate) > 5 ? 'error' : 'success'}">${failureRate}%</span>
          </div>
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

// --- Modal Logic with Focus Trap & Accessibility ---

// Focus trap variables
let lastFocusedElement;

// eslint-disable-next-line no-unused-vars -- Called from HTML
function openTestDashboardModal() {
  lastFocusedElement = document.activeElement;
  const modal = document.getElementById('testDashboardModal');
  if (!modal) return;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  modal.setAttribute('aria-hidden', 'false');

  // Focus the close button or first focusable element
  const closeBtn = modal.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.focus();
  }

  // Always refresh dashboard data when opening modal
  initializeModalDashboard();
}

function closeTestDashboardModal() {
  const modal = document.getElementById('testDashboardModal');
  if (!modal) return;

  modal.style.display = 'none';
  document.body.style.overflow = '';
  modal.setAttribute('aria-hidden', 'true');

  if (lastFocusedElement) lastFocusedElement.focus();
}

// eslint-disable-next-line no-unused-vars -- Called from HTML
function toggleModalSection(contentId) {
  const content = document.getElementById(contentId);
  if (!content) return;

  const button = content.previousElementSibling.querySelector('.btn-collapse i');
  content.classList.toggle('collapsed');
  button.textContent = content.classList.contains('collapsed') ? 'expand_more' : 'expand_less';
}

// Close modal on ESC key and trap focus on Tab
document.addEventListener('keydown', function (e) {
  const modal = document.getElementById('testDashboardModal');
  if (modal && modal.style.display === 'flex') {
    if (e.key === 'Escape') {
      closeTestDashboardModal();
    }

    // Focus Trap
    if (e.key === 'Tab') {
      const focusableElementsString =
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
      const focusableElements = modal.querySelectorAll(focusableElementsString);
      const focusableArray = Array.from(focusableElements);

      if (focusableArray.length === 0) return;

      const firstElement = focusableArray[0];
      const lastElement = focusableArray[focusableArray.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }
});

// Initialize Modal Dashboard (uses window.TEST_RESULTS populated by TestDashboard)
function initializeModalDashboard() {
  if (typeof window.TEST_RESULTS === 'undefined') {
    console.warn('No test data available yet');
    // If TestDashboard is running, it will populate this eventually and update the modal
    return;
  }

  const data = window.TEST_RESULTS;

  // Update Metadata
  if (data.metadata) {
    const branchEl = document.getElementById('modal-branch');
    const commitEl = document.getElementById('modal-commit');
    const timeEl = document.getElementById('modal-timestamp');
    if (branchEl) branchEl.textContent = data.metadata.branch || '-';
    if (commitEl) commitEl.textContent = data.metadata.commit || '-';
    if (timeEl)
      timeEl.textContent = data.metadata.timestamp
        ? new Date(data.metadata.timestamp).toLocaleString()
        : '-';
  }

  // Update Quick Stats
  const jestTotalTests = data.jest?.numTotalTests || 0;
  const jestPassedTests = data.jest?.numPassedTests || 0;
  const totalTests = jestTotalTests + (data.k6?.metrics?.http_reqs?.count || 0);

  // Pass rate should use Jest's own calculation or calculate from Jest tests only
  const passRate =
    data.jest?.passRate?.toFixed?.(1) ||
    (jestTotalTests > 0 ? ((jestPassedTests / jestTotalTests) * 100).toFixed(1) : '100.0');

  // Avg duration should be per test, not total duration
  const avgDuration =
    data.jest?.avgDuration && jestTotalTests > 0
      ? (data.jest.avgDuration / 1000 / jestTotalTests).toFixed(2)
      : '0.00';
  const coverage = data.coverage?.lines?.pct;

  const totalEl = document.getElementById('modal-total-tests');
  const passRateEl = document.getElementById('modal-pass-rate');
  const avgDurEl = document.getElementById('modal-avg-duration');
  const covEl = document.getElementById('modal-coverage');

  if (totalEl) totalEl.textContent = totalTests;
  if (passRateEl) passRateEl.textContent = passRate + '%';
  if (avgDurEl) avgDurEl.textContent = avgDuration + 's';
  if (covEl)
    covEl.textContent = coverage != null && coverage > 0 ? coverage.toFixed(1) + '%' : 'N/A';

  // Jest Metrics
  if (data.jest) {
    const jestDuration = data.jest.avgDuration ? (data.jest.avgDuration / 1000).toFixed(2) : '0';

    const suitesEl = document.getElementById('modal-jest-suites');
    const passedEl = document.getElementById('modal-jest-passed');
    const failedEl = document.getElementById('modal-jest-failed');
    const rateEl = document.getElementById('modal-jest-rate');
    const durEl = document.getElementById('modal-jest-duration');

    if (suitesEl) suitesEl.textContent = data.jest.numTotalTestSuites || 0;
    if (passedEl) passedEl.textContent = data.jest.numPassedTests || 0;
    if (failedEl) failedEl.textContent = data.jest.numFailedTests || 0;
    if (rateEl) rateEl.textContent = (data.jest.passRate || passRate) + '%';
    if (durEl) durEl.textContent = jestDuration + 's';

    // Populate Jest Suites Details
    const suitesList = document.getElementById('modal-jest-suites-list');
    if (suitesList) {
      if (data.jest.testSuites && data.jest.testSuites.length > 0) {
        suitesList.innerHTML = data.jest.testSuites
          .map((suite) => {
            const status = suite.numFailedTests > 0 ? 'failed' : 'passed';
            const duration = suite.duration ? (suite.duration / 1000).toFixed(2) : '0';
            return `
            <div class="suite-item ${status}">
              <div class="suite-header">
                <span class="suite-name">${suite.name}</span>
                <div class="suite-stats">
                  <span class="badge success">${suite.numPassedTests || 0} passed</span>
                  ${suite.numFailedTests > 0 ? `<span class="badge error">${suite.numFailedTests} failed</span>` : ''}
                  <span class="badge">${suite.numTests || 0} total</span>
                </div>
              </div>
              <div class="suite-duration">${duration}s</div>
            </div>
          `;
          })
          .join('');
      } else {
        suitesList.innerHTML = '<p style="color: var(--muted);">No suite details available</p>';
      }
    }
  }

  // K6 Metrics
  if (data.k6?.metrics) {
    const metrics = data.k6.metrics;
    const rate = metrics.http_reqs?.rate ? Number(metrics.http_reqs.rate).toFixed(2) : '0';

    const reqEl = document.getElementById('modal-k6-requests');
    const rateEl = document.getElementById('modal-k6-rate');
    const avgEl = document.getElementById('modal-k6-avg');
    const p95El = document.getElementById('modal-k6-p95');
    const checksEl = document.getElementById('modal-k6-checks');

    if (reqEl) reqEl.textContent = metrics.http_reqs?.count || 0;
    if (rateEl) rateEl.textContent = rate + ' req/s';
    if (avgEl) avgEl.textContent = (metrics.http_req_duration?.avg || 0).toFixed(2) + 'ms';
    if (p95El)
      p95El.textContent =
        (metrics.http_req_duration?.['p(95)'] || metrics.http_req_duration?.p95 || 0).toFixed(2) +
        'ms';

    const checksPass = metrics.checks?.passes || 0;
    const checksTotal = checksPass + (metrics.checks?.fails || 0);
    const checksRate = checksTotal > 0 ? ((checksPass / checksTotal) * 100).toFixed(1) : '100';
    if (checksEl) checksEl.textContent = checksRate + '%';

    // Duration breakdown
    const minEl = document.getElementById('modal-k6-min');
    const medEl = document.getElementById('modal-k6-med');
    const p90El = document.getElementById('modal-k6-p90');
    const maxEl = document.getElementById('modal-k6-max');

    if (minEl) minEl.textContent = (metrics.http_req_duration?.min || 0).toFixed(2) + 'ms';
    if (medEl) medEl.textContent = (metrics.http_req_duration?.med || 0).toFixed(2) + 'ms';
    if (p90El)
      p90El.textContent =
        (metrics.http_req_duration?.['p(90)'] || metrics.http_req_duration?.p90 || 0).toFixed(2) +
        'ms';
    if (maxEl) maxEl.textContent = (metrics.http_req_duration?.max || 0).toFixed(2) + 'ms';

    // Network Timing breakdown
    const blockedEl = document.getElementById('modal-k6-blocked');
    const connEl = document.getElementById('modal-k6-connecting');
    const tlsEl = document.getElementById('modal-k6-tls');
    const sendEl = document.getElementById('modal-k6-sending');
    const waitEl = document.getElementById('modal-k6-waiting');
    const recvEl = document.getElementById('modal-k6-receiving');

    if (blockedEl) blockedEl.textContent = (metrics.http_req_blocked?.avg || 0).toFixed(2) + 'ms';
    if (connEl) connEl.textContent = (metrics.http_req_connecting?.avg || 0).toFixed(2) + 'ms';
    if (tlsEl) tlsEl.textContent = (metrics.http_req_tls_handshaking?.avg || 0).toFixed(2) + 'ms';
    if (sendEl) sendEl.textContent = (metrics.http_req_sending?.avg || 0).toFixed(2) + 'ms';
    if (waitEl) waitEl.textContent = (metrics.http_req_waiting?.avg || 0).toFixed(2) + 'ms';
    if (recvEl) recvEl.textContent = (metrics.http_req_receiving?.avg || 0).toFixed(2) + 'ms';

    // Data Transfer
    const recv = metrics.data_received?.count || 0;
    const sent = metrics.data_sent?.count || 0;
    const recvDataEl = document.getElementById('modal-k6-data-recv');
    const sentDataEl = document.getElementById('modal-k6-data-sent');
    const totalDataEl = document.getElementById('modal-k6-data-total');

    if (recvDataEl) recvDataEl.textContent = (recv / 1024).toFixed(2) + ' KB';
    if (sentDataEl) sentDataEl.textContent = (sent / 1024).toFixed(2) + ' KB';
    if (totalDataEl) totalDataEl.textContent = ((recv + sent) / 1024).toFixed(2) + ' KB';

    // Populate K6 Checks Details
    const checksList = document.getElementById('modal-k6-checks-list');
    if (checksList) {
      if (data.k6.root_group?.checks && data.k6.root_group.checks.length > 0) {
        checksList.innerHTML = data.k6.root_group.checks
          .map((check) => {
            const total = check.passes + check.fails;
            const rate = total > 0 ? ((check.passes / total) * 100).toFixed(1) : '100';
            const status = check.fails > 0 ? 'failed' : 'passed';
            return `
            <div class="check-item ${status}">
              <span class="check-name">${check.name}</span>
              <span class="check-result ${check.fails > 0 ? 'error' : 'success'}">
                ${check.passes} / ${total} (${rate}%)
              </span>
            </div>
          `;
          })
          .join('');
      } else if (Array.isArray(data.k6.checks)) {
        // Fallback for different K6 JSON structure
        checksList.innerHTML = data.k6.checks
          .map((check) => {
            const total = check.passes + check.fails;
            const rate = total > 0 ? ((check.passes / total) * 100).toFixed(1) : '100';
            const status = check.fails > 0 ? 'failed' : 'passed';
            return `
            <div class="check-item ${status}">
              <span class="check-name">${check.name}</span>
              <span class="check-result ${check.fails > 0 ? 'error' : 'success'}">
                ${check.passes} / ${total} (${rate}%)
              </span>
            </div>
          `;
          })
          .join('');
      } else {
        checksList.innerHTML = '<p style="color: var(--muted);">No check details available</p>';
      }
    }
  }

  console.log('✓ Modal dashboard initialized with data:', data);
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
