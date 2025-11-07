#!/bin/bash

# Script to update test reports for the dashboard
# Run this before opening the webpage to ensure fresh test results

echo "🧪 Generating test reports for dashboard..."
npm run test:reports

echo ""
echo "✅ All test reports updated!"
echo "📊 View at:"
echo "   - Local: http://localhost:8080 (comment out <base> tag first)"
echo "   - GitHub Pages: https://mcello23.github.io/webpage/"
