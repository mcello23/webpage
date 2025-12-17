const Hero = () => {
  return (
    <>
      <div style={{ marginTop: '80px' }}></div>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12">
              <div className="center-align" style={{ marginBottom: '30px' }}>
                <img
                  className="circle responsive-img"
                  src="/images/assets/DSC_9554-optimized.webp"
                  srcSet="/images/assets/DSC_9554-optimized.webp 1x, /images/assets/DSC_9554.jpg 2x"
                  alt="Portrait of Marcelo Costa"
                  width="180"
                  height="180"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  style={{
                    maxWidth: '180px',
                    border: '5px solid #667eea',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                  }}
                />
                <h2
                  style={{
                    marginTop: '20px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    fontSize: '2.4rem',
                  }}
                >
                  Marcelo Costa
                </h2>
                <p
                  style={{
                    color: '#4f58b5',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    margin: '6px 0 12px',
                  }}
                >
                  Senior QA Engineer & SDET — scalable E2E frameworks (Cypress/Playwright), CI/CD,
                  test architecture
                </p>
                <p
                  className="flag-span"
                  aria-label="Based in Spain, trilingual in English, Portuguese and Spanish"
                  style={{ color: '#666', fontSize: '1.05rem' }}
                >
                  <span>Madrid, Spain</span>{' '}
                  <span role="img" aria-label="Spain flag">
                    🇪🇸
                  </span>{' '}
                  • Trilingual: English • Portuguese • Spanish
                </p>
              </div>

              {/* Quick Impact */}
              <div className="intro-card" aria-labelledby="impact-heading">
                <h3 id="impact-heading">⚡ Quick Impact Metrics</h3>
                <div className="intro-stats" role="list">
                  <div className="stat-item" role="listitem">
                    <strong>5,000+</strong>
                    <span>E2E tests maintained daily (Board)</span>
                  </div>
                  <div className="stat-item" role="listitem">
                    <strong>98%</strong>
                    <span>Startup time cut (60s → instant) via webpack (Board)</span>
                  </div>
                  <div className="stat-item" role="listitem">
                    <strong>25 → 8 min</strong>
                    <span>Suite execution reduction (Facephi)</span>
                  </div>
                  <div className="stat-item" role="listitem">
                    <strong>30%</strong>
                    <span>Customer issues reduced via negative testing (Nespresso)</span>
                  </div>
                </div>
              </div>

              {/* What I Do */}
              <div className="intro-card">
                <h3>🎯 What I Do</h3>
                <div className="row">
                  <div className="col s12 m6">
                    <ul style={{ lineHeight: 2, fontSize: '1.05rem' }} role="list">
                      <li role="listitem">
                        <strong>E2E Test Automation:</strong> Cypress, Playwright,
                        TypeScript/JavaScript
                      </li>
                      <li role="listitem">
                        <strong>Performance Tuning:</strong> Webpack optimization, race-condition
                        fixes
                      </li>
                      <li role="listitem">
                        <strong>CI/CD Pipelines:</strong> Azure DevOps, GitHub Actions, ArgoCD
                      </li>
                      <li role="listitem">
                        <strong>Mobile Testing:</strong> Appium, XCTest, Selenium, WebdriverIO
                      </li>
                    </ul>
                  </div>
                  <div className="col s12 m6">
                    <ul style={{ lineHeight: 2, fontSize: '1.05rem' }} role="list">
                      <li role="listitem">
                        <strong>BDD Frameworks:</strong> Cucumber/Gherkin for readable tests
                      </li>
                      <li role="listitem">
                        <strong>API Testing:</strong> Postman, GraphQL, REST validation
                      </li>
                      <li role="listitem">
                        <strong>Team Leadership:</strong> Mentoring, sprint presentations, KPIs
                      </li>
                      <li role="listitem">
                        <strong>Release Management:</strong> Dev → Staging → Production
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Board Achievements */}
              <div
                className="intro-card"
                style={{
                  background: 'linear-gradient(135deg, var(--brand-1) 0%, var(--brand-2) 100%)',
                  color: '#fff',
                }}
              >
                <h3 style={{ color: '#fff' }}>🎯 2025 Achievements at Board International</h3>
                <ul
                  style={{
                    lineHeight: 2.1,
                    fontSize: '1.05rem',
                    listStyle: 'none',
                    paddingLeft: 0,
                  }}
                  role="list"
                >
                  <li
                    role="listitem"
                    className="highlight-box"
                    style={{ background: 'rgba(255, 255, 255, 0.15)', borderLeftColor: '#fff' }}
                  >
                    <strong>⚡ Performance:</strong> 98% reduction in test startup via webpack
                    refactor (60s → instant)
                  </li>
                  <li
                    role="listitem"
                    className="highlight-box"
                    style={{ background: 'rgba(255, 255, 255, 0.15)', borderLeftColor: '#fff' }}
                  >
                    <strong>🔧 DX:</strong> Step Decorators → debugging hours → seconds across
                    suites
                  </li>
                  <li
                    role="listitem"
                    className="highlight-box"
                    style={{ background: 'rgba(255, 255, 255, 0.15)', borderLeftColor: '#fff' }}
                  >
                    <strong>📊 Scale:</strong> Maintaining & optimizing 5,000+ E2E tests in Azure
                    DevOps
                  </li>
                  <li
                    role="listitem"
                    className="highlight-box"
                    style={{ background: 'rgba(255, 255, 255, 0.15)', borderLeftColor: '#fff' }}
                  >
                    <strong>🚀 CI/CD:</strong> Ongoing pipeline parallelization & modernization
                  </li>
                </ul>
                <div style={{ textAlign: 'center', marginTop: '12px', opacity: 0.95 }}>
                  <p style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                    Now: Senior QA Engineer focusing on flake reduction and pipeline acceleration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
