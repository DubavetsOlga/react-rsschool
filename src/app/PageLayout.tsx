'use client';

import { Theme } from '../common/context/Theme';
import { ErrorBoundary, Spinner } from '../components';
import { Provider } from 'react-redux';
import { useStoreInitialization } from '../common/hooks';
import { ReactNode, Suspense } from 'react';
import { AppProps } from 'next/app';

export default function PageLayout({
  children,
  pageProps,
}: {
  children: ReactNode;
  pageProps: AppProps['pageProps'];
}) {
  const store = useStoreInitialization(pageProps?.initialReduxState);

  return (
    <Theme>
      <ErrorBoundary
        fallback={<h3>Something went wrong. Please try again.</h3>}
      >
        <Provider store={store}>
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </Provider>
      </ErrorBoundary>
    </Theme>
  );
}
