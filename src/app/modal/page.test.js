import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './page';

describe('Modal component', () => {
  test('does not render when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
  });

  test('calls onClose when clicking overlay', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(handleClose).toHaveBeenCalled();
  });

  test('calls onClose when clicking close button', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClose).toHaveBeenCalled();
  });
});
