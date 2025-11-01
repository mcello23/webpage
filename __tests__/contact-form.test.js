const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Contact Form - Web3Forms Integration', () => {
  let dom;
  let document;

  beforeAll(() => {
    const htmlPath = path.resolve(__dirname, '..', 'index.html');
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
});
