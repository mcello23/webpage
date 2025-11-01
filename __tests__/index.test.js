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

describe('Index Page (Main Portfolio)', () => {
  let dom;
  let document;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '..', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  describe('Navigation Bar', () => {
    test('has a fixed nav at the top', () => {
      const nav = document.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.classList.contains('main-nav')).toBe(true);
    });

    test('has brand logo with correct text', () => {
      const brand = document.querySelector('.brand-logo');
      expect(brand).toBeTruthy();
      expect(brand.getAttribute('href')).toBe('/');
      expect(brand.textContent).toContain('Marcelo Costa');
    });

    test('brand logo has home icon', () => {
      const brand = document.querySelector('a.brand-logo');
      const icon = brand.querySelector('.material-icons');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toContain('home');
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
      expect(hrefs).toContain('/pages/side_proj');
      expect(hrefs).toContain('/pages/frameworks');
      expect(hrefs).toContain('#');
    });

    test('navigation buttons have gradient backgrounds', () => {
      const buttons = document.querySelectorAll('a.nav-btn');
      expect(buttons.length).toBe(3);
      // Check for class-based styling instead of inline styles
      const projectsBtn = document.querySelector('.nav-btn-projects');
      const frameworksBtn = document.querySelector('.nav-btn-frameworks');
      const certsBtn = document.querySelector('.nav-btn-certs');
      expect(projectsBtn).toBeTruthy();
      expect(frameworksBtn).toBeTruthy();
      expect(certsBtn).toBeTruthy();
    });

    test('social icons are present', () => {
      const socials = document.querySelectorAll('.social-icon');
      expect(socials.length).toBe(2); // GitHub and LinkedIn
    });

    test('social icons link to correct profiles', () => {
      const githubLink = document.querySelector('[aria-label="GitHub"]');
      const linkedinLink = document.querySelector('[aria-label="LinkedIn"]');

      expect(githubLink.getAttribute('href')).toBe('https://github.com/mcello23');
      expect(linkedinLink.getAttribute('href')).toBe('https://www.linkedin.com/in/marceloc/');
    });

    test('social icons have Font Awesome icons', () => {
      const githubIcon = document.querySelector('.fa-github');
      const linkedinIcon = document.querySelector('.fa-linkedin');

      expect(githubIcon).toBeTruthy();
      expect(linkedinIcon).toBeTruthy();
    });
  });

  describe('Hero Section / Profile', () => {
    test('has profile image', () => {
      const profileImg = document.querySelector('img.circle.responsive-img');
      expect(profileImg).toBeTruthy();
      // Accepts the new optimized image as main src
      expect(profileImg.getAttribute('src')).toBe('images/assets/DSC_9554-optimized.webp');
      expect(profileImg.getAttribute('alt')).toContain('Marcelo Costa');
    });

    test('profile image file exists', () => {
      const fs = require('fs');
      const path = require('path');
      const imgPath = path.resolve(__dirname, '..', 'images', 'assets', 'DSC_9554.jpg');
      expect(fs.existsSync(imgPath)).toBe(true);
    });

    test('displays correct name', () => {
      const name = document.querySelector('h1');
      expect(name).toBeTruthy();
      expect(name.textContent).toContain('Marcelo Costa');
    });

    test('displays updated professional title', () => {
      const title = document.querySelector('p[style*="color: #667eea"]');
      expect(title).toBeTruthy();
      const titleText = title.textContent;
      expect(titleText).toContain('Senior QA Engineer');
      expect(titleText).toContain('SDET');
    });

    test('displays location and languages', () => {
      const location = document.body.textContent;
      expect(location).toContain('Madrid, Spain');
      expect(location).toContain('Trilingual');
      expect(location).toContain('English');
      expect(location).toContain('Portuguese');
      expect(location).toContain('Spanish');
    });
  });

  describe('Quick Impact Metrics Section', () => {
    test('has Quick Impact Metrics card', () => {
      const metricsHeading = Array.from(document.querySelectorAll('h3')).find((h) =>
        h.textContent.includes('Quick Impact Metrics')
      );
      expect(metricsHeading).toBeTruthy();
    });

    test('displays all four metrics', () => {
      const statItems = document.querySelectorAll('.stat-item');
      expect(statItems.length).toBe(4);
    });

    test('metrics have correct values', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('5,000+');
      expect(pageText).toContain('E2E tests maintained daily');
      expect(pageText).toContain('98%');
      expect(pageText).toContain('25 → 8 min');
      expect(pageText).toContain('30%');
    });

    test('stat items have proper structure', () => {
      const statItems = document.querySelectorAll('.stat-item');
      statItems.forEach((item) => {
        const strong = item.querySelector('strong');
        const span = item.querySelector('span');
        expect(strong).toBeTruthy();
        expect(span).toBeTruthy();
      });
    });
  });

  describe('What I Do Section', () => {
    test('has What I Do card', () => {
      const whatIDoHeading = Array.from(document.querySelectorAll('h3')).find((h) =>
        h.textContent.includes('What I Do')
      );
      expect(whatIDoHeading).toBeTruthy();
    });

    test('displays E2E Test Automation', () => {
      const content = document.body.textContent;
      expect(content).toContain('E2E Test Automation');
      expect(content).toContain('Cypress');
      expect(content).toContain('Playwright');
    });

    test('displays Performance Tuning', () => {
      const content = document.body.textContent;
      expect(content).toContain('Performance Tuning');
      expect(content).toContain('Webpack optimization');
    });

    test('displays CI/CD Pipelines', () => {
      const content = document.body.textContent;
      expect(content).toContain('CI/CD Pipelines');
      expect(content).toContain('Azure DevOps');
      expect(content).toContain('GitHub Actions');
      expect(content).toContain('ArgoCD');
    });

    test('displays Mobile Testing', () => {
      const content = document.body.textContent;
      expect(content).toContain('Mobile Testing');
      expect(content).toContain('Appium');
    });

    test('displays BDD Frameworks', () => {
      const content = document.body.textContent;
      expect(content).toContain('BDD Frameworks');
      expect(content).toContain('Cucumber');
      expect(content).toContain('Gherkin');
    });

    test('displays Team Leadership', () => {
      const content = document.body.textContent;
      expect(content).toContain('Team Leadership');
      expect(content).toContain('Mentoring');
    });
  });

  describe('Tech Stack Section', () => {
    test('has Tech Stack card', () => {
      const techStackHeading = Array.from(document.querySelectorAll('h3')).find((h) =>
        h.textContent.includes('Tech Stack')
      );
      expect(techStackHeading).toBeTruthy();
    });

    test('displays all tech stack items', () => {
      const skillTags = document.querySelectorAll('.skill-tag');
      expect(skillTags.length).toBeGreaterThan(15); // At least 16 items
    });

    test('has Shell & Environment section', () => {
      const shellHeading = Array.from(document.querySelectorAll('h5')).find((h) =>
        h.textContent.includes('Shell & Environment')
      );
      expect(shellHeading).toBeTruthy();
    });

    test('Shell & Environment section has terminal icon', () => {
      const shellHeading = Array.from(document.querySelectorAll('h5')).find((h) =>
        h.textContent.includes('Shell & Environment')
      );
      expect(shellHeading).toBeTruthy();
      const icon = shellHeading.querySelector('.material-icons');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toContain('terminal');
    });

    test('includes Bash/Zsh in tech stack', () => {
      const content = document.body.textContent;
      expect(content).toContain('Bash/Zsh');
    });

    test('includes WSL in tech stack', () => {
      const content = document.body.textContent;
      expect(content).toContain('WSL');
    });

    test('Shell & Environment appears after Languages section', () => {
      const allH5 = Array.from(document.querySelectorAll('h5'));
      const shellIndex = allH5.findIndex((h) => h.textContent.includes('Shell & Environment'));
      const languagesIndex = allH5.findIndex((h) => h.textContent.includes('Languages'));

      expect(shellIndex).toBeGreaterThan(-1);
      expect(languagesIndex).toBeGreaterThan(-1);
      expect(shellIndex).toBeGreaterThan(languagesIndex);
    });

    test('includes core technologies', () => {
      const content = document.body.textContent;
      expect(content).toContain('TypeScript');
      expect(content).toContain('JavaScript');
      expect(content).toContain('Cypress');
      expect(content).toContain('Playwright');
    });

    test('includes CI/CD tools', () => {
      const content = document.body.textContent;
      expect(content).toContain('GitHub Actions');
      expect(content).toContain('Azure DevOps');
    });

    test('includes testing tools', () => {
      const content = document.body.textContent;
      // Check for at least some testing-related terms
      expect(content).toContain('Cypress');
      expect(content).toContain('Playwright');
    });

    test('includes reporting tools', () => {
      const content = document.body.textContent;
      // Check for general testing/reporting presence
      expect(content).toContain('E2E');
    });

    test('includes mobile automation', () => {
      const content = document.body.textContent;
      expect(content).toContain('Appium');
    });

    test('includes database technologies', () => {
      const content = document.body.textContent;
      // Check for database-related terms
      expect(content).toContain('SQL');
    });
  });

  describe('Recent Experience Section', () => {
    test('has Recent Experience parallax', () => {
      const parallax = document.querySelector('.parallax-experience');
      expect(parallax).toBeTruthy();
    });

    test('displays Recent Experience heading', () => {
      const heading = Array.from(document.querySelectorAll('h2')).find((h) =>
        h.textContent.includes('Recent Experience')
      );
      expect(heading).toBeTruthy();
    });

    test('has experience cards', () => {
      const experienceSection = document.querySelector('#experience');
      expect(experienceSection).toBeTruthy();
      const cards = experienceSection.querySelectorAll('.gradient-card');
      expect(cards.length).toBe(4);
    });

    test('displays Board International experience', () => {
      const content = document.body.textContent;
      expect(content).toContain('Board International');
    });

    test('displays Facephi experience', () => {
      const content = document.body.textContent;
      expect(content).toContain('Facephi');
    });

    test('displays Nespresso experience', () => {
      const content = document.body.textContent;
      expect(content).toContain('Nespresso');
      expect(content).toContain('Nestlé');
    });

    test('displays Apple experience', () => {
      const content = document.body.textContent;
      expect(content).toContain('Apple');
    });
  });

  describe('Articles Section', () => {
    test('has Articles parallax', () => {
      const parallax = document.querySelector('.parallax-articles');
      expect(parallax).toBeTruthy();
    });

    test('displays Articles heading', () => {
      const heading = Array.from(document.querySelectorAll('h2')).find((h) =>
        h.textContent.includes('Articles')
      );
      expect(heading).toBeTruthy();
    });

    test('has articles section', () => {
      const articlesSection = document.querySelector('#articles');
      expect(articlesSection).toBeTruthy();
    });

    test('displays Medium article link', () => {
      const links = Array.from(document.querySelectorAll('a'));
      const mediumLink = links.find((a) => a.textContent.includes('Read on Medium'));
      expect(mediumLink).toBeTruthy();
    });

    test('displays LinkedIn article link', () => {
      const links = Array.from(document.querySelectorAll('a'));
      const linkedinLink = links.find((a) => a.textContent.includes('View on LinkedIn'));
      expect(linkedinLink).toBeTruthy();
    });

    test('displays Dev.to article link', () => {
      const links = Array.from(document.querySelectorAll('a'));
      const devtoLink = links.find((a) => a.textContent.includes('Read on Dev.to'));
      expect(devtoLink).toBeTruthy();
    });

    test('GraphQL article has correct title', () => {
      const articlesSection = document.querySelector('#articles');
      const articleHeadings = articlesSection.querySelectorAll('.card-content h5');
      const graphqlHeading = Array.from(articleHeadings).find((h) =>
        h.textContent.includes('Hasura GraphQL')
      );
      expect(graphqlHeading).toBeTruthy();
      expect(graphqlHeading.textContent).toContain(
        'How to integrate Hasura GraphQL hooks into your E2E tests'
      );
    });

    test('GraphQL article has correct description', () => {
      const content = document.body.textContent;
      expect(content).toContain(
        'Use Hasura + custom Cypress commands to keep tests isolated and deterministic'
      );
    });

    test('GraphQL article has correct tags', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let graphqlCard = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="hasura-graphql"]');
        if (link) {
          graphqlCard = card;
        }
      });

      expect(graphqlCard).toBeTruthy();
      const tags = graphqlCard.querySelectorAll('.skill-tag');
      const tagTexts = Array.from(tags).map((tag) => tag.textContent.trim());

      expect(tagTexts).toContain('GraphQL');
      expect(tagTexts).toContain('Hasura');
      expect(tagTexts).toContain('Cypress');
    });

    test('GraphQL article has code icon', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let graphqlCard = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="hasura-graphql"]');
        if (link) {
          graphqlCard = card;
        }
      });

      const icon = graphqlCard.querySelector('.card-image .material-icons');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toContain('code');
    });

    test('Auth0 article has correct title', () => {
      const articlesSection = document.querySelector('#articles');
      const articleHeadings = articlesSection.querySelectorAll('.card-content h5');
      const auth0Heading = Array.from(articleHeadings).find((h) => h.textContent.includes('Auth0'));
      expect(auth0Heading).toBeTruthy();
      expect(auth0Heading.textContent).toContain(
        'Speeding up Cypress tests with Auth0 login optimization'
      );
    });

    test('Auth0 article has correct description', () => {
      const content = document.body.textContent;
      expect(content).toContain(
        'Token caching and session strategies to accelerate authenticated E2E tests'
      );
    });

    test('Auth0 article has correct tags', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let auth0Card = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="auth0-login"]');
        if (link) {
          auth0Card = card;
        }
      });

      expect(auth0Card).toBeTruthy();
      const tags = auth0Card.querySelectorAll('.skill-tag');
      const tagTexts = Array.from(tags).map((tag) => tag.textContent.trim());

      expect(tagTexts).toContain('Auth0');
      expect(tagTexts).toContain('Cypress');
      expect(tagTexts).toContain('Performance');
    });

    test('Auth0 article has lock_open icon', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let auth0Card = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="auth0-login"]');
        if (link) {
          auth0Card = card;
        }
      });

      const icon = auth0Card.querySelector('.card-image .material-icons');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toContain('lock_open');
    });

    test('Cyprompt article has correct title', () => {
      const articlesSection = document.querySelector('#articles');
      const articleHeadings = articlesSection.querySelectorAll('.card-content h5');
      const cypromptHeading = Array.from(articleHeadings).find((h) =>
        h.textContent.includes('cy.prompt()')
      );
      expect(cypromptHeading).toBeTruthy();
      expect(cypromptHeading.textContent).toContain(
        'How Cypress Will Revolutionize AI in Testing with cy.prompt()'
      );
    });

    test('Cyprompt article has correct description', () => {
      const content = document.body.textContent;
      expect(content).toContain('transforming the future of test automation');
    });

    test('Cyprompt article has correct tags', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let cypromptCard = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="how-cypress-will-revolutionize"]');
        if (link) {
          cypromptCard = card;
        }
      });

      expect(cypromptCard).toBeTruthy();
      const tags = cypromptCard.querySelectorAll('.skill-tag');
      const tagTexts = Array.from(tags).map((tag) => tag.textContent.trim());

      expect(tagTexts).toContain('AI Testing');
      expect(tagTexts).toContain('Cypress');
      expect(tagTexts).toContain('Cyprompt');
    });

    test('Cyprompt article has psychology icon', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let cypromptCard = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="how-cypress-will-revolutionize"]');
        if (link) {
          cypromptCard = card;
        }
      });

      const icon = cypromptCard.querySelector('.card-image .material-icons');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toContain('psychology');
    });

    test('Article 4 (cy.prompt() Tips) has correct title', () => {
      const articlesSection = document.querySelector('#articles');
      const articleHeadings = articlesSection.querySelectorAll('.card-content h5');
      const article4Heading = Array.from(articleHeadings).find((h) =>
        h.textContent.includes('How to get most out of cy.prompt()')
      );
      expect(article4Heading).toBeTruthy();
      expect(article4Heading.textContent).toContain('How to get most out of cy.prompt()');
    });

    test('Article 4 has correct description', () => {
      const content = document.body.textContent;
      expect(content).toContain('6 tips and tricks to maximize your AI-powered testing');
      expect(content).toContain('Learn best practices for leveraging this new AI tool');
    });

    test('Article 4 has correct link to Dev.to', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let article4Card = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="how-to-get-most-out-of-cyprompt"]');
        if (link) {
          article4Card = card;
        }
      });

      expect(article4Card).toBeTruthy();
      const link = article4Card.querySelector('a[href*="how-to-get-most-out-of-cyprompt"]');
      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBe(
        'https://dev.to/cypress/how-to-get-most-out-of-cyprompt-6-tips-and-tricks-for-your-new-ai-tool-425l'
      );
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    test('Article 4 has correct tags', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let article4Card = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="how-to-get-most-out-of-cyprompt"]');
        if (link) {
          article4Card = card;
        }
      });

      expect(article4Card).toBeTruthy();
      const tags = article4Card.querySelectorAll('.skill-tag');
      const tagTexts = Array.from(tags).map((tag) => tag.textContent.trim());

      expect(tagTexts).toContain('AI Tips');
      expect(tagTexts).toContain('cy.prompt()');
      expect(tagTexts).toContain('Best Practices');
      expect(tags.length).toBe(3);
    });

    test('Article 4 has lightbulb icon', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let article4Card = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="how-to-get-most-out-of-cyprompt"]');
        if (link) {
          article4Card = card;
        }
      });

      expect(article4Card).toBeTruthy();
      const icon = article4Card.querySelector('.card-image .material-icons');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toContain('lightbulb');
    });

    test('Article 4 has gradient card styling', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let article4Card = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="how-to-get-most-out-of-cyprompt"]');
        if (link) {
          article4Card = card;
        }
      });

      expect(article4Card).toBeTruthy();
      expect(article4Card.classList.contains('gradient-card')).toBe(true);
      expect(article4Card.classList.contains('card')).toBe(true);
    });

    test('Article 4 has red/coral gradient background in card image', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let article4Card = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="how-to-get-most-out-of-cyprompt"]');
        if (link) {
          article4Card = card;
        }
      });

      expect(article4Card).toBeTruthy();
      const gradientDiv = article4Card.querySelector('.card-image div[style*="background"]');
      expect(gradientDiv).toBeTruthy();
      expect(gradientDiv.getAttribute('style')).toContain('linear-gradient');
      expect(gradientDiv.getAttribute('style')).toContain('#ff6b6b');
      expect(gradientDiv.getAttribute('style')).toContain('#ee5a6f');
    });

    test('Article 4 has correct header text in card image', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let article4Card = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="how-to-get-most-out-of-cyprompt"]');
        if (link) {
          article4Card = card;
        }
      });

      expect(article4Card).toBeTruthy();
      const headerText = article4Card.querySelector('.card-image h5');
      expect(headerText).toBeTruthy();
      expect(headerText.textContent.trim()).toBe('cy.prompt() Tips');
      expect(headerText.classList.contains('white-text')).toBe(true);
    });

    test('Article 4 button has Dev.to branding', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let article4Card = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="how-to-get-most-out-of-cyprompt"]');
        if (link) {
          article4Card = card;
        }
      });

      expect(article4Card).toBeTruthy();
      const button = article4Card.querySelector('.card-action a');
      expect(button).toBeTruthy();
      expect(button.textContent).toContain('Read on Dev.to');

      const icon = button.querySelector('.fa-dev');
      expect(icon).toBeTruthy();
    });

    test('Article 4 tags have correct gradient styling', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let article4Card = null;
      cards.forEach((card) => {
        const link = card.querySelector('a[href*="how-to-get-most-out-of-cyprompt"]');
        if (link) {
          article4Card = card;
        }
      });

      expect(article4Card).toBeTruthy();
      const tags = article4Card.querySelectorAll('.skill-tag');

      tags.forEach((tag) => {
        const style = tag.getAttribute('style');
        expect(style).toContain('background: linear-gradient(135deg, #ff6b6b, #ee5a6f)');
      });
    });

    test('More Articles Coming Soon card exists', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let moreArticlesCard = null;
      cards.forEach((card) => {
        const heading = card.querySelector('h5');
        if (heading && heading.textContent.includes('More Articles Coming Soon')) {
          moreArticlesCard = card;
        }
      });

      expect(moreArticlesCard).toBeTruthy();
    });

    test('More Articles card has article icon', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let moreArticlesCard = null;
      cards.forEach((card) => {
        const heading = card.querySelector('h5');
        if (heading && heading.textContent.includes('More Articles Coming Soon')) {
          moreArticlesCard = card;
        }
      });

      const icon = moreArticlesCard.querySelector('.material-icons');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toContain('article');
    });

    test('More Articles card has Medium follow button', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let moreArticlesCard = null;
      cards.forEach((card) => {
        const heading = card.querySelector('h5');
        if (heading && heading.textContent.includes('More Articles Coming Soon')) {
          moreArticlesCard = card;
        }
      });

      const mediumBtn = Array.from(moreArticlesCard.querySelectorAll('a')).find((a) =>
        a.textContent.includes('Medium')
      );
      expect(mediumBtn).toBeTruthy();
      expect(mediumBtn.getAttribute('href')).toBe('https://medium.com/@marcelocosta_72783');
    });

    test('More Articles card has Dev.to follow button', () => {
      const articlesSection = document.querySelector('#articles');
      const cards = articlesSection.querySelectorAll('.gradient-card');

      let moreArticlesCard = null;
      cards.forEach((card) => {
        const heading = card.querySelector('h5');
        if (heading && heading.textContent.includes('More Articles Coming Soon')) {
          moreArticlesCard = card;
        }
      });

      const devtoBtn = Array.from(moreArticlesCard.querySelectorAll('a')).find((a) =>
        a.textContent.includes('Dev.to')
      );
      expect(devtoBtn).toBeTruthy();
      expect(devtoBtn.getAttribute('href')).toBe('https://dev.to/marcelo_sqe');
    });

    test('All article cards have gradient backgrounds', () => {
      const articlesSection = document.querySelector('#articles');
      const cardImages = articlesSection.querySelectorAll('.card-image > div');

      expect(cardImages.length).toBeGreaterThanOrEqual(3);

      cardImages.forEach((cardImage) => {
        const style = cardImage.getAttribute('style');
        expect(style).toContain('gradient');
      });
    });

    test('All article external links open in new tab', () => {
      const articlesSection = document.querySelector('#articles');
      const externalLinks = articlesSection.querySelectorAll('a[href^="http"]');

      externalLinks.forEach((link) => {
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      });
    });
  });

  describe('Request CV Section', () => {
    test('has Request CV parallax', () => {
      const parallax = document.querySelector('.parallax-fundamentals');
      expect(parallax).toBeTruthy();
    });

    test('displays CV form heading', () => {
      const heading = document.querySelector('#cv-form-title');
      expect(heading).toBeTruthy();
    });

    test('has CV request form', () => {
      const form = document.querySelector('#cv-form');
      expect(form).toBeTruthy();
    });

    test('form has name input field', () => {
      const nameInput = document.querySelector('#cv-name');
      expect(nameInput).toBeTruthy();
      expect(nameInput.tagName).toBe('INPUT');
    });

    test('form has subject input field', () => {
      const subjectInput = document.querySelector('#cv-subject');
      expect(subjectInput).toBeTruthy();
    });

    test('form has message textarea', () => {
      const messageTextarea = document.querySelector('#cv-message');
      expect(messageTextarea).toBeTruthy();
      expect(messageTextarea.tagName).toBe('TEXTAREA');
    });

    test('form has submit button', () => {
      const submitBtn = document.querySelector('button[type="submit"]');
      expect(submitBtn).toBeTruthy();
      expect(submitBtn.textContent).toContain('Send message');
    });

    test('has confirmation message element', () => {
      const confirmEl = document.querySelector('#cv-confirm');
      expect(confirmEl).toBeTruthy();
    });
  });

  describe('Footer', () => {
    test('has professional footer', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain('Thanks for exploring');
      expect(pageText).toContain('© 2025 Marcelo Costa');
    });

    test('footer does not have emojis', () => {
      const footerText = document.body.textContent;
      expect(footerText).not.toMatch(/Thanks for.*☺/);
    });

    test('footer has LinkedIn connect button', () => {
      const pageText = document.body.textContent;
      expect(pageText).toContain("Let's");
      expect(pageText).toContain('testing solutions');
    });
  });

  describe('Certificate Modal', () => {
    test('has modern certificate modal container', () => {
      const modal = document.querySelector('#certificateModal');
      expect(modal).toBeTruthy();
      expect(modal.classList.contains('cert-modal')).toBe(true);
    });

    test('certificate modal loads certificates.js script', () => {
      const certScript = document.querySelector('script[src*="certificates.js"]');
      expect(certScript).toBeTruthy();
    });

    test('certificate modal loads certificates.css stylesheet', () => {
      const certStyles = document.querySelector('link[href*="certificates.css"]');
      expect(certStyles).toBeTruthy();
    });

    test('certificate images exist in images folder', () => {
      const fs = require('fs');
      const path = require('path');

      // Check that certificate images folder exists
      const imagesPath = path.resolve(__dirname, '..', 'images');
      expect(fs.existsSync(imagesPath)).toBe(true);

      // Check for key certificate images
      const certificateFiles = [
        'ISTQB.jpg',
        'Selenium WebDriver e Java.jpg',
        'cyp-inter.jpg',
        'cucumber_appium.jpg',
        'GitHub.jpg',
      ];

      certificateFiles.forEach((file) => {
        const filePath = path.join(imagesPath, file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });

    test('certificates.js is properly loaded and accessible', () => {
      const certScript = document.querySelector('script[src="js/certificates.js"]');
      expect(certScript).toBeTruthy();
      expect(certScript.getAttribute('src')).toBe('js/certificates.js');
    });

    test('certificate thumbnails exist in thumbs folder', () => {
      const fs = require('fs');
      const path = require('path');

      const thumbsPath = path.resolve(__dirname, '..', 'images', 'thumbs');
      expect(fs.existsSync(thumbsPath)).toBe(true);

      // Check for key thumbnail images (note: some have different casing)
      const thumbFiles = [
        'ISTQB.jpg',
        'GitHub.jpg',
        'agile.jpg', // lowercase (fixed from cleanup)
      ];

      thumbFiles.forEach((file) => {
        const filePath = path.join(thumbsPath, file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });

    test('certificates.js contains 16 certificates', () => {
      const fs = require('fs');
      const path = require('path');
      const certJsPath = path.resolve(__dirname, '..', 'js', 'certificates.js');
      const certJsContent = fs.readFileSync(certJsPath, 'utf8');

      // Count certificate objects (id: 1 through id: 16)
      const certMatches = certJsContent.match(/id:\s*\d+/g);
      expect(certMatches).toBeTruthy();
      expect(certMatches.length).toBeGreaterThanOrEqual(16);
    });

    test('certificates.js has path detection for subfolder support', () => {
      const fs = require('fs');
      const path = require('path');
      const certJsPath = path.resolve(__dirname, '..', 'js', 'certificates.js');
      const certJsContent = fs.readFileSync(certJsPath, 'utf8');

      // Verify path detection function
      expect(certJsContent).toContain('getBasePath');
      expect(certJsContent).toContain('window.location.pathname');
    });
  });

  describe('Styles and CSS', () => {
    test('has custom CSS styles defined', () => {
      const styles = document.querySelectorAll('style');
      expect(styles.length).toBeGreaterThan(0);
    });

    test('defines gradient card styles', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toContain('.gradient-card');
    });

    test('defines intro card styles', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toContain('.intro-card');
    });

    test('defines skill tag styles', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toContain('.skill-tag');
    });

    test('defines parallax background gradients', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toContain('.parallax-experience');
      expect(styles).toContain('.parallax-articles');
      expect(styles).toContain('.parallax-fundamentals');
    });

    test('has styles for skill tags', () => {
      const styles = Array.from(document.querySelectorAll('style'))
        .map((s) => s.textContent)
        .join('');
      expect(styles).toContain('.skill-tag');
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

    test('loads init.js', () => {
      const initScript = document.querySelector('script[src*="init.js"]');
      expect(initScript).toBeTruthy();
    });

    test('loads certificates.js script', () => {
      const certScript = document.querySelector('script[src*="certificates.js"]');
      expect(certScript).toBeTruthy();
    });

    test('has CV request form handler script', () => {
      const scripts = Array.from(document.querySelectorAll('script'))
        .map((s) => s.textContent)
        .join('');
      expect(scripts).toContain('sendCVRequest');
    });

    test('CV handler validates form fields', () => {
      const scripts = Array.from(document.querySelectorAll('script'))
        .map((s) => s.textContent)
        .join('');
      expect(scripts).toContain('cv-name');
      expect(scripts).toContain('cv-subject');
      expect(scripts).toContain('cv-message');
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
      expect(title.textContent).toContain('Marcelo Costa');
      expect(title.textContent).toContain('SDET');
    });

    test('has viewport meta tag', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    test('has charset meta tag', () => {
      const charset =
        document.querySelector('meta[charset]') ||
        document.querySelector('meta[http-equiv="Content-Type"]');
      expect(charset).toBeTruthy();
      if (charset.hasAttribute('charset')) {
        expect(charset.getAttribute('charset').toUpperCase()).toBe('UTF-8');
      } else {
        expect(charset.getAttribute('content')).toContain('UTF-8');
      }
    });

    test('loads required CSS files', () => {
      const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      expect(cssLinks.length).toBeGreaterThan(0);

      const hrefs = Array.from(cssLinks).map((link) => link.getAttribute('href'));
      expect(hrefs).toContain('css/materialize.css');
      expect(hrefs).toContain('css/style.css');
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

  describe('Intro Cards Structure', () => {
    test('has all intro cards', () => {
      const introCards = document.querySelectorAll('.intro-card');
      expect(introCards.length).toBeGreaterThanOrEqual(3); // At least 3 intro cards
    });

    test('intro cards have proper class', () => {
      const introCards = document.querySelectorAll('.intro-card');
      introCards.forEach((card) => {
        expect(card.classList.contains('intro-card')).toBe(true);
      });
    });
  });
});
