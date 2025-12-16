const fs = require('fs');
const path = require('path');

describe('Static Assets & Configuration', () => {
  describe('index.html Favicons', () => {
    let html;

    beforeAll(() => {
      html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    });

    test('has apple-touch-icon', () => {
      expect(html).toMatch(
        /<link[^>]*rel="apple-touch-icon"[^>]*sizes="180x180"[^>]*href="\/favicon\/apple-touch-icon\.png"[^>]*>/
      );
    });

    test('has 32x32 PNG favicon', () => {
      expect(html).toMatch(
        /<link[^>]*rel="icon"[^>]*type="image\/png"[^>]*sizes="32x32"[^>]*href="\/favicon\/favicon-32x32\.png"[^>]*>/
      );
    });

    test('has 16x16 PNG favicon', () => {
      expect(html).toMatch(
        /<link[^>]*rel="icon"[^>]*type="image\/png"[^>]*sizes="16x16"[^>]*href="\/favicon\/favicon-16x16\.png"[^>]*>/
      );
    });

    test('has webmanifest', () => {
      expect(html).toMatch(
        /<link[^>]*rel="manifest"[^>]*href="\/favicon\/site\.webmanifest"[^>]*>/
      );
    });
  });

  describe('Performance Optimizations', () => {
    let html;

    beforeAll(() => {
      html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    });

    test('has preconnect for cdnjs', () => {
      expect(html).toMatch(
        /<link[^>]*rel="preconnect"[^>]*href="https:\/\/cdnjs\.cloudflare\.com"[^>]*>/
      );
    });

    test('has CSP meta tag', () => {
      expect(html).toMatch(/<meta[^>]*http-equiv="Content-Security-Policy"[^>]*>/);
    });

    test('loads non-critical CSS in a non-blocking way', () => {
      expect(html).toMatch(
        /<link[^>]*rel="stylesheet"[^>]*media="print"[^>]*onload="this\.media='all'"[^>]*>/
      );
    });
  });

  describe('CSS Variables', () => {
    let cssContent;

    beforeAll(() => {
      cssContent = fs.readFileSync(path.resolve(__dirname, 'index.css'), 'utf8');
    });

    test('defines core theme colors', () => {
      expect(cssContent).toContain('--brand-1:');
      expect(cssContent).toContain('--brand-2:');
      expect(cssContent).toContain('--ink:');
      expect(cssContent).toContain('--muted:');
    });
  });
});
