import type { Metadata } from 'next';
import Link from 'next/link';
import { Wrench, AlertTriangle, Layout, Globe } from 'lucide-react';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Specialized Freight Services',
  description: 'Hazmat, oversized loads, cross-border shipping, and other specialized freight. Sea Road Brokerage INC handles complex freight with certified specialists.',
};
import Card from '@/components/ui/Card';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const specialties = [
  {
    icon: AlertTriangle,
    title: 'Hazardous Materials (Hazmat)',
    description: 'FMCSA-compliant transport of hazardous materials including chemicals, flammables, and regulated substances with fully certified carriers.',
  },
  {
    icon: Layout,
    title: 'Oversized / Heavy Haul',
    description: 'Permits, pilot cars, and specialized equipment for loads exceeding standard legal dimensions and weight limits.',
  },
  {
    icon: Globe,
    title: 'Cross-Border Shipping',
    description: 'Seamless freight movement between the US, Canada, and Mexico with customs coordination and border crossing expertise.',
  },
  {
    icon: Wrench,
    title: 'Flatbed & Open Deck',
    description: 'Standard flatbed, step deck, RGN, and lowboy equipment for construction materials, machinery, and oversized cargo.',
  },
];

export default async function SpecializedPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 dark:from-blue-900 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 bg-white/10 rounded-xl flex items-center justify-center">
              <Wrench className="h-7 w-7" />
            </div>
            <h1 className="text-4xl font-bold">Specialized Freight</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            From hazmat to oversized loads, flatbeds to cross-border shipments — we handle the freight that requires expertise.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {specialties.map((svc) => {
              const Icon = svc.icon;
              return (
                <Card key={svc.title} hover className="flex gap-4">
                  <div className="h-12 w-12 flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{svc.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{svc.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need a Specialized Solution?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              Our team specializes in complex freight challenges. Contact us to discuss your specific requirements and we will find the right solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/quote`}>
                <Button size="lg">Request a Quote</Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button size="lg" variant="outline">Speak to a Specialist</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
