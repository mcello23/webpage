import React, { useEffect } from 'react';
import './Home.styles.css';

const Home = () => {
  useEffect(() => {
    // Inicializar componentes do Materialize
    if (window.M) {
      const elems = document.querySelectorAll('.modal');
      window.M.Modal.init(elems);
      
      const parallax = document.querySelectorAll('.parallax');
      window.M.Parallax.init(parallax);
    }

    // Inicializar Juicebox quando o componente montar
    if (window.juicebox) {
      const juiceboxConfig = {
        scaleToFit: false,
        enableKeyboardControls: true,
        showOpenButton: true,
      };

      new window.juicebox({
        containerId: "juicebox-container",
        galleryWidth: "1280",
        galleryHeight: "720",
        backgroundColor: "#222222",
      }, juiceboxConfig);
    }

    // Função de download do CV
    window.downloadFile = () => {
      window.open("https://www.dropbox.com/scl/fi/m8xsfhlkk6zye20vz7fvc/Marcelo-s-Resume-Q3-2023.pdf?rlkey=nfcbts87e9gv4o0nrjq4v57yc&dl=0");
    };
  }, []);

  return (
    <>
      {/* Banner */}
      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <br /><br />
            <h2 className="header center teal-text text-lighten-5">Portfolio</h2>
            <div className="row center">
              <a href="frameworks.html" id="download-button1" className="btn-large waves-effect waves-light teal lighten-1 pad">Frameworks</a>
              <a href="side_proj.html" id="download-button2" className="btn-large waves-effect waves-light teal lighten-1 pad">Side Projects</a>
              <a href="#modal1" id="download-button3" className="btn-large waves-effect waves-light teal lighten-1 pad modal-trigger">Certificates</a>
            </div>
            <h3 className="header center teal-text white-text">Marcelo Costa</h3>
          </div>
        </div>
        <div className="parallax"><img src={process.env.PUBLIC_URL + "/backgrounds/background2_coding.jpg"} alt="Unsplashed background img 1" /></div>
      </div>

      {/* About Section */}
      <div className="container"><br />
        <div className="section">
          <div className="row">
            <div className="center-align">
              <h4 className="mdi-content-send dark center-align"><b>QA Lead</b></h4><br />
              <img className="right-aligned image-desc" src={process.env.PUBLIC_URL + "/DSC_9554.jpg"} alt="personal-picture" />
              <p className="text-accent-2 waves-green left-align">Hi!</p>
              <p className="text-accent-2 waves-green left-align">I have been working as a QA for the last 6 years in companies like Apple, EA and, more recently, Nespresso IoT in which I'm QA Lead managing a team of 5 manual testers and 3 automation ones.
                Recently, I've implemented KPIs to track the quality of tests, bugs opened and closed each sprint, refactored manual and automated test cases, execute regression, pairing, stability and smoke tests before every new deployment. Taken care of Market Acceptance Tests (MATs), User Acceptance Testing (UATs) of every new machine that comes out.
                My experience is focused in testing apps for iOS and Andoird with real and simulated devices using a stack that goes from Appium, Xcode, Cucumber, XCUITest, Espresso, XRay, Ruby, Postman, Swift and JavaScript. Documentation with Confluence and Jira. </p>
              <p className="text-accent-2 waves-green left-align">Also acted as the Team Lead for my locale (pt-BR) in which I trained and formed 3 people in the team, always providing constant feedback.
                In my QA role at the S project, I tested the specific AI and fixed pipeline issues of the 23 localised languages that the product supports.
                In automation I've mainly worked with Swift language, with Xcode (IDE) in a framework designed by my client.</p>
              <p className="text-accent-2 waves-green left-align">My project also includes Git commands, in which we add new fixes through a CI/CD environment and understanding Machine Learning:
                Natural Languge (NLP), Speech Recognition (ASR), Flow, Dialog and Text to Speech.
              </p>
              <div className="row center"><br /><br /><br />
                <button id="download-button" type="button" className="btn-large waves-effect waves-light teal lighten-1" onClick={() => window.downloadFile()}>Download my CV</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div id="modal1" className="modal">
        <div className="modal-content">
          <div id="juicebox-container" className="juicebox-container"></div>
        </div>
      </div>

      {/* Programming Languages */}
      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <h2 className="header col s12 dark">My Programming Languages</h2>
            </div>
          </div>
        </div>
        <div className="parallax"><img src={process.env.PUBLIC_URL + "/backgrounds/background2_coding.jpg"} alt="Unsplashed background img 2" /></div>
      </div>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m3">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">laptop</i></h2>
                <h5 className="center">Python</h5>
              </div>
            </div>
            <div className="col s12 m3">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">code</i></h2>
                <h5 className="center">JavaScript</h5>
              </div>
            </div>
            <div className="col s12 m3">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">data_object</i></h2>
                <h5 className="center">Swift</h5>
              </div>
            </div>
            <div className="col s12 m3">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">developer_mode</i></h2>
                <h5 className="center">Ruby</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">adb</i></h2>
                <h5 className="center">Gherkin</h5>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons outlined">data_array</i></h2>
                <h5 className="center">Cucumber</h5>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">terminal</i></h2>
                <h5 className="center">HTML and CSS</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QA Pillars */}
      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <h2 className="header col s12 dark">Three pillars of a QA</h2>
            </div>
          </div>
        </div>
        <div className="parallax"><img src={process.env.PUBLIC_URL + "/backgrounds/background2_coding.jpg"} alt="Unsplashed background img 2" /></div>
      </div>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">zoom_in</i></h2>
                <h5 className="center">Attention to detail</h5>
                <p className="light" id="text-in">As in every project that I work, I have great attention to detail in order to identify even the smallest defects in a product. This includes being able to carefully review and test every aspect of the product to ensure that it meets the required specifications and standards.</p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">developer_mode</i></h2>
                <h5 className="center">Problem-solving skills</h5>

                <p className="light" id="text-in1">In order to be a good professional in this area, it's essential to be able to troubleshoot problems and find creative solutions to issues that may arise during the testing process. This requires strong analytical skills and the ability to think critically.</p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">call</i></h2>
                <h5 className="center">Communication skills</h5>

                <p className="light" id="text-in2">The best QA is the one that communicates effectively with different teams and stakeholders, including developers, project managers, and customers. This may involve writing detailed bug reports, giving presentations, or providing feedback and recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Fundamentals */}
      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <h2 className="header col s12 dark">Test Fundamentals</h2>
            </div>
          </div>
        </div>
        <div className="parallax"><img src={process.env.PUBLIC_URL + "/backgrounds/background2_coding.jpg"} alt="Unsplashed background img 2" /></div>
      </div><br /><br />
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="center-align">
              <h4 className="mdi-content-send dark center-align"><b>Why is the test pyramid a pyramid?</b></h4><br />
              <p className="text-accent-2 waves-green left-align">The test pyramid is a visual metaphor that represents the recommended balance between different types of tests in an application. It is called a "pyramid" because the base of the pyramid represents the tests that should be the most numerous, while the top of the pyramid represents the tests that should be the least numerous.
                The idea behind the test pyramid is that you should have a large number of low-level unit tests, a smaller number of integration tests, and an even smaller number of end-to-end (E2E) tests. This is represented by the shape of the pyramid, with unit tests at the bottom (the widest part), integration tests in the middle, and E2E tests at the top (the narrowest part).
                The rationale behind this recommendation is that unit tests are typically faster and easier to write than integration or E2E tests, and they provide a solid foundation for testing the individual units or components of an application. Integration tests come next and provide a way to test how different units or components work together. Finally, E2E tests are the most expensive and time-consuming to write, but they provide the highest level of confidence that the application is working as expected in a real-world scenario.</p><br /><br />
              <h4 className="mdi-content-send dark center-align"><b>Does the Software Development Life Cycle (SDLC) end?</b></h4><br />
              <p className="text-accent-2 waves-green left-align">The Software Development Life Cycle (SDLC) does not necessarily end, as software often requires ongoing maintenance and updates even after it has been deployed.
                However, the formal SDLC process may be considered complete once the software has been deployed and is in use by the intended audience.
                After the software has been deployed, it may enter a phase of maintenance and support, during which bugs are fixed, updates are made, and new features are added.
                This maintenance phase may continue indefinitely, as long as the software is being used and supported.
                In some cases, the software may reach the end of its useful life and be retired, at which point the SDLC process may be considered fully complete.
                However, in many cases, software is continuously updated and maintained, and the SDLC process may continue in some form even after the initial release of the software.</p><br /><br /><br />
              <h4 className="mdi-content-send dark center-align"><b>How to prevent bugs into production</b></h4><br />
              <p className="text-accent-2 waves-green left-align">Write clean, well-structured code: This can help to reduce the likelihood of bugs occurring in the first place.</p>
              <p className="text-accent-2 waves-green left-align">Use a version control system: This will allow you to track changes to your code and easily revert to a previous version if a bug is introduced.</p>
              <p className="text-accent-2 waves-green left-align">Use automated testing: Automated testing can help to catch bugs before they make it into production.</p>
              <p className="text-accent-2 waves-green left-align">Review code changes: Having other developers review your code changes can help to catch bugs that may have been missed during testing.</p>
              <p className="text-accent-2 waves-green left-align">Use error logging and monitoring: Tools such as error logs and application performance monitoring can help to identify and fix bugs that may occur in production.</p>
              <p className="text-accent-2 waves-green left-align">Implement a robust QA process: A thorough quality assurance (QA) process can help to catch bugs before they make it into production.</p>
              <p className="text-accent-2 waves-green left-align">While it is not possible to completely eliminate the risk of bugs occurring in production, following these best practices can help to minimize the likelihood of bugs occurring and make it easier to identify and fix them when they do occur.</p>
              <br /><br />
            </div>
          </div>
        </div>
      </div>

      {/* Thanks Section */}
      <div className="section no-pad-bot">
        <div className="container">
          <div className="row center">
            <h5 className="header col s12 dark">Thanks for the visit! ☺</h5>
            <p>Feel free to send me an e-mail or connect with me in any social media on top.</p>
            <p>Marcelo Costa</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;