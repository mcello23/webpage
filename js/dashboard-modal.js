/**
 * Test Dashboard Modal Logic
 * Handles the modal display, interaction, and data fetching from GitHub Gist
 */

// eslint-disable-next-line no-unused-vars -- Function is called from onclick attribute in HTML
function openTestDashboardModal() {
  const modal = document.getElementById('testDashboardModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Always refresh dashboard data when opening modal
  initializeModalDashboard();
}

function closeTestDashboardModal() {
  const modal = document.getElementById('testDashboardModal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// eslint-disable-next-line no-unused-vars -- Function is called from onclick attribute in HTML
function toggleModalSection(contentId) {
  const content = document.getElementById(contentId);
  const button = content.previousElementSibling.querySelector('.btn-collapse i');
  content.classList.toggle('collapsed');
  button.textContent = content.classList.contains('collapsed') ? 'expand_more' : 'expand_less';
}

// Close modal on ESC key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeTestDashboardModal();
  }
});

// Initialize Modal Dashboard
function initializeModalDashboard() {
  if (typeof window.TEST_RESULTS === 'undefined') {
    console.warn('No test data available');
    return;
  }

  const data = window.TEST_RESULTS;

  // Update Metadata
  if (data.metadata) {
    document.getElementById('modal-branch').textContent = data.metadata.branch || '-';
    document.getElementById('modal-commit').textContent = data.metadata.commit || '-';
    document.getElementById('modal-timestamp').textContent = data.metadata.timestamp
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

  document.getElementById('modal-total-tests').textContent = totalTests;
  document.getElementById('modal-pass-rate').textContent = passRate + '%';
  document.getElementById('modal-avg-duration').textContent = avgDuration + 's';
  document.getElementById('modal-coverage').textContent =
    coverage != null && coverage > 0 ? coverage.toFixed(1) + '%' : 'N/A';

  // Jest Metrics
  if (data.jest) {
    const jestDuration = data.jest.avgDuration ? (data.jest.avgDuration / 1000).toFixed(2) : '0';
    document.getElementById('modal-jest-suites').textContent = data.jest.numTotalTestSuites || 0;
    document.getElementById('modal-jest-passed').textContent = data.jest.numPassedTests || 0;
    document.getElementById('modal-jest-failed').textContent = data.jest.numFailedTests || 0;
    document.getElementById('modal-jest-rate').textContent = (data.jest.passRate || passRate) + '%';
    document.getElementById('modal-jest-duration').textContent = jestDuration + 's';

    // Populate Jest Suites Details
    const suitesList = document.getElementById('modal-jest-suites-list');
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

  // K6 Metrics
  if (data.k6?.metrics) {
    const metrics = data.k6.metrics;
    const rate = metrics.http_reqs?.rate ? Number(metrics.http_reqs.rate).toFixed(2) : '0';

    document.getElementById('modal-k6-requests').textContent = metrics.http_reqs?.count || 0;
    document.getElementById('modal-k6-rate').textContent = rate + ' req/s';
    document.getElementById('modal-k6-avg').textContent =
      (metrics.http_req_duration?.avg || 0).toFixed(2) + 'ms';
    document.getElementById('modal-k6-p95').textContent =
      (metrics.http_req_duration?.['p(95)'] || metrics.http_req_duration?.p95 || 0).toFixed(2) +
      'ms';

    const checksPass = metrics.checks?.passes || 0;
    const checksTotal = checksPass + (metrics.checks?.fails || 0);
    const checksRate = checksTotal > 0 ? ((checksPass / checksTotal) * 100).toFixed(1) : '100';
    document.getElementById('modal-k6-checks').textContent = checksRate + '%';

    // Duration breakdown
    document.getElementById('modal-k6-min').textContent =
      (metrics.http_req_duration?.min || 0).toFixed(2) + 'ms';
    document.getElementById('modal-k6-med').textContent =
      (metrics.http_req_duration?.med || 0).toFixed(2) + 'ms';
    document.getElementById('modal-k6-p90').textContent =
      (metrics.http_req_duration?.['p(90)'] || metrics.http_req_duration?.p90 || 0).toFixed(2) +
      'ms';
    document.getElementById('modal-k6-max').textContent =
      (metrics.http_req_duration?.max || 0).toFixed(2) + 'ms';

    // Network Timing breakdown
    document.getElementById('modal-k6-blocked').textContent =
      (metrics.http_req_blocked?.avg || 0).toFixed(2) + 'ms';
    document.getElementById('modal-k6-connecting').textContent =
      (metrics.http_req_connecting?.avg || 0).toFixed(2) + 'ms';
    document.getElementById('modal-k6-tls').textContent =
      (metrics.http_req_tls_handshaking?.avg || 0).toFixed(2) + 'ms';
    document.getElementById('modal-k6-sending').textContent =
      (metrics.http_req_sending?.avg || 0).toFixed(2) + 'ms';
    document.getElementById('modal-k6-waiting').textContent =
      (metrics.http_req_waiting?.avg || 0).toFixed(2) + 'ms';
    document.getElementById('modal-k6-receiving').textContent =
      (metrics.http_req_receiving?.avg || 0).toFixed(2) + 'ms';

    // Data Transfer
    const recv = metrics.data_received?.count || 0;
    const sent = metrics.data_sent?.count || 0;
    document.getElementById('modal-k6-data-recv').textContent = (recv / 1024).toFixed(2) + ' KB';
    document.getElementById('modal-k6-data-sent').textContent = (sent / 1024).toFixed(2) + ' KB';
    document.getElementById('modal-k6-data-total').textContent =
      ((recv + sent) / 1024).toFixed(2) + ' KB';

    // Populate K6 Checks Details
    const checksList = document.getElementById('modal-k6-checks-list');
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

  console.log('✓ Modal dashboard initialized with data:', data);
}

// Fetch K6 data from Gist to get latest results
async function fetchK6DataFromGist() {
  const gistId = '357c72c8e92ae6cf7eaef887e076fc42';
  const gistUsername = 'mcello23';
  const gistFilename = 'k6-results.json';
  const gistUrl = `https://gist.githubusercontent.com/${gistUsername}/${gistId}/raw/${gistFilename}`;

  try {
    const response = await fetch(gistUrl + '?t=' + Date.now()); // Cache bust
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    if (typeof window !== 'undefined') {
      if (!window.TEST_RESULTS) window.TEST_RESULTS = {};
      window.TEST_RESULTS.k6 = data;
      console.log('✓ Loaded fresh K6 data from Gist');

      // If modal is open, refresh it
      const modal = document.getElementById('testDashboardModal');
      if (modal && modal.style.display === 'flex') {
        initializeModalDashboard();
      }
    }
  } catch (error) {
    console.warn('Failed to fetch K6 data from Gist, using static fallback:', error);
  }
}

// Load data on page load
document.addEventListener('DOMContentLoaded', fetchK6DataFromGist);
