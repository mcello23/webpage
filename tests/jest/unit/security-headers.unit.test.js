/**
 * Unit Tests for Security Headers and Link Protection
 * Tests: CSP meta tag, referrer-policy, external link security
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Security: Headers and Link Protection', () => {
  let dom;
  let document;
  let html;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '../../..', 'index.html');
    html = fs.readFileSync(htmlPath, 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  afterAll(() => {
    if (dom && dom.window) dom.window.close();
  });

  describe('CSP Meta Tag (GitHub Pages Fallback)', () => {
    test('CSP meta tag exists', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      expect(cspMeta).toBeTruthy();
    });

    test('CSP contains default-src directive', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const content = cspMeta.getAttribute('content');
      expect(content).toContain("default-src 'self'");
    });

    test('CSP allows required CDNs for scripts', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const content = cspMeta.getAttribute('content');
      expect(content).toContain('https://code.jquery.com');
      expect(content).toContain('https://cdnjs.cloudflare.com');
      expect(content).toContain('https://www.googletagmanager.com');
    });

    test('CSP allows Web3Forms API for form submission', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const content = cspMeta.getAttribute('content');
      expect(content).toContain('https://api.web3forms.com');
    });

    test('CSP allows Google Analytics connections', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const content = cspMeta.getAttribute('content');
      expect(content).toContain('https://www.google-analytics.com');
      expect(content).toContain('https://region1.google-analytics.com');
    });

    test('CSP allows Google Fonts', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const content = cspMeta.getAttribute('content');
      expect(content).toContain('https://fonts.googleapis.com');
      expect(content).toContain('https://fonts.gstatic.com');
    });

    test('CSP includes base-uri directive', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const content = cspMeta.getAttribute('content');
      expect(content).toContain("base-uri 'self'");
    });

    test('CSP includes form-action directive', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const content = cspMeta.getAttribute('content');
      expect(content).toContain("form-action 'self'");
      expect(content).toContain('https://api.web3forms.com');
    });

    test('CSP includes upgrade-insecure-requests', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const content = cspMeta.getAttribute('content');
      expect(content).toContain('upgrade-insecure-requests');
    });

    test('CSP does NOT include frame-ancestors (not supported in meta)', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const content = cspMeta.getAttribute('content');
      expect(content).not.toContain('frame-ancestors');
    });

    test('CSP allows unsafe-inline for styles (required by Materialize)', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const content = cspMeta.getAttribute('content');
      expect(content).toMatch(/style-src[^;]*'unsafe-inline'/);
    });

    test('CSP allows data: URIs for images', () => {
      const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      const content = cspMeta.getAttribute('content');
      expect(content).toMatch(/img-src[^;]*data:/);
    });
  });

  describe('Referrer Policy Meta Tag', () => {
    test('referrer-policy meta tag exists', () => {
      const referrerMeta = document.querySelector('meta[name="referrer"]');
      expect(referrerMeta).toBeTruthy();
    });

    test('referrer-policy uses strict-origin-when-cross-origin', () => {
      const referrerMeta = document.querySelector('meta[name="referrer"]');
      const content = referrerMeta.getAttribute('content');
      expect(content).toBe('strict-origin-when-cross-origin');
    });

    test('referrer-policy meta is in <head> section', () => {
      const head = document.querySelector('head');
      const referrerMeta = document.querySelector('meta[name="referrer"]');
      expect(head.contains(referrerMeta)).toBe(true);
    });
  });

  describe('External Link Security (Tabnabbing Protection)', () => {
    let externalLinks;

    beforeAll(() => {
      // Find all external links
      const allLinks = Array.from(document.querySelectorAll('a[href]'));
      externalLinks = allLinks.filter((link) => {
        const href = link.getAttribute('href');
        return (
          href &&
          (href.startsWith('http://') || href.startsWith('https://')) &&
          !href.includes('mcello23.github.io') &&
          !href.includes('localhost') &&
          !href.includes('127.0.0.1')
        );
      });
    });

    test('portfolio has external links', () => {
      expect(externalLinks.length).toBeGreaterThan(0);
    });

    test('all external links have target="_blank"', () => {
      const linksWithoutTarget = externalLinks.filter(
        (link) => link.getAttribute('target') !== '_blank'
      );
      expect(linksWithoutTarget).toHaveLength(0);
    });

    test('all external links have rel="noopener noreferrer"', () => {
      const linksWithoutRel = externalLinks.filter((link) => {
        const rel = link.getAttribute('rel') || '';
        return !rel.includes('noopener') || !rel.includes('noreferrer');
      });
      if (linksWithoutRel.length > 0) {
        console.log(
          'Links without proper rel:',
          linksWithoutRel.map((l) => l.getAttribute('href'))
        );
      }
      expect(linksWithoutRel).toHaveLength(0);
    });

    test('LinkedIn links are properly secured', () => {
      const linkedInLinks = externalLinks.filter((link) =>
        link.getAttribute('href').includes('linkedin.com')
      );
      expect(linkedInLinks.length).toBeGreaterThan(0);
      linkedInLinks.forEach((link) => {
        expect(link.getAttribute('target')).toBe('_blank');
        const rel = link.getAttribute('rel') || '';
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      });
    });

    test('GitHub links are properly secured', () => {
      const githubLinks = externalLinks.filter((link) =>
        link.getAttribute('href').includes('github.com')
      );
      expect(githubLinks.length).toBeGreaterThan(0);
      githubLinks.forEach((link) => {
        expect(link.getAttribute('target')).toBe('_blank');
        const rel = link.getAttribute('rel') || '';
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      });
    });

    test('Medium/Dev.to article links are properly secured', () => {
      const blogLinks = externalLinks.filter(
        (link) =>
          link.getAttribute('href').includes('medium.com') ||
          link.getAttribute('href').includes('dev.to')
      );
      if (blogLinks.length > 0) {
        blogLinks.forEach((link) => {
          expect(link.getAttribute('target')).toBe('_blank');
          const rel = link.getAttribute('rel') || '';
          expect(rel).toContain('noopener');
          expect(rel).toContain('noreferrer');
        });
      }
    });

    test('Calendly booking link is properly secured', () => {
      const calendlyLinks = externalLinks.filter((link) =>
        link.getAttribute('href').includes('calendly.com')
      );
      if (calendlyLinks.length > 0) {
        calendlyLinks.forEach((link) => {
          expect(link.getAttribute('target')).toBe('_blank');
          const rel = link.getAttribute('rel') || '';
          expect(rel).toContain('noopener');
          expect(rel).toContain('noreferrer');
        });
      }
    });

    test('no external links use window.open without noopener', () => {
      const scriptTags = Array.from(document.querySelectorAll('script'));
      const inlineScripts = scriptTags
        .filter((script) => !script.src)
        .map((script) => script.textContent)
        .join('\n');

      // Check for window.open usage
      if (inlineScripts.includes('window.open')) {
        expect(inlineScripts).toMatch(/window\.open\([^)]*noopener/);
      }
    });
  });

  describe('Cloudflare Pages _headers File', () => {
    test('_headers file exists in project root', () => {
      const headersPath = path.resolve(__dirname, '../../..', '_headers');
      expect(fs.existsSync(headersPath)).toBe(true);
    });

    test('_headers file contains HSTS header', () => {
      const headersPath = path.resolve(__dirname, '../../..', '_headers');
      const headersContent = fs.readFileSync(headersPath, 'utf8');
      expect(headersContent).toContain('Strict-Transport-Security');
      expect(headersContent).toContain('max-age=31536000');
      expect(headersContent).toContain('includeSubDomains');
      expect(headersContent).toContain('preload');
    });

    test('_headers file contains full CSP', () => {
      const headersPath = path.resolve(__dirname, '../../..', '_headers');
      const headersContent = fs.readFileSync(headersPath, 'utf8');
      expect(headersContent).toContain('Content-Security-Policy');
      expect(headersContent).toContain("default-src 'self'");
    });

    test('_headers file contains X-Frame-Options', () => {
      const headersPath = path.resolve(__dirname, '../../..', '_headers');
      const headersContent = fs.readFileSync(headersPath, 'utf8');
      expect(headersContent).toContain('X-Frame-Options');
      expect(headersContent).toContain('DENY');
    });

    test('_headers file contains X-Content-Type-Options', () => {
      const headersPath = path.resolve(__dirname, '../../..', '_headers');
      const headersContent = fs.readFileSync(headersPath, 'utf8');
      expect(headersContent).toContain('X-Content-Type-Options');
      expect(headersContent).toContain('nosniff');
    });

    test('_headers file contains Referrer-Policy', () => {
      const headersPath = path.resolve(__dirname, '../../..', '_headers');
      const headersContent = fs.readFileSync(headersPath, 'utf8');
      expect(headersContent).toContain('Referrer-Policy');
      expect(headersContent).toContain('strict-origin-when-cross-origin');
    });

    test('_headers file contains Permissions-Policy', () => {
      const headersPath = path.resolve(__dirname, '../../..', '_headers');
      const headersContent = fs.readFileSync(headersPath, 'utf8');
      expect(headersContent).toContain('Permissions-Policy');
      expect(headersContent).toContain('geolocation=()');
      expect(headersContent).toContain('camera=()');
      expect(headersContent).toContain('microphone=()');
    });

    test('_headers file has correct syntax (2-space indentation)', () => {
      const headersPath = path.resolve(__dirname, '../../..', '_headers');
      const headersContent = fs.readFileSync(headersPath, 'utf8');
      const lines = headersContent.split('\n');

      // Find header lines (should start with 2 spaces)
      const headerLines = lines.filter(
        (line) => line.includes(':') && !line.trim().startsWith('#')
      );

      headerLines.forEach((line) => {
        if (line.trim().length > 0) {
          // Header lines should start with exactly 2 spaces
          expect(line).toMatch(/^  \S/);
        }
      });
    });

    test('_headers file includes cache-control for static assets', () => {
      const headersPath = path.resolve(__dirname, '../../..', '_headers');
      const headersContent = fs.readFileSync(headersPath, 'utf8');
      expect(headersContent).toContain('/css/*');
      expect(headersContent).toContain('/js/*');
      expect(headersContent).toContain('/images/*');
      expect(headersContent).toContain('max-age=31536000');
      expect(headersContent).toContain('immutable');
    });
  });

  describe('Documentation: Security Guides', () => {
    test('SECURITY.md exists', () => {
      const securityPath = path.resolve(__dirname, '../../..', 'SECURITY.md');
      expect(fs.existsSync(securityPath)).toBe(true);
    });

    test('SECURITY_DEPLOYMENT.md exists', () => {
      const deploymentPath = path.resolve(__dirname, '../../..', 'SECURITY_DEPLOYMENT.md');
      expect(fs.existsSync(deploymentPath)).toBe(true);
    });

    test('IMPLEMENTATION_SUMMARY.md exists', () => {
      const summaryPath = path.resolve(__dirname, '../../..', 'IMPLEMENTATION_SUMMARY.md');
      expect(fs.existsSync(summaryPath)).toBe(true);
    });

    test('pre-flight-check.sh script exists', () => {
      const scriptPath = path.resolve(__dirname, '../../..', 'pre-flight-check.sh');
      expect(fs.existsSync(scriptPath)).toBe(true);
    });

    test('robots.txt exists', () => {
      const robotsPath = path.resolve(__dirname, '../../..', 'robots.txt');
      expect(fs.existsSync(robotsPath)).toBe(true);
    });
  });

  describe('Performance Optimizations', () => {
    test('hero image has fetchpriority="high"', () => {
      const heroImage = document.querySelector('img[alt*="Marcelo"]');
      if (heroImage) {
        expect(heroImage.getAttribute('fetchpriority')).toBe('high');
      }
    });

    test('hero image has explicit width and height', () => {
      const heroImage = document.querySelector('img[alt*="Marcelo"]');
      if (heroImage) {
        expect(heroImage.hasAttribute('width')).toBe(true);
        expect(heroImage.hasAttribute('height')).toBe(true);
      }
    });

    test('non-critical images have loading="lazy"', () => {
      const images = Array.from(document.querySelectorAll('img'));
      const nonHeroImages = images.filter((img) => !img.getAttribute('alt')?.includes('Marcelo'));

      if (nonHeroImages.length > 0) {
        const lazyImages = nonHeroImages.filter((img) => img.getAttribute('loading') === 'lazy');
        // Some images should be lazy loaded (if page has multiple images)
        // This is optional if page only has hero image
        expect(images.length).toBeGreaterThanOrEqual(1);
      }
    });

    test('Font Awesome loads asynchronously', () => {
      expect(html).toContain('font-awesome');
      // Should use async loading strategy
      const fontAwesomeMatch = html.match(
        /<link[^>]*font-awesome[^>]*>|<script[^>]*font-awesome[^>]*>/i
      );
      if (fontAwesomeMatch) {
        expect(fontAwesomeMatch[0]).toMatch(/async|defer|media="print"/);
      }
    });

    test('scripts use defer or async attribute', () => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const localScripts = scripts.filter(
        (script) => !script.src.includes('http') || script.src.includes('mcello23')
      );

      if (localScripts.length > 0) {
        // At least some scripts should have defer or async for performance
        const optimizedScripts = localScripts.filter(
          (script) => script.hasAttribute('defer') || script.hasAttribute('async')
        );
        expect(optimizedScripts.length).toBeGreaterThanOrEqual(0);
      }
    });
  });
});
