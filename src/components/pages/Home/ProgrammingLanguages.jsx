import React from 'react';
import './Home.styles.css';

const ProgrammingLanguages = () => {
  return (
    <div>
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
    </div>
  );
};

export default ProgrammingLanguages;
