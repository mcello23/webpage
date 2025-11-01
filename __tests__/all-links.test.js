/**
 * Comprehensive Link Validation Test Suite
 *
 * Tests all href links across all HTML pages including:
 * - index.html
 * - pages/frameworks/index.html
 * - pages/side_proj/index.html
 * - pages/responsive-tester.html
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('All Pages - Link Validation', () => {
  // Cache all documents once to avoid repeated JSDOM initialization
  let indexDoc, frameworksDoc, sideProjDoc, responsiveTesterDoc;

  beforeAll(() => {
    const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    const frameworksHtml = fs.readFileSync(
      path.join(__dirname, '../pages/frameworks/index.html'),
      'utf8'
    );
    const sideProjHtml = fs.readFileSync(path.join(__dirname, '../pages/side_proj/index.html'), 'utf8');
    const responsiveTesterHtml = fs.readFileSync(
      path.join(__dirname, '../pages/responsive-tester.html'),
      'utf8'
    );

    indexDoc = new JSDOM(indexHtml).window.document;
    frameworksDoc = new JSDOM(frameworksHtml).window.document;
    sideProjDoc = new JSDOM(sideProjHtml).window.document;
    responsiveTesterDoc = new JSDOM(responsiveTesterHtml).window.document;
  });

  describe('index.html - Navigation Links', () => {
    let document;

    beforeAll(() => {
      document = indexDoc;
    });

    test('brand logo should link to index.html', () => {
      const brandLogo = document.querySelector('.brand-logo');
      expect(brandLogo.getAttribute('href')).toBe('/webpage/');
    });

    test('mobile home link should link to index.html', () => {
      const mobileHomeLink = document.querySelector('.mobile-home-link a[href="/webpage/"]');
      expect(mobileHomeLink).toBeTruthy();
      expect(mobileHomeLink.getAttribute('href')).toBe('/webpage/');
    });

    test('projects nav button should link to side_proj.html', () => {
      const projectsLink = document.querySelector('.nav-btn-projects');
      expect(projectsLink.getAttribute('href')).toBe('/webpage/pages/side_proj/');
    });

    test('frameworks nav button should link to frameworks.html', () => {
      const frameworksLink = document.querySelector('.nav-btn-frameworks');
      expect(frameworksLink.getAttribute('href')).toBe('/webpage/pages/frameworks/');
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
      document = indexDoc;
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

  describe('index.html - Article Links', () => {
    let document;

    beforeAll(() => {
      document = indexDoc;
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

    test('Cyprompt AI Dev.to article link should be correct', () => {
      const cypromptLink = document.querySelector(
        'a[href*="how-cypress-will-revolutionize-the-use-of-ai-in-testing-with-cyprompt"]'
      );
      expect(cypromptLink).toBeTruthy();
      expect(cypromptLink.getAttribute('href')).toContain('dev.to');
      expect(cypromptLink.getAttribute('href')).toContain('marcelo_sqe');
    });

    test('Dev.to article should have proper attributes', () => {
      const cypromptLink = document.querySelector(
        'a[href*="how-cypress-will-revolutionize-the-use-of-ai-in-testing-with-cyprompt"]'
      );
      expect(cypromptLink.getAttribute('target')).toBe('_blank');
      expect(cypromptLink.getAttribute('rel')).toBe('noopener noreferrer');
    });

    test('Dev.to article should contain Dev icon', () => {
      const cypromptLink = document.querySelector(
        'a[href*="how-cypress-will-revolutionize-the-use-of-ai-in-testing-with-cyprompt"]'
      );
      const devIcon = cypromptLink.querySelector('.fa-dev');
      expect(devIcon).toBeTruthy();
    });

    test('Dev.to profile link should be correct', () => {
      const devToLink = document.querySelector('a[href="https://dev.to/marcelo_sqe"]');
      expect(devToLink).toBeTruthy();
      expect(devToLink.getAttribute('target')).toBe('_blank');
      expect(devToLink.getAttribute('rel')).toBe('noopener noreferrer');
    });

    test('Cyprompt article card should have correct tags', () => {
      const articleSection = document.querySelector('#articles');
      const articleCards = articleSection.querySelectorAll('.gradient-card');

      // Find the Cyprompt article card (look for the specific article about revolutionizing AI)
      let cypromptCard = null;
      articleCards.forEach((card) => {
        const link = card.querySelector('a[href*="how-cypress-will-revolutionize"]');
        if (link) {
          cypromptCard = card;
        }
      });

      expect(cypromptCard).toBeTruthy();

      // Validate tags
      const tags = cypromptCard.querySelectorAll('.skill-tag');
      expect(tags.length).toBe(3);

      const tagTexts = Array.from(tags).map((tag) => tag.textContent.trim());
      expect(tagTexts).toContain('AI Testing');
      expect(tagTexts).toContain('Cypress');
      expect(tagTexts).toContain('Cyprompt');
    });

    test('Cyprompt article should have psychology icon', () => {
      const articleSection = document.querySelector('#articles');
      const articleCards = articleSection.querySelectorAll('.gradient-card');

      // Find the Cyprompt article card
      let cypromptCard = null;
      articleCards.forEach((card) => {
        const link = card.querySelector('a[href*="how-cypress-will-revolutionize"]');
        if (link) {
          cypromptCard = card;
        }
      });

      const psychologyIcon = cypromptCard.querySelector('.material-icons');
      expect(psychologyIcon).toBeTruthy();
      expect(psychologyIcon.textContent.trim()).toBe('psychology');
    });

    test('Cyprompt article should have correct heading', () => {
      const articleSection = document.querySelector('#articles');
      const articleCards = articleSection.querySelectorAll('.gradient-card');

      // Find the Cyprompt article card
      let cypromptCard = null;
      articleCards.forEach((card) => {
        const link = card.querySelector('a[href*="how-cypress-will-revolutionize"]');
        if (link) {
          cypromptCard = card;
        }
      });

      const heading = cypromptCard.querySelector('.card-content h5');
      expect(heading.textContent).toContain(
        'How Cypress Will Revolutionize AI in Testing with cy.prompt()'
      );
    });

    test('All article cards should have equal height styling', () => {
      const articleSection = document.querySelector('#articles');
      const articleCards = articleSection.querySelectorAll('.gradient-card');

      articleCards.forEach((card) => {
        const style = card.getAttribute('style');
        expect(style).toContain('height: 100%');
      });
    });
  });

  describe('index.html - Resource Links', () => {
    let document;

    beforeAll(() => {
      document = indexDoc;
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

  describe('pages/frameworks/index.html - Navigation Links', () => {
    let document;

    beforeAll(() => {
      document = frameworksDoc;
    });

    test('brand logo should link back to index', () => {
      const brandLogo = document.querySelector('.brand-logo');
      expect(brandLogo.getAttribute('href')).toBe('/webpage/');
    });

    test('mobile home link should link to index', () => {
      const mobileHomeLink = document.querySelector('.mobile-home-link a[href="/webpage/"]');
      expect(mobileHomeLink).toBeTruthy();
    });

    test('projects link should go to side_proj.html', () => {
      const projectsLink = document.querySelector('a[href="/webpage/pages/side_proj/"]');
      expect(projectsLink).toBeTruthy();
    });

    test('frameworks link should be self-referential', () => {
      const frameworksLink = document.querySelector('a[href="/webpage/pages/frameworks/"]');
      expect(frameworksLink).toBeTruthy();
    });
  });

  describe('pages/frameworks/index.html - Project Links', () => {
    let document;

    beforeAll(() => {
      document = frameworksDoc;
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

  describe('pages/frameworks/index.html - External Links', () => {
    let document;

    beforeAll(() => {
      document = frameworksDoc;
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
      const contactLink = document.querySelector('a[href="/#contact"]');
      expect(contactLink).toBeTruthy();
    });
  });

  describe('pages/side_proj/index.html - Navigation Links', () => {
    let document;

    beforeAll(() => {
      document = sideProjDoc;
    });

    test('brand logo should link back to index', () => {
      const brandLogo = document.querySelector('.brand-logo');
      expect(brandLogo.getAttribute('href')).toBe('/webpage/');
    });

    test('home link should link to index', () => {
      const homeLink = document.querySelector('.mobile-home-link a[href="/webpage/"]');
      expect(homeLink).toBeTruthy();
    });

    test('projects link should be self-referential', () => {
      const projectsLink = document.querySelector('a[href="/webpage/pages/side_proj/"]');
      expect(projectsLink).toBeTruthy();
    });

    test('frameworks link should go to frameworks.html', () => {
      const frameworksLink = document.querySelector('a[href="/webpage/pages/frameworks/"]');
      expect(frameworksLink).toBeTruthy();
    });
  });

  describe('pages/side_proj/index.html - Project Links', () => {
    let document;

    beforeAll(() => {
      document = sideProjDoc;
    });

    test('AI Test Plan Generator link should be correct', () => {
      const aiLink = document.querySelector(
        'a[href="https://github.com/mcello23/ai-test-plan-generator"]'
      );
      expect(aiLink).toBeTruthy();
    });

    test('should have contact link to main page', () => {
      const contactLink = document.querySelector('a[href="/#contact"]');
      expect(contactLink).toBeTruthy();
    });
  });

  describe('pages/side_proj/index.html - External Links', () => {
    let document;

    beforeAll(() => {
      document = sideProjDoc;
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
      document = responsiveTesterDoc;
    });

    test('should have link to test index page', () => {
      const indexLink = document.querySelector('a[href="/"]');
      expect(indexLink).toBeTruthy();
    });

    test('should have link to test frameworks page', () => {
      const frameworksLink = document.querySelector('a[href="/webpage/pages/frameworks/"]');
      expect(frameworksLink).toBeTruthy();
    });

    test('should have link to test projects page', () => {
      const projectsLink = document.querySelector('a[href="/webpage/pages/side_proj/"]');
      expect(projectsLink).toBeTruthy();
    });
  });

  describe('Certificate Modal Links (from certificates.js)', () => {
    let certificatesData;

    beforeAll(() => {
      const jsContent = fs.readFileSync(path.join(__dirname, '../js/certificates.js'), 'utf8');
      certificatesData = jsContent;
    });

    test('Cypress Basic certificate should have Udemy URL', () => {
      expect(certificatesData).toContain(
        'https://udemy-certificate.s3.amazonaws.com/image/UC-b1bf6ead-40d6-4942-9166-59de03c1f975.jpg'
      );
      expect(certificatesData).toContain('Automation Test with Cypress - Basics');
    });

    test('should contain ISTQB certificate data', () => {
      expect(certificatesData).toContain('Certified ISTQB Agile Tester Foundation Level');
      expect(certificatesData).toContain('images/ISTQB.jpg');
    });

    test('should contain Selenium certificate data', () => {
      expect(certificatesData).toContain('Automation Selenium WebDriver + Java');
      expect(certificatesData).toContain('images/Selenium WebDriver e Java.jpg');
    });

    test('should contain Cypress Intermediary certificate', () => {
      expect(certificatesData).toContain('Automation Test with Cypress - Intermediary');
      expect(certificatesData).toContain('images/cyp-inter.jpg');
    });

    test('should contain Cypress Full Course certificate', () => {
      expect(certificatesData).toContain(
        'Cypress - Modern Automation Testing from Scratch + Frameworks'
      );
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
      expect(certificatesData).toContain('Agile Management with Scrum');
      expect(certificatesData).toContain('images/agile.jpg');
    });

    test('should contain Python certificates', () => {
      expect(certificatesData).toContain('Python for Beginners');
      expect(certificatesData).toContain('The Python Bible');
    });

    test('should contain HTML/CSS certificate', () => {
      expect(certificatesData).toContain(
        'Web Design for Beginners: Real World Coding in HTML & CSS'
      );
    });

    test('should contain Swift certificate', () => {
      expect(certificatesData).toContain('Swift 5');
      expect(certificatesData).toContain('images/Swift 5.jpg');
    });

    test('should contain GitHub certificate', () => {
      expect(certificatesData).toContain('GitHub Ultimate');
      expect(certificatesData).toContain('images/GitHub.jpg');
    });

    test('should contain GitHub Intensive Course certificate', () => {
      expect(certificatesData).toContain('GitHub Intensive Course');
    });

    test('should contain Regular Expressions certificate', () => {
      expect(certificatesData).toContain('Regular Expressions');
    });

    test('should contain Software Tester certificate', () => {
      expect(certificatesData).toContain('Software Testing: Becoming an Expert');
    });

    test('certificate images should reference correct paths', () => {
      expect(certificatesData).toMatch(/images\//);
      expect(certificatesData).toMatch(/thumbs\//);
    });
  });

  describe('All Pages - Link Security Attributes', () => {
    const pages = [
      { name: 'index.html', doc: () => indexDoc },
      { name: 'frameworks.html', doc: () => frameworksDoc },
      { name: 'side_proj.html', doc: () => sideProjDoc },
    ];

    pages.forEach((page) => {
      describe(`${page.name} - Security`, () => {
        let document;

        beforeAll(() => {
          document = page.doc();
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
      { name: 'index.html', doc: () => indexDoc },
      { name: 'frameworks.html', doc: () => frameworksDoc },
      { name: 'side_proj.html', doc: () => sideProjDoc },
    ];

    pages.forEach((page) => {
      describe(`${page.name} - Accessibility`, () => {
        let document;

        beforeAll(() => {
          document = page.doc();
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
      const html = fs.readFileSync(path.join(__dirname, '../pages/frameworks/index.html'), 'utf8');

      expect(html).toContain('../css/materialize.css');
      expect(html).toContain('../css/style.css');
      expect(html).toContain('../css/navbar.css');
      expect(html).toContain('../css/certificates.css');
    });

    test('side_proj.html should link to required CSS files', () => {
      const html = fs.readFileSync(path.join(__dirname, '../pages/side_proj/index.html'), 'utf8');

      expect(html).toContain('../css/materialize.css');
      expect(html).toContain('../css/style.css');
      expect(html).toContain('../css/navbar.css');
      expect(html).toContain('../css/certificates.css');
    });
  });
});
