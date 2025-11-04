const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Responsive Breakpoint Tester Page', () => {
  let dom;
  let document;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '..', 'pages/responsive-tester.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
    });
    document = dom.window.document;
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
      expect(title.textContent).toBe('Responsive Breakpoint Tester - Marcelo Costa Portfolio');
    });

    test('has viewport meta tag', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    test('has charset meta tag', () => {
      const charset = document.querySelector('meta[charset]');
      expect(charset).toBeTruthy();
      expect(charset.getAttribute('charset')).toBe('UTF-8');
    });

    test('has main container', () => {
      const container = document.querySelector('.container');
      expect(container).toBeTruthy();
    });
  });

  describe('Header Section', () => {
    test('has main heading', () => {
      const heading = document.querySelector('h1');
      expect(heading).toBeTruthy();
      expect(heading.textContent).toContain('Responsive Breakpoint Tester');
    });

    test('heading contains emoji', () => {
      const heading = document.querySelector('h1');
      expect(heading.textContent).toMatch(/📱/);
    });
  });

  describe('Current Viewport Display', () => {
    test('has current viewport section', () => {
      const viewport = document.querySelector('.current-viewport');
      expect(viewport).toBeTruthy();
    });

    test('has viewport heading', () => {
      const viewport = document.querySelector('.current-viewport');
      const heading = viewport.querySelector('h2');
      expect(heading).toBeTruthy();
    });

    test('has viewport info display', () => {
      const viewportInfo = document.querySelector('.viewport-info');
      expect(viewportInfo).toBeTruthy();
    });

    test('has width display element', () => {
      const widthElement = document.querySelector('#width');
      expect(widthElement).toBeTruthy();
    });

    test('has height display element', () => {
      const heightElement = document.querySelector('#height');
      expect(heightElement).toBeTruthy();
    });

    test('viewport info contains correct labels', () => {
      const viewportInfo = document.querySelector('.viewport-info');
      expect(viewportInfo.textContent).toContain('Current Width:');
      expect(viewportInfo.textContent).toContain('Height:');
      expect(viewportInfo.textContent).toContain('px');
    });
  });

  describe('Breakpoint Cards', () => {
    test('has breakpoint list container', () => {
      const breakpointList = document.querySelector('.breakpoint-list');
      expect(breakpointList).toBeTruthy();
    });

    test('has exactly 5 breakpoint cards', () => {
      const cards = document.querySelectorAll('.breakpoint-card');
      expect(cards.length).toBe(5);
    });

    test('each breakpoint card has unique id', () => {
      const cards = document.querySelectorAll('.breakpoint-card');
      const ids = Array.from(cards).map((card) => card.id);

      expect(ids).toContain('mobile-portrait');
      expect(ids).toContain('mobile-landscape');
      expect(ids).toContain('tablet');
      expect(ids).toContain('small-desktop');
      expect(ids).toContain('large-desktop');

      // Ensure all IDs are unique
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(5);
    });

    test('each card has a heading', () => {
      const cards = document.querySelectorAll('.breakpoint-card');
      cards.forEach((card) => {
        const heading = card.querySelector('h3');
        expect(heading).toBeTruthy();
      });
    });

    test('each card has an icon', () => {
      const cards = document.querySelectorAll('.breakpoint-card');
      cards.forEach((card) => {
        const icon = card.querySelector('.icon');
        expect(icon).toBeTruthy();
      });
    });

    test('each card has a range description', () => {
      const cards = document.querySelectorAll('.breakpoint-card');
      cards.forEach((card) => {
        const range = card.querySelector('.range');
        expect(range).toBeTruthy();
      });
    });

    test('each card has features list', () => {
      const cards = document.querySelectorAll('.breakpoint-card');
      cards.forEach((card) => {
        const features = card.querySelector('.features');
        expect(features).toBeTruthy();
      });
    });
  });

  describe('Mobile Portrait Breakpoint', () => {
    test('has Mobile Portrait card', () => {
      const card = document.querySelector('#mobile-portrait');
      expect(card).toBeTruthy();
    });

    test('displays correct title', () => {
      const card = document.querySelector('#mobile-portrait');
      const heading = card.querySelector('h3');
      expect(heading.textContent).toContain('Mobile Portrait');
    });

    test('displays correct range', () => {
      const card = document.querySelector('#mobile-portrait');
      const range = card.querySelector('.range');
      expect(range.textContent).toContain('< 576px');
    });

    test('has at least 5 features listed', () => {
      const card = document.querySelector('#mobile-portrait');
      const features = card.querySelectorAll('.feature');
      expect(features.length).toBeGreaterThanOrEqual(5);
    });

    test('lists key mobile portrait features', () => {
      const card = document.querySelector('#mobile-portrait');
      const text = card.textContent;
      expect(text).toContain('Single column layout');
      expect(text).toContain('Compact navigation');
      expect(text).toContain('profile image');
    });
  });

  describe('Mobile Landscape Breakpoint', () => {
    test('has Mobile Landscape card', () => {
      const card = document.querySelector('#mobile-landscape');
      expect(card).toBeTruthy();
    });

    test('displays correct range', () => {
      const card = document.querySelector('#mobile-landscape');
      const range = card.querySelector('.range');
      expect(range.textContent).toContain('576px - 767px');
    });

    test('has features listed', () => {
      const card = document.querySelector('#mobile-landscape');
      const features = card.querySelectorAll('.feature');
      expect(features.length).toBeGreaterThan(0);
    });
  });

  describe('Tablet Breakpoint', () => {
    test('has Tablet card', () => {
      const card = document.querySelector('#tablet');
      expect(card).toBeTruthy();
    });

    test('displays correct range', () => {
      const card = document.querySelector('#tablet');
      const range = card.querySelector('.range');
      expect(range.textContent).toContain('768px - 991px');
    });

    test('lists tablet-specific features', () => {
      const card = document.querySelector('#tablet');
      const text = card.textContent;
      expect(text).toContain('brand logo');
      expect(text).toContain('stat items');
    });
  });

  describe('Small Desktop Breakpoint', () => {
    test('has Small Desktop card', () => {
      const card = document.querySelector('#small-desktop');
      expect(card).toBeTruthy();
    });

    test('displays correct range', () => {
      const card = document.querySelector('#small-desktop');
      const range = card.querySelector('.range');
      expect(range.textContent).toContain('992px - 1199px');
    });

    test('mentions full navigation', () => {
      const card = document.querySelector('#small-desktop');
      expect(card.textContent).toContain('Full navigation');
    });

    test('mentions animations', () => {
      const card = document.querySelector('#small-desktop');
      expect(card.textContent).toContain('animations');
    });
  });

  describe('Large Desktop Breakpoint', () => {
    test('has Large Desktop card', () => {
      const card = document.querySelector('#large-desktop');
      expect(card).toBeTruthy();
    });

    test('displays correct range', () => {
      const card = document.querySelector('#large-desktop');
      const range = card.querySelector('.range');
      expect(range.textContent).toContain('≥ 1200px');
    });

    test('mentions full experience', () => {
      const card = document.querySelector('#large-desktop');
      expect(card.textContent).toContain('Full experience');
    });

    test('lists advanced features', () => {
      const card = document.querySelector('#large-desktop');
      const text = card.textContent;
      expect(text).toContain('hover effects');
      expect(text).toContain('gradient backgrounds');
    });
  });

  describe('Test Links Section', () => {
    test('has test links section', () => {
      const testLinks = document.querySelector('.test-links');
      expect(testLinks).toBeTruthy();
    });

    test('has exactly 3 test links', () => {
      const links = document.querySelectorAll('.test-links a');
      expect(links.length).toBe(3);
    });

    test('has link to main page', () => {
      const links = Array.from(document.querySelectorAll('.test-links a'));
      const mainPageLink = links.find((link) => link.getAttribute('href') === '/');
      expect(mainPageLink).toBeTruthy();
      expect(mainPageLink.textContent).toContain('Main Page');
    });

    test('has link to frameworks page', () => {
      const links = Array.from(document.querySelectorAll('.test-links a'));
      const frameworksLink = links.find(
        (link) => link.getAttribute('href') === '/webpage/pages/frameworks/'
      );
      expect(frameworksLink).toBeTruthy();
      expect(frameworksLink.textContent).toContain('Frameworks');
    });

    test('has link to projects page', () => {
      const links = Array.from(document.querySelectorAll('.test-links a'));
      const projectsLink = links.find(
        (link) => link.getAttribute('href') === '/webpage/pages/side_proj/'
      );
      expect(projectsLink).toBeTruthy();
      expect(projectsLink.textContent).toContain('Projects');
    });

    test('all test links have proper text', () => {
      const links = document.querySelectorAll('.test-links a');
      links.forEach((link) => {
        expect(link.textContent.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Inline Styles', () => {
    test('has embedded styles', () => {
      const styles = document.querySelectorAll('style');
      expect(styles.length).toBeGreaterThan(0);
    });

    test('defines container styles', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toContain('.container');
    });

    test('defines breakpoint card styles', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toContain('.breakpoint-card');
    });

    test('defines active state for breakpoint cards', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toContain('.breakpoint-card.active');
    });

    test('defines feature styles', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toContain('.feature');
    });

    test('has gradient background', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/background.*gradient/i);
    });
  });

  describe('Media Queries', () => {
    test('has mobile portrait media query', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/@media.*max-width:\s*575px/);
    });

    test('has mobile landscape media query', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/@media.*min-width:\s*576px.*max-width:\s*767px/);
    });

    test('has tablet media query', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/@media.*min-width:\s*768px.*max-width:\s*991px/);
    });

    test('has small desktop media query', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/@media.*min-width:\s*992px.*max-width:\s*1199px/);
    });

    test('has large desktop media query', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/@media.*min-width:\s*1200px/);
    });

    test('media queries activate specific breakpoint cards', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');

      expect(styles).toContain('#mobile-portrait');
      expect(styles).toContain('#mobile-landscape');
      expect(styles).toContain('#tablet');
      expect(styles).toContain('#small-desktop');
      expect(styles).toContain('#large-desktop');
    });

    test('media queries update viewport heading', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');

      expect(styles).toMatch(/content:.*Mobile Portrait/);
      expect(styles).toMatch(/content:.*Mobile Landscape/);
      expect(styles).toMatch(/content:.*Tablet/);
      expect(styles).toMatch(/content:.*Small Desktop/);
      expect(styles).toMatch(/content:.*Large Desktop/);
    });
  });

  describe('JavaScript Functionality', () => {
    test('has inline script', () => {
      const scripts = document.querySelectorAll('script');
      expect(scripts.length).toBeGreaterThan(0);
    });

    test('script defines updateViewport function', () => {
      const scripts = Array.from(document.querySelectorAll('script'))
        .map((s) => s.textContent)
        .join('');
      expect(scripts).toContain('updateViewport');
    });

    test('script updates width element', () => {
      const scripts = Array.from(document.querySelectorAll('script'))
        .map((s) => s.textContent)
        .join('');
      expect(scripts).toContain("getElementById('width')");
    });

    test('script updates height element', () => {
      const scripts = Array.from(document.querySelectorAll('script'))
        .map((s) => s.textContent)
        .join('');
      expect(scripts).toContain("getElementById('height')");
    });

    test('script listens for resize events', () => {
      const scripts = Array.from(document.querySelectorAll('script'))
        .map((s) => s.textContent)
        .join('');
      expect(scripts).toContain('resize');
      expect(scripts).toContain('addEventListener');
    });

    test('script uses window.innerWidth', () => {
      const scripts = Array.from(document.querySelectorAll('script'))
        .map((s) => s.textContent)
        .join('');
      expect(scripts).toContain('window.innerWidth');
    });

    test('script uses window.innerHeight', () => {
      const scripts = Array.from(document.querySelectorAll('script'))
        .map((s) => s.textContent)
        .join('');
      expect(scripts).toContain('window.innerHeight');
    });

    test('updateViewport is called on page load', () => {
      const scripts = Array.from(document.querySelectorAll('script'))
        .map((s) => s.textContent)
        .join('');
      // Should call updateViewport() directly (not just in event listener)
      expect(scripts).toMatch(/updateViewport\s*\(\s*\)\s*;/);
    });
  });

  describe('Visual Design Elements', () => {
    test('uses backdrop filter blur effect', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/backdrop-filter:\s*blur/);
    });

    test('uses rgba colors for transparency', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/rgba\(/);
    });

    test('has border-radius for rounded corners', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/border-radius/);
    });

    test('has transition effects', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/transition/);
    });

    test('has transform effects', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/transform/);
    });

    test('has box-shadow effects', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toMatch(/box-shadow/);
    });
  });

  describe('Accessibility', () => {
    test('all links have text content', () => {
      const links = document.querySelectorAll('a');
      links.forEach((link) => {
        expect(link.textContent.trim().length).toBeGreaterThan(0);
      });
    });

    test('uses semantic HTML elements', () => {
      expect(document.querySelector('h1')).toBeTruthy();
      expect(document.querySelector('h2')).toBeTruthy();
      expect(document.querySelector('h3')).toBeTruthy();
    });

    test('has proper heading hierarchy', () => {
      const h1 = document.querySelector('h1');
      const h2s = document.querySelectorAll('h2');
      const h3s = document.querySelectorAll('h3');

      expect(h1).toBeTruthy();
      expect(h2s.length).toBeGreaterThan(0);
      expect(h3s.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design Features', () => {
    test('all breakpoint ranges are defined correctly', () => {
      const ranges = [
        { id: 'mobile-portrait', expected: '< 576px' },
        { id: 'mobile-landscape', expected: '576px - 767px' },
        { id: 'tablet', expected: '768px - 991px' },
        { id: 'small-desktop', expected: '992px - 1199px' },
        { id: 'large-desktop', expected: '≥ 1200px' },
      ];

      ranges.forEach(({ id, expected }) => {
        const card = document.querySelector(`#${id}`);
        const range = card.querySelector('.range');
        expect(range.textContent).toContain(expected);
      });
    });

    test('feature checkmarks are present', () => {
      const features = document.querySelectorAll('.feature');
      features.forEach((feature) => {
        expect(feature.textContent).toMatch(/✓/);
      });
    });

    test('emojis are used for visual appeal', () => {
      const pageText = document.body.textContent;
      expect(pageText).toMatch(/📱|💻|🖥️/u);
    });
  });
});
