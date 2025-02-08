import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/button/Button';
import '@testing-library/jest-dom';

describe('Button component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies custom attributes correctly', () => {
    render(<Button aria-label="submit">Submit</Button>);
    expect(screen.getByLabelText('submit')).toBeInTheDocument();
  });

  it('fires a click event when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
