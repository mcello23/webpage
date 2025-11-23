const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

/**
 * Comprehensive test suite for gradient colors and styling on skill tags
 *
 * This suite validates the visual enhancements applied to skill tags across:
 * - Tech Stack section (6 categories, 23 total tags)
 * - Projects section (3 projects, 15 total tags)
 *
 * Total: 38 unique gradient backgrounds with matching box-shadows
 *
 * Tests cover:
 * - Color accuracy for each technology (TypeScript=blue, Cypress=teal, etc.)
 * - Box-shadow presence and format consistency
 * - Gradient format (135deg angle, 0% to 100% stops)
 * - Accessibility (role attributes, text contrast)
 * - Visual consistency (sizing, padding, color stops)
 */

describe('Gradient Colors and Styling', () => {
  let dom;
  let document;
  let html;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '..', '..', 'index.html');
    html = fs.readFileSync(htmlPath, 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  afterAll(() => {
    if (dom && dom.window) dom.window.close();
  });

  describe('Tech Stack Section - Languages', () => {
    test('TypeScript has blue gradient with box-shadow', () => {
      const typeScriptTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('TypeScript')
      );
      expect(typeScriptTag).toBeTruthy();
      const style = typeScriptTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #007acc 0%, #3178c6 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(49, 120, 198, 0.4)');
    });

    test('JavaScript has yellow gradient with dark text and box-shadow', () => {
      const jsTag = Array.from(document.querySelectorAll('.skill-tag')).find(
        (tag) => tag.textContent.includes('JavaScript') && !tag.textContent.includes('TypeScript')
      );
      expect(jsTag).toBeTruthy();
      const style = jsTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #f0db4f 0%, #f7df1e 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(247, 223, 30, 0.4)');
      expect(style).toContain('color: #323330');
    });

    test('Node.js has green gradient with box-shadow', () => {
      const nodeTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('Node.js')
      );
      expect(nodeTag).toBeTruthy();
      const style = nodeTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #3c873a 0%, #68a063 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(104, 160, 99, 0.4)');
    });
  });

  describe('Tech Stack Section - E2E Testing Frameworks', () => {
    test('Cypress has teal gradient with box-shadow', () => {
      const cypressTags = Array.from(document.querySelectorAll('.skill-tag')).filter(
        (tag) => tag.textContent.trim() === 'Cypress'
      );
      // Find the one in the Tech Stack section (not in projects)
      const cypressTag = cypressTags.find((tag) => {
        const style = tag.getAttribute('style');
        return style && style.includes('#17202c') && style.includes('#69d3a7');
      });
      expect(cypressTag).toBeTruthy();
      const style = cypressTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #17202c 0%, #69d3a7 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(105, 211, 167, 0.4)');
    });

    test('Playwright has green gradient with box-shadow', () => {
      const playwrightTags = Array.from(document.querySelectorAll('.skill-tag')).filter(
        (tag) => tag.textContent.trim() === 'Playwright'
      );
      const playwrightTag = playwrightTags.find((tag) => {
        const style = tag.getAttribute('style');
        return style && style.includes('#2d5f3f') && style.includes('#45a872');
      });
      expect(playwrightTag).toBeTruthy();
      const style = playwrightTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #2d5f3f 0%, #45a872 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(69, 168, 114, 0.4)');
    });

    test('Jest has red gradient with box-shadow', () => {
      const jestTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('Jest')
      );
      expect(jestTag).toBeTruthy();
      const style = jestTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #c62828 0%, #f44336 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(244, 67, 54, 0.4)');
    });

    test('Cucumber/Gherkin has green gradient with box-shadow', () => {
      const cucumberTags = Array.from(document.querySelectorAll('.skill-tag')).filter((tag) =>
        tag.textContent.includes('Cucumber')
      );
      const cucumberTag = cucumberTags.find((tag) => {
        const style = tag.getAttribute('style');
        return style && style.includes('#23a566') && style.includes('#40c77f');
      });
      expect(cucumberTag).toBeTruthy();
      const style = cucumberTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #23a566 0%, #40c77f 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(64, 199, 127, 0.4)');
    });
  });

  describe('Tech Stack Section - CI/CD & DevOps', () => {
    test('Azure DevOps has blue gradient with box-shadow', () => {
      const azureTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('Azure DevOps')
      );
      expect(azureTag).toBeTruthy();
      const style = azureTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #0078d4 0%, #50a0e0 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(80, 160, 224, 0.4)');
    });

    test('GitHub Actions has light blue gradient with box-shadow', () => {
      const githubTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('GitHub Actions')
      );
      expect(githubTag).toBeTruthy();
      const style = githubTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #2088ff 0%, #79b8ff 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(121, 184, 255, 0.4)');
    });

    test('Docker has blue gradient with box-shadow', () => {
      const dockerTags = Array.from(document.querySelectorAll('.skill-tag')).filter(
        (tag) => tag.textContent.trim() === 'Docker'
      );
      const dockerTag = dockerTags.find((tag) => {
        const style = tag.getAttribute('style');
        return style && style.includes('#326ce5') && style.includes('#5b8def');
      });
      expect(dockerTag).toBeTruthy();
      const style = dockerTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #326ce5 0%, #5b8def 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(91, 141, 239, 0.4)');
    });

    test('ArgoCD has orange gradient with box-shadow', () => {
      const argoTag = Array.from(document.querySelectorAll('.skill-tag')).find(
        (tag) => tag.textContent.trim() === 'ArgoCD'
      );
      expect(argoTag).toBeTruthy();
      const style = argoTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #ef7b4d 0%, #f39c6b 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(243, 156, 107, 0.4)');
    });
  });

  describe('Tech Stack Section - API & Testing Tools', () => {
    test('GraphQL has pink gradient with box-shadow', () => {
      const graphqlTag = Array.from(document.querySelectorAll('.skill-tag')).find(
        (tag) => tag.textContent.trim() === 'GraphQL'
      );
      expect(graphqlTag).toBeTruthy();
      const style = graphqlTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #e535ab 0%, #f178c6 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(241, 120, 198, 0.4)');
    });

    test('Postman/Bruno has orange gradient with box-shadow', () => {
      const postmanTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('Postman/Bruno')
      );
      expect(postmanTag).toBeTruthy();
      const style = postmanTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #ff6c37 0%, #ff9057 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(255, 144, 87, 0.4)');
    });

    test('API Stubbing has purple gradient with box-shadow', () => {
      const apiStubbingTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('API Stubbing')
      );
      expect(apiStubbingTag).toBeTruthy();
      const style = apiStubbingTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #8e44ad 0%, #a569bd 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(165, 105, 189, 0.4)');
    });

    test('Mock Testing has red gradient with box-shadow', () => {
      const normalize = (s) => s.replace(/\s+/g, ' ').trim();
      const tags = document.querySelectorAll('.skill-tag');
      const mockTag = Array.from(tags).find((tag) =>
        normalize(tag.textContent).includes('Mock Testing')
      );
      expect(mockTag).toBeTruthy();
      const style = mockTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #e74c3c 0%, #ec7063 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(236, 112, 99, 0.4)');
    });
  });

  describe('Tech Stack Section - Mobile & Database', () => {
    test('Appium has purple gradient with box-shadow', () => {
      const appiumTag = Array.from(document.querySelectorAll('.skill-tag')).find(
        (tag) => tag.textContent.trim() === 'Appium'
      );
      expect(appiumTag).toBeTruthy();
      const style = appiumTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #662d91 0%, #8e44ad 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(142, 68, 173, 0.4)');
    });

    test('Selenium has green gradient with box-shadow', () => {
      const seleniumTag = Array.from(document.querySelectorAll('.skill-tag')).find(
        (tag) => tag.textContent.trim() === 'Selenium'
      );
      expect(seleniumTag).toBeTruthy();
      const style = seleniumTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #43a047 0%, #66bb6a 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(102, 187, 106, 0.4)');
    });

    test('WebDriverIO has orange gradient with box-shadow', () => {
      const wdioTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('WebDriverIO')
      );
      expect(wdioTag).toBeTruthy();
      const style = wdioTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #ea5906 0%, #f57a3e 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(245, 122, 62, 0.4)');
    });

    test('SQL/Postgres has cyan gradient with box-shadow', () => {
      const sqlTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('SQL/Postgres')
      );
      expect(sqlTag).toBeTruthy();
      const style = sqlTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #00758f 0%, #00a0c6 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(0, 160, 198, 0.4)');
    });
  });

  describe('Tech Stack Section - Reporting & Version Control', () => {
    test('Allure Reports has gold gradient with box-shadow', () => {
      const allureTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('Allure Reports')
      );
      expect(allureTag).toBeTruthy();
      const style = allureTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #f9a825 0%, #fbc02d 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(251, 192, 45, 0.4)');
    });

    test('Mochawesome has purple gradient with box-shadow', () => {
      const mochaTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('Mochawesome')
      );
      expect(mochaTag).toBeTruthy();
      const style = mochaTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(156, 39, 176, 0.4)');
    });

    test('Git has red-orange gradient with box-shadow', () => {
      const gitTag = Array.from(document.querySelectorAll('.skill-tag')).find(
        (tag) => tag.textContent.trim() === 'Git'
      );
      expect(gitTag).toBeTruthy();
      const style = gitTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #f34f29 0%, #ff7f50 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(255, 127, 80, 0.4)');
    });

    test('Nightly Builds has blue gradient with box-shadow', () => {
      const nightlyTag = Array.from(document.querySelectorAll('.skill-tag')).find((tag) =>
        tag.textContent.includes('Nightly Builds')
      );
      expect(nightlyTag).toBeTruthy();
      const style = nightlyTag.getAttribute('style');
      expect(style).toContain('linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)');
      expect(style).toContain('box-shadow: 0 4px 15px rgba(30, 136, 229, 0.4)');
    });
  });

  describe('Color Consistency', () => {
    test('tech stack skill tags with gradients have box-shadow', () => {
      // Find the Tech Stack section by finding the heading
      const headings = Array.from(document.querySelectorAll('h2'));
      const techStackHeading = headings.find((h) => h.textContent.includes('Tech Stack'));
      const techStackSection = techStackHeading.closest('.intro-card');
      const skillTags = techStackSection.querySelectorAll('.skill-tag');
      skillTags.forEach((tag) => {
        const style = tag.getAttribute('style');
        if (style && style.includes('linear-gradient')) {
          expect(style).toContain('box-shadow');
        }
      });
    });

    test('all gradients use 135deg angle', () => {
      const skillTags = document.querySelectorAll('.skill-tag');
      skillTags.forEach((tag) => {
        const style = tag.getAttribute('style');
        if (style && style.includes('linear-gradient')) {
          expect(style).toContain('linear-gradient(135deg');
        }
      });
    });

    test('all box-shadows follow consistent format', () => {
      const skillTags = document.querySelectorAll('.skill-tag');
      skillTags.forEach((tag) => {
        const style = tag.getAttribute('style');
        if (style && style.includes('box-shadow')) {
          expect(style).toMatch(/box-shadow:\s*0\s+4px\s+15px\s+rgba\(/);
        }
      });
    });
  });

  describe('Accessibility', () => {
    test('JavaScript tag has proper contrast with dark text', () => {
      const jsTag = Array.from(document.querySelectorAll('.skill-tag')).find(
        (tag) => tag.textContent.includes('JavaScript') && !tag.textContent.includes('TypeScript')
      );
      const style = jsTag.getAttribute('style');
      // Yellow background should have dark text for contrast
      expect(style).toContain('color: #323330');
    });

    test('tech stack skill tags have role="listitem" for accessibility', () => {
      const headings = Array.from(document.querySelectorAll('h2'));
      const techStackHeading = headings.find((h) => h.textContent.includes('Tech Stack'));
      const techStackSection = techStackHeading.closest('.intro-card');
      const skillTags = techStackSection.querySelectorAll('.skill-tag');
      skillTags.forEach((tag) => {
        expect(tag.getAttribute('role')).toBe('listitem');
      });
    });
  });

  describe('Visual Consistency', () => {
    test('all project tags have consistent sizing', () => {
      const projectCards = document.querySelectorAll('.card.gradient-card');
      projectCards.forEach((card, index) => {
        if (index < 3) {
          // First 3 cards are projects
          const tags = card.querySelectorAll('.skill-tag');
          tags.forEach((tag) => {
            const style = tag.getAttribute('style');
            expect(style).toContain('font-size: 0.75rem');
            expect(style).toContain('padding: 5px 12px');
          });
        }
      });
    });

    test('gradient colors use color stop format', () => {
      const headings = Array.from(document.querySelectorAll('h2'));
      const techStackHeading = headings.find((h) => h.textContent.includes('Tech Stack'));
      const techStackSection = techStackHeading.closest('.intro-card');
      const skillTags = techStackSection.querySelectorAll('.skill-tag');
      skillTags.forEach((tag) => {
        const style = tag.getAttribute('style');
        if (style && style.includes('linear-gradient')) {
          // Should have % values for color stops
          expect(style).toMatch(
            /linear-gradient\(135deg,\s*#[0-9a-f]{6}\s+0%,\s*#[0-9a-f]{6}\s+100%\)/i
          );
        }
      });
    });
  });
});
