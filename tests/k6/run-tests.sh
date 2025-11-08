#!/bin/bash
# Script para executar testes k6 com relatório HTML

REPORT_DIR="tests/k6/reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Criar diretório de relatórios
mkdir -p "$REPORT_DIR"

echo "🚀 Executing k6 tests..."
echo "════════════════════════════════════════"

# Teste 1: Performance HTTP
echo ""
echo "📊 Performance test of HTTP (test-k6.js)"
echo "────────────────────────────────────────"
k6 run tests/k6/test-k6.js \
  --duration 30s \
  --vus 10 \
  --out json="$REPORT_DIR/http-performance-${TIMESTAMP}.json" \
  --summary-export="$REPORT_DIR/http-summary-${TIMESTAMP}.json"

# Create latest symlinks for easy access in dashboard
cp "$REPORT_DIR/http-performance-${TIMESTAMP}.json" "$REPORT_DIR/http-performance-latest.json"
cp "$REPORT_DIR/http-summary-${TIMESTAMP}.json" "$REPORT_DIR/http-summary-latest.json"

echo ""
echo "════════════════════════════════════════"
echo ""

echo ""
echo "════════════════════════════════════════"
echo "✅ k6 tests finished!"
echo ""
echo "📁 Reports saved in: $REPORT_DIR"
ls -lh "$REPORT_DIR"/*${TIMESTAMP}*
echo ""
echo "💡 To view HTML reports, install: npm install -g k6-reporter"
echo "   Then run: k6-reporter $REPORT_DIR/http-summary-${TIMESTAMP}.json"
