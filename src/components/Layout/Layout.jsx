import React from 'react';
import Navbar from './Navbar';
import './Layout.styles.css';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <footer className="page-footer teal">
        <div className="container">
          <div className="row">
            <div className="col l12 s12 center-align">
              <h5 className="white-text">Thanks for visiting! ☺</h5>
              <p className="grey-text text-lighten-4">Feel free to send me an e-mail or connect with me in any social media on top.</p>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container center-align">
            © 2024 Marcelo Costa
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
