import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from '../components';
import { BrowserRouter, useNavigate } from 'react-router';
import { Path } from '../app/Routing';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
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
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const BuggyComponent = () => {
    throw new Error('Test error');
  };

  const GoodComponent = () => <div>Good Component</div>;

  it('should render children when no error occurs', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <div>Child content</div>
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('should display the fallback UI when an error occurs', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <BrowserRouter>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <ErrorThrowingChild />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  test('renders children when no error occurs', () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <GoodComponent />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(screen.getByText('Good Component')).toBeInTheDocument();
  });

  test('renders default fallback UI when an error occurs', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <BrowserRouter>
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
      </BrowserRouter>
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
      <BrowserRouter>
        <ErrorBoundary fallback={customFallback}>
          <BuggyComponent />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(screen.getByText('Custom Fallback UI')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('resets error state and navigates to main page when "Retry" button is clicked', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <BrowserRouter>
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
      </BrowserRouter>
    );

    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);

    expect(mockNavigate).toHaveBeenCalledWith(Path.Main);

    render(
      <BrowserRouter>
        <ErrorBoundary>
          <GoodComponent />
        </ErrorBoundary>
      </BrowserRouter>
    );

    expect(screen.getByText('Good Component')).toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
