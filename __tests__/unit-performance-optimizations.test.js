const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

describe('Static cache', () => {
  it('should contain long cache directives for static files', () => {
    const headers = fs.readFileSync(path.join(__dirname, '../_headers'), 'utf8');
    expect(headers).toMatch(/max-age=31536000/);
    expect(headers).toMatch(/immutable/);
  });
});

describe('Non-blocking CSS', () => {
  let $;
  beforeAll(() => {
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    $ = cheerio.load(html);
  });
  it('should load non-critical CSS with media="print" and onload', () => {
    const links = $('link[rel="stylesheet"][media="print"][onload]');
    expect(links.length).toBeGreaterThan(0);
  });
});

describe('Optimized image', () => {
  let $;
  beforeAll(() => {
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    $ = cheerio.load(html);
  });
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
    const css = fs.readFileSync(path.join(__dirname, '../css/materialize.css'), 'utf8');
    expect(css).toMatch(/font-display:\s*swap/);
  });
});

describe('LCP image with fetchpriority', () => {
  let $;
  beforeAll(() => {
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    $ = cheerio.load(html);
  });
  it('should have fetchpriority="high" on main image', () => {
    const img = $('img[fetchpriority="high"]');
    expect(img.length).toBeGreaterThan(0);
  });
});

describe('Preconnect for cdnjs.cloudflare.com', () => {
  let $;
  beforeAll(() => {
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    $ = cheerio.load(html);
  });
  it('should have preconnect for cdnjs.cloudflare.com', () => {
    const preconnect = $('link[rel="preconnect"][href="https://cdnjs.cloudflare.com"]');
    expect(preconnect.length).toBeGreaterThan(0);
  });
});
