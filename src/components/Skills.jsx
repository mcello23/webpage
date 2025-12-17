const Skills = () => {
  return (
    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col s12">
            {/* Tech Stack */}
            <div className="intro-card">
              <h3>💻 Tech Stack</h3>
              <div
                className="center-align"
                style={{ marginTop: '30px' }}
                aria-label="Technology categories"
              >
                {/* Languages */}
                <div style={{ marginBottom: '30px' }}>
                  <h3
                    style={{
                      textAlign: 'left',
                      color: '#667eea',
                      fontWeight: 600,
                      marginBottom: '15px',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ verticalAlign: 'middle' }}
                      aria-hidden="true"
                    >
                      code
                    </i>
                    Languages
                  </h3>
                  <div role="list" aria-label="Programming languages">
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #007acc 0%, #3178c6 100%)',
                        boxShadow: '0 4px 15px rgba(49, 120, 198, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20120%20120%22%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2218%22%20fill%3D%22%23fff%22/%3E%3Ctext%20x%3D%2260%22%20y%3D%2282%22%20font-family%3D%22Inter%2CArial%2Csans-serif%22%20font-size%3D%2264%22%20font-weight%3D%22700%22%20text-anchor%3D%22middle%22%20fill%3D%22%233178c6%22%3ETS%3C/text%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                        }}
                        aria-hidden="true"
                      />
                      TypeScript
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #f0db4f 0%, #f7df1e 100%)',
                        boxShadow: '0 4px 15px rgba(247, 223, 30, 0.4)',
                        color: '#323330',
                      }}
                    >
                      <i
                        className="fab fa-js-square"
                        style={{ marginRight: '5px' }}
                        aria-hidden="true"
                      ></i>
                      JavaScript
                    </span>
                  </div>
                </div>

                {/* Shell & Environment */}
                <div style={{ marginBottom: '30px' }}>
                  <h3
                    style={{
                      textAlign: 'left',
                      color: '#2e7d32',
                      fontWeight: 600,
                      marginBottom: '15px',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ verticalAlign: 'middle' }}
                      aria-hidden="true"
                    >
                      terminal
                    </i>
                    Shell & Environment
                  </h3>
                  <div role="list" aria-label="Shell and environment tools">
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #2e7d32 0%, #43a047 100%)',
                        boxShadow: '0 4px 15px rgba(67, 160, 71, 0.4)',
                      }}
                    >
                      <i
                        className="fas fa-terminal"
                        style={{ marginRight: '5px' }}
                        aria-hidden="true"
                      ></i>
                      Bash/Zsh
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)',
                        boxShadow: '0 4px 15px rgba(30, 136, 229, 0.4)',
                      }}
                    >
                      <i
                        className="fab fa-windows"
                        style={{ marginRight: '5px' }}
                        aria-hidden="true"
                      ></i>
                      WSL
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #3c873a 0%, #68a063 100%)',
                        boxShadow: '0 4px 15px rgba(104, 160, 99, 0.4)',
                      }}
                    >
                      <i
                        className="fab fa-node-js"
                        style={{ marginRight: '5px' }}
                        aria-hidden="true"
                      ></i>
                      Node.js
                    </span>
                  </div>
                </div>

                {/* E2E */}
                <div style={{ marginBottom: '30px' }}>
                  <h3
                    style={{
                      textAlign: 'left',
                      color: '#43a047',
                      fontWeight: 600,
                      marginBottom: '15px',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ verticalAlign: 'middle' }}
                      aria-hidden="true"
                    >
                      bug_report
                    </i>
                    E2E/Unit Testing Frameworks
                  </h3>
                  <div role="list" aria-label="E2E frameworks">
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #17202c 0%, #69d3a7 100%)',
                        boxShadow: '0 4px 15px rgba(105, 211, 167, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23fff' d='M84.6 8.1l9.8 9.8-21.6 21.6-12.1-12.2L75.9 12l-4.4-4.4-21.2 21.2-12.1-12.1L59.9 0 84.6 8.1zm-59 59l21.6-21.6 12.1 12.1L38.1 79l4.4 4.4 21.2-21.2 12.1 12.1L54.1 96 25.6 67.1zm33.7 17.5l-12.2 12.1L25.5 120 0 95.5l12.2-12.2 12.1 12.2 21.6-21.6 12.4 12.1-12.1 12.1 12.1 12.1zm40.6-74.7l-12.2 12.1-12.1-12.1-9.8 9.8 12.1 12.1-12.1 12.1 12.1 12.1 12.1-12.1 12.1 12.1 9.8-9.8-12.1-12.1 12.1-12.1L99.9 9.9zM84.6 67.1L73.1 55l-21.6 21.6 12.1 12.1 21.0-21.6z'/%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                          filter: 'brightness(0) invert(1)',
                        }}
                        aria-hidden="true"
                      />
                      Cypress
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #2d5f3f 0%, #45a872 100%)',
                        boxShadow: '0 4px 15px rgba(69, 168, 114, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23fff' d='M108.8 34.3c-6.6-11.5-15.9-18.9-26.4-20.9-18-3.4-35.7 6.6-45.6 23.6L2.5 93.4l60.4 34.6 34.3-59.5c6.4-11.1 7.9-22.9 11.6-34.2zm-7.7 32.3l-32.6 56.6-57.3-32.8L45.5 34c8.9-15.5 24.8-24.5 40.9-21.6 9.3 1.7 17.6 8.4 23.5 18.8-3.4 10.5-4.7 21.3-8.8 35.4z'/%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                        }}
                        aria-hidden="true"
                      />
                      Playwright
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #c62828 0%, #f44336 100%)',
                        boxShadow: '0 4px 15px rgba(244, 67, 54, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23fff' d='M124.129 63.02c0-7.692-5.828-14.165-13.652-16.012L128 4.031l-69.121 6.67-2.433 1.605-1.982 1.397-2.722-.726-2.043-.736L0 17.146l17.77 65.57c-4.033 4.79-6.484 10.802-6.484 17.385C11.286 112.688 24.574 126 40.991 126c16.415 0 29.703-13.314 29.703-29.901 0-6.583-2.451-12.595-6.484-17.385l18.598-68.597 17.855-4.37 1.605-.394c-.002 0-.004 0-.005.002l-.099-.03 2.387 1.239 2.156.902 3.158.88 3.263.958-.004.002c7.624 2.308 13.053 9.607 13.053 17.78 0 10.476-8.468 18.968-18.919 18.968-2.424 0-4.742-.467-6.878-1.318l-3.623 7.944c3.124 1.318 6.555 2.05 10.131 2.05 14.331 0 25.961-11.658 25.961-26.04zM64 77.518c.006 0 .011 0 .017.002-7.654-1.81-15.604-3.098-23.913-3.798V49.807h23.896v27.711zm-23.896-39.014V14.609l23.896 5.729v17.766H40.104zm-26.1 47.854l-9.767-35.98L15.45 24.601 40.105 19.8v61.496c-8.309.7-16.261 1.988-23.913 3.798-.004 0-.011-.002-.017-.002v.002c-.005-.002-.009-.002-.013-.002-.004 0-.007.002-.011.002zm26.099-.022v.012c-.006 0-.011-.006-.017-.008V86.34c-.003 0-.011-.004-.017-.006v-.007c-.015 0-.029 0-.044.002-10.163.762-19.876 2.254-29.079 4.414-4.002 1.187-7.88 2.556-11.642 4.077l9.725 35.863c3.34-1.316 6.779-2.487 10.34-3.495 7.759-2.194 15.776-3.89 24.029-5.005V86.336zm0 41.372v.038c-.007.001-.014.002-.021.003V127.767c-.002 0-.014-.002-.021-.003v-.012c-.008 0-.015.002-.023.003V86.354c-.008-.001-.015-.003-.023-.003v-.012c-.007-.001-.014-.003-.022-.003v41.411c-8.254 1.116-16.271 2.812-24.029 5.005-3.561 1.008-7 2.179-10.34 3.495l9.725 35.863c3.762-1.521 7.64-2.89 11.642-4.077 9.202-2.16 18.915-3.652 29.079-4.414.015.002.029.002.044.002z'/%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                        }}
                        aria-hidden="true"
                      />
                      Jest
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #23a566 0%, #40c77f 100%)',
                        boxShadow: '0 4px 15px rgba(64, 199, 127, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23fff' d='M-1.75 1.75h131v125h-131z'/%3E%3Cpath fill='%2300A818' d='M10.75 13.75h106v30h-106z'/%3E%3Cpath fill='%23fff' d='M32.75 26.25q0 1-.75 1.75t-1.75.75-1.75-.75-.75-1.75.75-1.75 1.75-.75 1.75.75.75 1.75zm15 2.5h-6v-5h6zm20 0h-6v-5h6zm20 0h-6v-5h6z'/%3E%3Cpath fill='%23000' d='M10.75 43.75h106v90h-106z'/%3E%3Ctext x='20' y='70' font-family='monospace' font-size='14' fill='%23fff'%3E%3Ctspan%3EFeature:...%3C/tspan%3E%3Ctspan x='20' y='90'%3EScenario:...%3C/tspan%3E%3Ctspan x='30' y='110'%3EGiven...%3C/tspan%3E%3Ctspan x='30' y='125'%3EWhen...%3C/tspan%3E%3C/text%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                        }}
                        aria-hidden="true"
                      />
                      Cucumber/Gherkin
                    </span>
                  </div>
                </div>

                {/* CI/CD & DevOps */}
                <div style={{ marginBottom: '30px' }}>
                  <h3
                    style={{
                      textAlign: 'left',
                      color: '#1e88e5',
                      fontWeight: 600,
                      marginBottom: '15px',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ verticalAlign: 'middle' }}
                      aria-hidden="true"
                    >
                      settings
                    </i>
                    CI/CD & DevOps
                  </h3>
                  <div role="list" aria-label="CI/CD and DevOps">
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #0078d4 0%, #50a0e0 100%)',
                        boxShadow: '0 4px 15px rgba(80, 160, 224, 0.4)',
                      }}
                    >
                      <i
                        className="fab fa-microsoft"
                        style={{ marginRight: '5px' }}
                        aria-hidden="true"
                      ></i>
                      Azure DevOps
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #2088ff 0%, #79b8ff 100%)',
                        boxShadow: '0 4px 15px rgba(121, 184, 255, 0.4)',
                      }}
                    >
                      <i
                        className="fab fa-github"
                        style={{ marginRight: '5px' }}
                        aria-hidden="true"
                      ></i>
                      GitHub Actions
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #326ce5 0%, #5b8def 100%)',
                        boxShadow: '0 4px 15px rgba(91, 141, 239, 0.4)',
                      }}
                    >
                      <i
                        className="fab fa-docker"
                        style={{ marginRight: '5px' }}
                        aria-hidden="true"
                      ></i>
                      Docker
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #ef7b4d 0%, #f39c6b 100%)',
                        boxShadow: '0 4px 15px rgba(243, 156, 107, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23fff' d='M53.5 21.3l-36 20.9v41.7l36 20.9 36-20.9V42.2zm0 6.8l25.7 14.9-25.7 14.9-25.7-14.9zm-29.3 18l25.7 14.9v29.8L24.2 75.9zm58.5 0v29.8L57 90.8V61z'/%3E%3Cpath fill='%23ef7b4d' d='M107.5 21.3v41.7l-7.1 4.1V30.5L82 16.6l-7.1 4.1 36 20.9z'/%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                        }}
                        aria-hidden="true"
                      />
                      ArgoCD
                    </span>
                  </div>
                </div>

                {/* API & Tools */}
                <div style={{ marginBottom: '30px' }}>
                  <h3
                    style={{
                      textAlign: 'left',
                      color: '#fb8c00',
                      fontWeight: 600,
                      marginBottom: '15px',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ verticalAlign: 'middle' }}
                      aria-hidden="true"
                    >
                      api
                    </i>
                    API & Testing Tools
                  </h3>
                  <div role="list" aria-label="API and testing tools">
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #e535ab 0%, #f178c6 100%)',
                        boxShadow: '0 4px 15px rgba(241, 120, 198, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cg fill='%23e535ab'%3E%3Cpath d='M57.468 302.66l-14.376-8.3 160.15-277.38 14.376 8.3z'/%3E%3Cpath d='M39.8 272.2h320.3v16.6H39.8z'/%3E%3Cpath d='M206.348 374.026l-160.21-92.5 8.3-14.376 160.21 92.5zM345.522 132.947l-160.21-92.5 8.3-14.376 160.21 92.5z'/%3E%3Cpath d='M54.482 132.883l-8.3-14.375 160.21-92.5 8.3 14.376z'/%3E%3Cpath d='M342.568 302.663l-160.15-277.38 14.376-8.3 160.15 277.38zM52.5 107.5h16.6v185H52.5zM330.9 107.5h16.6v185h-16.6z'/%3E%3Cpath d='M203.522 367l-7.25-12.558 139.34-80.45 7.25 12.557z'/%3E%3Cpath d='M369.5 297.9c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.8 9.7 22.5 31 12.8 47.7M90.9 137c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.7 9.7 22.4 31 12.8 47.7M30.5 297.9c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.8 9.6-38.1 3.9-47.7-12.8M309.1 137c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.7 9.6-38.1 3.9-47.7-12.8M200 395.8c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.2-15.6 34.9-34.9 34.9M200 74c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.3-15.6 34.9-34.9 34.9'/%3E%3C/g%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                          filter: 'brightness(0) invert(1)',
                        }}
                        aria-hidden="true"
                      />
                      GraphQL
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #ff6c37 0%, #ff9057 100%)',
                        boxShadow: '0 4px 15px rgba(255, 144, 87, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23fff' d='M122.9 66.7c-1.2-7.8-6.7-13.9-13.8-15.8 1.5-4.7 1.5-9.9 0-14.7-2.9-9.5-11.7-15.8-21.6-15.8-3.5 0-6.9.8-10 2.4-4.7-4.7-11.1-7.3-17.9-7.3s-13.2 2.6-17.9 7.3c-3.1-1.6-6.5-2.4-10-2.4-9.9 0-18.7 6.3-21.6 15.8-1.5 4.8-1.5 10 0 14.7-7.1 1.9-12.6 8-13.8 15.8-1.5 9.5 3.4 18.7 11.9 22.3.2 3.7 1.1 7.3 2.7 10.7 2.9 6.1 7.9 10.9 14.2 13.5 3.5 1.4 7.2 2.1 11 2.1 6.8 0 13.2-2.3 18.3-6.5 5.1 4.2 11.5 6.5 18.3 6.5 3.8 0 7.5-.7 11-2.1 6.3-2.6 11.3-7.4 14.2-13.5 1.6-3.4 2.5-7 2.7-10.7 8.5-3.6 13.4-12.8 11.9-22.3zM64 99.1c-19.4 0-35.1-15.7-35.1-35.1S44.6 28.9 64 28.9 99.1 44.6 99.1 64 83.4 99.1 64 99.1z'/%3E%3Cpath fill='%23fff' d='M80.7 57.6l-15.8-9.1c-1.2-.7-2.7-.7-3.9 0l-15.8 9.1c-1.2.7-1.9 2-1.9 3.4v18.2c0 1.4.7 2.7 1.9 3.4l15.8 9.1c1.2.7 2.7.7 3.9 0l15.8-9.1c1.2-.7 1.9-2 1.9-3.4V61c0-1.4-.7-2.7-1.9-3.4zM64 74.9c-6 0-10.9-4.9-10.9-10.9S58 53.1 64 53.1 74.9 58 74.9 64 70 74.9 64 74.9z'/%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                        }}
                        aria-hidden="true"
                      />
                      Postman/Bruno
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #8e44ad 0%, #a569bd 100%)',
                        boxShadow: '0 4px 15px rgba(165, 105, 189, 0.4)',
                      }}
                    >
                      <i
                        className="fas fa-exchange-alt"
                        style={{ marginRight: '5px' }}
                        aria-hidden="true"
                      ></i>
                      API Stubbing
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #e74c3c 0%, #ec7063 100%)',
                        boxShadow: '0 4px 15px rgba(236, 112, 99, 0.4)',
                      }}
                    >
                      <i
                        className="fas fa-flask"
                        style={{ marginRight: '5px' }}
                        aria-hidden="true"
                      ></i>
                      Mock Testing
                    </span>
                  </div>
                </div>

                {/* Mobile & DB */}
                <div style={{ marginBottom: '30px' }}>
                  <h3
                    style={{
                      textAlign: 'left',
                      color: '#8e24aa',
                      fontWeight: 600,
                      marginBottom: '15px',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ verticalAlign: 'middle' }}
                      aria-hidden="true"
                    >
                      devices
                    </i>
                    Mobile & Database
                  </h3>
                  <div role="list" aria-label="Mobile and database">
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #662d91 0%, #8e44ad 100%)',
                        boxShadow: '0 4px 15px rgba(142, 68, 173, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23fff' d='M64.021 2L14 26.472v73.056L64.021 126l50.021-26.472V26.472zm42.394 73.384a2.594 2.594 0 01-1.306 2.244l-13.17 7.579a2.63 2.63 0 01-2.611 0l-13.17-7.579a2.594 2.594 0 01-1.306-2.244V60.227a2.594 2.594 0 011.306-2.244l13.17-7.579a2.63 2.63 0 012.611 0l13.17 7.579a2.594 2.594 0 011.306 2.244z'/%3E%3Cpath fill='%23fff' d='M97.656 63.893l-6.273-3.618v-7.236l6.273 3.618zm-12.546-3.618l-6.273 3.618v7.236l6.273-3.618zm-6.273 18.09l6.273 3.618v7.236l-6.273-3.618zm12.546 3.618l6.273-3.618v-7.236l-6.273 3.618z'/%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                        }}
                        aria-hidden="true"
                      />
                      Appium
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #43a047 0%, #66bb6a 100%)',
                        boxShadow: '0 4px 15px rgba(102, 187, 106, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23fff' d='M108.8 34.4c-6.6-11.4-15.8-18.8-26.3-20.8-18-3.4-35.6 6.6-45.5 23.5L2.7 93.4 63 128l34.2-59.3c6.4-11 7.9-22.8 11.6-34.3zM64.1 96.4c-17.8 0-32.3-14.4-32.3-32.2S46.3 32 64.1 32s32.3 14.4 32.3 32.2-14.5 32.2-32.3 32.2z'/%3E%3Cpath fill='%23fff' d='M64.1 42c-12.3 0-22.2 9.9-22.2 22.2s9.9 22.2 22.2 22.2 22.2-9.9 22.2-22.2S76.4 42 64.1 42z'/%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                        }}
                        aria-hidden="true"
                      />
                      Selenium
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #ea5906 0%, #f57a3e 100%)',
                        boxShadow: '0 4px 15px rgba(245, 122, 62, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23EA5906' d='M64 2L14 26.5v75L64 126l50-24.5v-75zm37.7 85.2L64 109.8 26.3 87.2V38.8L64 16.2l37.7 22.6z'/%3E%3Cpath fill='%23EA5906' d='M64 31.7c-17.8 0-32.3 14.4-32.3 32.3S46.2 96.3 64 96.3 96.3 81.8 96.3 64 81.8 31.7 64 31.7zm0 54.6c-12.3 0-22.3-10-22.3-22.3S51.7 41.7 64 41.7 86.3 51.7 86.3 64 76.3 86.3 64 86.3z'/%3E%3Cpath fill='%23fff' d='M64 48.3c-8.6 0-15.7 7-15.7 15.7S55.4 79.7 64 79.7 79.7 72.6 79.7 64 72.6 48.3 64 48.3zm0 25.4c-5.3 0-9.7-4.3-9.7-9.7s4.3-9.7 9.7-9.7 9.7 4.3 9.7 9.7-4.4 9.7-9.7 9.7z'/%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                        }}
                        aria-hidden="true"
                      />
                      WebDriverIO
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #00758f 0%, #00a0c6 100%)',
                        boxShadow: '0 4px 15px rgba(0, 160, 198, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23336791' d='M108.6 73.3c-1.9-.5-3.3.3-3.3 1.7v13.4c0 8.1-6.6 14.7-14.7 14.7H37.4c-8.1 0-14.7-6.6-14.7-14.7V74.9c0-1.4-1.4-2.1-3.3-1.7-6.4 1.4-10.7 5.2-10.7 9.3v12.7c0 10.7 8.7 19.4 19.4 19.4h66.6c10.7 0 19.4-8.7 19.4-19.4V82.5c0-4.1-4.3-7.9-10.7-9.2z'/%3E%3Cpath fill='%23336791' d='M64 85.3c10.7 0 19.4-8.7 19.4-19.4V27.3c0-10.7-8.7-19.4-19.4-19.4S44.6 16.6 44.6 27.3v38.6c0 10.7 8.7 19.4 19.4 19.4z'/%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                          filter: 'brightness(0) invert(1)',
                        }}
                        aria-hidden="true"
                      />
                      SQL/Postgres
                    </span>
                  </div>
                </div>

                {/* Reporting */}
                <div style={{ marginBottom: '30px' }}>
                  <h3
                    style={{
                      textAlign: 'left',
                      color: '#c62828',
                      fontWeight: 600,
                      marginBottom: '15px',
                    }}
                  >
                    <i
                      className="material-icons"
                      style={{ verticalAlign: 'middle' }}
                      aria-hidden="true"
                    >
                      assessment
                    </i>
                    Reporting & Version Control
                  </h3>
                  <div role="list" aria-label="Reporting and version control">
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #f9a825 0%, #fbc02d 100%)',
                        boxShadow: '0 4px 15px rgba(251, 192, 45, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23C8326A' d='M56.8 20.2l-43.2 25v50l43.2 25 43.2-25v-50zm0 7.8l33.1 19.1-33.1 19.1L23.7 47.1zM20 52.5l32 18.5v36.8L20 89.3zm72 0v36.8l-32 18.5V71zm-21.6 43.2l-6.4-11.2 23.1-13.3 6.4 11.2z'/%3E%3Cpath fill='%23C8326A' d='M120.3 83.7l-6.4-11.2 6.4-3.7 6.4 11.2z'/%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                          filter: 'brightness(0) saturate(0) brightness(3)',
                        }}
                        aria-hidden="true"
                      />
                      Allure Reports
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
                        boxShadow: '0 4px 15px rgba(156, 39, 176, 0.4)',
                      }}
                    >
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%23fff' d='M32 16h8v96h-8zm16 16h8v80h-8zm16 16h8v64h-8zm16 16h8v48h-8zm16 16h8v32h-8z'/%3E%3Cpath fill='%23fff' d='M24 104l56-56 8 8-56 56z'/%3E%3C/svg%3E"
                        alt=""
                        width="16"
                        height="16"
                        style={{
                          width: '16px',
                          height: '16px',
                          marginRight: '5px',
                          verticalAlign: 'middle',
                        }}
                        aria-hidden="true"
                      />
                      Mochawesome
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #f34f29 0%, #ff7f50 100%)',
                        boxShadow: '0 4px 15px rgba(255, 127, 80, 0.4)',
                      }}
                    >
                      <i
                        className="fab fa-git-alt"
                        style={{ marginRight: '5px' }}
                        aria-hidden="true"
                      ></i>
                      Git
                    </span>
                    <span
                      role="listitem"
                      className="skill-tag"
                      style={{
                        background: 'linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)',
                        boxShadow: '0 4px 15px rgba(30, 136, 229, 0.4)',
                      }}
                    >
                      <i
                        className="fas fa-clock"
                        style={{ marginRight: '5px' }}
                        aria-hidden="true"
                      ></i>
                      Nightly Builds
                    </span>
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

export default Skills;
