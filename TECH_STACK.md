# Technology Stack Documentation

## Overview

This document provides a comprehensive overview of all technologies, tools, languages, and frameworks used in Marcelo Costa's QA/SDET portfolio webpage. The project demonstrates professional software engineering practices with extensive testing, modern tooling, and production-grade deployment infrastructure.

## Purpose

**Marcelo Costa – QA / SDET Portfolio** is a modern, performance-oriented, and accessibility-aware portfolio showcasing:
- Large-scale E2E automation expertise (Cypress, Playwright)
- Test architecture and delivery impact
- Professional web development practices
- Comprehensive testing methodologies
- CI/CD pipeline implementation

**Live Site**: [https://mcello23.github.io/webpage/index.html](https://mcello23.github.io/webpage/index.html)

---

## Core Technologies

### Frontend Stack

#### Languages
- **HTML5**: Semantic markup with accessibility focus (ARIA labels, semantic structure)
- **CSS3**: Modern styling with Flexbox, Grid, custom gradients, and CSS variables
- **JavaScript (ES2022)**: Vanilla JS with no SPA framework dependencies
  - Dual export pattern (browser globals + CommonJS) for testing compatibility
  - Modern async/await patterns
  - DOM manipulation and event handling

#### UI Frameworks & Libraries
- **Materialize CSS (v1.0.0)**: Responsive framework for layout and components
- **Font Awesome (v5.15.4)**: Icon library for visual elements
- **Google Material Icons**: Additional iconography
- **Prism.js**: Syntax highlighting for code samples
- **Chart.js (v4.4.0)**: Test dashboard visualizations
- **jQuery (v3.6.0)**: Required dependency for Materialize

### Backend & Build Tools

#### Package Management
- **Yarn (v4.11.0)**: Modern package manager with zero-installs support
- **Node.js (≥v22.20.0)**: Runtime environment for tooling

#### Module System
- **CommonJS**: Module export format for Node.js compatibility
- **ES Modules**: Modern import/export syntax where supported
- **Dual Exports**: Browser globals (window.*) + CommonJS exports for testing

---

## Testing Infrastructure

### Testing Frameworks (1,075 tests across 26 suites)

#### Jest (v30.2.0)
- **Environment**: jsdom (v27.0.1) for DOM testing + Node for unit tests
- **Transform**: @swc/jest (v0.2.39) - Fast ES2022 → CommonJS compilation
- **Coverage Provider**: v8 (fastest instrumentation)
- **Test Suites**: 26 suites (21 integration + 5 unit)
- **Coverage**: ~85% statements/lines, ~54% functions
- **Thresholds**: 
  - Branches: 40%
  - Functions: 35%
  - Lines: 50%
  - Statements: 50%

**Test Types**:
- Unit Tests (5 suites): Core module testing (certificates, cookie-consent, init, test-dashboard)
- Integration Tests (21 suites): DOM structure, accessibility, link integrity, responsive design

#### Puppeteer (v24.29.1)
- Realistic browser automation
- Full-page screenshots
- Element visibility validation
- Interactive behavior testing
- Visual regression prevention

#### K6
- Performance benchmarking
- Load testing (50 VUs, 30s duration)
- HTTP response time monitoring
- Performance metrics (p95, p99)

### Testing Support Libraries
- **@babel/core (v7.28.5)**: JavaScript transpilation
- **@babel/preset-env (v7.28.5)**: Smart preset for target environments
- **babel-jest (v30.2.0)**: Jest transformer
- **@swc/core (v1.14.0)**: Fast compiler for JS/TS
- **cheerio (v1.1.2)**: HTML parsing in tests
- **jest-environment-jsdom (v30.2.0)**: Browser-like test environment

---

## Code Quality & Linting

### Linters

#### ESLint (v9.38.0)
- **Config Format**: Flat config (ESLint 9+ format)
- **Plugins**: 
  - eslint-plugin-html (v8.1.3): Lint inline JavaScript in HTML files
- **Scope**: JavaScript files (.js) and inline scripts in HTML files
- **Rules**: ES2022 syntax support, browser and Node.js globals

**Ignored Patterns**:
- node_modules, images, videos, backgrounds
- Third-party libraries (materialize.js, prism.js)
- Coverage and test reports
- Build artifacts

#### Stylelint (v16.25.0)
- **Config**: stylelint-config-standard (v39.0.1)
- **Scope**: All CSS files
- **Custom Rules**: Relaxed selector and property patterns for flexibility
- **Ignored**: Third-party CSS (materialize.css, prism.css)

### Code Formatting

#### Prettier (v3.6.2)
- **Scope**: JS, HTML, CSS, JSON files
- **Integration**: Runs as part of CI/CD pipeline
- **Commands**: 
  - `format:check`: Verify formatting
  - `format`: Auto-format all files

### Quality Commands
- `yarn quality`: Run all linting and format checks
- `yarn quality:fix`: Auto-fix all issues

---

## Image Processing

### Sharp (v0.34.4)
- High-performance image processing
- Thumbnail generation and optimization
- WebP conversion with JPG fallback
- Metadata stripping for size reduction

### ImageMagick
- Batch thumbnail processing
- 300px width standardization for certificates
- Quality 85 compression
- Unsharp filter (0x0.5) for clarity
- File size optimization (8-24KB per thumbnail)

---

## Security

### Content Security Policy (CSP)
Implemented via `_headers` file for Cloudflare Pages:

```
Content-Security-Policy: 
  default-src 'self';
  img-src 'self' data: https:;
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://code.jquery.com https://cdnjs.cloudflare.com;
  connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://api.web3forms.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
  font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self' https://api.web3forms.com;
  upgrade-insecure-requests
```

### Security Headers
- **Strict-Transport-Security**: max-age=63072000; includeSubDomains; preload
- **X-Content-Type-Options**: nosniff
- **X-Frame-Options**: DENY
- **X-XSS-Protection**: 1; mode=block
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Disabled geolocation, camera, microphone, payment, USB

### Cache Control
- **Static Assets**: 1 year (31536000s) with immutable flag
- **HTML**: 5 minutes (300s) with must-revalidate
- **CORS**: Enabled for font files

---

## CI/CD & Deployment

### GitHub Actions

#### Workflow: CI Pipeline (`.github/workflows/ci.yml`)

**Triggers**:
- Push to main branch
- Pull requests to main
- Manual workflow dispatch

**Concurrency**: Cancel in-progress runs for same branch

**Jobs**:

1. **Lint Job** (5 min timeout)
   - Prettier format checking
   - ESLint (JS + HTML)
   - Stylelint (CSS)
   - Runs on Ubuntu latest
   - Node.js 22.20.0

2. **Test Job** (10 min timeout, depends on lint)
   - Jest tests with coverage
   - K6 performance tests
   - Puppeteer browser tests
   - Uploads artifacts:
     - jest-reports
     - k6-reports
     - coverage-report
     - puppeteer-reports

**Caching Strategy**:
- Yarn cache directory
- Puppeteer browser binaries
- node_modules
- Cache keys: OS + yarn.lock + package.json hash

**Environment**:
- Ubuntu latest
- Node.js 22.20.0
- Corepack enabled for Yarn 4
- K6 installed via Grafana action

### Deployment Platforms

#### Primary: Cloudflare Pages
- **URL**: https://marcelocosta.pages.dev
- **Deployment**: Automatic from main branch
- **Build Command**: `yarn build:cloudflare`
- **Features**:
  - Custom headers via `_headers` file
  - Security headers (CSP, HSTS, X-Frame-Options)
  - Cache control for static assets
  - HTTPS enforcement
  - HTTP/2 support
  - Ignore file: `.cfignore`

#### Secondary: GitHub Pages
- **URL**: https://mcello23.github.io/webpage/
- **Deployment**: Manual push to gh-pages branch
- **Static hosting**: All HTML, CSS, JS, and assets

### Build Process

#### Test Data Generation
```bash
yarn build:cloudflare
```
- Creates report directories
- Runs Jest unit tests with coverage
- Generates test results JSON
- Creates `test-data.js` with live metrics
- Prepares Cloudflare deployment bundle

---

## Custom Features

### Certificate Modal System
- **Purpose**: Showcase 35 professional certificates
- **Technology**: Vanilla JavaScript (no external library)
- **Features**:
  - Grid view with lazy-loaded thumbnails (300px width)
  - Full-size image viewer with keyboard navigation
  - Category badges and LinkedIn credential links
  - Dynamic base path resolution for nested pages
  - Accessibility: Arrow keys, Escape, Backspace
  - Individual validation tests for each certificate

### Test Dashboard
- **Purpose**: Live test results display on homepage
- **Technology**: Vanilla JS with Chart.js
- **Features**:
  - Real-time metrics (1,075 tests, 26 suites)
  - Auto-refresh every 30 seconds
  - Jest and K6 performance data
  - Coverage metrics (statements, branches, functions, lines)
  - Modal view with scrollable test suites
  - Custom gradient scrollbar styling
  - Instance tracking with static `destroyAll()` method
  - Environment guards prevent auto-init during tests

### Cookie Consent
- **Purpose**: GDPR compliance
- **Technology**: Vanilla JS with localStorage
- **Features**:
  - Accept/decline functionality
  - localStorage persistence
  - Dismissible banner
  - Dual export pattern for testing

### Module Architecture

All core JavaScript modules use **dual export pattern**:
- **Browser globals**: `window.CertificateModal`, `window.TestDashboard`
- **CommonJS exports**: `module.exports` for Jest/Node testing
- **Environment guards**: `NODE_ENV === 'test'` prevents auto-initialization
- **Resource cleanup**: destroy() methods, interval clearing

---

## Languages Summary

### Production Code
- **JavaScript (ES2022)**: 100% of application logic
- **HTML5**: Semantic markup and structure
- **CSS3**: All styling (no preprocessors)

### Configuration
- **JSON**: Package configuration, test results, coverage data
- **YAML**: GitHub Actions workflows
- **JavaScript (CommonJS)**: Build and test configuration

### Shell Scripts
- **Bash**: Test runners, thumbnail generation, build scripts
- **Node.js Scripts**: Test data generation, Cloudflare build prep

---

## Dependency Management

### Dependabot
- **Schedule**: Weekly automatic updates
- **Scope**: npm/yarn dependencies
- **Configuration**: `.github/dependabot.yml`
- **Recent Updates**: 
  - jsdom: 22.1.0 → 27.0.1 (Oct 2025)
  - eslint: 8.57.1 → 9.38.0 (Oct 2025)
  - eslint-plugin-html: 7.1.0 → 8.1.3 (Oct 2025)
  - prettier: 2.8.8 → 3.6.2 (Oct 2025)

### Package Manager Features
- **Yarn 4**: Berry architecture with PnP mode
- **Zero Installs**: Cached dependencies in `.yarn/cache`
- **Offline Mode**: Works without network access
- **Constraints**: Engine requirements enforced

---

## Performance Optimizations

### Frontend Optimization
- **Critical CSS**: Inline styles for above-the-fold content
- **Font Loading**: `font-display: swap` for web fonts
- **Image Optimization**: 
  - Lazy loading for certificate thumbnails
  - Optimized WebP with JPG fallback for profile
  - Standardized thumbnail sizes (300px width)
- **Resource Hints**:
  - Preconnect for CDN resources
  - Fetchpriority for LCP image

### Build Optimization
- **Unminified CSS**: Readable for development (can be minified)
- **Gradients**: Replace large hero images
- **Limited External Requests**: Minimal CDN dependencies
- **Cache Headers**: Long-term caching for static assets

### Test Performance
- **SWC**: Fast compiler (3x-20x faster than Babel)
- **Parallel Testing**: Max 8 workers
- **Coverage Provider v8**: Fastest instrumentation

---

## Evolution (PR History Analysis)

### November 2025 (PRs #12-16)
- **Test Dashboard & Modal System**: Converted test page to modal overlay with Chart.js
- **Test Suite Expansion**: 714 → 1,075 tests (50% growth)
- **CI/CD Improvements**: Coverage artifacts, report deployment fixes
- **Dependency Updates**: Major version bumps via Dependabot

### October 2025 (PRs #7-11)
- **Major Dependency Updates**:
  - jsdom 22 → 27 (breaking changes)
  - eslint 8 → 9 (flat config migration)
  - eslint-plugin-html 7 → 8
  - prettier 2 → 3
- **Image Optimization**: Thumbnail standardization to 300px
- **Project Restructuring**: Consolidated image directories

### Q3-Q4 2025
- Custom certificate modal (replaced external gallery)
- Navigation redesign with compact mobile menu
- Accessibility refinements (ARIA, semantic HTML)
- Performance optimizations (non-blocking CSS, font-display)
- Security improvements (CSP headers, XSS prevention)

### Early 2025 (PRs #5-6)
- Updated homepage descriptions
- Content refinements

### 2023 (PRs #1-4)
- Initial project structure
- CodeSandbox integration
- Base responsive design

---

## Browser Support

**Target**: Modern evergreen browsers
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)
- iOS Safari (latest)
- Chrome Android (latest)

