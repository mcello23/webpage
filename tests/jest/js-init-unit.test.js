/**
 * Unit Tests for js/init.js
 * Tests Materialize initialization code
 */

const fs = require('fs');
const path = require('path');

describe('init.js - Unit Tests', () => {
  let initCode;

  beforeAll(() => {
    initCode = fs.readFileSync(path.join(__dirname, '../../js/init.js'), 'utf8');
  });

  describe('File Structure', () => {
    test('file exists and is readable', () => {
      expect(initCode).toBeTruthy();
      expect(initCode.length).toBeGreaterThan(50);
    });

    test('uses jQuery wrapper pattern', () => {
      expect(initCode).toContain('(function ($)');
      // Updated to handle conditional jQuery loading
      expect(initCode).toMatch(/\}\)\(.*jQuery.*\)/);
    });

    test('waits for document ready', () => {
      expect(initCode).toContain('$(function ()');
    });
  });

  describe('Materialize Component Initialization', () => {
    test('initializes sidenav component', () => {
      expect(initCode).toContain('.sidenav');
      expect(initCode).toContain('.sidenav()');
    });

    test('initializes parallax component', () => {
      expect(initCode).toContain('.parallax');
      expect(initCode).toContain('.parallax()');
    });
  });

  describe('Code Structure', () => {
    test('uses jQuery selectors', () => {
      expect(initCode).toContain("$('");
    });

    test('properly closes function scopes', () => {
      const openBraces = (initCode.match(/\{/g) || []).length;
      const closeBraces = (initCode.match(/\}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    test('properly closes parentheses', () => {
      const openParens = (initCode.match(/\(/g) || []).length;
      const closeParens = (initCode.match(/\)/g) || []).length;
      expect(openParens).toBe(closeParens);
    });
  });

  describe('jQuery Integration', () => {
    test('uses jQuery namespace protection', () => {
      expect(initCode).toContain('(function ($)');
      expect(initCode).toContain('// end of jQuery name space');
    });

    test('references jQuery at the end', () => {
      // Updated to handle conditional jQuery loading
      expect(initCode).toMatch(/\}\)\(.*jQuery.*\)/);
    });
  });

  describe('Code Quality', () => {
    test('includes proper indentation', () => {
      const lines = initCode.split('\n');
      const indentedLines = lines.filter((line) => line.startsWith('  '));
      expect(indentedLines.length).toBeGreaterThan(0);
    });

    test('includes code comments', () => {
      expect(initCode).toContain('// end of document ready');
      expect(initCode).toContain('// end of jQuery name space');
    });

    test('uses semicolons for statement termination', () => {
      expect(initCode).toContain(';');
    });
  });
});
