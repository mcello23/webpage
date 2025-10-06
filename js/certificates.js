// Modern Certificate Gallery Data
// Each certificate can have a LinkedIn credential URL if available

// Detect if we're in a subfolder (like pages/) and adjust paths
const getBasePath = () => {
  const path = window.location.pathname;
  // If we're in a subfolder (contains /pages/), add ../ prefix
  return path.includes('/pages/') ? '../' : '';
};

const certificates = [
  {
    id: 1,
    title: 'ISTQB Foundation Training',
    image: 'images/ISTQB.jpg',
    thumb: 'thumbs/ISTQB.jpg',
    linkedinUrl: null, // Add your LinkedIn credential URL here
    category: 'Testing',
  },
  {
    id: 2,
    title: 'Selenium WebDriver and Java',
    image: 'images/Selenium WebDriver e Java.jpg',
    thumb: 'thumbs/Selenium WebDriver e Java _thumb.jpg',
    linkedinUrl: null,
    category: 'Automation',
  },
  {
    id: 3,
    title: 'Cypress - Basic Level',
    image: 'images/UC-b1bf6ead-40d6-4942-9166-59de03c1f975.jpg',
    thumb: 'thumbs/UC-b1bf6ead-40d6-4942-9166-59de03c1f975.jpg',
    linkedinUrl:
      'https://www.linkedin.com/learning/certificates/b1bf6ead-40d6-4942-9166-59de03c1f975',
    category: 'Automation',
  },
  {
    id: 4,
    title: 'Cypress Intermediary Course',
    image: 'images/cyp-inter.jpg',
    thumb: 'thumbs/cyp-inter.jpg',
    linkedinUrl: null,
    category: 'Automation',
  },
  {
    id: 5,
    title: 'Cypress Automation: Full Course with Frameworks',
    image: 'images/UC-7479ab2b-a38b-482b-bf11-60b9d2188496.jpg',
    thumb: 'thumbs/UC-7479ab2b-a38b-482b-bf11-60b9d2188496.jpg',
    linkedinUrl: null,
    category: 'Automation',
  },
  {
    id: 6,
    title: 'Mobile Automation: Appium Cucumber Android & iOS + Jenkins',
    image: 'images/cucumber_appium.jpg',
    thumb: 'thumbs/cucumber_appium.jpg',
    linkedinUrl: null,
    category: 'Automation',
  },
  {
    id: 7,
    title: 'Postman Introduction',
    image: 'images/UC-808536a6-a2bd-44e2-9b9a-74f423f72c72.jpg',
    thumb: 'thumbs/UC-808536a6-a2bd-44e2-9b9a-74f423f72c72.jpg',
    linkedinUrl: null,
    category: 'API Testing',
  },
  {
    id: 8,
    title: 'Agile and Scrum Methodology',
    image: 'images/agile.jpg',
    thumb: 'thumbs/Agile.jpg',
    linkedinUrl: null,
    category: 'Methodology',
  },
  {
    id: 9,
    title: 'Python for Beginners',
    image: 'images/UC-f46ea1bb-4ed8-4269-aa12-6b18d0b24028.jpg',
    thumb: 'thumbs/UC-f46ea1bb-4ed8-4269-aa12-6b18d0b24028.jpg',
    linkedinUrl: null,
    category: 'Programming',
  },
  {
    id: 10,
    title: 'The Python Bible Course',
    image: 'images/UC-b9368ddf-124c-464a-8cc4-4f1be7d63754.jpg',
    thumb: 'thumbs/UC-b9368ddf-124c-464a-8cc4-4f1be7d63754.jpg',
    linkedinUrl: null,
    category: 'Programming',
  },
  {
    id: 11,
    title: 'HTML and CSS Course',
    image: 'images/UC-d3955587-e5a2-416e-a652-9a95704f5f5c.jpg',
    thumb: 'thumbs/UC-d3955587-e5a2-416e-a652-9a95704f5f5c.jpg',
    linkedinUrl: null,
    category: 'Web Development',
  },
  {
    id: 12,
    title: 'Software Tester - Becoming an Expert',
    image: 'images/UC-3ef466ba-72f0-4bc2-8d3e-c01128ea22f9.jpg',
    thumb: 'thumbs/UC-3ef466ba-72f0-4bc2-8d3e-c01128ea22f9.jpg',
    linkedinUrl: null,
    category: 'Testing',
  },
  {
    id: 13,
    title: 'Git Crash Course',
    image: 'images/UC-5c615f9b-603b-4140-a57e-5349ab84ee6f.jpg',
    thumb: 'thumbs/UC-5c615f9b-603b-4140-a57e-5349ab84ee6f.jpg',
    linkedinUrl: null,
    category: 'Development Tools',
  },
  {
    id: 14,
    title: 'Regular Expressions',
    image: 'images/UC-9b5ea711-6721-49cd-8281-83248eb4179b.jpg',
    thumb: 'thumbs/UC-9b5ea711-6721-49cd-8281-83248eb4179b.jpg',
    linkedinUrl: null,
    category: 'Programming',
  },
  {
    id: 15,
    title: 'Swift 5',
    image: 'images/Swift 5.jpg',
    thumb: 'thumbs/Swift 5.jpg',
    linkedinUrl: null,
    category: 'Programming',
  },
  {
    id: 16,
    title: 'GitHub Ultimate',
    image: 'images/GitHub.jpg',
    thumb: 'thumbs/GitHub.jpg',
    linkedinUrl: null,
    category: 'Development Tools',
  },
];

// Modern Certificate Modal Controller
class CertificateModal {
  constructor() {
    this.currentIndex = 0;
    this.certificates = certificates;
    this.container = document.getElementById('certificateModal');

    if (!this.container) {
      console.error('Certificate modal container not found!');
      return;
    }

    console.log('🔍 Modal container found:', this.container);
    this.init();
  }

  init() {
    this.createModal();
    this.attachEventListeners();
  }

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
              <img id="certImage" src="" alt="Certificate">
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

  generateCertificateGrid() {
    const basePath = getBasePath();
    return this.certificates
      .map(
        (cert) => `
      <div class="cert-card" data-id="${
        cert.id
      }" onclick="window.certificateModal.openCertificate(${cert.id - 1})">
        <div class="cert-card-image">
          <img src="${basePath}${cert.thumb}" alt="${cert.title}" loading="lazy">
          <div class="cert-card-overlay">
            <i class="material-icons">visibility</i>
            <span>View Certificate</span>
          </div>
        </div>
        <div class="cert-card-content">
          <h4>${cert.title}</h4>
          <span class="cert-badge">${cert.category}</span>
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

  open() {
    console.log('🔍 Opening modal...');
    this.container.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.showGrid();
  }

  close() {
    this.container.classList.remove('active');
    document.body.style.overflow = '';
  }

  showGrid() {
    document.getElementById('certGrid').style.display = 'grid';
    document.getElementById('certViewer').style.display = 'none';
  }

  openCertificate(index) {
    this.currentIndex = index;
    this.updateViewer();
    document.getElementById('certGrid').style.display = 'none';
    document.getElementById('certViewer').style.display = 'flex';
  }

  navigate(direction) {
    this.currentIndex = (this.currentIndex + direction + certificates.length) % certificates.length;
    this.updateViewer();
  }

  updateViewer() {
    const cert = certificates[this.currentIndex];
    const basePath = getBasePath();

    document.getElementById('certImage').src = basePath + cert.image;
    document.getElementById('certTitle').textContent = cert.title;
    document.getElementById('certCategory').textContent = cert.category;
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
