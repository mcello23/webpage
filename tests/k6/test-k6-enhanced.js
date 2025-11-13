/**
 * Enhanced K6 Performance & Security Test
 * Tests: Load performance, security headers, realistic user journeys
 * Run: k6 run tests/k6/test-k6-enhanced.js
 */

/* global __ENV */

import { check, group, sleep } from 'k6';
import http from 'k6/http';
import { Rate, Trend, Counter } from 'k6/metrics';

// Custom metrics
const securityHeadersPresent = new Rate('security_headers_present');
const cacheHitRate = new Rate('cache_hit_rate');
const assetLoadTime = new Trend('asset_load_time');
const pageInteractions = new Counter('page_interactions');

export const options = {
  scenarios: {
    // Realistic user load scenario
    realistic_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 10 }, // Warm up
        { duration: '1m', target: 30 }, // Normal traffic
        { duration: '30s', target: 50 }, // Traffic spike
        { duration: '1m', target: 30 }, // Back to normal
        { duration: '30s', target: 0 }, // Cool down
      ],
      gracefulRampDown: '15s',
    },

    // Stress test scenario (optional, runs in parallel)
    stress_test: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      timeUnit: '1s',
      preAllocatedVUs: 20,
      maxVUs: 100,
      stages: [
        { duration: '1m', target: 50 }, // Ramp to 50 RPS
        { duration: '2m', target: 100 }, // Push to 100 RPS
        { duration: '1m', target: 50 }, // Scale back
        { duration: '30s', target: 0 }, // Cool down
      ],
      startTime: '0s', // Run immediately
      exec: 'stressTest', // Use different function
    },
  },

  thresholds: {
    // Performance thresholds
    http_req_failed: ['rate<0.01'], // Less than 1% errors
    http_req_duration: ['p(95)<2000', 'p(99)<3000'], // 95th percentile < 2s
    'http_req_duration{page:index}': ['p(95)<1500'], // Homepage faster
    http_req_waiting: ['p(95)<1000'], // TTFB < 1s

    // Security thresholds
    security_headers_present: ['rate>0.95'], // 95% of requests have security headers

    // Asset performance
    'asset_load_time{type:css}': ['p(95)<500'], // CSS loads in <500ms
    'asset_load_time{type:js}': ['p(95)<800'], // JS loads in <800ms
    'asset_load_time{type:image}': ['p(95)<1000'], // Images load in <1s

    // Cache effectiveness
    cache_hit_rate: ['rate>0.50'], // At least 50% cache hits
  },
};

// Configuration
const BASE_URL = __ENV.BASE_URL || 'https://marcelocosta.pages.dev';
const IS_CLOUDFLARE = BASE_URL.includes('pages.dev');

// Required security headers for Cloudflare Pages
const REQUIRED_HEADERS = {
  'strict-transport-security': true,
  'x-content-type-options': true,
  'x-frame-options': true,
  'referrer-policy': true,
};

// Optional headers (nice to have)
const OPTIONAL_HEADERS = {
  'content-security-policy': true,
  'permissions-policy': true,
  'x-xss-protection': true,
};

/**
 * Main test scenario - Realistic user journey
 */
