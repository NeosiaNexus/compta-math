import React from 'react';

import type { Metadata } from 'next';

import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

import './globals.scss';

export const metadata: Metadata = {
  title: 'Compta-Math',
  description: 'Compatabilité de math',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Toaster richColors theme={'dark'} />
        <NextTopLoader color={'#fff'} showSpinner={false} zIndex={10000000} />
      </body>
    </html>
  );
}
