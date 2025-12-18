/**
 * Navbar CSS Regression Test
 *
 * Guarantees that legacy responsive rules in `src/styles/style.min.css`
 * do NOT override the custom React navbar (`nav.main-nav`).
 *
 * This protects against layout glitches when resizing desktop -> mobile.
 */

const fs = require('fs');
const path = require('path');

describe('Navbar responsive CSS scoping', () => {
  test('style.min.css does not apply small-breakpoint nav rules to nav.main-nav', () => {
    const cssPath = path.resolve(__dirname, '../../src/styles/style.min.css');
    const css = fs.readFileSync(cssPath, 'utf8');

    // The problematic selectors were `nav .nav-wrapper` etc.
    // They must be scoped to exclude the custom navbar.
    expect(css).toContain('nav:not(.main-nav) .nav-wrapper');
    expect(css).toContain('nav:not(.main-nav) .brand-logo');
    expect(css).toContain('nav:not(.main-nav) .center-nav');

    // Ensure we didn't regress back to the unscoped selectors inside responsive blocks.
    // (Keeping this strict helps catch accidental re-minification or copy/paste regressions.)
    expect(css).not.toMatch(/@media[^{}]*\{[^}]*\bnav\s+\.nav-wrapper\b/);
    expect(css).not.toMatch(/@media[^{}]*\{[^}]*\bnav\s+\.brand-logo\b/);
  });
});
