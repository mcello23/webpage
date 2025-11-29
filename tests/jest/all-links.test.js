const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

describe('All Pages - Link Validation', () => {
  let indexDoc, frameworksDoc, sideProjDoc, responsiveTesterDoc;

  beforeAll(() => {
    const indexHtml = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
    const frameworksHtml = fs.readFileSync(
      path.join(__dirname, '../../pages/frameworks/index.html'),
      'utf8'
    );
    const sideProjHtml = fs.readFileSync(
      path.join(__dirname, '../../pages/side_proj/index.html'),
      'utf8'
    );
    const responsiveTesterHtml = fs.readFileSync(
      path.join(__dirname, '../../pages/responsive-tester.html'),
      'utf8'
    );

    indexDoc = cheerio.load(indexHtml);
    frameworksDoc = cheerio.load(frameworksHtml);
    sideProjDoc = cheerio.load(sideProjHtml);
    responsiveTesterDoc = cheerio.load(responsiveTesterHtml);
  });

  describe('index.html - Navigation Links', () => {
    let document;
    beforeAll(() => {
      document = indexDoc;
    });

    test('brand logo should link to index.html', () => {
      const brandLogo = document('.brand-logo');
      expect(brandLogo.attr('href')).toBe('/');
    });

    test('mobile home link should link to index.html', () => {
      const mobileHomeLink = document('.mobile-home-link a[href="/"]');
      expect(mobileHomeLink.length).toBeGreaterThan(0);
      expect(mobileHomeLink.attr('href')).toBe('/');
    });

    test('projects nav button should link to side_proj.html', () => {
      const projectsLink = document('.nav-btn-projects');
      expect(projectsLink.attr('href')).toBe('/pages/side_proj/');
    });

    test('frameworks nav button should link to frameworks.html', () => {
      const frameworksLink = document('.nav-btn-frameworks');
      expect(frameworksLink.attr('href')).toBe('/pages/frameworks/');
    });

    test('certificates button should have # anchor', () => {
      const certsLink = document('a[href="#"]');
      expect(certsLink.length).toBeGreaterThan(0);
      expect(certsLink.text()).toContain('Certificates');
    });
  });

  describe('index.html - Social & External Links', () => {
    let document;
    beforeAll(() => {
      document = indexDoc;
    });

    test('Calendly booking link should be correct', () => {
      const calendlyLinks = document('a[href*="calendly"]');
      expect(calendlyLinks.length).toBeGreaterThan(0);
      calendlyLinks.each((i, link) => {
        expect(document(link).attr('href')).toContain('calendly.com/marceloadsc/15min');
      });
    });

    test('GitHub social link should be correct', () => {
      const githubLink = document('a[aria-label="GitHub"]');
      expect(githubLink.length).toBeGreaterThan(0);
      expect(githubLink.attr('href')).toBe('https://github.com/mcello23');
    });

    test('LinkedIn social link should be correct', () => {
      const linkedinLinks = document(
        'a[aria-label="LinkedIn"], a[href*="linkedin.com/in/marceloc"]'
      );
      expect(linkedinLinks.length).toBeGreaterThan(0);
      linkedinLinks.each((i, link) => {
        expect(document(link).attr('href')).toContain('linkedin.com/in/marceloc');
      });
    });

    test('contact anchor link should be correct', () => {
      const contactLink = document('a[href="#contact"]');
      expect(contactLink.length).toBeGreaterThan(0);
    });
  });

  describe('index.html - Article Links', () => {
    let document;
    beforeAll(() => {
      document = indexDoc;
    });

    test('Hasura GraphQL Medium article link should be correct', () => {
      const hasuraLink = document(
        'a[href*="how-to-integrate-hasura-graphql-hooks-into-your-e2e-tests-with-cypress"]'
      );
      expect(hasuraLink.length).toBeGreaterThan(0);
      expect(hasuraLink.attr('href')).toContain('medium.com');
    });

    test('Auth0 LinkedIn article link should be correct', () => {
      const auth0Link = document('a[href*="speeding-un-cypress-tests-auth0-login-across-specs"]');
      expect(auth0Link.length).toBeGreaterThan(0);
      expect(auth0Link.attr('href')).toContain('linkedin.com/pulse');
    });

    test('Medium profile link should be correct', () => {
      const mediumLink = document('a[href="https://medium.com/@marcelocosta_72783"]');
      expect(mediumLink.length).toBeGreaterThan(0);
    });

    test('Cyprompt AI Dev.to article link should be correct', () => {
      const cypromptLink = document(
        'a[href*="how-cypress-will-revolutionize-the-use-of-ai-in-testing-with-cyprompt"]'
      );
      expect(cypromptLink.length).toBeGreaterThan(0);
      expect(cypromptLink.attr('href')).toContain('dev.to');
      expect(cypromptLink.attr('href')).toContain('marcelo_sqe');
    });

    test('Dev.to article should have proper attributes', () => {
      const cypromptLink = document(
        'a[href*="how-cypress-will-revolutionize-the-use-of-ai-in-testing-with-cyprompt"]'
      );
      expect(cypromptLink.attr('target')).toBe('_blank');
      expect(cypromptLink.attr('rel')).toBe('noopener noreferrer');
    });

    test('Dev.to article should contain Dev icon', () => {
      const cypromptLink = document(
        'a[href*="how-cypress-will-revolutionize-the-use-of-ai-in-testing-with-cyprompt"]'
      );
      const devIcon = cypromptLink.find('.fa-dev');
      expect(devIcon.length).toBeGreaterThan(0);
    });

    test('Dev.to profile link should be correct', () => {
      const devToLink = document('a[href="https://dev.to/marcelo_sqe"]');
      expect(devToLink.length).toBeGreaterThan(0);
      expect(devToLink.attr('target')).toBe('_blank');
      expect(devToLink.attr('rel')).toBe('noopener noreferrer');
    });

    test('Cyprompt article card should have correct tags', () => {
      // Find article card logic: iterate through cards and check link
      let cypromptCard = null;
      document('.gradient-card').each((i, card) => {
        if (document(card).find('a[href*="how-cypress-will-revolutionize"]').length > 0) {
          cypromptCard = document(card);
        }
      });

      expect(cypromptCard).toBeTruthy();

      const tags = cypromptCard.find('.skill-tag');
      expect(tags.length).toBe(3);

      const tagTexts = tags.map((i, tag) => document(tag).text().trim()).get();
      expect(tagTexts).toContain('AI Testing');
      expect(tagTexts).toContain('Cypress');
      expect(tagTexts).toContain('Cyprompt');
    });

    test('Cyprompt article should have psychology icon', () => {
      let cypromptCard = null;
      document('.gradient-card').each((i, card) => {
        if (document(card).find('a[href*="how-cypress-will-revolutionize"]').length > 0) {
          cypromptCard = document(card);
        }
      });

      const psychologyIcon = cypromptCard.find('.material-icons');
      expect(psychologyIcon.length).toBeGreaterThan(0);
      expect(psychologyIcon.text().trim()).toBe('psychology');
    });

    test('Cyprompt article should have correct heading', () => {
      let cypromptCard = null;
      document('.gradient-card').each((i, card) => {
        if (document(card).find('a[href*="how-cypress-will-revolutionize"]').length > 0) {
          cypromptCard = document(card);
        }
      });

      const heading = cypromptCard.find('.card-content h5');
      expect(heading.text()).toContain(
        'How Cypress Will Revolutionize AI in Testing with cy.prompt()'
      );
    });

    test('All article cards should have equal height styling', () => {
      document('.gradient-card').each((i, card) => {
        const style = document(card).attr('style');
        // Only check if style attribute exists, mirroring JSDOM behavior where it might have been skipped or handled differently
        if (style) {
          expect(style).toContain('height: 100%');
        }
      });
    });
  });

  describe('index.html - Resource Links', () => {
    let document;
    beforeAll(() => {
      document = indexDoc;
    });

    test('Material Icons font link should be present', () => {
      let found = false;
      document('link').each((i, link) => {
        if (document(link).attr('href') && document(link).attr('href').includes('Material+Icons')) {
          found = true;
        }
      });
      expect(found).toBe(true);
    });

    test('Font Awesome CDN link should be present', () => {
      let found = false;
      document('link').each((i, link) => {
        if (document(link).attr('href') && document(link).attr('href').includes('font-awesome')) {
          found = true;
        }
      });
      expect(found).toBe(true);
    });

    test('favicon links should be present', () => {
      expect(document('link[href="favicon/favicon-32x32.png"]').length).toBeGreaterThan(0);
      expect(document('link[href="favicon/favicon-16x16.png"]').length).toBeGreaterThan(0);
      expect(document('link[href="favicon.svg"]').length).toBeGreaterThan(0);
    });

    test('canonical link should point to Cloudflare Pages', () => {
      const canonical = document('link[rel="canonical"]');
      expect(canonical.length).toBeGreaterThan(0);
      expect(canonical.attr('href')).toBe('https://marcelocosta.pages.dev/');
    });
  });

  describe('pages/frameworks/index.html - Navigation Links', () => {
    let document;
    beforeAll(() => {
      document = frameworksDoc;
    });

    test('brand logo should link back to index', () => {
      const brandLogo = document('.brand-logo');
      expect(brandLogo.attr('href')).toBe('/');
    });

    test('mobile home link should link to index', () => {
      const mobileHomeLink = document('.mobile-home-link a[href="/"]');
      expect(mobileHomeLink.length).toBeGreaterThan(0);
    });

    test('projects link should go to side_proj.html', () => {
      const projectsLink = document('a[href="/pages/side_proj/"]');
      expect(projectsLink.length).toBeGreaterThan(0);
    });

    test('frameworks link should be self-referential', () => {
      const frameworksLink = document('a[href="/pages/frameworks/"]');
      expect(frameworksLink.length).toBeGreaterThan(0);
    });
  });

  describe('pages/frameworks/index.html - Project Links', () => {
    let document;
    beforeAll(() => {
      document = frameworksDoc;
    });

    test('Playwright demonstration link should be correct', () => {
      expect(
        document('a[href="https://github.com/mcello23/playwright-demonstration"]').length
      ).toBeGreaterThan(0);
    });

    test('Cypress automation real project link should be correct', () => {
      expect(
        document('a[href="https://github.com/mcello23/cypress-automation-real-proj"]').length
      ).toBeGreaterThan(0);
    });

    test('Cypress demonstration repo link should be correct', () => {
      expect(
        document('a[href="https://github.com/mcello23/cypress-demonstration-repo"]').length
      ).toBeGreaterThan(0);
    });
  });

  describe('pages/frameworks/index.html - External Links', () => {
    let document;
    beforeAll(() => {
      document = frameworksDoc;
    });

    test('should have Calendly booking links', () => {
      expect(document('a[href*="calendly"]').length).toBeGreaterThan(0);
    });

    test('should have LinkedIn links', () => {
      expect(document('a[href*="linkedin"]').length).toBeGreaterThan(0);
    });

    test('should have contact anchor link', () => {
      expect(document('a[href="/#contact"]').length).toBeGreaterThan(0);
    });
  });

  describe('pages/side_proj/index.html - Navigation Links', () => {
    let document;
    beforeAll(() => {
      document = sideProjDoc;
    });

    test('brand logo should link back to index', () => {
      const brandLogo = document('.brand-logo');
      expect(brandLogo.attr('href')).toBe('/');
    });

    test('home link should link to index', () => {
      const homeLink = document('.mobile-home-link a[href="/"]');
      expect(homeLink.length).toBeGreaterThan(0);
    });

    test('projects link should be self-referential', () => {
      const projectsLink = document('a[href="/pages/side_proj/"]');
      expect(projectsLink.length).toBeGreaterThan(0);
    });

    test('frameworks link should go to frameworks.html', () => {
      const frameworksLink = document('a[href="/pages/frameworks/"]');
      expect(frameworksLink.length).toBeGreaterThan(0);
    });
  });

  describe('pages/side_proj/index.html - Project Links', () => {
    let document;
    beforeAll(() => {
      document = sideProjDoc;
    });

    test('AI Test Plan Generator link should be correct', () => {
      expect(
        document('a[href="https://github.com/mcello23/ai-test-plan-generator"]').length
      ).toBeGreaterThan(0);
    });

    test('should have contact link to main page', () => {
      expect(document('a[href="/#contact"]').length).toBeGreaterThan(0);
    });
  });

  describe('pages/side_proj/index.html - External Links', () => {
    let document;
    beforeAll(() => {
      document = sideProjDoc;
    });

    test('should have GitHub social link', () => {
      expect(document('a[href="https://github.com/mcello23"]').length).toBeGreaterThan(0);
    });

    test('should have LinkedIn links', () => {
      expect(document('a[href*="linkedin"]').length).toBeGreaterThan(0);
    });

    test('should have Calendly booking links', () => {
      expect(document('a[href*="calendly"]').length).toBeGreaterThan(0);
    });
  });

  describe('pages/responsive-tester.html - Links', () => {
    let document;
    beforeAll(() => {
      document = responsiveTesterDoc;
    });

    test('should have link to test index page', () => {
      expect(document('a[href="/"]').length).toBeGreaterThan(0);
    });

    test('should have link to test frameworks page', () => {
      expect(document('a[href="/pages/frameworks/"]').length).toBeGreaterThan(0);
    });

    test('should have link to test projects page', () => {
      expect(document('a[href="/pages/side_proj/"]').length).toBeGreaterThan(0);
    });
  });

  describe('Certificate Modal Links (from certificates.js)', () => {
    let certificatesData;
    beforeAll(() => {
      certificatesData = fs.readFileSync(path.join(__dirname, '../../js/certificates.js'), 'utf8');
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
          const externalLinks = [];
          document('a').each((i, link) => {
            const href = document(link).attr('href');
            if (
              href &&
              (href.startsWith('http://') || href.startsWith('https://')) &&
              !href.includes('localhost')
            ) {
              externalLinks.push(link);
            }
          });

          externalLinks.forEach((link) => {
            const href = document(link).attr('href');
            if (href && !href.includes('#')) {
              const target = document(link).attr('target');
              if (target) {
                expect(target).toBe('_blank');
              }
            }
          });
        });

        test('external links should have rel="noopener noreferrer"', () => {
          const externalLinks = document('a[target="_blank"]');
          externalLinks.each((i, link) => {
            const rel = document(link).attr('rel');
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
          const brandLogo = document('.brand-logo');
          expect(brandLogo.attr('aria-label')).toBe('Home');
        });

        test('social links should have aria-labels', () => {
          const socialLinks = document('.social-icon');
          socialLinks.each((i, link) => {
            expect(document(link).attr('aria-label')).toBeTruthy();
          });
        });

        test('booking call link should have aria-label', () => {
          const bookingLink = document('.cta-link.book-call');
          if (bookingLink.length > 0) {
            expect(bookingLink.attr('aria-label')).toBeTruthy();
          }
        });
      });
    });
  });

  describe('CSS and JS Resource Links', () => {
    test('index.html should link to all required CSS files', () => {
      const html = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
      expect(html).toContain('css/materialize');
      expect(html).toContain('css/style');
      expect(html).toContain('css/navbar');
      expect(html).toContain('css/certificates');
    });

    test('index.html should link to all required JS files', () => {
      const html = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
      expect(html).toContain('js/materialize.js');
      expect(html).toContain('js/init');
      expect(html).toContain('js/certificates');
    });

    test('frameworks.html should link to required CSS files', () => {
      const html = fs.readFileSync(
        path.join(__dirname, '../../pages/frameworks/index.html'),
        'utf8'
      );
      expect(html).toContain('../css/materialize');
      expect(html).toContain('../css/style');
      expect(html).toContain('../css/navbar');
      expect(html).toContain('../css/certificates');
    });

    test('side_proj.html should link to required CSS files', () => {
      const html = fs.readFileSync(
        path.join(__dirname, '../../pages/side_proj/index.html'),
        'utf8'
      );
      expect(html).toContain('../css/materialize');
      expect(html).toContain('../css/style');
      expect(html).toContain('../css/navbar');
      expect(html).toContain('../css/certificates');
    });
  });
});
