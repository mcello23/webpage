import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.styles.css';
import './Navbar.styles.css'; // Import the CSS file

interface LayoutProps {
  children: React.ReactNode;
}

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/" className="material-icons house-logo">
              <i className="material-icons">home</i>
            </Link>
          </li>
          <li>
            <a 
              href="https://github.com/mcello23" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <i className="material-icons fab fa-github"></i>
            </a>
          </li>
          <li>
            <a 
              href="https://www.linkedin.com/in/marceloc/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <i className="material-icons fab fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a 
              href="mailto:marceloadsc@gmail.com?subject=Hello&body=Hi%2C%20how%20are%20you%3F" 
              aria-label="Email Link"
            >
              <i className="material-icons">mail_outline</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <div className="container">
          <div className="row">
            <div className="col l12 s12 center-align">
              <h5 className="white-text">Thanks for visiting! ☺</h5>
              <p className="grey-text text-lighten-4">Feel free to send me an e-mail or connect with me in any social media on top.</p>
            </div>
          </div>
        </div>
        <div className="footer-copyright teal">
          <div className="container center-align">
            © 2024 Marcelo Costa
          </div>
        </div>
    </div>
  );
};

export default Layout;