export default function () {
  group('Homepage Load & Security Check', () => {
    const res = http.get(`${BASE_URL}/`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
      tags: { page: 'index', test: 'realistic' },
    });

    // Basic functionality checks
    check(res, {
      'status is 200': (r) => r.status === 200,
      'has HTML content': (r) => r.body.includes('<!DOCTYPE html>'),
      'has title tag': (r) => r.body.includes('<title>'),
      'page size reasonable': (r) => r.body.length > 10000 && r.body.length < 500000,
      'response time acceptable': (r) => r.timings.duration < 2000,
    });

    // Security headers validation
    const securityScore = validateSecurityHeaders(res.headers, IS_CLOUDFLARE);
    securityHeadersPresent.add(securityScore > 0.7); // At least 70% headers present

    // Check for critical content
    check(res, {
      'has contact form': (r) => r.body.includes('id="cv-form"'),
      'has bot protection (honeypot)': (r) => r.body.includes('id="botcheck"'),
      'has CSP meta tag': (r) => r.body.includes('Content-Security-Policy'),
      'has referrer-policy meta': (r) => r.body.includes('name="referrer"'),
      'has Web3Forms API key': (r) => r.body.includes('access_key'),
    });

    // Cache validation
    const cacheHeader = res.headers['Cache-Control'] || res.headers['cache-control'] || '';
    cacheHitRate.add(cacheHeader.includes('max-age') || cacheHeader.includes('public'));

    pageInteractions.add(1);
  });

  // Simulate user reading page
  sleep(__randomBetween(2, 5));

  group('Static Assets Performance', () => {
    // Test CSS loading
    const cssRes = http.get(`${BASE_URL}/css/style.css`, {
      tags: { type: 'css', asset: 'main' },
    });
    check(cssRes, {
      'CSS loads successfully': (r) => r.status === 200,
      'CSS has cache headers': (r) =>
        r.headers['Cache-Control']?.includes('max-age') ||
        r.headers['cache-control']?.includes('max-age'),
    });
    assetLoadTime.add(cssRes.timings.duration, { type: 'css' });

    // Test JS loading
    const jsRes = http.get(`${BASE_URL}/js/init.js`, {
      tags: { type: 'js', asset: 'init' },
    });
    check(jsRes, {
      'JS loads successfully': (r) => r.status === 200,
      'JS has cache headers': (r) =>
        r.headers['Cache-Control']?.includes('max-age') ||
        r.headers['cache-control']?.includes('max-age'),
    });
    assetLoadTime.add(jsRes.timings.duration, { type: 'js' });

    pageInteractions.add(2);
  });

  // Random user behavior: some users explore more
  if (Math.random() > 0.5) {
    sleep(__randomBetween(1, 3));

    group('Side Projects Page', () => {
      const res = http.get(`${BASE_URL}/pages/side_proj/`, {
        tags: { page: 'side_proj' },
      });
      check(res, {
        'side projects page loads': (r) => r.status === 200,
        'has projects content': (r) => r.body.length > 5000,
      });
      pageInteractions.add(1);
    });

    sleep(__randomBetween(2, 4));
  }

  // Simulate some users checking frameworks page
  if (Math.random() > 0.7) {
    group('Frameworks Page', () => {
      const res = http.get(`${BASE_URL}/pages/frameworks/`, {
        tags: { page: 'frameworks' },
      });
      check(res, {
        'frameworks page loads': (r) => r.status === 200,
      });
      pageInteractions.add(1);
    });
  }

  sleep(__randomBetween(1, 2));
}

/**
 * Stress test scenario - High load without user delays
 */
export function stressTest() {
  const res = http.get(`${BASE_URL}/`, {
    tags: { test: 'stress' },
  });

  check(res, {
    'stress test - status 200': (r) => r.status === 200,
    'stress test - fast response': (r) => r.timings.duration < 3000,
  });
}

/**
 * Validate security headers and return compliance score
 */
function validateSecurityHeaders(headers, isCloudflare) {
  let score = 0;
  let total = 0;

  // Check required headers
  for (const header in REQUIRED_HEADERS) {
    total++;
    if (headers[header] || headers[header.toLowerCase()]) {
      score++;

      // Additional validation for specific headers
      if (header === 'strict-transport-security') {
        const hsts = headers[header] || headers['strict-transport-security'] || '';
        check(
          { hsts },
          {
            'HSTS max-age >= 1 year': () => {
              const match = hsts.match(/max-age=(\d+)/);
              return match && parseInt(match[1]) >= 31536000;
            },
            'HSTS includes subdomains': () => hsts.includes('includeSubDomains'),
          }
        );
      }

      if (header === 'x-frame-options') {
        const xfo = headers[header] || headers['x-frame-options'] || '';
        check(
          { xfo },
          {
            'X-Frame-Options is DENY or SAMEORIGIN': () => xfo === 'DENY' || xfo === 'SAMEORIGIN',
          }
        );
      }
    }
  }

  // Check optional headers (don't penalize if missing on GitHub Pages)
  if (isCloudflare) {
    for (const header in OPTIONAL_HEADERS) {
      total++;
      if (headers[header] || headers[header.toLowerCase()]) {
        score++;
      }
    }
  }

  return score / total;
}

/**
 * Generate random number between min and max
 */
function __randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Setup function - runs once per VU
 */
export function setup() {
  console.log(`🚀 Starting enhanced k6 test against: ${BASE_URL}`);
  console.log(`📊 Platform: ${IS_CLOUDFLARE ? 'Cloudflare Pages' : 'GitHub Pages'}`);

  // Warmup request
  const warmup = http.get(`${BASE_URL}/`);
  console.log(`🔥 Warmup request: ${warmup.status} (${warmup.timings.duration}ms)`);

  return { startTime: new Date().toISOString() };
}

/**
 * Teardown function - runs once after all VUs finish
 */
export function teardown(data) {
  console.log(`✅ Test completed. Started at: ${data.startTime}`);
}
