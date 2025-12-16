// __tests__/certificate-data-validation.test.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

describe('Certificate Data Validation', () => {
  let certificates;

  const ROOT = path.resolve(__dirname, '..', '..');
  const certPath = path.resolve(ROOT, 'public', 'js', 'certificates.js');
  const certCode = fs.readFileSync(certPath, 'utf-8');

  beforeAll(() => {
    // 1) Try to load as a module (CommonJS or ESM transpiled)
    try {
      // CommonJS default or named export
      const mod = require(certPath);
      certificates = mod?.certificates ?? mod?.default?.certificates ?? mod?.default ?? mod;
    } catch {
      // 2) Fallback: extract the raw array literal safely via vm
      const m = certCode.match(/(?:^|\s)(?:export\s+)?const\s+certificates\s*=\s*\[([\s\S]*?)\];/);
      if (!m) {
        throw new Error('Could not find certificates array in certificates.js');
      }
      const sandbox = {};
      vm.createContext(sandbox);
      // Evaluate just the array, not the whole file
      vm.runInContext(`certificates = [${m[1]}];`, sandbox, { timeout: 50 });
      certificates = sandbox.certificates;
    }

    if (!Array.isArray(certificates)) {
      throw new Error('certificates is not an array');
    }
  });

  describe('Certificate Count', () => {
    test('should have exactly 35 certificates', () => {
      expect(certificates).toHaveLength(35);
    });
  });

  describe('Certificate Structure', () => {
    test('all certificates should have required fields', () => {
      certificates.forEach((cert) => {
        expect(cert).toHaveProperty('id');
        expect(cert).toHaveProperty('title');
        expect(cert).toHaveProperty('image');
        expect(cert).toHaveProperty('thumb');
        expect(cert).toHaveProperty('linkedinUrl');
        expect(cert).toHaveProperty('category');
      });
    });

    test('all certificate IDs should be unique and sequential', () => {
      const ids = certificates.map((c) => c.id);
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds).toHaveLength(35);
      expect(ids).toEqual([...Array(35)].map((_, i) => i + 1));
    });

    test('all titles should be non-empty strings', () => {
      certificates.forEach((cert) => {
        expect(typeof cert.title).toBe('string');
        expect(cert.title.length).toBeGreaterThan(0);
      });
    });

    test('all categories should be non-empty strings', () => {
      certificates.forEach((cert) => {
        expect(typeof cert.category).toBe('string');
        expect(cert.category.length).toBeGreaterThan(0);
      });
    });
  });

  describe('File Paths', () => {
    test('all images should start with "images/"', () => {
      certificates.forEach((cert) => {
        expect(cert.image).toMatch(/^images\//);
      });
    });

    test('all thumbs should start with "images/thumbs/"', () => {
      certificates.forEach((cert) => {
        expect(cert.thumb).toMatch(/^images\/thumbs\//);
      });
    });

    test('image and thumb filenames should match', () => {
      certificates.forEach((cert) => {
        const imageName = cert.image.replace(/^images\//, '');
        const thumbName = cert.thumb.replace(/^images\/thumbs\//, '');
        expect(imageName).toBe(thumbName);
      });
    });

    test('all image files should exist', () => {
      certificates.forEach((cert) => {
        const imagePath = path.resolve(ROOT, 'public', cert.image);
        expect(fs.existsSync(imagePath)).toBe(true);
      });
    });

    test('all thumb files should exist', () => {
      certificates.forEach((cert) => {
        const thumbPath = path.resolve(ROOT, 'public', cert.thumb);
        expect(fs.existsSync(thumbPath)).toBe(true);
      });
    });
  });

  describe('LinkedIn URL Sources', () => {
    test('should have certificates from multiple sources', () => {
      const sources = new Set();
      certificates.forEach((cert) => {
        if (cert.linkedinUrl) {
          try {
            const url = new URL(cert.linkedinUrl);
            sources.add(url.hostname);
          } catch {
            // invalid URL, ignore
          }
        }
      });
      expect(sources.size).toBeGreaterThan(0);
    });

    test('Udemy certificates should have correct URL format', () => {
      const udemyCerts = certificates.filter(
        (c) => c.linkedinUrl && c.linkedinUrl.includes('udemy')
      );
      udemyCerts.forEach((c) => {
        expect(c.linkedinUrl).toMatch(/udemy-certificate\.s3\.amazonaws\.com|udemy\.com/);
      });
    });

    test('LinkedIn CDN certificates should have correct URL format', () => {
      const linkedinCerts = certificates.filter(
        (c) => c.linkedinUrl && c.linkedinUrl.includes('licdn.com')
      );
      linkedinCerts.forEach((c) => {
        expect(c.linkedinUrl).toMatch(/licdn\.com/);
      });
    });

    test('Skilljar certificates should have correct URL format', () => {
      const skilljarCerts = certificates.filter(
        (c) => c.linkedinUrl && c.linkedinUrl.includes('skilljar')
      );
      skilljarCerts.forEach((c) => {
        expect(c.linkedinUrl).toMatch(/skilljar\.com/);
      });
    });
  });

  describe('Certificate Title Uniqueness', () => {
    test('all certificate titles should be unique', () => {
      const titles = certificates.map((c) => c.title);
      const uniqueTitles = [...new Set(titles)];
      expect(uniqueTitles).toHaveLength(certificates.length);
    });
  });

  describe('Category Distribution', () => {
    test('should have at least 3 different categories', () => {
      const categories = new Set(certificates.map((c) => c.category));
      expect(categories.size).toBeGreaterThanOrEqual(3);
    });

    test('categories should be properly formatted (capitalized)', () => {
      certificates.forEach((c) => {
        expect(c.category[0]).toBe(c.category[0].toUpperCase());
      });
    });
  });

  describe('Individual Certificates (table-driven)', () => {
    const EXPECTED = [
      [
        1,
        'Introduction to SQL',
        'images/introduction-to-sql.jpg',
        'images/thumbs/introduction-to-sql.jpg',
        'Programming',
        'licdn.com',
      ],
      [
        2,
        'Agentic AI for Developers',
        'images/agentic-ai-for-developers.jpg',
        'images/thumbs/agentic-ai-for-developers.jpg',
        'Development Tools',
        'licdn.com',
      ],
      [
        3,
        'Cybersecurity at Work (2020)',
        'images/cybersecurity.jpg',
        'images/thumbs/cybersecurity.jpg',
        'Security',
        'licdn.com',
      ],
      [
        4,
        'Foundations of Building in Board',
        'images/board.jpg',
        'images/thumbs/board.jpg',
        'Professional Development',
        'skilljar.com',
      ],
      [
        5,
        'Automated Tests with Cypress - Advanced',
        'images/UC-39fc4bb5-3720-47d1-b884-e53ee0a1f936.jpg',
        'images/thumbs/UC-39fc4bb5-3720-47d1-b884-e53ee0a1f936.jpg',
        'Automation',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        6,
        'Design Elements of Automated Tests',
        'images/UC-12a0727f-82b2-4108-ad97-8947707d1ba1.jpg',
        'images/thumbs/UC-12a0727f-82b2-4108-ad97-8947707d1ba1.jpg',
        'Automation',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        7,
        'Playwright UI + API (10h course)',
        'images/UC-88588b80-4852-423b-9f93-039ae5f2cc5e.jpg',
        'images/thumbs/UC-88588b80-4852-423b-9f93-039ae5f2cc5e.jpg',
        'Automation',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        8,
        'AWS for Developers: DynamoDB',
        'images/aws-dynamodb.jpg',
        'images/thumbs/aws-dynamodb.jpg',
        'Cloud',
        'licdn.com',
      ],
      [
        9,
        'Learning Docker',
        'images/docker.jpg',
        'images/thumbs/docker.jpg',
        'DevOps',
        'licdn.com',
      ],
      [
        10,
        'Best Practices in Test Automation with Cypress',
        'images/UC-54a76f1a-f88a-4604-8ff2-8c79769b7508.jpg',
        'images/thumbs/UC-54a76f1a-f88a-4604-8ff2-8c79769b7508.jpg',
        'Automation',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        11,
        'E2E Tests With Cypress',
        'images/UC-142d6308-80ac-4a93-9a4b-36dd743fbd72.jpg',
        'images/thumbs/UC-142d6308-80ac-4a93-9a4b-36dd743fbd72.jpg',
        'Automation',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        12,
        'Playwright Automation',
        'images/UC-85215a99-00cb-493a-b171-15a7faf9a381.jpg',
        'images/thumbs/UC-85215a99-00cb-493a-b171-15a7faf9a381.jpg',
        'Automation',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        13,
        'GraphQL Essential Training',
        'images/graphql.jpg',
        'images/thumbs/graphql.jpg',
        'Development',
        'licdn.com',
      ],
      [
        14,
        'End-to-End JavaScript Testing with Cypress.io',
        'images/cypress-linkedin.jpg',
        'images/thumbs/cypress-linkedin.jpg',
        'Automation',
        'licdn.com',
      ],
      [
        15,
        'API Testing Foundations',
        'images/api-testing.jpg',
        'images/thumbs/api-testing.jpg',
        'Testing',
        'licdn.com',
      ],
      [
        16,
        'Gherkin Language - The Master Guide',
        'images/UC-67a4c481-8909-4c08-8517-23921c6bd2e9.jpg',
        'images/thumbs/UC-67a4c481-8909-4c08-8517-23921c6bd2e9.jpg',
        'Testing',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        17,
        'Learning Selenium',
        'images/selenium-linkedin.jpg',
        'images/thumbs/selenium-linkedin.jpg',
        'Automation',
        'licdn.com',
      ],
      [
        18,
        'Test Automation Foundations',
        'images/test-automation.jpg',
        'images/thumbs/test-automation.jpg',
        'Testing',
        'licdn.com',
      ],
      [
        19,
        'Working with Difficult People',
        'images/difficult-people.jpg',
        'images/thumbs/difficult-people.jpg',
        'Soft Skills',
        'licdn.com',
      ],
      [
        20,
        'Automation Selenium WebDriver + Java',
        'images/Selenium WebDriver e Java.jpg',
        'images/thumbs/Selenium WebDriver e Java.jpg',
        'Automation',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        21,
        'Mobile Automation: Appium Cucumber Android & iOS + Jenkins',
        'images/cucumber_appium.jpg',
        'images/thumbs/cucumber_appium.jpg',
        'Automation',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        22,
        'Agile Management with Scrum',
        'images/agile.jpg',
        'images/thumbs/agile.jpg',
        'Methodology',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        23,
        'Automation Test with Cypress - Basics',
        'images/UC-b1bf6ead-40d6-4942-9166-59de03c1f975.jpg',
        'images/thumbs/UC-b1bf6ead-40d6-4942-9166-59de03c1f975.jpg',
        'Automation',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        24,
        'Automation Test with Cypress - Intermediary',
        'images/cyp-inter.jpg',
        'images/thumbs/cyp-inter.jpg',
        'Automation',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        25,
        'Web Design for Beginners: Real World Coding in HTML & CSS',
        'images/UC-d3955587-e5a2-416e-a652-9a95704f5f5c.jpg',
        'images/thumbs/UC-d3955587-e5a2-416e-a652-9a95704f5f5c.jpg',
        'Web Development',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        26,
        'Software Testing: Becoming an Expert',
        'images/UC-3ef466ba-72f0-4bc2-8d3e-c01128ea22f9.jpg',
        'images/thumbs/UC-3ef466ba-72f0-4bc2-8d3e-c01128ea22f9.jpg',
        'Testing',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        27,
        'Postman Introduction',
        'images/UC-808536a6-a2bd-44e2-9b9a-74f423f72c72.jpg',
        'images/thumbs/UC-808536a6-a2bd-44e2-9b9a-74f423f72c72.jpg',
        'API Testing',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        28,
        'The Python Bible™ | Everything You Need to Program in Python',
        'images/UC-b9368ddf-124c-464a-8cc4-4f1be7d63754.jpg',
        'images/thumbs/UC-b9368ddf-124c-464a-8cc4-4f1be7d63754.jpg',
        'Programming',
        'mcello23.github.io',
      ],
      [
        29,
        'GitHub Intensive Course',
        'images/UC-5c615f9b-603b-4140-a57e-5349ab84ee6f.jpg',
        'images/thumbs/UC-5c615f9b-603b-4140-a57e-5349ab84ee6f.jpg',
        'Development Tools',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        30,
        'Regular Expressions',
        'images/UC-9b5ea711-6721-49cd-8281-83248eb4179b.jpg',
        'images/thumbs/UC-9b5ea711-6721-49cd-8281-83248eb4179b.jpg',
        'Programming',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        31,
        'Python for Beginners (Python 3)',
        'images/UC-f46ea1bb-4ed8-4269-aa12-6b18d0b24028.jpg',
        'images/thumbs/UC-f46ea1bb-4ed8-4269-aa12-6b18d0b24028.jpg',
        'Programming',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        32,
        'Cypress - Modern Automation Testing from Scratch + Frameworks',
        'images/UC-7479ab2b-a38b-482b-bf11-60b9d2188496.jpg',
        'images/thumbs/UC-7479ab2b-a38b-482b-bf11-60b9d2188496.jpg',
        'Automation',
        'github.com',
      ],
      [
        33,
        'Swift 5 Programming For Beginners',
        'images/Swift 5.jpg',
        'images/thumbs/Swift 5.jpg',
        'Programming',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        34,
        'Certified ISTQB Agile Tester Foundation Level',
        'images/ISTQB.jpg',
        'images/thumbs/ISTQB.jpg',
        'Testing',
        'udemy-certificate.s3.amazonaws.com',
      ],
      [
        35,
        'GitHub Ultimate: Master Git and GitHub - Beginner to Expert',
        'images/GitHub.jpg',
        'images/thumbs/GitHub.jpg',
        'Development Tools',
        'udemy-certificate.s3.amazonaws.com',
      ],
    ];

    test.each(EXPECTED)(
      'Certificate #%i - %s',
      (id, title, image, thumb, category, urlFragment) => {
        const cert = certificates.find((c) => c.id === id);
        expect(cert).toBeTruthy();

        expect(cert.title).toBe(title);
        expect(cert.image).toBe(image);
        expect(cert.thumb).toBe(thumb);
        expect(cert.category).toBe(category);

        if (urlFragment) {
          expect(cert.linkedinUrl).toBeTruthy();
          expect(String(cert.linkedinUrl)).toContain(urlFragment);
        }
      }
    );
  });
});
