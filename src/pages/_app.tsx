import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { Theme } from '../common/context/Theme';
import '../styles/global.css';
import { ErrorBoundary, Spinner } from '../components';
import { useLoadingState, useStoreInitialization } from '../common/hooks';

function MyApp({ Component, pageProps }: AppProps) {
  const loading = useLoadingState();
  const store = useStoreInitialization(pageProps.initialReduxState);

  return (
    <Theme>
      <ErrorBoundary
        fallback={<h3>Something went wrong. Please try again.</h3>}
      >
        <Provider store={store}>
          {loading && <Spinner />}
          <Component {...pageProps} />
        </Provider>
      </ErrorBoundary>
    </Theme>
  );
}

export default MyApp;
