# Marcelo Costa – QA / SDET Portfolio

[![Tests](https://img.shields.io/badge/tests-804%2B%20passing-brightgreen)](/__tests__)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Modern, performance‑oriented and accessibility‑aware portfolio highlighting large scale E2E automation, test architecture, and delivery impact (Cypress, Playwright, CI/CD).

## 🌐 Live Demo

Visit the live portfolio: [Link](https://mcello23.github.io/webpage/index.html)

## ✨ Highlights

### Core

- Fully responsive (mobile → desktop) with progressive enhancement.
- Accessible navigation (ARIA, keyboard friendly modals, semantic structure).
- SEO + rich snippets (JSON‑LD Person schema, meta & Open Graph tags).
- Performance conscious: minimal blocking assets, gradients over large images, no heavy SPA framework.
- Consistent visual system (CSS variables + utility patterns).

### Certificate Gallery (Custom, Vanilla JS)

- Replaced external gallery tooling with a lean modal + grid implementation.
- Keyboard support: ArrowLeft / ArrowRight, Escape, Backspace to return to grid.
- Lazy thumbnail loading + category badges + optional LinkedIn credential link.
- Works from nested pages using dynamic base path resolution.

### Testing & Quality Signals

- **800+ Jest tests** across 16 test suites covering:
  - DOM structure & accessibility attributes
  - Link integrity & cross-page consistency
  - Favicon assets & manifest validation
  - Responsive navigation behavior
  - Certificate data validation (33 individual certificate tests)
  - Gradient colors & visual consistency
  - Booking CTA & modal wiring
  - Articles & Writing section validation (URLs, text, images, tags, icons)
  - Tech Stack section validation (Shell & Environment, all technologies)
- Regex + structural assertions to detect regressions in navigation, Calendly CTA, and modal wiring.
- Style presence tests guard against accidental CSS regression (e.g., mobile menu compact design rules).
- Comprehensive certificate validation: structure, paths, LinkedIn URLs, categories.

### Side Projects & Frameworks Sections

- Showcases real automation repos (Playwright, Cypress) with contextual tech tags.
- Parallax / gradient sections delineate content zones without JS overhead.

### Accessibility

- High‑contrast actionable elements, focusable interactive regions.
- Explicit aria-labels for icon‑only CTAs (Calendly booking, social links).
- Uses role="list" semantics for custom tag libraries; screen‑reader only headings preserve document outline.

### Calendly CTA (Intentional Mismatch Explained)

The booking links use the event slug `/30min` while retaining the visible & aria wording “Book 15‑min call”. This is intentional per product/branding guidance; tests enforce both the 30min slug and 15‑minute wording so future refactors don’t “fix” it. Update instructions below.

## 📁 Project Structure

```
webpage/
├── index.html              # Main landing page
├── pages/                  # Secondary HTML pages
│   ├── frameworks.html     # Testing frameworks showcase
│   ├── side_proj.html      # Side projects portfolio
│   ├── responsive-tester.html # Responsive design tester
│   └── test-modal.html     # Certificate modal test page
│
├── css/                    # Stylesheets
│   ├── certificates.css    # Certificate modal styles
│   ├── materialize.css     # Materialize framework
│   ├── navbar.css          # Navigation bar styles
│   ├── prism.css           # Code syntax highlighting
│   └── style.css           # Main stylesheet
│
├── js/                     # JavaScript files
│   ├── certificates.js     # Certificate modal logic (33 certificates)
│   ├── init.js             # Materialize initialization
│   ├── materialize.js      # Materialize framework
│   └── prism.js            # Code syntax highlighting
│
├── images/                 # Image assets
│   ├── assets/             # Profile & supporting images
│   │   └── DSC_9554.jpg    # Profile photo
│   ├── thumbs/             # Certificate thumbnails (300px standardized)
│   │   └── *.jpg           # 33 optimized thumbnails
│   └── *.jpg               # Certificate images (full-size, 33 total)
│
├── favicon/                # Favicon files
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   └── site.webmanifest
│
├── utils/                  # Utility scripts
│   └── certificates/
│       ├── certificate-helper.html  # Certificate modal dev tool
│       └── regenerate-thumbnails.sh # Thumbnail standardization script
│
└── __tests__/              # Jest test suites (800+ tests across 16+ suites)
   ├── unit-performance-optimizations.test.js # Unit tests for performance optimizations
   ├── index.test.js
   ├── frameworks.test.js
   ├── side_proj.test.js
   ├── cross-page.test.js
   ├── favicon.test.js
   ├── responsive-tester.test.js
   ├── booking.test.js
   ├── booking-responsive.test.js
   ├── navbar-improvements.test.js
   ├── navbar-responsive-icon.test.js
   ├── gradient-colors.test.js
   ├── all-links.test.js
   ├── certificates.test.js  # 50 tests for all 33 certificates
   └── contact-form.test.js
```

## 🛠️ Tech Stack

### Frontend / UI

- HTML5 semantic layout
- CSS3 (Flexbox, Grid, custom gradients, utility classes)
- Vanilla JavaScript (no SPA framework)
- Materialize CSS (layout helpers + parallax basics)
- Font Awesome + Google Material Icons
- Prism.js (syntax highlighting for framework/code samples)

### Tooling & Quality

- Jest + JSDOM for DOM & structural tests
- Cheerio for HTML parsing in tests
- ESLint (with html plugin) & Prettier formatting
- Sharp (dev dependency; image processing capability if needed)
- ImageMagick (for image/WebP optimization)
- Dependabot (automated dependency updates)

# 🆕 Recent Improvements

- Added automated performance/unit tests for cache, CSS loading, image optimization, font-display, fetchpriority, and preconnect (see `unit-performance-optimizations.test.js`).
- Profile image now uses optimized WebP with JPG fallback.
- Static cache headers via `_headers` for better repeat-visit performance.
- Non-blocking CSS loading for faster rendering.
- Font loading improved with `font-display: swap`.
- LCP image prioritized with `fetchpriority`.
- Preconnect for CDN resources.
- Dependabot enabled for weekly dependency updates.

### Delivery

- npm scripts (no bundler required)
- GitHub Pages hosting
- Git version control workflow

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mcello23/webpage.git
   cd webpage
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run tests**

   ```bash
   npm test
   ```

4. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   npx http-server . -p 8080
   ```

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Run Specific Test Suite

```bash
npm test -- --testPathPattern=index
npm test -- --testPathPattern=frameworks
npm test -- --testPathPattern=side_proj
npm test -- --testPathPattern=cross-page
npm test -- --testPathPattern=favicon
```

### Coverage Focus

- Navigation & cross‑page structural consistency
- Favicon & manifest integrity
- Certificate gallery markup hooks & data validation
- All 33 certificates individually tested (structure, paths, URLs, categories)
- Calendly CTA semantics + security attributes
- Responsive navigation (mobile compact menu rules)
- Styling contract tests (presence of gradients, transitions)
- Link integrity across all pages
- Contact form structure and attributes

## 📝 Development

### Project Scripts

```bash
npm test          # Run all tests
npm run lint      # Run ESLint
npm run format    # Run Prettier
```

### Adding Certificates

1. Place full-size image in `images/` (use compressed JPG where possible).
2. The thumbnail will be auto-generated using the standardization script (see below).
3. Append an object to `certificates` array in `js/certificates.js` (increment id):
   ```js
   {
      id: 34,
      title: 'New Certificate Name',
      image: 'images/new-cert.jpg',
      thumb: 'images/thumbs/new-cert.jpg',
      linkedinUrl: null, // or full credential URL
      category: 'Automation'
   }
   ```
4. Run the thumbnail regeneration script to ensure consistent quality:
   ```bash
   cd utils/certificates
   bash regenerate-thumbnails.sh
   ```
5. Tests automatically validate all certificate data (structure, paths, URLs, categories).

### Calendly Configuration

Booking link appears in header social CTA + footer CTA:

- URL (event slug): `https://calendly.com/marceloadsc/30min`
- Visible text: `Book 15-min call`
- aria-label: `Book a 15-minute call`

If you change the event slug:

1. Update all occurrences in: `index.html`, `pages/frameworks.html`, `pages/side_proj.html`.
2. Adjust tests in `__tests__/booking.test.js` (regex patterns) if slug differs.
3. Preserve wording unless brand copy direction changes (tests will fail if mismatched).

## 🎨 Design & UX

- Mobile‑first layout with progressive scaling.
- Distinct content bands (parallax containers) for scannability.
- Gradient theming with consistent brand variables (`--brand-1`, `--brand-2`).
- Icon + text pairing for clarity; icon‑only CTAs get ARIA labeling.
- Certificate modal splits grid vs. detail view for reduced cognitive load.

## 📊 Performance Considerations

- Local (unminified) CSS left readable; could be minified if desired.
- Limited external blocking requests (fonts + icons + Materialize CDN).
- Gradients over large hero bitmaps keep transfer size low.
- **Optimized thumbnail images**: All 33 certificate thumbnails standardized to 300px width for consistent quality and performance.
- ImageMagick-based thumbnail generation with quality 85 and unsharp filter for optimal clarity.
- Opportunity: inline critical CSS + defer non-critical styles (not yet required for current scale).

## 🖼️ Image Optimization

### Thumbnail Standardization

All certificate thumbnails are maintained at a consistent 300px width for optimal display quality. To regenerate thumbnails after adding new certificates:

```bash
cd utils/certificates
bash regenerate-thumbnails.sh
```

**What the script does:**

- Processes all certificate images from `images/*.jpg`
- Generates 300px width thumbnails maintaining aspect ratio
- Applies quality 85 compression for size/quality balance
- Adds unsharp filter (0x0.5) for post-resize clarity
- Strips metadata to reduce file size
- Outputs detailed statistics on completion

**Requirements:**

- ImageMagick installed (`sudo apt-get install imagemagick` on Ubuntu/Debian)

**Results:**

- Consistent thumbnail dimensions (300x223, 300x225, or 300x232 pixels)
- File sizes: 8KB - 24KB per thumbnail
- No pixelation when displayed in certificate cards
- Professional, consistent visual quality across all certificates

## 🔧 Troubleshooting

### Certificate Modal Not Opening

1. Open browser DevTools (F12)
2. Check Console for errors
3. Verify `window.certificateModal` exists:
   ```javascript
   console.log(window.certificateModal);
   ```
4. Try opening manually:
   ```javascript
   window.certificateModal.open();
   ```

### Images Not Loading

- Check file paths are correct (all assets now in `images/` subdirectories)
- Verify images exist in `/images/`, `/images/assets/`, and `/images/thumbs/`
- Check browser console for 404 errors
- Ensure thumbnail paths use `images/thumbs/` prefix

### Tests Failing

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

## 📱 Browser Support

Modern evergreen browsers (Chrome, Firefox, Edge, Safari, iOS/Android). No IE support.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Marcelo Costa** – Senior QA Engineer | SDET

- LinkedIn: https://www.linkedin.com/in/marceloc/
- GitHub: https://github.com/mcello23

## 🙏 Acknowledgments

- **Materialize CSS** - Responsive framework
- **Font Awesome** - Icon library
- **Prism.js** - Syntax highlighting
- **Jest** - Testing framework

## 📈 Changelog (Key Items)

### October 2025

- **Project restructuring**: Consolidated all images into `images/` directory with subdirectories:
  - `images/assets/` for profile and supporting images
  - `images/thumbs/` for certificate thumbnails
  - Root `images/` for full-size certificate images
- **Comprehensive test expansion**: Grew test suite from 425 to **714 tests** across 14 suites
  - Added `certificates.test.js` with 50 tests validating all 33 certificates
  - Individual validation tests for each certificate (structure, paths, URLs, categories)
  - Added `gradient-colors.test.js`, `all-links.test.js`, `contact-form.test.js`
  - Enhanced cross-page and responsive testing
- **Image quality improvements**:
  - Created thumbnail standardization script (`regenerate-thumbnails.sh`)
  - Regenerated all 33 thumbnails to consistent 300px width
  - Fixed pixelation issues from inconsistent thumbnail sizes (85px → 300px)
  - Standardized file sizes (8KB - 24KB) with quality 85 compression
  - Applied unsharp filter for optimal post-resize clarity
- **Path updates**: Updated all file references across HTML, CSS, JS, and test files
- **Documentation**: Enhanced README with detailed structure, tooling, and maintenance guides

### Current (2025 Q4)

- Custom certificate modal (replaces previous gallery dependency).
- Navigation redesign with compact mobile menu & added CTA tests.
- Accessibility refinements (ARIA roles, labels, list semantics, sr-only headings).
- Calendly slug migration (/15min → /30min) with preserved 15‑minute wording.

### Earlier

- Initial responsive structure & content sections.
- Base automation project listings & framework highlights.

## 🗺️ Roadmap (Future Ideas)

- Theme toggle (light/dark).
- Inline Calendly popup widget (progressive enhancement).
- Blog / article feed integration.
- i18n (EN + PT/ES) for broader reach.
- ~~Automated image optimization pipeline (Sharp script) + critical CSS extraction.~~ ✅ **Completed: ImageMagick-based thumbnail standardization**

---

**Built with care by Marcelo Costa | © 2025**
