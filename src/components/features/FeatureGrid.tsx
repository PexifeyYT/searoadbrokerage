import { getTranslations } from 'next-intl/server';
import { Globe, Clock, DollarSign, Activity, Shield, Zap } from 'lucide-react';

export default async function FeatureGrid() {
  const t = await getTranslations('features');

  const features = [
    { icon: Globe, title: t('nationwide'), description: t('nationwideDesc') },
    { icon: Clock, title: t('support'), description: t('supportDesc') },
    { icon: DollarSign, title: t('rates'), description: t('ratesDesc') },
    { icon: Activity, title: t('tracking'), description: t('trackingDesc') },
    { icon: Shield, title: t('licensed'), description: t('licensedDesc') },
    { icon: Zap, title: t('payment'), description: t('paymentDesc') },
  ];

  return (
    <section className="py-20 bg-gray-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{t('title')}</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
