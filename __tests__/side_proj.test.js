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
    const htmlPath = path.resolve(__dirname, '..', 'side_proj.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
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
      expect(brand.getAttribute('href')).toBe('index.html');
      expect(brand.textContent).toContain('Marcelo Costa - SDET Portfolio');
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
      expect(hrefs).toContain('side_proj.html');
      expect(hrefs).toContain('frameworks.html');
      expect(hrefs).toContain('#modal1');
    });

    test('social icons are present and correctly linked', () => {
      const githubLink = document.querySelector('[aria-label="github-link"]');
      const linkedinLink = document.querySelector('[aria-label="linkedin-link"]');
      const discordLink = document.querySelector('[aria-label="discord-link"]');

      expect(githubLink).toBeTruthy();
      expect(linkedinLink).toBeTruthy();
      expect(discordLink).toBeTruthy();

      expect(githubLink.getAttribute('href')).toBe('https://github.com/mcello23');
      expect(linkedinLink.getAttribute('href')).toBe('https://www.linkedin.com/in/marceloc/');
      expect(discordLink.getAttribute('href')).toBe('https://discord.com/users/mcello.654');
    });

    test('has Font Awesome social icons', () => {
      const githubIcon = document.querySelector('.fa-github');
      const linkedinIcon = document.querySelector('.fa-linkedin');
      const discordIcon = document.querySelector('.fa-discord');

      expect(githubIcon).toBeTruthy();
      expect(linkedinIcon).toBeTruthy();
      expect(discordIcon).toBeTruthy();
    });
  });

  describe('AI Test Plan Generator Project', () => {
    test('has project main heading', () => {
      const heading = document.querySelector('#title-ai');
      expect(heading).toBeTruthy();
      expect(heading.textContent).toContain('AI Test Plan Generator');
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
      expect(content).toContain('AI-powered test case generation');
      expect(content).toContain('multiple testing types');
      expect(content).toContain('Multi-platform support');
      expect(content).toContain('Export to JSON and Markdown');
    });

    test('mentions testing types', () => {
      const content = document.body.textContent;
      expect(content).toContain('unit');
      expect(content).toContain('integration');
      expect(content).toContain('e2e');
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

    test('has TypeScript code example', () => {
      const codeBlock = document.querySelector('code.language-typescript');
      expect(codeBlock).toBeTruthy();
    });

    test('code example includes TestPlanGenerator class', () => {
      const codeBlock = document.querySelector('code.language-typescript');
      expect(codeBlock.textContent).toContain('TestPlanGenerator');
      expect(codeBlock.textContent).toContain('generateTestPlan');
    });

    test('code example shows OpenAI integration', () => {
      const codeBlock = document.querySelector('code.language-typescript');
      expect(codeBlock.textContent).toContain('openai');
      expect(codeBlock.textContent).toContain('gpt-4');
      expect(codeBlock.textContent).toContain('chat.completions.create');
    });

    test('code example demonstrates async/await', () => {
      const codeBlock = document.querySelector('code.language-typescript');
      expect(codeBlock.textContent).toContain('async');
      expect(codeBlock.textContent).toContain('await');
    });
  });

  describe('Footer', () => {
    test('has professional footer', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Thank you for exploring my testing portfolio');
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

  describe('Modal', () => {
    test('has certificates modal', () => {
      const modal = document.querySelector('#modal1');
      expect(modal).toBeTruthy();
      expect(modal.classList.contains('modal')).toBe(true);
    });

    test('modal has juicebox container', () => {
      const container = document.querySelector('#juicebox-container');
      expect(container).toBeTruthy();
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

    test('loads Juicebox for modal', () => {
      const juiceboxScript = document.querySelector('script[src*="juicebox"]');
      expect(juiceboxScript).toBeTruthy();
    });

    test('has modal initialization script', () => {
      const scripts = Array.from(document.querySelectorAll('script'))
        .map((s) => s.textContent)
        .join('');
      expect(scripts).toContain('DOMContentLoaded');
      expect(scripts).toContain('Modal.init');
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
      expect(hrefs).toContain('css/materialize.css');
      expect(hrefs).toContain('css/style.css');
      expect(hrefs).toContain('./css/prism.css');
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
      const h4 = document.querySelector('h4');

      expect(h3).toBeTruthy();
      expect(h4).toBeTruthy();
    });

    test('headings have proper classes', () => {
      const mainHeading = document.querySelector('#title-ai');
      expect(mainHeading.classList.contains('title-frame')).toBe(true);
      expect(mainHeading.classList.contains('dark')).toBe(true);
    });

    test('has descriptive paragraphs', () => {
      const paragraphs = document.querySelectorAll('p.text-accent-2');
      expect(paragraphs.length).toBeGreaterThan(0);
    });
  });

  describe('Code Examples', () => {
    test('has code container', () => {
      const codeContainer = document.querySelector('.code-container');
      expect(codeContainer).toBeTruthy();
    });

    test('uses Prism for syntax highlighting', () => {
      const codeBlock = document.querySelector('code[class*="language-"]');
      expect(codeBlock).toBeTruthy();
    });

    test('code block is TypeScript', () => {
      const codeBlock = document.querySelector('code.language-typescript');
      expect(codeBlock).toBeTruthy();
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
