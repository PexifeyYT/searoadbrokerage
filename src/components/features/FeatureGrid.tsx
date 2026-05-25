import { Globe, Clock, DollarSign, Activity, Shield, Zap } from 'lucide-react';
import Card from '../ui/Card';

const features = [
  {
    icon: Globe,
    title: 'Nationwide Coverage',
    description: 'Comprehensive freight solutions covering all 48 contiguous states plus cross-border Canada and Mexico routes.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer service and dispatch support. We\'re always here when you need us.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Rates',
    description: 'Access our network of 500+ carriers to find the best rates without compromising on reliability.',
  },
  {
    icon: Activity,
    title: 'Real-time Tracking',
    description: 'Live shipment tracking with proactive updates. Know where your freight is at all times.',
  },
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description: 'Fully licensed FMCSA freight broker with proper bonding and insurance. Your freight is protected.',
  },
  {
    icon: Zap,
    title: 'Quick Payment',
    description: 'Fast carrier payments with flexible options including QuickPay. Keep your cash flow moving.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Sea Road Brokerage?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We combine industry expertise with modern technology to deliver freight solutions that work for your business.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} hover className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
