import { render, screen } from '@testing-library/react';
import Experience from './Experience';

describe('Experience Component', () => {
  beforeEach(() => {
    render(<Experience />);
  });

  test('displays Recent Experience banner', () => {
    const headings = screen.getAllByRole('heading', { name: /Recent Experience/i });
    expect(headings.length).toBeGreaterThan(0);
    expect(screen.getByText(/Last 4 roles/i)).toBeInTheDocument();
  });

  test('displays Board International experience', () => {
    expect(screen.getByText('Board International')).toBeInTheDocument();
    const titles = screen.getAllByText(/Senior QA Engineer/i);
    expect(titles.length).toBeGreaterThan(0);
    expect(screen.getByText(/May 2025 – Present/i)).toBeInTheDocument();
  });

  // Add more tests for other companies if they are in the component
  // Based on the file read, I only saw Board International, but there might be more.
  // I'll stick to what I saw or generic checks.
});
