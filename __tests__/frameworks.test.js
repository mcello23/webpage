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
      expect(brand.textContent).toContain('Marcelo Costa — SDET');
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
      expect(socials.length).toBeGreaterThanOrEqual(2); // GitHub and LinkedIn
      const hrefs = Array.from(socials).map((a) => a.getAttribute('href'));
      expect(hrefs).toEqual(
        expect.arrayContaining([
          'https://github.com/mcello23',
          'https://www.linkedin.com/in/marceloc/',
        ])
      );
    });

    test('social icons have proper aria labels', () => {
      const githubLink = document.querySelector('[aria-label="GitHub"]');
      const linkedinLink = document.querySelector('[aria-label="LinkedIn"]');

      expect(githubLink).toBeTruthy();
      expect(linkedinLink).toBeTruthy();
      // Discord removed in navbar update
    });

    test('has Font Awesome icons for social links', () => {
      const githubIcon = document.querySelector('.fa-github');
      const linkedinIcon = document.querySelector('.fa-linkedin');

      expect(githubIcon).toBeTruthy();
      expect(linkedinIcon).toBeTruthy();
      // Discord icon removed in navbar update
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

    test('has framework sections with cards', () => {
      const cards = document.querySelectorAll('.card');
      expect(cards.length).toBeGreaterThan(0);
    });

    test('has repository links', () => {
      const repoLinks = document.querySelectorAll('a[href*="github.com/mcello23"]');
      expect(repoLinks.length).toBeGreaterThan(0);
    });

    test('has testing methodology sections', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Performance Testing');
      expect(pageText).toContain('Load Testing');
      expect(pageText).toContain('Unit Testing');
      expect(pageText).toContain('AI/LLM Testing');
    });
  });

  describe('Footer', () => {
    test('has professional footer', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Thanks for exploring');
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

    test('has gradient backgrounds for sections', () => {
      const styles = document.querySelectorAll('style');
      const styleContent = Array.from(styles)
        .map((s) => s.textContent)
        .join('');

      expect(styleContent).toContain('linear-gradient');
    });
  });

  describe('Refactored Framework Sections', () => {
    test('Identity Verification Platform section exists', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Identity Verification Platform');
      expect(pageText).toContain('Enterprise-Grade E2E Testing with TypeScript');
    });

    test('Identity Verification has cyan color theme', () => {
      const pageText = document.body.innerHTML;
      expect(pageText).toMatch(/cyan/i);
    });

    test('Identity Verification has Test Data Factory Pattern section', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Test Data Factory Pattern');
      expect(pageText).toContain('Dynamic Generation');
      expect(pageText).toContain('API-First Testing');
      expect(pageText).toContain('UI Validation');
    });

    test('KYB Platform Automation section exists', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('KYB Platform Automation');
      expect(pageText).toContain('Behavior-Driven Development');
    });

    test('KYB Platform has multi-color capability groups', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Documents');
      expect(pageText).toContain('User Mgmt');
      expect(pageText).toContain('Regulatory');
      expect(pageText).toContain('Comms');
      expect(pageText).toContain('Financial');
    });

    test('KYB Platform has BDD Pattern section', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Behavior-Driven Development Pattern');
      expect(pageText).toContain('Gherkin Syntax');
      expect(pageText).toContain('Real-Time Tests');
      expect(pageText).toContain('Complex Workflows');
      expect(pageText).toContain('Living Docs');
    });

    test('Enterprise Builder Platform section exists', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Enterprise Builder Platform');
      expect(pageText).toContain('Advanced CI/CD');
    });

    test('Enterprise Builder has CI/CD Pipeline Integration', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('CI/CD Pipeline Integration');
      expect(pageText).toContain('Matrix Testing');
      expect(pageText).toContain('Multi-Environment');
      expect(pageText).toContain('Auto Triggers');
      expect(pageText).toContain('Matrix Builds');
    });
  });

  describe('Advanced Testing Methodologies Section', () => {
    test('section header exists with correct title', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Advanced Testing Methodologies');
      expect(pageText).toContain('Performance, Load, Unit & AI/LLM Testing');
    });

    test('has Performance Testing subsection', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Performance Testing');
      expect(pageText).toContain('Lighthouse CI');
      expect(pageText).toContain('Core Web Vitals');
      expect(pageText).toContain('Response time analysis');
      expect(pageText).toContain('Memory & CPU profiling');
    });

    test('has Load Testing subsection with K6', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Load Testing');
      expect(pageText).toContain('K6');
      expect(pageText).toContain('JavaScript-based');
      expect(pageText).toContain('cloud scalable');
      expect(pageText).toContain('Concurrent user simulation');
      expect(pageText).toContain('Traffic surge testing');
    });

    test('has Unit Testing subsection', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Unit Testing');
      expect(pageText).toContain('Jest/Vitest');
      expect(pageText).toContain('Component testing');
      expect(pageText).toContain('80%+ code coverage');
      expect(pageText).toContain('Test doubles, stubs');
    });

    test('has AI/LLM Testing subsection', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('AI/LLM Testing');
      expect(pageText).toContain('Non-deterministic');
      expect(pageText).toContain('Prompt validation');
      expect(pageText).toContain('Hallucination');
      expect(pageText).toContain('Output verification');
      expect(pageText).toContain('Safety & bias testing');
    });

    test('testing methodologies have proper icon spacing', () => {
      const html = document.body.innerHTML;
      // Check that icons have margin-right for proper spacing
      const iconPattern = /margin-right:\s*6px/;
      expect(html).toMatch(iconPattern);
    });

    test('each testing type has distinct gradient background', () => {
      const html = document.body.innerHTML;
      expect(html).toMatch(/fff3e0.*ffcc80/); // Orange gradient for Performance
      expect(html).toMatch(/e0f2f1.*80cbc4/); // Teal gradient for Load
      expect(html).toMatch(/e8eaf6.*9fa8da/); // Indigo gradient for Unit
      expect(html).toMatch(/f3e5f5.*ce93d8/); // Purple gradient for AI/LLM
    });

    test('testing containers have proper separation', () => {
      const html = document.body.innerHTML;
      // Check for margin-bottom separation
      expect(html).toMatch(/margin-bottom:\s*30px/);
    });

    test('testing containers have hover effects on desktop', () => {
      const styles = document.querySelectorAll('style');
      const styleContent = Array.from(styles)
        .map((s) => s.textContent)
        .join('');

      expect(styleContent).toMatch(/@media.*min-width:\s*993px/);
      expect(styleContent).toMatch(/hover/);
      expect(styleContent).toMatch(/transform.*translateY/);
    });
  });

  describe('Color-Coded Capability Groups', () => {
    test('KYB Platform has green-themed business logic', () => {
      const html = document.body.innerHTML;
      expect(html).toMatch(/#4caf50/i); // Green color
    });

    test('KYB Platform has cyan-themed integration', () => {
      const html = document.body.innerHTML;
      expect(html).toMatch(/#00bcd4/i); // Cyan color
    });

    test('KYB Platform has purple-themed infrastructure', () => {
      const html = document.body.innerHTML;
      expect(html).toMatch(/#9c27b0/i); // Purple color
    });

    test('KYB Platform has orange-themed monitoring', () => {
      const html = document.body.innerHTML;
      expect(html).toMatch(/#ff9800/i); // Orange color
    });
  });

  describe('Repository Links and CTAs', () => {
    test('has link to Playwright demonstration', () => {
      const links = Array.from(document.querySelectorAll('a')).map((a) => a.getAttribute('href'));
      expect(links).toContain('https://github.com/mcello23/playwright-demonstration');
    });

    test('has link to Cypress automation project', () => {
      const links = Array.from(document.querySelectorAll('a')).map((a) => a.getAttribute('href'));
      expect(links).toContain('https://github.com/mcello23/cypress-automation-real-proj');
    });

    test('has link to Cypress demonstration repo', () => {
      const links = Array.from(document.querySelectorAll('a')).map((a) => a.getAttribute('href'));
      expect(links).toContain('https://github.com/mcello23/cypress-demonstration-repo');
    });

    test('CTA buttons have proper styling', () => {
      const buttons = document.querySelectorAll('a.btn-large');
      expect(buttons.length).toBeGreaterThan(0);

      buttons.forEach((btn) => {
        const text = btn.textContent;
        expect(text.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Responsive Design', () => {
    test('sections use responsive grid classes', () => {
      const cols = document.querySelectorAll('[class*="col"]');
      expect(cols.length).toBeGreaterThan(0);
    });

    test('has container elements for proper layout', () => {
      const containers = document.querySelectorAll('.container');
      expect(containers.length).toBeGreaterThan(0);
    });

    test('has responsive column classes (s12, m6, l3)', () => {
      const html = document.body.innerHTML;
      expect(html).toMatch(/col\s+s12/);
      expect(html).toMatch(/m6/);
      expect(html).toMatch(/l3/);
    });
  });

  describe('Accessibility', () => {
    test('buttons have descriptive text', () => {
      const buttons = document.querySelectorAll('a.btn-large');
      buttons.forEach((btn) => {
        expect(btn.textContent.trim().length).toBeGreaterThan(0);
      });
    });

    test('icons have proper Material Icons classes', () => {
      const icons = document.querySelectorAll('i.material-icons');
      expect(icons.length).toBeGreaterThan(0);
    });

    test('sections have semantic headings', () => {
      const h3s = document.querySelectorAll('h3');
      const h4s = document.querySelectorAll('h4');
      const h5s = document.querySelectorAll('h5');

      expect(h3s.length + h4s.length + h5s.length).toBeGreaterThan(0);
    });
  });

  describe('Performance Optimizations', () => {
    test('uses box-shadow for visual depth', () => {
      const html = document.body.innerHTML;
      expect(html).toMatch(/box-shadow/i);
    });

    test('uses border-radius for modern appearance', () => {
      const html = document.body.innerHTML;
      expect(html).toMatch(/border-radius/i);
    });

    test('has transition effects for smooth animations', () => {
      const html = document.body.innerHTML;
      expect(html).toMatch(/transition/i);
    });
  });
});
