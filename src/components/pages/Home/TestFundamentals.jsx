import React from 'react';
import './Home.styles.css';

const TestFundamentals = () => {
  return (
    <div>
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
    </div>
  );
};

export default TestFundamentals;
