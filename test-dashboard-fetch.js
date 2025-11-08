#!/usr/bin/env node
/**
 * Test script to verify dashboard JSON files are accessible
 * Run: node test-dashboard-fetch.js
 */

const https = require('https');

const BASE_URL = 'https://mcello23.github.io/webpage';
const paths = [
  'reports/jest-summary.json',
  'tests/jest/reports/results-summary.json',
  'tests/jest/reports/results-latest.json',
  'tests/jest/reports/results-full.json',
  'tests/k6/reports/http-summary-latest.json',
];

console.log('🔍 Testing dashboard JSON accessibility...\n');

async function checkUrl(url) {
  return new Promise((resolve) => {
    https
      .get(url, { headers: { 'Cache-Control': 'no-cache' } }, (res) => {
        const { statusCode } = res;
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (statusCode === 200) {
            try {
              const json = JSON.parse(data);
              console.log(`✓ ${url}`);
              console.log(`  Size: ${data.length} bytes`);
              console.log(`  Valid JSON: Yes`);
              if (json.numTotalTests) {
                console.log(`  Tests: ${json.numTotalTests} (${json.numPassedTests} passed)`);
              }
            } catch (e) {
              console.log(`✓ ${url} (HTTP ${statusCode})`);
              console.log(`  ✗ Invalid JSON: ${e.message}`);
            }
          } else {
            console.log(`✗ ${url} (HTTP ${statusCode})`);
          }
          console.log('');
          resolve(statusCode);
        });
      })
      .on('error', (err) => {
        console.log(`✗ ${url} (Error: ${err.message})\n`);
        resolve(null);
      });
  });
}

async function testAll() {
  for (const path of paths) {
    await checkUrl(`${BASE_URL}/${path}`);
  }

  console.log('\n📊 Dashboard URL: https://mcello23.github.io/webpage/');
  console.log(
    '\n💡 If files return 404, GitHub Pages CDN may need 1-10 minutes to propagate after deployment.'
  );
  console.log('   Try: curl -I https://mcello23.github.io/webpage/reports/jest-summary.json');
}

testAll();
