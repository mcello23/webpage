import { certificates } from './certificates';

describe('Certificate Data Validation', () => {
  test('should have exactly 35 certificates', () => {
    expect(certificates).toHaveLength(35);
  });

  test('all certificates should have required fields', () => {
    certificates.forEach((cert) => {
      expect(cert).toHaveProperty('id');
      expect(cert).toHaveProperty('title');
      expect(cert).toHaveProperty('image');
      expect(cert).toHaveProperty('thumb');
      expect(cert).toHaveProperty('linkedinUrl');
      expect(cert).toHaveProperty('category');

      // Validate types
      expect(typeof cert.id).toBe('number');
      expect(typeof cert.title).toBe('string');
      expect(typeof cert.image).toBe('string');
      expect(typeof cert.thumb).toBe('string');
      expect(typeof cert.linkedinUrl).toBe('string');
      expect(typeof cert.category).toBe('string');
    });
  });

  test('all certificates should have valid image paths', () => {
    certificates.forEach((cert) => {
      expect(cert.image).toMatch(/^\/images\//);
      expect(cert.thumb).toMatch(/^\/images\/thumbs\//);
    });
  });

  test('all certificates should have valid LinkedIn URLs', () => {
    certificates.forEach((cert) => {
      expect(cert.linkedinUrl).toMatch(/^https:\/\//);
    });
  });
});
