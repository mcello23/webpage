import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    open_model: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      timeUnit: '1s',
      preAllocatedVUs: 20,
      maxVUs: 50,
      stages: [
        { duration: '3s', target: 20 }, // ramp to 20 RPS
        { duration: '4s', target: 20 }, // hold
        { duration: '3s', target: 0 }, // cool down
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  const res = http.get('https://mcello23.github.io/webpage/', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
    },
    tags: { test: 'load', env: 'production' },
  });

  check(res, {
    'status 200': (r) => r.status === 200,
    'has content': (r) => r.body.length > 0,
  });

  sleep(1);
}
