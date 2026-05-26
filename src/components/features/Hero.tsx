import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Button from '../ui/Button';
import { ArrowRight, Shield } from 'lucide-react';

interface HeroProps {
  locale: string;
}

export default async function Hero({ locale }: HeroProps) {
  const t = await getTranslations('hero');

  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 dark:from-blue-900 dark:via-blue-800 dark:to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-300/30 rounded-full px-4 py-1.5 text-sm mb-6">
            <Shield className="h-4 w-4" />
            {t('badge')}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            {t('headline')}
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed">
            {t('subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/quote`}>
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 border-transparent w-full sm:w-auto">
                {t('cta1')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/carriers`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                {t('cta2')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
