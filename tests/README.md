# 🧪 Test Suite Documentation

Complete testing suite for the webpage, organized by type and purpose.

## 📁 Directory Structure

```
tests/
├── jest/          # Unit and integration tests
├── k6/            # Performance and load testing
├── puppeteer/     # Real browser automation tests
└── README.md      # This file
```

## 🚀 Quick Start

### Run All Tests

```bash
npm run test:all
```

### Run by Type

```bash
# Jest tests (unit/integration)
npm test
# or
npm run test:jest

# k6 tests (performance)
npm run test:k6

# Puppeteer tests (real browsers)
npm run test:puppeteer
```

---

## 🧪 Jest - Unit & Integration Tests

**Location:** `tests/jest/`  
**Command:** `npm test` or `npm run test:jest`

### Overview

Comprehensive unit and integration testing suite using Jest, covering all webpage functionality.

### Features

- ✅ Unit tests for JavaScript functions
- ✅ Integration tests for components
- ✅ HTML/DOM validation
- ✅ Responsiveness testing
- ✅ Security validations
- ✅ Performance checks
- ✅ Code coverage reports

### Test Files

**Functional Tests:**
- `index.test.js` - Main page
- `navbar-*.test.js` - Navigation
- `booking*.test.js` - Booking system
- `certificates.test.js` - Certificates
- `contact-form.test.js` - Contact form
- `cookie-consent.test.js` - Cookie consent

**Technical Tests:**
- `performance-optimizations.test.js` - Performance
- `security-improvements.test.js` - Security
- `responsive-tester.test.js` - Responsiveness
- `cross-page.test.js` - Cross-page navigation
- `all-links.test.js` - Link validation

**Unit Tests:**
- `js-*.test.js` - JavaScript module tests

### Usage

```bash
# All tests
npm test

# With coverage
npm test -- --coverage

# Specific file
npm test -- booking.test.js

# Watch mode
npm test -- --watch

# Verbose output
npm test -- --verbose

# Pattern matching
npm test -- --testNamePattern="navbar"

# With full report
./tests/jest/run-tests.sh
```

### Reports

Reports are saved in `tests/jest/reports/`:

- **Coverage HTML:** `reports/coverage-TIMESTAMP/lcov-report/index.html`
- **Results JSON:** `reports/results-TIMESTAMP.json`

```bash
# View coverage report
xdg-open tests/jest/reports/coverage-TIMESTAMP/lcov-report/index.html
```

### Configuration

Located in `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/tests/jest/**/*.test.js'
  ]
};
```

### Best Practices

- Run tests before commits
- Maintain coverage above 80%
- Use `--watch` during development
- Review coverage reports regularly

---

## ⚡ k6 - Performance & Load Testing

**Location:** `tests/k6/`  
**Command:** `npm run test:k6`

### Overview

High-performance HTTP load testing using k6, capable of generating thousands of requests per second.

### Features

- ✅ HTTP load testing
- ✅ Latency measurements
- ✅ Stress testing
- ✅ Ramping load patterns
- ✅ Very fast (hundreds req/s)
- ✅ JSON reports with metrics

### Test Files

- `test-k6.js` - Main HTTP performance test

### Usage

```bash
# Run performance test
npm run test:k6

# Or directly with k6
k6 run tests/k6/test-k6.js

# With custom duration
k6 run --duration 30s tests/k6/test-k6.js

# With custom VUs
k6 run --vus 100 tests/k6/test-k6.js

# With full report
./tests/k6/run-tests.sh
```

### Test Configuration

Current settings in `test-k6.js`:

```javascript
scenarios: {
  load_test: {
    executor: 'ramping-arrival-rate',
    startRate: 10,
    timeUnit: '1s',
    preAllocatedVUs: 20,
    maxVUs: 50,
    stages: [
      { duration: '3s', target: 20 },  // Ramp up
      { duration: '4s', target: 20 },  // Stay
      { duration: '3s', target: 0 }    // Ramp down
    ]
  }
}
```

**Total duration:** 10 seconds (3s + 4s + 3s)

### Customization

Edit the last stage duration in `test-k6.js`:

```javascript
stages: [
  { duration: '30s', target: 50 },   // Ramp to 50 RPS
  { duration: '1m', target: 50 },    // Hold at 50 RPS
  { duration: '30s', target: 0 }     // Ramp down
]
```

### Reports

Reports are saved in `tests/k6/reports/`:

- **Metrics JSON:** `http-performance-TIMESTAMP.json`
- **Summary JSON:** `http-summary-TIMESTAMP.json`

### Metrics Explained

- **http_req_duration:** Response time
- **http_req_failed:** Failed requests percentage
- **http_reqs:** Total requests count
- **iterations:** Completed iterations
- **vus:** Virtual users active

### Installation

If k6 is not installed:

