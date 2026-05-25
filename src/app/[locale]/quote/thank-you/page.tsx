import Link from 'next/link';
import { CheckCircle, Phone, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string }>;
}

export default async function ThankYouPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const quoteRef = sp.ref || 'N/A';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/30 flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-8 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Quote Submitted Successfully!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Thank you for requesting a freight quote. Our team will review your request and respond within 2 business hours.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800 mb-8">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Your Quote Reference</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 tracking-wider">{quoteRef}</p>
          <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">Save this for your records</p>
        </div>

        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <p>A confirmation email has been sent to your inbox.</p>
          <p>For urgent inquiries, please contact us directly:</p>
          <div className="flex flex-col gap-2 items-center">
            <a href="tel:+12099200003" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
              <Phone className="h-4 w-4" /> (209) 920-0003
            </a>
            <a href="mailto:searoadbrokerageinc@gmail.com" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
              <Mail className="h-4 w-4" /> searoadbrokerageinc@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={`/${locale}`}>
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link href={`/${locale}/quote`}>
            <Button>Submit Another Quote</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
