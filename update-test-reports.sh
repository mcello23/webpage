#!/bin/bash

# Script to update test reports for the dashboard (local development)
# Run this before opening the webpage to ensure fresh test results

echo "🧪 Generating test reports for dashboard..."
npm run test:reports

echo ""
echo "📦 Creating JavaScript data file (simulating CI/CD)..."

# Create data directory
mkdir -p data

# Read Jest results
if [ -f "tests/jest/reports/results-latest.json" ]; then
  JEST_DATA=$(cat tests/jest/reports/results-latest.json | jq -c '{
    success: (.numFailedTests == 0),
    numTotalTests,
    numPassedTests,
    numFailedTests,
    numTotalTestSuites,
    numPassedTestSuites,
    passRate: (if .numTotalTests > 0 then ((.numPassedTests / .numTotalTests) * 100) else 100 end)
  }')
else
  JEST_DATA='{"success":false,"numTotalTests":0,"numPassedTests":0,"numFailedTests":0,"numTotalTestSuites":0}'
fi

# Read K6 results
if [ -f "tests/k6/reports/http-summary-latest.json" ]; then
  K6_DATA=$(cat tests/k6/reports/http-summary-latest.json)
else
  K6_DATA='{"metrics":{"http_reqs":{"count":0},"http_req_duration":{"avg":0,"p(95)":0},"checks":{"passes":0,"fails":0}}}'
fi

# Generate JavaScript file
cat > data/test-results.js <<EOF
// Auto-generated test results data (local development)
window.TEST_RESULTS = {
  jest: $JEST_DATA,
  k6: $K6_DATA,
  generatedAt: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
};
EOF

echo "✅ All test reports updated!"
echo "📊 Generated: data/test-results.js"
echo ""
echo "🌐 View at:"
echo "   - Local: open index.html in browser"
echo "   - Or run: python3 -m http.server 8080"
echo "   - GitHub Pages: https://mcello23.github.io/webpage/"
