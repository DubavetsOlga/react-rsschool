import type { Metadata } from 'next';
import './global.css';
import { ReactNode } from 'react';
import PageLayout from './PageLayout';
import { AppProps } from 'next/app';

export const metadata: Metadata = {
  title: 'Planets',
  icons: '/planet.svg',
};

export default async function LocaleLayout({
  children,
  pageProps,
}: {
  children: ReactNode;
  pageProps: AppProps['pageProps'];
}) {
  return (
    <html lang="en">
      <body>
        <PageLayout pageProps={pageProps}>{children}</PageLayout>
      </body>
    </html>
  );
}
