import type { Metadata } from 'next';
import { CheckCircle, DollarSign, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Become a Carrier Partner',
  description: 'Join Sea Road Brokerage INC\'s carrier network. Competitive rates, fast payment, consistent freight volume. Apply online today.',
};
import CarrierApplicationForm from '@/components/forms/CarrierApplicationForm';
import Card from '@/components/ui/Card';

const benefits = [
  { icon: DollarSign, title: 'Competitive Pay', desc: 'We offer market-rate and above-market loads with quick pay options available.' },
  { icon: Clock, title: 'Fast Payment', desc: 'Net-30 standard terms or QuickPay for faster cash flow. Direct deposit available.' },
  { icon: Shield, title: 'Reliable Freight', desc: 'Consistent freight volume with reputable shippers. No games, no rate cuts after booking.' },
  { icon: CheckCircle, title: '24/7 Support', desc: 'Our dispatch team is available around the clock to handle any issues on the road.' },
];

const requirements = [
  'Valid USDOT and MC numbers',
  'Minimum $1,000,000 auto liability insurance',
  'Minimum $100,000 cargo insurance',
  'Signed carrier agreement on file',
  'W9 or signed rate confirmation',
  'Compliance with FMCSA regulations',
];

export default function CarriersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 dark:from-blue-900 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Become a Carrier Partner</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Join our growing network of trusted carriers and gain access to consistent freight, competitive rates, and a broker that pays on time, every time.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Why Carriers Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <Card key={b.title} hover className="text-center">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{b.desc}</p>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Requirements */}
            <div>
              <Card>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {requirements.map((req) => (
                    <li key={req} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-green-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="mt-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Terms</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p><span className="font-medium text-gray-900 dark:text-white">Standard:</span> Net 30 from delivery</p>
                  <p><span className="font-medium text-gray-900 dark:text-white">QuickPay:</span> 2–5 business days (small fee)</p>
                  <p><span className="font-medium text-gray-900 dark:text-white">Method:</span> ACH / Direct Deposit</p>
                </div>
              </Card>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="font-semibold text-gray-900 dark:text-white text-lg mb-6">
                  Carrier Application
                </h2>
                <CarrierApplicationForm />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
