#!/bin/bash
# Script para executar testes Puppeteer com relatório

REPORT_DIR="tests/puppeteer/reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_FILE="$REPORT_DIR/report-${TIMESTAMP}.txt"

# Criar diretório de relatórios
mkdir -p "$REPORT_DIR"

echo "🚀 Executando testes Puppeteer..."
echo "════════════════════════════════════════" | tee "$REPORT_FILE"
echo "📅 Data: $(date)" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

# Teste 1: Básico
echo "📊 Teste 1: Load Test Básico (test-puppeteer.js)" | tee -a "$REPORT_FILE"
echo "────────────────────────────────────────" | tee -a "$REPORT_FILE"
node tests/puppeteer/test-puppeteer.js 2>&1 | tee -a "$REPORT_FILE"

echo "" | tee -a "$REPORT_FILE"
echo "════════════════════════════════════════" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

# Teste 2: Realista
echo "📊 Teste 2: Simulação Realista (test-puppeteer-realistic.js)" | tee -a "$REPORT_FILE"
echo "────────────────────────────────────────" | tee -a "$REPORT_FILE"
echo "💡 Abra Google Analytics > Tempo real para ver resultados!" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"
node tests/puppeteer/test-puppeteer-realistic.js 2>&1 | tee -a "$REPORT_FILE"

echo "" | tee -a "$REPORT_FILE"
echo "════════════════════════════════════════" | tee -a "$REPORT_FILE"
echo "✅ Testes Puppeteer concluídos!" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"
echo "📁 Relatório salvo em: $REPORT_FILE" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"
echo "🔗 Verifique Google Analytics:" | tee -a "$REPORT_FILE"
echo "   https://analytics.google.com/ > Relatórios > Tempo real" | tee -a "$REPORT_FILE"
