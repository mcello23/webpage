const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

describe('Favicon Configuration - All HTML Pages', () => {
  const htmlFiles = [
    'index.html',
    'pages/frameworks/index.html',
    'pages/side_proj/index.html',
    'pages/responsive-tester.html',
  ];

  let documents = {};

  beforeAll(() => {
    htmlFiles.forEach((htmlFile) => {
      const htmlPath = path.resolve(__dirname, '..', '..', htmlFile);
      const html = fs.readFileSync(htmlPath, 'utf8');
      const doc = cheerio.load(html);
      documents[htmlFile] = {
        document: doc,
        isSubdirectory: htmlFile.includes('/'),
      };
    });
  });

  htmlFiles.forEach((htmlFile) => {
    describe(`Favicon in ${htmlFile}`, () => {
      let document;
      let isSubdirectory;

      beforeAll(() => {
        document = documents[htmlFile].document;
        isSubdirectory = documents[htmlFile].isSubdirectory;
      });

      describe('PNG Favicons (Browser Compatibility)', () => {
        test('has 32x32 PNG favicon', () => {
          const favicon32 = document('link[rel="icon"][type="image/png"][sizes="32x32"]');
          expect(favicon32.length).toBeGreaterThan(0);
          const href = favicon32.attr('href');
          if (isSubdirectory) {
            expect(href).toMatch(/^(\.\.\/)+favicon\/favicon-32x32\.png$/);
          } else {
            expect(href).toBe('favicon/favicon-32x32.png');
          }
        });

        test('has 16x16 PNG favicon', () => {
          const favicon16 = document('link[rel="icon"][type="image/png"][sizes="16x16"]');
          expect(favicon16.length).toBeGreaterThan(0);
          const href = favicon16.attr('href');
          if (isSubdirectory) {
            expect(href).toMatch(/^(\.\.\/)+favicon\/favicon-16x16\.png$/);
          } else {
            expect(href).toBe('favicon/favicon-16x16.png');
          }
        });

        test('PNG favicons are ordered before SVG (for browser fallback)', () => {
          const iconLinks = document('link[rel="icon"]');
          const linkArray = iconLinks.toArray();

          const png32Index = linkArray.findIndex(
            (link) =>
              document(link).attr('type') === 'image/png' &&
              document(link).attr('sizes') === '32x32'
          );
          const png16Index = linkArray.findIndex(
            (link) =>
              document(link).attr('type') === 'image/png' &&
              document(link).attr('sizes') === '16x16'
          );
          const svgIndex = linkArray.findIndex(
            (link) => document(link).attr('type') === 'image/svg+xml'
          );

          expect(png32Index).toBeGreaterThanOrEqual(0);
          expect(png16Index).toBeGreaterThanOrEqual(0);
          if (svgIndex >= 0) {
            expect(png32Index).toBeLessThan(svgIndex);
            expect(png16Index).toBeLessThan(svgIndex);
          }
        });
      });

      describe('SVG Favicon (Modern Browsers)', () => {
        test('has SVG favicon for modern browsers', () => {
          const svgFavicon = document('link[rel="icon"][type="image/svg+xml"]');
          expect(svgFavicon.length).toBeGreaterThan(0);
          const href = svgFavicon.attr('href');
          if (isSubdirectory) {
            expect(href).toMatch(/^(\.\.\/)+favicon\.svg$/);
          } else {
            expect(href).toBe('favicon.svg');
          }
        });

        test('SVG favicon does not have sizes attribute', () => {
          const svgFavicon = document('link[rel="icon"][type="image/svg+xml"]');
          expect(svgFavicon.attr('sizes')).toBeFalsy();
        });
      });

      describe('Apple Touch Icon (iOS)', () => {
        test('has Apple Touch Icon', () => {
          const appleTouchIcon = document('link[rel="apple-touch-icon"]');
          expect(appleTouchIcon.length).toBeGreaterThan(0);
          const href = appleTouchIcon.attr('href');
          if (isSubdirectory) {
            expect(href).toMatch(/^(\.\.\/)+favicon\/apple-touch-icon\.png$/);
          } else {
            expect(href).toBe('favicon/apple-touch-icon.png');
          }
        });

        test('Apple Touch Icon has correct size', () => {
          const appleTouchIcon = document('link[rel="apple-touch-icon"]');
          expect(appleTouchIcon.attr('sizes')).toBe('180x180');
        });
      });

      describe('Web App Manifest (PWA)', () => {
        test('has web app manifest link', () => {
          const manifest = document('link[rel="manifest"]');
          expect(manifest.length).toBeGreaterThan(0);
          const href = manifest.attr('href');
          if (isSubdirectory) {
            expect(href).toMatch(/^(\.\.\/)+favicon\/site\.webmanifest$/);
          } else {
            expect(href).toBe('favicon/site.webmanifest');
          }
        });

        test('has theme color meta tag', () => {
          const themeColor = document('meta[name="theme-color"]');
          expect(themeColor.length).toBeGreaterThan(0);
          expect(themeColor.attr('content')).toBe('#3F51B5');
        });
      });

      describe('Favicon Paths (Relative vs Absolute)', () => {
        test('all favicon paths are relative (not absolute)', () => {
          const allFaviconLinks = document(
            'link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]'
          );

          allFaviconLinks.each((i, link) => {
            const href = document(link).attr('href');
            expect(href).toBeTruthy();
            expect(href.startsWith('/')).toBe(false);
          });
        });

        test('favicon paths work for both local and GitHub Pages deployment', () => {
          const favicon32 = document('link[rel="icon"][sizes="32x32"]');
          const href = favicon32.attr('href');

          const expectedPattern = isSubdirectory ? /^(\.\.\/|\.\.\/\.\.\/)favicon\// : /^favicon\//;
          expect(href).toMatch(expectedPattern);
          expect(href).not.toMatch(/^\/favicon\//);
        });
      });

      describe('Head Element Structure', () => {
        test('has properly closed head element', () => {
          const htmlString = fs.readFileSync(path.resolve(__dirname, '..', '..', htmlFile), 'utf8');
          expect(htmlString).toMatch(/<\/head>\s*<body/i);
        });

        test('all favicon links are inside head element', () => {
          const allFaviconLinks = document(
            'link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]'
          );
          allFaviconLinks.each((i, link) => {
            expect(document(link).parent().is('head')).toBe(true);
          });
        });

        test('theme-color meta tag is inside head element', () => {
          const themeColor = document('meta[name="theme-color"]');
          expect(themeColor.parent().is('head')).toBe(true);
        });
      });
    });
  });

  describe('Web App Manifest File (site.webmanifest)', () => {
    let manifest;

    beforeAll(() => {
      const manifestPath = path.resolve(__dirname, '..', '..', 'favicon', 'site.webmanifest');
      const manifestContent = fs.readFileSync(manifestPath, 'utf8');
      manifest = JSON.parse(manifestContent);
    });

    test('manifest exists and is valid JSON', () => {
      expect(manifest).toBeTruthy();
      expect(typeof manifest).toBe('object');
    });

    test('has correct app name', () => {
      expect(manifest.name).toBe('Marcelo Costa SDET Portfolio');
      expect(manifest.short_name).toBe('SDET Portfolio');
    });

    test('has theme and background colors', () => {
      expect(manifest.theme_color).toBe('#3F51B5');
      expect(manifest.background_color).toBe('#ffffff');
    });

    test('has display mode set to standalone', () => {
      expect(manifest.display).toBe('standalone');
    });

    test('has PNG icons (not SVG)', () => {
      expect(manifest.icons).toBeTruthy();
      expect(Array.isArray(manifest.icons)).toBe(true);
      expect(manifest.icons.length).toBeGreaterThan(0);

      manifest.icons.forEach((icon) => {
        expect(icon.type).toBe('image/png');
      });
    });

    test('has required icon sizes for PWA', () => {
      const sizes = manifest.icons.map((icon) => icon.sizes);
      expect(sizes).toContain('192x192');
      expect(sizes).toContain('512x512');
    });

    test('icon paths are relative (not absolute)', () => {
      manifest.icons.forEach((icon) => {
        expect(icon.src).toBeTruthy();
        expect(icon.src.startsWith('/')).toBe(false);
        expect(icon.src).toMatch(/^android-chrome-/);
      });
    });

    test('192x192 icon points to correct file', () => {
      const icon192 = manifest.icons.find((icon) => icon.sizes === '192x192');
      expect(icon192).toBeTruthy();
      expect(icon192.src).toBe('android-chrome-192x192.png');
    });

    test('512x512 icon points to correct file', () => {
      const icon512 = manifest.icons.find((icon) => icon.sizes === '512x512');
      expect(icon512).toBeTruthy();
      expect(icon512.src).toBe('android-chrome-512x512.png');
    });
  });

  describe('Favicon Files Existence', () => {
    const faviconFiles = [
      'favicon/favicon-16x16.png',
      'favicon/favicon-32x32.png',
      'favicon/apple-touch-icon.png',
      'favicon/android-chrome-192x192.png',
      'favicon/android-chrome-512x512.png',
      'favicon.svg',
      'favicon/site.webmanifest',
    ];

    faviconFiles.forEach((file) => {
      test(`${file} exists`, () => {
        const filePath = path.resolve(__dirname, '..', '..', file);
        expect(fs.existsSync(filePath)).toBe(true);
      });

      if (file.endsWith('.png')) {
        test(`${file} is a valid PNG file`, () => {
          const filePath = path.resolve(__dirname, '..', '..', file);
          const fileBuffer = fs.readFileSync(filePath);
          const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
          const fileSignature = fileBuffer.slice(0, 8);
          expect(fileSignature.equals(pngSignature)).toBe(true);
        });
      }

      if (file.endsWith('.svg')) {
        test(`${file} is a valid SVG file`, () => {
          const filePath = path.resolve(__dirname, '..', '..', file);
          const content = fs.readFileSync(filePath, 'utf8');
          expect(content).toMatch(/<svg/i);
          expect(content).toMatch(/<\/svg>/i);
        });
      }

      if (file.endsWith('.webmanifest')) {
        test(`${file} is valid JSON`, () => {
          const filePath = path.resolve(__dirname, '..', '..', file);
          const content = fs.readFileSync(filePath, 'utf8');
          expect(() => JSON.parse(content)).not.toThrow();
        });
      }
    });
  });

  describe('Favicon File Sizes (Optimization)', () => {
    test('16x16 PNG is reasonably small (< 1KB)', () => {
      const filePath = path.resolve(__dirname, '..', '..', 'favicon', 'favicon-16x16.png');
      const stats = fs.statSync(filePath);
      expect(stats.size).toBeLessThan(1024);
    });

    test('32x32 PNG is reasonably small (< 2KB)', () => {
      const filePath = path.resolve(__dirname, '..', '..', 'favicon', 'favicon-32x32.png');
      const stats = fs.statSync(filePath);
      expect(stats.size).toBeLessThan(2048);
    });

    test('Apple touch icon exists and is not too large (< 10KB)', () => {
      const filePath = path.resolve(__dirname, '..', '..', 'favicon', 'apple-touch-icon.png');
      const stats = fs.statSync(filePath);
      expect(stats.size).toBeLessThan(10240);
    });

    test('Android chrome icons are optimized', () => {
      const icon192Path = path.resolve(
        __dirname,
        '..',
        '..',
        'favicon',
        'android-chrome-192x192.png'
      );
      const icon512Path = path.resolve(
        __dirname,
        '..',
        '..',
        'favicon',
        'android-chrome-512x512.png'
      );
      const stats192 = fs.statSync(icon192Path);
      const stats512 = fs.statSync(icon512Path);
      expect(stats192.size).toBeLessThan(10240);
      expect(stats512.size).toBeLessThan(20480);
    });
  });

  describe('Favicon SVG Content', () => {
    let svgContent;
    beforeAll(() => {
      const svgPath = path.resolve(__dirname, '..', '..', 'favicon.svg');
      svgContent = fs.readFileSync(svgPath, 'utf8');
    });
    test('SVG has proper XML declaration', () => {
      expect(svgContent).toMatch(/^<\?xml/);
    });
    test('SVG has viewBox for scalability', () => {
      expect(svgContent).toMatch(/viewBox/i);
    });
    test('SVG contains visual elements', () => {
      const hasPath = svgContent.includes('<path');
      const hasRect = svgContent.includes('<rect');
      const hasCircle = svgContent.includes('<circle');
      expect(hasPath || hasRect || hasCircle).toBe(true);
    });
  });

  describe('Cross-Page Favicon Consistency', () => {
    test('all pages use the same favicon setup', () => {
      const files = [
        { name: 'index.html', doc: documents['index.html'].document, isInSubdir: false },
        {
          name: 'pages/frameworks/index.html',
          doc: documents['pages/frameworks/index.html'].document,
          isInSubdir: true,
        },
        {
          name: 'pages/side_proj/index.html',
          doc: documents['pages/side_proj/index.html'].document,
          isInSubdir: true,
        },
        {
          name: 'pages/responsive-tester.html',
          doc: documents['pages/responsive-tester.html'].document,
          isInSubdir: true,
        },
      ];

      const faviconSetups = files.map((file) => {
        const doc = file.doc;
        const isInSubdir = file.isInSubdir;

        return {
          file: file.name,
          isInSubdir,
          png32: doc('link[rel="icon"][sizes="32x32"]').attr('href'),
          png16: doc('link[rel="icon"][sizes="16x16"]').attr('href'),
          svg: doc('link[rel="icon"][type="image/svg+xml"]').attr('href'),
          apple: doc('link[rel="apple-touch-icon"]').attr('href'),
          manifest: doc('link[rel="manifest"]').attr('href'),
          themeColor: doc('meta[name="theme-color"]').attr('content'),
        };
      });

      faviconSetups.forEach((setup) => {
        if (setup.isInSubdir) {
          expect(setup.png32).toMatch(/^(\.\.\/|\.\.\/\.\.\/)+favicon\/favicon-32x32\.png$/);
          expect(setup.png16).toMatch(/^(\.\.\/|\.\.\/\.\.\/)+favicon\/favicon-16x16\.png$/);
          expect(setup.svg).toMatch(/^(\.\.\/|\.\.\/\.\.\/)+favicon\.svg$/);
          expect(setup.apple).toMatch(/^(\.\.\/|\.\.\/\.\.\/)+favicon\/apple-touch-icon\.png$/);
          expect(setup.manifest).toMatch(/^(\.\.\/|\.\.\/\.\.\/)+favicon\/site\.webmanifest$/);
        } else {
          expect(setup.png32).toBe('favicon/favicon-32x32.png');
          expect(setup.png16).toBe('favicon/favicon-16x16.png');
          expect(setup.svg).toBe('favicon.svg');
          expect(setup.apple).toBe('favicon/apple-touch-icon.png');
          expect(setup.manifest).toBe('favicon/site.webmanifest');
        }
        expect(setup.themeColor).toBe('#3F51B5');
      });
    });

    test('all pages have the same number of favicon-related links', () => {
      const files = [
        { name: 'index.html', doc: documents['index.html'].document },
        {
          name: 'pages/frameworks/index.html',
          doc: documents['pages/frameworks/index.html'].document,
        },
        {
          name: 'pages/side_proj/index.html',
          doc: documents['pages/side_proj/index.html'].document,
        },
        {
          name: 'pages/responsive-tester.html',
          doc: documents['pages/responsive-tester.html'].document,
        },
      ];

      const counts = files.map((file) => {
        return {
          file: file.name,
          count: file.doc('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]')
            .length,
        };
      });

      const firstCount = counts[0].count;
      counts.forEach((item) => {
        expect(item.count).toBe(firstCount);
      });
    });
  });
});
