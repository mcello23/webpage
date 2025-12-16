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
                🤖 AI Test Plan Generator
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

      <div className="container center-align">
        <div className="section">
          <br />
          <h3
            className="mdi-content-send dark center-align"
            id="title-ai2"
            style={{ marginBottom: '20px' }}
          >
            <b>OpenAI GPT-4 • Node.js • TypeScript</b>
          </h3>
          <div className="section">
            <img
              className="image-cyp right-align"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/150px-OpenAI_Logo.svg.png"
              alt="openai-logo"
              width="100"
              height="100"
              loading="lazy"
              style={{ width: '100px', height: '100px', objectFit: 'contain' }}
            />
            <br />
            <div className="row">
              <div className="center-align">
                <p className="text-accent-2 waves-green left-align">
                  I developed an innovative AI-powered test plan generator that leverages
                  <b>OpenAI's GPT-4</b> to create comprehensive, structured test plans for software
                  projects. This tool revolutionizes the test planning process by intelligently
                  generating detailed test cases, reducing manual effort from hours to minutes while
                  maintaining professional quality standards.
                </p>
                <p className="text-accent-2 waves-green left-align">
                  The application features both a <b>CLI interface</b> and a <b>web interface</b>,
                  built with <b>Node.js</b> and <b>TypeScript</b>. It intelligently generates
                  complete test plans including test objectives, scope definition, testing approach,
                  environment requirements, and detailed test cases with preconditions, step-by-step
                  procedures, expected results, priority levels, and realistic time estimates. The
                  AI analyzes your project requirements and automatically creates test cases
                  covering functional, non-functional, edge cases, and regression scenarios.
                </p>
                <img
                  className="image-js center-align"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/120px-Typescript_logo_2020.svg.png"
                  alt="typescript-logo"
                  width="80"
                  height="80"
                  loading="lazy"
                  style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                />
                <p className="text-accent-2 waves-green left-align">
                  <b>Key Features:</b>
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>AI-Powered Intelligence:</b> Uses GPT-4 to generate context-aware test cases
                  based on project description, features, and requirements
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Comprehensive Test Coverage:</b> Automatically generates 5-10+ test cases
                  covering functional, non-functional, edge cases, and regression scenarios
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Multiple Testing Types:</b> Support for unit, integration, E2E testing, or
                  comprehensive coverage across all types
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Multi-Platform Support:</b> Optimized test plans for web, mobile, API, and
                  desktop applications
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Flexible Export Options:</b> Export test plans in JSON format for tool
                  integration or Markdown for documentation
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Dual Interface:</b> Choose between interactive CLI for automation or modern
                  web UI for ease of use
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Smart Prioritization:</b> AI automatically assigns priority levels (high,
                  medium, low) based on test case criticality
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Time Estimation:</b> Realistic time estimates for each test case and total
                  test execution duration
                </p>
                <br />
                <br />
                <div className="row center">
                  <a
                    href="https://github.com/mcello23/ai-test-plan-generator"
                    id="download-button-ai"
                    className="btn-large waves-effect waves-light teal pad center-align"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Check out my GitHub project
                  </a>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
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
                🎵 Python Music Downloader
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

      <div className="container center-align">
        <div className="section">
          <br />
          {/* Python Music Downloader Project */}
          <br />
          <h3
            className="mdi-content-send dark center-align"
            id="title-python2"
            style={{ marginBottom: '20px' }}
          >
            <b>yt-dlp • youtubesearchpython • FFmpeg</b>
          </h3>
          <div className="section">
            <img
              className="image-cyp right-align"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/150px-Python-logo-notext.svg.png"
              alt="python-logo"
              width="100"
              height="100"
              loading="lazy"
              style={{ width: '100px', height: '100px', objectFit: 'contain' }}
            />
            <br />
            <div className="row">
              <div className="center-align">
                <p className="text-accent-2 waves-green left-align">
                  I built a practical Python automation tool that simplifies music downloading from
                  YouTube by converting videos directly to high-quality MP3 files. This project
                  demonstrates proficiency in Python scripting, API integration, and automation
                  workflows - skills that translate directly to test automation and DevOps tasks.
                </p>
                <p className="text-accent-2 waves-green left-align">
                  The tool uses <b>yt-dlp</b> (an advanced fork of youtube-dl) combined with
                  <b>youtubesearchpython</b> to automatically search YouTube, download audio
                  streams, and convert them to MP3 format using <b>FFmpeg</b>. It features smart
                  search capabilities, automatic metadata extraction, and batch processing support
                  for multiple songs simultaneously.
                </p>
                <img
                  className="image-js center-align"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/150px-YouTube_full-color_icon_%282017%29.svg.png"
                  alt="youtube-logo"
                  width="100"
                  height="70"
                  loading="lazy"
                  style={{ width: '100px', height: '70px', objectFit: 'contain', margin: '10px 0' }}
                />
                <p className="text-accent-2 waves-green left-align">
                  <b>Key Features:</b>
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Smart YouTube Search:</b> Automatically searches YouTube for songs using
                  artist and track name
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>High-Quality Audio:</b> Downloads and converts to MP3 at 192 kbps for optimal
                  sound quality
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Batch Processing:</b> Process multiple songs in a single execution from a
                  simple Python list
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Automatic Organization:</b> Creates organized output folders with numbered
                  files for easy management
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>FFmpeg Integration:</b> Leverages FFmpeg for professional-grade audio
                  conversion
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Error Handling:</b> Robust error handling for failed searches or download
                  issues
                </p>
                <p className="text-accent-2 waves-green left-align">
                  • <b>Cross-Platform:</b> Works on macOS, Linux, and Windows with proper
                  dependencies
                </p>
                <br />
                <br />
                <div className="row center">
                  <a
                    href="https://github.com/mcello23/python-music-download"
                    id="download-button-python"
                    className="btn-large waves-effect waves-light teal pad center-align"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Check out my GitHub project
                  </a>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default SideProjects;
