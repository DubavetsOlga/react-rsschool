import { Component, ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';
import s from './style.module.css';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('Caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('Logging error:', error, info.componentStack);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      return (
        <>
          {fallback || (
            <div className={s.container}>
              <h1>Something went wrong.</h1>
              <p>{error?.message}</p>
            </div>
          )}
          <ErrorFallback resetError={this.resetError} />
        </>
      );
    }

    return children;
  }
}
