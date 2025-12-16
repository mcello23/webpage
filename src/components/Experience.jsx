const Experience = () => {
  return (
    <>
      {/* Recent Experience Banner */}
      <div
        className="parallax-container valign-wrapper parallax-experience"
        style={{ minHeight: '300px' }}
      >
        <div className="section no-pad-bot" style={{ width: '100%' }}>
          <div className="container">
            <div className="row center">
              <h3
                className="header col s12 white-text"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', fontWeight: 700 }}
              >
                Recent Experience
              </h3>
              <p
                className="flow-text white-text"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
              >
                Last 4 roles — SDET & QA Manager
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Experience */}
      <section
        id="experience"
        className="section"
        style={{ padding: '60px 0' }}
        aria-labelledby="experience-heading"
      >
        <div className="container">
          <h3 id="experience-heading" className="sr-only">
            Recent Experience
          </h3>
          <div className="row">
            <div className="col s12 m6 l3">
              <div className="card gradient-card">
                <div className="card-content">
                  <span className="card-title">
                    <b>Board International</b>
                  </span>
                  <p className="grey-text text-darken-1" style={{ fontSize: '0.9rem' }}>
                    <i>Senior QA Engineer</i>
                    <br />
                    May 2025 – Present | Madrid, Spain
                  </p>
                  <div className="highlight-box" style={{ borderLeftColor: '#1e88e5' }}>
                    • 5,000+ E2E tests in Azure DevOps (Cypress + TypeScript)
                  </div>
                  <div className="highlight-box" style={{ borderLeftColor: '#1e88e5' }}>
                    • 98% startup reduction (60s → instant) via webpack
                  </div>
                  <div className="highlight-box" style={{ borderLeftColor: '#1e88e5' }}>
                    • Step Decorators: debugging hours → seconds
                  </div>
                  <div className="highlight-box" style={{ borderLeftColor: '#1e88e5' }}>
                    • CI/CD pipeline optimization & infra improvements
                  </div>
                </div>
              </div>
            </div>

            <div className="col s12 m6 l3">
              <div className="card gradient-card">
                <div className="card-content">
                  <span className="card-title">
                    <b>Facephi Biometrics</b>
                  </span>
                  <p className="grey-text text-darken-1" style={{ fontSize: '0.9rem' }}>
                    <i>Senior QA Engineer</i>
                    <br />
                    Feb 2024 – Apr 2025 | Madrid, Spain
                  </p>
                  <div className="highlight-box" style={{ borderLeftColor: '#43a047' }}>
                    • Greenfield E2E (Cypress/Playwright, TypeScript)
                  </div>
                  <div className="highlight-box" style={{ borderLeftColor: '#43a047' }}>
                    • Suite time 25 min → 8 min (same tests)
                  </div>
                  <div className="highlight-box" style={{ borderLeftColor: '#43a047' }}>
                    • ID+Selfie flow: 1h manual → 1 min automated
                  </div>
                </div>
              </div>
            </div>

            <div className="col s12 m6 l3">
              <div className="card gradient-card">
                <div className="card-content">
                  <span className="card-title">
                    <b>Nespresso IoT (Nestlé)</b>
                  </span>
                  <p className="grey-text text-darken-1" style={{ fontSize: '0.9rem' }}>
                    <i>QA Manager</i>
                    <br />
                    Feb 2023 – Feb 2024 | Madrid, Spain
                  </p>
                  <div className="highlight-box" style={{ borderLeftColor: '#fb8c00' }}>
                    • Managed 8 testers (manual + automation)
                  </div>
                  <div className="highlight-box" style={{ borderLeftColor: '#fb8c00' }}>
                    • Bug guidelines, KPIs, expanded documentation
                  </div>
                  <div className="highlight-box" style={{ borderLeftColor: '#fb8c00' }}>
                    • Negative tests → customer issues down 30%
                  </div>
                </div>
              </div>
            </div>

            <div className="col s12 m6 l3">
              <div className="card gradient-card">
                <div className="card-content">
                  <span className="card-title">
                    <b>Apple (Siri)</b>
                  </span>
                  <p className="grey-text text-darken-1" style={{ fontSize: '0.9rem' }}>
                    <i>Automation Tester & Team Lead</i>
                    <br />
                    Oct 2020 – Feb 2023 | Madrid, Spain
                  </p>
                  <div className="highlight-box" style={{ borderLeftColor: '#8e24aa' }}>
                    • UST framework (Swift/Xcode) for Siri testing
                  </div>
                  <div className="highlight-box" style={{ borderLeftColor: '#8e24aa' }}>
                    • Trained team of 3, managed tasks & reviews
                  </div>
                  <div className="highlight-box" style={{ borderLeftColor: '#8e24aa' }}>
                    • NLP/ASR/Flow/Dialog testing across ecosystem
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /row */}
        </div>
      </section>
    </>
  );
};

export default Experience;
