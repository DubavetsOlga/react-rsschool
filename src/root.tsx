import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { ReactNode } from 'react';
import { ErrorBoundary, Header } from './components';
import { Provider } from 'react-redux';
import { store } from './api/store';
import { Theme } from './components/context/Theme';
import './index.css';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/planet.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Planets</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <Theme>
      <ErrorBoundary
        fallback={<h3>Something went wrong. Please try again.</h3>}
      >
        <Provider store={store}>
          <Header />
          <Outlet />
        </Provider>
      </ErrorBoundary>
    </Theme>
  );
}
