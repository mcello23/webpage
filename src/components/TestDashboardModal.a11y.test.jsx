import { render, screen } from '@testing-library/react';
import TestDashboardModal from './TestDashboardModal';

describe('TestDashboardModal Accessibility', () => {
  beforeEach(() => {
    // Mock fetch to prevent network errors and warnings
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.warn.mockRestore();
    console.error.mockRestore();
  });

  test('has correct accessibility attributes', () => {
    render(<TestDashboardModal isOpen={true} onClose={jest.fn()} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'dashboard-title');

    const title = document.getElementById('dashboard-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Test Results Dashboard/i);

    const closeButton = screen.getByRole('button', { name: /Close dashboard/i });
    expect(closeButton).toBeInTheDocument();
  });
});
