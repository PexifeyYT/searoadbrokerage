import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, DollarSign, Globe, Leaf } from 'lucide-react';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Intermodal Freight Services',
  description: 'Intermodal shipping combines rail and truck for cost-effective long-haul freight. Sea Road Brokerage INC connects you with intermodal carriers for coast-to-coast moves.',
};
import Card from '@/components/ui/Card';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function IntermodalPage({ params }: PageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 dark:from-blue-900 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 bg-white/10 rounded-xl flex items-center justify-center">
              <Container className="h-7 w-7" />
            </div>
            <h1 className="text-4xl font-bold">Intermodal Shipping</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Combine the efficiency of rail with the flexibility of truck transport for cost-effective long-haul freight solutions.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What is Intermodal?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Intermodal shipping uses multiple modes of transportation — typically truck and rail — in a single seamless move. Your cargo travels in a container that transfers between modes without unloading the freight itself.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                For long hauls over 750 miles, intermodal typically offers 15–25% cost savings versus over-the-road trucking, with lower carbon emissions and excellent reliability.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: DollarSign, title: 'Cost Savings', desc: '15–25% savings vs OTR on long hauls over 750 miles' },
                { icon: Globe, title: 'Coast to Coast', desc: 'Ideal for transcontinental moves across North America' },
                { icon: Leaf, title: 'Eco-Friendly', desc: 'Rail produces significantly less CO2 than trucking' },
                { icon: Container, title: 'Secure Containers', desc: 'ISO containers provide excellent cargo protection' },
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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Intermodal Key Facts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Best For</p>
                <p className="font-semibold text-gray-900 dark:text-white">Moves over 750 miles</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Container Sizes</p>
                <p className="font-semibold text-gray-900 dark:text-white">20ft, 40ft, 45ft, 53ft</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Transit Time</p>
                <p className="font-semibold text-gray-900 dark:text-white">4–10 days (coast to coast)</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/quote`}>
                <Button size="lg">Get Intermodal Quote</Button>
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
