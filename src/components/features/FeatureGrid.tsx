import { getTranslations } from 'next-intl/server';
import { Globe, Clock, DollarSign, Activity, Shield, Zap } from 'lucide-react';

export default async function FeatureGrid() {
  const t = await getTranslations('features');

  const features = [
    { icon: Globe, title: t('nationwide'), description: t('nationwideDesc'), color: 'from-blue-500 to-blue-600' },
    { icon: Clock, title: t('support'), description: t('supportDesc'), color: 'from-violet-500 to-violet-600' },
    { icon: DollarSign, title: t('rates'), description: t('ratesDesc'), color: 'from-emerald-500 to-emerald-600' },
    { icon: Activity, title: t('tracking'), description: t('trackingDesc'), color: 'from-orange-500 to-orange-600' },
    { icon: Shield, title: t('licensed'), description: t('licensedDesc'), color: 'from-sky-500 to-sky-600' },
    { icon: Zap, title: t('payment'), description: t('paymentDesc'), color: 'from-pink-500 to-pink-600' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Why Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 card-hover overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Gradient accent on hover */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />

                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
