import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, DollarSign, MapPin, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Less Than Truckload (LTL) Freight',
  description: 'LTL freight shipping — share trailer space and pay only for what you use. Sea Road Brokerage INC finds you the best LTL rates across North America.',
};
import Card from '@/components/ui/Card';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LTLPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 dark:from-blue-900 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 bg-white/10 rounded-xl flex items-center justify-center">
              <Package className="h-7 w-7" />
            </div>
            <h1 className="text-4xl font-bold">Less Than Truckload (LTL)</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Share trailer space with other shippers and pay only for the space your freight uses. Cost-effective shipping for smaller loads.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What is LTL Freight?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Less Than Truckload (LTL) shipping consolidates multiple smaller shipments from different shippers into a single truck. You pay only for the space your freight occupies, making it highly cost-effective for smaller loads.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                LTL is perfect for shipments between 150 and 15,000 lbs. Your freight may make a few stops along the way at carrier terminals, but you get competitive pricing without needing a full truck.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: DollarSign, title: 'Lower Cost', desc: 'Pay only for the space you use — no wasted capacity costs' },
                { icon: MapPin, title: 'Wide Network', desc: 'Extensive LTL carrier network covering all major markets' },
                { icon: Clock, title: 'Regular Service', desc: 'Scheduled pickup and delivery windows with tracking' },
                { icon: Package, title: 'Flexible Sizing', desc: 'From pallet loads to partial truckloads, we handle it' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title}>
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">LTL Key Facts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Typical Weight</p>
                <p className="font-semibold text-gray-900 dark:text-white">150–15,000 lbs</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pricing Basis</p>
                <p className="font-semibold text-gray-900 dark:text-white">Freight class + weight + distance</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Transit Time</p>
                <p className="font-semibold text-gray-900 dark:text-white">2–7 days (varies by distance)</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/quote`}>
                <Button size="lg">Get LTL Quote</Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button size="lg" variant="outline">Talk to an Expert</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