**Not Supported**: Internet Explorer

---

## Accessibility Features

- **ARIA Labels**: Icon-only CTAs have descriptive labels
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard support for modals
- **Screen Reader**: Compatible with assistive technologies
- **High Contrast**: Readable color combinations
- **Focus Management**: Visible focus indicators
- **Role Attributes**: Proper ARIA roles for custom components

---

## Documentation

### README.md
- Comprehensive project documentation
- Installation and usage instructions
- Test suite overview
- Development guidelines
- Changelog tracking

### Inline Documentation
- JavaScript: JSDoc-style comments where needed
- HTML: Semantic structure self-documenting
- CSS: Section comments for organization

---

## External Services

### CDN Resources
- **jQuery**: code.jquery.com
- **Materialize CSS**: cdnjs.cloudflare.com
- **Font Awesome**: cdnjs.cloudflare.com
- **Google Fonts**: fonts.googleapis.com / fonts.gstatic.com

### Analytics & Tracking
- **Google Analytics**: Configured via CSP (gtag.js, analytics.js)
- **Google Tag Manager**: GTM container support

### Third-Party APIs
- **Calendly**: Booking system integration (marceloadsc/15min)
- **Web3Forms**: Contact form backend (api.web3forms.com)

---

## Project Statistics

- **Total Tests**: 1,075 across 26 suites
- **Test Coverage**: ~85% statements/lines, ~54% functions
- **Certificates**: 35 with individual validation
- **Code Files**: 
  - JavaScript: 6 core modules + tests
  - HTML: 4 pages (index + 3 sections)
  - CSS: 8 stylesheets (7 custom + 1 framework)
