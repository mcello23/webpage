#!/bin/bash

# Test script for uploading K6 results to GitHub Gist
# Usage: ./scripts/test-gist-upload.sh YOUR_GIST_ID YOUR_GITHUB_TOKEN

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check arguments
if [ "$#" -lt 2 ]; then
    echo -e "${RED}Error: Missing arguments${NC}"
    echo ""
    echo "Usage: $0 GIST_ID GITHUB_TOKEN"
    echo ""
    echo "Example:"
    echo "  $0 abc123def456 ghp_xxxxxxxxxxxx"
    echo ""
    echo -e "${YELLOW}To create a token:${NC}"
    echo "  1. Go to: https://github.com/settings/tokens"
    echo "  2. Click 'Generate new token (classic)'"
    echo "  3. Select scope: 'gist'"
    echo "  4. Copy the generated token"
    exit 1
fi

GIST_ID="$1"
GITHUB_TOKEN="$2"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  K6 → GitHub Gist Upload Test${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Step 1: Check if K6 results file exists
echo -e "${YELLOW}[1/4]${NC} Checking K6 results file..."
if [ ! -f "tests/k6/reports/results-latest.json" ]; then
    echo -e "${RED}✗ K6 results file not found!${NC}"
    echo ""
    echo "Please run K6 tests first:"
    echo "  k6 run tests/k6/test-k6.js --summary-export=tests/k6/reports/results-latest.json"
    exit 1
fi
echo -e "${GREEN}✓ K6 results file found${NC}"
echo ""

# Step 2: Validate JSON
echo -e "${YELLOW}[2/4]${NC} Validating JSON..."
if ! jq empty tests/k6/reports/results-latest.json 2>/dev/null; then
    echo -e "${RED}✗ Invalid JSON file!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ JSON is valid${NC}"
echo ""

# Step 3: Check Gist exists
echo -e "${YELLOW}[3/4]${NC} Checking if Gist exists..."
GIST_CHECK=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/gists/$GIST_ID")

if echo "$GIST_CHECK" | jq -e '.message == "Not Found"' > /dev/null 2>&1; then
    echo -e "${RED}✗ Gist not found!${NC}"
    echo ""
    echo "Please create a Gist first:"
    echo "  1. Go to: https://gist.github.com/"
    echo "  2. Create a new gist with filename: k6-results.json"
    echo "  3. Copy the Gist ID from the URL"
    exit 1
fi
echo -e "${GREEN}✓ Gist exists${NC}"
echo ""

# Step 4: Upload to Gist
echo -e "${YELLOW}[4/4]${NC} Uploading K6 results to Gist..."

# Create payload file (avoids "Argument list too long" error)
jq -n \
  --rawfile k6data tests/k6/reports/results-latest.json \
  '{"files":{"k6-results.json":{"content":$k6data}}}' \
  > /tmp/gist-payload.json

RESPONSE=$(curl -s -X PATCH \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/gists/$GIST_ID" \
    -d @/tmp/gist-payload.json)

# Clean up
rm -f /tmp/gist-payload.json

# Check if update was successful
if echo "$RESPONSE" | jq -e '.id' > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Upload successful!${NC}"
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}  Success!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "🎉 K6 results uploaded successfully!"
    echo ""
    echo "View your Gist:"
    echo "  ${BLUE}https://gist.github.com/$GIST_ID${NC}"
    echo ""
    echo "Raw JSON URL (for dashboard):"
    GIST_OWNER=$(echo "$RESPONSE" | jq -r '.owner.login')
    echo "  ${BLUE}https://gist.githubusercontent.com/$GIST_OWNER/$GIST_ID/raw/k6-results.json${NC}"
    echo ""
    echo "Test in browser:"
    echo "  curl https://gist.githubusercontent.com/$GIST_OWNER/$GIST_ID/raw/k6-results.json | jq '.metrics | keys'"
    echo ""
else
    echo -e "${RED}✗ Upload failed!${NC}"
    echo ""
    echo "API Response:"
    echo "$RESPONSE" | jq '.'
    exit 1
fi

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

