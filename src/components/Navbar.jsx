import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onOpenCertificates }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navHeightPx, setNavHeightPx] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileMenuOpen]);

  useLayoutEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const updateNavHeight = () => {
      const height = navEl.getBoundingClientRect().height;
      if (!Number.isFinite(height) || height <= 0) return;
      setNavHeightPx(Math.round(height));
    };

    updateNavHeight();

    let resizeObserver;
    if (typeof window !== 'undefined' && typeof window.ResizeObserver === 'function') {
      resizeObserver = new window.ResizeObserver(() => updateNavHeight());
      resizeObserver.observe(navEl);
    }

    window.addEventListener('resize', updateNavHeight);
    return () => {
      window.removeEventListener('resize', updateNavHeight);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  const overlayStyle =
    isMobileMenuOpen && typeof navHeightPx === 'number'
      ? {
          top: `${navHeightPx}px`,
          height: `calc(100vh - ${navHeightPx}px)`,
        }
      : undefined;

  const mobileMenuStyle =
    isMobileMenuOpen && typeof navHeightPx === 'number'
      ? {
          top: `${navHeightPx}px`,
          maxHeight: `calc(100vh - ${navHeightPx}px)`,
        }
      : undefined;

  return (
    <nav ref={navRef} className="main-nav" role="navigation" aria-label="Primary">
      <div className="nav-wrapper">
        {/* Left: Brand */}
        <Link to="/" className="brand-logo" aria-label="Home" onClick={closeMobileMenu}>
          <i className="material-icons" aria-hidden="true">
            home
          </i>
          <span>Marcelo Costa — SDET</span>
        </Link>

        <button
          className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
          type="button"
          aria-label="Close navigation"
          onClick={closeMobileMenu}
          style={overlayStyle}
        />

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
        <ul
          className={`center-nav ${isMobileMenuOpen ? 'active' : ''}`}
          id="mobileMenu"
          style={mobileMenuStyle}
        >
          <li className="mobile-home-link">
            <Link to="/" className="mobile-home-btn" onClick={closeMobileMenu}>
              <i className="material-icons" aria-hidden="true">
                home
              </i>{' '}
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/side-projects"
              className="nav-btn nav-btn-projects"
              onClick={closeMobileMenu}
            >
              <i className="material-icons" aria-hidden="true">
                extension
              </i>{' '}
              Side Projects
            </Link>
          </li>
          <li>
            <Link to="/frameworks" className="nav-btn nav-btn-frameworks" onClick={closeMobileMenu}>
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
                closeMobileMenu();
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
