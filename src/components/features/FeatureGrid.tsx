import { getTranslations } from 'next-intl/server';
import { Globe, Clock, DollarSign, Activity, Shield, Zap } from 'lucide-react';
import Card from '../ui/Card';

export default async function FeatureGrid() {
  const t = await getTranslations('features');

  const features = [
    {
      icon: Globe,
      title: t('nationwide'),
      description: t('nationwideDesc'),
    },
    {
      icon: Clock,
      title: t('support'),
      description: t('supportDesc'),
    },
    {
      icon: DollarSign,
      title: t('rates'),
      description: t('ratesDesc'),
    },
    {
      icon: Activity,
      title: t('tracking'),
      description: t('trackingDesc'),
    },
    {
      icon: Shield,
      title: t('licensed'),
      description: t('licensedDesc'),
    },
    {
      icon: Zap,
      title: t('payment'),
      description: t('paymentDesc'),
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
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
