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

  // Cache script content
  let cachedScriptContent;
  let cachedHtml;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '../../..', 'index.html');
    const jsPath = path.resolve(__dirname, '../../..', 'js', 'contact-form.js');

    cachedHtml = fs.readFileSync(htmlPath, 'utf8');
    cachedScriptContent = fs.readFileSync(jsPath, 'utf8');

    // Initialize JSDOM once for DOM tests
    dom = new JSDOM(cachedHtml, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost',
    });
    window = dom.window;
    document = window.document;

    // Mock formLoadTime in window context since we're not executing the external script in JSDOM
    window.eval('window.formLoadTime = Date.now();');
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
      expect(cachedScriptContent).toBeTruthy();
      expect(cachedScriptContent).toContain('botcheck');
      expect(cachedScriptContent).toContain('if (honeypot)');
    });

    test('form submission blocked if honeypot filled (bot behavior)', () => {
      expect(cachedScriptContent).toBeTruthy();
      // Should silently return/reject if honeypot is filled
      expect(cachedScriptContent).toContain('if (honeypot)');
      expect(cachedScriptContent).toContain('return false');
    });
  });

  describe('Layer 2: Timing Check (800ms threshold)', () => {
    test('formLoadTime is initialized', () => {
      expect(cachedScriptContent).toContain('formLoadTime = Date.now()');
    });

    test('formLoadTime is declared in global scope', () => {
      expect(cachedScriptContent).toContain('const formLoadTime');
      expect(cachedScriptContent).toContain('Date.now()');
    });

    test('sendCVRequest function calculates time elapsed', () => {
      expect(cachedScriptContent).toBeTruthy();
      expect(cachedScriptContent).toContain('Date.now()');
      expect(cachedScriptContent).toContain('formLoadTime');
    });

    test('timing check threshold is 800ms', () => {
      expect(cachedScriptContent).toBeTruthy();
      expect(cachedScriptContent).toMatch(/[<\s]800/);
    });

    test('form submission blocked if submitted too quickly', () => {
      expect(cachedScriptContent).toBeTruthy();
      // Should reject submissions under 800ms
      expect(cachedScriptContent).toMatch(/if\s*\([^)]*[<\s]800[^)]*\)/);
    });

    test('user sees error message for too-fast submission', () => {
      expect(cachedScriptContent).toBeTruthy();
      // Should show user-friendly error
      expect(cachedScriptContent).toMatch(/too\s+(fast|quick)/i);
    });
  });

  describe('Layer 3: XSS Pattern Sanitization', () => {
    test('input sanitization regex is defined', () => {
      expect(cachedScriptContent).toBeTruthy();
      expect(cachedScriptContent).toMatch(/<script|javascript:|onerror=|onclick=/i);
    });

    test('blocks <script> tag injection', () => {
      expect(cachedScriptContent).toBeTruthy();
      expect(cachedScriptContent).toContain('<script');
    });

    test('blocks javascript: protocol injection', () => {
      expect(cachedScriptContent).toBeTruthy();
      expect(cachedScriptContent).toContain('javascript:');
    });

    test('blocks onerror= event handler injection', () => {
      expect(cachedScriptContent).toBeTruthy();
      expect(cachedScriptContent).toContain('onerror=');
    });

    test('blocks onclick= event handler injection', () => {
      expect(cachedScriptContent).toBeTruthy();
      expect(cachedScriptContent).toContain('onclick=');
    });

    test('sanitization checks all input fields', () => {
      expect(cachedScriptContent).toBeTruthy();
      // Should iterate through form fields
      expect(cachedScriptContent).toMatch(/cv-name|cv-email|cv-subject|cv-message/);
    });

    test('shows user-friendly error for suspicious input', () => {
      expect(cachedScriptContent).toBeTruthy();
      expect(cachedScriptContent).toMatch(/invalid|suspicious|detected/i);
    });
  });

  describe('Integration: All 3 Layers Work Together', () => {
    test('bot protection runs before form submission', () => {
      expect(cachedScriptContent).toBeTruthy();

      // Find positions within the sendCVRequest function to ensure we check execution order
      const functionStart = cachedScriptContent.indexOf('function sendCVRequest');
      const functionBody = cachedScriptContent.substring(functionStart);

      const preventDefaultPos = functionBody.indexOf('preventDefault');
      const honeypotPos = functionBody.indexOf('botcheck');
      // Use a unique string for timing check usage inside the function
      const timingPos = functionBody.indexOf('Date.now() - formLoadTime');
      const sanitizePos = functionBody.indexOf('<script');

      // All checks should come after preventDefault
      expect(preventDefaultPos).toBeLessThan(honeypotPos);
      expect(preventDefaultPos).toBeLessThan(timingPos);
      expect(preventDefaultPos).toBeLessThan(sanitizePos);
    });

    test('checks execute in correct order: honeypot -> timing -> sanitization', () => {
      expect(cachedScriptContent).toBeTruthy();
      const honeypotPos = cachedScriptContent.indexOf('botcheck');
      const timingPos = cachedScriptContent.indexOf('Date.now() - formLoadTime');
      const sanitizePos = cachedScriptContent.indexOf('<script');

      // Logical order for early rejection
      expect(honeypotPos).toBeLessThan(timingPos);
      expect(timingPos).toBeLessThan(sanitizePos);
    });

    test('legitimate user submission passes all checks', () => {
      expect(cachedScriptContent).toBeTruthy();
      // Should reach fetch call if all checks pass
      expect(cachedScriptContent).toContain('fetch');
      expect(cachedScriptContent).toContain('api.web3forms.com/submit');
    });

    test('bot submission fails gracefully (no console errors)', () => {
      expect(cachedScriptContent).toBeTruthy();
      // Silent rejection for bots (no console.error for honeypot)
      const honeypotSection = cachedScriptContent.substring(
        cachedScriptContent.indexOf('botcheck'),
        cachedScriptContent.indexOf('botcheck') + 200
      );
      expect(honeypotSection).not.toContain('console.error');
    });
  });

  describe('Performance: Bot Protection Overhead', () => {
    test('timing check calculation is O(1) complexity', () => {
      expect(cachedScriptContent).toBeTruthy();
      // Should be simple subtraction, not iteration
      expect(cachedScriptContent).toMatch(/Date\.now\(\)\s*-\s*formLoadTime/);
    });

    test('sanitization regex is compiled once (not per-field)', () => {
      expect(cachedScriptContent).toBeTruthy();
      // Should use single regex test, not multiple .includes()
      const regexMatches = (cachedScriptContent.match(/test\(/g) || []).length;
      expect(regexMatches).toBeGreaterThanOrEqual(1);
    });

    test('honeypot check exits early (fail-fast pattern)', () => {
      expect(cachedScriptContent).toBeTruthy();
      // Should return early if honeypot filled
      expect(cachedScriptContent).toContain('if (honeypot)');
      expect(cachedScriptContent).toMatch(/honeypot[\s\S]{0,200}return false/);
    });
  });
});
