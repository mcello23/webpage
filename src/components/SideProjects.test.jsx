import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SideProjects from './SideProjects';

// Mock window.M for Materialize
window.M = {
  AutoInit: jest.fn(),
  Modal: {
    init: jest.fn(() => ({
      open: jest.fn(),
      close: jest.fn(),
      destroy: jest.fn(),
    })),
    getInstance: jest.fn(() => ({
      open: jest.fn(),
      close: jest.fn(),
      destroy: jest.fn(),
    })),
  },
  Tooltip: {
    init: jest.fn(),
  },
};

// Mock IntersectionObserver
window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('SideProjects Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SideProjects />
      </MemoryRouter>
    );
  });

  test('initializes Materialize on mount', () => {
    expect(window.M.AutoInit).toHaveBeenCalled();
  });

  test('renders main title and description', () => {
    expect(screen.getByText(/Side Projects & Automation Tools/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Innovative automation solutions showcasing AI integration/i)
    ).toBeInTheDocument();
  });

  describe('AI Test Plan Generator Section', () => {
    test('renders section title and description', () => {
      expect(screen.getByText(/🤖 GPT-grade Test Plan generation/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Intelligent test planning powered by artificial intelligence/i)
      ).toBeInTheDocument();
    });

    test('renders OpenAI logo', () => {
      const logo = screen.getByAltText('OpenAI Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', expect.stringContaining('OpenAI_Logo.svg'));
    });

    test('renders TypeScript logo', () => {
      const logo = screen.getByAltText('TypeScript Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', expect.stringContaining('Typescript_logo_2020.svg'));
    });

    test('renders project description', () => {
      expect(screen.getByText(/Enterprise-grade tool leveraging/i)).toBeInTheDocument();
      expect(screen.getByText(/OpenAI's GPT-4/i)).toBeInTheDocument();
      expect(screen.getByText(/Transforms manual planning into structured/i)).toBeInTheDocument();
    });

    test('renders key features', () => {
      expect(screen.getByText(/Smart Generation:/i)).toBeInTheDocument();
      expect(screen.getByText(/Full Coverage:/i)).toBeInTheDocument();
      expect(screen.getByText(/Multi-Platform:/i)).toBeInTheDocument();
      expect(screen.getByText(/Dual Interface:/i)).toBeInTheDocument();
      expect(screen.getByText(/Export Ready:/i)).toBeInTheDocument();
    });

    test('renders GitHub link', () => {
      const links = screen.getAllByRole('link', { name: /View on GitHub/i });
      const aiLink = links.find(
        (link) => link.getAttribute('href') === 'https://github.com/mcello23/ai-test-plan-generator'
      );
      expect(aiLink).toBeInTheDocument();
      expect(aiLink).toHaveAttribute('target', '_blank');
    });
  });

  describe('Python Music Downloader Section', () => {
    test('renders section title and description', () => {
      expect(screen.getByText(/🎵 Download music anywhere!/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Automated YouTube to MP3 conversion with batch processing/i)
      ).toBeInTheDocument();
    });

    test('renders Python logo', () => {
      const logo = screen.getByAltText('Python Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', expect.stringContaining('Python-logo-notext.svg'));
    });

    test('renders YouTube logo', () => {
      const logo = screen.getByAltText('YouTube Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', expect.stringContaining('YouTube_full-color_icon'));
    });

    test('renders project description', () => {
      expect(screen.getByText(/Production-ready automation script/i)).toBeInTheDocument();
      expect(screen.getByText(/high-fidelity YouTube to MP3 conversion/i)).toBeInTheDocument();
      expect(screen.getByText(/Demonstrates advanced Python scripting/i)).toBeInTheDocument();
    });

    test('renders key features', () => {
      expect(screen.getByText(/High-Fidelity Audio:/i)).toBeInTheDocument();
      expect(screen.getByText(/Smart Search:/i)).toBeInTheDocument();
      expect(screen.getByText(/Batch Processing:/i)).toBeInTheDocument();
      expect(screen.getByText(/Robust Architecture:/i)).toBeInTheDocument();
      expect(screen.getByText(/DevOps Ready:/i)).toBeInTheDocument();
    });

    test('renders GitHub link', () => {
      const links = screen.getAllByRole('link', { name: /View on GitHub/i });
      const pythonLink = links.find(
        (link) => link.getAttribute('href') === 'https://github.com/mcello23/python-music-download'
      );
      expect(pythonLink).toBeInTheDocument();
      expect(pythonLink).toHaveAttribute('target', '_blank');
    });
  });
});
