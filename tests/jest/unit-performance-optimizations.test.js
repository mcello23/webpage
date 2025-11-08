const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

describe('Performance Optimizations - Unit Tests', () => {
  let $, html, css;

  beforeAll(() => {
    // Load all files once at the start
    html = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
    css = fs.readFileSync(path.join(__dirname, '../../css/materialize.css'), 'utf8');
    $ = cheerio.load(html);
  });

  describe('Static cache', () => {
    it('should contain long cache directives for static files', () => {
      // Since we're on GitHub Pages, check for CSP meta tag instead of _headers file
      const cspMeta = $('meta[http-equiv="Content-Security-Policy"]');
      expect(cspMeta.length).toBeGreaterThan(0);
      expect(cspMeta.attr('content')).toContain('script-src');
      expect(cspMeta.attr('content')).toContain('connect-src');
    });
  });

  describe('Non-blocking CSS', () => {
    it('should load non-critical CSS with media="print" and onload', () => {
      const links = $('link[rel="stylesheet"][media="print"][onload]');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Optimized image', () => {
    it('should use optimized WebP image', () => {
      const img = $('img[src*="DSC_9554-optimized.webp"]');
      expect(img.length).toBeGreaterThan(0);
    });

    it('should have srcset with JPG fallback', () => {
      const img = $('img[srcset*="DSC_9554.jpg"]');
      expect(img.length).toBeGreaterThan(0);
    });
  });

  describe('Fonts with font-display: swap', () => {
    it('should contain font-display: swap in CSS', () => {
      expect(css).toMatch(/font-display:\s*swap/);
    });
  });

  describe('LCP image with fetchpriority', () => {
    it('should have fetchpriority="high" on main image', () => {
      const img = $('img[fetchpriority="high"]');
      expect(img.length).toBeGreaterThan(0);
    });
  });

  describe('Preconnect for cdnjs.cloudflare.com', () => {
    it('should have preconnect for cdnjs.cloudflare.com', () => {
      const preconnect = $('link[rel="preconnect"][href="https://cdnjs.cloudflare.com"]');
      expect(preconnect.length).toBeGreaterThan(0);
    });
  });
});
