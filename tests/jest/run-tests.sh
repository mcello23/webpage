#!/bin/bash
# Script para executar testes Jest com relatório HTML

REPORT_DIR="tests/jest/reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Criar diretório de relatórios
mkdir -p "$REPORT_DIR"

echo "🚀 Executing Jest tests..."
echo "════════════════════════════════════════"
echo ""

# Executar Jest com coverage
yarn test:all \
  --coverage \
  --coverageDirectory="$REPORT_DIR/coverage-${TIMESTAMP}" \
  --json \
  --outputFile="$REPORT_DIR/results-${TIMESTAMP}.json" \
  --testLocationInResults

# Create symlinks for latest results
cp "$REPORT_DIR/results-${TIMESTAMP}.json" "$REPORT_DIR/results-latest.json" 2>/dev/null || true
if [ -d "$REPORT_DIR/coverage-${TIMESTAMP}" ]; then
  rm -rf "$REPORT_DIR/coverage-latest" 2>/dev/null || true
  ln -sf "coverage-${TIMESTAMP}" "$REPORT_DIR/coverage-latest"
fi

echo ""
echo "════════════════════════════════════════"
echo "✅ Jest tests completed!"
echo ""
echo "📁 Reports saved in:"
echo "   Coverage HTML: $REPORT_DIR/coverage-${TIMESTAMP}/lcov-report/index.html"
echo "   JSON Results: $REPORT_DIR/results-${TIMESTAMP}.json"
echo ""
echo "📊 Test Summary:"
if [ -f "$REPORT_DIR/results-${TIMESTAMP}.json" ]; then
  jq -r '.numTotalTests as $total | .numPassedTests as $passed | .numFailedTests as $failed | "   Total: \($total) | Passed: \($passed) | Failed: \($failed)"' "$REPORT_DIR/results-${TIMESTAMP}.json" 2>/dev/null || echo "   (summary parsing requires jq)"
fi
echo ""
echo "💡 To open the coverage report in the browser:"
echo "   xdg-open $REPORT_DIR/coverage-${TIMESTAMP}/lcov-report/index.html"
