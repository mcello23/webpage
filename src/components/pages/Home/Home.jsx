import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import './Home.styles.css';

const Home = () => {
  useEffect(() => {
    // Inicializar todos os componentes Materialize necessários
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
    
    var elemParallax = document.querySelectorAll('.parallax');
    M.Parallax.init(elemParallax);

    // Inicialização do juicebox se necessário
    if (window.juicebox) {
      new window.juicebox({
        containerId: "juicebox-container",
        galleryWidth: "1280",
        galleryHeight: "720",
        backgroundColor: "#222222",
      }, {
        scaleToFit: false,
        enableKeyboardControls: true,
        showOpenButton: true,
      });
    }
  }, []);

  return (
    <>
      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <h2 className="header center teal-text text-lighten-5">Portfolio</h2>
            <div className="row center">
              <Link to="/frameworks" id="download-button1" className="btn-large waves-effect waves-light teal lighten-1 pad">Frameworks</Link>
              <Link to="/projects" id="download-button2" className="btn-large waves-effect waves-light teal lighten-1 pad">Side Projects</Link>
              <a href="#modal1" id="download-button3" className="btn-large waves-effect waves-light teal lighten-1 pad modal-trigger">Certificates</a>
            </div>
            <h3 className="header center teal-text text-lighten-5">Marcelo Costa</h3>
          </div>
        </div>
        <div className="parallax"><img src={process.env.PUBLIC_URL + "/backgrounds/background5_rams.jpg"} alt="Background" /></div>
      </div>

      {/* Modal para certificados */}
      <div id="modal1" className="modal">
        <div className="modal-content">
          <div id="juicebox-container" className="juicebox-container"></div>
        </div>
      </div>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                <h5 className="center">Test Automation</h5>
                <p className="light">Experienced in designing and implementing automated test frameworks for web and mobile applications. Proficient in creating efficient and maintainable test scripts that improve testing efficiency and ensure product quality.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                <h5 className="center">Software Testing</h5>
                <p className="light">Skilled in various testing methodologies including functional, regression, integration, and exploratory testing. Able to develop comprehensive test plans and execute them methodically to identify potential issues before they reach production.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
                <h5 className="center">Quality Assurance</h5>
                <p className="light">Dedicated to ensuring software meets the highest quality standards. Experienced in working with development teams to implement best practices and processes that result in reliable, user-friendly products.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <h2 className="header col s12 dark">About Me</h2>
            </div>
          </div>
        </div>
        <div className="parallax"><img src={process.env.PUBLIC_URL + "/backgrounds/background5_rams.jpg"} alt="Background" /></div>
      </div>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 center">
              <h3><i className="mdi-content-send brown-text"></i></h3>
              <h4>Marcelo Costa</h4>
              <img className="image-desc" src={process.env.PUBLIC_URL + "/images/eu_formatado.jpg"} alt="eu" />
              <p className="left-align light">I am a detail-oriented and analytical professional with a background in software testing and automation. With a passion for technology and a keen eye for identifying and resolving issues, I have consistently delivered high-quality results in various testing roles. My expertise lies in developing and executing test plans, creating automated test scripts, and collaborating with cross-functional teams to ensure software meets the highest standards.</p>
              <p className="left-align light">I am dedicated to continuous learning and staying up-to-date with the latest industry trends and technologies. I thrive in dynamic environments and enjoy tackling complex challenges to improve software quality and user experience.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
