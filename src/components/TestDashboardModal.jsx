import { useEffect, useState } from 'react';
import './TestDashboardModal.css';

const TestDashboardModal = ({ isOpen, onClose }) => {
  const [jestData, setJestData] = useState(null);
  const [k6Data, setK6Data] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSuites, setExpandedSuites] = useState(false);
  const [expandedK6Details, setExpandedK6Details] = useState(false);

  const gistUsername = 'mcello23';
  const gistId = '357c72c8e92ae6cf7eaef887e076fc42';
  const gistFilename = 'k6-results.json';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      loadTestData();
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const loadTestData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([loadJestData(), loadK6Data()]);
    } catch (err) {
      console.error('Failed to load test data:', err);
      setError('Failed to load test data');
    } finally {
      setLoading(false);
    }
  };

  const loadJestData = () => {
    return new Promise((resolve, reject) => {
      if (window.TEST_RESULTS) {
        if (window.TEST_RESULTS.jest) setJestData(window.TEST_RESULTS.jest);
        if (window.TEST_RESULTS.metadata) setMetadata(window.TEST_RESULTS.metadata);
        resolve(window.TEST_RESULTS.jest);
        return;
      }

      const script = document.createElement('script');
      script.src = `/test-data.js?t=${Date.now()}`;
      script.onload = () => {
        if (window.TEST_RESULTS) {
          if (window.TEST_RESULTS.jest) setJestData(window.TEST_RESULTS.jest);
          if (window.TEST_RESULTS.metadata) setMetadata(window.TEST_RESULTS.metadata);
          resolve(window.TEST_RESULTS.jest);
        } else {
          reject(new Error('Jest data not found'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load test-data.js'));
      document.body.appendChild(script);
    });
  };

  const loadK6Data = async () => {
    try {
      const gistUrl = `https://gist.githubusercontent.com/${gistUsername}/${gistId}/raw/${gistFilename}?t=${Date.now()}`;
      const response = await fetch(gistUrl);
      if (!response.ok) throw new Error('Failed to fetch K6 data');
      const data = await response.json();
      setK6Data(data);
      return data;
    } catch (err) {
      console.warn('Failed to load K6 data from Gist, checking fallback', err);
      if (window.TEST_RESULTS && window.TEST_RESULTS.k6) {
        setK6Data(window.TEST_RESULTS.k6);
        return window.TEST_RESULTS.k6;
      }
      // Don't fail completely if K6 fails, just log it
      return null;
    }
  };

  if (!isOpen) return null;

  const renderJestStats = () => {
    if (!jestData)
      return (
        <div className="error-message">
          <p>No Jest data available</p>
        </div>
      );

    const testsPassed = Number(jestData.numPassedTests ?? 0);
    const testsFailed = Number(jestData.numFailedTests ?? 0);
    const testsTotal = Number(jestData.numTotalTests ?? 0);
    const testSuites = Number(jestData.numTotalTestSuites ?? jestData.numPassedTestSuites ?? 0);
    const passRate = testsTotal > 0 ? ((testsPassed / testsTotal) * 100).toFixed(2) : 100;
    const rate = jestData.passRate != null ? Number(jestData.passRate).toFixed(2) : passRate;

    return (
      <>
        <div className="test-stats">
          <div className="stat-item">
            <span className="stat-value success">{testSuites}</span>
            <span className="stat-label">Test Suites</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{testsTotal}</span>
            <span className="stat-label">Total Tests</span>
          </div>
          <div className="stat-item">
            <span className="stat-value success">{testsPassed}</span>
            <span className="stat-label">Passed</span>
          </div>
          <div className="stat-item">
            <span className={`stat-value ${testsFailed > 0 ? 'error' : 'success'}`}>
              {testsFailed}
            </span>
            <span className="stat-label">Failed</span>
          </div>
        </div>

        <div className="test-progress">
          <div className="progress-bar">
            <div
              className={`progress-fill ${Number(rate) >= 95 ? 'success' : Number(rate) >= 80 ? 'warning' : 'error'}`}
              style={{ width: `${rate}%` }}
            ></div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px',
              fontSize: '0.85rem',
              color: '#718096',
            }}
          >
            <span>Success Rate</span>
            <span style={{ fontWeight: 'bold', color: Number(rate) >= 95 ? '#48bb78' : '#ed8936' }}>
              {rate}%
            </span>
          </div>
        </div>

        {jestData.testSuites && jestData.testSuites.length > 0 && (
          <div className="test-suites-section">
            <button
              className={`expand-button ${expandedSuites ? 'expanded' : ''}`}
              onClick={() => setExpandedSuites(!expandedSuites)}
            >
              <i className="material-icons">expand_more</i>
              <span>
                View {testSuites} Test Suites ({testsTotal} tests)
              </span>
            </button>
            <div className={`suites-list ${expandedSuites ? 'show' : ''}`}>
              {jestData.testSuites.map((suite, index) => (
                <div key={index} className={`suite-item ${suite.status || 'passed'}`}>
                  <div className="suite-header">
                    <span className="suite-name" title={suite.name}>
                      {suite.name}
                    </span>
                    <span className="suite-stats">
                      <span className="badge success">{suite.numPassedTests || 0} passed</span>
                      {suite.numFailedTests > 0 && (
                        <span className="badge error">{suite.numFailedTests} failed</span>
                      )}
                      <span className="badge">{suite.numTests || 0} total</span>
                    </span>
                  </div>
                  {suite.duration && (
                    <div className="suite-duration">{(suite.duration / 1000).toFixed(2)}s</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  const renderK6Stats = () => {
    if (!k6Data || !k6Data.metrics)
      return (
        <div className="error-message">
          <p>No K6 data available</p>
        </div>
      );

    const metrics = k6Data.metrics || {};
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

    const httpReqFailed = metrics.http_req_failed?.rate || 0;
    const failureRate = (httpReqFailed * 100).toFixed(2);
    const successRate = (100 - httpReqFailed * 100).toFixed(2);

    const threshold =
      metrics.http_req_duration && metrics.http_req_duration.thresholds
        ? metrics.http_req_duration.thresholds['p(95)<2000']
        : false;

    // Detailed metrics
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
    const httpRate = metrics.http_reqs ? Number(metrics.http_reqs.rate).toFixed(2) : '0.00';
    const vusMax = metrics.vus_max?.max || metrics.vus_max?.value || metrics.vus?.value || null;
    const iterations = metrics.iterations?.count || null;
    const iterationDuration = metrics.iteration_duration?.avg || null;

    return (
      <>
        <div className="test-stats">
          <div className="stat-item">
            <span className="stat-value">{httpReqs}</span>
            <span className="stat-label">HTTP Requests</span>
          </div>
          <div className="stat-item">
            <span className={`stat-value ${Number(successRate) >= 95 ? 'success' : 'warning'}`}>
              {successRate}%
            </span>
            <span className="stat-label">Success Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{httpDuration}ms</span>
            <span className="stat-label">Avg Duration</span>
          </div>
          <div className="stat-item">
            <span className={`stat-value ${threshold ? 'success' : 'warning'}`}>
              {p95Duration}ms
            </span>
            <span className="stat-label">P95 Duration</span>
          </div>
          <div className="stat-item">
            <span className={`stat-value ${checksRate >= 95 ? 'success' : 'warning'}`}>
              {checksRate}%
            </span>
            <span className="stat-label">Checks Passing</span>
          </div>
        </div>
        <div className="test-details">
          <div className="detail-row">
            <span className="detail-label">✓ HTTP Success Rate:</span>
            <span className={`detail-value ${Number(successRate) >= 95 ? 'success' : 'warning'}`}>
              {successRate}%
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">✗ HTTP Failure Rate:</span>
            <span className={`detail-value ${Number(failureRate) > 5 ? 'error' : 'success'}`}>
              {failureRate}%
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">✓ Checks Passed:</span>
            <span className="detail-value success">{checksPass}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">✗ Checks Failed:</span>
            <span className={`detail-value ${checksFail > 0 ? 'error' : 'success'}`}>
              {checksFail}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Threshold (P95 &lt; 2000ms):</span>
            <span className={`detail-value ${threshold ? 'success' : 'error'}`}>
              {threshold ? 'PASS' : 'FAIL'}
            </span>
          </div>
        </div>
        <div className="test-progress">
          <div className="progress-bar">
            <div
              className={`progress-fill ${checksRate >= 95 ? 'success' : 'warning'}`}
              style={{ width: `${checksRate}%` }}
            ></div>
          </div>
        </div>

        <div className="k6-details-section">
          <button
            className={`expand-button ${expandedK6Details ? 'expanded' : ''}`}
            onClick={() => setExpandedK6Details(!expandedK6Details)}
          >
            <i className="material-icons">expand_more</i>
            <span>View Detailed Metrics</span>
          </button>
          <div className={`metrics-detail ${expandedK6Details ? 'show' : ''}`}>
            <div className="metric-group">
              <h4>Request Duration (ms)</h4>
              <div className="metric-row">
                <span className="metric-label">Min:</span>
                <span className="metric-value">{httpMin}ms</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Median:</span>
                <span className="metric-value">{httpMed}ms</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Average:</span>
                <span className="metric-value">{httpDuration}ms</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">P90:</span>
                <span className="metric-value">{p90Duration}ms</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">P95:</span>
                <span className={`metric-value ${threshold ? 'success' : 'warning'}`}>
                  {p95Duration}ms
                </span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Max:</span>
                <span className="metric-value">{httpMax}ms</span>
              </div>
            </div>
            <div className="metric-group">
              <h4>Test Configuration</h4>
              <div className="metric-row">
                <span className="metric-label">Total Requests:</span>
                <span className="metric-value">{httpReqs}</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Request Rate:</span>
                <span className="metric-value">{httpRate} req/s</span>
              </div>
              <div className="metric-row">
                <span className="metric-label">Success Rate:</span>
                <span
                  className={`metric-value ${Number(successRate) >= 95 ? 'success' : 'warning'}`}
                >
                  {successRate}%
                </span>
              </div>
              {vusMax !== null && (
                <div className="metric-row">
                  <span className="metric-label">Max Virtual Users:</span>
                  <span className="metric-value">{Math.round(vusMax)}</span>
                </div>
              )}
              {iterations !== null && (
                <div className="metric-row">
                  <span className="metric-label">Iterations:</span>
                  <span className="metric-value">{iterations}</span>
                </div>
              )}
              {iterationDuration !== null && (
                <div className="metric-row">
                  <span className="metric-label">Avg Iteration:</span>
                  <span className="metric-value">{Number(iterationDuration).toFixed(2)}ms</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className="test-dashboard-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dashboard-title"
    >
      <div className="test-dashboard-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="test-dashboard-modal-close"
          onClick={onClose}
          aria-label="Close dashboard"
        >
          <i className="material-icons">close</i>
        </button>

        <div className="test-dashboard-header">
          <div className="test-dashboard-title">
            <h3 id="dashboard-title">
              <i className="material-icons">dashboard</i>
              Test Results Dashboard
            </h3>
          </div>
          <div className="test-dashboard-meta">
            <span>
              <i
                className="material-icons"
                style={{ fontSize: '1rem', verticalAlign: 'text-bottom', marginRight: '4px' }}
              >
                schedule
              </i>
              {metadata?.timestamp
                ? new Date(metadata.timestamp).toLocaleString()
                : new Date().toLocaleTimeString()}
            </span>
            {metadata?.commit && (
              <span className="commit-hash">
                <i
                  className="material-icons"
                  style={{ fontSize: '1rem', verticalAlign: 'text-bottom', marginRight: '4px' }}
                >
                  commit
                </i>
                {metadata.commit}
              </span>
            )}
          </div>
        </div>

        <div className="test-results-grid">
          {/* Jest Results */}
          <div className="test-card jest-card">
            <div className="test-card-header">
              <h4>
                <i className="material-icons">check_circle</i> Jest Tests
              </h4>
            </div>
            <div className="test-card-body">
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading Jest results...</p>
                </div>
              ) : (
                renderJestStats()
              )}
            </div>
          </div>

          {/* K6 Performance Results */}
          <div className="test-card k6-card">
            <div className="test-card-header">
              <h4>
                <i className="material-icons">speed</i> K6 Performance
              </h4>
            </div>
            <div className="test-card-body">
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading K6 results...</p>
                </div>
              ) : (
                renderK6Stats()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboardModal;
