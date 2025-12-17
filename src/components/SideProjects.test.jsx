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
      expect(screen.getByText(/🤖 AI Test Plan Generator/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Intelligent test planning powered by artificial intelligence/i)
      ).toBeInTheDocument();
    });

    test('renders tech stack', () => {
      expect(screen.getByText(/OpenAI GPT-4 • Node.js • TypeScript/i)).toBeInTheDocument();
    });

    test('renders OpenAI logo', () => {
      const logo = screen.getByAltText('openai-logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', expect.stringContaining('OpenAI_Logo.svg'));
    });

    test('renders TypeScript logo', () => {
      const logo = screen.getByAltText('typescript-logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', expect.stringContaining('Typescript_logo_2020.svg'));
    });

    test('renders project description', () => {
      expect(screen.getByText(/innovative AI-powered test plan generator/i)).toBeInTheDocument();
      expect(screen.getByText(/CLI interface/i)).toBeInTheDocument();
      expect(screen.getByText(/web interface/i)).toBeInTheDocument();
    });

    test('renders key features', () => {
      expect(screen.getByText(/AI-Powered Intelligence:/i)).toBeInTheDocument();
      expect(screen.getByText(/Comprehensive Test Coverage:/i)).toBeInTheDocument();
      expect(screen.getByText(/Multiple Testing Types:/i)).toBeInTheDocument();
      expect(screen.getByText(/Multi-Platform Support:/i)).toBeInTheDocument();
      expect(screen.getByText(/Flexible Export Options:/i)).toBeInTheDocument();
      expect(screen.getByText(/Dual Interface:/i)).toBeInTheDocument();
      expect(screen.getByText(/Smart Prioritization:/i)).toBeInTheDocument();
      expect(screen.getByText(/Time Estimation:/i)).toBeInTheDocument();
    });

    test('renders GitHub link', () => {
      const links = screen.getAllByRole('link', { name: /Check out my GitHub project/i });
      const aiLink = links.find(
        (link) => link.getAttribute('href') === 'https://github.com/mcello23/ai-test-plan-generator'
      );
      expect(aiLink).toBeInTheDocument();
      expect(aiLink).toHaveAttribute('target', '_blank');
    });
  });

  describe('Python Music Downloader Section', () => {
    test('renders section title and description', () => {
      expect(screen.getByText(/🎵 Python Music Downloader/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Automated YouTube to MP3 conversion with batch processing/i)
      ).toBeInTheDocument();
    });

    test('renders tech stack', () => {
      expect(screen.getByText(/yt-dlp • youtubesearchpython • FFmpeg/i)).toBeInTheDocument();
    });

    test('renders Python logo', () => {
      const logo = screen.getByAltText('python-logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', expect.stringContaining('Python-logo-notext.svg'));
    });

    test('renders YouTube logo', () => {
      const logo = screen.getByAltText('youtube-logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', expect.stringContaining('YouTube_full-color_icon'));
    });

    test('renders project description', () => {
      expect(screen.getByText(/practical Python automation tool/i)).toBeInTheDocument();
      expect(screen.getAllByText(/yt-dlp/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/youtubesearchpython/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/FFmpeg/i)[0]).toBeInTheDocument();
    });

    test('renders key features', () => {
      expect(screen.getByText(/Smart YouTube Search:/i)).toBeInTheDocument();
      expect(screen.getByText(/High-Quality Audio:/i)).toBeInTheDocument();
      expect(screen.getByText(/Batch Processing:/i)).toBeInTheDocument();
      expect(screen.getByText(/Automatic Organization:/i)).toBeInTheDocument();
      expect(screen.getByText(/FFmpeg Integration:/i)).toBeInTheDocument();
      expect(screen.getByText(/Error Handling:/i)).toBeInTheDocument();
      expect(screen.getByText(/Cross-Platform:/i)).toBeInTheDocument();
    });

    test('renders GitHub link', () => {
      const links = screen.getAllByRole('link', { name: /Check out my GitHub project/i });
      const pythonLink = links.find(
        (link) => link.getAttribute('href') === 'https://github.com/mcello23/python-music-download'
      );
      expect(pythonLink).toBeInTheDocument();
      expect(pythonLink).toHaveAttribute('target', '_blank');
    });
  });
});
