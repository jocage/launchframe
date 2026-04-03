import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Launchframe — Ship your SaaS in minutes, not months',
    template: '%s | Launchframe',
  },
  description:
    'Opinionated Next.js 16 SaaS starter with auth, billing, email, database, and AI-first developer experience. One command to scaffold.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
