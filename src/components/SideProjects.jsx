import { useEffect } from 'react';

const SideProjects = () => {
  useEffect(() => {
    if (window.M) {
      window.M.AutoInit();
    }
  }, []);

  return (
    <div>
      <div style={{ marginTop: '80px' }}></div>
      {/* Introduction Section */}
      <div className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="row center">
            <h1
              className="header col s12 dark"
              style={{ marginBottom: '40px', fontSize: '3.5rem' }}
            >
              Side Projects & Automation Tools
            </h1>
            <p className="flow-text grey-text text-darken-3">
              Innovative automation solutions showcasing AI integration, scripting expertise, and
              real-world problem-solving
            </p>
          </div>
        </div>
      </div>

      {/* AI Test Plan Generator Separator */}
      <div className="parallax-container valign-wrapper hero-ai">
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
                🤖 GPT-grade Test Plan generation
              </h3>
              <p
                className="flow-text white-text"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
              >
                Intelligent test planning powered by artificial intelligence
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section" style={{ padding: '40px 0' }}>
          {/* AI Test Plan Generator Project */}
          <div className="row valign-wrapper" style={{ flexWrap: 'wrap' }}>
            <div className="col s12 m4 center-align" style={{ marginBottom: '20px' }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/150px-OpenAI_Logo.svg.png"
                alt="OpenAI Logo"
                style={{
                  height: '80px',
                  marginBottom: '20px',
                  display: 'block',
                  margin: '0 auto 20px',
                }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/120px-Typescript_logo_2020.svg.png"
                alt="TypeScript Logo"
                style={{ height: '60px' }}
              />
            </div>
            <div className="col s12 m8">
              <h4 style={{ marginTop: 0, fontWeight: 600, color: '#2c3e50' }}>
                AI Test Plan Generator
              </h4>
              <p
                className="flow-text"
                style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#546e7a' }}
              >
                Enterprise-grade tool leveraging <b>OpenAI's GPT-4</b> to generate comprehensive
                test plans in minutes. Transforms manual planning into structured, production-ready
                documentation matching industry standards.
              </p>

              <div className="row">
                <div className="col s12 m6">
                  <ul style={{ marginTop: 0 }}>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'start' }}>
                      <i
                        className="material-icons tiny teal-text"
                        style={{ marginRight: '8px', marginTop: '4px' }}
                      >
                        check_circle
                      </i>
                      <span>
                        <b>Smart Generation:</b> Context-aware test cases from project descriptions
                      </span>
                    </li>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'start' }}>
                      <i
                        className="material-icons tiny teal-text"
                        style={{ marginRight: '8px', marginTop: '4px' }}
                      >
                        check_circle
                      </i>
                      <span>
                        <b>Full Coverage:</b> Functional, non-functional, edge cases, and regression
                      </span>
                    </li>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'start' }}>
                      <i
                        className="material-icons tiny teal-text"
                        style={{ marginRight: '8px', marginTop: '4px' }}
                      >
                        check_circle
                      </i>
                      <span>
                        <b>Multi-Platform:</b> Web, mobile, API, and desktop support
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col s12 m6">
                  <ul style={{ marginTop: 0 }}>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'start' }}>
                      <i
                        className="material-icons tiny teal-text"
                        style={{ marginRight: '8px', marginTop: '4px' }}
                      >
                        check_circle
                      </i>
                      <span>
                        <b>Dual Interface:</b> CLI for automation, Web UI for ease of use
                      </span>
                    </li>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'start' }}>
                      <i
                        className="material-icons tiny teal-text"
                        style={{ marginRight: '8px', marginTop: '4px' }}
                      >
                        check_circle
                      </i>
                      <span>
                        <b>Export Ready:</b> JSON for integration, Markdown for documentation
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <a
                  href="https://github.com/mcello23/ai-test-plan-generator"
                  className="btn-large waves-effect waves-light teal darken-1"
                  style={{ borderRadius: '30px', fontWeight: 600, padding: '0 40px' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github left"></i>
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Python Music Downloader Separator */}
      <div className="parallax-container valign-wrapper hero-playwright-alt">
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.08) 2px, transparent 2px),
              radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.08) 2px, transparent 2px),
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 80px 80px, 40px 40px',
            animation: 'float 25s ease-in-out infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '80px',
            height: '80px',
            border: '2px solid rgba(255, 255, 255, 0.25)',
            transform: 'rotate(30deg)',
            animation: 'spin-slow 25s linear infinite',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '12%',
            width: '50px',
            height: '50px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            animation: 'bounce 3s ease-in-out infinite',
          }}
        ></div>
        <div className="section no-pad-bot" style={{ position: 'relative', zIndex: 10 }}>
          <div className="container">
            <div className="row center">
              <h3
                className="header col s12 white-text text-lighten-2"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
              >
                🎵 Download music anywhere!
              </h3>
              <p
                className="flow-text white-text"
                style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}
              >
                Automated YouTube to MP3 conversion with batch processing
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section" style={{ padding: '40px 0' }}>
          {/* Python Music Downloader Project */}
          <div className="row valign-wrapper" style={{ flexWrap: 'wrap' }}>
            <div className="col s12 m4 center-align" style={{ marginBottom: '20px' }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/150px-Python-logo-notext.svg.png"
                alt="Python Logo"
                style={{
                  height: '80px',
                  marginBottom: '20px',
                  display: 'block',
                  margin: '0 auto 20px',
                }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/150px-YouTube_full-color_icon_%282017%29.svg.png"
                alt="YouTube Logo"
                style={{ height: '50px' }}
              />
            </div>
            <div className="col s12 m8">
              <h4 style={{ marginTop: 0, fontWeight: 600, color: '#2c3e50' }}>
                Python Music Downloader
              </h4>
              <p
                className="flow-text"
                style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#546e7a' }}
              >
                Production-ready automation script for high-fidelity YouTube to MP3 conversion.
                Demonstrates advanced Python scripting, API orchestration, and process automation.
              </p>

              <div className="row">
                <div className="col s12 m6">
                  <ul style={{ marginTop: 0 }}>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'start' }}>
                      <i
                        className="material-icons tiny teal-text"
                        style={{ marginRight: '8px', marginTop: '4px' }}
                      >
                        check_circle
                      </i>
                      <span>
                        <b>High-Fidelity Audio:</b> 192 kbps MP3 conversion via FFmpeg
                      </span>
                    </li>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'start' }}>
                      <i
                        className="material-icons tiny teal-text"
                        style={{ marginRight: '8px', marginTop: '4px' }}
                      >
                        check_circle
                      </i>
                      <span>
                        <b>Smart Search:</b> Automated artist/track matching with yt-dlp
                      </span>
                    </li>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'start' }}>
                      <i
                        className="material-icons tiny teal-text"
                        style={{ marginRight: '8px', marginTop: '4px' }}
                      >
                        check_circle
                      </i>
                      <span>
                        <b>Batch Processing:</b> Concurrent downloads with auto-organization
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col s12 m6">
                  <ul style={{ marginTop: 0 }}>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'start' }}>
                      <i
                        className="material-icons tiny teal-text"
                        style={{ marginRight: '8px', marginTop: '4px' }}
                      >
                        check_circle
                      </i>
                      <span>
                        <b>Robust Architecture:</b> Error recovery and cross-platform support
                      </span>
                    </li>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'start' }}>
                      <i
                        className="material-icons tiny teal-text"
                        style={{ marginRight: '8px', marginTop: '4px' }}
                      >
                        check_circle
                      </i>
                      <span>
                        <b>DevOps Ready:</b> Parallels CI/CD pipeline scripting concepts
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <a
                  href="https://github.com/mcello23/python-music-download"
                  className="btn-large waves-effect waves-light teal darken-1"
                  style={{ borderRadius: '30px', fontWeight: 600, padding: '0 40px' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github left"></i>
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideProjects;
