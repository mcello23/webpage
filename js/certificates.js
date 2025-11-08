/**
 * @fileoverview Modern Certificate Gallery System
 * Manages display and interaction of professional certificates with modal gallery
 * @author Marcelo Costa
 * @version 2.0.0
 */

/**
 * Certificate data structure
 * @typedef {Object} Certificate
 * @property {number} id - Unique certificate identifier (1-33)
 * @property {string} title - Certificate title/name
 * @property {string} image - Path to full-size certificate image
 * @property {string} thumb - Path to thumbnail image (300px width)
 * @property {string} [linkedinUrl] - Optional LinkedIn verification URL
 * @property {string} category - Certificate category (e.g., 'Automation', 'Security')
 */

/**
 * Detects if the current page is in a subfolder and returns appropriate base path
 * This allows the certificate paths to work correctly from both root and deeply nested /pages/ directories
 *
 * @returns {string} Base path - returns '../../' for deeply nested pages, '../' for /pages/, empty string otherwise
 *
 * @example
 * // From root index.html
 * getBasePath(); // returns ''
 *
 * @example
 * // From pages/frameworks/index.html (2 levels deep)
 * getBasePath(); // returns '../../'
 */
const getBasePath = () => {
  const path = window.location.pathname;
  // If we're in a deeper subfolder like /pages/frameworks/ or /pages/side_proj/
  if (path.match(/\/pages\/[^/]+\/[^/]*$/)) {
    return '../../';
  }
  // If we're just in /pages/
  if (path.includes('/pages/')) {
    return '../';
  }
  // Otherwise (root level)
  return '';
};

/**
 * Escapes HTML special characters to prevent XSS attacks
 * Converts <, >, &, ', and " to their HTML entity equivalents
 *
 * @param {string} text - Raw text that may contain HTML special characters
 * @returns {string} Sanitized text safe for HTML insertion
 *
 * @example
 * escapeHtml('<script>alert("xss")</script>');
 * // returns '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Array of all professional certificates
 * Contains 33 certificates across various categories including:
 * - Automation (Cypress, Playwright, Selenium)
 * - Security (Cybersecurity)
 * - Cloud (AWS)
 * - Testing methodologies
 * - Programming languages
 *
 * @type {Certificate[]}
 * @constant
 */
