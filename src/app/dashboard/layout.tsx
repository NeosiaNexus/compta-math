import React from 'react';

import type { Metadata } from 'next';

import DTopBar from '@/components/ui/DTopBar/DTopBar';

export const metadata: Metadata = {
  title: 'CM - Dashboard',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DTopBar />
      {children}
    </>
  );
}
