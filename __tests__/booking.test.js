const fs = require('fs');
const path = require('path');

describe('Calendly Booking Functionality', () => {
  let htmlContent;

  beforeAll(() => {
    const htmlPath = path.join(__dirname, '../index.html');
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  });

  describe('Book 15-min Button in Navigation', () => {
    test('should have a booking button in the navigation', () => {
      expect(htmlContent).toContain('class="social-icon"');
      expect(htmlContent).toContain('schedule'); // Material icon for calendar/booking
    });

    test('should have correct href pointing to Calendly', () => {
      expect(htmlContent).toContain('href="https://calendly.com/marceloadsc/15min"');
    });

    test('should open in new tab (target="_blank")', () => {
      const bookingPattern = /calendly\.com[\s\S]{0,400}target="_blank"/;
      expect(htmlContent).toMatch(bookingPattern);
    });

    test('should have rel="noopener noreferrer" for security', () => {
      const bookingPattern = /calendly\.com[\s\S]{0,500}rel="noopener noreferrer"/;
      expect(htmlContent).toMatch(bookingPattern);
    });

    test('should have proper aria-label for accessibility', () => {
      expect(htmlContent).toContain('aria-label="Book a 15-minute call"');
    });

    test('should have CTA link class for call-to-action buttons', () => {
      // Book 15-min call uses cta-link class, not social-icon
      const buttonPattern =
        /href="https:\/\/calendly\.com\/marceloadsc\/15min"[\s\S]{0,200}class="cta-link/;
      expect(htmlContent).toMatch(buttonPattern);
    });

    test('should contain schedule icon', () => {
      expect(htmlContent).toContain('schedule');
      expect(htmlContent).toContain('material-icons');
    });

    test('should NOT display text, only icon (like GitHub/LinkedIn)', () => {
      const bookingPattern =
        /href="https:\/\/calendly\.com\/[^>]*>[\s\S]{0,100}<i class="material-icons"/;
      expect(htmlContent).toMatch(bookingPattern);
    });
  });

  describe('Calendly URL Validation', () => {
    test('should use valid Calendly domain', () => {
      expect(htmlContent).toContain('calendly.com');
    });

    test('should have specific user slug in URL', () => {
      expect(htmlContent).toContain('marceloadsc');
    });

    test('should specify 15min event type', () => {
      expect(htmlContent).toContain('/15min');
    });

    test('Calendly link should be complete and properly formatted', () => {
      const calendlyPattern = /https:\/\/calendly\.com\/marceloadsc\/15min/;
      expect(htmlContent).toMatch(calendlyPattern);
    });
  });

  describe('Booking Button Styling', () => {
    test('should have booking-cta specific styles defined', () => {
      expect(htmlContent).toContain('.nav-cta.booking-cta');
    });

    test('booking-cta should have gradient background styles', () => {
      const bookingCtaPattern = /\.nav-cta\.booking-cta\s*{[^}]*linear-gradient/;
      expect(htmlContent).toMatch(bookingCtaPattern);
    });

    test('booking-cta should have hover styles defined', () => {
      expect(htmlContent).toContain('.nav-cta.booking-cta:hover');
    });

    test('booking-cta should have purple gradient colors', () => {
      const gradientPattern = /#667eea.*#764ba2|#764ba2.*#667eea/;
      expect(htmlContent).toMatch(gradientPattern);
    });

    test('nav-cta should have transition for smooth hover effect', () => {
      const transitionPattern = /\.nav-cta\s*{[^}]*transition/;
      expect(htmlContent).toMatch(transitionPattern);
    });
  });

  describe('Multiple Booking Locations', () => {
    test('should have booking link in social-nav list', () => {
      const pattern = /<ul class="social-nav">[\s\S]*?schedule[\s\S]*?<\/ul>/;
      expect(htmlContent).toMatch(pattern);
    });

    test('should be alongside GitHub and LinkedIn icons', () => {
      const githubPattern = /<ul class="social-nav">[\s\S]*?fa-github[\s\S]*?<\/ul>/;
      const linkedinPattern = /<ul class="social-nav">[\s\S]*?fa-linkedin[\s\S]*?<\/ul>/;
      const bookingPattern = /<ul class="social-nav">[\s\S]*?schedule[\s\S]*?<\/ul>/;

      expect(htmlContent).toMatch(githubPattern);
      expect(htmlContent).toMatch(linkedinPattern);
      expect(htmlContent).toMatch(bookingPattern);
    });

    test('should have booking button in footer CTA section', () => {
      expect(htmlContent).toContain('Book 15-min Call');
    });

    test('footer booking link should point to same Calendly URL', () => {
      const matches = htmlContent.match(/https:\/\/calendly\.com\/marceloadsc\/15min/g);
      expect(matches).not.toBeNull();
      expect(matches.length).toBeGreaterThanOrEqual(2); // At least in header and footer
    });
  });

  describe('Security and Best Practices', () => {
    test('should use HTTPS for Calendly link', () => {
      expect(htmlContent).toContain('https://calendly.com');
      expect(htmlContent).not.toContain('http://calendly.com');
    });

    test('should have noopener noreferrer for external link', () => {
      const bookingLinkPattern = /calendly\.com[\s\S]{0,200}rel="noopener noreferrer"/;
      expect(htmlContent).toMatch(bookingLinkPattern);
    });

    test('should open in new tab to preserve user context', () => {
      const bookingLinkPattern = /calendly\.com[\s\S]{0,200}target="_blank"/;
      expect(htmlContent).toMatch(bookingLinkPattern);
    });
  });

  describe('User Experience', () => {
    test('should have clear call-to-action text in footer', () => {
      expect(htmlContent).toContain('Book 15-min Call');
    });

    test('should have icon that represents scheduling/calendar', () => {
      // Accept both 'schedule' and 'event' icons as both are used
      const scheduleIconPattern = /<i[^>]*>(schedule|event)<\/i>/;
      expect(htmlContent).toMatch(scheduleIconPattern);
    });

    test('should match styling of CTA buttons in header', () => {
      // Header booking button should use cta-link class for call-to-action
      const ctaPattern = /calendly\.com[\s\S]{0,200}cta-link/;
      expect(htmlContent).toMatch(ctaPattern);
    });
  });

  describe('Responsive Design', () => {
    test('booking button should be visible in navigation', () => {
      // Check for schedule icon (used in navigation)
      const pattern = /<nav[\s\S]*?(schedule|event)[\s\S]*?<\/nav>/;
      expect(htmlContent).toMatch(pattern);
    });

    test('should not have display:none that would hide the button', () => {
      const bookingBtnPattern = /schedule[\s\S]{0,100}style="[^"]*display:\s*none/;
      expect(htmlContent).not.toMatch(bookingBtnPattern);
    });
  });
});
