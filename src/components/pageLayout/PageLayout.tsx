'use client';

import { Theme } from '../../common/context/Theme.tsx';
import { ErrorBoundary } from '../index.ts';
import { Provider } from 'react-redux';
import { useStoreInitialization } from '../../common/hooks';
import { ReactNode } from 'react';
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
        <Provider store={store}>{children}</Provider>
      </ErrorBoundary>
    </Theme>
  );
}
