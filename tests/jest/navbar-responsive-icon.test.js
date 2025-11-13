/**
 * Navbar Responsive Design & Icon Alignment Test Suite
 *
 * Tests all changes made for:
 * 1. Home icon implementation (changed from folder_open to home)
 * 2. Icon vertical alignment with text
 * 3. Responsive text hiding at different breakpoints
 * 4. 900p (1600px) threshold behavior
 * 5. Flexbox alignment properties
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Navbar Responsive Design & Icon Alignment', () => {
  let dom, document, window;
  let cssContent;

  beforeAll(() => {
    const html = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
    cssContent = fs.readFileSync(path.join(__dirname, '../../css/navbar.css'), 'utf8');

    dom = new JSDOM(html, {
      url: 'http://localhost',
      pretendToBeVisual: true,
    });

    document = dom.window.document;
    window = dom.window;

    // Inject CSS styles for computed style tests
    const style = document.createElement('style');
    style.textContent = cssContent;
    document.head.appendChild(style);
  });

  afterAll(() => {
    if (dom && dom.window) dom.window.close();
  });

  describe('Home Icon Implementation', () => {
    test('should have home icon instead of folder_open', () => {
      const brandIcon = document.querySelector('.brand-logo i.material-icons');
      expect(brandIcon).toBeTruthy();
      expect(brandIcon.textContent.trim()).toBe('home');
    });

    test('should NOT have folder_open icon', () => {
      const brandIcon = document.querySelector('.brand-logo i.material-icons');
      expect(brandIcon.textContent.trim()).not.toBe('folder_open');
    });

    test('should have Material Icons font loaded in head', () => {
      const materialIconsLink = Array.from(document.querySelectorAll('link')).find(
        (link) => link.href && link.href.includes('Material+Icons')
      );
      expect(materialIconsLink).toBeTruthy();
    });

    test('icon should have aria-hidden attribute for accessibility', () => {
      const brandIcon = document.querySelector('.brand-logo i.material-icons');
      expect(brandIcon.getAttribute('aria-hidden')).toBe('true');
    });

    test('parent link should have aria-label for screen readers', () => {
      const brandLink = document.querySelector('.brand-logo');
      expect(brandLink.getAttribute('aria-label')).toBe('Home');
    });
  });

  describe('Brand Logo Structure', () => {
    test('should have brand-logo link element', () => {
      const brandLogo = document.querySelector('.brand-logo');
      expect(brandLogo).toBeTruthy();
      expect(brandLogo.tagName).toBe('A');
    });

    test('should contain icon as first child', () => {
      const brandLogo = document.querySelector('.brand-logo');
      const icon = brandLogo.querySelector('i.material-icons');
      expect(icon).toBeTruthy();
      expect(icon).toBe(brandLogo.children[0]);
    });

    test('should contain text span "Marcelo Costa — SDET"', () => {
      const brandText = document.querySelector('.brand-logo span');
      expect(brandText).toBeTruthy();
      expect(brandText.textContent).toBe('Marcelo Costa — SDET');
    });

    test('should have icon and span as direct children', () => {
      const brandLogo = document.querySelector('.brand-logo');
      expect(brandLogo.children.length).toBe(2);
      expect(brandLogo.children[0].tagName).toBe('I');
      expect(brandLogo.children[1].tagName).toBe('SPAN');
    });
  });

  describe('CSS Flexbox Alignment Properties', () => {
    test('.brand-logo should use inline-flex display', () => {
      const brandLogo = document.querySelector('.brand-logo');
      const styles = window.getComputedStyle(brandLogo);
      expect(styles.display).toBe('inline-flex');
    });

    test('.brand-logo should have align-items center for vertical alignment', () => {
      const brandLogo = document.querySelector('.brand-logo');
      const styles = window.getComputedStyle(brandLogo);
      expect(styles.alignItems).toBe('center');
    });

    test('.brand-logo should align naturally without fixed height', () => {
      const brandLogo = document.querySelector('.brand-logo');
      const styles = window.getComputedStyle(brandLogo);
      // Should not have a fixed height to align with social icons
      expect(styles.height).not.toBe('80px');
    });

    test('.brand-logo should have gap of 8px between icon and text', () => {
      const brandLogo = document.querySelector('.brand-logo');
      const styles = window.getComputedStyle(brandLogo);
      expect(styles.gap).toBe('8px');
    });

    test('.brand-logo i should use inline-flex display', () => {
      const icon = document.querySelector('.brand-logo i');
      const styles = window.getComputedStyle(icon);
      expect(styles.display).toBe('inline-flex');
    });

    test('.brand-logo i should have align-items center', () => {
      const icon = document.querySelector('.brand-logo i');
      const styles = window.getComputedStyle(icon);
      expect(styles.alignItems).toBe('center');
    });

    test('.brand-logo i should have justify-content center', () => {
      const icon = document.querySelector('.brand-logo i');
      const styles = window.getComputedStyle(icon);
      expect(styles.justifyContent).toBe('center');
    });

    test('.brand-logo span should use inline-flex display for alignment', () => {
      const span = document.querySelector('.brand-logo span');
      const styles = window.getComputedStyle(span);
      expect(styles.display).toBe('inline-flex');
    });

    test('.brand-logo span should have align-items center', () => {
      const span = document.querySelector('.brand-logo span');
      const styles = window.getComputedStyle(span);
      expect(styles.alignItems).toBe('center');
    });
  });

  describe('Icon Visual Properties', () => {
    test('icon should have font-size of 20px', () => {
      const icon = document.querySelector('.brand-logo i');
      const styles = window.getComputedStyle(icon);
      expect(styles.fontSize).toBe('20px');
    });

    test('icon should NOT have excessive margin-top', () => {
      const icon = document.querySelector('.brand-logo i');
      const styles = window.getComputedStyle(icon);
      const marginTop = parseInt(styles.marginTop) || 0;
      expect(Math.abs(marginTop)).toBeLessThanOrEqual(5);
    });

    test('icon should NOT have line-height override that breaks alignment', () => {
      const cssRules = cssContent.match(/\.brand-logo i\s*{[^}]*}/g);
      const iconRule = cssRules ? cssRules[0] : '';
      // Should NOT have line-height: 80px or similar large values
      expect(iconRule).not.toMatch(/line-height:\s*80px/);
    });
  });

  describe('Text Span Properties', () => {
    test('span should NOT have large line-height that breaks alignment', () => {
      const cssRules = cssContent.match(/\.brand-logo span\s*{[^}]*}/g);
      const spanRule = cssRules ? cssRules[0] : '';
      expect(spanRule).not.toMatch(/line-height:\s*80px/);
    });

    test('text should be in a span element', () => {
      const span = document.querySelector('.brand-logo span');
      expect(span.tagName).toBe('SPAN');
    });
  });

  describe('Responsive Breakpoint: Below 900p (992px - 1599px)', () => {
    test('CSS should contain media query for 992px to 1599px range', () => {
      expect(cssContent).toMatch(
        /@media screen and \((min-width:\s*992px|width\s*>=\s*992px)\) and \((max-width:\s*1599px|width\s*<=\s*1599px)\)/
      );
    });

    test('should hide brand text span in mid-range breakpoint', () => {
      const mediaQueryRule = cssContent.match(
        /@media screen and \((min-width:\s*992px|width\s*>=\s*992px)\) and \((max-width:\s*1599px|width\s*<=\s*1599px)\)\s*{[^}]*\.brand-logo span[^}]*}/s
      );
      expect(mediaQueryRule).toBeTruthy();
      expect(mediaQueryRule[0]).toMatch(/display:\s*none\s*!important/);
    });

    test('should keep icon visible in mid-range breakpoint', () => {
      const mediaQueryRule = cssContent.match(
        /@media screen and \((min-width:\s*992px|width\s*>=\s*992px)\) and \((max-width:\s*1599px|width\s*<=\s*1599px)\)[^@]*\.brand-logo i[^}]*display[^;]*/s
      );
      expect(mediaQueryRule).toBeTruthy();
      expect(mediaQueryRule[0]).toMatch(/display:\s*inline-flex\s*!important/);
    });

    test('mid-range media query should use !important for specificity', () => {
      const spanRule = cssContent.match(
        /@media screen and \((min-width:\s*992px|width\s*>=\s*992px)\) and \((max-width:\s*1599px|width\s*<=\s*1599px)\)[^@]*\.brand-logo span[^}]*/s
      );
      expect(spanRule[0]).toMatch(/!important/);
    });
  });

  describe('Responsive Breakpoint: At 900p+ (1600px and above)', () => {
    test('CSS should contain media query for 1600px minimum', () => {
      expect(cssContent).toMatch(/@media screen and \((min-width:\s*1600px|width\s*>=\s*1600px)\)/);
    });

    test('should show brand text span at 900p+', () => {
      const mediaQueryRule = cssContent.match(
        /@media screen and \((min-width:\s*1600px|width\s*>=\s*1600px)\)[^@]*\.brand-logo span[^}]*}/s
      );
      expect(mediaQueryRule).toBeTruthy();
      expect(mediaQueryRule[0]).toMatch(/display:\s*inline\s*!important/);
    });

    test('should have comprehensive visibility overrides for text span', () => {
      const spanRule = cssContent.match(
        /@media screen and \((min-width:\s*1600px|width\s*>=\s*1600px)\)[^@]*\.brand-logo span\s*{[^}]*}/s
      );
      expect(spanRule[0]).toMatch(/opacity:\s*1\s*!important/);
      expect(spanRule[0]).toMatch(/visibility:\s*visible\s*!important/);
      expect(spanRule[0]).toMatch(/width:\s*auto\s*!important/);
      expect(spanRule[0]).toMatch(/height:\s*auto\s*!important/);
    });

    test('should override parent container visibility', () => {
      const containerRule = cssContent.match(
        /@media screen and \((min-width:\s*1600px|width\s*>=\s*1600px)\)[^@]*\.brand-logo\s*{[^}]*}/s
      );
      expect(containerRule[0]).toMatch(/visibility:\s*visible\s*!important/);
      expect(containerRule[0]).toMatch(/opacity:\s*1\s*!important/);
    });

    test('should show icon at 900p+', () => {
      const iconRule = cssContent.match(
        /@media screen and \((min-width:\s*1600px|width\s*>=\s*1600px)\)[^@]*\.brand-logo i[^}]*}/s
      );
      expect(iconRule[0]).toMatch(/display:\s*inline-flex\s*!important/);
      expect(iconRule[0]).toMatch(/visibility:\s*visible\s*!important/);
    });

    test('900p+ rules should use !important for nuclear override', () => {
      const rule = cssContent.match(
        /@media screen and \((min-width:\s*1600px|width\s*>=\s*1600px)\)[^@]*/s
      );
      const importantCount = (rule[0].match(/!important/g) || []).length;
      expect(importantCount).toBeGreaterThanOrEqual(8); // Should have many !important declarations
    });

    test('should have overflow visible to prevent clipping', () => {
      const rules = cssContent.match(
        /@media screen and \((min-width:\s*1600px|width\s*>=\s*1600px)\)[^@]*/s
      );
      expect(rules[0]).toMatch(/overflow:\s*visible\s*!important/);
    });

    test('should have pointer-events auto for interaction', () => {
      const spanRule = cssContent.match(
        /@media screen and \((min-width:\s*1600px|width\s*>=\s*1600px)\)[^@]*\.brand-logo span[^}]*}/s
      );
      expect(spanRule[0]).toMatch(/pointer-events:\s*auto\s*!important/);
    });

    test('should remove max-width constraint', () => {
      const spanRule = cssContent.match(
        /@media screen and \((min-width:\s*1600px|width\s*>=\s*1600px)\)[^@]*\.brand-logo span[^}]*}/s
      );
      expect(spanRule[0]).toMatch(/max-width:\s*none\s*!important/);
    });
  });

  describe('Responsive Breakpoint: Mobile (below 992px)', () => {
    test('CSS should have mobile breakpoint at max-width 991px', () => {
      expect(cssContent).toMatch(/@media screen and \((max-width:\s*991px|width\s*<=\s*991px)\)/);
    });

    test('mobile breakpoint should hide brand elements', () => {
      const mobileRule = cssContent.match(
        /@media screen and \((max-width:\s*991px|width\s*<=\s*991px)\)[^@]*\.brand-logo[^@]*/s
      );
      expect(mobileRule[0]).toMatch(/visibility:\s*hidden\s*!important/);
      expect(mobileRule[0]).toMatch(/opacity:\s*0\s*!important/);
    });
  });

  describe('CSS Version Comments and Documentation', () => {
    test('should have version comment for 900p breakpoint', () => {
      expect(cssContent).toMatch(/VERSION:\s*6\.0/);
    });

    test('should document 900p threshold change', () => {
      expect(cssContent).toMatch(/900p/i);
      expect(cssContent).toMatch(/1600px/);
    });

    test('should have descriptive comments for media queries', () => {
      expect(cssContent).toMatch(/Below 900p/i);
      expect(cssContent).toMatch(/At 900p and above/i);
    });

    test('should mention "nuclear override" strategy', () => {
      expect(cssContent).toMatch(/nuclear override/i);
    });
  });

  describe('Cache Busting', () => {
    test('should have cache version parameter in CSS link', () => {
      const navbarCssLink = Array.from(document.querySelectorAll('link')).find(
        (link) => link.href && link.href.includes('navbar.css')
      );
      expect(navbarCssLink).toBeTruthy();
      expect(navbarCssLink.href).toMatch(/\?v=/);
    });

    test('cache version should be v14 or higher', () => {
      const navbarCssLink = Array.from(document.querySelectorAll('link')).find(
        (link) => link.href && link.href.includes('navbar.css')
      );
      const versionMatch = navbarCssLink.href.match(/\?v=(\d+)/);
      expect(versionMatch).toBeTruthy();
      const version = parseInt(versionMatch[1]);
      expect(version).toBeGreaterThanOrEqual(14);
    });
  });

  describe('Alignment Regression Prevention', () => {
    test('should NOT have conflicting line-height on brand-logo', () => {
      const brandRule = cssContent.match(/\.brand-logo\s*{[^}]*}/);
      // Should not have line-height: 80px which causes alignment issues
      expect(brandRule[0]).not.toMatch(/line-height:\s*80px/);
    });

    test('should NOT use fixed height that causes misalignment', () => {
      const brandRule = cssContent.match(/\.brand-logo\s*{[^}]*}/);
      // Should not have height: 80px - should align naturally with social icons
      expect(brandRule[0]).not.toMatch(/height:\s*80px/);
    });

    test('icon should use inline-flex for proper alignment', () => {
      const iconRule = cssContent.match(/\.brand-logo i\s*{[^}]*}/);
      expect(iconRule[0]).toMatch(/display:\s*inline-flex/);
    });

    test('should use flexbox align-items instead of line-height for centering', () => {
      const brandRule = cssContent.match(/\.brand-logo\s*{[^}]*}/);
      expect(brandRule[0]).toMatch(/align-items:\s*center/);
    });
  });

  describe('Transition and Hover Effects', () => {
    test('should have transition on brand-logo', () => {
      const brandLogo = document.querySelector('.brand-logo');
      const styles = window.getComputedStyle(brandLogo);
      expect(styles.transition).toMatch(/all/);
    });

    test('should have hover transform effect defined', () => {
      expect(cssContent).toMatch(/\.brand-logo:hover\s*{[^}]*transform[^}]*}/);
    });

    test('should have hover opacity effect', () => {
      const hoverRule = cssContent.match(/\.brand-logo:hover\s*{[^}]*}/);
      expect(hoverRule[0]).toMatch(/opacity:\s*0\.8/);
    });
  });

  describe('Color and Typography', () => {
    test('brand-logo should inherit color', () => {
      const brandRule = cssContent.match(/\.brand-logo\s*{[^}]*}/);
      expect(brandRule[0]).toMatch(/color:\s*inherit/);
    });

    test('should have proper font-size for readability', () => {
      const brandRule = cssContent.match(/\.brand-logo\s*{[^}]*}/);
      expect(brandRule[0]).toMatch(/font-size:\s*1\.15rem/);
    });

    test('should have appropriate font-weight', () => {
      const brandRule = cssContent.match(/\.brand-logo\s*{[^}]*}/);
      expect(brandRule[0]).toMatch(/font-weight:\s*500/);
    });
  });

  describe('Integration with Navbar', () => {
    test('navbar should have fixed height of 80px', () => {
      const navbarRule = cssContent.match(/\.main-nav\s*{[^}]*height:\s*80px[^}]*}/);
      expect(navbarRule).toBeTruthy();
    });

    test('brand-logo should align naturally without fixed height', () => {
      const brandRule = cssContent.match(/\.brand-logo\s*{[^}]*}/);
      // Brand logo should not have fixed height to align with social icons
      expect(brandRule[0]).not.toMatch(/height:\s*\d+px/);
    });
  });

  describe('Accessibility', () => {
    test('brand link should have proper href', () => {
      const brandLogo = document.querySelector('.brand-logo');
      expect(brandLogo.getAttribute('href')).toBe('/');
    });

    test('icon should be decorative with aria-hidden', () => {
      const icon = document.querySelector('.brand-logo i.material-icons');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

    test('link should have descriptive aria-label', () => {
      const brandLogo = document.querySelector('.brand-logo');
      const ariaLabel = brandLogo.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel.length).toBeGreaterThan(0);
    });

    test('text content should be readable by screen readers', () => {
      const span = document.querySelector('.brand-logo span');
      expect(span.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  describe('Performance Considerations', () => {
    test('should use efficient transform for hover effect', () => {
      const hoverRule = cssContent.match(/\.brand-logo:hover\s*{[^}]*}/);
      expect(hoverRule[0]).toMatch(/transform:\s*translateX/);
    });

    test('should have transition timing function', () => {
      const brandRule = cssContent.match(/\.brand-logo\s*{[^}]*}/);
      expect(brandRule[0]).toMatch(/transition:[^;]*0\.3s/);
    });

    test('media queries should be optimized with min/max combinations', () => {
      const midRangeQuery = cssContent.match(
        /@media screen and \((min-width:\s*992px|width\s*>=\s*992px)\) and \((max-width:\s*1599px|width\s*<=\s*1599px)\)/
      );
      expect(midRangeQuery).toBeTruthy();
    });
  });

  describe('Cross-browser Compatibility', () => {
    test('should use standard flexbox properties', () => {
      expect(cssContent).toMatch(/display:\s*(inline-)?flex/);
      expect(cssContent).toMatch(/align-items:\s*center/);
      expect(cssContent).not.toMatch(/-webkit-box/); // Old flexbox syntax
    });

    test('should use modern CSS without prefixes for basic properties', () => {
      const brandRule = cssContent.match(/\.brand-logo\s*{[^}]*}/);
      expect(brandRule[0]).not.toMatch(/-moz-|^-webkit-/);
    });
  });

  describe('Specificity and Override Strategy', () => {
    test('responsive rules should use !important for overrides', () => {
      const responsiveRules = cssContent.match(
        /@media screen and \((min-width:\s*1600px|width\s*>=\s*1600px)\)[^@]*/s
      );
      expect(responsiveRules[0]).toMatch(/!important/);
    });

    test('should have at least 8 !important declarations in 900p+ breakpoint', () => {
      const rule = cssContent.match(
        /@media screen and \((min-width:\s*1600px|width\s*>=\s*1600px)\)[^@]*/s
      );
      const importantCount = (rule[0].match(/!important/g) || []).length;
      expect(importantCount).toBeGreaterThanOrEqual(8);
    });

    test('mid-range hiding should use !important', () => {
      const midRule = cssContent.match(
        /@media screen and \((min-width:\s*992px|width\s*>=\s*992px)\) and \((max-width:\s*1599px|width\s*<=\s*1599px)\)[^@]*/s
      );
      expect(midRule[0]).toMatch(/!important/);
    });
  });
});
