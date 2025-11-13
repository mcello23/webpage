#!/usr/bin/env node
/**
 * Generate test-data.js from test reports
 * Reads Jest/K6/Coverage results and creates JS file for dashboard
 */

const fs = require('fs');
const path = require('path');

// Paths
const JEST_REPORT = 'tests/jest/reports/results-latest.json';
const K6_REPORT = 'tests/k6/reports/http-summary-latest.json';
const COVERAGE_REPORT = 'coverage/coverage-summary.json';
const OUTPUT_FILE = 'test-data.js';

function readJsonFile(filePath, fallback) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn(`⚠️  Failed to read ${filePath}:`, error.message);
  }
  return fallback;
}

function generateJestData(report) {
  if (!report || !report.numTotalTests) {
    return {
      success: false,
      numTotalTests: 0,
      numPassedTests: 0,
      numFailedTests: 0,
      numTotalTestSuites: 0,
      numPassedTestSuites: 0,
      passRate: 0,
      avgDuration: 0,
      testSuites: [],
    };
  }

  const total = report.numTotalTests || 0;
  const passed = report.numPassedTests || 0;
  const failed = report.numFailedTests || 0;
  const success = failed === 0;
  const passRate = total > 0 ? (passed / total) * 100 : 100;

  // Calculate total duration
  const avgDuration = (report.testResults || []).reduce(
    (sum, suite) => sum + (suite.endTime - suite.startTime),
    0
  );

  // Extract test suites details
  const testSuites = (report.testResults || []).map((suite) => ({
    name: path.basename(suite.name),
    status: suite.status,
    numTests: (suite.assertionResults || []).length,
    numPassedTests: (suite.assertionResults || []).filter((t) => t.status === 'passed').length,
    numFailedTests: (suite.assertionResults || []).filter((t) => t.status === 'failed').length,
    duration: suite.endTime - suite.startTime,
  }));

  return {
    success,
    numTotalTests: total,
    numPassedTests: passed,
    numFailedTests: failed,
    numTotalTestSuites: report.numTotalTestSuites || 0,
    numPassedTestSuites: report.numPassedTestSuites || 0,
    passRate: parseFloat(passRate.toFixed(2)),
    avgDuration,
    testSuites,
  };
}

function generateK6Data(report) {
  if (!report || !report.metrics) {
    return {
      metrics: {
        http_reqs: { count: 0 },
        http_req_duration: { avg: 0, 'p(95)': 0 },
        checks: { passes: 0, fails: 0 },
      },
    };
  }
  return report;
}

function generateCoverageData(report) {
  if (!report || !report.total) {
    return {
      lines: { total: 0, covered: 0, pct: 0 },
      statements: { total: 0, covered: 0, pct: 0 },
      functions: { total: 0, covered: 0, pct: 0 },
      branches: { total: 0, covered: 0, pct: 0 },
    };
  }
  return report.total;
}

function main() {
  console.log('📊 Generating test-data.js...');

  // Read reports
  const jestReport = readJsonFile(JEST_REPORT, null);
  const k6Report = readJsonFile(K6_REPORT, null);
  const coverageReport = readJsonFile(COVERAGE_REPORT, null);

  // Process data
  const jestData = generateJestData(jestReport);
  const k6Data = generateK6Data(k6Report);
  const coverageData = generateCoverageData(coverageReport);

  // Metadata
  const branch = process.env.CF_PAGES_BRANCH || process.env.GITHUB_REF_NAME || 'main';
  const commit =
    process.env.CF_PAGES_COMMIT_SHA?.substring(0, 7) ||
    process.env.GITHUB_SHA?.substring(0, 7) ||
    'local';
  const timestamp = new Date().toISOString();
  const triggeredBy = process.env.CF_PAGES
    ? 'cloudflare-pages'
    : process.env.GITHUB_ACTIONS
      ? 'github-actions'
      : 'local';

  const testResults = {
    jest: jestData,
    k6: k6Data,
    coverage: coverageData,
    metadata: {
      branch,
      commit,
      timestamp,
      triggeredBy,
    },
    generatedAt: timestamp,
  };

  // Generate JS file
  const jsContent = `// Auto-generated test results data
// Generated at: ${timestamp}
// Source: ${triggeredBy}

if (typeof window !== 'undefined') {
  window.TEST_RESULTS = ${JSON.stringify(testResults, null, 2)};
  console.log('📊 Test dashboard: Loaded ${jestData.numTotalTests} tests, ${jestData.numPassedTests} passed');
}
`;

  fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf8');

  console.log(`✅ Generated ${OUTPUT_FILE}`);
  console.log(
    `   Jest: ${jestData.numTotalTests} tests (${jestData.numPassedTests} passed, ${jestData.numFailedTests} failed)`
  );
  console.log(`   Coverage: ${coverageData.lines.pct}% lines`);
  console.log(`   K6: ${k6Data.metrics.http_reqs.count} requests`);
}

main();
