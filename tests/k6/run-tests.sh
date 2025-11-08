#!/bin/bash
# Script para executar testes k6 com relatório HTML

REPORT_DIR="tests/k6/reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Criar diretório de relatórios
mkdir -p "$REPORT_DIR"

echo "🚀 Executando testes k6..."
echo "════════════════════════════════════════"

# Teste 1: Performance HTTP
echo ""
echo "📊 Teste 1: Performance HTTP (test-k6.js)"
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
echo "📊 Teste 2: Google Analytics API (test-k6-ga.js)"
echo "────────────────────────────────────────"
if [ -f "tests/k6/test-k6-ga.js" ]; then
  echo "⚠️  Requer GA_API_SECRET configurado"
  k6 run tests/k6/test-k6-ga.js \
    --duration 10s \
    --vus 2 \
    --out json="$REPORT_DIR/ga-api-${TIMESTAMP}.json" \
    --summary-export="$REPORT_DIR/ga-summary-${TIMESTAMP}.json"
  
  # Create latest symlinks for easy access
  cp "$REPORT_DIR/ga-api-${TIMESTAMP}.json" "$REPORT_DIR/ga-api-latest.json"
  cp "$REPORT_DIR/ga-summary-${TIMESTAMP}.json" "$REPORT_DIR/ga-summary-latest.json"
else
  echo "⏭️  Skipping GA test (test-k6-ga.js not found)"
fi

echo ""
echo "════════════════════════════════════════"
echo "✅ Testes k6 concluídos!"
echo ""
echo "📁 Relatórios salvos em: $REPORT_DIR"
ls -lh "$REPORT_DIR"/*${TIMESTAMP}*
echo ""
echo "💡 Para visualizar relatórios HTML, instale: npm install -g k6-reporter"
echo "   Depois execute: k6-reporter $REPORT_DIR/http-summary-${TIMESTAMP}.json"
