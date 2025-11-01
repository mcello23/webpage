/**
 * Cookie Consent Manager
 * Handles cookie consent for GDPR/LGPD compliance and Google Analytics integration
 */

(function () {
  'use strict';

  const COOKIE_NAME = 'cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  // Google Analytics Measurement ID
  const GA_MEASUREMENT_ID = 'G-J2EX4QG684';

  /**
   * Get cookie value by name
   */
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  /**
   * Set cookie with expiry
   */
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  }

  /**
   * Initialize Google Analytics
   */
  function initGoogleAnalytics() {
    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true, // Anonymize IPs for privacy
      cookie_flags: 'SameSite=Lax;Secure', // Secure cookies
    });

    console.log('Google Analytics initialized');
  }

  /**
   * Show cookie consent banner
   */
  function showBanner() {
    const banner = document.getElementById('cookieConsentBanner');
    if (banner) {
      banner.classList.add('show');
      banner.setAttribute('aria-hidden', 'false');
    }
  }

  /**
   * Hide cookie consent banner
   */
  function hideBanner() {
    const banner = document.getElementById('cookieConsentBanner');
    if (banner) {
      banner.classList.remove('show');
      banner.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Handle accept cookies
   */
  function acceptCookies() {
    setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY_DAYS);
    initGoogleAnalytics();
    hideBanner();

    // Track consent acceptance
    if (window.gtag) {
      window.gtag('event', 'cookie_consent', {
        event_category: 'Consent',
        event_label: 'Accepted',
      });
    }
  }

  /**
   * Handle decline cookies
   */
  function declineCookies() {
    setCookie(COOKIE_NAME, 'declined', COOKIE_EXPIRY_DAYS);
    hideBanner();

    // Don't initialize analytics
    console.log('Cookies declined - Analytics not loaded');
  }

  /**
   * Check consent status and initialize accordingly
   */
  function checkConsent() {
    const consent = getCookie(COOKIE_NAME);

    if (consent === 'accepted') {
      // User previously accepted, load analytics
      initGoogleAnalytics();
    } else if (consent === 'declined') {
      // User previously declined, do nothing
      console.log('User has declined cookies');
    } else {
      // No consent yet, show banner
      showBanner();
    }
  }

  /**
   * Initialize consent manager
   */
  function init() {
    // Create banner HTML if it doesn't exist
    if (!document.getElementById('cookieConsentBanner')) {
      const bannerHTML = `
        <div id="cookieConsentBanner" class="cookie-consent-banner" role="dialog" aria-live="polite" aria-label="Cookie consent banner" aria-describedby="cookieConsentText">
          <div class="cookie-consent-content">
            <div class="cookie-consent-text">
              <h4>🍪 This site uses cookies</h4>
              <p id="cookieConsentText">
                We use cookies and Google Analytics to understand how you interact with our portfolio 
                (pages visited, time spent, traffic source). Your data is processed anonymously and 
                following GDPR/LGPD regulations. You can accept or decline.
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </p>
            </div>
            <div class="cookie-consent-buttons">
              <button id="acceptCookies" class="cookie-consent-btn cookie-consent-btn-accept" aria-label="Accept all cookies">
                <i class="material-icons" aria-hidden="true">check_circle</i>
                Accept
              </button>
              <button id="declineCookies" class="cookie-consent-btn cookie-consent-btn-decline" aria-label="Decline cookies">
                <i class="material-icons" aria-hidden="true">cancel</i>
                Decline
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', bannerHTML);

      // Attach event listeners
      document.getElementById('acceptCookies').addEventListener('click', acceptCookies);
      document.getElementById('declineCookies').addEventListener('click', declineCookies);
    }

    // Check existing consent
    checkConsent();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose public API for manual control (optional)
  window.CookieConsent = {
    accept: acceptCookies,
    decline: declineCookies,
    reset: function () {
      setCookie(COOKIE_NAME, '', -1); // Delete cookie
      window.location.reload();
    },
    getStatus: function () {
      return getCookie(COOKIE_NAME);
    },
  };
})();
