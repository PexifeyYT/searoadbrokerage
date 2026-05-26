import type { Metadata } from 'next';
import Link from 'next/link';
import { Thermometer, CheckCircle, Shield, Clock, Activity } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Temperature Controlled Freight',
  description: 'Refrigerated and temperature-controlled freight shipping. Sea Road Brokerage INC connects you with reefer carriers for perishables, pharma, and sensitive cargo.',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TemperatureControlledPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-sky-600 to-sky-800 dark:from-sky-900 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 bg-white/10 rounded-xl flex items-center justify-center">
              <Thermometer className="h-7 w-7" />
            </div>
            <h1 className="text-4xl font-bold">Temperature Controlled Freight</h1>
          </div>
          <p className="text-sky-100 text-lg max-w-2xl">
            Refrigerated and temperature-sensitive freight transported with precision monitoring — from produce and meat to pharmaceuticals and chemicals.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Protecting Temperature-Sensitive Cargo</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Temperature-controlled shipping (also called reefer freight) uses refrigerated trailers to maintain precise temperature ranges throughout transit. Whether you need frozen, refrigerated, or climate-controlled conditions, we have you covered.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Sea Road Brokerage works exclusively with carriers whose reefer units are properly maintained and monitored — with temperature logs available upon delivery.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We handle food-grade freight, pharmaceutical products, floral, and any commodity with strict temperature requirements, ensuring chain-of-custody compliance.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Thermometer, title: 'Frozen', desc: '-10°F to 0°F for frozen foods, ice cream, and frozen goods' },
                { icon: Activity, title: 'Refrigerated', desc: '34°F to 38°F for fresh produce, dairy, and meat' },
                { icon: Shield, title: 'Pharmaceutical', desc: 'Strict temperature control for medications and biotech' },
                { icon: Clock, title: 'Continuous Monitoring', desc: 'Temperature logs and real-time monitoring throughout transit' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title}>
                    <Icon className="h-6 w-6 text-sky-600 dark:text-sky-400 mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-8 border border-sky-200 dark:border-sky-800 mb-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Reefer Trailer Specs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Temperature Range</p>
                <p className="font-semibold text-gray-900 dark:text-white">-20°F to +70°F</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Trailer Length</p>
                <p className="font-semibold text-gray-900 dark:text-white">48–53 ft refrigerated</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Max Payload</p>
                <p className="font-semibold text-gray-900 dark:text-white">Up to 44,000 lbs</p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Common Reefer Commodities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {['Fresh Produce', 'Meat & Poultry', 'Dairy Products', 'Seafood', 'Pharmaceuticals', 'Beverages', 'Floral & Plants', 'Chemical Compounds'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 text-sky-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/quote`}>
              <Button size="lg">Get Reefer Quote</Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button size="lg" variant="outline">Talk to an Expert</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
