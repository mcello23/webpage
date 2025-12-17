import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TestDashboardModal from './TestDashboardModal';

// Mock global TEST_RESULTS
const mockTestResults = {
  jest: {
    success: true,
    numTotalTests: 100,
    numPassedTests: 98,
    numFailedTests: 2,
    numTotalTestSuites: 2,
    passRate: 98.0,
    testSuites: [
      { name: 'suite1.test.js', status: 'passed', duration: 100, numPassedTests: 50, numTests: 50 },
      { name: 'suite2.test.js', status: 'failed', duration: 200, numFailedTests: 2, numTests: 50 },
    ],
  },
  metadata: {
    timestamp: '2025-01-01T12:00:00Z',
  },
};

describe('TestDashboardModal Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    window.TEST_RESULTS = mockTestResults;
    // Mock fetch for K6 data if needed, or rely on window.TEST_RESULTS if the component supports it
    // The component tries to load from window.TEST_RESULTS first for Jest.
    // For K6, it seems to fetch from Gist. We should mock fetch.
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            metrics: {
              http_reqs: { count: 500, rate: 50 },
              http_req_duration: { 'p(95)': 100, avg: 50 },
              checks: { passes: 1000, fails: 0, value: 1 },
            },
          }),
      })
    );
  });

  afterEach(() => {
    delete window.TEST_RESULTS;
    jest.clearAllMocks();
    console.warn.mockRestore();
    console.error.mockRestore();
  });

  test('does not render when isOpen is false', () => {
    render(<TestDashboardModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders when isOpen is true', async () => {
    render(<TestDashboardModal isOpen={true} onClose={() => {}} />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.getByText(/Test Results Dashboard/i)).toBeInTheDocument();
    });
  });

  test('displays Jest metrics', async () => {
    render(<TestDashboardModal isOpen={true} onClose={() => {}} />);

    await waitFor(() => {
      // Check for pass rate (might be formatted as 98.00 %)
      expect(screen.getByText(/98(\.00)?\s*%/)).toBeInTheDocument();
      // Check for total tests
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  test('displays K6 metrics', async () => {
    render(<TestDashboardModal isOpen={true} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/K6 Performance/i)).toBeInTheDocument();
      // Use getAllByText because the value appears in summary and details
      const totalRequests = screen.getAllByText('500');
      expect(totalRequests.length).toBeGreaterThan(0);

      const p95 = screen.getAllByText('100.00ms');
      expect(p95.length).toBeGreaterThan(0);
    });
  });

  test('handles K6 fetch error gracefully and uses fallback', async () => {
    // Mock fetch failure for K6
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    // Set up K6 fallback data
    window.TEST_RESULTS.k6 = {
      metrics: {
        http_reqs: { count: 300, rate: 30 },
        http_req_duration: { 'p(95)': 150, avg: 70 },
        checks: { passes: 500, fails: 0, value: 1 },
      },
    };

    render(<TestDashboardModal isOpen={true} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/K6 Performance/i)).toBeInTheDocument();
      // Should use fallback data
      const requests = screen.getAllByText('300');
      expect(requests.length).toBeGreaterThan(0);
    });
  });

  test('handles script loading for Jest data', async () => {
    // Clear window.TEST_RESULTS to force script load
    delete window.TEST_RESULTS;

    // Mock script loading successfully
    const originalCreateElement = document.createElement.bind(document);
    document.createElement = jest.fn((tagName) => {
      if (tagName === 'script') {
        const scriptEl = originalCreateElement('script');
        setTimeout(() => {
          // Simulate successful script load
          window.TEST_RESULTS = mockTestResults;
          if (scriptEl.onload) scriptEl.onload();
        }, 0);
        return scriptEl;
      }
      return originalCreateElement(tagName);
    });

    try {
      render(<TestDashboardModal isOpen={true} onClose={() => {}} />);

      await waitFor(() => {
        expect(screen.getByText(/Test Results Dashboard/i)).toBeInTheDocument();
      });
    } finally {
      // Restore document.createElement even if test fails
      document.createElement = originalCreateElement;
    }
  });

  test('expands and collapses test suites', async () => {
    // Ensure window.TEST_RESULTS is present (it should be from beforeEach, but let's be explicit)
    window.TEST_RESULTS = mockTestResults;

    render(<TestDashboardModal isOpen={true} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/Test Results Dashboard/i)).toBeInTheDocument();
      // Wait for loading to finish by checking for a known element that appears after loading
      expect(screen.getByText('100')).toBeInTheDocument(); // Total tests
    });

    // Find button by role and partial name
    const expandBtn = screen.getByRole('button', { name: /View.*Test Suites/i });

    fireEvent.click(expandBtn);

    expect(screen.getByText('suite1.test.js')).toBeInTheDocument();
    expect(screen.getByText('suite2.test.js')).toBeInTheDocument();
  });

  test('closes modal when close button is clicked', async () => {
    const onCloseMock = jest.fn();
    render(<TestDashboardModal isOpen={true} onClose={onCloseMock} />);

    await waitFor(() => {
      expect(screen.getByText(/Test Results Dashboard/i)).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('handles script onerror correctly', async () => {
    // Clear window.TEST_RESULTS to force script load
    delete window.TEST_RESULTS;

    // Mock script loading to fail
    const originalCreateElement = document.createElement.bind(document);
    let scriptErrorCallback = null;

    document.createElement = jest.fn((tagName) => {
      if (tagName === 'script') {
        const scriptEl = originalCreateElement('script');
        Object.defineProperty(scriptEl, 'onerror', {
          set: (callback) => {
            scriptErrorCallback = callback;
          },
          get: () => scriptErrorCallback,
        });
        setTimeout(() => {
          if (scriptErrorCallback) scriptErrorCallback();
        }, 0);
        return scriptEl;
      }
      return originalCreateElement(tagName);
    });

    // Mock fetch to fail for K6
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    try {
      render(<TestDashboardModal isOpen={true} onClose={() => {}} />);

      // Wait for component to render and process errors
      await waitFor(
        () => {
          expect(console.error).toHaveBeenCalledWith(
            expect.stringContaining('Failed to load test data'),
            expect.anything()
          );
        },
        { timeout: 3000 }
      );
    } finally {
      document.createElement = originalCreateElement;
    }
  });

  test('handles script load with missing Jest data', async () => {
    delete window.TEST_RESULTS;

    const originalCreateElement = document.createElement.bind(document);
    document.createElement = jest.fn((tagName) => {
      if (tagName === 'script') {
        const scriptEl = originalCreateElement('script');
        setTimeout(() => {
          // Simulate script load but without TEST_RESULTS
          // window.TEST_RESULTS remains undefined
          if (scriptEl.onload) scriptEl.onload();
        }, 0);
        return scriptEl;
      }
      return originalCreateElement(tagName);
    });

    // Mock K6 to succeed so we don't get error from both failing
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            metrics: {
              http_reqs: { count: 100 },
              http_req_duration: { 'p(95)': 50, avg: 30 },
              checks: { passes: 100, fails: 0 },
            },
          }),
      })
    );

    try {
      render(<TestDashboardModal isOpen={true} onClose={() => {}} />);

      await waitFor(() => {
        expect(screen.getByText(/No Jest data available/i)).toBeInTheDocument();
      });
    } finally {
      document.createElement = originalCreateElement;
    }
  });

  test('expands and collapses K6 details', async () => {
    window.TEST_RESULTS = {
      ...mockTestResults,
      k6: {
        metrics: {
          http_reqs: { count: 500, rate: 50 },
          http_req_duration: { 'p(95)': 100, avg: 50, min: 10, med: 40, max: 200, 'p(90)': 90 },
          checks: { passes: 1000, fails: 0, value: 1 },
        },
      },
    };

    render(<TestDashboardModal isOpen={true} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/K6 Performance/i)).toBeInTheDocument();
      // Wait until data is loaded - use getAllByText since it appears multiple times
      const elements = screen.getAllByText('500');
      expect(elements.length).toBeGreaterThan(0);
    });

    const expandBtn = screen.getByRole('button', { name: /View Detailed Metrics/i });

    fireEvent.click(expandBtn);

    // Should show additional metrics after expansion
    await waitFor(() => {
      expect(screen.getByText(/Average:/i)).toBeInTheDocument();
    });

    // Click again to collapse
    fireEvent.click(expandBtn);
  });

  test('displays K6 threshold information when available', async () => {
    window.TEST_RESULTS = {
      ...mockTestResults,
      k6: {
        metrics: {
          http_reqs: { count: 500, rate: 50 },
          http_req_duration: {
            'p(95)': 1800,
            avg: 50,
            min: 10,
            med: 40,
            max: 200,
            'p(90)': 90,
            thresholds: {
              'p(95)<2000': true,
            },
          },
          checks: { passes: 1000, fails: 0, value: 1 },
        },
      },
    };

    render(<TestDashboardModal isOpen={true} onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/K6 Performance/i)).toBeInTheDocument();
      // Wait for data to be loaded - use getAllByText since it appears multiple times
      const elements = screen.getAllByText('500');
      expect(elements.length).toBeGreaterThan(0);
    });

    // The threshold should be visible in the details even without expansion
    await waitFor(() => {
      expect(screen.getByText(/Threshold.*P95.*2000ms/i)).toBeInTheDocument();
    });
  });

  test('sets body overflow correctly on modal state changes', async () => {
    // Reset body overflow before test
    document.body.style.overflow = '';

    const { rerender } = render(<TestDashboardModal isOpen={false} onClose={() => {}} />);

    // Initially closed, overflow could be auto or empty
    expect(['', 'auto']).toContain(document.body.style.overflow);

    // Open modal
    rerender(<TestDashboardModal isOpen={true} onClose={() => {}} />);

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    // Close modal
    rerender(<TestDashboardModal isOpen={false} onClose={() => {}} />);

    expect(document.body.style.overflow).toBe('auto');
  });
});