const certificates = [
  {
    id: 1,
    title: 'Cybersecurity at Work (2020)',
    image: 'images/cybersecurity.jpg',
    thumb: 'images/thumbs/cybersecurity.jpg',
    linkedinUrl:
      'https://media.licdn.com/dms/image/v2/D4D22AQFke1XPPO939g/feedshare-shrink_1280/B4DZbnYDl9GwAk-/0/1747638565531?e=1762992000&v=beta&t=l0H8_H_fvNqIyC595aJ3qtdZRGMJgXD0pTu2T2VhAKQ',
    category: 'Security',
  },
  {
    id: 2,
    title: 'Foundations of Building in Board',
    image: 'images/board.jpg',
    thumb: 'images/thumbs/board.jpg',
    linkedinUrl: 'https://verify.skilljar.com/c/z7jso2cmtnu9',
    category: 'Professional Development',
  },
  {
    id: 3,
    title: 'Automated Tests with Cypress - Advanced',
    image: 'images/UC-39fc4bb5-3720-47d1-b884-e53ee0a1f936.jpg',
    thumb: 'images/thumbs/UC-39fc4bb5-3720-47d1-b884-e53ee0a1f936.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-39fc4bb5-3720-47d1-b884-e53ee0a1f936.jpg',
    category: 'Automation',
  },
  {
    id: 4,
    title: 'Design Elements of Automated Tests',
    image: 'images/UC-12a0727f-82b2-4108-ad97-8947707d1ba1.jpg',
    thumb: 'images/thumbs/UC-12a0727f-82b2-4108-ad97-8947707d1ba1.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-12a0727f-82b2-4108-ad97-8947707d1ba1.jpg',
    category: 'Automation',
  },
  {
    id: 5,
    title: 'Playwright UI + API (10h course)',
    image: 'images/UC-88588b80-4852-423b-9f93-039ae5f2cc5e.jpg',
    thumb: 'images/thumbs/UC-88588b80-4852-423b-9f93-039ae5f2cc5e.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-88588b80-4852-423b-9f93-039ae5f2cc5e.jpg',
    category: 'Automation',
  },
  {
    id: 6,
    title: 'AWS for Developers: DynamoDB',
    image: 'images/aws-dynamodb.jpg',
    thumb: 'images/thumbs/aws-dynamodb.jpg',
    linkedinUrl:
      'https://media.licdn.com/dms/image/v2/D4D22AQHNS8U5TjzdNg/feedshare-shrink_1280/feedshare-shrink_1280/0/1722884986716?e=1762992000&v=beta&t=iaHiWep-wdSUg6s1nSFrE7sFInQ_8QovT80_EVl53rs',
    category: 'Cloud',
  },
  {
    id: 7,
    title: 'Learning Docker',
    image: 'images/docker.jpg',
    thumb: 'images/thumbs/docker.jpg',
    linkedinUrl:
      'https://media.licdn.com/dms/image/v2/D4D22AQHXHJSvzN_h-A/feedshare-shrink_1280/feedshare-shrink_1280/0/1723015527681?e=1762992000&v=beta&t=ThBu_6L62Yvn7xrDsQQPkfSN3rGKxy8_q4QveKFlBGI',
    category: 'DevOps',
  },
  {
    id: 8,
    title: 'Best Practices in Test Automation with Cypress',
    image: 'images/UC-54a76f1a-f88a-4604-8ff2-8c79769b7508.jpg',
    thumb: 'images/thumbs/UC-54a76f1a-f88a-4604-8ff2-8c79769b7508.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-54a76f1a-f88a-4604-8ff2-8c79769b7508.jpg',
    category: 'Automation',
  },
  {
    id: 9,
    title: 'E2E Tests With Cypress',
    image: 'images/UC-142d6308-80ac-4a93-9a4b-36dd743fbd72.jpg',
    thumb: 'images/thumbs/UC-142d6308-80ac-4a93-9a4b-36dd743fbd72.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-142d6308-80ac-4a93-9a4b-36dd743fbd72.jpg',
    category: 'Automation',
  },
  {
    id: 10,
    title: 'Playwright Automation',
    image: 'images/UC-85215a99-00cb-493a-b171-15a7faf9a381.jpg',
    thumb: 'images/thumbs/UC-85215a99-00cb-493a-b171-15a7faf9a381.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-85215a99-00cb-493a-b171-15a7faf9a381.jpg',
    category: 'Automation',
  },
  {
    id: 11,
    title: 'GraphQL Essential Training',
    image: 'images/graphql.jpg',
    thumb: 'images/thumbs/graphql.jpg',
    linkedinUrl:
      'https://media.licdn.com/dms/image/v2/D4D22AQH6xNoDHDyveg/feedshare-shrink_1280/feedshare-shrink_1280/0/1715963048627?e=1762992000&v=beta&t=JtMizTcORSSrhMFHJiFpKaQYdLESEoB_G92Ti5Bg4jE',
    category: 'Development',
  },
  {
    id: 12,
    title: 'End-to-End JavaScript Testing with Cypress.io',
    image: 'images/cypress-linkedin.jpg',
    thumb: 'images/thumbs/cypress-linkedin.jpg',
    linkedinUrl:
      'https://media.licdn.com/dms/image/v2/D4D22AQGo5-jtfcasJg/feedshare-shrink_1280/feedshare-shrink_1280/0/1709584528369?e=1762992000&v=beta&t=tFQLRceyjxLunTazsJJ1S5UX5Wi9bZ_dIT4P9ncqHqk',
    category: 'Automation',
  },
  {
    id: 13,
    title: 'API Testing Foundations',
    image: 'images/api-testing.jpg',
    thumb: 'images/thumbs/api-testing.jpg',
    linkedinUrl:
      'https://media.licdn.com/dms/image/v2/D4D22AQGvNJw23IEkSw/feedshare-shrink_1280/feedshare-shrink_1280/0/1708879918613?e=1762992000&v=beta&t=sPpjkqtkKqSxl5rH2pRkN_uf5W0a7MKLJwQ3OPIjR5E',
    category: 'Testing',
  },
  {
    id: 14,
    title: 'Gherkin Language - The Master Guide',
    image: 'images/UC-67a4c481-8909-4c08-8517-23921c6bd2e9.jpg',
    thumb: 'images/thumbs/UC-67a4c481-8909-4c08-8517-23921c6bd2e9.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-67a4c481-8909-4c08-8517-23921c6bd2e9.jpg',
    category: 'Testing',
  },
  {
    id: 15,
    title: 'Learning Selenium',
    image: 'images/selenium-linkedin.jpg',
    thumb: 'images/thumbs/selenium-linkedin.jpg',
    linkedinUrl:
      'https://media.licdn.com/dms/image/v2/D4D22AQEzjqAqERjQ2g/feedshare-shrink_1280/feedshare-shrink_1280/0/1708448875122?e=1762992000&v=beta&t=VhYTrETd6ByPVJ5OwnQ10-TcgrT0vnI6Ti1ROyXjFVQ',
    category: 'Automation',
  },
  {
    id: 16,
    title: 'Test Automation Foundations',
    image: 'images/test-automation.jpg',
    thumb: 'images/thumbs/test-automation.jpg',
    linkedinUrl:
      'https://media.licdn.com/dms/image/v2/D4D22AQGCYbHrcmJPUg/feedshare-shrink_1280/feedshare-shrink_1280/0/1708504114586?e=1762992000&v=beta&t=hbewuGkudA1p-D2rMfDb1FNeRm89CkxxeS3m33eXl-o',
    category: 'Testing',
  },
  {
    id: 17,
    title: 'Working with Difficult People',
    image: 'images/difficult-people.jpg',
    thumb: 'images/thumbs/difficult-people.jpg',
    linkedinUrl:
      'https://media.licdn.com/dms/image/v2/D4D22AQHTc7dRbOs-Og/feedshare-shrink_1280/feedshare-shrink_1280/0/1708538967766?e=1762992000&v=beta&t=DuzR2HYTirHBHSVsLEDeEARFVWIpJVeiYBjDOtFTy8c',
    category: 'Soft Skills',
  },
  {
    id: 18,
    title: 'Automation Selenium WebDriver + Java',
    image: 'images/Selenium WebDriver e Java.jpg',
    thumb: 'images/thumbs/Selenium WebDriver e Java.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-1116695d-00b3-460d-8f24-76f425a23a01.jpg',
    category: 'Automation',
  },
  {
    id: 19,
    title: 'Mobile Automation: Appium Cucumber Android & iOS + Jenkins',
    image: 'images/cucumber_appium.jpg',
    thumb: 'images/thumbs/cucumber_appium.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-30dbd631-5bcf-466b-93d6-3ef05d78483a.jpg',
    category: 'Automation',
  },
  {
    id: 20,
    title: 'Agile Management with Scrum',
    image: 'images/agile.jpg',
    thumb: 'images/thumbs/agile.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-88ad0517-d467-4316-8762-060c717917ff.jpg',
    category: 'Methodology',
  },
  {
    id: 21,
    title: 'Automation Test with Cypress - Basics',
    image: 'images/UC-b1bf6ead-40d6-4942-9166-59de03c1f975.jpg',
    thumb: 'images/thumbs/UC-b1bf6ead-40d6-4942-9166-59de03c1f975.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-b1bf6ead-40d6-4942-9166-59de03c1f975.jpg',
    category: 'Automation',
  },
  {
    id: 22,
    title: 'Automation Test with Cypress - Intermediary',
    image: 'images/cyp-inter.jpg',
    thumb: 'images/thumbs/cyp-inter.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-b02729a5-faf9-4a21-bd84-ce7ed2057bf1.jpg',
    category: 'Automation',
  },
  {
    id: 23,
    title: 'Web Design for Beginners: Real World Coding in HTML & CSS',
    image: 'images/UC-d3955587-e5a2-416e-a652-9a95704f5f5c.jpg',
    thumb: 'images/thumbs/UC-d3955587-e5a2-416e-a652-9a95704f5f5c.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-d3955587-e5a2-416e-a652-9a95704f5f5c.jpg',
    category: 'Web Development',
  },
  {
    id: 24,
    title: 'Software Testing: Becoming an Expert',
    image: 'images/UC-3ef466ba-72f0-4bc2-8d3e-c01128ea22f9.jpg',
    thumb: 'images/thumbs/UC-3ef466ba-72f0-4bc2-8d3e-c01128ea22f9.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-3ef466ba-72f0-4bc2-8d3e-c01128ea22f9.jpg',
    category: 'Testing',
  },
  {
    id: 25,
    title: 'Postman Introduction',
    image: 'images/UC-808536a6-a2bd-44e2-9b9a-74f423f72c72.jpg',
    thumb: 'images/thumbs/UC-808536a6-a2bd-44e2-9b9a-74f423f72c72.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-808536a6-a2bd-44e2-9b9a-74f423f72c72.jpg',
    category: 'API Testing',
  },
  {
    id: 26,
    title: 'The Python Bible™ | Everything You Need to Program in Python',
    image: 'images/UC-b9368ddf-124c-464a-8cc4-4f1be7d63754.jpg',
    thumb: 'images/thumbs/UC-b9368ddf-124c-464a-8cc4-4f1be7d63754.jpg',
    linkedinUrl:
      'https://mcello23.github.io/webpage/images/UC-b9368ddf-124c-464a-8cc4-4f1be7d63754.jpg',
    category: 'Programming',
  },
  {
    id: 27,
    title: 'GitHub Intensive Course',
    image: 'images/UC-5c615f9b-603b-4140-a57e-5349ab84ee6f.jpg',
    thumb: 'images/thumbs/UC-5c615f9b-603b-4140-a57e-5349ab84ee6f.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-5c615f9b-603b-4140-a57e-5349ab84ee6f.jpg',
    category: 'Development Tools',
  },
  {
    id: 28,
    title: 'Regular Expressions',
    image: 'images/UC-9b5ea711-6721-49cd-8281-83248eb4179b.jpg',
    thumb: 'images/thumbs/UC-9b5ea711-6721-49cd-8281-83248eb4179b.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-9b5ea711-6721-49cd-8281-83248eb4179b.jpg',
    category: 'Programming',
  },
  {
    id: 29,
    title: 'Python for Beginners (Python 3)',
    image: 'images/UC-f46ea1bb-4ed8-4269-aa12-6b18d0b24028.jpg',
    thumb: 'images/thumbs/UC-f46ea1bb-4ed8-4269-aa12-6b18d0b24028.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/image/UC-f46ea1bb-4ed8-4269-aa12-6b18d0b24028.jpg',
    category: 'Programming',
  },
  {
    id: 30,
    title: 'Cypress - Modern Automation Testing from Scratch + Frameworks',
    image: 'images/UC-7479ab2b-a38b-482b-bf11-60b9d2188496.jpg',
    thumb: 'images/thumbs/UC-7479ab2b-a38b-482b-bf11-60b9d2188496.jpg',
    linkedinUrl:
      'https://github.com/mcello23/webpage/blob/f96ba9d216839fb6c1206c55d8de6b12eaf60f51/images/UC-7479ab2b-a38b-482b-bf11-60b9d2188496.jpg',
    category: 'Automation',
  },
  {
    id: 31,
    title: 'Swift 5 Programming For Beginners',
    image: 'images/Swift 5.jpg',
    thumb: 'images/thumbs/Swift 5.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/pdf/UC-555d631a-3f31-4e89-944f-bdd37776119c.pdf',
    category: 'Programming',
  },
  {
    id: 32,
    title: 'Certified ISTQB Agile Tester Foundation Level',
    image: 'images/ISTQB.jpg',
    thumb: 'images/thumbs/ISTQB.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/pdf/UC-ca765bd5-d84c-48c9-921d-7db81ec48838.pdf',
    category: 'Testing',
  },
  {
    id: 33,
    title: 'GitHub Ultimate: Master Git and GitHub - Beginner to Expert',
    image: 'images/GitHub.jpg',
    thumb: 'images/thumbs/GitHub.jpg',
    linkedinUrl:
      'https://udemy-certificate.s3.amazonaws.com/pdf/UC-678f1482-4b6e-4966-8ee6-7d6923511e6d.pdf',
    category: 'Development Tools',
  },
];

