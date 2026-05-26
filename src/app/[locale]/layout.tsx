import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://searoadbrokerage.com';

export const metadata: Metadata = {
  title: {
    default: 'Sea Road Brokerage INC | Freight Broker',
    template: '%s | Sea Road Brokerage INC',
  },
  description:
    'Professional freight brokerage services across North America. USDOT #4398936 | MC-1726540. Get competitive shipping rates today.',
  keywords: ['freight broker', 'trucking', 'FTL', 'LTL', 'freight shipping', 'California freight', 'FMCSA', 'logistics'],
  authors: [{ name: 'Sea Road Brokerage INC' }],
  creator: 'Sea Road Brokerage INC',
  openGraph: {
    type: 'website',
    siteName: 'Sea Road Brokerage INC',
    title: 'Sea Road Brokerage INC | Freight Broker',
    description: 'Professional freight brokerage services across North America. USDOT #4398936 | MC-1726540.',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sea Road Brokerage INC | Freight Broker',
    description: 'Professional freight brokerage services across North America. USDOT #4398936 | MC-1726540.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
