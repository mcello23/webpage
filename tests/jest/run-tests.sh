#!/bin/bash
# Script para executar testes Jest com relatório HTML

REPORT_DIR="tests/jest/reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Criar diretório de relatórios
mkdir -p "$REPORT_DIR"

echo "🚀 Executando testes Jest..."
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
echo "✅ Testes Jest concluídos!"
echo ""
echo "📁 Relatórios salvos em:"
echo "   Coverage HTML: $REPORT_DIR/coverage-${TIMESTAMP}/lcov-report/index.html"
echo "   Resultados JSON: $REPORT_DIR/results-${TIMESTAMP}.json"
echo ""
echo "💡 Para abrir o relatório de coverage no browser:"
echo "   xdg-open $REPORT_DIR/coverage-${TIMESTAMP}/lcov-report/index.html"