```bash
# Linux (download binary)
curl -L https://github.com/grafana/k6/releases/download/v1.3.0/k6-v1.3.0-linux-amd64.tar.gz | tar xvz --strip-components=1 -C /tmp && sudo mv /tmp/k6 /usr/local/bin/k6

# Verify installation
k6 version
```

---

## 🎭 Puppeteer - Browser Automation

**Location:** `tests/puppeteer/`  
**Command:** `npm run test:puppeteer`

### Overview

Real browser testing with Puppeteer (Chromium), simulating actual user behavior and tracking Google Analytics events.

### Features

- ✅ Real Chromium browsers
- ✅ Full JavaScript execution
- ✅ Human behavior simulation
- ✅ Google Analytics event tracking
- ✅ Automatic cookie acceptance
- ✅ Scroll and mouse simulation
- ✅ Real-time GA event monitoring

### Test Files

- **test-puppeteer.js** - Basic load test
- **test-puppeteer-realistic.js** - Realistic human simulation ⭐

### Usage

```bash
# Individual test - Basic
node tests/puppeteer/test-puppeteer.js

# Individual test - Realistic (recommended for GA)
node tests/puppeteer/test-puppeteer-realistic.js

# All tests with report
./tests/puppeteer/run-tests.sh

# Or via npm
npm run test:puppeteer
```

### Test Differences

#### test-puppeteer.js - Basic
- ✅ Fast (~1 visit/second)
- ✅ Executes JavaScript
- ✅ Accepts cookies
- ✅ Sends GA events
- ⚠️ May be detected as bot

**Configuration:**
```javascript
// Last line of file
runLoadTest(10, 2); // 10 visits, 2 concurrent
```

#### test-puppeteer-realistic.js - Realistic ⭐
- ✅ Simulates human behavior
- ✅ Page scrolling
- ✅ Mouse movement
- ✅ Variable reading time
- ✅ Real User-Agent
- ✅ **Higher chance to appear in GA**
- ⚠️ Slower (1 visit/3-7s)

**Configuration:**
```javascript
// Last line of file
runRealisticTest(5); // 5 realistic visits
```

### Customization

#### Adjust Number of Visits

**test-puppeteer.js:**
```javascript
// Change last line:
runLoadTest(20, 3); // 20 visits, 3 concurrent
```

**test-puppeteer-realistic.js:**
```javascript
// Change last line:
runRealisticTest(10); // 10 sequential visits
```

#### Modify Behavior

Edit the `visitPageRealistically()` function:

```javascript
// Increase scroll time
await new Promise(resolve => setTimeout(resolve, 2000)); // 2s

// Add more scrolls
await page.evaluate(() => window.scrollBy(0, 500));

// Simulate click
await page.click('.some-element');
```

### Monitoring

Each test monitors:
- ✅ Google Analytics events sent
- ✅ Event type (page_view, etc)
- ✅ Cookie acceptance
- ✅ Total execution time
- ✅ Visit rate per second

### Google Analytics Integration

1. Open: https://analytics.google.com/
2. Go to: **Reports** → **Realtime**
3. Run the test
4. Watch visitors appear in real-time!

**Note:** Events appear in Realtime view within 30-60 seconds.

### Reports

Reports are saved in `tests/puppeteer/reports/`:

- **Text logs:** `report-TIMESTAMP.txt`
- Includes all console output
- GA event timestamps
- Statistics and duration

### Troubleshooting

#### "Not seeing in Google Analytics"
1. ✅ Use `test-puppeteer-realistic.js`
2. ✅ Check **Realtime**, not regular reports
3. ✅ Wait 30-60 seconds
4. ✅ Confirm cookies were accepted

#### "Too slow"
1. ✅ Use `test-puppeteer.js` (faster)
2. ✅ Reduce number of visits
3. ✅ Increase concurrency in basic test

#### "Browser doesn't open"
```bash
# Reinstall Puppeteer with Chromium
npm install puppeteer
```

---

## 📊 Test Type Comparison

| Aspect | Jest | k6 | Puppeteer |
|---------|------|----|-----------| 
| **Speed** | ⚡⚡ Fast | ⚡⚡⚡ Very Fast | ⚡ Slow |
| **Type** | Unit/Integration | Performance/Load | E2E/Browser |
| **JavaScript** | ✅ Yes | ❌ HTTP only | ✅ Yes (full) |
| **Google Analytics** | ❌ No | ❌ No | ✅ Yes (real) |
| **Coverage** | ✅ Yes | ❌ No | ❌ No |
| **CI/CD** | ✅ Ideal | ✅ Good | ⚠️ Heavy |
| **Reports** | ✅ HTML + JSON | ✅ JSON | ✅ TXT |
| **Best For** | Development | Performance | GA Testing |

---

## 🎯 Use Cases

### Daily Development
```bash
npm test               # Quick Jest tests
npm test -- --watch    # Watch mode during dev
```