- **Image Assets**: 70+ (35 certificates + thumbnails + profile)
- **Dependencies**: 17 devDependencies (zero runtime deps for frontend)

---

## Development Commands

### Testing
```bash
yarn test                  # Run all tests
yarn test:unit             # Unit tests with coverage
yarn test:integration      # Integration tests only
yarn test:jest             # Jest via shell script
yarn test:k6               # K6 performance tests
yarn test:puppeteer        # Puppeteer browser tests
yarn test:reports          # Generate all reports
```

### Linting & Formatting
```bash
yarn lint                  # ESLint (JS + HTML)
yarn lint:fix              # Auto-fix ESLint issues
yarn lint:css              # Stylelint
yarn lint:css:fix          # Auto-fix CSS issues
yarn format                # Prettier format
yarn format:check          # Check formatting
yarn quality               # All quality checks
yarn quality:fix           # Auto-fix all issues
```

### Build & Deploy
```bash
yarn build:cloudflare      # Prepare Cloudflare build
yarn generate-test-data    # Generate test-data.js
```

---

## Repository Information

- **Name**: mcello23/webpage
- **License**: MIT License
- **Primary Language**: JavaScript
- **Homepage**: https://marcelocosta.pages.dev
- **GitHub**: https://github.com/mcello23/webpage
- **Created**: January 2023
- **Active Development**: Continuous updates and improvements

---

## Conclusion

This technology stack represents a **production-grade, professionally architected web application** with:
- ✅ Comprehensive testing (1,075 automated tests)
- ✅ Modern tooling (ESLint 9, Jest 30, Puppeteer 24)
- ✅ Security best practices (CSP, security headers, HTTPS)
- ✅ Performance optimization (caching, lazy loading, CDN)
- ✅ Accessibility compliance (ARIA, semantic HTML, keyboard nav)
- ✅ CI/CD automation (GitHub Actions, Cloudflare Pages)
- ✅ Code quality enforcement (linters, formatters, coverage thresholds)
- ✅ Dependency management (Dependabot, Yarn 4)

The project demonstrates **QA/SDET expertise** through:
- Multiple testing frameworks (Jest, Puppeteer, K6)
- Comprehensive test coverage and types
- Automated CI/CD pipelines
- Live test results dashboard
- Quality tooling integration
- Performance monitoring

**Built with care by Marcelo Costa | © 2025**
