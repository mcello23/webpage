#!/bin/bash
# Cloudflare Pages Migration Checklist
# This script helps verify your deployment is ready

echo "🔒 Security & Deployment Pre-Flight Checklist"
echo "=============================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if _headers file exists
if [ -f "_headers" ]; then
    echo -e "${GREEN}✓${NC} _headers file exists"
else
    echo -e "${RED}✗${NC} _headers file missing"
fi

# Check if documentation exists
if [ -f "SECURITY.md" ]; then
    echo -e "${GREEN}✓${NC} SECURITY.md exists"
else
    echo -e "${YELLOW}⚠${NC} SECURITY.md missing"
fi

if [ -f "SECURITY_DEPLOYMENT.md" ]; then
    echo -e "${GREEN}✓${NC} SECURITY_DEPLOYMENT.md exists"
else
    echo -e "${YELLOW}⚠${NC} SECURITY_DEPLOYMENT.md missing"
fi

# Check index.html for security features
if grep -q "botcheck" index.html; then
    echo -e "${GREEN}✓${NC} Honeypot field present in contact form"
else
    echo -e "${RED}✗${NC} Honeypot field missing"
fi

if grep -q "formLoadTime" index.html; then
    echo -e "${GREEN}✓${NC} Timing check present in contact form"
else
    echo -e "${RED}✗${NC} Timing check missing"
fi

if grep -q 'rel="noopener noreferrer"' index.html; then
    echo -e "${GREEN}✓${NC} External links have noopener noreferrer"
else
    echo -e "${RED}✗${NC} Some external links may be missing security attributes"
fi

if grep -q "Referrer-Policy" index.html || grep -q 'name="referrer"' index.html; then
    echo -e "${GREEN}✓${NC} Referrer policy meta tag present"
else
    echo -e "${YELLOW}⚠${NC} Referrer policy meta tag missing"
fi

if grep -q "preload" index.html && grep -q "font" index.html; then
    echo -e "${GREEN}✓${NC} Font preloading configured"
else
    echo -e "${YELLOW}⚠${NC} Font preloading may be missing"
fi

# Check robots.txt
if [ -f "robots.txt" ]; then
    echo -e "${GREEN}✓${NC} robots.txt exists"
else
    echo -e "${YELLOW}⚠${NC} robots.txt missing (optional)"
fi