/**
 * Certificate Modal Controller
 * Manages the certificate gallery modal with grid view, detail view, and navigation
 * Implements keyboard shortcuts, lazy loading, and accessibility features
 *
 * @class CertificateModal
 * @example
 * // Initialize modal (done automatically on DOMContentLoaded)
 * const modal = new CertificateModal();
 * modal.open(); // Opens the modal
 */
class CertificateModal {
  /**
   * Creates a new CertificateModal instance
   * Initializes modal state, loads certificate data, and sets up DOM references
   *
   * @constructor
   * @throws {Error} Logs error if modal container element is not found
   */
  constructor() {
    /**
     * Current certificate index being displayed (0-based)
     * @type {number}
     * @private
     */
    this.currentIndex = 0;

    /**
     * Array of all certificates to display
     * @type {Certificate[]}
     * @private
     */
    this.certificates = certificates;

    /**
     * Main modal container DOM element
     * @type {HTMLElement|null}
     * @private
     */
    this.container = document.getElementById('certificateModal');

    if (!this.container) {
      console.error('Certificate modal container not found!');
      return;
    }

    console.log('🔍 Modal container found:', this.container);
    this.init();
  }

  /**
   * Initializes the modal by creating HTML structure and attaching event listeners
   * Called automatically by constructor
   *
   * @private
   * @returns {void}
   */
  init() {
    this.createModal();
    this.attachEventListeners();
  }

