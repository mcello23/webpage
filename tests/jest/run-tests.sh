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
npm test -- \
  --coverage \
  --coverageDirectory="$REPORT_DIR/coverage-${TIMESTAMP}" \
  --json \
  --outputFile="$REPORT_DIR/results-${TIMESTAMP}.json" \
  --testLocationInResults

echo ""
echo "════════════════════════════════════════"
echo "✅ Jest tests completed!"
echo ""
echo "📁 Reports saved in:"
echo "   Coverage HTML: $REPORT_DIR/coverage-${TIMESTAMP}/lcov-report/index.html"
echo "   JSON Results: $REPORT_DIR/results-${TIMESTAMP}.json"
echo ""
echo "💡 To open the coverage report in the browser:"
echo "   xdg-open $REPORT_DIR/coverage-${TIMESTAMP}/lcov-report/index.html"
