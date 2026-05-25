import Link from 'next/link';
import { Truck, Package, Container, Layout, Thermometer, Wrench } from 'lucide-react';
import Hero from '@/components/features/Hero';
import FeatureGrid from '@/components/features/FeatureGrid';
import ServiceCard from '@/components/features/ServiceCard';
import StatsCounter from '@/components/features/StatsCounter';
import Button from '@/components/ui/Button';
import { Phone, Mail } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const services = [
  {
    icon: Truck,
    title: 'Full Truckload (FTL)',
    description: 'Dedicated truckload solutions for full trailer capacity shipments. Faster transit times and exclusive use of trailer.',
    href: '/services/full-truckload',
  },
  {
    icon: Package,
    title: 'Less Than Truckload (LTL)',
    description: 'Cost-effective shipping for smaller loads. Share trailer space and pay only for what you use.',
    href: '/services/less-than-truckload',
  },
  {
    icon: Container,
    title: 'Intermodal',
    description: 'Combine rail and truck for long-haul efficiency. Reduce costs on coast-to-coast shipments.',
    href: '/services/intermodal',
  },
  {
    icon: Layout,
    title: 'Flatbed',
    description: 'Open flatbed solutions for oversized, heavy, or irregularly shaped freight.',
    href: '/services/specialized',
  },
  {
    icon: Thermometer,
    title: 'Temperature Controlled',
    description: 'Refrigerated and temperature-sensitive freight handled with precision and care.',
    href: '/services/specialized',
  },
  {
    icon: Wrench,
    title: 'Specialized Freight',
    description: 'Hazmat, oversized loads, and cross-border shipments handled by experienced specialists.',
    href: '/services/specialized',
  },
];

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <>
      <Hero locale={locale} />

      <FeatureGrid />

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive freight solutions tailored to your shipping needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <ServiceCard
                key={svc.title}
                icon={svc.icon}
                title={svc.title}
                description={svc.description}
                href={`/${locale}${svc.href}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us + Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Shippers Nationwide
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Sea Road Brokerage INC is a fully licensed and bonded freight broker committed to delivering excellence on every load.
            </p>
            <StatsCounter />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                Verified Credentials
              </p>
              <p className="text-gray-900 dark:text-white font-semibold">
                USDOT: <span className="text-blue-600 dark:text-blue-400">#4398936</span>
                <span className="mx-3 text-gray-400">|</span>
                MC: <span className="text-blue-600 dark:text-blue-400">MC-1726540</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 dark:bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ship?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Get a free quote in minutes. Our team is standing by to find the best solution for your freight needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href={`/${locale}/quote`}>
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 border-transparent w-full sm:w-auto">
                Get a Free Quote
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-blue-100">
            <a href="tel:+12099200003" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="h-5 w-5" />
              (209) 920-0003
            </a>
            <a
              href="mailto:searoadbrokerageinc@gmail.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5" />
              searoadbrokerageinc@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
