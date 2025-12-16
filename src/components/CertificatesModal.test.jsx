import { fireEvent, render, screen } from '@testing-library/react';
import CertificatesModal from './CertificatesModal';

// Mock the data
jest.mock('../data/certificates', () => ({
  certificates: [
    {
      id: 1,
      title: 'React Certification',
      category: 'Frontend',
      image: 'react-cert.jpg',
      thumb: 'react-thumb.jpg',
      description: 'Mastering React',
      date: '2023-01-01',
      issuer: 'Meta',
    },
    {
      id: 2,
      title: 'Node.js Certification',
      category: 'Backend',
      image: 'node-cert.jpg',
      thumb: 'node-thumb.jpg',
      description: 'Mastering Node',
      date: '2023-02-01',
      issuer: 'OpenJS',
    },
  ],
}));

describe('CertificatesModal Component', () => {
  test('does not render when isOpen is false', () => {
    render(<CertificatesModal isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByText(/Professional Certificates/i)).not.toBeInTheDocument();
  });

  test('renders when isOpen is true', () => {
    render(<CertificatesModal isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText(/Professional Certificates/i)).toBeInTheDocument();
    expect(screen.getByText('React Certification')).toBeInTheDocument();
    expect(screen.getByText('Node.js Certification')).toBeInTheDocument();
  });

  test('filters certificates based on search', () => {
    render(<CertificatesModal isOpen={true} onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText(/Search certificates/i);

    fireEvent.change(searchInput, { target: { value: 'React' } });

    expect(screen.getByText('React Certification')).toBeInTheDocument();
    expect(screen.queryByText('Node.js Certification')).not.toBeInTheDocument();
  });

  test('shows no results message when search yields no matches', () => {
    render(<CertificatesModal isOpen={true} onClose={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText(/Search certificates/i);

    fireEvent.change(searchInput, { target: { value: 'NonExistent' } });

    expect(screen.getByText(/No certificates found matching "NonExistent"/i)).toBeInTheDocument();
  });

  test('opens detail view on click', () => {
    render(<CertificatesModal isOpen={true} onClose={jest.fn()} />);

    fireEvent.click(screen.getByText('React Certification'));

    expect(screen.getByLabelText(/Back to grid/i)).toBeInTheDocument();
    // In detail view, the title is displayed as h3
    expect(
      screen.getByRole('heading', { name: 'React Certification', level: 3 })
    ).toBeInTheDocument();
  });

  test('closes detail view', () => {
    render(<CertificatesModal isOpen={true} onClose={jest.fn()} />);

    fireEvent.click(screen.getByText('React Certification'));
    fireEvent.click(screen.getByRole('button', { name: /back to grid/i }));

    expect(screen.getByText('React Certification')).toBeInTheDocument();
    expect(screen.getByText('Node.js Certification')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<CertificatesModal isOpen={true} onClose={handleClose} />);

    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('navigates to next certificate on swipe left', () => {
    render(<CertificatesModal isOpen={true} onClose={jest.fn()} />);

    // Open detail view
    fireEvent.click(screen.getByText('React Certification'));

    const certTitle = screen.getByRole('heading', { name: 'React Certification', level: 3 });
    // The viewer is the container
    const viewerElement = certTitle.closest('.cert-viewer');

    fireEvent.touchStart(viewerElement, { targetTouches: [{ clientX: 300 }] });
    fireEvent.touchMove(viewerElement, { targetTouches: [{ clientX: 200 }] }); // Moved left by 100px
    fireEvent.touchEnd(viewerElement);

    // Should have navigated to next cert (Node.js)
    expect(
      screen.getByRole('heading', { name: 'Node.js Certification', level: 3 })
    ).toBeInTheDocument();
  });

  test('navigates to previous certificate on swipe right', () => {
    render(<CertificatesModal isOpen={true} onClose={jest.fn()} />);

    // Open detail view (React)
    fireEvent.click(screen.getByText('React Certification'));

    // Navigate to Node (2nd one)
    fireEvent.click(screen.getByLabelText('Next certificate'));
    expect(
      screen.getByRole('heading', { name: 'Node.js Certification', level: 3 })
    ).toBeInTheDocument();

    const certTitle = screen.getByRole('heading', { name: 'Node.js Certification', level: 3 });
    const viewerElement = certTitle.closest('.cert-viewer');

    fireEvent.touchStart(viewerElement, { targetTouches: [{ clientX: 200 }] });
    fireEvent.touchMove(viewerElement, { targetTouches: [{ clientX: 300 }] }); // Moved right by 100px
    fireEvent.touchEnd(viewerElement);

    // Should have navigated back to React
    expect(
      screen.getByRole('heading', { name: 'React Certification', level: 3 })
    ).toBeInTheDocument();
  });

  test('handles keyboard navigation - Escape to close', () => {
    const handleClose = jest.fn();
    render(<CertificatesModal isOpen={true} onClose={handleClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('handles keyboard navigation - Arrow keys', () => {
    render(<CertificatesModal isOpen={true} onClose={jest.fn()} />);

    // Open detail view
    fireEvent.click(screen.getByText('React Certification'));

    // Arrow right to next
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(
      screen.getByRole('heading', { name: 'Node.js Certification', level: 3 })
    ).toBeInTheDocument();

    // Arrow left to previous
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(
      screen.getByRole('heading', { name: 'React Certification', level: 3 })
    ).toBeInTheDocument();
  });

  test('handles keyboard navigation - Backspace to go back to grid', () => {
    render(<CertificatesModal isOpen={true} onClose={jest.fn()} />);

    // Open detail view
    fireEvent.click(screen.getByText('React Certification'));
    expect(screen.getByLabelText(/Back to grid/i)).toBeInTheDocument();

    // Press Backspace to go back
    fireEvent.keyDown(document, { key: 'Backspace' });

    // Should be back in grid view
    expect(screen.getByText('React Certification')).toBeInTheDocument();
    expect(screen.getByText('Node.js Certification')).toBeInTheDocument();
  });
});
