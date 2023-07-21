import Head from 'next/head';
import { ReactNode } from 'react';

export type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>SSD Calendar</title>
        <meta name="description" content="Assessment test SSD" />
        <meta
          name={'viewport'}
          content={
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
          }
        />
      </Head>
      <main>{children}</main>
    </>
  );
}
