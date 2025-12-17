import { render, screen } from '@testing-library/react';
import Articles from './Articles';

describe('Articles Component', () => {
  beforeEach(() => {
    render(<Articles />);
  });

  test('displays Articles banner', () => {
    const headings = screen.getAllByRole('heading', { name: /Articles & Writing/i });
    expect(headings.length).toBeGreaterThan(0);
    expect(screen.getByText(/Technical publications/i)).toBeInTheDocument();
  });

  test('displays article cards', () => {
    const headings = screen.getAllByRole('heading', { name: /Articles & Writing/i, hidden: true });
    expect(headings.length).toBeGreaterThan(0);
  });

  test('Hasura GraphQL Medium article link should be correct', () => {
    const hasuraLink = screen.getByRole('link', { name: /Read on Medium/i });
    expect(hasuraLink).toHaveAttribute('href', expect.stringContaining('medium.com'));
    expect(hasuraLink).toHaveAttribute(
      'href',
      expect.stringContaining(
        'how-to-integrate-hasura-graphql-hooks-into-your-e2e-tests-with-cypress'
      )
    );
    expect(hasuraLink).toHaveAttribute('target', '_blank');
    expect(hasuraLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('Auth0 LinkedIn article link should be correct', () => {
    const auth0Link = screen.getByRole('link', { name: /View on LinkedIn/i });
    expect(auth0Link).toHaveAttribute('href', expect.stringContaining('linkedin.com/pulse'));
    expect(auth0Link).toHaveAttribute(
      'href',
      expect.stringContaining('speeding-un-cypress-tests-auth0-login-across-specs')
    );
    expect(auth0Link).toHaveAttribute('target', '_blank');
    expect(auth0Link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('Cyprompt AI Dev.to article link should be correct', () => {
    const cypromptLinks = screen.getAllByRole('link', { name: /Read on Dev.to/i });
    const cypromptLink = cypromptLinks.find((link) =>
      link
        .getAttribute('href')
        .includes('how-cypress-will-revolutionize-the-use-of-ai-in-testing-with-cyprompt')
    );

    expect(cypromptLink).toBeInTheDocument();
    expect(cypromptLink).toHaveAttribute('href', expect.stringContaining('dev.to'));
    expect(cypromptLink).toHaveAttribute('href', expect.stringContaining('marcelo_sqe'));
    expect(cypromptLink).toHaveAttribute('target', '_blank');
    expect(cypromptLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('Cyprompt article card should have correct tags', () => {
    // Find the card containing the Cyprompt article
    const cypromptHeading = screen.getByRole('heading', {
      name: /How Cypress Will Revolutionize AI in Testing with cy.prompt\(\)/i,
    });
    const card = cypromptHeading.closest('.card');

    expect(card).toHaveTextContent('AI Testing');
    expect(card).toHaveTextContent('Cypress');
    expect(card).toHaveTextContent('Cyprompt');
  });

  test('Cyprompt article should have psychology icon', () => {
    const cypromptHeading = screen.getByRole('heading', {
      name: /How Cypress Will Revolutionize AI in Testing with cy.prompt\(\)/i,
    });
    const card = cypromptHeading.closest('.card');
    const icon = card.querySelector('.material-icons');
    expect(icon).toHaveTextContent('psychology');
  });
});
