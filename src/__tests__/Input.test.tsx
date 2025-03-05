import { render, screen } from '@testing-library/react';
import { Input } from '../common/components';
import '@testing-library/jest-dom';

describe('Input component', () => {
  it('renders an input element with provided attributes', () => {
    render(<Input placeholder="Enter text" />);

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  it('applies className and other attributes correctly', () => {
    render(<Input className="custom-class" aria-label="custom-input" />);

    const inputElement = screen.getByLabelText('custom-input');
    expect(inputElement).toHaveClass('custom-class');
  });
});
