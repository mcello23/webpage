const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

describe('Performance Optimizations', () => {
  let $, css, headers;

  beforeAll(() => {
    // Load all files once at the start
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    css = fs.readFileSync(path.join(__dirname, '../css/materialize.css'), 'utf8');
    headers = fs.readFileSync(path.join(__dirname, '../_headers'), 'utf8');
    $ = cheerio.load(html);
  });

  it('should have preconnect for cdnjs.cloudflare.com', () => {
    const preconnect = $('link[rel="preconnect"][href="https://cdnjs.cloudflare.com"]');
    expect(preconnect.length).toBeGreaterThan(0);
  });

  it('should have fetchpriority="high" on main image', () => {
    const img = $('img[fetchpriority="high"]');
    expect(img.length).toBeGreaterThan(0);
  });

  it('should use font-display: swap in fonts', () => {
    expect(css).toMatch(/font-display:\s*swap/);
  });

  it('should use optimized WebP image', () => {
    const img = $('img[src*="DSC_9554-optimized.webp"]');
    expect(img.length).toBeGreaterThan(0);
  });

  it('should have cache headers configured', () => {
    expect(headers).toMatch(/max-age=31536000/);
  });

  it('should load non-critical CSS in a non-blocking way', () => {
    const links = $('link[rel="stylesheet"][media="print"][onload]');
    expect(links.length).toBeGreaterThan(0);
  });
});
