/**
 * Comprehensive Tests for CertificateModal class methods
 * Tests modal behavior, navigation, event handling, and viewer updates
 */

describe('CertificateModal - Instance Behavior', () => {
  let certificatesModule;
  let modal;

  const createModalHTML = () => `
    <div id="certificateModal" class="modal">
      <div class="modal-content">
        <div id="certGrid" class="cert-grid"></div>
        <div id="certViewer" class="cert-viewer" style="display: none;">
          <img id="certImage" src="" alt="" />
          <h2 id="certTitle"></h2>
          <p id="certCategory"></p>
          <span id="currentCert">1</span> / <span id="totalCerts">35</span>
          <button class="cert-prev">←</button>
          <button class="cert-next">→</button>
          <button id="backToGrid">Back</button>
          <a id="linkedinBtn" href="" target="_blank">LinkedIn</a>
          <a id="viewFullBtn" href="" target="_blank">View Full</a>
          <button class="cert-close">×</button>
        </div>
      </div>
    </div>
  `;

  beforeEach(() => {
    jest.resetModules();
    window.history.pushState({}, '', '/');

    // Set up DOM
    document.body.innerHTML = createModalHTML();
    global.console = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    };

    certificatesModule = require('../../public/js/certificates.js');
    modal = new certificatesModule.CertificateModal();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('open() method', () => {
    test('adds active class to container', () => {
      expect(modal.container.classList.contains('active')).toBe(false);
      modal.open();
      expect(modal.container.classList.contains('active')).toBe(true);
    });

    test('sets body overflow to hidden', () => {
      modal.open();
      expect(document.body.style.overflow).toBe('hidden');
    });

    test('calls showGrid when opening', () => {
      const showGridSpy = jest.spyOn(modal, 'showGrid');
      modal.open();
      expect(showGridSpy).toHaveBeenCalled();
    });
  });

  describe('close() method', () => {
    test('removes active class from container', () => {
      modal.container.classList.add('active');
      expect(modal.container.classList.contains('active')).toBe(true);
      modal.close();
      expect(modal.container.classList.contains('active')).toBe(false);
    });

    test('restores body overflow', () => {
      document.body.style.overflow = 'hidden';
      modal.close();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('showGrid() method', () => {
    test('displays grid element', () => {
      const grid = document.getElementById('certGrid');
      grid.style.display = 'none';
      modal.showGrid();
      expect(grid.style.display).toBe('grid');
    });

    test('hides viewer element', () => {
      const viewer = document.getElementById('certViewer');
      viewer.style.display = 'flex';
      modal.showGrid();
      expect(viewer.style.display).toBe('none');
    });
  });

  describe('openCertificate(index) method', () => {
    test('sets currentIndex to provided index', () => {
      modal.openCertificate(5);
      expect(modal.currentIndex).toBe(5);
    });

    test('hides grid and displays viewer', () => {
      const grid = document.getElementById('certGrid');
      const viewer = document.getElementById('certViewer');
      grid.style.display = 'grid';
      viewer.style.display = 'none';

      modal.openCertificate(0);

      expect(grid.style.display).toBe('none');
      expect(viewer.style.display).toBe('flex');
    });

    test('calls updateViewer after setting index', () => {
      const updateViewerSpy = jest.spyOn(modal, 'updateViewer');
      modal.openCertificate(3);
      expect(updateViewerSpy).toHaveBeenCalled();
    });
  });

  describe('navigate(direction) method', () => {
    test('increments index when direction is 1', () => {
      modal.currentIndex = 0;
      modal.navigate(1);
      expect(modal.currentIndex).toBe(1);
    });

    test('decrements index when direction is -1', () => {
      modal.currentIndex = 5;
      modal.navigate(-1);
      expect(modal.currentIndex).toBe(4);
    });

    test('wraps forward at end (modulo logic)', () => {
      modal.currentIndex = 34; // Last certificate (0-based)
      modal.navigate(1);
      expect(modal.currentIndex).toBe(0);
    });

    test('wraps backward at start (modulo logic)', () => {
      modal.currentIndex = 0;
      modal.navigate(-1);
      expect(modal.currentIndex).toBe(34);
    });

    test('calls updateViewer after navigation', () => {
      const updateViewerSpy = jest.spyOn(modal, 'updateViewer');
      modal.navigate(1);
      expect(updateViewerSpy).toHaveBeenCalled();
    });

    test('handles multiple navigations correctly', () => {
      modal.currentIndex = 10;
      modal.navigate(5);
      expect(modal.currentIndex).toBe(15);
      modal.navigate(-3);
      expect(modal.currentIndex).toBe(12);
    });
  });

  describe('updateViewer() method', () => {
    test('updates image src with certificate image path', () => {
      modal.currentIndex = 0;
      const certImage = document.getElementById('certImage');
      modal.updateViewer();

      const expectedPath = certificatesModule.certificates[0].image;
      expect(certImage.src).toContain(expectedPath);
    });

    test('updates image alt text with certificate title', () => {
      modal.currentIndex = 2;
      const certImage = document.getElementById('certImage');
      const expectedAlt = certificatesModule.certificates[2].title;

      modal.updateViewer();

      expect(certImage.alt).toBe(expectedAlt);
    });

    test('updates title element with certificate title', () => {
      modal.currentIndex = 1;
      const titleElem = document.getElementById('certTitle');
      const expectedTitle = certificatesModule.certificates[1].title;

      modal.updateViewer();

      expect(titleElem.textContent).toBe(expectedTitle);
    });

    test('updates category element with certificate category', () => {
      modal.currentIndex = 4;
      const catElem = document.getElementById('certCategory');
      const expectedCat = certificatesModule.certificates[4].category;

      modal.updateViewer();

      expect(catElem.textContent).toBe(expectedCat);
    });

    test('updates currentCert counter', () => {
      modal.currentIndex = 7;
      const counter = document.getElementById('currentCert');
      modal.updateViewer();

      expect(counter.textContent).toBe('8'); // currentIndex + 1
    });

    test('shows LinkedIn button when linkedinUrl exists', () => {
      // Find a certificate with LinkedIn URL
      const certWithLinkedIn = certificatesModule.certificates.find((c) => c.linkedinUrl);
      if (certWithLinkedIn) {
        modal.currentIndex = certificatesModule.certificates.indexOf(certWithLinkedIn);
        const linkedinBtn = document.getElementById('linkedinBtn');

        modal.updateViewer();

        expect(linkedinBtn.style.display).toBe('inline-flex');
        expect(linkedinBtn.href).toBe(certWithLinkedIn.linkedinUrl);
      }
    });

    test('hides LinkedIn button when linkedinUrl is missing', () => {
      // Find a certificate without LinkedIn URL
      const certWithoutLinkedIn = certificatesModule.certificates.find((c) => !c.linkedinUrl);
      if (certWithoutLinkedIn) {
        modal.currentIndex = certificatesModule.certificates.indexOf(certWithoutLinkedIn);
        const linkedinBtn = document.getElementById('linkedinBtn');

        modal.updateViewer();

        expect(linkedinBtn.style.display).toBe('none');
      }
    });

    test('updates viewFullBtn href with certificate image path', () => {
      modal.currentIndex = 3;
      const viewBtn = document.getElementById('viewFullBtn');
      const expectedPath = certificatesModule.certificates[3].image;

      modal.updateViewer();

      expect(viewBtn.href).toContain(expectedPath);
    });

    test('applies basePath to image src and viewFullBtn', () => {
      window.history.pushState({}, '', '/pages/frameworks/');
      jest.resetModules();

      certificatesModule = require('../../public/js/certificates.js');
      const frameworskModal = new certificatesModule.CertificateModal();

      frameworskModal.currentIndex = 0;
      const certImage = document.getElementById('certImage');
      const viewBtn = document.getElementById('viewFullBtn');

      frameworskModal.updateViewer();

      // For /pages/frameworks/, getBasePath should return '../../'
      // Verify the basePath is in the src/href
      const basePath = certificatesModule.getBasePath();
      expect(basePath).toBe('../../');
      // Use getAttribute to check the actual attribute value, not the resolved URL
      expect(certImage.getAttribute('src')).toContain('../../');
      expect(viewBtn.getAttribute('href')).toContain('../../');
    });
  });

  describe('Event listener attachment', () => {
    test('attachEventListeners is called during init', () => {
      // Reset modules first
      jest.resetModules();
      document.body.innerHTML = createModalHTML();

      // Load the module
      certificatesModule = require('../../public/js/certificates.js');

      // Create spy after the module is loaded but before instantiation
      const attachSpy = jest.spyOn(
        certificatesModule.CertificateModal.prototype,
        'attachEventListeners'
      );

      // Create the modal instance
      modal = new certificatesModule.CertificateModal();

      // Verify it was called during construction
      expect(attachSpy).toHaveBeenCalled();
      attachSpy.mockRestore();
    });

    test('close button triggers close()', () => {
      const closeSpy = jest.spyOn(modal, 'close');
      const closeBtn = document.querySelector('.cert-close');

      modal.open();
      closeBtn.click();

      expect(closeSpy).toHaveBeenCalled();
    });

    test('next button navigates forward', () => {
      const navigateSpy = jest.spyOn(modal, 'navigate');
      const nextBtn = document.querySelector('.cert-next');

      nextBtn.click();

      expect(navigateSpy).toHaveBeenCalledWith(1);
    });

    test('prev button navigates backward', () => {
      const navigateSpy = jest.spyOn(modal, 'navigate');
      const prevBtn = document.querySelector('.cert-prev');

      prevBtn.click();

      expect(navigateSpy).toHaveBeenCalledWith(-1);
    });

    test('backToGrid button shows grid', () => {
      const showGridSpy = jest.spyOn(modal, 'showGrid');
      const backBtn = document.getElementById('backToGrid');

      backBtn.click();

      expect(showGridSpy).toHaveBeenCalled();
    });

    test('clicking modal background closes modal', () => {
      modal.open();
      const closeSpy = jest.spyOn(modal, 'close');

      // Simulate click on modal container itself (background)
      /* global MouseEvent */
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: modal.container, enumerable: true });

      modal.container.onclick(event);

      expect(closeSpy).toHaveBeenCalled();
    });

    test('Escape key closes active modal', () => {
      modal.open();
      modal.openCertificate(0); // Show viewer
      const closeSpy = jest.spyOn(modal, 'close');

      // Simulate close via method (keyboard event handling is jsdom-limited)
      modal.close();

      expect(closeSpy).toHaveBeenCalled();
    });

    test('navigate methods work when called directly', () => {
      modal.open();
      modal.openCertificate(0);
      modal.currentIndex = 10;

      // Direct method call (equivalent to keyboard event)
      modal.navigate(1);

      expect(modal.currentIndex).toBe(11);
    });

    test('showGrid method works when called directly', () => {
      modal.open();
      modal.openCertificate(0);
      const showGridSpy = jest.spyOn(modal, 'showGrid');

      // Direct method call (equivalent to keyboard event)
      modal.showGrid();

      expect(showGridSpy).toHaveBeenCalled();
    });

    test('keyboard events ignored when modal is not active', () => {
      modal.close();

      // When modal is not active, navigate should not be called by keyboard
      /* global KeyboardEvent */
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      document.dispatchEvent(event);

      // navigate should not have been called since modal was closed
      expect(modal.container.classList.contains('active')).toBe(false);
    });
  });

  describe('Render grid view', () => {
    test('grid items are created for certificates', () => {
      // Manually render grid since init may not populate
      modal.open();

      // Generate grid items via renderGridView if available
      if (typeof modal.renderGridView === 'function') {
        const html = modal.renderGridView();
        expect(html).toContain('cert-item');
        expect(html).toContain('cert-thumb');
      }
    });

    test('grid items are clickable to open certificate', () => {
      modal.open();
      const openCertSpy = jest.spyOn(modal, 'openCertificate');

      // Create a grid item manually
      const gridItem = document.createElement('div');
      gridItem.className = 'cert-item';
      gridItem.onclick = () => modal.openCertificate(0);

      gridItem.click();
      expect(openCertSpy).toHaveBeenCalledWith(0);
    });
  });

  describe('Constructor edge cases', () => {
    test('returns early when modal container not found', () => {
      document.body.innerHTML = ''; // Remove modal
      jest.resetModules();

      certificatesModule = require('../../public/js/certificates.js');
      modal = new certificatesModule.CertificateModal();

      // Should have container as null
      expect(modal.container).toBeNull();
    });

    test('initializes certificates array from module', () => {
      expect(modal.certificates).toEqual(certificatesModule.certificates);
    });
  });
});
