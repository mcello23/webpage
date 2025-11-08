const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Contact Form - Web3Forms Integration', () => {
  let dom;
  let document;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '..', '..', 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  describe('API Key Configuration', () => {
    test('access_key hidden input field exists', () => {
      const accessKeyInput = document.getElementById('access_key');
      expect(accessKeyInput).toBeTruthy();
      expect(accessKeyInput.tagName).toBe('INPUT');
      expect(accessKeyInput.getAttribute('type')).toBe('hidden');
    });

    test('access_key has a non-empty value', () => {
      const accessKeyInput = document.getElementById('access_key');
      const value = accessKeyInput.getAttribute('value');
      expect(value).toBeTruthy();
      expect(value.length).toBeGreaterThan(0);
    });

    test('access_key value matches expected UUID format', () => {
      const accessKeyInput = document.getElementById('access_key');
      const value = accessKeyInput.getAttribute('value');
      // UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      expect(value).toMatch(uuidRegex);
    });

    test('access_key is part of the contact form', () => {
      const form = document.getElementById('cv-form');
      const accessKeyInput = document.getElementById('access_key');
      expect(form).toBeTruthy();
      expect(form.contains(accessKeyInput)).toBe(true);
    });

    test('access_key has correct name attribute for Web3Forms', () => {
      const accessKeyInput = document.getElementById('access_key');
      expect(accessKeyInput.getAttribute('name')).toBe('access_key');
    });
  });

  describe('Contact Form Structure', () => {
    test('form has correct ID', () => {
      const form = document.getElementById('cv-form');
      expect(form).toBeTruthy();
      expect(form.tagName).toBe('FORM');
    });

    test('form has required fields', () => {
      const emailInput = document.getElementById('cv-email');
      const nameInput = document.getElementById('cv-name');
      const subjectInput = document.getElementById('cv-subject');
      const messageInput = document.getElementById('cv-message');

      expect(emailInput).toBeTruthy();
      expect(nameInput).toBeTruthy();
      expect(subjectInput).toBeTruthy();
      expect(messageInput).toBeTruthy();
    });

    test('email field has correct type and attributes', () => {
      const emailInput = document.getElementById('cv-email');
      expect(emailInput.getAttribute('type')).toBe('email');
      expect(emailInput.hasAttribute('required')).toBe(true);
      expect(emailInput.getAttribute('name')).toBe('email');
    });

    test('hidden fields have correct values', () => {
      const subjectField = document.querySelector('input[name="subject"]');
      const fromNameField = document.querySelector('input[name="from_name"]');

      expect(subjectField).toBeTruthy();
      expect(subjectField.getAttribute('value')).toBe('Message from Portfolio');

      expect(fromNameField).toBeTruthy();
      expect(fromNameField.getAttribute('value')).toBe('Portfolio Contact Form');
    });
  });

  describe('Form Submit Handler Validation', () => {
    test('form has onsubmit attribute', () => {
      const form = document.getElementById('cv-form');
      expect(form.hasAttribute('onsubmit')).toBe(true);
    });

    test('onsubmit handler calls sendCVRequest function', () => {
      const form = document.getElementById('cv-form');
      const onsubmitValue = form.getAttribute('onsubmit');
      expect(onsubmitValue).toBeTruthy();
      expect(onsubmitValue).toContain('sendCVRequest');
    });

    test('onsubmit handler passes event parameter', () => {
      const form = document.getElementById('cv-form');
      const onsubmitValue = form.getAttribute('onsubmit');
      expect(onsubmitValue).toContain('event');
    });

    test('onsubmit handler syntax is correct', () => {
      const form = document.getElementById('cv-form');
      const onsubmitValue = form.getAttribute('onsubmit');
      // Should match pattern: return functionName(event)
      const handlerRegex = /return\s+sendCVRequest\s*\(\s*event\s*\)/;
      expect(onsubmitValue).toMatch(handlerRegex);
    });

    test('sendCVRequest function is defined in HTML script tag', () => {
      const htmlPath = path.resolve(__dirname, '..', '..', 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf8');
      expect(html).toContain('async function sendCVRequest');
    });

    test('sendCVRequest function accepts event parameter', () => {
      const htmlPath = path.resolve(__dirname, '..', '..', 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf8');
      // Check for function signature with event parameter
      expect(html).toMatch(/async\s+function\s+sendCVRequest\s*\(\s*e\s*\)/);
    });

    test('sendCVRequest function calls preventDefault', () => {
      const htmlPath = path.resolve(__dirname, '..', '..', 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf8');
      const scriptMatch = html.match(/async function sendCVRequest[\s\S]*?(?=<\/script>)/);
      expect(scriptMatch).toBeTruthy();
      expect(scriptMatch[0]).toContain('e.preventDefault()');
    });

    test('sendCVRequest function makes fetch call to web3forms API', () => {
      const htmlPath = path.resolve(__dirname, '..', '..', 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf8');
      const scriptMatch = html.match(/async function sendCVRequest[\s\S]*?(?=<\/script>)/);
      expect(scriptMatch).toBeTruthy();
      expect(scriptMatch[0]).toContain('fetch');
      expect(scriptMatch[0]).toContain('api.web3forms.com/submit');
    });

    test('sendCVRequest function handles form validation', () => {
      const htmlPath = path.resolve(__dirname, '..', '..', 'index.html');
      const html = fs.readFileSync(htmlPath, 'utf8');
      const scriptMatch = html.match(/async function sendCVRequest[\s\S]*?(?=<\/script>)/);
      expect(scriptMatch).toBeTruthy();
      expect(scriptMatch[0]).toContain('cv-form');
      expect(scriptMatch[0]).toContain('cv-name');
      expect(scriptMatch[0]).toContain('cv-email');
      expect(scriptMatch[0]).toContain('cv-subject');
      expect(scriptMatch[0]).toContain('cv-message');
    });

    test('submit button exists with correct ID', () => {
      const submitBtn = document.getElementById('submit-btn');
      expect(submitBtn).toBeTruthy();
      expect(submitBtn.tagName).toBe('BUTTON');
    });

    test('form contains all required UI elements for feedback', () => {
      const btnText = document.getElementById('btn-text');
      const btnLoading = document.getElementById('btn-loading');
      const cvConfirm = document.getElementById('cv-confirm');
      const successMsg = document.getElementById('success-msg');
      const errorMsg = document.getElementById('error-msg');

      expect(btnText).toBeTruthy();
      expect(btnLoading).toBeTruthy();
      expect(cvConfirm).toBeTruthy();
      expect(successMsg).toBeTruthy();
      expect(errorMsg).toBeTruthy();
    });
  });
});
