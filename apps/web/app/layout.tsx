import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WhatsAppWidget } from '../components/WhatsAppWidget';
import { OrganizationJsonLd, WebsiteJsonLd } from '../components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://estateflow.io'),
  title: {
    default: 'EstateFlow — Enterprise Real Estate & Verified Property Marketplace',
    template: '%s | EstateFlow',
  },
  description:
    'Find, buy, rent, and invest in TS-RERA verified properties, new builder projects, luxury villas, and commercial spaces with EstateFlow.',
  keywords: [
    'real estate marketplace',
    'buy apartment',
    'rent villa',
    'RERA verified properties',
    'builder projects',
    'commercial space',
    'Hyderabad real estate',
    'EstateFlow',
  ],
  authors: [{ name: 'EstateFlow Marketplace', url: 'https://estateflow.io' }],
  creator: 'EstateFlow Technologies',
  publisher: 'EstateFlow Marketplace Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'EstateFlow — Enterprise Real Estate Marketplace',
    description:
      'Explore verified luxury villas, apartments, new builder projects, and commercial spaces with EstateFlow.',
    url: 'https://estateflow.io',
    siteName: 'EstateFlow Marketplace',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'EstateFlow Enterprise Real Estate Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EstateFlow — Verified Real Estate & Property Marketplace',
    description:
      'Buy, rent, and invest in TS-RERA verified properties and builder projects with EstateFlow.',
    creator: '@estateflow',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#059669',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 font-sans antialiased" suppressHydrationWarning>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <Navbar />
        <main className="flex-1" id="main-content" suppressHydrationWarning>
          {children}
        </main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
