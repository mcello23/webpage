/**
 * Tests for test-brand.html and test-modal.html
 * Validates test utility pages
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

describe('Test Utility Pages', () => {
  describe('test-brand.html', () => {
    let $;
    let html;

    beforeAll(() => {
      html = fs.readFileSync(path.join(__dirname, '../pages/test-brand.html'), 'utf8');
      $ = cheerio.load(html);
    });

    test('file exists and is valid HTML', () => {
      expect(html).toBeTruthy();
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html');
      expect(html).toContain('</html>');
    });

    test('has proper HTML structure', () => {
      expect($('html').length).toBe(1);
      expect($('head').length).toBe(1);
      expect($('body').length).toBe(1);
    });

    test('has HTML head section', () => {
      expect($('head').length).toBe(1);
      expect($('head style').length).toBeGreaterThan(0);
    });

    test('has descriptive heading', () => {
      const h1 = $('h1').text();
      expect(h1).toContain('Responsive Text Test');
      expect(h1).toContain('900p');
    });

    test('contains brand logo element', () => {
      const brandLogo = $('.brand-logo');
      expect(brandLogo.length).toBeGreaterThan(0);
    });

    test('brand logo has icon and text span', () => {
      const brandLogo = $('.brand-logo');
      expect(brandLogo.find('i').length).toBeGreaterThan(0);
      expect(brandLogo.find('span').length).toBeGreaterThan(0);
    });

    test('contains CTA link element', () => {
      const ctaLink = $('.cta-link');
      expect(ctaLink.length).toBeGreaterThan(0);
    });

    test('CTA link has book-call class', () => {
      const bookCall = $('.cta-link.book-call');
      expect(bookCall.length).toBeGreaterThan(0);
    });

    test('has responsive media queries', () => {
      expect(html).toContain('@media screen');
      expect(html).toContain('min-width: 992px');
      expect(html).toContain('max-width: 1599px');
      expect(html).toContain('min-width: 1600px');
    });

    test('media query hides text at specific breakpoints', () => {
      expect(html).toContain('display: none !important');
    });

    test('media query shows text at desktop breakpoint', () => {
      expect(html).toContain('display: inline !important');
    });

    test('has width display script', () => {
      expect(html).toContain("getElementById('width')");
      expect(html).toContain('window.innerWidth');
    });

    test('updates width on resize', () => {
      expect(html).toContain("addEventListener('resize'");
    });

    test('has expected behavior documentation', () => {
      expect(html).toContain('Expected behavior');
    });

    test('documents mobile, tablet, and desktop behaviors', () => {
      expect(html).toContain('992px');
      expect(html).toContain('1599px');
      expect(html).toContain('1600px');
    });

    test('uses semantic HTML', () => {
      expect($('h1').length).toBeGreaterThan(0);
      expect($('h3').length).toBeGreaterThan(0);
      expect($('ul').length).toBeGreaterThan(0);
      expect($('li').length).toBeGreaterThan(0);
    });

    test('displays current window width', () => {
      expect(html).toContain('Current window width');
      expect(html).toContain('<span id="width">');
    });

    test('tests both brand logo and book call link', () => {
      expect(html).toContain('Brand Logo:');
      expect(html).toContain('Book Call Link:');
    });

    test('uses visual indicators (colors)', () => {
      expect(html).toContain('background: red');
      expect(html).toContain('background: green');
    });
  });

  describe('test-modal.html', () => {
    let $;
    let html;

    beforeAll(() => {
      html = fs.readFileSync(path.join(__dirname, '../pages/test-modal.html'), 'utf8');
      $ = cheerio.load(html);
    });

    test('file exists and is valid HTML', () => {
      expect(html).toBeTruthy();
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html lang="en">');
    });

    test('has proper HTML5 structure', () => {
      expect($('html').length).toBe(1);
      expect($('html').attr('lang')).toBe('en');
      expect($('head').length).toBe(1);
      expect($('body').length).toBe(1);
    });

    test('has descriptive title', () => {
      const title = $('title').text();
      expect(title).toBe('Certificate Modal Test');
    });

    test('includes required CSS files', () => {
      const cssLinks = $('link[rel="stylesheet"]');
      expect(cssLinks.length).toBeGreaterThan(0);

      const hrefs = cssLinks.map((i, el) => $(el).attr('href')).get();
      expect(hrefs.some((href) => href && href.includes('certificates.css'))).toBe(true);
    });

    test('includes Material Icons', () => {
      const materialIcons = $('link[href*="Material+Icons"]');
      expect(materialIcons.length).toBe(1);
    });

    test('includes Font Awesome', () => {
      const fontAwesome = $('link[href*="font-awesome"]');
      expect(fontAwesome.length).toBe(1);
    });

    test('has certificate modal container', () => {
      const modalContainer = $('#certificateModal');
      expect(modalContainer.length).toBe(1);
      expect(modalContainer.hasClass('cert-modal')).toBe(true);
    });

    test('loads certificates.js script', () => {
      const scripts = $('script[src]');
      const src = scripts.map((i, el) => $(el).attr('src')).get();
      expect(src.some((s) => s && s.includes('certificates.js'))).toBe(true);
    });

    test('has multiple test buttons', () => {
      const testButtons = $('.test-btn');
      expect(testButtons.length).toBeGreaterThan(2);
    });

    test('test buttons have onclick handlers', () => {
      const button1 = $('.test-btn').first();
      expect(button1.attr('onclick')).toBeTruthy();
    });

    test('has DOMContentLoaded event listener', () => {
      expect(html).toContain("addEventListener('DOMContentLoaded'");
    });

    test('tests different modal opening methods', () => {
      expect(html).toContain('Open Modal (Method 1)');
      expect(html).toContain('Open Modal (Method 2)');
      expect(html).toContain('Open Modal (Method 3');
    });

    test('uses window.certificateModal reference', () => {
      expect(html).toContain('window.certificateModal');
      expect(html).toContain('.open()');
    });

    test('references openCertificateModal in onclick', () => {
      expect(html).toContain('openCertificateModal()');
    });

    test('includes console logging for debugging', () => {
      expect(html).toContain('console.log');
    });

    test('has dark theme styling', () => {
      expect(html).toContain('background: #1e1e1e');
      expect(html).toContain('color: white');
    });

    test('has gradient button styling', () => {
      expect(html).toContain('linear-gradient');
      expect(html).toContain('#667eea');
      expect(html).toContain('#764ba2');
    });

    test('buttons have hover effects', () => {
      expect(html).toContain(':hover');
      expect(html).toContain('transform: translateY');
    });

    test('has descriptive heading', () => {
      const h1 = $('h1').text();
      expect(h1).toContain('Certificate Modal Test');
    });

    test('includes instructions for user', () => {
      const paragraph = $('p').first().text();
      expect(paragraph).toContain('Click the button');
    });

    test('handles modal not initialized case', () => {
      expect(html).toContain('Modal not initialized yet');
    });

    test('uses proper button semantics', () => {
      expect($('button.test-btn').length).toBe(3);
    });

    test('buttons have proper event listeners', () => {
      expect(html).toContain("getElementById('testBtn3')");
      expect(html).toContain("addEventListener('click'");
    });
  });

  describe('Test Pages Integration', () => {
    test('both test pages exist in pages folder', () => {
      const brandPath = path.join(__dirname, '../pages/test-brand.html');
      const modalPath = path.join(__dirname, '../pages/test-modal.html');

      expect(fs.existsSync(brandPath)).toBe(true);
      expect(fs.existsSync(modalPath)).toBe(true);
    });

    test('modal page uses relative paths to parent directory', () => {
      const modalHtml = fs.readFileSync(path.join(__dirname, '../pages/test-modal.html'), 'utf8');

      expect(modalHtml).toContain('../css/certificates.css');
      expect(modalHtml).toContain('../js/certificates.js');
    });

    test('test pages are for development/testing purposes', () => {
      const modalHtml = fs.readFileSync(path.join(__dirname, '../pages/test-modal.html'), 'utf8');

      expect(modalHtml).toContain('Test');
    });
  });
});
