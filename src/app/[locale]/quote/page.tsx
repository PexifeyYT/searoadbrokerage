import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import QuoteForm from '@/components/forms/QuoteForm';

export const metadata: Metadata = {
  title: 'Request a Freight Quote',
  description: 'Get a free freight quote from Sea Road Brokerage INC. FTL, LTL, intermodal, flatbed, and specialized freight. Response within 2 business hours.',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function QuotePage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/30 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <FileText className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Request a Quote
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill out the form below and our team will respond within 2 business hours with a competitive rate.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-6 sm:p-8">
          <QuoteForm locale={locale} />
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Need immediate assistance? Call us at{' '}
          <a href="tel:+12099200003" className="text-blue-600 dark:text-blue-400 font-medium">
            (209) 920-0003
          </a>
        </p>
      </div>
    </div>
  );
}
