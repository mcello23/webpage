import { render, screen } from '@testing-library/react';
import Skills from './Skills';

describe('Skills Component', () => {
  beforeEach(() => {
    render(<Skills />);
  });

  test('displays Tech Stack heading', () => {
    expect(screen.getByRole('heading', { name: /Tech Stack/i })).toBeInTheDocument();
  });

  test('displays Languages section', () => {
    expect(screen.getByRole('heading', { name: /Languages/i })).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  test('displays Automation & Frameworks section', () => {
    expect(
      screen.getByRole('heading', { name: /E2E\/Unit Testing Frameworks/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Cypress')).toBeInTheDocument();
    expect(screen.getByText('Playwright')).toBeInTheDocument();
  });

  test('displays CI/CD & Cloud section', () => {
    expect(screen.getByRole('heading', { name: /CI\/CD & DevOps/i })).toBeInTheDocument();
    expect(screen.getByText('GitHub Actions')).toBeInTheDocument();
    expect(screen.getByText('Azure DevOps')).toBeInTheDocument();
  });

  test('displays Shell & Environment section', () => {
    expect(screen.getByRole('heading', { name: /Shell & Environment/i })).toBeInTheDocument();
    expect(screen.getByText('Bash/Zsh')).toBeInTheDocument();
    expect(screen.getByText('WSL')).toBeInTheDocument();
  });

  test('applies correct gradient styles to skill tags', () => {
    const typeScriptTag = screen.getByText('TypeScript').closest('.skill-tag');
    expect(typeScriptTag).toHaveStyle({
      background: 'linear-gradient(135deg, #007acc 0%, #3178c6 100%)',
    });

    const cypressTag = screen.getByText('Cypress').closest('.skill-tag');
    expect(cypressTag).toHaveStyle({
      background: 'linear-gradient(135deg, #17202c 0%, #69d3a7 100%)',
    });
  });
});
