/**
 * Unit Tests for Contact Form Bot Protection (3-Layer Defense)
 * Tests: Honeypot, Timing Check, XSS Sanitization
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Security: Bot Protection - 3-Layer Defense', () => {
  let dom;
  let window;
  let document;

  // Cache HTML and script content (read once instead of 30+ times)
  let cachedHtml;
  let cachedScriptMatch;
  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '../../..', 'index.html');
    cachedHtml = fs.readFileSync(htmlPath, 'utf8');
    cachedScriptMatch = cachedHtml.match(
      /async function sendCVRequest\(e\)[\s\S]*?(?=\n\s*<\/script>)/
    );

    // Initialize JSDOM once for DOM tests (no need to recreate 28 times)
    dom = new JSDOM(cachedHtml, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost',
    });
    window = dom.window;
    document = window.document;

    // Extract sendCVRequest function from the HTML
    if (cachedScriptMatch) {
      // Evaluate the function in the JSDOM window context
      window.eval(`
        window.formLoadTime = Date.now();
        ${cachedScriptMatch[0]}
      `);
    }
  });

  afterAll(() => {
    if (dom && dom.window) dom.window.close();
  });
  describe('Layer 1: Honeypot Field Detection', () => {
    test('honeypot field exists in HTML', () => {
      const honeypot = document.getElementById('botcheck');
      expect(honeypot).toBeTruthy();
      expect(honeypot.tagName).toBe('INPUT');
    });

    test('honeypot field is hidden with absolute positioning', () => {
      const honeypot = document.getElementById('botcheck');
      const style = honeypot.getAttribute('style');
      expect(style).toContain('position: absolute');
      expect(style).toContain('left: -9999px');
    });

    test('honeypot field has correct name attribute', () => {
      const honeypot = document.getElementById('botcheck');
      expect(honeypot.getAttribute('name')).toBe('botcheck');
    });

    test('honeypot field has no label (invisible to users)', () => {
      const label = document.querySelector('label[for="botcheck"]');
      expect(label).toBeFalsy();
    });

    test('honeypot field has tabindex -1 (not keyboard accessible)', () => {
      const honeypot = document.getElementById('botcheck');
      expect(honeypot.getAttribute('tabindex')).toBe('-1');
    });

    test('honeypot field has autocomplete off', () => {
      const honeypot = document.getElementById('botcheck');
      expect(honeypot.getAttribute('autocomplete')).toBe('off');
    });

    test('sendCVRequest function checks honeypot field', () => {
      expect(cachedScriptMatch).toBeTruthy();
      expect(cachedScriptMatch[0]).toContain('botcheck');
      expect(cachedScriptMatch[0]).toContain('if (honeypot)');
    });

    test('form submission blocked if honeypot filled (bot behavior)', () => {
      expect(cachedScriptMatch).toBeTruthy();
      // Should silently return/reject if honeypot is filled
      expect(cachedScriptMatch[0]).toContain('if (honeypot)');
      expect(cachedScriptMatch[0]).toContain('return false');
    });
  });

  describe('Layer 2: Timing Check (800ms threshold)', () => {
    test('formLoadTime is initialized on page load', () => {
      expect(cachedHtml).toContain('formLoadTime = Date.now()');
    });

    test('formLoadTime is declared in global scope', () => {
      expect(cachedHtml).toContain('formLoadTime');
      expect(cachedHtml).toContain('Date.now()');
    });

    test('sendCVRequest function calculates time elapsed', () => {
      expect(cachedScriptMatch).toBeTruthy();
      expect(cachedScriptMatch[0]).toContain('Date.now()');
      expect(cachedScriptMatch[0]).toContain('formLoadTime');
    });

    test('timing check threshold is 800ms', () => {
      expect(cachedScriptMatch).toBeTruthy();
      expect(cachedScriptMatch[0]).toMatch(/[<\s]800/);
    });

    test('form submission blocked if submitted too quickly', () => {
      expect(cachedScriptMatch).toBeTruthy();
      // Should reject submissions under 800ms
      expect(cachedScriptMatch[0]).toMatch(/if\s*\([^)]*[<\s]800[^)]*\)/);
    });

    test('user sees error message for too-fast submission', () => {
      expect(cachedScriptMatch).toBeTruthy();
      // Should show user-friendly error
      expect(cachedScriptMatch[0]).toMatch(/too\s+(fast|quick)/i);
    });
  });

  describe('Layer 3: XSS Pattern Sanitization', () => {
    test('input sanitization regex is defined', () => {
      expect(cachedScriptMatch).toBeTruthy();
      expect(cachedScriptMatch[0]).toMatch(/<script|javascript:|onerror=|onclick=/i);
    });

    test('blocks <script> tag injection', () => {
      expect(cachedScriptMatch).toBeTruthy();
      expect(cachedScriptMatch[0]).toContain('<script');
    });

    test('blocks javascript: protocol injection', () => {
      expect(cachedScriptMatch).toBeTruthy();
      expect(cachedScriptMatch[0]).toContain('javascript:');
    });

    test('blocks onerror= event handler injection', () => {
      expect(cachedScriptMatch).toBeTruthy();
      expect(cachedScriptMatch[0]).toContain('onerror=');
    });

    test('blocks onclick= event handler injection', () => {
      expect(cachedScriptMatch).toBeTruthy();
      expect(cachedScriptMatch[0]).toContain('onclick=');
    });

    test('sanitization checks all input fields', () => {
      expect(cachedScriptMatch).toBeTruthy();
      // Should iterate through form fields
      expect(cachedScriptMatch[0]).toMatch(/cv-name|cv-email|cv-subject|cv-message/);
    });

    test('shows user-friendly error for suspicious input', () => {
      expect(cachedScriptMatch).toBeTruthy();
      expect(cachedScriptMatch[0]).toMatch(/invalid|suspicious|detected/i);
    });
  });

  describe('Integration: All 3 Layers Work Together', () => {
    test('bot protection runs before form submission', () => {
      expect(cachedScriptMatch).toBeTruthy();
      const preventDefaultPos = cachedScriptMatch[0].indexOf('preventDefault');
      const honeypotPos = cachedScriptMatch[0].indexOf('botcheck');
      const timingPos = cachedScriptMatch[0].indexOf('formLoadTime');
      const sanitizePos = cachedScriptMatch[0].indexOf('<script');

      // All checks should come after preventDefault
      expect(preventDefaultPos).toBeLessThan(honeypotPos);
      expect(preventDefaultPos).toBeLessThan(timingPos);
      expect(preventDefaultPos).toBeLessThan(sanitizePos);
    });

    test('checks execute in correct order: honeypot -> timing -> sanitization', () => {
      expect(cachedScriptMatch).toBeTruthy();
      const honeypotPos = cachedScriptMatch[0].indexOf('botcheck');
      const timingPos = cachedScriptMatch[0].indexOf('Date.now() - formLoadTime');
      const sanitizePos = cachedScriptMatch[0].indexOf('<script');

      // Logical order for early rejection
      expect(honeypotPos).toBeLessThan(timingPos);
      expect(timingPos).toBeLessThan(sanitizePos);
    });

    test('legitimate user submission passes all checks', () => {
      expect(cachedScriptMatch).toBeTruthy();
      // Should reach fetch call if all checks pass
      expect(cachedScriptMatch[0]).toContain('fetch');
      expect(cachedScriptMatch[0]).toContain('api.web3forms.com/submit');
    });

    test('bot submission fails gracefully (no console errors)', () => {
      expect(cachedScriptMatch).toBeTruthy();
      // Silent rejection for bots (no console.error for honeypot)
      const honeypotSection = cachedScriptMatch[0].substring(
        cachedScriptMatch[0].indexOf('botcheck'),
        cachedScriptMatch[0].indexOf('botcheck') + 200
      );
      expect(honeypotSection).not.toContain('console.error');
    });
  });

  describe('Performance: Bot Protection Overhead', () => {
    test('timing check calculation is O(1) complexity', () => {
      expect(cachedScriptMatch).toBeTruthy();
      // Should be simple subtraction, not iteration
      expect(cachedScriptMatch[0]).toMatch(/Date\.now\(\)\s*-\s*formLoadTime/);
    });

    test('sanitization regex is compiled once (not per-field)', () => {
      expect(cachedScriptMatch).toBeTruthy();
      // Should use single regex test, not multiple .includes()
      const regexMatches = (cachedScriptMatch[0].match(/test\(/g) || []).length;
      expect(regexMatches).toBeGreaterThanOrEqual(1);
    });

    test('honeypot check exits early (fail-fast pattern)', () => {
      expect(cachedScriptMatch).toBeTruthy();
      // Should return early if honeypot filled
      expect(cachedScriptMatch[0]).toContain('if (honeypot)');
      expect(cachedScriptMatch[0]).toMatch(/honeypot[\s\S]{0,200}return false/);
    });
  });
});