  /**
   * Creates the modal HTML structure and injects it into the container
   * Generates both the grid view and detail viewer components
   *
   * @private
   * @returns {void}
   */
  createModal() {
    const modalHTML = `
        <div class="cert-modal-content">
          <button class="cert-close" aria-label="Close modal">&times;</button>
          
          <div class="cert-header">
            <h2>Professional Certificates</h2>
            <p class="cert-count"><span id="currentCert">1</span> / ${certificates.length}</p>
          </div>

          <div class="cert-grid" id="certGrid">
            ${this.generateCertificateGrid()}
          </div>

          <div class="cert-viewer" id="certViewer" style="display: none;">
            <button class="cert-nav cert-prev" aria-label="Previous certificate">
              <i class="material-icons">chevron_left</i>
            </button>
            
            <div class="cert-image-container">
              <img id="certImage" src="" alt="Certificate" loading="lazy" decoding="async">
              <div class="cert-details">
                <h3 id="certTitle"></h3>
                <span class="cert-category" id="certCategory"></span>
                <div class="cert-actions">
                  <a id="viewFullBtn" href="#" target="_blank" class="btn-small teal">
                    <i class="material-icons left">open_in_new</i>View Full Size
                  </a>
                  <a id="linkedinBtn" href="#" target="_blank" class="btn-small blue" style="display: none;">
                    <i class="fab fa-linkedin left"></i>View on LinkedIn
                  </a>
                </div>
              </div>
            </div>
            
            <button class="cert-nav cert-next" aria-label="Next certificate">
              <i class="material-icons">chevron_right</i>
            </button>
            
            <button class="cert-back" id="backToGrid">
              <i class="material-icons">grid_view</i> Back to Grid
            </button>
          </div>
        </div>
    `;

    this.container.innerHTML = modalHTML;
  }

