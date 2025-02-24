import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { makeStore } from '../api/store';
import { Theme } from '../context/Theme';
import '../global.css';
import { ErrorBoundary } from '../components';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [store] = useState(() => makeStore());

  useEffect(() => {
    if (pageProps.initialReduxState) {
      store.dispatch({ type: 'HYDRATE', payload: pageProps.initialReduxState });
    }
  }, [pageProps.initialReduxState, store]);

  return (
    <Theme>
      <ErrorBoundary
        fallback={<h3>Something went wrong. Please try again.</h3>}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ErrorBoundary>
    </Theme>
  );
}

export default MyApp;
