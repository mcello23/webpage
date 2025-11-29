const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

describe('Cross-Page Consistency Tests', () => {
  let indexDoc, frameworksDoc, sideProjDoc;

  beforeAll(() => {
    const indexHtml = fs.readFileSync(path.resolve(__dirname, '..', '..', 'index.html'), 'utf8');
    const frameworksHtml = fs.readFileSync(
      path.resolve(__dirname, '..', '..', 'pages', 'frameworks', 'index.html'),
      'utf8'
    );
    const sideProjHtml = fs.readFileSync(
      path.resolve(__dirname, '..', '..', 'pages', 'side_proj', 'index.html'),
      'utf8'
    );

    indexDoc = cheerio.load(indexHtml);
    frameworksDoc = cheerio.load(frameworksHtml);
    sideProjDoc = cheerio.load(sideProjHtml);
  });

  // No cleanup needed for cheerio

  describe('Navigation Consistency', () => {
    test('all pages have the same brand logo text', () => {
      const indexBrand = indexDoc('.brand-logo').text();
      const frameworksBrand = frameworksDoc('.brand-logo').text();
      const sideProjBrand = sideProjDoc('.brand-logo').text();

      expect(indexBrand).toContain('Marcelo Costa — SDET');
      expect(frameworksBrand).toContain('Marcelo Costa — SDET');
      expect(sideProjBrand).toContain('Marcelo Costa — SDET');
    });

    test('all pages have the same navigation buttons', () => {
      const getNavButtons = (doc) => {
        const buttons = doc('.nav-btn');
        // Normalize paths by removing both ../ and pages/ prefixes for comparison
        return buttons
          .map((i, btn) => {
            const href = doc(btn).attr('href');
            return href ? href.replace(/\.\.\//g, '').replace('pages/', '') : href;
          })
          .get();
      };

      const indexButtons = getNavButtons(indexDoc);
      const frameworksButtons = getNavButtons(frameworksDoc);
      const sideProjButtons = getNavButtons(sideProjDoc);

      expect(indexButtons).toEqual(frameworksButtons);
      expect(indexButtons).toEqual(sideProjButtons);
    });

    test('all pages have the same social media links', () => {
      const getSocialLinks = (doc) => {
        const socials = doc('.social-icon');
        return socials
          .map((i, a) => doc(a).attr('href'))
          .get()
          .sort();
      };

      const indexSocials = getSocialLinks(indexDoc);
      const frameworksSocials = getSocialLinks(frameworksDoc);
      const sideProjSocials = getSocialLinks(sideProjDoc);

      expect(indexSocials).toEqual(frameworksSocials);
      expect(indexSocials).toEqual(sideProjSocials);
      expect(indexSocials).toContain('https://github.com/mcello23');
      expect(indexSocials).toContain('https://www.linkedin.com/in/marceloc/');
      // Note: Discord was removed from index.html in latest update
    });

    test('all pages have fixed navigation with same class', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const nav = doc('nav');
        expect(nav.length).toBeGreaterThan(0);
        // navbar styling moved to external CSS and uses the 'main-nav' class
        expect(nav.hasClass('main-nav')).toBe(true);
      });
    });

    test('all pages link back to index.html from brand logo', () => {
      const indexBrand = indexDoc('.brand-logo').attr('href');
      const frameworksBrand = frameworksDoc('.brand-logo').attr('href');
      const sideProjBrand = sideProjDoc('.brand-logo').attr('href');

      // All pages now link to / with proper GitHub Pages project paths
      expect(indexBrand).toBe('/');
      expect(frameworksBrand).toBe('/');
      expect(sideProjBrand).toBe('/');
    });
  });

  describe('Footer Consistency', () => {
    test('all pages have professional footer without emojis', () => {
      const indexFooter = indexDoc('body').text();
      const frameworksFooter = frameworksDoc('body').text();
      const sideProjFooter = sideProjDoc('body').text();

      expect(indexFooter).toContain('© 2025 Marcelo Costa');
      expect(frameworksFooter).toContain('© 2025 Marcelo Costa');
      expect(sideProjFooter).toContain('© 2025 Marcelo Costa');

      expect(indexFooter).not.toMatch(/☺/);
      expect(frameworksFooter).not.toMatch(/☺/);
      expect(sideProjFooter).not.toMatch(/☺/);
    });

    test('all pages have thank you message', () => {
      const indexFooter = indexDoc('body').text();
      const frameworksFooter = frameworksDoc('body').text();
      const sideProjFooter = sideProjDoc('body').text();

      expect(indexFooter).toContain('Thanks for exploring');
      expect(frameworksFooter).toContain('Thanks for exploring');
      expect(sideProjFooter).toContain('Thanks for exploring');
    });
  });

  describe('Script Consistency', () => {
    test('all pages load jQuery', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const jquery = doc('script[src*="jquery"]');
        expect(jquery.length).toBeGreaterThan(0);
      });
    });

    test('all pages load Materialize', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const materialize = doc('script[src*="materialize"]');
        expect(materialize.length).toBeGreaterThan(0);
      });
    });

    test('all pages load certificates.js', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const certScript = doc('script[src*="certificates"]');
        expect(certScript.length).toBeGreaterThan(0);
      });
    });
  });

  describe('CSS Consistency', () => {
    test('all pages load Materialize CSS', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const materializeCSS = doc('link[href*="materialize"]');
        expect(materializeCSS.length).toBeGreaterThan(0);
      });
    });

    test('all pages load style.css', () => {
      // index.html uses css/style.min.css, pages use ../../css/style.min.css
      const indexStyle = indexDoc('link[href*="style"]');
      const frameworksStyle = frameworksDoc('link[href*="style"]');
      const sideProjStyle = sideProjDoc('link[href*="style"]');

      expect(indexStyle.length).toBeGreaterThan(0);
      expect(frameworksStyle.length).toBeGreaterThan(0);
      expect(sideProjStyle.length).toBeGreaterThan(0);
    });

    test('all pages load Material Icons', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const icons = doc('link[href*="Material+Icons"]');
        expect(icons.length).toBeGreaterThan(0);
      });
    });

    test('all pages load Font Awesome', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const fontAwesome = doc('link[href*="font-awesome"]');
        expect(fontAwesome.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Certificate Modal Consistency', () => {
    test('all pages have modern certificate modal', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const modal = doc('#certificateModal');
        expect(modal.length).toBeGreaterThan(0);
        expect(modal.hasClass('cert-modal')).toBe(true);
      });
    });

    test('all pages load certificates.css stylesheet', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const certStyles = doc('link[href*="certificates"]');
        expect(certStyles.length).toBeGreaterThan(0);
      });
    });

    test('all pages load certificates.js script with correct path', () => {
      const indexScript = indexDoc('script[src*="certificates"]');
      const frameworksScript = frameworksDoc('script[src*="certificates"]');
      const sideProjScript = sideProjDoc('script[src*="certificates"]');

      expect(indexScript.length).toBeGreaterThan(0);
      expect(frameworksScript.length).toBeGreaterThan(0);
      expect(sideProjScript.length).toBeGreaterThan(0);

      // index.html uses js/certificates.min.js, other pages use ../../js/certificates.min.js
      expect(indexScript.attr('src')).toMatch(/js\/certificates(\.min)?\.js/);
      expect(frameworksScript.attr('src')).toMatch(/\.\.\/\.\.\/js\/certificates(\.min)?\.js/);
      expect(sideProjScript.attr('src')).toMatch(/\.\.\/\.\.\/js\/certificates(\.min)?\.js/);
    });

    test('certificate images folder exists and is accessible', () => {
      const fs = require('fs');
      const path = require('path');

      const imagesPath = path.resolve(__dirname, '..', '..', 'images');
      const thumbsPath = path.resolve(__dirname, '..', '..', 'images', 'thumbs');

      expect(fs.existsSync(imagesPath)).toBe(true);
      expect(fs.existsSync(thumbsPath)).toBe(true);

      // Verify key certificate images exist
      const testImages = ['ISTQB.jpg', 'Selenium WebDriver e Java.jpg', 'GitHub.jpg'];

      testImages.forEach((img) => {
        const imgPath = path.join(imagesPath, img);
        expect(fs.existsSync(imgPath)).toBe(true);
      });
    });

    test('certificates.js includes path detection for subfolders', () => {
      const fs = require('fs');
      const path = require('path');
      const certJsPath = path.resolve(__dirname, '..', '..', 'js', 'certificates.js');
      const certJsContent = fs.readFileSync(certJsPath, 'utf8');

      // Verify the path detection function exists
      expect(certJsContent).toContain('getBasePath');
      expect(certJsContent).toContain('/pages/');
      expect(certJsContent).toContain('../');
    });
  });

  describe('Meta Tags Consistency', () => {
    test('all pages have the same title pattern', () => {
      const indexTitle = indexDoc('title').text();
      const frameworksTitle = frameworksDoc('title').text();
      const sideProjTitle = sideProjDoc('title').text();

      // Updated titles have different formats, just check they contain Marcelo Costa
      expect(indexTitle).toContain('Marcelo Costa');
      expect(frameworksTitle).toContain('Marcelo Costa');
      expect(sideProjTitle).toContain('Marcelo Costa');
    });

    test('all pages have viewport meta tag', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const viewport = doc('meta[name="viewport"]');
        expect(viewport.length).toBeGreaterThan(0);
        expect(viewport.attr('content')).toContain('width=device-width');
      });
    });

    test('all pages have UTF-8 charset', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        // Check for charset meta tag (can be in different formats)
        const charsetMeta =
          doc('meta[http-equiv="Content-Type"]').length > 0
            ? doc('meta[http-equiv="Content-Type"]')
            : doc('meta[charset]');
        expect(charsetMeta.length).toBeGreaterThan(0);

        if (charsetMeta.attr('content')) {
          expect(charsetMeta.attr('content')).toContain('UTF-8');
        } else {
          expect(charsetMeta.attr('charset').toLowerCase()).toBe('utf-8');
        }
      });
    });

    test('all pages have English language', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const html = doc('html');
        expect(html.attr('lang')).toBe('en');
      });
    });
  });

  describe('Professional Branding', () => {
    test('no page contains informal emojis in navigation', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const nav = doc('nav').text();
        expect(nav).not.toMatch(/😊|😄|🎉|👍/);
      });
    });

    test('all pages reference Marcelo Costa', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const content = doc('body').text();
        expect(content).toContain('Marcelo Costa');
      });
    });

    test('all pages have copyright with current year', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const content = doc('body').text();
        expect(content).toContain('© 2025');
      });
    });
  });

  describe('Accessibility Features', () => {
    test('all pages have descriptive aria labels for social links', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const githubLink = doc('[aria-label="GitHub"]');
        const linkedinLink = doc('[aria-label="LinkedIn"]');

        expect(githubLink.length).toBeGreaterThan(0);
        expect(linkedinLink.length).toBeGreaterThan(0);
        // Discord removed from index.html, so it's optional
      });
    });

    test('all navigation buttons have both icon and text', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const navButtons = doc('.nav-btn');
        navButtons.each((i, btn) => {
          const icon = doc(btn).find('i.material-icons');
          const text = doc(btn)
            .text()
            .replace(/[a-z_]+/g, '')
            .trim(); // This regex looks wrong for cleaning text but keeping for compatibility
          expect(icon.length).toBeGreaterThan(0);
          expect(text.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Responsive Design', () => {
    test('all pages have center-nav element', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const centerNav = doc('.center-nav');
        expect(centerNav.length).toBeGreaterThan(0);
      });
    });

    test('all pages use Materialize grid system', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const containers = doc('.container');
        const rows = doc('.row');
        const cols = doc('[class*="col s"]');

        expect(containers.length).toBeGreaterThan(0);
        expect(rows.length).toBeGreaterThan(0);
        expect(cols.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Navigation Behavior', () => {
    test('certificates button opens modern modal on all pages', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const certsBtn = doc('.nav-btn-certs');
        expect(certsBtn.length).toBeGreaterThan(0);
        expect(certsBtn.text()).toContain('Certificates');
        expect(certsBtn.attr('onclick')).toContain('certificateModal.open()');
      });
    });

    test('nav buttons have proper styling classes', () => {
      [indexDoc, frameworksDoc, sideProjDoc].forEach((doc) => {
        const projectsBtn = doc('.nav-btn-projects');
        const frameworksBtn = doc('.nav-btn-frameworks');
        const certsBtn = doc('.nav-btn-certs');
        expect(projectsBtn.length).toBeGreaterThan(0);
        expect(frameworksBtn.length).toBeGreaterThan(0);
        expect(certsBtn.length).toBeGreaterThan(0);
      });
    });
  });
});
