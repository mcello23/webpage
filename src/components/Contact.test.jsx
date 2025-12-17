import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Contact from './Contact';

// Mock fetch
global.fetch = jest.fn();

describe('Contact Component', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    fetch.mockClear();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('renders contact form with correct access key', () => {
    const { container } = render(<Contact />);
    expect(screen.getAllByRole('heading', { name: /Send me a message/i }).length).toBeGreaterThan(
      0
    );

    // Check for hidden access_key input
    const accessKeyInput = container.querySelector('input[name="access_key"]');
    expect(accessKeyInput).toBeInTheDocument();
    expect(accessKeyInput).toHaveValue('9b0257eb-d6be-4449-9eeb-af664f2bec38');
    expect(accessKeyInput).toHaveAttribute('type', 'hidden');

    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /^Message$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send message/i })).toBeInTheDocument();
  });

  test('handles successful submission', async () => {
    render(<Contact />);
    fetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByRole('textbox', { name: /^Message$/i }), {
      target: { value: 'Hello there' },
    });

    // Wait a bit to bypass the "too quick" bot check (mocked time would be better but let's try this)
    // Actually, the component sets formLoadTime on mount.
    // We can mock Date.now() to ensure enough time has passed.
    const realDateNow = Date.now;
    global.Date.now = jest.fn(() => realDateNow() + 2000);

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Restore Date.now
    global.Date.now = realDateNow;
  });

  test('prevents submission if too fast (bot check)', async () => {
    // Mock Date.now to simulate fast submission
    const startTime = 1000;
    global.Date.now = jest
      .fn()
      .mockReturnValueOnce(startTime) // Mount time
      .mockReturnValueOnce(startTime + 100); // Submit time (100ms later)

    // Re-render to reset load time
    render(<Contact />);

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(fetch).not.toHaveBeenCalled();
  });

  test('handles API error (success: false)', async () => {
    render(<Contact />);
    fetch.mockResolvedValueOnce({
      json: async () => ({ success: false, message: 'Something went wrong' }),
    });

    // Mock time to bypass bot check
    const realDateNow = Date.now;
    global.Date.now = jest.fn(() => realDateNow() + 2000);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByRole('textbox', { name: /^Message$/i }), {
      target: { value: 'Hello there' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    global.Date.now = realDateNow;
  });

  test('handles network error', async () => {
    render(<Contact />);
    fetch.mockRejectedValueOnce(new Error('Network error'));

    // Mock time to bypass bot check
    const realDateNow = Date.now;
    global.Date.now = jest.fn(() => realDateNow() + 2000);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByRole('textbox', { name: /^Message$/i }), {
      target: { value: 'Hello there' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    global.Date.now = realDateNow;
  });

  test('prevents submission if honeypot is filled (bot check)', () => {
    const { container } = render(<Contact />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Bot' } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), {
      target: { value: 'bot@example.com' },
    });

    // Get the form and manually add honeypot before submission
    const form = container.querySelector('form');
    const honeypotInput = document.createElement('input');
    honeypotInput.name = 'botcheck';
    honeypotInput.value = 'bot-value';
    honeypotInput.type = 'hidden';
    form.appendChild(honeypotInput);

    // Mock time to bypass the time check
    const realDateNow = Date.now;
    const mockNow = realDateNow() + 2000;
    global.Date.now = jest.fn(() => mockNow);

    // Submit button click
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    // Should not call fetch because honeypot is filled
    expect(fetch).not.toHaveBeenCalled();

    global.Date.now = realDateNow;
  });
});
