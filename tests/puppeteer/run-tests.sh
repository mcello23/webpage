REPORT_DIR="tests/puppeteer/reports"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
REPORT_FILE="$REPORT_DIR/report-${TIMESTAMP}.txt"

# Creates report directory
mkdir -p "$REPORT_DIR"

echo "🚀 Executing Puppeteer tests..."
echo "════════════════════════════════════════" | tee "$REPORT_FILE"
echo "📅 Date: $(date)" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

# Test 1: Basic Load Test
echo "📊 Test 1: Basic Load Test (test-puppeteer.js)" | tee -a "$REPORT_FILE"
echo "────────────────────────────────────────" | tee -a "$REPORT_FILE"
node tests/puppeteer/test-puppeteer.js 2>&1 | tee -a "$REPORT_FILE"

echo "" | tee -a "$REPORT_FILE"
echo "════════════════════════════════════════" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

# Test 2: Realistic Simulation
echo "📊 Test 2: Realistic Simulation (test-puppeteer-realistic.js)" | tee -a "$REPORT_FILE"
echo "────────────────────────────────────────" | tee -a "$REPORT_FILE"
echo "💡 Open Google Analytics > Real-time to see results!" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"
node tests/puppeteer/test-puppeteer-realistic.js 2>&1 | tee -a "$REPORT_FILE"

echo "" | tee -a "$REPORT_FILE"
echo "════════════════════════════════════════" | tee -a "$REPORT_FILE"
echo "✅ Puppeteer tests completed!" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"
echo "📁 Report saved in: $REPORT_FILE" | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"
echo "🔗 Check Google Analytics:" | tee -a "$REPORT_FILE"
echo "   https://analytics.google.com/ > Reports > Real-time" | tee -a "$REPORT_FILE"