### Before Deploy
```bash
npm run test:all      # All tests
npm test -- --coverage # With coverage
```

### Performance Testing
```bash
npm run test:k6       # Load tests
```

### Google Analytics Testing
```bash
npm run test:puppeteer  # Real browsers
```

### CI/CD Pipeline
```bash
npm test -- --ci --coverage    # Jest with coverage
npm run test:k6                # Performance tests
```

---

## 🔧 Setup & Configuration

### 1. Make Scripts Executable

```bash
chmod +x tests/jest/run-tests.sh
chmod +x tests/k6/run-tests.sh
chmod +x tests/puppeteer/run-tests.sh
```

### 2. Install k6

```bash
# Direct download (Linux)
curl -L https://github.com/grafana/k6/releases/download/v1.3.0/k6-v1.3.0-linux-amd64.tar.gz | tar xvz --strip-components=1 -C /tmp && sudo mv /tmp/k6 /usr/local/bin/k6

# Verify
k6 version
```

### 3. Install Dependencies

```bash
# All dependencies (including Puppeteer)
npm install
```

---

## 📁 Reports Structure

```
tests/
├── jest/reports/
│   ├── coverage-TIMESTAMP/
│   │   └── lcov-report/index.html
│   └── results-TIMESTAMP.json
├── k6/reports/
│   ├── http-performance-TIMESTAMP.json
│   └── http-summary-TIMESTAMP.json
└── puppeteer/reports/
    └── report-TIMESTAMP.txt
```

All `reports/` directories are git-ignored via `tests/.gitignore`.

---

## 📝 Available Scripts

```json
{
  "test": "jest",
  "test:jest": "./tests/jest/run-tests.sh",
  "test:k6": "./tests/k6/run-tests.sh",
  "test:puppeteer": "./tests/puppeteer/run-tests.sh",
  "test:all": "npm run test:jest && npm run test:k6 && npm run test:puppeteer"
}
```

---

## 💡 Tips & Best Practices

### For Performance Testing
- Use k6 for fast HTTP load tests
- Adjust VUs and duration as needed
- Check latency and throughput metrics
- Save baseline metrics for comparison

### For Google Analytics
- Use `test-puppeteer-realistic.js` for best results
- Open GA Realtime before executing
- Wait 30-60s for events to appear
- Regular GA data takes 24-48h to process

### For Development
- Keep `npm test -- --watch` running
- Run `test:all` before important commits
- Review coverage regularly
- Fix failing tests immediately

### For CI/CD
- Run Jest with `--ci` flag
- Save reports as artifacts
- Configure coverage thresholds
- Use k6 for performance benchmarks

---

## 🐛 Troubleshooting

### "Permission denied" on scripts
```bash
chmod +x tests/*/run-tests.sh
```

### "k6: command not found"
```bash
# Install k6 (see Setup section)
k6 version
```

### "Puppeteer doesn't open browser"
```bash
npm install puppeteer
```

### Jest tests failing
```bash
# Verbose output
npm test -- --verbose --no-coverage

# Single test file
npm test -- your-test.test.js
```

### Path issues in tests
After moving tests, relative paths need adjustment:
- Change `'../'` to `'../../'` for files outside `tests/`
- Example: `'../index.html'` → `'../../index.html'`

---

## 🔗 Useful Links

- [Jest Documentation](https://jestjs.io/)
- [k6 Documentation](https://k6.io/docs/)
- [Puppeteer Documentation](https://pptr.dev/)
- [Google Analytics](https://analytics.google.com/)

---

## 📈 Metrics & Reporting

### Jest Coverage Metrics
- **Statements:** Lines of code executed
- **Branches:** Conditionals tested (if/else)
- **Functions:** Functions executed
- **Lines:** Lines covered

Target: **>80%** coverage for all metrics

### k6 Performance Metrics
- **http_req_duration:** Average response time
- **http_req_failed:** Failed request rate
- **http_reqs:** Total requests
- **iterations:** Completed iterations
- **vus:** Active virtual users

### Puppeteer Monitoring
- GA events sent per visit
- Event types detected
- Total test duration
- Average events per visit

---

## 🎓 Getting Started Guide

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Make scripts executable:**
   ```bash
   chmod +x tests/*/run-tests.sh
   ```

3. **Install k6:**
   ```bash
   # See Setup section for command
   k6 version
   ```

4. **Run your first tests:**
   ```bash
   # Quick test
   npm test
   
   # All tests
   npm run test:all
   ```

5. **Check reports:**
   ```bash
   # Jest coverage
   xdg-open coverage/lcov-report/index.html
   
   # k6 results
   cat tests/k6/reports/*.json | jq
   
   # Puppeteer logs
   cat tests/puppeteer/reports/report-*.txt
   ```

---

**Last Updated:** November 7, 2025  
**Test Suite Version:** 1.0.0
