import Link from 'next/link';
import { Truck, CheckCircle, Clock, Shield, DollarSign } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function FTLPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 dark:from-blue-900 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 bg-white/10 rounded-xl flex items-center justify-center">
              <Truck className="h-7 w-7" />
            </div>
            <h1 className="text-4xl font-bold">Full Truckload (FTL)</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Dedicated truckload shipping with exclusive use of the entire trailer. Faster transit times and direct delivery for large shipments.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What is FTL Freight?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Full Truckload (FTL) shipping means your cargo takes up an entire trailer — or enough of it that it makes sense to book the whole truck. Your freight moves directly from origin to destination without stops or transfers.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                FTL is ideal for shipments over 15,000 lbs, time-sensitive deliveries, or cargo that requires extra security and minimal handling.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Sea Road Brokerage connects you with vetted carriers operating 53-foot dry vans, flatbeds, refrigerated trailers, and specialty equipment across all 48 states.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Clock, title: 'Faster Transit', desc: 'Direct point-to-point delivery with no intermediate stops' },
                { icon: Shield, title: 'Less Handling', desc: 'Your cargo stays on one truck, reducing damage risk' },
                { icon: DollarSign, title: 'Cost Effective', desc: 'Best price-per-pound for large shipments over 15,000 lbs' },
                { icon: CheckCircle, title: 'Flexible Scheduling', desc: 'Pickup and delivery windows that work for your timeline' },
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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">FTL Key Facts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Typical Weight</p>
                <p className="font-semibold text-gray-900 dark:text-white">15,000–45,000 lbs</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Trailer Length</p>
                <p className="font-semibold text-gray-900 dark:text-white">48–53 feet</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Transit Time</p>
                <p className="font-semibold text-gray-900 dark:text-white">1–5 days (varies by distance)</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/quote`}>
                <Button size="lg">Get FTL Quote</Button>
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
