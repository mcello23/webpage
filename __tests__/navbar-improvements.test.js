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

  beforeAll(() => {
    // Load all HTML pages
    const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const frameworksHtml = fs.readFileSync(
      path.join(__dirname, '../pages/frameworks/index.html'),
      'utf8'
    );
    const sideProjHtml = fs.readFileSync(
      path.join(__dirname, '../pages/side_proj/index.html'),
      'utf8'
    );

    // Create JSDOM instances
    const indexDOM = new JSDOM(indexHtml);
    const frameworksDOM = new JSDOM(frameworksHtml);
    const sideProjDOM = new JSDOM(sideProjHtml);

    indexDoc = indexDOM.window.document;
    frameworksDoc = frameworksDOM.window.document;
    sideProjDoc = sideProjDOM.window.document;

    indexWindow = indexDOM.window;
    frameworksWindow = frameworksDOM.window;
    sideProjWindow = sideProjDOM.window;

    // Load CSS for computed styles
    const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

    // Apply CSS to all documents
    [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
      const style = doc.createElement('style');
      style.textContent = cssContent;
      doc.head.appendChild(style);
    });
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

  describe('Mobile Menu Compact Design', () => {
    test('CSS should define compact mobile menu (left-floating, smaller)', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

      // Check for left positioning
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?left:\s*16px/);

      // Check for compact width
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?max-width:\s*220px/);

      // Check for smaller padding
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?padding:\s*10px\s+12px/);

      // Check for smaller gap
      expect(cssContent).toMatch(/\.center-nav\.active\s*{[\s\S]*?gap:\s*8px/);
    });

    test('CSS should define smaller icons (16px) in mobile menu', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

      // Check for 16px icon size in active mobile menu
      expect(cssContent).toMatch(/\.center-nav\.active\s+a\s+i\s*{[\s\S]*?font-size:\s*16px/);
    });

    test('CSS should define smaller text (0.85rem) in mobile menu', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

      // Check for 0.85rem font size in active mobile menu links
      expect(cssContent).toMatch(/\.center-nav\.active\s+a\s*{[\s\S]*?font-size:\s*0\.85rem/);
    });

    test('CSS should define white text and icons for mobile menu buttons', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

      // Check for white text
      expect(cssContent).toMatch(/\.center-nav\.active\s+a\s*{[\s\S]*?color:\s*#fff/);

      // Check for white icons
      expect(cssContent).toMatch(
        /\.center-nav\.active\s+a\s+i\s*{[\s\S]*?color:\s*rgba\(255,\s*255,\s*255,\s*0\.95\)/
      );
    });

    test.each([
      ['index.html', () => indexDoc],
      ['frameworks.html', () => frameworksDoc],
      ['side_proj.html', () => sideProjDoc],
    ])('%s - mobile menu buttons should have gradient backgrounds', (pageName, getDoc) => {
      const doc = getDoc();

      const homeBtn = doc.querySelector('.mobile-home-btn');
      const projectsBtn = doc.querySelector('.nav-btn-projects');
      const frameworksBtn = doc.querySelector('.nav-btn-frameworks');
      const certsBtn = doc.querySelector('.nav-btn-certs');

      expect(homeBtn.getAttribute('style')).toContain('linear-gradient');
      expect(projectsBtn.className).toContain('nav-btn-projects');
      expect(frameworksBtn.className).toContain('nav-btn-frameworks');
      expect(certsBtn.className).toContain('nav-btn-certs');
    });
  });

  describe('Alignment Tests - CTA & Icons', () => {
    test('CSS should align social nav items with flexbox center', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

      // Check that social-nav uses align-items: center
      expect(cssContent).toMatch(/\.social-nav\s*{[\s\S]*?align-items:\s*center/);

      // Check that nav-wrapper uses align-items: center on mobile
      expect(cssContent).toMatch(
        /@media\s+screen\s+and\s+\(max-width:\s*767px\)[\s\S]*?\.nav-wrapper\s*{[\s\S]*?align-items:\s*center/
      );
    });

    test('CSS should NOT use transform translateY for alignment on tablet/mobile', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

      // Extract tablet breakpoint section (max-width: 991px)
      const tabletSection = cssContent.match(
        /@media\s+screen\s+and\s+\(max-width:\s*991px\)\s*{([\s\S]*?)(?=@media|$)/
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
      const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

      // Check desktop media query
      const desktopSection = cssContent.match(
        /@media\s+screen\s+and\s+\(min-width:\s*992px\)\s*{([\s\S]*?)}/
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
      const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

      // Desktop breakpoint (min-width: 992px)
      expect(cssContent).toMatch(/@media\s+screen\s+and\s+\(min-width:\s*992px\)/);

      // Tablet breakpoint (max-width: 991px)
      expect(cssContent).toMatch(/@media\s+screen\s+and\s+\(max-width:\s*991px\)/);

      // Mobile breakpoint (max-width: 767px)
      expect(cssContent).toMatch(/@media\s+screen\s+and\s+\(max-width:\s*767px\)/);

      // Small mobile breakpoint (max-width: 480px)
      expect(cssContent).toMatch(/@media\s+screen\s+and\s+\(max-width:\s*480px\)/);
    });

    test('CSS should hide brand on mobile devices', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

      // Check mobile section hides brand
      const mobileSection = cssContent.match(
        /@media\s+screen\s+and\s+\(max-width:\s*767px\)\s*{([\s\S]*?)(?=@media|$)/
      );

      if (mobileSection) {
        const mobileCSS = mobileSection[1];
        expect(mobileCSS).toMatch(/\.brand-logo.*display:\s*none/s);
      }
    });

    test('CSS should show mobile home link on mobile', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

      // Mobile home link should be hidden by default
      expect(cssContent).toMatch(/\.mobile-home-link\s*{[\s\S]*?display:\s*none/);

      // But shown on mobile
      const mobileSection = cssContent.match(
        /@media\s+screen\s+and\s+\(max-width:\s*767px\)\s*{([\s\S]*?)(?=@media|$)/
      );

      if (mobileSection) {
        const mobileCSS = mobileSection[1];
        expect(mobileCSS).toMatch(/\.mobile-home-link\s*{[\s\S]*?display:\s*block/);
      }
    });

    test('CSS should hide CTA text on tablet/mobile', () => {
      const cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');

      // Check tablet breakpoint
      const tabletSection = cssContent.match(
        /@media\s+screen\s+and\s+\(max-width:\s*991px\)\s*{([\s\S]*?)(?=@media|$)/
      );

      if (tabletSection) {
        const tabletCSS = tabletSection[1];
        expect(tabletCSS).toMatch(/\.cta-link\s+span\s*{[\s\S]*?display:\s*none/);
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
});
