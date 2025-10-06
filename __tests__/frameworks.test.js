const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Helper function to extract text without icons
const getTextWithoutIcons = (element) => {
  const icon = element.querySelector('i');
  let txt = element.textContent.trim();
  if (icon) {
    const iconText = icon.textContent.trim();
    txt = txt.replace(iconText, '').trim();
  }
  return txt;
};

describe('Frameworks Page', () => {
  let dom;
  let document;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '..', 'pages', 'frameworks.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  describe('Navigation Bar', () => {
    test('has a fixed nav at the top', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.classList.contains('main-nav')).toBe(true);
    });

    test('has brand logo with link to index', () => {
      const brand = document.querySelector('a.brand-logo');
      expect(brand).toBeTruthy();
      expect(brand.getAttribute('href')).toBe('../index.html');
      expect(brand.textContent).toContain('Marcelo Costa - SDET Portfolio');
    });

    test('center nav has three main buttons', () => {
      const centerNav = document.querySelector('ul.center-nav');
      expect(centerNav).toBeTruthy();
      const buttons = centerNav.querySelectorAll('a.nav-btn');
      expect(buttons.length).toBe(3);
      const labels = Array.from(buttons).map(getTextWithoutIcons);
      expect(labels).toEqual(
        expect.arrayContaining(['Frameworks', 'Side Projects', 'Certificates'])
      );
    });

    test('navigation buttons have correct hrefs', () => {
      const buttons = document.querySelectorAll('a.nav-btn');
      const hrefs = Array.from(buttons).map((btn) => btn.getAttribute('href'));
      expect(hrefs).toContain('side_proj.html');
      expect(hrefs).toContain('frameworks.html');
      expect(hrefs).toContain('#');
    });

    test('social icons exist on the right', () => {
      const socials = document.querySelectorAll('ul.social-nav .social-icon');
      expect(socials.length).toBeGreaterThanOrEqual(3);
      const hrefs = Array.from(socials).map((a) => a.getAttribute('href'));
      expect(hrefs).toEqual(
        expect.arrayContaining([
          'https://github.com/mcello23',
          'https://www.linkedin.com/in/marceloc/',
        ])
      );
    });

    test('social icons have proper aria labels', () => {
      const githubLink = document.querySelector('[aria-label="github-link"]');
      const linkedinLink = document.querySelector('[aria-label="linkedin-link"]');
      const discordLink = document.querySelector('[aria-label="discord-link"]');

      expect(githubLink).toBeTruthy();
      expect(linkedinLink).toBeTruthy();
      expect(discordLink).toBeTruthy();
    });

    test('has Font Awesome icons for social links', () => {
      const githubIcon = document.querySelector('.fa-github');
      const linkedinIcon = document.querySelector('.fa-linkedin');
      const discordIcon = document.querySelector('.fa-discord');

      expect(githubIcon).toBeTruthy();
      expect(linkedinIcon).toBeTruthy();
      expect(discordIcon).toBeTruthy();
    });
  });

  describe('Page Structure', () => {
    test('has proper HTML structure', () => {
      const html = document.querySelector('html');
      const head = document.querySelector('head');
      const body = document.querySelector('body');

      expect(html).toBeTruthy();
      expect(head).toBeTruthy();
      expect(body).toBeTruthy();
      expect(html.getAttribute('lang')).toBe('en');
    });

    test('has correct meta tags', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    test('has correct title', () => {
      const title = document.querySelector('title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('Marcelo Costa - SDET Portfolio');
    });

    test('loads required CSS files', () => {
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      expect(cssLinks.length).toBeGreaterThan(0);

      const hrefs = Array.from(cssLinks).map((link) => link.getAttribute('href'));
      // frameworks.html is in pages/ folder, so uses ../ paths
      expect(hrefs).toContain('../css/materialize.css');
      expect(hrefs).toContain('../css/style.css');
    });

    test('has Material Icons link', () => {
      const materialIcons = document.querySelector('link[href*="Material+Icons"]');
      expect(materialIcons).toBeTruthy();
    });

    test('has Font Awesome link', () => {
      const fontAwesome = document.querySelector('link[href*="font-awesome"]');
      expect(fontAwesome).toBeTruthy();
    });
  });

  describe('Main Content', () => {
    test('has main heading', () => {
      const heading = document.querySelector('h2.header');
      expect(heading).toBeTruthy();
      expect(heading.textContent).toContain('Testing Frameworks');
    });

    test('has parallax containers', () => {
      const parallaxContainers = document.querySelectorAll('.parallax-container');
      expect(parallaxContainers.length).toBeGreaterThan(0);
    });

    test('has gradient cards', () => {
      const gradientCards = document.querySelectorAll('.gradient-card');
      expect(gradientCards.length).toBeGreaterThan(0);
    });

    test('has repository links', () => {
      const repoLinks = document.querySelectorAll('a[href*="github.com/mcello23"]');
      expect(repoLinks.length).toBeGreaterThan(0);
    });

    test('has code examples with Prism', () => {
      const codeBlocks = document.querySelectorAll('code[class*="language-"]');
      expect(codeBlocks.length).toBeGreaterThan(0);
    });
  });

  describe('Footer', () => {
    test('has professional footer', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Thank you');
      expect(pageText).toContain('© 2025 Marcelo Costa');
    });

    test('footer does not have emojis', () => {
      const footerText = document.body.textContent;
      expect(footerText).not.toMatch(/Thanks for.*☺/);
      expect(footerText).not.toMatch(/🎯/);
    });

    test('footer has contact button', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain("Let's Connect");
    });
  });

  describe('Scripts', () => {
    test('loads jQuery', () => {
      const jqueryScript = document.querySelector('script[src*="jquery"]');
      expect(jqueryScript).toBeTruthy();
    });

    test('loads Materialize JS', () => {
      const materializeScript = document.querySelector('script[src*="materialize"]');
      expect(materializeScript).toBeTruthy();
    });

    test('loads Prism JS for syntax highlighting', () => {
      const prismScript = document.querySelector('script[src*="prism"]');
      expect(prismScript).toBeTruthy();
    });

    test('loads certificates.js for modern certificate modal', () => {
      const certScript = document.querySelector('script[src*="certificates.js"]');
      expect(certScript).toBeTruthy();
    });
  });

  describe('Certificate Modal', () => {
    test('has modern certificate modal container', () => {
      const modal = document.querySelector('#certificateModal.cert-modal');
      expect(modal).toBeTruthy();
    });

    test('certificate modal loads certificates.css stylesheet', () => {
      const certStyles = document.querySelector('link[href*="certificates.css"]');
      expect(certStyles).toBeTruthy();
    });
  });

  describe('Animations & Styles', () => {
    test('has keyframe animations defined', () => {
      const styles = document.querySelectorAll('style');
      const styleContent = Array.from(styles)
        .map((s) => s.textContent)
        .join('');

      expect(styleContent).toContain('@keyframes');
      expect(styleContent).toContain('float');
      expect(styleContent).toContain('pulse');
    });

    test('has gradient card styles', () => {
      const styles = document.querySelectorAll('style');
      const styleContent = Array.from(styles)
        .map((s) => s.textContent)
        .join('');

      expect(styleContent).toContain('.gradient-card');
      expect(styleContent).toContain('linear-gradient');
    });
  });
});
