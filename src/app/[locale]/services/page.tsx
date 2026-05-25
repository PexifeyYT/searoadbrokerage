import { Truck, Package, Container, Layout, Thermometer, Wrench } from 'lucide-react';
import ServiceCard from '@/components/features/ServiceCard';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const services = [
  {
    icon: Truck,
    title: 'Full Truckload (FTL)',
    description: 'Dedicated truckload solutions for shipments that fill an entire trailer. Faster transit, exclusive use, and direct delivery.',
    href: '/services/full-truckload',
  },
  {
    icon: Package,
    title: 'Less Than Truckload (LTL)',
    description: 'Share trailer space with other shippers and pay only for what you use. Perfect for smaller freight that doesn\'t need a full truck.',
    href: '/services/less-than-truckload',
  },
  {
    icon: Container,
    title: 'Intermodal',
    description: 'Combine rail efficiency with truck flexibility for cost-effective long-haul shipping. Ideal for coast-to-coast moves.',
    href: '/services/intermodal',
  },
  {
    icon: Layout,
    title: 'Flatbed',
    description: 'Open deck solutions for oversized, heavy, or irregularly shaped freight including construction materials and machinery.',
    href: '/services/specialized',
  },
  {
    icon: Thermometer,
    title: 'Temperature Controlled',
    description: 'Refrigerated transport for perishables, pharmaceuticals, and temperature-sensitive cargo with precise monitoring.',
    href: '/services/specialized',
  },
  {
    icon: Wrench,
    title: 'Specialized Freight',
    description: 'Hazardous materials, oversized loads, cross-border shipments, and other specialized freight handled by certified professionals.',
    href: '/services/specialized',
  },
];

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 dark:from-blue-900 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Comprehensive freight solutions for every shipping need, backed by our experienced team and carrier network.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
    </div>
  );
}
