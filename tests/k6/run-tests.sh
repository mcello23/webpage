#!/bin/bash
# Script para executar testes k6 com relatório HTML

REPORT_DIR="tests/k6/reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Criar diretório de relatórios
mkdir -p "$REPORT_DIR"

echo "🚀 Executing k6 tests..."
echo "════════════════════════════════════════"

# Detect target URL (Cloudflare Pages or GitHub Pages)
if [ -z "$BASE_URL" ]; then
  echo "⚠️  BASE_URL not set. Using Cloudflare Pages by default."
  export BASE_URL="https://www.marcelo-costa.com"
fi

echo "🎯 Target: $BASE_URL"
echo ""

# Test 1: Basic Performance (original test)
echo "📊 Test 1: Basic Performance (test-k6.js)"
echo "────────────────────────────────────────"
k6 run tests/k6/test-k6.js \
  --out json="$REPORT_DIR/basic-performance-${TIMESTAMP}.json" \
  --summary-export="$REPORT_DIR/basic-summary-${TIMESTAMP}.json"

cp "$REPORT_DIR/basic-performance-${TIMESTAMP}.json" "$REPORT_DIR/basic-performance-latest.json"
cp "$REPORT_DIR/basic-summary-${TIMESTAMP}.json" "$REPORT_DIR/basic-summary-latest.json"

echo ""
echo "════════════════════════════════════════"
echo "✅ k6 tests finished!"
echo ""
echo "📁 Reports saved in: $REPORT_DIR"
ls -lh "$REPORT_DIR"/*${TIMESTAMP}*
echo ""
echo "💡 To view HTML reports, install: npm install -g k6-reporter"
echo "   Then run: k6-reporter $REPORT_DIR/http-summary-${TIMESTAMP}.json"
