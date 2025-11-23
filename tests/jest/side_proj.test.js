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

describe('Side Projects Page', () => {
  let dom;
  let document;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '..', '..', 'pages', 'side_proj', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  afterAll(() => {
    if (dom && dom.window) dom.window.close();
  });

  describe('Page Introduction', () => {
    test('has introduction section', () => {
      const introSection = document.querySelector('.section');
      expect(introSection).toBeTruthy();
    });

    test('has main page heading', () => {
      const heading = document.querySelector('h1.header');
      expect(heading).toBeTruthy();
      expect(heading.textContent).toContain('Side Projects');
    });

    test('has descriptive subtitle', () => {
      const subtitle = document.querySelector('p.flow-text');
      expect(subtitle).toBeTruthy();
      expect(subtitle.textContent).toContain('automation');
    });
  });

  describe('Project Separators', () => {
    test('has parallax containers for visual separation', () => {
      const parallaxContainers = document.querySelectorAll('.parallax-container');
      expect(parallaxContainers.length).toBeGreaterThanOrEqual(2);
    });

    test('AI Test Plan separator has correct styling', () => {
      const aiSeparator = document.querySelector('.hero-ai');
      expect(aiSeparator).toBeTruthy();
      expect(aiSeparator.classList.contains('parallax-container')).toBe(true);
    });

    test('Python Music Downloader separator has correct styling', () => {
      const pythonSeparator = document.querySelector('.hero-playwright-alt');
      expect(pythonSeparator).toBeTruthy();
      expect(pythonSeparator.classList.contains('parallax-container')).toBe(true);
    });

    test('separators have animated decorative elements', () => {
      const parallaxContainers = document.querySelectorAll('.parallax-container');
      parallaxContainers.forEach((container) => {
        const decorativeElements = container.querySelectorAll('div[style*="position: absolute"]');
        expect(decorativeElements.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Navigation Bar', () => {
    test('has a fixed nav at the top', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();
      // navbar moved to external stylesheet and uses 'main-nav' class
      expect(nav.classList.contains('main-nav')).toBe(true);
    });

    test('has brand logo with link to index', () => {
      const brand = document.querySelector('a.brand-logo');
      expect(brand).toBeTruthy();
      // Using Jekyll pretty URLs now, all pages link to root
      expect(brand.getAttribute('href')).toBe('/');
      expect(brand.textContent).toContain('Marcelo Costa — SDET');
    });

    test('center nav has three main buttons', () => {
      const centerNav = document.querySelector('ul.center-nav');
      expect(centerNav).toBeTruthy();
      const buttons = centerNav.querySelectorAll('a.nav-btn');
      expect(buttons.length).toBe(3);
    });

    test('navigation buttons have correct labels', () => {
      const buttons = document.querySelectorAll('a.nav-btn');
      const labels = Array.from(buttons).map(getTextWithoutIcons);
      expect(labels).toContain('Side Projects');
      expect(labels).toContain('Frameworks');
      expect(labels).toContain('Certificates');
    });

    test('navigation buttons have correct hrefs', () => {
      const buttons = document.querySelectorAll('a.nav-btn');
      const hrefs = Array.from(buttons).map((btn) => btn.getAttribute('href'));
      // Using Jekyll pretty URLs
      expect(hrefs).toContain('/pages/side_proj/');
      expect(hrefs).toContain('/pages/frameworks/');
      expect(hrefs).toContain('#');
    });

    test('social icons are present and correctly linked', () => {
      const githubLink = document.querySelector('[aria-label="GitHub"]');
      const linkedinLink = document.querySelector('[aria-label="LinkedIn"]');

      expect(githubLink).toBeTruthy();
      expect(linkedinLink).toBeTruthy();

      expect(githubLink.getAttribute('href')).toBe('https://github.com/mcello23');
      expect(linkedinLink.getAttribute('href')).toBe('https://www.linkedin.com/in/marceloc/');
      // Discord removed in navbar update
    });

    test('has Font Awesome social icons', () => {
      const githubIcon = document.querySelector('.fa-github');
      const linkedinIcon = document.querySelector('.fa-linkedin');

      expect(githubIcon).toBeTruthy();
      expect(linkedinIcon).toBeTruthy();
      // Discord icon removed in navbar update
    });
  });

  describe('AI Test Plan Generator Project', () => {
    test('has project main heading in separator', () => {
      const content = document.body.textContent;
      expect(content).toContain('AI Test Plan Generator');
    });

    test('has subtitle with technologies', () => {
      const subtitle = document.querySelector('#title-ai2');
      expect(subtitle).toBeTruthy();
      expect(subtitle.textContent).toContain('OpenAI GPT-4');
      expect(subtitle.textContent).toContain('Node.js');
      expect(subtitle.textContent).toContain('TypeScript');
    });

    test('displays OpenAI logo', () => {
      const openaiLogo = document.querySelector('img[alt="openai-logo"]');
      expect(openaiLogo).toBeTruthy();
      expect(openaiLogo.getAttribute('src')).toContain('OpenAI');
    });

    test('displays TypeScript logo', () => {
      const tsLogo = document.querySelector('img[alt="typescript-logo"]');
      expect(tsLogo).toBeTruthy();
      expect(tsLogo.getAttribute('src')).toContain('Typescript');
    });

    test('describes AI-powered test plan generation', () => {
      const content = document.body.textContent;
      expect(content).toContain('AI-powered test plan generator');
      expect(content).toContain("OpenAI's GPT-4");
      expect(content).toContain('comprehensive, structured test plans');
    });

    test('mentions CLI and web interface', () => {
      const content = document.body.textContent;
      expect(content).toContain('CLI interface');
      expect(content).toContain('web interface');
    });

    test('lists key features', () => {
      const content = document.body.textContent;
      expect(content).toContain('Key Features');
      expect(content).toContain('AI-Powered Intelligence');
      expect(content).toContain('Multiple Testing Types');
      expect(content).toContain('Multi-Platform Support');
      expect(content).toContain('Flexible Export Options');
    });

    test('mentions testing types', () => {
      const content = document.body.textContent;
      expect(content).toContain('unit');
      expect(content).toContain('integration');
      expect(content).toContain('E2E testing');
    });

    test('mentions platform support', () => {
      const content = document.body.textContent;
      expect(content).toContain('web');
      expect(content).toContain('mobile');
      expect(content).toContain('API');
      expect(content).toContain('desktop');
    });

    test('has GitHub repository link', () => {
      const repoLink = document.querySelector('a[href*="ai-test-plan-generator"]');
      expect(repoLink).toBeTruthy();
      expect(repoLink.textContent).toContain('GitHub project');
    });
  });

  describe('Python Music Downloader Project', () => {
    test('has project title', () => {
      const content = document.body.textContent;
      expect(content).toContain('Python Music Downloader');
    });

    test('has subtitle', () => {
      const content = document.body.textContent;
      expect(content).toContain('YouTube to MP3');
      expect(content).toContain('yt-dlp');
    });

    test('describes the project functionality', () => {
      const content = document.body.textContent;
      expect(content).toContain('YouTube');
      expect(content).toContain('MP3');
      expect(content).toContain('automation');
    });

    test('mentions key technologies', () => {
      const content = document.body.textContent;
      expect(content).toContain('yt-dlp');
      expect(content).toContain('youtubesearchpython');
      expect(content).toContain('FFmpeg');
    });

    test('lists key features', () => {
      const content = document.body.textContent;
      expect(content).toContain('Key Features');
      expect(content).toContain('Smart YouTube Search');
      expect(content).toContain('High-Quality Audio');
      expect(content).toContain('Batch Processing');
      expect(content).toContain('FFmpeg Integration');
    });

    test('mentions audio quality', () => {
      const content = document.body.textContent;
      expect(content).toContain('192 kbps');
    });

    test('has GitHub repository link', () => {
      const repoLink = document.querySelector('a[href*="python-music-download"]');
      expect(repoLink).toBeTruthy();
      expect(repoLink.textContent).toContain('GitHub project');
    });

    test('has Python logo image', () => {
      const pythonLogo = document.querySelector('img[alt="python-logo"]');
      expect(pythonLogo).toBeTruthy();
    });

    test('has YouTube logo image', () => {
      const youtubeLogo = document.querySelector('img[alt="youtube-logo"]');
      expect(youtubeLogo).toBeTruthy();
    });
  });

  describe('Footer', () => {
    test('has professional footer', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Thanks for exploring my testing portfolio');
      expect(pageText).toContain('© 2025 Marcelo Costa');
      expect(pageText).toContain('Senior QA Engineer');
    });

    test('footer does not have emojis', () => {
      const footerText = document.body.textContent;
      expect(footerText).not.toMatch(/Thanks for.*☺/);
    });

    test('footer has LinkedIn connect button', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain("Let's Connect");
      expect(pageText).toContain('Ready to build robust, scalable testing solutions together');
    });
  });

  describe('Certificate Modal', () => {
    test('has modern certificate modal container', () => {
      const modal = document.querySelector('#certificateModal');
      expect(modal).toBeTruthy();
      expect(modal.classList.contains('cert-modal')).toBe(true);
    });

    test('certificate modal loads certificates.css stylesheet', () => {
      const certStyles = document.querySelector('link[href*="certificates"]');
      expect(certStyles).toBeTruthy();
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

    test('loads Prism for syntax highlighting', () => {
      const prismScript = document.querySelector('script[src*="prism"]');
      expect(prismScript).toBeTruthy();
    });

    test('loads certificates.js for modern certificate modal', () => {
      const certScript = document.querySelector('script[src*="certificates"]');
      expect(certScript).toBeTruthy();
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

    test('has correct title', () => {
      const title = document.querySelector('title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('Marcelo Costa - SDET Portfolio');
    });

    test('has viewport meta tag', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    test('loads required CSS files', () => {
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      expect(cssLinks.length).toBeGreaterThan(0);

      const hrefs = Array.from(cssLinks).map((link) => link.getAttribute('href'));
      expect(hrefs.some((href) => href && href.includes('materialize'))).toBeTruthy();
      expect(hrefs.some((href) => href && href.includes('style'))).toBeTruthy();
      expect(hrefs).toContain('../../css/prism.css');
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

  describe('Content Container', () => {
    test('has centered container', () => {
      const container = document.querySelector('.container.center-align');
      expect(container).toBeTruthy();
    });

    test('container has proper spacing', () => {
      const content = document.querySelector('.container .section');
      expect(content).toBeTruthy();
    });
  });

  describe('Images', () => {
    test('all images have alt text', () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        expect(img.getAttribute('alt')).toBeTruthy();
      });
    });

    test('logo images have proper styling', () => {
      const logos = document.querySelectorAll('img[class*="image-"]');
      logos.forEach((logo) => {
        const style = logo.getAttribute('style');
        expect(style).toBeTruthy();
      });
    });
  });

  describe('Typography', () => {
    test('has multiple heading levels', () => {
      const h3 = document.querySelector('h3');

      expect(h3).toBeTruthy();
    });

    test('headings have proper classes', () => {
      const subtitle = document.querySelector('#title-ai2');
      expect(subtitle).toBeTruthy();
      expect(subtitle.classList.contains('mdi-content-send')).toBe(true);
      expect(subtitle.classList.contains('dark')).toBe(true);
    });

    test('has descriptive paragraphs', () => {
      const paragraphs = document.querySelectorAll('p.text-accent-2');
      expect(paragraphs.length).toBeGreaterThan(0);
    });
  });

  describe('Links and Navigation', () => {
    test('GitHub button has proper styling', () => {
      const githubBtn = document.querySelector('#download-button-ai');
      expect(githubBtn).toBeTruthy();
      expect(githubBtn.classList.contains('btn-large')).toBe(true);
      expect(githubBtn.classList.contains('waves-effect')).toBe(true);
    });

    test('external links open properly', () => {
      const githubLink = document.querySelector('a[href*="github.com/mcello23"]');
      expect(githubLink).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    test('nav buttons have icons and text', () => {
      const navButtons = document.querySelectorAll('a.nav-btn');
      navButtons.forEach((btn) => {
        const icon = btn.querySelector('.material-icons');
        expect(icon).toBeTruthy();
        expect(btn.textContent.trim().length).toBeGreaterThan(0);
      });
    });

    test('social links have aria labels', () => {
      const socialLinks = document.querySelectorAll('.social-icon');
      socialLinks.forEach((link) => {
        expect(link.getAttribute('aria-label')).toBeTruthy();
      });
    });

    test('images have descriptive alt text', () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        const alt = img.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt.length).toBeGreaterThan(0);
      });
    });
  });
});
