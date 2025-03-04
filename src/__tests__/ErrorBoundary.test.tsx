import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from '../components';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../components/button/Button', () => ({
  Button: jest.fn(({ onClick, children, style }) => (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  )),
}));

const ErrorThrowingChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockNavigate,
      replace: mockNavigate,
      pathname: '/',
    });
  });

  const BuggyComponent = () => {
    throw new Error('Test error');
  };

  const GoodComponent = () => <div>Good Component</div>;

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <div>Child content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('should display the fallback UI when an error occurs', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <ErrorThrowingChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Good Component')).toBeInTheDocument();
  });

  test('renders default fallback UI when an error occurs', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('renders custom fallback UI when an error occurs', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const customFallback = <div>Custom Fallback UI</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Fallback UI')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('resets error state and navigates to main page when "Retry" button is clicked', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');

    render(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Good Component')).toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
