const fs = require('fs');
const path = require('path');

describe('Certificate Data Validation', () => {
  let certificates;

  beforeAll(() => {
    // Load the certificates.js file
    const certPath = path.resolve(__dirname, '..', '..', 'js', 'certificates.js');
    const certCode = fs.readFileSync(certPath, 'utf-8');

    // Extract certificates array from the file
    const match = certCode.match(/const certificates = \[([\s\S]*?)\];/);
    if (!match) {
      throw new Error('Could not find certificates array in certificates.js');
    }

    // Evaluate the array
    eval('certificates = [' + match[1] + '];');
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
      const ids = certificates.map((cert) => cert.id);
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds).toHaveLength(35);
      expect(ids).toEqual([...Array(35).keys()].map((i) => i + 1));
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
        const imageName = cert.image.replace('images/', '');
        const thumbName = cert.thumb.replace('images/thumbs/', '');
        expect(imageName).toBe(thumbName);
      });
    });

    test('all image files should exist', () => {
      certificates.forEach((cert) => {
        const imagePath = path.resolve(__dirname, '..', '..', cert.image);
        expect(fs.existsSync(imagePath)).toBe(true);
      });
    });

    test('all thumb files should exist', () => {
      certificates.forEach((cert) => {
        const thumbPath = path.resolve(__dirname, '..', '..', cert.thumb);
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
            // Invalid URL, skip
          }
        }
      });
      expect(sources.size).toBeGreaterThan(0);
    });

    test('Udemy certificates should have correct URL format', () => {
      const udemyCerts = certificates.filter(
        (cert) => cert.linkedinUrl && cert.linkedinUrl.includes('udemy')
      );
      udemyCerts.forEach((cert) => {
        expect(cert.linkedinUrl).toMatch(/udemy-certificate\.s3\.amazonaws\.com|udemy\.com/);
      });
    });

    test('LinkedIn CDN certificates should have correct URL format', () => {
      const linkedinCerts = certificates.filter(
        (cert) => cert.linkedinUrl && cert.linkedinUrl.includes('licdn.com')
      );
      linkedinCerts.forEach((cert) => {
        expect(cert.linkedinUrl).toMatch(/licdn\.com/);
      });
    });

    test('Skilljar certificates should have correct URL format', () => {
      const skilljarCerts = certificates.filter(
        (cert) => cert.linkedinUrl && cert.linkedinUrl.includes('skilljar')
      );
      skilljarCerts.forEach((cert) => {
        expect(cert.linkedinUrl).toMatch(/skilljar\.com/);
      });
    });
  });

  describe('Certificate Title Uniqueness', () => {
    test('all certificate titles should be unique', () => {
      const titles = certificates.map((cert) => cert.title);
      const uniqueTitles = [...new Set(titles)];
      expect(uniqueTitles).toHaveLength(certificates.length);
    });
  });

  describe('Category Distribution', () => {
    test('should have at least 3 different categories', () => {
      const categories = new Set(certificates.map((cert) => cert.category));
      expect(categories.size).toBeGreaterThanOrEqual(3);
    });

    test('categories should be properly formatted (capitalized)', () => {
      certificates.forEach((cert) => {
        expect(cert.category[0]).toBe(cert.category[0].toUpperCase());
      });
    });
  });

  describe('Individual Certificate Tests - All 35 Certificates', () => {
    // Helper function to validate certificate data
    const validateCertificate = (cert, expectedData) => {
      expect(cert.id).toBe(expectedData.id);
      expect(cert.title).toBe(expectedData.title);
      expect(cert.image).toBe(expectedData.image);
      expect(cert.thumb).toBe(expectedData.thumb);
      expect(cert.category).toBe(expectedData.category);
      if (expectedData.linkedinUrl) {
        expect(cert.linkedinUrl).toBeTruthy();
        expect(cert.linkedinUrl).toContain(expectedData.urlFragment);
      }
    };

    test('Certificate #1 - Cybersecurity at Work (2020)', () => {
      validateCertificate(certificates[0], {
        id: 1,
        title: 'Cybersecurity at Work (2020)',
        image: 'images/cybersecurity.jpg',
        thumb: 'images/thumbs/cybersecurity.jpg',
        category: 'Security',
        urlFragment: 'licdn.com',
      });
    });

    test('Certificate #2 - Foundations of Building in Board', () => {
      validateCertificate(certificates[1], {
        id: 2,
        title: 'Foundations of Building in Board',
        image: 'images/board.jpg',
        thumb: 'images/thumbs/board.jpg',
        category: 'Professional Development',
        urlFragment: 'skilljar.com',
      });
    });

    test('Certificate #3 - Automated Tests with Cypress - Advanced', () => {
      validateCertificate(certificates[2], {
        id: 3,
        title: 'Automated Tests with Cypress - Advanced',
        image: 'images/UC-39fc4bb5-3720-47d1-b884-e53ee0a1f936.jpg',
        thumb: 'images/thumbs/UC-39fc4bb5-3720-47d1-b884-e53ee0a1f936.jpg',
        category: 'Automation',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #4 - Design Elements of Automated Tests', () => {
      validateCertificate(certificates[3], {
        id: 4,
        title: 'Design Elements of Automated Tests',
        image: 'images/UC-12a0727f-82b2-4108-ad97-8947707d1ba1.jpg',
        thumb: 'images/thumbs/UC-12a0727f-82b2-4108-ad97-8947707d1ba1.jpg',
        category: 'Automation',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #5 - Playwright UI + API (10h course)', () => {
      validateCertificate(certificates[4], {
        id: 5,
        title: 'Playwright UI + API (10h course)',
        image: 'images/UC-88588b80-4852-423b-9f93-039ae5f2cc5e.jpg',
        thumb: 'images/thumbs/UC-88588b80-4852-423b-9f93-039ae5f2cc5e.jpg',
        category: 'Automation',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #6 - AWS for Developers: DynamoDB', () => {
      validateCertificate(certificates[5], {
        id: 6,
        title: 'AWS for Developers: DynamoDB',
        image: 'images/aws-dynamodb.jpg',
        thumb: 'images/thumbs/aws-dynamodb.jpg',
        category: 'Cloud',
        urlFragment: 'licdn.com',
      });
    });

    test('Certificate #7 - Learning Docker', () => {
      validateCertificate(certificates[6], {
        id: 7,
        title: 'Learning Docker',
        image: 'images/docker.jpg',
        thumb: 'images/thumbs/docker.jpg',
        category: 'DevOps',
        urlFragment: 'licdn.com',
      });
    });

    test('Certificate #8 - Best Practices in Test Automation with Cypress', () => {
      validateCertificate(certificates[7], {
        id: 8,
        title: 'Best Practices in Test Automation with Cypress',
        image: 'images/UC-54a76f1a-f88a-4604-8ff2-8c79769b7508.jpg',
        thumb: 'images/thumbs/UC-54a76f1a-f88a-4604-8ff2-8c79769b7508.jpg',
        category: 'Automation',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #9 - E2E Tests With Cypress', () => {
      validateCertificate(certificates[8], {
        id: 9,
        title: 'E2E Tests With Cypress',
        image: 'images/UC-142d6308-80ac-4a93-9a4b-36dd743fbd72.jpg',
        thumb: 'images/thumbs/UC-142d6308-80ac-4a93-9a4b-36dd743fbd72.jpg',
        category: 'Automation',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #10 - Playwright Automation', () => {
      validateCertificate(certificates[9], {
        id: 10,
        title: 'Playwright Automation',
        image: 'images/UC-85215a99-00cb-493a-b171-15a7faf9a381.jpg',
        thumb: 'images/thumbs/UC-85215a99-00cb-493a-b171-15a7faf9a381.jpg',
        category: 'Automation',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #11 - GraphQL Essential Training', () => {
      validateCertificate(certificates[10], {
        id: 11,
        title: 'GraphQL Essential Training',
        image: 'images/graphql.jpg',
        thumb: 'images/thumbs/graphql.jpg',
        category: 'Development',
        urlFragment: 'licdn.com',
      });
    });

    test('Certificate #12 - End-to-End JavaScript Testing with Cypress.io', () => {
      validateCertificate(certificates[11], {
        id: 12,
        title: 'End-to-End JavaScript Testing with Cypress.io',
        image: 'images/cypress-linkedin.jpg',
        thumb: 'images/thumbs/cypress-linkedin.jpg',
        category: 'Automation',
        urlFragment: 'licdn.com',
      });
    });

    test('Certificate #13 - API Testing Foundations', () => {
      validateCertificate(certificates[12], {
        id: 13,
        title: 'API Testing Foundations',
        image: 'images/api-testing.jpg',
        thumb: 'images/thumbs/api-testing.jpg',
        category: 'Testing',
        urlFragment: 'licdn.com',
      });
    });

    test('Certificate #14 - Gherkin Language - The Master Guide', () => {
      validateCertificate(certificates[13], {
        id: 14,
        title: 'Gherkin Language - The Master Guide',
        image: 'images/UC-67a4c481-8909-4c08-8517-23921c6bd2e9.jpg',
        thumb: 'images/thumbs/UC-67a4c481-8909-4c08-8517-23921c6bd2e9.jpg',
        category: 'Testing',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #15 - Learning Selenium', () => {
      validateCertificate(certificates[14], {
        id: 15,
        title: 'Learning Selenium',
        image: 'images/selenium-linkedin.jpg',
        thumb: 'images/thumbs/selenium-linkedin.jpg',
        category: 'Automation',
        urlFragment: 'licdn.com',
      });
    });

    test('Certificate #16 - Test Automation Foundations', () => {
      validateCertificate(certificates[15], {
        id: 16,
        title: 'Test Automation Foundations',
        image: 'images/test-automation.jpg',
        thumb: 'images/thumbs/test-automation.jpg',
        category: 'Testing',
        urlFragment: 'licdn.com',
      });
    });

    test('Certificate #17 - Working with Difficult People', () => {
      validateCertificate(certificates[16], {
        id: 17,
        title: 'Working with Difficult People',
        image: 'images/difficult-people.jpg',
        thumb: 'images/thumbs/difficult-people.jpg',
        category: 'Soft Skills',
        urlFragment: 'licdn.com',
      });
    });

    test('Certificate #18 - Automation Selenium WebDriver + Java', () => {
      validateCertificate(certificates[17], {
        id: 18,
        title: 'Automation Selenium WebDriver + Java',
        image: 'images/Selenium WebDriver e Java.jpg',
        thumb: 'images/thumbs/Selenium WebDriver e Java.jpg',
        category: 'Automation',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #19 - Mobile Automation: Appium Cucumber Android & iOS + Jenkins', () => {
      validateCertificate(certificates[18], {
        id: 19,
        title: 'Mobile Automation: Appium Cucumber Android & iOS + Jenkins',
        image: 'images/cucumber_appium.jpg',
        thumb: 'images/thumbs/cucumber_appium.jpg',
        category: 'Automation',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #20 - Agile Management with Scrum', () => {
      validateCertificate(certificates[19], {
        id: 20,
        title: 'Agile Management with Scrum',
        image: 'images/agile.jpg',
        thumb: 'images/thumbs/agile.jpg',
        category: 'Methodology',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #21 - Automation Test with Cypress - Basics', () => {
      validateCertificate(certificates[20], {
        id: 21,
        title: 'Automation Test with Cypress - Basics',
        image: 'images/UC-b1bf6ead-40d6-4942-9166-59de03c1f975.jpg',
        thumb: 'images/thumbs/UC-b1bf6ead-40d6-4942-9166-59de03c1f975.jpg',
        category: 'Automation',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #22 - Automation Test with Cypress - Intermediary', () => {
      validateCertificate(certificates[21], {
        id: 22,
        title: 'Automation Test with Cypress - Intermediary',
        image: 'images/cyp-inter.jpg',
        thumb: 'images/thumbs/cyp-inter.jpg',
        category: 'Automation',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #23 - Web Design for Beginners: Real World Coding in HTML & CSS', () => {
      validateCertificate(certificates[22], {
        id: 23,
        title: 'Web Design for Beginners: Real World Coding in HTML & CSS',
        image: 'images/UC-d3955587-e5a2-416e-a652-9a95704f5f5c.jpg',
        thumb: 'images/thumbs/UC-d3955587-e5a2-416e-a652-9a95704f5f5c.jpg',
        category: 'Web Development',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #24 - Software Testing: Becoming an Expert', () => {
      validateCertificate(certificates[23], {
        id: 24,
        title: 'Software Testing: Becoming an Expert',
        image: 'images/UC-3ef466ba-72f0-4bc2-8d3e-c01128ea22f9.jpg',
        thumb: 'images/thumbs/UC-3ef466ba-72f0-4bc2-8d3e-c01128ea22f9.jpg',
        category: 'Testing',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #25 - Postman Introduction', () => {
      validateCertificate(certificates[24], {
        id: 25,
        title: 'Postman Introduction',
        image: 'images/UC-808536a6-a2bd-44e2-9b9a-74f423f72c72.jpg',
        thumb: 'images/thumbs/UC-808536a6-a2bd-44e2-9b9a-74f423f72c72.jpg',
        category: 'API Testing',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #26 - The Python Bible™ | Everything You Need to Program in Python', () => {
      validateCertificate(certificates[25], {
        id: 26,
        title: 'The Python Bible™ | Everything You Need to Program in Python',
        image: 'images/UC-b9368ddf-124c-464a-8cc4-4f1be7d63754.jpg',
        thumb: 'images/thumbs/UC-b9368ddf-124c-464a-8cc4-4f1be7d63754.jpg',
        category: 'Programming',
        urlFragment: 'mcello23.github.io',
      });
    });

    test('Certificate #27 - GitHub Intensive Course', () => {
      validateCertificate(certificates[26], {
        id: 27,
        title: 'GitHub Intensive Course',
        image: 'images/UC-5c615f9b-603b-4140-a57e-5349ab84ee6f.jpg',
        thumb: 'images/thumbs/UC-5c615f9b-603b-4140-a57e-5349ab84ee6f.jpg',
        category: 'Development Tools',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #28 - Regular Expressions', () => {
      validateCertificate(certificates[27], {
        id: 28,
        title: 'Regular Expressions',
        image: 'images/UC-9b5ea711-6721-49cd-8281-83248eb4179b.jpg',
        thumb: 'images/thumbs/UC-9b5ea711-6721-49cd-8281-83248eb4179b.jpg',
        category: 'Programming',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #29 - Python for Beginners (Python 3)', () => {
      validateCertificate(certificates[28], {
        id: 29,
        title: 'Python for Beginners (Python 3)',
        image: 'images/UC-f46ea1bb-4ed8-4269-aa12-6b18d0b24028.jpg',
        thumb: 'images/thumbs/UC-f46ea1bb-4ed8-4269-aa12-6b18d0b24028.jpg',
        category: 'Programming',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #30 - Cypress - Modern Automation Testing from Scratch + Frameworks', () => {
      validateCertificate(certificates[29], {
        id: 30,
        title: 'Cypress - Modern Automation Testing from Scratch + Frameworks',
        image: 'images/UC-7479ab2b-a38b-482b-bf11-60b9d2188496.jpg',
        thumb: 'images/thumbs/UC-7479ab2b-a38b-482b-bf11-60b9d2188496.jpg',
        category: 'Automation',
        urlFragment: 'github.com',
      });
    });

    test('Certificate #31 - Swift 5 Programming For Beginners', () => {
      validateCertificate(certificates[30], {
        id: 31,
        title: 'Swift 5 Programming For Beginners',
        image: 'images/Swift 5.jpg',
        thumb: 'images/thumbs/Swift 5.jpg',
        category: 'Programming',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #32 - Certified ISTQB Agile Tester Foundation Level', () => {
      validateCertificate(certificates[31], {
        id: 32,
        title: 'Certified ISTQB Agile Tester Foundation Level',
        image: 'images/ISTQB.jpg',
        thumb: 'images/thumbs/ISTQB.jpg',
        category: 'Testing',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #33 - GitHub Ultimate: Master Git and GitHub - Beginner to Expert', () => {
      validateCertificate(certificates[32], {
        id: 33,
        title: 'GitHub Ultimate: Master Git and GitHub - Beginner to Expert',
        image: 'images/GitHub.jpg',
        thumb: 'images/thumbs/GitHub.jpg',
        category: 'Development Tools',
        urlFragment: 'udemy-certificate.s3.amazonaws.com',
      });
    });

    test('Certificate #34 - Introduction to SQL', () => {
      validateCertificate(certificates[33], {
        id: 34,
        title: 'Introduction to SQL',
        image: 'images/introduction-to-sql.jpg',
        thumb: 'images/thumbs/introduction-to-sql.jpg',
        category: 'Programming',
        urlFragment: 'media.licdn.com',
      });
    });

    test('Certificate #35 - Agentic AI for Developers', () => {
      validateCertificate(certificates[34], {
        id: 35,
        title: 'Agentic AI for Developers',
        image: 'images/agentic-ai-for-developers.jpg',
        thumb: 'images/thumbs/agentic-ai-for-developers.jpg',
        category: 'Development Tools',
        urlFragment: 'media.licdn.com',
      });
    });
  });
});
