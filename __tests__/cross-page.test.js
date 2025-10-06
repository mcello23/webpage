const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Cross-Page Consistency Tests', () => {
  let indexDom, frameworksDom, sideProjDom;
  let indexDoc, frameworksDoc, sideProjDoc;

  beforeAll(() => {
    const indexHtml = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
    const frameworksHtml = fs.readFileSync(
      path.resolve(__dirname, '..', 'frameworks.html'),
      'utf8'
    );
    const sideProjHtml = fs.readFileSync(path.resolve(__dirname, '..', 'side_proj.html'), 'utf8');

    indexDom = new JSDOM(indexHtml);
    frameworksDom = new JSDOM(frameworksHtml);
    sideProjDom = new JSDOM(sideProjHtml);

    indexDoc = indexDom.window.document;
    frameworksDoc = frameworksDom.window.document;
    sideProjDoc = sideProjDom.window.document;
  });

  describe('Navigation Consistency', () => {
    test('all pages have the same brand logo text', () => {
      const indexBrand = indexDoc.querySelector('.brand-logo').textContent;
      const frameworksBrand = frameworksDoc.querySelector('.brand-logo').textContent;
      const sideProjBrand = sideProjDoc.querySelector('.brand-logo').textContent;

      expect(indexBrand).toContain('Marcelo Costa - SDET Portfolio');
      expect(frameworksBrand).toContain('Marcelo Costa - SDET Portfolio');
      expect(sideProjBrand).toContain('Marcelo Costa - SDET Portfolio');
    });

    test('all pages have the same navigation buttons', () => {
      const getNavButtons = (doc) => {
        const buttons = doc.querySelectorAll('.nav-btn');
        return Array.from(buttons).map((btn) => btn.getAttribute('href'));
      };

      const indexButtons = getNavButtons(indexDoc);
      const frameworksButtons = getNavButtons(frameworksDoc);
      const sideProjButtons = getNavButtons(sideProjDoc);

      expect(indexButtons).toEqual(frameworksButtons);
      expect(indexButtons).toEqual(sideProjButtons);
    });

    test('all pages have the same social media links', () => {
      const getSocialLinks = (doc) => {
        const socials = doc.querySelectorAll('.social-icon');
        return Array.from(socials)
          .map((a) => a.getAttribute('href'))
          .sort();
      };

      const indexSocials = getSocialLinks(indexDoc);
      const frameworksSocials = getSocialLinks(frameworksDoc);
      const sideProjSocials = getSocialLinks(sideProjDoc);

      expect(indexSocials).toEqual(frameworksSocials);
      expect(indexSocials).toEqual(sideProjSocials);
      expect(indexSocials).toContain('https://github.com/mcello23');
      expect(indexSocials).toContain('https://www.linkedin.com/in/marceloc/');
      expect(indexSocials).toContain('https://discord.com/users/mcello.654');
    });

    test('all pages have fixed navigation with same class', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const nav = doc.querySelector('nav');
        expect(nav).toBeTruthy();
        // navbar styling moved to external CSS and uses the 'main-nav' class
        expect(nav.classList.contains('main-nav')).toBe(true);
      });
    });

    test('all pages link back to index.html from brand logo', () => {
      const indexBrand = indexDoc.querySelector('.brand-logo').getAttribute('href');
      const frameworksBrand = frameworksDoc.querySelector('.brand-logo').getAttribute('href');
      const sideProjBrand = sideProjDoc.querySelector('.brand-logo').getAttribute('href');

      expect(indexBrand).toBe('index.html');
      expect(frameworksBrand).toBe('index.html');
      expect(sideProjBrand).toBe('index.html');
    });
  });

  describe('Footer Consistency', () => {
    test('all pages have professional footer without emojis', () => {
      const indexFooter = indexDoc.body.textContent;
      const frameworksFooter = frameworksDoc.body.textContent;
      const sideProjFooter = sideProjDoc.body.textContent;

      expect(indexFooter).toContain('© 2025 Marcelo Costa');
      expect(frameworksFooter).toContain('© 2025 Marcelo Costa');
      expect(sideProjFooter).toContain('© 2025 Marcelo Costa');

      expect(indexFooter).not.toMatch(/☺/);
      expect(frameworksFooter).not.toMatch(/☺/);
      expect(sideProjFooter).not.toMatch(/☺/);
    });

    test('all pages have thank you message', () => {
      const indexFooter = indexDoc.body.textContent;
      const frameworksFooter = frameworksDoc.body.textContent;
      const sideProjFooter = sideProjDoc.body.textContent;

      expect(indexFooter).toContain('Thank you');
      expect(frameworksFooter).toContain('Thank you');
      expect(sideProjFooter).toContain('Thank you');
    });
  });

  describe('Script Consistency', () => {
    test('all pages load jQuery', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const jquery = doc.querySelector('script[src*="jquery"]');
        expect(jquery).toBeTruthy();
      });
    });

    test('all pages load Materialize', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const materialize = doc.querySelector('script[src*="materialize"]');
        expect(materialize).toBeTruthy();
      });
    });

    test('all pages load certificates.js', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const certScript = doc.querySelector('script[src*="certificates.js"]');
        expect(certScript).toBeTruthy();
      });
    });
  });

  describe('CSS Consistency', () => {
    test('all pages load Materialize CSS', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const materializeCSS = doc.querySelector('link[href*="materialize.css"]');
        expect(materializeCSS).toBeTruthy();
      });
    });

    test('all pages load style.css', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const styleCSS = doc.querySelector('link[href="css/style.css"]');
        expect(styleCSS).toBeTruthy();
      });
    });

    test('all pages load Material Icons', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const icons = doc.querySelector('link[href*="Material+Icons"]');
        expect(icons).toBeTruthy();
      });
    });

    test('all pages load Font Awesome', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const fontAwesome = doc.querySelector('link[href*="font-awesome"]');
        expect(fontAwesome).toBeTruthy();
      });
    });
  });

  describe('Certificate Modal Consistency', () => {
    test('all pages have modern certificate modal', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const modal = doc.querySelector('#certificateModal');
        expect(modal).toBeTruthy();
        expect(modal.classList.contains('cert-modal')).toBe(true);
      });
    });

    test('all pages load certificates.css stylesheet', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const certStyles = doc.querySelector('link[href*="certificates.css"]');
        expect(certStyles).toBeTruthy();
      });
    });
  });

  describe('Meta Tags Consistency', () => {
    test('all pages have the same title', () => {
      const indexTitle = indexDoc.querySelector('title').textContent;
      const frameworksTitle = frameworksDoc.querySelector('title').textContent;
      const sideProjTitle = sideProjDoc.querySelector('title').textContent;

      expect(indexTitle).toBe('Marcelo Costa - SDET Portfolio');
      expect(frameworksTitle).toBe('Marcelo Costa - SDET Portfolio');
      expect(sideProjTitle).toBe('Marcelo Costa - SDET Portfolio');
    });

    test('all pages have viewport meta tag', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const viewport = doc.querySelector('meta[name="viewport"]');
        expect(viewport).toBeTruthy();
        expect(viewport.getAttribute('content')).toContain('width=device-width');
      });
    });

    test('all pages have UTF-8 charset', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const charset = doc.querySelector('meta[http-equiv="Content-Type"]');
        expect(charset).toBeTruthy();
        expect(charset.getAttribute('content')).toContain('UTF-8');
      });
    });

    test('all pages have English language', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const html = doc.querySelector('html');
        expect(html.getAttribute('lang')).toBe('en');
      });
    });
  });

  describe('Professional Branding', () => {
    test('no page contains informal emojis in navigation', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const nav = doc.querySelector('nav').textContent;
        expect(nav).not.toMatch(/😊|😄|🎉|👍/);
      });
    });

    test('all pages reference Marcelo Costa', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const content = doc.body.textContent;
        expect(content).toContain('Marcelo Costa');
      });
    });

    test('all pages have copyright with current year', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const content = doc.body.textContent;
        expect(content).toContain('© 2025');
      });
    });
  });

  describe('Accessibility Features', () => {
    test('all pages have descriptive aria labels for social links', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const githubLink = doc.querySelector('[aria-label="github-link"]');
        const linkedinLink = doc.querySelector('[aria-label="linkedin-link"]');
        const discordLink = doc.querySelector('[aria-label="discord-link"]');

        expect(githubLink).toBeTruthy();
        expect(linkedinLink).toBeTruthy();
        expect(discordLink).toBeTruthy();
      });
    });

    test('all navigation buttons have both icon and text', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const navButtons = doc.querySelectorAll('.nav-btn');
        navButtons.forEach((btn) => {
          const icon = btn.querySelector('i.material-icons');
          const text = btn.textContent.replace(/[a-z_]+/g, '').trim();
          expect(icon).toBeTruthy();
          expect(text.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Responsive Design', () => {
    test('all pages have center-nav element', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const centerNav = doc.querySelectorAll('.center-nav');
        expect(centerNav.length).toBeGreaterThan(0);
      });
    });

    test('all pages use Materialize grid system', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const containers = doc.querySelectorAll('.container');
        const rows = doc.querySelectorAll('.row');
        const cols = doc.querySelectorAll('[class*="col s"]');

        expect(containers.length).toBeGreaterThan(0);
        expect(rows.length).toBeGreaterThan(0);
        expect(cols.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Navigation Behavior', () => {
    test('certificates button opens modern modal on all pages', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const certsBtn = doc.querySelector('.nav-btn-certs');
        expect(certsBtn).toBeTruthy();
        expect(certsBtn.textContent).toContain('Certificates');
        expect(certsBtn.getAttribute('onclick')).toContain('certificateModal.open()');
      });
    });

    test('nav buttons have proper styling classes', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const projectsBtn = doc.querySelector('.nav-btn-projects');
        const frameworksBtn = doc.querySelector('.nav-btn-frameworks');
        const certsBtn = doc.querySelector('.nav-btn-certs');
        expect(projectsBtn).toBeTruthy();
        expect(frameworksBtn).toBeTruthy();
        expect(certsBtn).toBeTruthy();
      });
    });
  });
});