  /**
   * Generates HTML grid of certificate cards with thumbnails
   * Each card is clickable and opens the certificate detail view
   * Images are lazy-loaded for performance optimization
   * All text content is escaped to prevent XSS attacks
   *
   * @private
   * @returns {string} HTML string containing all certificate cards
   */
  generateCertificateGrid() {
    const basePath = getBasePath();
    return this.certificates
      .map(
        (cert) => `
      <div class="cert-card" data-id="${cert.id}" onclick="window.certificateModal.openCertificate(${
        cert.id - 1
      })">
        <div class="cert-card-image">
          <img src="${basePath}${escapeHtml(cert.thumb)}" alt="${escapeHtml(
            cert.title
          )}" loading="lazy" decoding="async">
          <div class="cert-card-overlay">
            <i class="material-icons">visibility</i>
            <span>View Certificate</span>
          </div>
        </div>
        <div class="cert-card-content">
          <h4>${escapeHtml(cert.title)}</h4>
          <span class="cert-badge">${escapeHtml(cert.category)}</span>
          ${
            cert.linkedinUrl
              ? '<i class="fab fa-linkedin cert-linkedin-icon" title="Available on LinkedIn"></i>'
              : ''
          }
        </div>
      </div>
    `
      )
      .join('');
  }

  /**
   * Attaches all event listeners for modal interaction
   * Includes click handlers, keyboard navigation, and modal triggers
   *
   * @private
   * @returns {void}
   */
  attachEventListeners() {
    // Open modal
    document.querySelectorAll('.modal-trigger').forEach((trigger) => {
      if (trigger.getAttribute('href') === '#modal1') {
        trigger.onclick = (e) => {
          e.preventDefault();
          this.open();
        };
      }
    });

    // Close modal
    const closeBtn = this.container.querySelector('.cert-close');

    closeBtn.onclick = () => this.close();

    this.container.onclick = (e) => {
      if (e.target === this.container) this.close();
    };

    // Navigation
    this.container.querySelector('.cert-prev').onclick = () => this.navigate(-1);
    this.container.querySelector('.cert-next').onclick = () => this.navigate(1);
    this.container.querySelector('#backToGrid').onclick = () => this.showGrid();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.container.classList.contains('active')) return;

