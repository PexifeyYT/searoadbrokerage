import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  locale: string;
}

export default async function Hero({ locale }: HeroProps) {
  const t = await getTranslations('hero');

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-blue-700 text-sm font-medium">{t('badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {t('headline').split('North America').map((part, i) =>
              i === 0 ? (
                <span key={i}>
                  {part}
                  <span className="text-blue-600">North America</span>
                </span>
              ) : <span key={i}>{part}</span>
            )}
          </h1>

          <p className="text-lg text-gray-500 mb-10 max-w-xl leading-relaxed">
            {t('subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link
              href={`/${locale}/quote`}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors text-base"
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/carriers`}
              className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold px-7 py-3.5 rounded-lg transition-colors text-base"
            >
              Become a Carrier
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            {['FMCSA Licensed', 'USDOT #4398936', 'MC-1726540', '24/7 Dispatch'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
