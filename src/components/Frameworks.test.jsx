import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Frameworks from './Frameworks';

// Mock window.M for Materialize
window.M = {
  AutoInit: jest.fn(),
};

describe('Frameworks Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Frameworks />
      </MemoryRouter>
    );
  });

  test('initializes Materialize on mount', () => {
    expect(window.M.AutoInit).toHaveBeenCalled();
  });

  test('renders main title and description', () => {
    expect(screen.getByText(/Enterprise Testing Frameworks & Automation/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Comprehensive testing solutions with advanced CI\/CD integration/i)
    ).toBeInTheDocument();
  });

  describe('Playwright Section', () => {
    test('renders section title', () => {
      expect(screen.getByText(/Advanced Playwright Testing/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Cross-browser • Visual Regression • API Validation/i)
      ).toBeInTheDocument();
    });

    test('renders Identity Verification Platform card', () => {
      expect(screen.getByText(/Identity Verification Platform/i)).toBeInTheDocument();
      expect(screen.getByText(/Enterprise-Grade E2E Testing with TypeScript/i)).toBeInTheDocument();
    });

    test('renders capabilities', () => {
      expect(screen.getByText(/Auth:/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Real-time:/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/Multi-persona:/i)).toBeInTheDocument();
      expect(screen.getByText(/i18n:/i)).toBeInTheDocument();
      expect(screen.getByText(/Responsive:/i)).toBeInTheDocument();
    });

    test('renders Test Data Factory Pattern section', () => {
      expect(screen.getByText(/Test Data Factory Pattern/i)).toBeInTheDocument();
      expect(screen.getByText(/Dynamic Generation/i)).toBeInTheDocument();
      expect(screen.getByText(/API-First Testing/i)).toBeInTheDocument();
      expect(screen.getAllByText(/UI Validation/i)[0]).toBeInTheDocument();
    });

    test('renders Explore Repository link', () => {
      const link = screen.getByRole('link', { name: /Explore Repository/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://github.com/mcello23/playwright-demonstration');
    });
  });

  describe('Cypress Section', () => {
    test('renders section title', () => {
      expect(screen.getByText(/Enterprise Cypress Testing/i)).toBeInTheDocument();
      expect(screen.getByText(/BDD • GraphQL • Docker • CI\/CD/i)).toBeInTheDocument();
    });

    test('renders KYB Platform Automation card', () => {
      expect(screen.getByText(/KYB Platform Automation/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Behavior-Driven Development with Real-World Integration/i)
      ).toBeInTheDocument();
    });

    test('renders capabilities', () => {
      expect(screen.getByText(/Documents:/i)).toBeInTheDocument();
      expect(screen.getByText(/User Mgmt:/i)).toBeInTheDocument();
      expect(screen.getByText(/Regulatory:/i)).toBeInTheDocument();
      expect(screen.getByText(/Comms:/i)).toBeInTheDocument();
      expect(screen.getByText(/Financial:/i)).toBeInTheDocument();
    });

    test('renders BDD Pattern section', () => {
      expect(screen.getByText(/Behavior-Driven Development Pattern/i)).toBeInTheDocument();
      expect(screen.getByText(/Gherkin Syntax/i)).toBeInTheDocument();
      expect(screen.getByText(/Real-Time Tests/i)).toBeInTheDocument();
      expect(screen.getByText(/Complex Workflows/i)).toBeInTheDocument();
      expect(screen.getByText(/Living Docs/i)).toBeInTheDocument();
    });

    test('renders View Enterprise Project link', () => {
      const link = screen.getByRole('link', { name: /View Enterprise Project/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        'href',
        'https://github.com/mcello23/cypress-automation-real-proj'
      );
    });
  });

  describe('Builder Platform Section', () => {
    test('renders section title', () => {
      expect(screen.getByText(/Identity Platform Builder/i)).toBeInTheDocument();
      expect(screen.getByText(/GitHub Actions • Docker • Nightly Testing/i)).toBeInTheDocument();
    });

    test('renders Enterprise Builder Platform card', () => {
      expect(screen.getByText(/Enterprise Builder Platform/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Advanced CI\/CD with Automated Deployment Pipelines/i)
      ).toBeInTheDocument();
    });

    test('renders capabilities', () => {
      expect(screen.getByText(/Dynamic UI:/i)).toBeInTheDocument();
      expect(screen.getByText(/SDK Testing:/i)).toBeInTheDocument();
      expect(screen.getByText(/Cross-platform:/i)).toBeInTheDocument();
      expect(screen.getByText(/Integrations:/i)).toBeInTheDocument();
    });

    test('renders CI/CD Pipeline Integration section', () => {
      expect(screen.getByText(/CI\/CD Pipeline Integration/i)).toBeInTheDocument();
      expect(screen.getByText(/Matrix Testing/i)).toBeInTheDocument();
      expect(screen.getByText(/Multi-Environment/i)).toBeInTheDocument();
      expect(screen.getByText(/Auto Triggers/i)).toBeInTheDocument();
      expect(screen.getByText(/Matrix Builds/i)).toBeInTheDocument();
    });

    test('renders Explore CI/CD Pipeline link', () => {
      const link = screen.getByRole('link', { name: /Explore CI\/CD Pipeline/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        'href',
        'https://github.com/mcello23/cypress-demonstration-repo'
      );
    });
  });

  describe('Coming Soon Section', () => {
    test('renders section title', () => {
      expect(screen.getByText(/Coming Soon/i)).toBeInTheDocument();
      expect(screen.getByText(/More Enterprise Testing Solutions/i)).toBeInTheDocument();
    });

    test('renders Advanced Testing Methodologies card', () => {
      expect(screen.getByText(/Advanced Testing Methodologies/i)).toBeInTheDocument();
      expect(screen.getByText(/Performance, Load, Unit & AI\/LLM Testing/i)).toBeInTheDocument();
    });

    test('renders Performance Testing', () => {
      expect(screen.getByText(/Performance Testing/i)).toBeInTheDocument();
      expect(screen.getByText(/Lighthouse CI:/i)).toBeInTheDocument();
      expect(screen.getByText(/Metrics:/i)).toBeInTheDocument();
      expect(screen.getByText(/Resource:/i)).toBeInTheDocument();
    });

    test('renders Load Testing', () => {
      expect(screen.getByText(/Load Testing/i)).toBeInTheDocument();
      expect(screen.getByText(/K6:/i)).toBeInTheDocument();
      expect(screen.getByText(/Stress:/i)).toBeInTheDocument();
      expect(screen.getByText(/Spike:/i)).toBeInTheDocument();
    });

    test('renders Unit Testing', () => {
      expect(screen.getByText(/Unit Testing/i)).toBeInTheDocument();
      expect(screen.getByText(/Jest\/Vitest:/i)).toBeInTheDocument();
      expect(screen.getByText(/Coverage:/i)).toBeInTheDocument();
      expect(screen.getByText(/Mocking:/i)).toBeInTheDocument();
    });

    test('renders AI/LLM Testing', () => {
      expect(screen.getAllByText(/AI\/LLM Testing/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/Non-deterministic:/i)).toBeInTheDocument();
      expect(screen.getByText(/Hallucination:/i)).toBeInTheDocument();
      expect(screen.getByText(/Boundaries:/i)).toBeInTheDocument();
    });
  });
});
