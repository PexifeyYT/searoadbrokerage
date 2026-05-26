import type { Metadata } from 'next';
import Link from 'next/link';
import { Layout, CheckCircle, Shield, Package, Wrench } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Flatbed Freight Services',
  description: 'Flatbed trucking for oversized, heavy, and irregularly shaped freight. Sea Road Brokerage INC connects you with certified flatbed carriers nationwide.',
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function FlatbedPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-orange-600 to-orange-800 dark:from-orange-900 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 bg-white/10 rounded-xl flex items-center justify-center">
              <Layout className="h-7 w-7" />
            </div>
            <h1 className="text-4xl font-bold">Flatbed Freight</h1>
          </div>
          <p className="text-orange-100 text-lg max-w-2xl">
            Open-deck shipping for oversized, heavy, and irregularly shaped cargo that doesn&apos;t fit in a standard enclosed trailer.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">When You Need Flatbed</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Flatbed trailers are the solution for freight that&apos;s too wide, too tall, or too heavy for a standard dry van — or freight that must be loaded from the side or top.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Common flatbed commodities include construction materials (steel beams, lumber, pipe), heavy machinery, agricultural equipment, vehicles, and prefabricated building components.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Sea Road Brokerage works with certified flatbed carriers experienced in proper tarping, strapping, and securement — keeping your freight compliant and protected in transit.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Layout, title: 'Standard Flatbed', desc: 'Up to 48 ft, ideal for most oversized loads under 8.5 ft wide' },
                { icon: Package, title: 'Step Deck', desc: 'Lower deck for taller cargo up to 10 ft high' },
                { icon: Wrench, title: 'RGN / Lowboy', desc: 'For heavy equipment and extremely tall or heavy loads' },
                { icon: Shield, title: 'Proper Securement', desc: 'Certified drivers trained in FMCSA securement regulations' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title}>
                    <Icon className="h-6 w-6 text-orange-600 dark:text-orange-400 mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-8 border border-orange-200 dark:border-orange-800 mb-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Flatbed Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Standard Flatbed</p>
                <p className="font-semibold text-gray-900 dark:text-white">48–53 ft · 8.5 ft wide · 8.5 ft tall</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Max Weight</p>
                <p className="font-semibold text-gray-900 dark:text-white">Up to 48,000 lbs</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Loading Methods</p>
                <p className="font-semibold text-gray-900 dark:text-white">Side, rear, or crane loading</p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Common Flatbed Freight</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {['Steel & Metal', 'Lumber & Wood', 'Construction Equipment', 'Pipe & Tubing', 'Agricultural Machinery', 'Wind Turbine Parts', 'Prefab Buildings', 'Vehicles & Boats'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/quote`}>
              <Button size="lg">Get Flatbed Quote</Button>
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
