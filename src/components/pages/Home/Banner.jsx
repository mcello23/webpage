import React from 'react';
import './Home.styles.css';

const Banner = () => {
  return (
    <div id="index-banner" className="parallax-container">
      <div className="section no-pad-bot">
        <div className="container">
          <br /><br />
          <h2 className="header center teal-text text-lighten-5">Portfolio</h2>
          <div className="row center">
            <a href="/frameworks" id="download-button1" className="btn-large waves-effect waves-light teal lighten-1 pad">Frameworks</a>
            <a href="/projects" id="download-button2" className="btn-large waves-effect waves-light teal lighten-1 pad">Side Projects</a>
            <a href="#modal1" id="download-button3" className="btn-large waves-effect waves-light teal lighten-1 pad modal-trigger">Certificates</a>
          </div>
          <h3 className="header center teal-text white-text">Marcelo Costa</h3>
        </div>
      </div>
      <div className="parallax"><img src={process.env.PUBLIC_URL + "/backgrounds/background2_coding.jpg"} alt="Unsplashed background img 1" /></div>
    </div>
  );
};

export default Banner;
