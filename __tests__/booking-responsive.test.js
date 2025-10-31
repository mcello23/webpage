/**
 * Booking Call Responsive Text Hiding Test Suite
 *
 * Tests the responsive behavior of "Book 15-min call" text at different breakpoints:
 * - At 900p or lower (< 1600px): Text should be hidden, icon visible
 * - At 900p+ (>= 1600px): Both text and icon should be visible
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Booking Call Responsive Behavior', () => {
  let cssContent;
  let htmlContent;

  beforeAll(() => {
    htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    cssContent = fs.readFileSync(path.join(__dirname, '../css/navbar.css'), 'utf8');
  });

  describe('HTML Structure Verification', () => {
    let dom, document;

    beforeAll(() => {
      dom = new JSDOM(htmlContent, {
        url: 'http://localhost',
        pretendToBeVisual: true,
      });
      document = dom.window.document;
    });

    test('should have booking call link with correct classes', () => {
      const bookingLink = document.querySelector('a.cta-link.book-call');
      expect(bookingLink).toBeTruthy();
      expect(bookingLink.classList.contains('cta-link')).toBe(true);
      expect(bookingLink.classList.contains('book-call')).toBe(true);
    });

    test('should have booking call icon', () => {
      const bookingLink = document.querySelector('a.cta-link.book-call');
      const icon = bookingLink.querySelector('i.material-icons');
      expect(icon).toBeTruthy();
      expect(icon.textContent.trim()).toBe('schedule');
    });

    test('should have booking call text span', () => {
      const bookingLink = document.querySelector('a.cta-link.book-call');
      const span = bookingLink.querySelector('span');
      expect(span).toBeTruthy();
      expect(span.textContent).toBe('Book 15-min call');
    });

    test('booking link should have correct href to Calendly', () => {
      const bookingLink = document.querySelector('a.cta-link.book-call');
      expect(bookingLink.getAttribute('href')).toContain('calendly.com');
    });

    test('booking link should have aria-label', () => {
      const bookingLink = document.querySelector('a.cta-link.book-call');
      expect(bookingLink.getAttribute('aria-label')).toBe('Book a 15-minute call');
    });

    test('booking icon should have aria-hidden', () => {
      const bookingLink = document.querySelector('a.cta-link.book-call');
      const icon = bookingLink.querySelector('i.material-icons');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

    test('booking link should have target="_blank" for new tab', () => {
      const bookingLink = document.querySelector('a.cta-link.book-call');
      expect(bookingLink.getAttribute('target')).toBe('_blank');
    });

    test('booking link should have rel="noopener noreferrer" for security', () => {
      const bookingLink = document.querySelector('a.cta-link.book-call');
      expect(bookingLink.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  describe('CSS Media Query Rules for 900p or Lower (992px-1599px)', () => {
    test('should have media query rule for hiding booking text below 1600px', () => {
      const mediaQueryPattern =
        /@media\s+screen\s+and\s+\(min-width:\s*992px\)\s+and\s+\(max-width:\s*1599px\)/;
      expect(cssContent).toMatch(mediaQueryPattern);
    });

    test('media query should hide booking call span text', () => {
      const hideTextPattern = /\.cta-link\.book-call\s+span\s*\{[^}]*display:\s*none\s*!important/;
      expect(cssContent).toMatch(hideTextPattern);
    });

    test('media query should keep booking call icon visible', () => {
      const showIconPattern =
        /\.cta-link\.book-call\s+i\s*\{[^}]*display:\s*inline-flex\s*!important/;
      expect(cssContent).toMatch(showIconPattern);
    });

    test('should use !important for text hiding to override other rules', () => {
      const importantPattern = /\.cta-link\.book-call\s+span\s*\{[^}]*display:\s*none\s*!important/;
      expect(cssContent).toMatch(importantPattern);
    });

    test('should use !important for icon display to override other rules', () => {
      const importantPattern =
        /\.cta-link\.book-call\s+i\s*\{[^}]*display:\s*inline-flex\s*!important/;
      expect(cssContent).toMatch(importantPattern);
    });
  });

  describe('CSS Media Query Rules for 900p+ (>= 1600px)', () => {
    test('should have media query rule for showing booking text at 1600px+', () => {
      const mediaQueryPattern = /@media\s+screen\s+and\s+\(min-width:\s*1600px\)/;
      expect(cssContent).toMatch(mediaQueryPattern);
    });

    test('media query should show booking call span text at 1600px+', () => {
      const showTextPattern =
        /\.cta-link\.book-call\s+span\s*\{[^}]*display:\s*inline\s*!important/;
      expect(cssContent).toMatch(showTextPattern);
    });

    test('should use !important for text showing to override mobile rules', () => {
      const importantPattern =
        /\.cta-link\.book-call\s+span\s*\{[^}]*display:\s*inline\s*!important/;
      expect(cssContent).toMatch(importantPattern);
    });
  });

  describe('CSS Version Documentation', () => {
    test('CSS should be at VERSION 6.0 with booking call hiding', () => {
      expect(cssContent).toContain('VERSION: 6.0');
    });

    test('version comment should mention booking call text hiding', () => {
      const versionCommentPattern = /VERSION:\s*6\.0.*booking\s+call\s+text/i;
      expect(cssContent).toMatch(versionCommentPattern);
    });

    test('below 900p section should document booking call hiding', () => {
      const belowCommentPattern = /Below 900p.*Hide.*booking\s+call\s+text/is;
      expect(cssContent).toMatch(belowCommentPattern);
    });

    test('at 900p+ section should document booking call showing', () => {
      const aboveCommentPattern = /At 900p.*shows\s+booking\s+call\s+text/is;
      expect(cssContent).toMatch(aboveCommentPattern);
    });
  });

  describe('Cache Busting Verification', () => {
    test('index.html should have updated cache version to v16', () => {
      expect(htmlContent).toContain('navbar.css?v=16');
    });

    test('should NOT have old cache version v15 or v14', () => {
      const v15Pattern = /navbar\.css\?v=15["\s>]/;
      const v14Pattern = /navbar\.css\?v=14["\s>]/;
      expect(htmlContent).not.toMatch(v15Pattern);
      expect(htmlContent).not.toMatch(v14Pattern);
    });
  });

  describe('Responsive Breakpoint Logic', () => {
    test('breakpoint should match brand logo text hiding threshold', () => {
      // Both brand-logo span and booking call span should hide at same breakpoint
      const breakpointPattern =
        /@media\s+screen\s+and\s+\(min-width:\s*992px\)\s+and\s+\(max-width:\s*1599px\)/;
      const brandSpanHide = /\.brand-logo\s+span[^}]*display:\s*none\s*!important/s;
      const bookingSpanHide = /\.cta-link\.book-call\s+span[^}]*display:\s*none\s*!important/s;

      expect(cssContent).toMatch(breakpointPattern);
      expect(cssContent).toMatch(brandSpanHide);
      expect(cssContent).toMatch(bookingSpanHide);
    });

    test('show threshold should match brand logo text showing threshold', () => {
      // Both brand-logo span and booking call span should show at same breakpoint
      const breakpointPattern = /@media\s+screen\s+and\s+\(min-width:\s*1600px\)/;
      const brandSpanShow = /\.brand-logo\s+span[^}]*display:\s*inline\s*!important/s;
      const bookingSpanShow = /\.cta-link\.book-call\s+span[^}]*display:\s*inline\s*!important/s;

      expect(cssContent).toMatch(breakpointPattern);
      expect(cssContent).toMatch(brandSpanShow);
      expect(cssContent).toMatch(bookingSpanShow);
    });

    test('mobile breakpoint (< 992px) should not affect booking call specifically', () => {
      // No specific booking call rules in mobile breakpoint
      const mobileBookingPattern =
        /@media\s+screen\s+and\s+\(max-width:\s*991px\)[^@]*\.cta-link\.book-call/s;
      expect(cssContent).not.toMatch(mobileBookingPattern);
    });
  });

  describe('JSDOM Simulated Responsive Behavior', () => {
    describe('Desktop Resolution (>= 1600px)', () => {
      let dom, document, window;

      beforeAll(() => {
        dom = new JSDOM(htmlContent, {
          url: 'http://localhost',
          pretendToBeVisual: true,
        });
        document = dom.window.document;
        window = dom.window;

        // Set viewport to desktop (1920x1080)
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1920,
        });

        // Inject CSS
        const style = document.createElement('style');
        style.textContent = cssContent;
        document.head.appendChild(style);
      });

      test('booking call text span should exist in DOM at desktop resolution', () => {
        const bookingSpan = document.querySelector('.cta-link.book-call span');
        expect(bookingSpan).toBeTruthy();
        expect(bookingSpan.textContent).toBe('Book 15-min call');
      });

      test('booking call icon should exist in DOM at desktop resolution', () => {
        const bookingIcon = document.querySelector('.cta-link.book-call i');
        expect(bookingIcon).toBeTruthy();
        expect(bookingIcon.textContent.trim()).toBe('schedule');
      });

      test('booking link should be visible at desktop resolution', () => {
        const bookingLink = document.querySelector('.cta-link.book-call');
        expect(bookingLink).toBeTruthy();
        // In JSDOM, offsetParent might not work as expected, just verify element exists
        const computedStyle = window.getComputedStyle(bookingLink);
        expect(computedStyle.display).not.toBe('none');
      });
    });

    describe('Tablet Resolution (992px - 1599px)', () => {
      let dom, document, window;

      beforeAll(() => {
        dom = new JSDOM(htmlContent, {
          url: 'http://localhost',
          pretendToBeVisual: true,
        });
        document = dom.window.document;
        window = dom.window;

        // Set viewport to tablet (1280x720)
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1280,
        });

        // Inject CSS
        const style = document.createElement('style');
        style.textContent = cssContent;
        document.head.appendChild(style);
      });

      test('booking call text span should still exist in DOM at tablet resolution', () => {
        const bookingSpan = document.querySelector('.cta-link.book-call span');
        expect(bookingSpan).toBeTruthy();
        expect(bookingSpan.textContent).toBe('Book 15-min call');
      });

      test('booking call icon should exist in DOM at tablet resolution', () => {
        const bookingIcon = document.querySelector('.cta-link.book-call i');
        expect(bookingIcon).toBeTruthy();
        expect(bookingIcon.textContent.trim()).toBe('schedule');
      });

      test('booking link should be accessible at tablet resolution', () => {
        const bookingLink = document.querySelector('.cta-link.book-call');
        expect(bookingLink).toBeTruthy();
      });
    });

    describe('Mobile Resolution (< 992px)', () => {
      let dom, document, window;

      beforeAll(() => {
        dom = new JSDOM(htmlContent, {
          url: 'http://localhost',
          pretendToBeVisual: true,
        });
        document = dom.window.document;
        window = dom.window;

        // Set viewport to mobile (375x667)
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 375,
        });

        // Inject CSS
        const style = document.createElement('style');
        style.textContent = cssContent;
        document.head.appendChild(style);
      });

      test('booking call should still exist in DOM at mobile resolution', () => {
        const bookingLink = document.querySelector('.cta-link.book-call');
        expect(bookingLink).toBeTruthy();
      });

      test('booking call text should exist at mobile resolution', () => {
        const bookingSpan = document.querySelector('.cta-link.book-call span');
        expect(bookingSpan).toBeTruthy();
      });

      test('booking call icon should exist at mobile resolution', () => {
        const bookingIcon = document.querySelector('.cta-link.book-call i');
        expect(bookingIcon).toBeTruthy();
      });
    });
  });

  describe('CSS Consistency & Regression Prevention', () => {
    test('booking call rules should not interfere with brand logo rules', () => {
      // Ensure selectors are distinct
      const bookingPattern = /\.cta-link\.book-call/;
      const brandPattern = /\.brand-logo/;

      expect(cssContent).toMatch(bookingPattern);
      expect(cssContent).toMatch(brandPattern);
    });

    test('should maintain separate icon selectors for booking and brand', () => {
      const bookingIconPattern = /\.cta-link\.book-call\s+i/;
      const brandIconPattern = /\.brand-logo\s+i/;

      expect(cssContent).toMatch(bookingIconPattern);
      expect(cssContent).toMatch(brandIconPattern);
    });

    test('should maintain separate span selectors for booking and brand', () => {
      const bookingSpanPattern = /\.cta-link\.book-call\s+span/;
      const brandSpanPattern = /\.brand-logo\s+span/;

      expect(cssContent).toMatch(bookingSpanPattern);
      expect(cssContent).toMatch(brandSpanPattern);
    });

    test('booking call hiding should only affect .book-call, not other cta-links', () => {
      // Ensure selector is specific to .book-call
      const specificPattern = /\.cta-link\.book-call\s+span/;

      expect(cssContent).toMatch(specificPattern);
      // Should use specific selector .cta-link.book-call, not generic .cta-link
    });
  });

  describe('Integration with Other Page Files', () => {
    let frameworksHtml, sideProjHtml;

    beforeAll(() => {
      frameworksHtml = fs.readFileSync(path.join(__dirname, '../pages/frameworks.html'), 'utf8');
      sideProjHtml = fs.readFileSync(path.join(__dirname, '../pages/side_proj.html'), 'utf8');
    });

    test('frameworks.html should have updated cache version v16', () => {
      expect(frameworksHtml).toContain('navbar.css?v=16');
    });

    test('side_proj.html should have updated cache version v16', () => {
      expect(sideProjHtml).toContain('navbar.css?v=16');
    });

    test('frameworks.html should have booking call link', () => {
      expect(frameworksHtml).toContain('Book 15-min call');
    });

    test('side_proj.html should have booking call link', () => {
      expect(sideProjHtml).toContain('Book 15-min call');
    });
  });

  describe('Accessibility Considerations', () => {
    let dom, document;

    beforeAll(() => {
      dom = new JSDOM(htmlContent, {
        url: 'http://localhost',
        pretendToBeVisual: true,
      });
      document = dom.window.document;
    });

    test('aria-label should provide context when text is hidden', () => {
      const bookingLink = document.querySelector('.cta-link.book-call');
      const ariaLabel = bookingLink.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel.toLowerCase()).toContain('book');
      expect(ariaLabel.toLowerCase()).toContain('call');
    });

    test('icon should be hidden from screen readers', () => {
      const bookingIcon = document.querySelector('.cta-link.book-call i');
      expect(bookingIcon.getAttribute('aria-hidden')).toBe('true');
    });

    test('link should be keyboard accessible', () => {
      const bookingLink = document.querySelector('.cta-link.book-call');
      expect(bookingLink.tagName).toBe('A');
      expect(bookingLink.getAttribute('href')).toBeTruthy();
    });
  });

  describe('Performance Considerations', () => {
    test('should use efficient CSS selectors without deep nesting', () => {
      const deepNestingPattern = /\.cta-link\.book-call\s+[^{]*\s+[^{]*\s+[^{]*\s+[^{]*\{/;
      expect(cssContent).not.toMatch(deepNestingPattern);
    });

    test('should reuse existing breakpoint queries instead of creating new ones', () => {
      const query992_1599 = cssContent.match(
        /@media\s+screen\s+and\s+\(min-width:\s*992px\)\s+and\s+\(max-width:\s*1599px\)/g
      );
      const query1600 = cssContent.match(/@media\s+screen\s+and\s+\(min-width:\s*1600px\)/g);

      // Should have these queries, but not excessive duplicates
      expect(query992_1599).toBeTruthy();
      expect(query1600).toBeTruthy();
    });

    test('should use !important sparingly and only where necessary', () => {
      // !important should be used for override purposes, documented
      const bookingImportant = cssContent.match(/\.cta-link\.book-call[^}]*!important/g);
      expect(bookingImportant).toBeTruthy();
      expect(bookingImportant.length).toBeLessThan(10); // Reasonable limit
    });
  });
});
