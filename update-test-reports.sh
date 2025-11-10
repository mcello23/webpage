#!/bin/bash

# Script to update test reports for the dashboard (local development)
# Run this before opening the webpage to ensure fresh test results

echo "🧪 Generating test reports for dashboard..."
npm run test:reports

echo ""
echo "📦 Creating test data as .js file (simulating CI/CD)..."

# Read Jest results
if [ -f "tests/jest/reports/results-latest.json" ]; then
  JEST_DATA=$(cat tests/jest/reports/results-latest.json | jq -c '{
    success: (.numFailedTests == 0),
    numTotalTests,
    numPassedTests,
    numFailedTests,
    numTotalTestSuites,
    numPassedTestSuites,
    passRate: (if .numTotalTests > 0 then ((.numPassedTests / .numTotalTests) * 100) else 100 end),
    avgDuration: ([.testResults[].endTime - .testResults[].startTime] | add // 0),
    testSuites: [.testResults[] | {
      name: (.name | split("/") | .[-1]),
      status: .status,
      numTests: (.assertionResults | length),
      numPassedTests: ([.assertionResults[] | select(.status == "passed")] | length),
      numFailedTests: ([.assertionResults[] | select(.status == "failed")] | length),
      duration: (.endTime - .startTime)
    }]
  }')
else
  JEST_DATA='{"success":false,"numTotalTests":0,"numPassedTests":0,"numFailedTests":0,"numTotalTestSuites":0,"passRate":100,"avgDuration":0,"testSuites":[]}'
fi

# Read coverage results
if [ -f "coverage/coverage-summary.json" ]; then
  COVERAGE_DATA=$(cat coverage/coverage-summary.json | jq -c '.total')
else
  COVERAGE_DATA='{"lines":{"total":0,"covered":0,"pct":0},"statements":{"total":0,"covered":0,"pct":0},"functions":{"total":0,"covered":0,"pct":0},"branches":{"total":0,"covered":0,"pct":0}}'
fi

# Read K6 results
if [ -f "tests/k6/reports/http-summary-latest.json" ]; then
  K6_DATA=$(cat tests/k6/reports/http-summary-latest.json)
else
  K6_DATA='{"metrics":{"http_reqs":{"count":0},"http_req_duration":{"avg":0,"p(95)":0},"checks":{"passes":0,"fails":0}}}'
fi

# Generate .js file with JavaScript inside
cat > test-data.js <<EOF
// Auto-generated test results data (local development)
if (typeof window !== 'undefined') {
  window.TEST_RESULTS = {
    jest: $JEST_DATA,
    k6: $K6_DATA,
    coverage: $COVERAGE_DATA,
    metadata: {
      branch: "local",
      commit: "dev",
      timestamp: "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
      triggeredBy: "manual"
    },
    generatedAt: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  };
}
EOF

echo "✅ All test reports updated!"
echo "📊 Generated: test-data.js"
echo ""
echo "🌐 View at:"
echo "   - Local: open index.html in browser"
echo "   - Or run: python3 -m http.server 8080"
echo "   - GitHub Pages: https://mcello23.github.io/webpage/"
