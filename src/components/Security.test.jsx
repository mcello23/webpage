import { fireEvent, render, screen } from '@testing-library/react';
import CertificatesModal from './CertificatesModal';
import Footer from './Footer';

// Mock the certificates data
jest.mock('../data/certificates', () => ({
  certificates: [
    {
      id: 1,
      title: 'Test Certificate',
      category: 'Test Category',
      image: 'test-image.jpg',
      thumb: 'test-thumb.jpg',
      linkedinUrl: 'https://linkedin.com/test',
    },
  ],
}));

describe('Security and Performance Checks', () => {
  describe('CertificatesModal', () => {
    test('images use lazy loading and async decoding', () => {
      render(<CertificatesModal isOpen={true} onClose={() => {}} />);

      // Check thumbnail image
      const thumbImg = screen.getByAltText('Test Certificate');
      expect(thumbImg).toHaveAttribute('loading', 'lazy');
      expect(thumbImg).toHaveAttribute('decoding', 'async');

      // Open the certificate viewer
      fireEvent.click(screen.getByText('Test Certificate'));

      // Check full size image
      const images = screen.getAllByAltText('Test Certificate');
      // Both the thumbnail (if still in DOM) and the full image should have the attributes
      images.forEach((img) => {
        expect(img).toHaveAttribute('loading', 'lazy');
        expect(img).toHaveAttribute('decoding', 'async');
      });
    });

    test('external links have rel="noopener noreferrer"', () => {
      render(<CertificatesModal isOpen={true} onClose={() => {}} />);

      // Open the certificate viewer to see the links
      fireEvent.click(screen.getByText('Test Certificate'));

      const links = screen.getAllByRole('link');
      const externalLinks = links.filter((link) => link.getAttribute('target') === '_blank');

      expect(externalLinks.length).toBeGreaterThan(0);
      externalLinks.forEach((link) => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Footer', () => {
    test('external links have rel="noopener noreferrer"', () => {
      render(<Footer />);

      const links = screen.getAllByRole('link');
      const externalLinks = links.filter((link) => link.getAttribute('target') === '_blank');

      expect(externalLinks.length).toBeGreaterThan(0);
      externalLinks.forEach((link) => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });
});