      const viewer = document.getElementById('certViewer');
      const isViewerActive = viewer.style.display !== 'none';

      if (e.key === 'Escape') this.close();
      if (isViewerActive && e.key === 'ArrowLeft') this.navigate(-1);
      if (isViewerActive && e.key === 'ArrowRight') this.navigate(1);
      if (isViewerActive && e.key === 'Backspace') {
        e.preventDefault();
        this.showGrid();
      }
    });
  }

  /**
   * Opens the certificate modal and displays the grid view
   * Disables body scroll to prevent background scrolling
   *
   * @public
   * @returns {void}
   */
  open() {
    console.log('🔍 Opening modal...');
    this.container.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.showGrid();
  }

  /**
   * Closes the certificate modal and restores page scroll
   *
   * @public
   * @returns {void}
   */
  close() {
    this.container.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Shows the certificate grid view and hides the detail viewer
   *
   * @public
   * @returns {void}
   */
  showGrid() {
    document.getElementById('certGrid').style.display = 'grid';
    document.getElementById('certViewer').style.display = 'none';
  }

  /**
   * Opens a specific certificate in detail view
   *
   * @public
   * @param {number} index - Zero-based index of certificate to display (0-32)
   * @returns {void}
   *
   * @example
   * modal.openCertificate(0); // Opens first certificate
   */
  openCertificate(index) {
    this.currentIndex = index;
    this.updateViewer();
    document.getElementById('certGrid').style.display = 'none';
    document.getElementById('certViewer').style.display = 'flex';
  }

  /**
   * Navigates to next or previous certificate with wrap-around
   * Uses modulo arithmetic to ensure index stays within valid range
   *
   * @public
   * @param {number} direction - Direction to navigate: 1 for next, -1 for previous
   * @returns {void}
   *
   * @example
   * modal.navigate(1);  // Go to next certificate
   * modal.navigate(-1); // Go to previous certificate
   */
  navigate(direction) {
    this.currentIndex = (this.currentIndex + direction + certificates.length) % certificates.length;
    this.updateViewer();
  }

  /**
   * Updates the detail viewer with current certificate information
   * Sets image source, title, category, and LinkedIn button visibility
   * Uses XSS-safe textContent instead of innerHTML for user-generated content
   *
   * @private
   * @returns {void}
   */
  updateViewer() {
    const cert = certificates[this.currentIndex];
    const basePath = getBasePath();

    // Use XSS-safe assignments
    const certImage = document.getElementById('certImage');
    certImage.src = basePath + cert.image;
    certImage.alt = cert.title; // Safe - browser handles escaping in attributes

    document.getElementById('certTitle').textContent = cert.title; // XSS-safe
    document.getElementById('certCategory').textContent = cert.category; // XSS-safe
    document.getElementById('currentCert').textContent = this.currentIndex + 1;
    document.getElementById('viewFullBtn').href = basePath + cert.image;

    const linkedinBtn = document.getElementById('linkedinBtn');
    if (cert.linkedinUrl) {
      linkedinBtn.href = cert.linkedinUrl;
      linkedinBtn.style.display = 'inline-flex';
    } else {
      linkedinBtn.style.display = 'none';
    }
  }
}

// Initialize when DOM is ready and make it globally available
window.certificateModal = null;

// Fallback function for onclick handlers
window.openCertificateModal = function () {
  if (window.certificateModal) {
    window.certificateModal.open();
  } else {
    console.warn('Certificate modal not yet initialized');
  }
};

console.log('🔍 certificates.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('🔍 DOMContentLoaded fired, initializing modal...');
  window.certificateModal = new CertificateModal();
  console.log('✅ Certificate modal initialized:', window.certificateModal);
});
