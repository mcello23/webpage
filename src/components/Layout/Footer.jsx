import React from 'react';
import './Footer.styles.css';

const Footer = () => {
  return (
    <footer className="page-footer teal">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">About Me</h5>
            <p className="grey-text text-lighten-4">QA Lead with experience in companies like Apple, EA and Nespresso IoT.</p>
          </div>
          <div className="col l3 s12">
            <h5 className="white-text">Connect</h5>
            <ul>
              <li><a className="white-text" href="https://github.com/mcello23">GitHub</a></li>
              <li><a className="white-text" href="https://www.linkedin.com/in/marceloc/">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} Marcelo Costa
        </div>
      </div>
    </footer>
  );
};

export default Footer;
