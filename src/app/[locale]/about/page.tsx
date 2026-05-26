import type { Metadata } from 'next';
import { Shield, Award, MapPin, Users, Truck, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Sea Road Brokerage INC — a licensed FMCSA freight broker (USDOT #4398936) serving shippers and carriers across North America with integrity.',
};
import Card from '@/components/ui/Card';
import StatsCounter from '@/components/features/StatsCounter';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const serviceAreas = [
  'California', 'Texas', 'Florida', 'New York', 'Illinois',
  'Pennsylvania', 'Ohio', 'Georgia', 'Michigan', 'North Carolina',
  'Arizona', 'Washington', 'Colorado', 'Nevada', 'Oregon',
  'Canada (BC, ON)', 'Mexico (Cross-border)',
];

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 dark:from-blue-900 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">About Sea Road Brokerage INC</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              A trusted freight brokerage serving shippers and carriers across North America with integrity, efficiency, and dedication.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                At Sea Road Brokerage INC, our mission is to connect shippers with reliable carriers while providing exceptional service, competitive rates, and complete transparency throughout the shipping process.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Founded in Chowchilla, California, we have built a network of over 500 vetted carriers and serve thousands of shippers across all 48 contiguous states plus Canada and Mexico.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We believe every shipment matters. Whether you are moving 100 pounds or 100,000 pounds, we treat your freight with the same level of care and professionalism.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: 'Fully Licensed', desc: 'FMCSA registered freight broker with proper bonding' },
                { icon: Award, title: 'Experienced Team', desc: 'Industry veterans with deep freight knowledge' },
                { icon: Users, title: 'Carrier Network', desc: '500+ pre-vetted, insured carrier partners' },
                { icon: Globe, title: 'Wide Coverage', desc: 'All 48 states, Canada and Mexico routes' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="text-center">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">
            Our Track Record
          </h2>
          <StatsCounter />
        </div>
      </section>

      {/* License Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Verified Credentials
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sea Road Brokerage INC is fully licensed and registered with the Federal Motor Carrier Safety Administration (FMCSA).
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { label: 'USDOT Number', value: '#4398936' },
              { label: 'MC Number', value: 'MC-1726540' },
              { label: 'State', value: 'California' },
            ].map((item) => (
              <Card key={item.label} className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{item.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Service Areas
          </h2>
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="px-3 py-1.5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                <MapPin className="h-3 w-3 inline mr-1 text-blue-500" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-xl mx-auto text-center px-4">
          <Truck className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Work Together?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Get a free freight quote or reach out to our team to discuss your shipping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/quote`}>
              <Button size="lg">Get a Quote</Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button size="lg" variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
