/**
 * Comprehensive Link Validation Test Suite
 *
 * Tests all href links across all HTML pages including:
 * - index.html
 * - pages/frameworks.html
 * - pages/side_proj.html
 * - pages/responsive-tester.html
 * - pages/test-modal.html
 * - pages/test-brand.html
 * - Certificate modal links
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('All Pages - Link Validation', () => {
  describe('index.html - Navigation Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('brand logo should link to index.html', () => {
      const brandLogo = document.querySelector('.brand-logo');
      expect(brandLogo.getAttribute('href')).toBe('index.html');
    });

    test('mobile home link should link to index.html', () => {
      const mobileHomeLink = document.querySelector('.mobile-home-link a[href="index.html"]');
      expect(mobileHomeLink).toBeTruthy();
      expect(mobileHomeLink.getAttribute('href')).toBe('index.html');
    });

    test('projects nav button should link to side_proj.html', () => {
      const projectsLink = document.querySelector('.nav-btn-projects');
      expect(projectsLink.getAttribute('href')).toBe('pages/side_proj.html');
    });

    test('frameworks nav button should link to frameworks.html', () => {
      const frameworksLink = document.querySelector('.nav-btn-frameworks');
      expect(frameworksLink.getAttribute('href')).toBe('pages/frameworks.html');
    });

    test('certificates button should have # anchor', () => {
      const certsLink = document.querySelector('a[href="#"]');
      expect(certsLink).toBeTruthy();
      expect(certsLink.textContent).toContain('Certificates');
    });
  });

  describe('index.html - Social & External Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('Calendly booking link should be correct', () => {
      const calendlyLinks = Array.from(document.querySelectorAll('a[href*="calendly"]'));
      expect(calendlyLinks.length).toBeGreaterThan(0);
      calendlyLinks.forEach((link) => {
        expect(link.getAttribute('href')).toContain('calendly.com/marceloadsc/30min');
      });
    });

    test('GitHub social link should be correct', () => {
      const githubLink = document.querySelector('a[aria-label="GitHub"]');
      expect(githubLink).toBeTruthy();
      expect(githubLink.getAttribute('href')).toBe('https://github.com/mcello23');
    });

    test('LinkedIn social link should be correct', () => {
      const linkedinLinks = Array.from(
        document.querySelectorAll('a[aria-label="LinkedIn"], a[href*="linkedin.com/in/marceloc"]')
      );
      expect(linkedinLinks.length).toBeGreaterThan(0);
      linkedinLinks.forEach((link) => {
        expect(link.getAttribute('href')).toContain('linkedin.com/in/marceloc');
      });
    });

    test('contact anchor link should be correct', () => {
      const contactLink = document.querySelector('a[href="#contact"]');
      expect(contactLink).toBeTruthy();
    });
  });

  describe('index.html - Project Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('Cypress demonstration repo link should be correct', () => {
      const cypressLink = document.querySelector(
        'a[href="https://github.com/mcello23/cypress-demonstration-repo"]'
      );
      expect(cypressLink).toBeTruthy();
    });

    test('Playwright demonstration link should be correct', () => {
      const playwrightLink = document.querySelector(
        'a[href="https://github.com/mcello23/playwright-demonstration"]'
      );
      expect(playwrightLink).toBeTruthy();
    });

    test('Cypress automation real project link should be correct', () => {
      const cypressRealLink = document.querySelector(
        'a[href="https://github.com/mcello23/cypress-automation-real-proj"]'
      );
      expect(cypressRealLink).toBeTruthy();
    });
  });

  describe('index.html - Article Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('Hasura GraphQL Medium article link should be correct', () => {
      const hasuraLink = document.querySelector(
        'a[href*="how-to-integrate-hasura-graphql-hooks-into-your-e2e-tests-with-cypress"]'
      );
      expect(hasuraLink).toBeTruthy();
      expect(hasuraLink.getAttribute('href')).toContain('medium.com');
    });

    test('Auth0 LinkedIn article link should be correct', () => {
      const auth0Link = document.querySelector(
        'a[href*="speeding-un-cypress-tests-auth0-login-across-specs"]'
      );
      expect(auth0Link).toBeTruthy();
      expect(auth0Link.getAttribute('href')).toContain('linkedin.com/pulse');
    });

    test('Medium profile link should be correct', () => {
      const mediumLink = document.querySelector('a[href="https://medium.com/@marcelocosta_72783"]');
      expect(mediumLink).toBeTruthy();
    });
  });

  describe('index.html - Resource Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('Material Icons font link should be present', () => {
      const materialLink = Array.from(document.querySelectorAll('link')).find(
        (link) => link.href && link.href.includes('Material+Icons')
      );
      expect(materialLink).toBeTruthy();
    });

    test('Font Awesome CDN link should be present', () => {
      const faLink = Array.from(document.querySelectorAll('link')).find(
        (link) => link.href && link.href.includes('font-awesome')
      );
      expect(faLink).toBeTruthy();
    });

    test('favicon links should be present', () => {
      const favicon32 = document.querySelector('link[href="favicon/favicon-32x32.png"]');
      const favicon16 = document.querySelector('link[href="favicon/favicon-16x16.png"]');
      const faviconSvg = document.querySelector('link[href="favicon.svg"]');

      expect(favicon32).toBeTruthy();
      expect(favicon16).toBeTruthy();
      expect(faviconSvg).toBeTruthy();
    });

    test('canonical link should point to GitHub Pages', () => {
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical).toBeTruthy();
      expect(canonical.getAttribute('href')).toBe('https://mcello23.github.io/webpage/');
    });
  });

  describe('pages/frameworks.html - Navigation Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/frameworks.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('brand logo should link back to index', () => {
      const brandLogo = document.querySelector('.brand-logo');
      expect(brandLogo.getAttribute('href')).toBe('../index.html');
    });

    test('mobile home link should link to index', () => {
      const mobileHomeLink = document.querySelector('.mobile-home-link a[href="../index.html"]');
      expect(mobileHomeLink).toBeTruthy();
    });

    test('projects link should go to side_proj.html', () => {
      const projectsLink = document.querySelector('a[href="side_proj.html"]');
      expect(projectsLink).toBeTruthy();
    });

    test('frameworks link should be self-referential', () => {
      const frameworksLink = document.querySelector('a[href="frameworks.html"]');
      expect(frameworksLink).toBeTruthy();
    });
  });

  describe('pages/frameworks.html - Project Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/frameworks.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('Playwright demonstration link should be correct', () => {
      const playwrightLink = document.querySelector(
        'a[href="https://github.com/mcello23/playwright-demonstration"]'
      );
      expect(playwrightLink).toBeTruthy();
    });

    test('Cypress automation real project link should be correct', () => {
      const cypressLink = document.querySelector(
        'a[href="https://github.com/mcello23/cypress-automation-real-proj"]'
      );
      expect(cypressLink).toBeTruthy();
    });

    test('Cypress demonstration repo link should be correct', () => {
      const cypressDemoLink = document.querySelector(
        'a[href="https://github.com/mcello23/cypress-demonstration-repo"]'
      );
      expect(cypressDemoLink).toBeTruthy();
    });
  });

  describe('pages/frameworks.html - External Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/frameworks.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('should have Calendly booking links', () => {
      const calendlyLinks = Array.from(document.querySelectorAll('a[href*="calendly"]'));
      expect(calendlyLinks.length).toBeGreaterThan(0);
    });

    test('should have LinkedIn links', () => {
      const linkedinLinks = Array.from(document.querySelectorAll('a[href*="linkedin"]'));
      expect(linkedinLinks.length).toBeGreaterThan(0);
    });

    test('should have contact anchor link', () => {
      const contactLink = document.querySelector('a[href="../index.html#contact"]');
      expect(contactLink).toBeTruthy();
    });
  });

  describe('pages/side_proj.html - Navigation Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/side_proj.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('brand logo should link back to index', () => {
      const brandLogo = document.querySelector('.brand-logo');
      expect(brandLogo.getAttribute('href')).toBe('../index.html');
    });

    test('home link should link to index', () => {
      const homeLink = document.querySelector('.mobile-home-link a[href="../index.html"]');
      expect(homeLink).toBeTruthy();
    });

    test('projects link should be self-referential', () => {
      const projectsLink = document.querySelector('a[href="side_proj.html"]');
      expect(projectsLink).toBeTruthy();
    });

    test('frameworks link should go to frameworks.html', () => {
      const frameworksLink = document.querySelector('a[href="frameworks.html"]');
      expect(frameworksLink).toBeTruthy();
    });
  });

  describe('pages/side_proj.html - Project Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/side_proj.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('AI Test Plan Generator link should be correct', () => {
      const aiLink = document.querySelector(
        'a[href="https://github.com/mcello23/ai-test-plan-generator"]'
      );
      expect(aiLink).toBeTruthy();
    });

    test('should have contact link to main page', () => {
      const contactLink = document.querySelector('a[href="../index.html#contact"]');
      expect(contactLink).toBeTruthy();
    });
  });

  describe('pages/side_proj.html - External Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/side_proj.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('should have GitHub social link', () => {
      const githubLink = document.querySelector('a[href="https://github.com/mcello23"]');
      expect(githubLink).toBeTruthy();
    });

    test('should have LinkedIn links', () => {
      const linkedinLinks = Array.from(document.querySelectorAll('a[href*="linkedin"]'));
      expect(linkedinLinks.length).toBeGreaterThan(0);
    });

    test('should have Calendly booking links', () => {
      const calendlyLinks = Array.from(document.querySelectorAll('a[href*="calendly"]'));
      expect(calendlyLinks.length).toBeGreaterThan(0);
    });
  });

  describe('pages/responsive-tester.html - Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/responsive-tester.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('should have link to test index page', () => {
      const indexLink = document.querySelector('a[href="index.html"]');
      expect(indexLink).toBeTruthy();
    });

    test('should have link to test frameworks page', () => {
      const frameworksLink = document.querySelector('a[href="frameworks.html"]');
      expect(frameworksLink).toBeTruthy();
    });

    test('should have link to test projects page', () => {
      const projectsLink = document.querySelector('a[href="side_proj.html"]');
      expect(projectsLink).toBeTruthy();
    });
  });

  describe('pages/test-brand.html - Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/test-brand.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('should have booking call link placeholder', () => {
      const bookingLink = document.querySelector('a.cta-link.book-call');
      expect(bookingLink).toBeTruthy();
      expect(bookingLink.getAttribute('href')).toBe('#');
    });
  });

  describe('pages/test-modal.html - Resource Links', () => {
    let document;

    beforeAll(() => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/test-modal.html'), 'utf8');
      const dom = new JSDOM(html);
      document = dom.window.document;
    });

    test('should have Material Icons link', () => {
      const materialLink = Array.from(document.querySelectorAll('link')).find(
        (link) => link.href && link.href.includes('Material+Icons')
      );
      expect(materialLink).toBeTruthy();
    });

    test('should have Font Awesome link', () => {
      const faLink = Array.from(document.querySelectorAll('link')).find(
        (link) => link.href && link.href.includes('font-awesome')
      );
      expect(faLink).toBeTruthy();
    });

    test('should have certificates CSS link', () => {
      const certsLink = document.querySelector('link[href="../css/certificates.css"]');
      expect(certsLink).toBeTruthy();
    });
  });

  describe('Certificate Modal Links (from certificates.js)', () => {
    let certificatesData;

    beforeAll(() => {
      const jsContent = fs.readFileSync(path.join(__dirname, '../js/certificates.js'), 'utf8');
      certificatesData = jsContent;
    });

    test('Cypress Basic certificate should have LinkedIn URL', () => {
      expect(certificatesData).toContain(
        'https://www.linkedin.com/learning/certificates/b1bf6ead-40d6-4942-9166-59de03c1f975'
      );
    });

    test('should contain ISTQB certificate data', () => {
      expect(certificatesData).toContain('ISTQB Foundation Training');
      expect(certificatesData).toContain('images/ISTQB.jpg');
    });

    test('should contain Selenium certificate data', () => {
      expect(certificatesData).toContain('Selenium WebDriver and Java');
      expect(certificatesData).toContain('images/Selenium WebDriver e Java.jpg');
    });

    test('should contain Cypress Intermediary certificate', () => {
      expect(certificatesData).toContain('Cypress Intermediary Course');
      expect(certificatesData).toContain('images/cyp-inter.jpg');
    });

    test('should contain Cypress Full Course certificate', () => {
      expect(certificatesData).toContain('Cypress Automation: Full Course with Frameworks');
    });

    test('should contain Appium certificate', () => {
      expect(certificatesData).toContain(
        'Mobile Automation: Appium Cucumber Android & iOS + Jenkins'
      );
      expect(certificatesData).toContain('images/cucumber_appium.jpg');
    });

    test('should contain Postman certificate', () => {
      expect(certificatesData).toContain('Postman Introduction');
    });

    test('should contain Agile certificate', () => {
      expect(certificatesData).toContain('Agile and Scrum Methodology');
      expect(certificatesData).toContain('images/agile.jpg');
    });

    test('should contain Python certificates', () => {
      expect(certificatesData).toContain('Python for Beginners');
      expect(certificatesData).toContain('The Python Bible Course');
    });

    test('should contain HTML/CSS certificate', () => {
      expect(certificatesData).toContain('HTML and CSS Course');
    });

    test('should contain Swift certificate', () => {
      expect(certificatesData).toContain('Swift 5');
      expect(certificatesData).toContain('images/Swift 5.jpg');
    });

    test('should contain GitHub certificate', () => {
      expect(certificatesData).toContain('GitHub Ultimate');
      expect(certificatesData).toContain('images/GitHub.jpg');
    });

    test('should contain Git Crash Course certificate', () => {
      expect(certificatesData).toContain('Git Crash Course');
    });

    test('should contain Regular Expressions certificate', () => {
      expect(certificatesData).toContain('Regular Expressions');
    });

    test('should contain Software Tester certificate', () => {
      expect(certificatesData).toContain('Software Tester - Becoming an Expert');
    });

    test('certificate images should reference correct paths', () => {
      expect(certificatesData).toMatch(/images\//);
      expect(certificatesData).toMatch(/thumbs\//);
    });
  });

  describe('All Pages - Link Security Attributes', () => {
    const pages = [
      { name: 'index.html', path: '../index.html' },
      { name: 'frameworks.html', path: '../pages/frameworks.html' },
      { name: 'side_proj.html', path: '../pages/side_proj.html' },
    ];

    pages.forEach((page) => {
      describe(`${page.name} - Security`, () => {
        let document;

        beforeAll(() => {
          const html = fs.readFileSync(path.join(__dirname, page.path), 'utf8');
          const dom = new JSDOM(html);
          document = dom.window.document;
        });

        test('external links should have target="_blank"', () => {
          const externalLinks = Array.from(document.querySelectorAll('a')).filter((link) => {
            const href = link.getAttribute('href');
            return (
              href &&
              (href.startsWith('http://') || href.startsWith('https://')) &&
              !href.includes('localhost')
            );
          });

          externalLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href && !href.includes('#')) {
              const target = link.getAttribute('target');
              if (target) {
                expect(target).toBe('_blank');
              }
            }
          });
        });

        test('external links should have rel="noopener noreferrer"', () => {
          const externalLinks = Array.from(document.querySelectorAll('a[target="_blank"]'));

          externalLinks.forEach((link) => {
            const rel = link.getAttribute('rel');
            expect(rel).toBeTruthy();
            expect(rel).toContain('noopener');
            expect(rel).toContain('noreferrer');
          });
        });
      });
    });
  });

  describe('All Pages - Link Accessibility', () => {
    const pages = [
      { name: 'index.html', path: '../index.html' },
      { name: 'frameworks.html', path: '../pages/frameworks.html' },
      { name: 'side_proj.html', path: '../pages/side_proj.html' },
    ];

    pages.forEach((page) => {
      describe(`${page.name} - Accessibility`, () => {
        let document;

        beforeAll(() => {
          const html = fs.readFileSync(path.join(__dirname, page.path), 'utf8');
          const dom = new JSDOM(html);
          document = dom.window.document;
        });

        test('brand logo should have aria-label', () => {
          const brandLogo = document.querySelector('.brand-logo');
          expect(brandLogo.getAttribute('aria-label')).toBe('Home');
        });

        test('social links should have aria-labels', () => {
          const socialLinks = Array.from(document.querySelectorAll('.social-icon'));
          socialLinks.forEach((link) => {
            const ariaLabel = link.getAttribute('aria-label');
            expect(ariaLabel).toBeTruthy();
          });
        });

        test('booking call link should have aria-label', () => {
          const bookingLink = document.querySelector('.cta-link.book-call');
          if (bookingLink) {
            expect(bookingLink.getAttribute('aria-label')).toBeTruthy();
          }
        });
      });
    });
  });

  describe('CSS and JS Resource Links', () => {
    test('index.html should link to all required CSS files', () => {
      const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

      expect(html).toContain('css/materialize.css');
      expect(html).toContain('css/style.css');
      expect(html).toContain('css/navbar.css');
      expect(html).toContain('css/certificates.css');
    });

    test('index.html should link to all required JS files', () => {
      const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

      expect(html).toContain('js/materialize.js');
      expect(html).toContain('js/init.js');
      expect(html).toContain('js/certificates.js');
    });

    test('frameworks.html should link to required CSS files', () => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/frameworks.html'), 'utf8');

      expect(html).toContain('../css/materialize.css');
      expect(html).toContain('../css/style.css');
      expect(html).toContain('../css/navbar.css');
      expect(html).toContain('../css/certificates.css');
    });

    test('side_proj.html should link to required CSS files', () => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/side_proj.html'), 'utf8');

      expect(html).toContain('../css/materialize.css');
      expect(html).toContain('../css/style.css');
      expect(html).toContain('../css/navbar.css');
      expect(html).toContain('../css/certificates.css');
    });
  });
});
