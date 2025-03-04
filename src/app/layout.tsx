import './global.css';
import { ReactNode } from 'react';
import PageLayout from '../components/pageLayout/PageLayout';
import { AppProps } from 'next/app';

export default function LocaleLayout({
  children,
  pageProps,
}: {
  children: ReactNode;
  pageProps: AppProps['pageProps'];
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Planets</title>
        <link rel="icon" href="/planet.svg" />
      </head>
      <body>
        <PageLayout pageProps={pageProps}>{children}</PageLayout>
      </body>
    </html>
  );
}
