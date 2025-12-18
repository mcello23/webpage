import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component', () => {
  beforeEach(() => {
    render(<Hero />);
  });

  describe('Profile Section', () => {
    test('displays profile image with correct attributes', () => {
      const profileImg = screen.getByAltText('Portrait of Marcelo Costa');
      expect(profileImg).toBeInTheDocument();
      expect(profileImg).toHaveAttribute('src', '/images/assets/headshot.webp');
      expect(profileImg).toHaveAttribute('fetchPriority', 'high');
    });

    test('displays correct name', () => {
      expect(screen.getByRole('heading', { name: /Marcelo Costa/i })).toBeInTheDocument();
    });

    test('displays professional title', () => {
      expect(screen.getByText(/Senior QA Engineer & SDET/i)).toBeInTheDocument();
    });

    test('displays location and languages', () => {
      expect(screen.getByText(/Madrid, Spain/i)).toBeInTheDocument();
      expect(screen.getByText(/Trilingual/i)).toBeInTheDocument();
    });
  });

  describe('Quick Impact Metrics', () => {
    test('displays Quick Impact Metrics heading', () => {
      expect(screen.getByRole('heading', { name: /Quick Impact Metrics/i })).toBeInTheDocument();
    });

    test('displays all metrics', () => {
      expect(screen.getByText('5,000+')).toBeInTheDocument();
      expect(screen.getByText(/E2E tests maintained daily/i)).toBeInTheDocument();

      expect(screen.getByText('98%')).toBeInTheDocument();
      expect(screen.getByText(/Startup time cut/i)).toBeInTheDocument();

      expect(screen.getByText('25 → 8 min')).toBeInTheDocument();
      expect(screen.getByText(/Suite execution reduction/i)).toBeInTheDocument();

      expect(screen.getByText('30%')).toBeInTheDocument();
      expect(screen.getByText(/Customer issues reduced/i)).toBeInTheDocument();
    });
  });

  describe('What I Do Section', () => {
    test('displays What I Do heading', () => {
      expect(screen.getByRole('heading', { name: /What I Do/i })).toBeInTheDocument();
    });

    test('displays key areas', () => {
      expect(screen.getByText(/E2E Test Automation:/i)).toBeInTheDocument();
      expect(screen.getByText(/Performance Tuning:/i)).toBeInTheDocument();
      expect(screen.getByText(/CI\/CD Pipelines:/i)).toBeInTheDocument();
      expect(screen.getByText(/Mobile Testing:/i)).toBeInTheDocument();
      expect(screen.getByText(/BDD Frameworks:/i)).toBeInTheDocument();
      expect(screen.getByText(/Team Leadership:/i)).toBeInTheDocument();
    });
  });

  describe('Board Achievements', () => {
    test('displays Achievements heading', () => {
      expect(
        screen.getByRole('heading', { name: /2025 Achievements at Board International/i })
      ).toBeInTheDocument();
    });

    test('displays achievement items', () => {
      expect(screen.getByText(/Performance:/i)).toBeInTheDocument();
      expect(screen.getByText(/DX:/i)).toBeInTheDocument();
      expect(screen.getByText(/Scale:/i)).toBeInTheDocument();
      expect(screen.getByText(/CI\/CD:/i)).toBeInTheDocument();
    });
  });
});
