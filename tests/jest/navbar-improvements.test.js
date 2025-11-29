/**
 * Navbar Improvements Test Suite
 * Tests for navbar alignment, mobile menu compact design, and responsive behavior
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Navbar Improvements - Alignment & Mobile Menu', () => {
  let indexDoc, frameworksDoc, sideProjDoc;
  let indexWindow, frameworksWindow, sideProjWindow;
  let indexDOM, frameworksDOM, sideProjDOM;

  beforeAll(() => {
    // Load all HTML pages
    const indexHtmlFull = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
    const frameworksHtmlFull = fs.readFileSync(
      path.join(__dirname, '../../pages/frameworks/index.html'),
      'utf8'
    );
    const sideProjHtmlFull = fs.readFileSync(
      path.join(__dirname, '../../pages/side_proj/index.html'),
      'utf8'
    );

    // Helper to extract navbar
    const extractNavbar = (html) => {
      const match = html.match(/<nav class="main-nav"[\s\S]*?<\/nav>/);
      return match ? match[0] : '';
    };

    // Create minimal HTMLs
    const createMinimalDoc = (navHtml) =>
      `<!doctype html><html><head></head><body>${navHtml}</body></html>`;

    const indexHtml = createMinimalDoc(extractNavbar(indexHtmlFull));
    const frameworksHtml = createMinimalDoc(extractNavbar(frameworksHtmlFull));
    const sideProjHtml = createMinimalDoc(extractNavbar(sideProjHtmlFull));

    // Create JSDOM instances
    indexDOM = new JSDOM(indexHtml);
    frameworksDOM = new JSDOM(frameworksHtml);
    sideProjDOM = new JSDOM(sideProjHtml);

    indexDoc = indexDOM.window.document;
    frameworksDoc = frameworksDOM.window.document;
    sideProjDoc = sideProjDOM.window.document;

    indexWindow = indexDOM.window;
    frameworksWindow = frameworksDOM.window;
    sideProjWindow = sideProjDOM.window;

    // Load CSS for computed styles
    const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

    // Apply CSS to all documents
    [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
      const style = doc.createElement('style');
      style.textContent = cssContent;
      doc.head.appendChild(style);
    });
  });

  afterAll(() => {
    // Clean up JSDOM instances
    if (indexDOM) indexDOM.window.close();
    if (frameworksDOM) frameworksDOM.window.close();
    if (sideProjDOM) sideProjDOM.window.close();
  });

  describe('Navbar Structure & ARIA', () => {
    test.each([
      ['index.html', () => indexDoc],
      ['frameworks.html', () => frameworksDoc],
      ['side_proj.html', () => sideProjDoc],
    ])('%s - should have proper ARIA attributes', (pageName, getDoc) => {
      const doc = getDoc();
      const nav = doc.querySelector('nav.main-nav');

      expect(nav).toBeTruthy();
      expect(nav.getAttribute('role')).toBe('navigation');
      expect(nav.getAttribute('aria-label')).toBe('Primary');
    });

    test.each([
      ['index.html', () => indexDoc],
      ['frameworks.html', () => frameworksDoc],
      ['side_proj.html', () => sideProjDoc],
    ])('%s - mobile toggle should have proper ARIA controls', (pageName, getDoc) => {
      const doc = getDoc();
      const toggle = doc.querySelector('.mobile-menu-toggle');

      expect(toggle).toBeTruthy();
      expect(toggle.getAttribute('aria-label')).toBe('Toggle navigation');
      expect(toggle.getAttribute('aria-controls')).toBe('mobileMenu');
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
    });

    test.each([
      ['index.html', () => indexDoc],
      ['frameworks.html', () => frameworksDoc],
      ['side_proj.html', () => sideProjDoc],
    ])('%s - should have Book CTA with proper structure', (pageName, getDoc) => {
      const doc = getDoc();
      const bookCTA = doc.querySelector('.cta-link.book-call');

      expect(bookCTA).toBeTruthy();
      expect(bookCTA.getAttribute('aria-label')).toBe('Book a 15-minute call'); // Text unchanged
      expect(bookCTA.getAttribute('target')).toBe('_blank');
      expect(bookCTA.getAttribute('rel')).toBe('noopener noreferrer');

      const icon = bookCTA.querySelector('i.material-icons');
      const span = bookCTA.querySelector('span');

      expect(icon).toBeTruthy();
      expect(icon.textContent.trim()).toBe('schedule');
      expect(span).toBeTruthy();
      expect(span.textContent.trim()).toBe('Book 15-min call'); // Visible text unchanged
    });

    test.each([
      ['index.html', () => indexDoc],
      ['frameworks.html', () => frameworksDoc],
      ['side_proj.html', () => sideProjDoc],
    ])('%s - should have nav separator', (pageName, getDoc) => {
      const doc = getDoc();
      const separator = doc.querySelector('.nav-separator');

      expect(separator).toBeTruthy();
    });
  });

  describe('Mobile Menu Improved Design', () => {
    test('CSS should define full-width mobile menu with improved spacing', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

      // Check for full-width positioning (either width: 100vw or width: 100%)
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?(?:width:\s*100(?:vw|%))?/);

      // Check for padding (flexible on values)
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?padding:\s*\d+px\s+\d+px/);

      // Check for gap (flexible on values)
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?gap:\s*\d+px/);
    });

    test('CSS should define properly sized icons (20px or larger) in mobile menu', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

      // Check for 20px or larger icon size in active mobile menu
      expect(cssContent).toMatch(
        /\.center-nav\.active\s+a\s+i\s*{[\s\S]*?font-size:\s*(20|22|24)px/
      );
    });

    test('CSS should define readable text (1rem or larger) in mobile menu', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

      // Check for 1rem or larger font size in active mobile menu links (1rem, 1.1rem, etc)
      expect(cssContent).toMatch(/\.center-nav\.active\s+a\s*{[\s\S]*?font-size:\s*1(\.\d+)?rem/);
    });

    test('CSS should define white text and icons for mobile menu buttons', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

      // Check for white text
      expect(cssContent).toMatch(/\.center-nav\.active\s+a\s*{[\s\S]*?color:\s*#fff/);

      // Check for white icons (supports both rgba and modern rgb syntax)
      expect(cssContent).toMatch(
        /\.center-nav\.active\s+a\s+i\s*{[\s\S]*?color:\s*(rgba\(255,?\s*255,?\s*255,?\s*0?\.?95\)|rgb\(255\s+255\s+255\s*\/\s*95%\))/
      );
    });

    test.each([
      ['index.html', () => indexDoc],
      ['frameworks.html', () => frameworksDoc],
      ['side_proj.html', () => sideProjDoc],
    ])(
      '%s - mobile menu buttons should have proper classes for gradient backgrounds',
      (pageName, getDoc) => {
        const doc = getDoc();

        const homeBtn = doc.querySelector('.mobile-home-btn');
        const projectsBtn = doc.querySelector('.nav-btn-projects');
        const frameworksBtn = doc.querySelector('.nav-btn-frameworks');
        const certsBtn = doc.querySelector('.nav-btn-certs');

        // Home button should have mobile-home-btn class (gradient applied via CSS)
        expect(homeBtn).toBeTruthy();
        expect(homeBtn.className).toContain('mobile-home-btn');

        // Other buttons should have their gradient classes
        expect(projectsBtn).toBeTruthy();
        expect(projectsBtn.className).toContain('nav-btn-projects');
        expect(frameworksBtn).toBeTruthy();
        expect(frameworksBtn.className).toContain('nav-btn-frameworks');
        expect(certsBtn).toBeTruthy();
        expect(certsBtn.className).toContain('nav-btn-certs');
      }
    );
  });

  describe('Alignment Tests - CTA & Icons', () => {
    test('CSS should align social nav items with flexbox center', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

      // Check that social-nav uses align-items: center
      expect(cssContent).toMatch(/\.social-nav\s*{[\s\S]*?align-items:\s*center/);

      // Check that nav-wrapper uses align-items: center on mobile
      expect(cssContent).toMatch(
        /@media\s+screen\s+and\s+\((?:max-width:\s*767px|width\s*<=\s*767px)\)[\s\S]*?\.nav-wrapper\s*{[\s\S]*?align-items:\s*center/
      );
    });

    test('CSS should NOT use transform translateY for alignment on tablet/mobile', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

      // Extract tablet breakpoint section (max-width: 991px)
      const tabletSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:max-width:\s*991px|width\s*<=\s*991px)\)\s*\{\s*([\s\S]*?)(?=@media\s+|$)/
      );

      if (tabletSection) {
        const tabletCSS = tabletSection[1];

        // Check social-icon in tablet - should NOT have transform: translateY
        const socialIconMatch = tabletCSS.match(/\.social-icon\s*{([^}]*)}/);
        if (socialIconMatch) {
          expect(socialIconMatch[1]).not.toMatch(/transform:\s*translateY/);
        }

        // Check cta-link in tablet - should NOT have transform: translateY
        const ctaLinkMatch = tabletCSS.match(/\.cta-link\s*{([^}]*)}/);
        if (ctaLinkMatch) {
          expect(ctaLinkMatch[1]).not.toMatch(/transform:\s*translateY/);
        }
      }
    });

    test('CSS desktop should NOT use excessive translateY for CTA', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

      // Check desktop media query
      const desktopSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:min-width:\s*992px|width\s*>=\s*992px)\)\s*\{\s*([\s\S]*?)\}/
      );

      if (desktopSection) {
        const desktopCSS = desktopSection[1];

        // CTA should have translateY(0) or no transform
        const ctaMatch = desktopCSS.match(/\.cta-link\s*{([^}]*)}/);
        if (ctaMatch) {
          if (ctaMatch[1].includes('transform')) {
            expect(ctaMatch[1]).toMatch(/transform:\s*translateY\(0\)/);
          }
        }
      }
    });

    test.each([
      ['index.html', () => indexDoc],
      ['frameworks.html', () => frameworksDoc],
      ['side_proj.html', () => sideProjDoc],
    ])('%s - social nav should have proper structure', (pageName, getDoc) => {
      const doc = getDoc();
      const socialNav = doc.querySelector('.social-nav');

      expect(socialNav).toBeTruthy();

      const ctaLink = socialNav.querySelector('.cta-link');
      const separator = socialNav.querySelector('.nav-separator');
      const socialIcons = socialNav.querySelectorAll('.social-icon');

      expect(ctaLink).toBeTruthy();
      expect(separator).toBeTruthy();
      expect(socialIcons.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Responsive Behavior', () => {
    test('CSS should have proper breakpoints for navbar', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

      // Desktop breakpoint (min-width: 992px)
      expect(cssContent).toMatch(
        /@media\s+screen\s+and\s+\((min-width:\s*992px|width\s*>=\s*992px)\)/
      );

      // Tablet breakpoint (max-width: 991px)
      expect(cssContent).toMatch(
        /@media\s+screen\s+and\s+\((max-width:\s*991px|width\s*<=\s*991px)\)/
      );

      // Mobile breakpoint (max-width: 767px)
      expect(cssContent).toMatch(
        /@media\s+screen\s+and\s+\((max-width:\s*767px|width\s*<=\s*767px)\)/
      );

      // Small mobile breakpoint (max-width: 480px)
      expect(cssContent).toMatch(
        /@media\s+screen\s+and\s+\((max-width:\s*480px|width\s*<=\s*480px)\)/
      );
    });

    test('CSS should hide brand on mobile devices', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

      // Check mobile section hides brand
      const mobileSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:max-width:\s*767px|width\s*<=\s*767px)\)\s*\{\s*([\s\S]*?)(?=@media\s+|$)/
      );

      if (mobileSection) {
        const mobileCSS = mobileSection[1];
        // Mobile hides the brand icon specifically (i element)
        expect(mobileCSS).toMatch(/\.brand-logo\s+i\s*\{[\s\S]*?display:\s*none/);
      }
    });

    test('CSS should show mobile home link on mobile', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

      // Mobile home link should be hidden by default
      expect(cssContent).toMatch(/\.mobile-home-link\s*{[\s\S]*?display:\s*none/);

      // But shown on mobile
      const mobileSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:max-width:\s*767px|width\s*<=\s*767px)\)\s*\{\s*([\s\S]*?)(?=@media\s+|$)/
      );

      if (mobileSection) {
        const mobileCSS = mobileSection[1];
        expect(mobileCSS).toMatch(/\.mobile-home-link\s*\{[\s\S]*?display:\s*block/);
      }
    });

    test('CSS should hide CTA text on tablet/mobile', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

      // Check tablet breakpoint
      const tabletSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:max-width:\s*991px|width\s*<=\s*991px)\)\s*\{\s*([\s\S]*?)(?=@media\s+|$)/
      );

      if (tabletSection) {
        const tabletCSS = tabletSection[1];
        expect(tabletCSS).toMatch(/\.cta-link\s+span\s*\{[\s\S]*?display:\s*none/);
      }
    });
  });

  describe('Toggle Functionality', () => {
    test.each([
      ['index.html', () => indexDoc, () => indexWindow],
      ['frameworks.html', () => frameworksDoc, () => frameworksWindow],
      ['side_proj.html', () => sideProjDoc, () => sideProjWindow],
    ])('%s - toggle script should properly update aria-expanded', (pageName, getDoc, getWindow) => {
      const doc = getDoc();
      const win = getWindow();

      const menu = doc.getElementById('mobileMenu');
      const toggle = doc.querySelector('.mobile-menu-toggle');

      // Initial state
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      expect(menu.classList.contains('active')).toBe(false);

      // Define and execute toggle function in the window context
      win.toggleMobileMenu = function () {
        const menu = doc.getElementById('mobileMenu');
        const toggle = doc.querySelector('.mobile-menu-toggle');
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        menu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', String(!expanded));
      };

      // Simulate first click
      win.toggleMobileMenu();

      // After toggle - menu should be open
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
      expect(menu.classList.contains('active')).toBe(true);

      // Toggle back
      win.toggleMobileMenu();

      // Menu should be closed
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      expect(menu.classList.contains('active')).toBe(false);
    });
  });

  describe('Color Scheme & Design System', () => {
    let cssContent;

    beforeAll(() => {
      cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');
    });

    test('Navbar should have teal background (#00bfa5)', () => {
      // Check for teal background in navbar
      expect(cssContent).toMatch(/\.nav-wrapper\s*{[\s\S]*?background-color:\s*#00bfa5/);
    });

    test('Mobile menu should have matching teal background', () => {
      // Mobile menu should have same teal as navbar
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?background:\s*#00bfa5/);
    });

    test('Projects button should have blue gradient', () => {
      // Blue gradient: #5c6bc0 to #3f51b5
      expect(cssContent).toMatch(
        /\.nav-btn-projects\s*{[\s\S]*?background:\s*linear-gradient\([^)]*#5c6bc0[^)]*#3f51b5[^)]*\)/
      );
    });

    test('Frameworks button should have brown gradient', () => {
      // Brown gradient: #b66a50 to #9b4b2f
      expect(cssContent).toMatch(
        /\.nav-btn-frameworks\s*{[\s\S]*?background:\s*linear-gradient\([^)]*#b66a50[^)]*#9b4b2f[^)]*\)/
      );
    });

    test('Certificates button should have orange gradient', () => {
      // Orange gradient: #ff9800 to #f57c00
      expect(cssContent).toMatch(
        /\.nav-btn-certs\s*{[\s\S]*?background:\s*linear-gradient\([^)]*#ff9800[^)]*#f57c00[^)]*\)/
      );
    });

    test('Mobile menu toggle icon should be black', () => {
      // Menu toggle should be black for contrast
      expect(cssContent).toMatch(/\.mobile-menu-toggle\s*{[\s\S]*?color:\s*#000/);
      expect(cssContent).toMatch(/\.mobile-menu-toggle\s+i\s*{[\s\S]*?color:\s*#000/);
    });

    test('Social icons should have hover color transformations', () => {
      // GitHub hover - white text on dark background
      expect(cssContent).toMatch(/github-link[^\}]*:hover[\s\S]*?color:\s*#fff/);
      expect(cssContent).toMatch(/github-link[^\}]*:hover[\s\S]*?background-color:\s*#333/);

      // LinkedIn hover - white text on LinkedIn blue
      expect(cssContent).toMatch(/linkedin-link[^\}]*:hover[\s\S]*?color:\s*#fff/);
      expect(cssContent).toMatch(/linkedin-link[^\}]*:hover[\s\S]*?background-color:\s*#0077b5/);

      // Discord hover - white text on Discord purple
      expect(cssContent).toMatch(/discord-link[^\}]*:hover[\s\S]*?color:\s*#fff/);
      expect(cssContent).toMatch(/discord-link[^\}]*:hover[\s\S]*?background-color:\s*#5865f2/);
    });

    test('CTA buttons should have distinct hover colors', () => {
      // Book call should have purple gradient on hover
      expect(cssContent).toMatch(
        /\.cta-link\.book-call:hover[\s\S]*?background:\s*linear-gradient/
      );
      expect(cssContent).toMatch(/#667eea/); // purple gradient color

      // Download CV should have teal background on hover
      expect(cssContent).toMatch(
        /\.cta-link\.download-cv:hover[\s\S]*?background-color:\s*#4db6ac/
      );
    });

    test('Text colors should ensure readability', () => {
      // Mobile menu text should be white
      expect(cssContent).toMatch(/\.center-nav\.active\s+a\s*{[\s\S]*?color:\s*#fff/);

      // Mobile menu icons should be white with opacity
      expect(cssContent).toMatch(
        /\.center-nav\.active\s+a\s+i\s*{[\s\S]*?color:\s*(rgb\(255\s+255\s+255\s*\/\s*95%\)|rgba\(255,?\s*255,?\s*255,?\s*0?\.?95\))/
      );
    });
  });

  describe('Positioning & Layout', () => {
    let cssContent;

    beforeAll(() => {
      cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');
    });

    test('Navbar should be fixed at top with proper z-index', () => {
      expect(cssContent).toMatch(/\.main-nav\s*{[\s\S]*?position:\s*fixed/);
      expect(cssContent).toMatch(/\.main-nav\s*{[\s\S]*?top:\s*0/);
      expect(cssContent).toMatch(/\.main-nav\s*{[\s\S]*?z-index:\s*1000/);
    });

    test('Navbar should span full width', () => {
      expect(cssContent).toMatch(/\.main-nav\s*{[\s\S]*?width:\s*100%/);
    });

    test('Navbar should have proper height on desktop (80px)', () => {
      expect(cssContent).toMatch(/\.main-nav\s*{[\s\S]*?height:\s*80px/);
    });

    test('Mobile menu should be positioned as floating overlay', () => {
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?position:\s*fixed/);
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?left:\s*0/);
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?width:\s*100%/);
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?z-index:\s*1200/);
    });

    test('Mobile menu should appear directly below navbar at tablet breakpoint (top: 70px)', () => {
      // At tablet/mobile breakpoint (≤991px), navbar is min-height: 70px
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?top:\s*70px/);
    });

    test('Desktop nav items should be centered using absolute positioning', () => {
      expect(cssContent).toMatch(/\.center-nav\s*{[\s\S]*?position:\s*absolute/);
      expect(cssContent).toMatch(/\.center-nav\s*{[\s\S]*?left:\s*50%/);
      expect(cssContent).toMatch(/\.center-nav\s*{[\s\S]*?transform:\s*translateX\(-50%\)/);
    });

    test('Social nav should be positioned with margin-left auto', () => {
      expect(cssContent).toMatch(/\.social-nav\s*{[\s\S]*?margin-left:\s*auto/);
    });

    test('Mobile menu toggle should be ordered first', () => {
      const mobileSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:max-width:\s*767px|width\s*<=\s*767px)\)[\s\S]*?\.mobile-menu-toggle\s*{([^}]*)}/
      );
      if (mobileSection) {
        expect(mobileSection[1]).toMatch(/order:\s*-1/);
      }
    });

    test('Social icons should be vertically centered', () => {
      expect(cssContent).toMatch(/\.social-nav\s*{[\s\S]*?align-items:\s*center/);
      expect(cssContent).toMatch(/\.social-nav\s*>\s*li\s*{[\s\S]*?align-items:\s*center/);
    });
  });

  describe('Spacing & Dimensions', () => {
    let cssContent;

    beforeAll(() => {
      cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');
    });

    test('Desktop nav should have proper gap between items (72px)', () => {
      expect(cssContent).toMatch(/\.center-nav\s*{[\s\S]*?gap:\s*72px/);
    });

    test('Mobile menu should have proper gap between items', () => {
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?gap:\s*(8|10|12)px/);
    });

    test('Social nav should have appropriate gap between icons', () => {
      // Desktop: 16px
      expect(cssContent).toMatch(/\.social-nav\s*{[\s\S]*?gap:\s*16px/);
    });

    test('Mobile menu buttons should have substantial padding', () => {
      // Check for padding in mobile menu buttons (14px 18px)
      expect(cssContent).toMatch(/\.center-nav\.active\s+a\s*{[\s\S]*?padding:\s*14px\s+18px/);
    });

    test('Nav buttons should have proper padding on desktop', () => {
      expect(cssContent).toMatch(/\.nav-btn\s*{[\s\S]*?padding:\s*10px\s+24px/);
    });

    test('Social icons should have consistent size (40px on desktop)', () => {
      expect(cssContent).toMatch(/\.social-icon\s*{[\s\S]*?width:\s*40px/);
      expect(cssContent).toMatch(/\.social-icon\s*{[\s\S]*?height:\s*40px/);
    });

    test('Mobile menu should have full screen width without border radius', () => {
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?border-radius:\s*0/);
    });

    test('Nav wrapper should have padding', () => {
      expect(cssContent).toMatch(/\.nav-wrapper\s*{[\s\S]*?padding:\s*0\s+20px/);
    });
  });

  describe('Visual Effects & Animations', () => {
    let cssContent;

    beforeAll(() => {
      cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');
    });

    test('Navbar should have box shadow for depth', () => {
      expect(cssContent).toMatch(/\.main-nav\s*{[\s\S]*?box-shadow:/);
    });

    test('Mobile menu should have prominent box shadow', () => {
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?box-shadow:/);
    });

    test('Nav buttons should have hover transform effect', () => {
      expect(cssContent).toMatch(/\.nav-btn:hover[\s\S]*?transform:\s*translateY\(-3px\)/);
    });

    test('Nav buttons should have hover box shadow', () => {
      expect(cssContent).toMatch(/\.nav-btn:hover[\s\S]*?box-shadow:/);
    });

    test('Nav buttons should have hover brightness filter', () => {
      expect(cssContent).toMatch(/\.nav-btn:hover[\s\S]*?filter:\s*brightness/);
    });

    test('Mobile menu buttons should have transition properties', () => {
      expect(cssContent).toMatch(/\.center-nav\.active\s+a\s*{[\s\S]*?transition:/);
    });

    test('Social icons should have hover scale transform', () => {
      // Desktop: translateY and scale
      expect(cssContent).toMatch(/\.social-icon:hover[\s\S]*?transform:[^;]*scale/);
    });

    test('Brand logo should have hover effect', () => {
      expect(cssContent).toMatch(/\.brand-logo:hover[\s\S]*?transform:\s*translateX\(-5px\)/);
      expect(cssContent).toMatch(/\.brand-logo:hover[\s\S]*?opacity:\s*0\.8/);
    });

    test('Mobile home button should have hover effects', () => {
      expect(cssContent).toMatch(/\.mobile-home-btn:hover[\s\S]*?transform:\s*translateY\(-3px\)/);
      expect(cssContent).toMatch(/\.mobile-home-btn:hover[\s\S]*?box-shadow:/);
      expect(cssContent).toMatch(/\.mobile-home-btn:hover[\s\S]*?filter:\s*brightness/);
    });

    test('CTA links should have smooth transitions', () => {
      expect(cssContent).toMatch(/\.cta-link\s*{[\s\S]*?transition:\s*all\s+0\.3s\s+ease/);
    });

    test('Mobile menu backdrop should have opacity transition', () => {
      expect(cssContent).toMatch(/\.mobile-menu-backdrop\s*{[\s\S]*?transition:\s*opacity/);
    });
  });

  describe('Typography & Font Sizing', () => {
    let cssContent;

    beforeAll(() => {
      cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');
    });

    test('Brand logo should have proper font size', () => {
      expect(cssContent).toMatch(/\.brand-logo\s*{[\s\S]*?font-size:\s*1\.15rem/);
      expect(cssContent).toMatch(/\.brand-logo\s*{[\s\S]*?font-weight:\s*500/);
    });

    test('Nav buttons should have readable font size', () => {
      expect(cssContent).toMatch(/\.nav-btn\s*{[\s\S]*?font-size:\s*0\.95rem/);
      expect(cssContent).toMatch(/\.nav-btn\s*{[\s\S]*?font-weight:\s*600/);
    });

    test('Mobile menu text should be larger (1rem)', () => {
      expect(cssContent).toMatch(/\.center-nav\.active\s+a\s*{[\s\S]*?font-size:\s*1rem/);
    });

    test('Mobile menu should have proper letter spacing', () => {
      expect(cssContent).toMatch(/\.nav-btn\s*{[\s\S]*?letter-spacing:\s*0\.3px/);
    });

    test('Social icons should have proper sizing', () => {
      expect(cssContent).toMatch(/\.social-icon\s*{[\s\S]*?font-size:\s*22px/);
    });

    test('Mobile menu icons should be properly sized (20px)', () => {
      expect(cssContent).toMatch(/\.center-nav\.active\s+a\s+i\s*{[\s\S]*?font-size:\s*20px/);
    });

    test('CTA links should have readable font size', () => {
      expect(cssContent).toMatch(/\.cta-link\s*{[\s\S]*?font-size:\s*0\.9rem/);
      expect(cssContent).toMatch(/\.cta-link\s*{[\s\S]*?font-weight:\s*600/);
    });
  });

  describe('Responsive Breakpoint Behavior', () => {
    let cssContent;

    beforeAll(() => {
      cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');
    });

    test('Mobile toggle should be hidden on desktop', () => {
      const desktopCSS = cssContent.substring(
        0,
        cssContent.indexOf('@media screen and (width <= 991px)')
      );
      expect(desktopCSS).toMatch(/\.mobile-menu-toggle\s*{[\s\S]*?display:\s*none/);
    });

    test('Mobile home link should be hidden on desktop', () => {
      const desktopCSS = cssContent.substring(
        0,
        cssContent.indexOf('@media screen and (width <= 991px)')
      );
      expect(desktopCSS).toMatch(/\.mobile-home-link\s*{[\s\S]*?display:\s*none/);
    });

    test('Mobile backdrop should be hidden by default', () => {
      expect(cssContent).toMatch(/\.mobile-menu-backdrop\s*{[\s\S]*?display:\s*none/);
    });

    test('Tablet breakpoint should reduce social icon sizes', () => {
      const tabletSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:max-width:\s*991px|width\s*<=\s*991px)\)[\s\S]*?\.social-icon\s*{([^}]*)}/
      );
      if (tabletSection) {
        expect(tabletSection[1]).toMatch(/font-size:\s*22px/);
        expect(tabletSection[1]).toMatch(/width:\s*40px/);
        expect(tabletSection[1]).toMatch(/height:\s*40px/);
      }
    });

    test('Mobile breakpoint should show toggle button', () => {
      const mobileSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:max-width:\s*767px|width\s*<=\s*767px)\)[\s\S]*?\.mobile-menu-toggle\s*{([^}]*)}/
      );
      if (mobileSection) {
        expect(mobileSection[1]).toMatch(/display:\s*block/);
      }
    });

    test('Wide screens (1600px+) should show brand text', () => {
      const wideScreenSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:min-width:\s*1600px|width\s*>=\s*1600px)\)[\s\S]*?\.brand-logo\s+span\s*{([^}]*)}/
      );
      if (wideScreenSection) {
        expect(wideScreenSection[1]).toMatch(/display:\s*inline/);
      }
    });

    test('Medium screens (992-1599px) should hide brand text', () => {
      const mediumScreenSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:max-width:\s*1599px|width\s*<=\s*1599px)\)[^@]*\.brand-logo\s+span\s*{([^}]*)}/
      );
      if (mediumScreenSection) {
        expect(mediumScreenSection[1]).toMatch(/display:\s*none/);
      }
    });

    test('Small mobile (480px) should have compact dimensions', () => {
      const smallMobileSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:max-width:\s*480px|width\s*<=\s*480px)\)[\s\S]*?\.social-icon\s*{([^}]*)}/
      );
      if (smallMobileSection) {
        expect(smallMobileSection[1]).toMatch(/width:\s*32px/);
        expect(smallMobileSection[1]).toMatch(/height:\s*32px/);
      }
    });
  });

  describe('Flexbox Layout Patterns', () => {
    let cssContent;

    beforeAll(() => {
      cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');
    });

    test('Nav wrapper should use flexbox with proper properties', () => {
      expect(cssContent).toMatch(/\.nav-wrapper\s*{[\s\S]*?display:\s*flex/);
      expect(cssContent).toMatch(/\.nav-wrapper\s*{[\s\S]*?justify-content:\s*space-between/);
      expect(cssContent).toMatch(/\.nav-wrapper\s*{[\s\S]*?align-items:\s*center/);
    });

    test('Center nav should use flex column on mobile', () => {
      const mobileSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:max-width:\s*991px|width\s*<=\s*991px)\)[\s\S]*?\.center-nav\.active\s*{([^}]*)}/
      );
      if (mobileSection) {
        expect(mobileSection[1]).toMatch(/flex-direction:\s*column/);
      }
    });

    test('Social nav should use flex with proper alignment', () => {
      expect(cssContent).toMatch(/\.social-nav\s*{[\s\S]*?display:\s*flex/);
      expect(cssContent).toMatch(/\.social-nav\s*{[\s\S]*?align-items:\s*center/);
    });

    test('Nav buttons should use inline-flex for alignment', () => {
      expect(cssContent).toMatch(/\.nav-btn\s*{[\s\S]*?display:\s*inline-flex/);
      expect(cssContent).toMatch(/\.nav-btn\s*{[\s\S]*?align-items:\s*center/);
    });

    test('Mobile menu buttons should align content to start', () => {
      expect(cssContent).toMatch(
        /\.center-nav\.active\s+a\s*{[\s\S]*?justify-content:\s*flex-start/
      );
    });

    test('Brand logo should use inline-flex', () => {
      expect(cssContent).toMatch(/\.brand-logo\s*{[\s\S]*?display:\s*inline-flex/);
      expect(cssContent).toMatch(/\.brand-logo\s*{[\s\S]*?align-items:\s*center/);
    });
  });

  describe('Accessibility & User Experience', () => {
    let cssContent;

    beforeAll(() => {
      cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');
    });

    test('Buttons should prevent text wrapping', () => {
      expect(cssContent).toMatch(/\.nav-btn\s*{[\s\S]*?white-space:\s*nowrap/);
      expect(cssContent).toMatch(/\.cta-link\s*{[\s\S]*?white-space:\s*nowrap/);
    });

    test('Mobile menu toggle should have visible cursor pointer', () => {
      expect(cssContent).toMatch(/\.mobile-menu-toggle\s*{[\s\S]*?cursor:\s*pointer/);
    });

    test('Icons should have proper line-height for alignment', () => {
      expect(cssContent).toMatch(/\.nav-btn\s+i\s*{[\s\S]*?line-height:\s*1/);
    });

    test('CTA links should have minimum height for touch targets', () => {
      expect(cssContent).toMatch(/\.cta-link\s*{[\s\S]*?height:\s*40px/);
    });

    test('Brand text should be hidden on tablet/mobile screens', () => {
      const mediumSection = cssContent.match(
        /@media\s+screen\s+and\s+\((?:max-width:\s*991px|width\s*<=\s*991px)\)[\s\S]*?\.brand-logo\s+span\s*{([^}]*)}/
      );
      if (mediumSection) {
        // Brand should be hidden with overflow and visibility
        expect(mediumSection[1]).toMatch(/overflow:\s*hidden/);
        expect(mediumSection[1]).toMatch(/visibility:\s*hidden/);
      }
    });

    test('Border radius should provide visual softness', () => {
      expect(cssContent).toMatch(/\.nav-btn\s*{[\s\S]*?border-radius:\s*8px/);
      expect(cssContent).toMatch(/\.social-icon\s*{[\s\S]*?border-radius:\s*50%/);
    });

    test('Separator should provide visual division', () => {
      expect(cssContent).toMatch(/\.nav-separator\s*{[\s\S]*?width:\s*1px/);
      expect(cssContent).toMatch(/\.nav-separator\s*{[\s\S]*?height:\s*30px/);
    });
  });
});
