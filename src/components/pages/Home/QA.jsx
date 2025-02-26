import React from 'react';
import './Home.styles.css';

const QA = () => {
  return (
    <div>
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
    </div>
  );
};

export default QA;
