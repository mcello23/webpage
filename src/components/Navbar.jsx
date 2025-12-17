import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onOpenCertificates }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="main-nav" role="navigation" aria-label="Primary">
      <div className="nav-wrapper">
        {/* Left: Brand */}
        <Link to="/" className="brand-logo" aria-label="Home">
          <i className="material-icons" aria-hidden="true">
            home
          </i>
          <span>Marcelo Costa — SDET</span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="mobile-menu-toggle"
          type="button"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
          aria-controls="mobileMenu"
          aria-expanded={isMobileMenuOpen}
        >
          <i className="material-icons" aria-hidden="true">
            menu
          </i>
        </button>

        {/* Center nav */}
        <ul className={`center-nav ${isMobileMenuOpen ? 'active' : ''}`} id="mobileMenu">
          <li className="mobile-home-link">
            <Link to="/" className="mobile-home-btn">
              <i className="material-icons" aria-hidden="true">
                home
              </i>{' '}
              Home
            </Link>
          </li>
          <li>
            <Link to="/side-projects" className="nav-btn nav-btn-projects">
              <i className="material-icons" aria-hidden="true">
                extension
              </i>{' '}
              Side Projects
            </Link>
          </li>
          <li>
            <Link to="/frameworks" className="nav-btn nav-btn-frameworks">
              <i className="material-icons" aria-hidden="true">
                code
              </i>{' '}
              Frameworks
            </Link>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenCertificates) onOpenCertificates();
              }}
              className="nav-btn nav-btn-certs"
            >
              <i className="material-icons" aria-hidden="true">
                card_membership
              </i>{' '}
              Certificates
            </a>
          </li>
        </ul>

        {/* Right: Social + CTAs */}
        <ul className="social-nav">
          <li>
            <a
              href="https://calendly.com/marceloadsc/15min"
              className="cta-link book-call"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a 15-minute call"
            >
              <i className="material-icons" aria-hidden="true">
                schedule
              </i>
              <span>Book 15-min call</span>
            </a>
          </li>
          <li className="nav-separator"></li>
          <li>
            <a
              href="https://github.com/mcello23"
              aria-label="github-link"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/marceloc/"
              aria-label="linkedin-link"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
