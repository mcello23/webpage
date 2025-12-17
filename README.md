# Marcelo Costa – QA / SDET Portfolio

[![CI Pipeline](https://github.com/mcello23/webpage/actions/workflows/ci.yml/badge.svg)](https://github.com/mcello23/webpage/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-v19.2.3-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/vite-v7.3.0-646cff.svg)](https://vitejs.dev/)

A modern, performance‑oriented, and accessibility‑aware portfolio showcasing large-scale E2E automation, test architecture, and delivery impact.

## 🌐 Live Page

**[www.marcelo-costa.com](https://www.marcelo-costa.com/)**

---

## 🚀 Project Evolution: From Static to React

This project has evolved from a traditional static HTML/CSS/JS website into a modern **React Application**.

*   **Legacy**: Originally built with direct DOM manipulation, jQuery, and Materialize CSS.
*   **Modernization**: Migrated to **React 19** using **Vite** for lightning-fast builds.
*   **Hybrid Approach**: While the core architecture is now React, we maintain some legacy styling (Materialize) to preserve the original design language while leveraging React's component-based architecture for better maintainability and testing.

---

## 🎯 Live Test Dashboard & Gist Integration

One of the unique features of this portfolio is the **Live Test Dashboard**.

*   **Real-time Data**: The website displays *actual* test results from the latest CI run.
*   **How it works**:
    1.  **GitHub Actions** runs the test suite (Jest & K6) on every push to `main`.
    2.  Results are processed and uploaded to a **GitHub Gist** as a JSON payload.
    3.  The live website fetches this Gist data to display:
        *   ✅ **Jest Results**: Pass/Fail counts, coverage metrics.
        *   ⚡ **K6 Performance**: Request rates, P95 latency, and throughput.
    4.  **Fallback**: If the Gist fetch fails, it gracefully falls back to a static snapshot.

---

## 🛠️ Technology Stack

### Frontend Core
*   **React 19**: Component-based UI architecture.
*   **Vite 7**: Next-generation frontend tooling.
*   **Materialize CSS**: Responsive grid and styling (Legacy integration).
*   **Font Awesome 5**: Iconography.

### Testing Strategy
This project employs a "Testing Pyramid" approach:

1.  **Unit & Integration (Jest + React Testing Library)**
    *   Validates individual components and their interactions.
    *   Checks Accessibility (A11y) compliance.
    *   Verifies data integrity (Certificates, Links).
    *   *Command:* `npm test`

2.  **End-to-End (Puppeteer)**
    *   Simulates real user interactions in a headless Chrome browser.
    *   Validates critical user flows and visual rendering.
    *   *Command:* `npm run test:puppeteer`

3.  **Performance (K6)**
    *   Load testing to ensure the site handles traffic efficiently.
    *   Measures latency, throughput, and error rates.
    *   *Command:* `npm run test:k6`

### CI/CD & Infrastructure
*   **GitHub Actions**: Automated pipeline for Linting, Testing, and Deployment.
*   **Cloudflare Pages**: High-performance edge hosting.
*   **GitHub Gist**: "Database" for storing latest test metrics.
*   **Calendly**: Integration for scheduling calls.

#### 🔒 Secure Deployment Pipeline
The deployment process is strictly gated by quality checks. The `deploy` job in GitHub Actions has a dependency on the `test` job (`needs: [test]`).
*   **If tests fail**: The pipeline stops immediately. No broken code is ever deployed.
*   **If tests pass**: The site is built and deployed to Cloudflare Pages automatically.

---

## 🛡️ Security & Performance

### Security Headers
The application implements strict security headers via Cloudflare's `_headers` configuration to protect users:
*   **Content-Security-Policy (CSP)**: Restricts sources for scripts, styles, and images to prevent XSS attacks.
*   **Strict-Transport-Security (HSTS)**: Enforces HTTPS connections.
*   **X-Frame-Options**: Prevents clickjacking by disallowing iframe embedding (`DENY`).
*   **X-Content-Type-Options**: Prevents MIME-type sniffing.
*   **Permissions-Policy**: Disables unused browser features (camera, microphone, geolocation).

### Quality Assurance (Husky & Lint-Staged)
We enforce code quality *before* it even reaches the repository using **Husky** git hooks.
*   **Pre-commit Hook**: Runs `lint-staged` to automatically lint and format only the changed files.
    *   JS/JSX: ESLint + Prettier
    *   CSS: Stylelint + Prettier
    *   JSON/HTML: Prettier
*   This ensures that every commit adheres to the project's coding standards without manual intervention.

---

## 📂 Project Structure

```
├── .github/workflows/   # CI/CD Pipeline definitions
├── public/              # Static assets (images, legacy js)
├── scripts/             # Build and utility scripts
├── src/
│   ├── components/      # React components (Hero, Navbar, etc.)
│   ├── data/            # Static data files (Certificates, etc.)
│   ├── styles/          # CSS files
│   ├── App.jsx          # Main application entry
│   └── main.jsx         # React DOM root
├── tests/
│   ├── jest/            # Unit/Integration tests
│   ├── k6/              # Performance tests
│   └── puppeteer/       # E2E Browser tests
└── package.json         # Dependencies and scripts
```

---

## ⚡ Getting Started

### Prerequisites
*   Node.js >= 22.20.0
*   Yarn >= 4.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/mcello23/webpage.git

# Install dependencies
yarn install
```

### Development

```bash
# Start local dev server
yarn dev
```

### Running Tests

```bash
# Run Unit & Integration Tests
yarn test

# Run Performance Tests (K6)
# Note: Requires K6 installed globally
yarn test:k6

# Run E2E Tests (Puppeteer)
yarn test:puppeteer

# Run All Tests
yarn test:all
```

### Quality Checks

```bash
# Run Linting (ESLint + Stylelint) & Formatting (Prettier)
yarn quality
```

---

## 📦 Dependencies

### Production
*   `react`, `react-dom`: Core UI library.
*   `react-router-dom`: Client-side routing.

### Development
*   **Build**: `vite`, `@vitejs/plugin-react`
*   **Testing**: `jest`, `@testing-library/react`, `puppeteer`, `jsdom`
*   **Linting**: `eslint`, `prettier`, `stylelint`, `husky` (Git hooks)

---

## 🤝 Third-Party Services

*   **Calendly**: Used for the "Book a 15-min call" feature in the Navbar and Footer.
*   **Cloudflare**: DNS and Pages hosting.
*   **GitHub**: Source control, Actions (CI), and Gist (Data storage).
