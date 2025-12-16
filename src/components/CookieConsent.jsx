import { useEffect, useState } from 'react';

const COOKIE_NAME = 'cookie_consent';
const COOKIE_EXPIRY_DAYS = 365;
const GA_MEASUREMENT_ID = 'G-J2EX4QG684';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const shouldEnableAnalytics = () => {
    const isTestEnv =
      typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test';

    if (isTestEnv) return true;
    if (typeof window === 'undefined') return false;

    const localHosts = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);
    return !localHosts.has(window.location.hostname);
  };

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      initGoogleAnalytics();
    }
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  };

  const initGoogleAnalytics = () => {
    if (!shouldEnableAnalytics()) return;
    if (window.gtag) return; // Already initialized

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=Lax;Secure',
      debug_mode: true,
    });
  };

  const handleAccept = () => {
    setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY_DAYS);
    initGoogleAnalytics();
    setIsVisible(false);

    if (window.gtag) {
      window.gtag('event', 'cookie_consent', {
        event_category: 'Consent',
        event_label: 'Accepted',
      });
    }
  };

  const handleDecline = () => {
    setCookie(COOKIE_NAME, 'declined', COOKIE_EXPIRY_DAYS);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookieConsentBanner"
      className="cookie-consent-banner show"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      aria-describedby="cookieConsentText"
    >
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <p style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 8px 0', color: '#ffffff' }}>
            🍪 This site uses cookies
          </p>
          <p id="cookieConsentText" style={{ color: '#ffffff' }}>
            We use cookies and Google Analytics to understand how you interact with our portfolio
            (pages visited, time spent, traffic source). Your data is processed anonymously and
            following GDPR/LGPD regulations. You can accept or decline.
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffffff', textDecoration: 'underline' }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
        <div className="cookie-consent-buttons">
          <button
            id="acceptCookies"
            className="cookie-consent-btn cookie-consent-btn-accept"
            aria-label="Accept all cookies"
            onClick={handleAccept}
          >
            <i className="material-icons" aria-hidden="true">
              check_circle
            </i>
            Accept
          </button>
          <button
            id="declineCookies"
            className="cookie-consent-btn cookie-consent-btn-decline"
            aria-label="Decline cookies"
            onClick={handleDecline}
          >
            <i className="material-icons" aria-hidden="true">
              cancel
            </i>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
