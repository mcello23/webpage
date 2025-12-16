const Articles = () => {
  return (
    <>
      {/* Articles Banner */}
      <div
        className="parallax-container valign-wrapper parallax-articles"
        style={{ minHeight: '250px' }}
      >
        <div className="section no-pad-bot" style={{ width: '100%' }}>
          <div className="container">
            <div className="row center">
              <h3
                className="header col s12 white-text"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', fontWeight: 700 }}
              >
                Articles & Writing
              </h3>
              <p
                className="flow-text white-text"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
              >
                Technical publications and best practices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles */}
      <section
        id="articles"
        className="section"
        style={{ padding: '60px 0', background: '#f9fafb' }}
        aria-labelledby="articles-heading"
      >
        <div className="container">
          <h3 id="articles-heading" className="sr-only">
            Articles & Writing
          </h3>
          <div className="row">
            {/* Article 1 */}
            <div className="col s12 m6 l4">
              <div className="card gradient-card" style={{ height: '100%' }}>
                <div className="card-image">
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      padding: '60px 20px',
                      textAlign: 'center',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ fontSize: '80px', color: '#fff' }}
                      aria-hidden="true"
                    >
                      code
                    </i>
                    <h5
                      className="white-text"
                      style={{ marginTop: '10px', fontWeight: 600, fontSize: '1.5rem' }}
                    >
                      GraphQL + Cypress
                    </h5>
                  </div>
                </div>
                <div className="card-content">
                  <h5 style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1.2rem' }}>
                    How to integrate Hasura GraphQL hooks into your E2E tests
                  </h5>
                  <p className="grey-text" style={{ margin: '15px 0', lineHeight: 1.7 }}>
                    Use Hasura + custom Cypress commands to keep tests isolated and deterministic.
                    Code examples + best practices.
                  </p>
                  <div style={{ marginTop: '15px' }}>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #43a047, #2e7d32)',
                      }}
                    >
                      GraphQL
                    </span>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #43a047, #2e7d32)',
                      }}
                    >
                      Hasura
                    </span>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #43a047, #2e7d32)',
                      }}
                    >
                      Cypress
                    </span>
                  </div>
                </div>
                <div className="card-action">
                  <a
                    className="btn waves-effect waves-light teal"
                    href="https://medium.com/@marcelocosta_72783/how-to-integrate-hasura-graphql-hooks-into-your-e2e-tests-with-cypress-284e5bfc6d81"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: '100%' }}
                  >
                    <i className="fab fa-medium left" aria-hidden="true"></i>Read on Medium
                  </a>
                </div>
              </div>
            </div>

            {/* Article 2 */}
            <div className="col s12 m6 l4">
              <div className="card gradient-card" style={{ height: '100%' }}>
                <div className="card-image">
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
                      padding: '60px 20px',
                      textAlign: 'center',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ fontSize: '80px', color: '#fff' }}
                      aria-hidden="true"
                    >
                      lock_open
                    </i>
                    <h5
                      className="white-text"
                      style={{ marginTop: '10px', fontWeight: 600, fontSize: '1.5rem' }}
                    >
                      Auth0 + Cypress
                    </h5>
                  </div>
                </div>
                <div className="card-content">
                  <h5 style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1.2rem' }}>
                    Speeding up Cypress tests with Auth0 login optimization
                  </h5>
                  <p className="grey-text" style={{ margin: '15px 0', lineHeight: 1.7 }}>
                    Token caching and session strategies to accelerate authenticated E2E tests.
                  </p>
                  <div style={{ marginTop: '15px' }}>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #1e88e5, #1565c0)',
                      }}
                    >
                      Auth0
                    </span>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #1e88e5, #1565c0)',
                      }}
                    >
                      Cypress
                    </span>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #1e88e5, #1565c0)',
                      }}
                    >
                      Performance
                    </span>
                  </div>
                </div>
                <div className="card-action">
                  <a
                    className="btn waves-effect waves-light"
                    style={{ background: '#0077b5', width: '100%' }}
                    href="https://www.linkedin.com/pulse/speeding-un-cypress-tests-auth0-login-across-specs-marcelo-costa-dg8ac/?trackingId=8vzDVXQnSX2gz8UWvjFgvg%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin left" aria-hidden="true"></i>View on LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Article 3 */}
            <div className="col s12 m6 l4">
              <div className="card gradient-card" style={{ height: '100%' }}>
                <div className="card-image">
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #0a0a0a 0%, #2d2d2d 100%)',
                      padding: '60px 20px',
                      textAlign: 'center',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ fontSize: '80px', color: '#fff' }}
                      aria-hidden="true"
                    >
                      psychology
                    </i>
                    <h5
                      className="white-text"
                      style={{ marginTop: '10px', fontWeight: 600, fontSize: '1.5rem' }}
                    >
                      AI + Cypress
                    </h5>
                  </div>
                </div>
                <div className="card-content">
                  <h5 style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1.2rem' }}>
                    How Cypress Will Revolutionize AI in Testing with cy.prompt()
                  </h5>
                  <p className="grey-text" style={{ margin: '15px 0', lineHeight: 1.7 }}>
                    Discover how cy.prompt() integrates AI-powered test generation directly into
                    Cypress, transforming the future of test automation.
                  </p>
                  <div style={{ marginTop: '15px' }}>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      }}
                    >
                      AI Testing
                    </span>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      }}
                    >
                      Cypress
                    </span>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      }}
                    >
                      Cyprompt
                    </span>
                  </div>
                </div>
                <div className="card-action">
                  <a
                    className="btn waves-effect waves-light"
                    style={{ background: '#0a0a0a', width: '100%' }}
                    href="https://dev.to/marcelo_sqe/how-cypress-will-revolutionize-the-use-of-ai-in-testing-with-cyprompt-fe9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-dev left" aria-hidden="true"></i>Read on Dev.to
                  </a>
                </div>
              </div>
            </div>

            {/* Article 4 */}
            <div className="col s12 m6 l4">
              <div className="card gradient-card" style={{ height: '100%' }}>
                <div className="card-image">
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                      padding: '60px 20px',
                      textAlign: 'center',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ fontSize: '80px', color: '#fff' }}
                      aria-hidden="true"
                    >
                      lightbulb
                    </i>
                    <h5
                      className="white-text"
                      style={{ marginTop: '10px', fontWeight: 600, fontSize: '1.5rem' }}
                    >
                      cy.prompt() Tips
                    </h5>
                  </div>
                </div>
                <div className="card-content">
                  <h5 style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1.2rem' }}>
                    How to get most out of cy.prompt()
                  </h5>
                  <p className="grey-text" style={{ margin: '15px 0', lineHeight: 1.7 }}>
                    6 tips and tricks to maximize your AI-powered testing with cy.prompt() in
                    Cypress. Learn best practices for leveraging this new AI tool.
                  </p>
                  <div style={{ marginTop: '15px' }}>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
                      }}
                    >
                      AI Tips
                    </span>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
                      }}
                    >
                      cy.prompt()
                    </span>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
                      }}
                    >
                      Best Practices
                    </span>
                  </div>
                </div>
                <div className="card-action">
                  <a
                    className="btn waves-effect waves-light"
                    style={{ background: '#0a0a0a', width: '100%' }}
                    href="https://dev.to/cypress/how-to-get-most-out-of-cyprompt-6-tips-and-tricks-for-your-new-ai-tool-425l"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-dev left" aria-hidden="true"></i>Read on Dev.to
                  </a>
                </div>
              </div>
            </div>

            {/* Article 5 */}
            <div className="col s12 m6 l4">
              <div className="card gradient-card" style={{ height: '100%' }}>
                <div className="card-image">
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #26a69a 0%, #00897b 100%)',
                      padding: '60px 20px',
                      textAlign: 'center',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ fontSize: '80px', color: '#fff' }}
                      aria-hidden="true"
                    >
                      table_chart
                    </i>
                    <h5
                      className="white-text"
                      style={{ marginTop: '10px', fontWeight: 600, fontSize: '1.5rem' }}
                    >
                      Excel Validation
                    </h5>
                  </div>
                </div>
                <div className="card-content">
                  <h5 style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '1.2rem' }}>
                    How to validate tables, rows or any content of an Excel file using Cypress
                  </h5>
                  <p className="grey-text" style={{ margin: '15px 0', lineHeight: 1.7 }}>
                    Master Excel file validation in E2E tests. Learn to parse, validate, and assert
                    tables, rows, and any content directly in your Cypress tests with practical
                    examples.
                  </p>
                  <div style={{ marginTop: '15px' }}>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #26a69a, #00897b)',
                      }}
                    >
                      File Handling
                    </span>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #26a69a, #00897b)',
                      }}
                    >
                      XLSX
                    </span>
                    <span
                      className="skill-tag"
                      style={{
                        fontSize: '0.75rem',
                        padding: '5px 12px',
                        background: 'linear-gradient(135deg, #26a69a, #00897b)',
                      }}
                    >
                      Cypress
                    </span>
                  </div>
                </div>
                <div className="card-action">
                  <a
                    className="btn waves-effect waves-light"
                    style={{ background: '#0a0a0a', width: '100%' }}
                    href="https://dev.to/cypress/how-to-validate-a-content-of-an-xlsx-file-using-cypress-45da"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-dev left" aria-hidden="true"></i>Read on Dev.to
                  </a>
                </div>
              </div>
            </div>

            {/* More Articles */}
            <div className="col s12 m6 l4">
              <div
                className="card gradient-card"
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                }}
              >
                <div className="card-content center-align">
                  <i
                    className="material-icons"
                    style={{ fontSize: '100px', color: '#667eea', marginBottom: '20px' }}
                    aria-hidden="true"
                  >
                    article
                  </i>
                  <h5 style={{ fontWeight: 700, color: 'var(--ink)' }}>
                    More Articles Coming Soon
                  </h5>
                  <p className="grey-text" style={{ margin: '15px 0', lineHeight: 1.7 }}>
                    Follow for deep dives on modern testing, CI/CD, and test architecture.
                  </p>
                  <div style={{ marginTop: '15px' }}>
                    <a
                      className="btn waves-effect waves-light"
                      style={{ background: '#008454', margin: '5px', display: 'inline-block' }}
                      href="https://medium.com/@marcelocosta_72783"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-medium left" aria-hidden="true"></i>Medium
                    </a>
                    <a
                      className="btn waves-effect waves-light"
                      style={{ background: '#0a0a0a', margin: '5px', display: 'inline-block' }}
                      href="https://dev.to/marcelo_sqe"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-dev left" aria-hidden="true"></i>Dev.to
                    </a>
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

export default Articles;
