import { useEffect } from 'react';
import '../styles/frameworks.css';

const Frameworks = () => {
  useEffect(() => {
    // Initialize Materialize components
    if (window.M) {
      window.M.AutoInit();
    }
  }, []);

  return (
    <div>
      <div style={{ marginTop: '80px' }}></div>

      <div className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="row center">
            <h3 className="header col s12 dark" style={{ marginBottom: '40px' }}>
              Enterprise Testing Frameworks & Automation
            </h3>
            <p className="flow-text grey-text text-darken-3">
              Comprehensive testing solutions with advanced CI/CD integration, automated reporting,
              and enterprise-grade validation
            </p>
          </div>
        </div>
      </div>

      <div className="parallax-container valign-wrapper hero-playwright">
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
              radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 70px 70px, 30px 30px',
            animation: 'float 20s ease-in-out infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '100px',
            height: '100px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            transform: 'rotate(45deg)',
            animation: 'spin 30s linear infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '60px',
            height: '60px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        ></div>
        <div className="section no-pad-bot" style={{ position: 'relative', zIndex: 10 }}>
          <div className="container">
            <div className="row center">
              <h3
                className="header col s12 white-text text-lighten-2"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
              >
                🎭 Advanced Playwright Testing
              </h3>
              <p
                className="flow-text white-text"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
              >
                Cross-browser • Visual Regression • API Validation
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '80px 0' }}>
        <br />
        <div className="row">
          <div className="col s12">
            <div
              className="card"
              style={{
                background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
                borderRadius: '15px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
              }}
            >
              <div className="card-content" style={{ padding: '40px 30px' }}>
                {/* Header */}
                <div className="center-align" style={{ marginBottom: '40px' }}>
                  <h5 className="cyan-text text-darken-3" style={{ marginBottom: '10px' }}>
                    <i
                      className="material-icons"
                      style={{ verticalAlign: 'middle', fontSize: '36px' }}
                    >
                      verified_user
                    </i>
                    <b> Identity Verification Platform</b>
                  </h5>
                  <p className="flow-text grey-text text-darken-3">
                    Enterprise-Grade E2E Testing with TypeScript
                  </p>
                </div>

                {/* Main Capabilities Grid */}
                <div className="row" style={{ marginBottom: '30px' }}>
                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #00bcd4',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny cyan-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          security
                        </i>
                        <b>Auth:</b> OAuth2, SAML, JWT
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #00bcd4',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny cyan-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          bar_chart
                        </i>
                        <b>Real-time:</b> WebSocket testing
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #00bcd4',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny cyan-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          theater_comedy
                        </i>
                        <b>Multi-persona:</b> Role workflows
                      </p>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #26a69a',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny teal-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          language
                        </i>
                        <b>i18n:</b> Unicode, RTL
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #26a69a',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny teal-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          smartphone
                        </i>
                        <b>Responsive:</b> Mobile viewports
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #26a69a',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny teal-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          casino
                        </i>
                        <b>Test Data:</b> Faker.js
                      </p>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #e91e63',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny pink-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          public
                        </i>
                        <b>API:</b> REST & GraphQL
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #e91e63',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny pink-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          photo_camera
                        </i>
                        <b>Visual AI:</b> Percy integration
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #e91e63',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny pink-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          speed
                        </i>
                        <b>Performance:</b> Lighthouse
                      </p>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #00acc1',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny cyan-text text-darken-1"
                          style={{ verticalAlign: 'middle' }}
                        >
                          storage
                        </i>
                        <b>Database:</b> Direct queries
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #00acc1',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny cyan-text text-darken-1"
                          style={{ verticalAlign: 'middle' }}
                        >
                          api
                        </i>
                        <b>API-First:</b> Data validation
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #00acc1',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny cyan-text text-darken-1"
                          style={{ verticalAlign: 'middle' }}
                        >
                          check_circle
                        </i>
                        <b>UI Validation:</b> Visual checks
                      </p>
                    </div>
                  </div>
                </div>

                {/* Test Data Factory Pattern Section */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #b2dfdb 0%, #80cbc4 100%)',
                    padding: '25px',
                    borderRadius: '10px',
                    marginTop: '30px',
                  }}
                >
                  <h5
                    className="center-align teal-text text-darken-3"
                    style={{ marginBottom: '25px' }}
                  >
                    <i className="material-icons" style={{ verticalAlign: 'middle' }}>
                      factory
                    </i>
                    <b> Test Data Factory Pattern</b>
                  </h5>

                  <div className="row" style={{ marginBottom: 0 }}>
                    <div className="col s12 m4">
                      <div className="center-align">
                        <i className="material-icons medium teal-text text-darken-2">data_object</i>
                        <h6 className="teal-text text-darken-3" style={{ margin: '10px 0 5px 0' }}>
                          <b>Dynamic Generation</b>
                        </h6>
                        <p style={{ fontSize: '15px', margin: 0 }}>
                          Realistic test data with Faker.js
                        </p>
                      </div>
                    </div>

                    <div className="col s12 m4">
                      <div className="center-align">
                        <i className="material-icons medium teal-text text-darken-2">api</i>
                        <h6 className="teal-text text-darken-3" style={{ margin: '10px 0 5px 0' }}>
                          <b>API-First Testing</b>
                        </h6>
                        <p style={{ fontSize: '15px', margin: 0 }}>
                          Validates API before UI verification
                        </p>
                      </div>
                    </div>

                    <div className="col s12 m4">
                      <div className="center-align">
                        <i className="material-icons medium teal-text text-darken-2">
                          check_circle
                        </i>
                        <h6 className="teal-text text-darken-3" style={{ margin: '10px 0 5px 0' }}>
                          <b>UI Validation</b>
                        </h6>
                        <p style={{ fontSize: '15px', margin: 0 }}>
                          Automated visual & data binding tests
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="center-align" style={{ marginTop: '35px' }}>
                  <a
                    href="https://github.com/mcello23/playwright-demonstration"
                    className="btn-large waves-effect waves-light cyan darken-2"
                    style={{
                      padding: '0 50px',
                      borderRadius: '25px',
                      boxShadow: '0 4px 15px rgba(0, 188, 212, 0.3)',
                    }}
                  >
                    <i className="material-icons left">code</i>Explore Repository
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div
        className="parallax-container valign-wrapper"
        style={{
          minHeight: '30vh',
          background: 'linear-gradient(135deg, #4caf50 0%, #1b5e20 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(45deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            animation: 'slide 15s linear infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: 0,
            height: 0,
            borderLeft: '30px solid transparent',
            borderRight: '30px solid transparent',
            borderBottom: '50px solid rgba(255, 255, 255, 0.1)',
            animation: 'bounce 5s ease-in-out infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '20%',
            width: '80px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.1)',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            animation: 'rotate 8s ease-in-out infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            width: '40px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.1)',
            transform: 'rotate(45deg)',
            animation: 'float 6s ease-in-out infinite',
          }}
        ></div>
        <div className="section no-pad-bot" style={{ position: 'relative', zIndex: 10 }}>
          <div className="container">
            <div className="row center">
              <h3
                className="header col s12 white-text text-lighten-2"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
              >
                🌿 Enterprise Cypress Testing
              </h3>
              <p
                className="flow-text white-text"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
              >
                BDD • GraphQL • Docker • CI/CD
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '80px 0' }}>
        <br />
        <div className="row">
          <div className="col s12">
            <div
              className="card"
              style={{
                background: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)',
                borderRadius: '15px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
              }}
            >
              <div className="card-content" style={{ padding: '40px 30px' }}>
                {/* Header */}
                <div className="center-align" style={{ marginBottom: '40px' }}>
                  <h5 className="green-text text-darken-3" style={{ marginBottom: '10px' }}>
                    <i
                      className="material-icons"
                      style={{ verticalAlign: 'middle', fontSize: '36px' }}
                    >
                      account_balance
                    </i>
                    <b> KYB Platform Automation</b>
                  </h5>
                  <p className="flow-text grey-text text-darken-3">
                    Behavior-Driven Development with Real-World Integration
                  </p>
                </div>

                {/* Main Capabilities Grid */}
                <div className="row" style={{ marginBottom: '30px' }}>
                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #4caf50',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny green-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          description
                        </i>
                        <b>Documents:</b> e-signatures
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #4caf50',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny green-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          groups
                        </i>
                        <b>User Mgmt:</b> Bulk ops, roles
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #4caf50',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny green-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          gavel
                        </i>
                        <b>Regulatory:</b> KYB/KYC, AML
                      </p>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #00bcd4',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny cyan-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          email
                        </i>
                        <b>Comms:</b> MailSlurp, Twilio
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #00bcd4',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny cyan-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          attach_money
                        </i>
                        <b>Financial:</b> Payment processing
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #00bcd4',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny cyan-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          casino
                        </i>
                        <b>Test Data:</b> Faker.js, Chance.js
                      </p>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #9c27b0',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny purple-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          sync_alt
                        </i>
                        <b>GraphQL & REST:</b> Hasura
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #9c27b0',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny purple-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          flag
                        </i>
                        <b>Feature Flags:</b> LaunchDarkly
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #9c27b0',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny purple-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          dns
                        </i>
                        <b>Containerized:</b> Docker
                      </p>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #ff9800',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny orange-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          insert_chart
                        </i>
                        <b>Reporting:</b> Allure, dashboards
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #ff9800',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny orange-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          sync
                        </i>
                        <b>Real-time:</b> Live data sync
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #ff9800',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny orange-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          account_tree
                        </i>
                        <b>Workflows:</b> Complex flows
                      </p>
                    </div>
                  </div>
                </div>

                {/* BDD Pattern Section */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)',
                    padding: '25px',
                    borderRadius: '10px',
                    marginTop: '30px',
                  }}
                >
                  <h5
                    className="center-align green-text text-darken-3"
                    style={{ marginBottom: '25px' }}
                  >
                    <i className="material-icons" style={{ verticalAlign: 'middle' }}>
                      integration_instructions
                    </i>
                    <b> Behavior-Driven Development Pattern</b>
                  </h5>

                  <div className="row" style={{ marginBottom: 0 }}>
                    <div className="col s12 m6 l3">
                      <div className="center-align">
                        <i className="material-icons medium green-text text-darken-2">
                          business_center
                        </i>
                        <h6 className="green-text text-darken-3" style={{ margin: '10px 0 5px 0' }}>
                          <b>Gherkin Syntax</b>
                        </h6>
                        <p style={{ fontSize: '15px', margin: 0 }}>Business-readable scenarios</p>
                      </div>
                    </div>

                    <div className="col s12 m6 l3">
                      <div className="center-align">
                        <i className="material-icons medium green-text text-darken-2">sync</i>
                        <h6 className="green-text text-darken-3" style={{ margin: '10px 0 5px 0' }}>
                          <b>Real-Time Tests</b>
                        </h6>
                        <p style={{ fontSize: '15px', margin: 0 }}>GraphQL subscriptions testing</p>
                      </div>
                    </div>

                    <div className="col s12 m6 l3">
                      <div className="center-align">
                        <i className="material-icons medium green-text text-darken-2">
                          account_tree
                        </i>
                        <h6 className="green-text text-darken-3" style={{ margin: '10px 0 5px 0' }}>
                          <b>Complex Workflows</b>
                        </h6>
                        <p style={{ fontSize: '15px', margin: 0 }}>Multi-step registration flows</p>
                      </div>
                    </div>

                    <div className="col s12 m6 l3">
                      <div className="center-align">
                        <i className="material-icons medium green-text text-darken-2">
                          verified_user
                        </i>
                        <h6 className="green-text text-darken-3" style={{ margin: '10px 0 5px 0' }}>
                          <b>Living Docs</b>
                        </h6>
                        <p style={{ fontSize: '15px', margin: 0 }}>Auto-validated documentation</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="center-align" style={{ marginTop: '35px' }}>
                  <a
                    href="https://github.com/mcello23/cypress-automation-real-proj"
                    className="btn-large waves-effect waves-light green darken-2"
                    style={{
                      padding: '0 50px',
                      borderRadius: '25px',
                      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                    }}
                  >
                    <i className="material-icons left">integration_instructions</i>View Enterprise
                    Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div
        className="parallax-container valign-wrapper"
        style={{
          minHeight: '30vh',
          background: 'linear-gradient(135deg, #2196f3 0%, #0d47a1 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.03) 0px,
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px,
                transparent 40px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.03) 0px,
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px,
                transparent 40px
              )
            `,
            animation: 'matrix 25s linear infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '120px',
            height: '120px',
            border: '3px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            transform: 'rotate(15deg)',
            animation: 'spin-slow 40s linear infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '8%',
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.1)',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '75%',
            width: '20px',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            animation: 'glow 4s ease-in-out infinite',
          }}
        ></div>
        <div className="section no-pad-bot" style={{ position: 'relative', zIndex: 10 }}>
          <div className="container">
            <div className="row center">
              <h3
                className="header col s12 white-text text-lighten-2"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
              >
                🔐 Identity Platform Builder
              </h3>
              <p
                className="flow-text white-text"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
              >
                GitHub Actions • Docker • Nightly Testing
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '80px 0' }}>
        <br />
        <div className="row">
          <div className="col s12">
            <div
              className="card"
              style={{
                background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)',
                borderRadius: '15px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
              }}
            >
              <div className="card-content" style={{ padding: '40px 30px' }}>
                {/* Header */}
                <div className="center-align" style={{ marginBottom: '40px' }}>
                  <h5 className="indigo-text text-darken-3" style={{ marginBottom: '10px' }}>
                    <i
                      className="material-icons"
                      style={{ verticalAlign: 'middle', fontSize: '36px' }}
                    >
                      rocket_launch
                    </i>
                    <b> Enterprise Builder Platform</b>
                  </h5>
                  <p className="flow-text grey-text text-darken-3">
                    Advanced CI/CD with Automated Deployment Pipelines
                  </p>
                </div>

                {/* Main Capabilities Grid */}
                <div className="row" style={{ marginBottom: '30px' }}>
                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #3f51b5',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny indigo-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          palette
                        </i>
                        <b>Dynamic UI:</b> Component libs
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #3f51b5',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny indigo-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          settings
                        </i>
                        <b>SDK Testing:</b> Multi-language
                      </p>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #ff9800',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny orange-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          devices
                        </i>
                        <b>Cross-platform:</b> Mobile, web
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #ff9800',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny orange-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          link
                        </i>
                        <b>Integrations:</b> OAuth, CRM
                      </p>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #2196f3',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny blue-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          casino
                        </i>
                        <b>Test Data:</b> Faker.js
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #2196f3',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny blue-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          speed
                        </i>
                        <b>Performance:</b> Lighthouse CI
                      </p>
                    </div>
                  </div>

                  <div className="col s12 m6 l3">
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #4caf50',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny green-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          analytics
                        </i>
                        <b>Monitoring:</b> Dashboards
                      </p>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '18px',
                        borderRadius: '8px',
                        borderLeft: '4px solid #4caf50',
                        marginBottom: '15px',
                      }}
                    >
                      <p style={{ margin: 0, fontSize: '15px' }}>
                        <i
                          className="material-icons tiny green-text"
                          style={{ verticalAlign: 'middle' }}
                        >
                          assessment
                        </i>
                        <b>Reports:</b> Artifacts, diagnostics
                      </p>
                    </div>
                  </div>
                </div>

                {/* CI/CD Pipeline Section */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    padding: '25px',
                    borderRadius: '10px',
                    marginTop: '30px',
                  }}
                >
                  <h5
                    className="center-align blue-text text-darken-2"
                    style={{ marginBottom: '25px' }}
                  >
                    <i className="material-icons" style={{ verticalAlign: 'middle' }}>
                      cloud_sync
                    </i>
                    <b> CI/CD Pipeline Integration</b>
                  </h5>

                  <div className="row" style={{ marginBottom: 0 }}>
                    <div className="col s12 m6 l3">
                      <div className="center-align">
                        <i className="material-icons medium blue-text text-darken-1">
                          browser_updated
                        </i>
                        <h6 className="blue-text text-darken-2" style={{ margin: '10px 0 5px 0' }}>
                          <b>Matrix Testing</b>
                        </h6>
                        <p style={{ fontSize: '15px', margin: 0 }}>
                          Parallel execution across browsers
                        </p>
                      </div>
                    </div>

                    <div className="col s12 m6 l3">
                      <div className="center-align">
                        <i className="material-icons medium blue-text text-darken-1">hub</i>
                        <h6 className="blue-text text-darken-2" style={{ margin: '10px 0 5px 0' }}>
                          <b>Multi-Environment</b>
                        </h6>
                        <p style={{ fontSize: '15px', margin: 0 }}>Staging & production testing</p>
                      </div>
                    </div>

                    <div className="col s12 m6 l3">
                      <div className="center-align">
                        <i className="material-icons medium blue-text text-darken-1">schedule</i>
                        <h6 className="blue-text text-darken-2" style={{ margin: '10px 0 5px 0' }}>
                          <b>Auto Triggers</b>
                        </h6>
                        <p style={{ fontSize: '15px', margin: 0 }}>Push, PRs, scheduled runs</p>
                      </div>
                    </div>

                    <div className="col s12 m6 l3">
                      <div className="center-align">
                        <i className="material-icons medium blue-text text-darken-1">
                          precision_manufacturing
                        </i>
                        <h6 className="blue-text text-darken-2" style={{ margin: '10px 0 5px 0' }}>
                          <b>Matrix Builds</b>
                        </h6>
                        <p style={{ fontSize: '15px', margin: 0 }}>Parallel execution pipeline</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="center-align" style={{ marginTop: '35px' }}>
                  <a
                    href="https://github.com/mcello23/cypress-demonstration-repo"
                    className="btn-large waves-effect waves-light indigo darken-1"
                    style={{
                      padding: '0 50px',
                      borderRadius: '25px',
                      boxShadow: '0 4px 15px rgba(63, 81, 181, 0.3)',
                    }}
                  >
                    <i className="material-icons left">auto_awesome</i>Explore CI/CD Pipeline
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div
        className="parallax-container valign-wrapper"
        style={{
          minHeight: '30vh',
          background: 'linear-gradient(135deg, #ff9800 0%, #e65100 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 3px, transparent 3px),
              radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.08) 2px, transparent 2px),
              linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.05) 50%, transparent 52%)
            `,
            backgroundSize: '60px 60px, 40px 40px, 80px 80px',
            animation: 'shift 18s ease-in-out infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '15%',
            width: '80px',
            height: '80px',
            border: '2px dashed rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            animation: 'dash 12s linear infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            bottom: '30%',
            right: '12%',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 25px 43.3px 25px',
            borderColor: 'transparent transparent rgba(255, 255, 255, 0.15) transparent',
            animation: 'float 7s ease-in-out infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '60%',
            left: '70%',
            width: '50px',
            height: '50px',
            background: 'rgba(255, 255, 255, 0.1)',
            transform: 'rotate(45deg) skew(15deg)',
            animation: 'wobble 9s ease-in-out infinite',
          }}
        ></div>
        <div className="section no-pad-bot" style={{ position: 'relative', zIndex: 10 }}>
          <div className="container">
            <div className="row center">
              <h3
                className="header col s12 white-text text-lighten-2"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
              >
                🚀 Coming Soon
              </h3>
              <p
                className="flow-text white-text"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
              >
                More Enterprise Testing Solutions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '80px 0' }}>
        <div className="row">
          <div className="col s12">
            <div
              className="card"
              style={{
                background: 'linear-gradient(135deg, #fff9e1 0%, #ffe082 100%)',
                borderRadius: '15px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
              }}
            >
              <div className="card-content" style={{ padding: '40px 30px' }}>
                {/* Header */}
                <div className="center-align" style={{ marginBottom: '40px' }}>
                  <h5 className="amber-text text-darken-4" style={{ marginBottom: '10px' }}>
                    <i
                      className="material-icons"
                      style={{ verticalAlign: 'middle', fontSize: '36px' }}
                    >
                      science
                    </i>
                    <b> Advanced Testing Methodologies</b>
                  </h5>
                  <p className="flow-text grey-text text-darken-3">
                    Performance, Load, Unit & AI/LLM Testing
                  </p>
                </div>

                {/* Testing Types Grid */}
                <div
                  className="row"
                  style={{ marginBottom: 0, marginLeft: '-15px', marginRight: '-15px' }}
                >
                  {/* Performance Testing */}
                  <div
                    className="col s12 m6 l3"
                    style={{ padding: '0 15px', marginBottom: '30px' }}
                  >
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)',
                        padding: '25px',
                        borderRadius: '12px',
                        height: '100%',
                        borderLeft: '5px solid #ff9800',
                        boxShadow: '0 4px 20px rgba(255, 152, 0, 0.15)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                    >
                      <div className="center-align" style={{ marginBottom: '20px' }}>
                        <i className="material-icons large orange-text text-darken-1">speed</i>
                        <h4
                          className="orange-text text-darken-2"
                          style={{ margin: '10px 0 5px 0', fontSize: '1.3rem' }}
                        >
                          <b>Performance Testing</b>
                        </h4>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny orange-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            assessment
                          </i>
                          <b>Lighthouse CI:</b> Core Web Vitals
                        </p>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny orange-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            dashboard
                          </i>
                          <b>Metrics:</b> Response time analysis
                        </p>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny orange-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            analytics
                          </i>
                          <b>Resource:</b> Memory & CPU profiling
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Load Testing */}
                  <div
                    className="col s12 m6 l3"
                    style={{ padding: '0 15px', marginBottom: '30px' }}
                  >
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #e0f2f1 0%, #80cbc4 100%)',
                        padding: '25px',
                        borderRadius: '12px',
                        height: '100%',
                        borderLeft: '5px solid #00897b',
                        boxShadow: '0 4px 20px rgba(0, 137, 123, 0.15)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                    >
                      <div className="center-align" style={{ marginBottom: '20px' }}>
                        <i className="material-icons large teal-text text-darken-1">trending_up</i>
                        <h4
                          className="teal-text text-darken-2"
                          style={{ margin: '10px 0 5px 0', fontSize: '1.3rem' }}
                        >
                          <b>Load Testing</b>
                        </h4>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny teal-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            public
                          </i>
                          <b>K6:</b> JavaScript-based, cloud scalable
                        </p>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny teal-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            group
                          </i>
                          <b>Stress:</b> Concurrent user simulation
                        </p>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny teal-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            insights
                          </i>
                          <b>Spike:</b> Traffic surge testing
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Unit Testing */}
                  <div
                    className="col s12 m6 l3"
                    style={{ padding: '0 15px', marginBottom: '30px' }}
                  >
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #e8eaf6 0%, #9fa8da 100%)',
                        padding: '25px',
                        borderRadius: '12px',
                        height: '100%',
                        borderLeft: '5px solid #5c6bc0',
                        boxShadow: '0 4px 20px rgba(92, 107, 192, 0.15)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                    >
                      <div className="center-align" style={{ marginBottom: '20px' }}>
                        <i className="material-icons large indigo-text text-lighten-1">code</i>
                        <h4
                          className="indigo-text text-darken-1"
                          style={{ margin: '10px 0 5px 0', fontSize: '1.3rem' }}
                        >
                          <b>Unit Testing</b>
                        </h4>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny indigo-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            functions
                          </i>
                          <b>Jest/Vitest:</b> Component testing
                        </p>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny indigo-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            shield
                          </i>
                          <b>Coverage:</b> 80%+ code coverage
                        </p>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny indigo-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            bug_report
                          </i>
                          <b>Mocking:</b> Test doubles, stubs
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI/LLM Testing */}
                  <div
                    className="col s12 m6 l3"
                    style={{ padding: '0 15px', marginBottom: '30px' }}
                  >
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #f3e5f5 0%, #ce93d8 100%)',
                        padding: '25px',
                        borderRadius: '12px',
                        height: '100%',
                        borderLeft: '5px solid #ab47bc',
                        boxShadow: '0 4px 20px rgba(171, 71, 188, 0.15)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                    >
                      <div className="center-align" style={{ marginBottom: '20px' }}>
                        <i className="material-icons large purple-text text-lighten-1">
                          psychology
                        </i>
                        <h4
                          className="purple-text text-darken-1"
                          style={{ margin: '10px 0 5px 0', fontSize: '1.3rem' }}
                        >
                          <b>AI/LLM Testing</b>
                        </h4>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny purple-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            casino
                          </i>
                          <b>Non-deterministic:</b> Prompt validation
                        </p>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny purple-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            memory
                          </i>
                          <b>Hallucination:</b> Output verification
                        </p>
                      </div>
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          padding: '14px',
                          borderRadius: '6px',
                          margin: '10px 0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                          <i
                            className="material-icons tiny purple-text"
                            style={{ verticalAlign: 'middle', marginRight: '6px' }}
                          >
                            rule
                          </i>
                          <b>Boundaries:</b> Safety & bias testing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frameworks;
