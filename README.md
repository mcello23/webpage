# Marcelo Costa – QA / SDET Portfolio

[![Tests](https://img.shields.io/badge/tests-425%20passing-brightgreen)](/__tests__)
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

- 425 Jest tests (DOM structure, accessibility attributes, link integrity, cross‑page consistency, favicon assets, responsive nav behavior).
- Regex + structural assertions to detect regressions in navigation, Calendly CTA, and modal wiring.
- Style presence tests guard against accidental CSS regression (e.g., mobile menu compact design rules).

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
├── assets/                 # Misc assets (profile photo, large supporting images)
│
├── css/                    # Stylesheets
│   ├── certificates.css    # Certificate modal styles
│   ├── materialize.css     # Materialize framework
│   ├── navbar.css          # Navigation bar styles
│   ├── prism.css           # Code syntax highlighting
│   └── style.css           # Main stylesheet
│
├── js/                     # JavaScript files
│   ├── certificates.js     # Certificate modal logic
│   ├── init.js             # Materialize initialization
│   ├── materialize.js      # Materialize framework
│   └── prism.js            # Code syntax highlighting
│
├── images/                 # Certificate images (full-size)
│   └── *.jpg
│
├── thumbs/                 # Certificate thumbnails
│   └── [16 thumbnail JPGs]
│
├── favicon/                # Favicon files
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   └── site.webmanifest
│
└── __tests__/              # Jest test suites (425 assertions across 8 suites)
   ├── index.test.js
   ├── frameworks.test.js
   ├── side_proj.test.js
   ├── cross-page.test.js
   ├── favicon.test.js
   ├── responsive-tester.test.js
   ├── booking.test.js
   └── navbar-improvements.test.js
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
- ESLint (with html plugin) & Prettier formatting
- Sharp (dev dependency; image processing capability if needed)

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
- Certificate gallery markup hooks
- Calendly CTA semantics + security attributes
- Responsive navigation (mobile compact menu rules)
- Styling contract tests (presence of gradients, transitions)

## 📝 Development

### Project Scripts

```bash
npm test          # Run all tests
npm run lint      # Run ESLint
npm run format    # Run Prettier
```

### Adding Certificates

1. Place full-size image in `images/` (use compressed JPG where possible).
2. Create a proportional thumbnail in `thumbs/` (≈ 300–400px width).
3. Append an object to `certificates` array in `js/certificates.js` (increment id):
   ```js
   {
      id: 17,
      title: 'New Certificate Name',
      image: 'images/new-cert.jpg',
      thumb: 'thumbs/new-cert.jpg',
      linkedinUrl: null, // or full credential URL
      category: 'Automation'
   }
   ```
4. Tests automatically validate modal container presence; no test update needed unless you assert specific count.

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
- Opportunity: inline critical CSS + defer non-critical styles (not yet required for current scale).

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

- Check file paths are correct
- Verify images exist in `/images/` and `/thumbs/`
- Check browser console for 404 errors

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

### Current (2025 Q4)

- Custom certificate modal (replaces previous gallery dependency).
- Navigation redesign with compact mobile menu & added CTA tests.
- Expanded test suite to 425 assertions (added booking + navbar improvements).
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
- Automated image optimization pipeline (Sharp script) + critical CSS extraction.

---

**Built with care by Marcelo Costa | © 2025**
