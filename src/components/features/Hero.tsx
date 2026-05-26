import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, CheckCircle, Star, Zap } from 'lucide-react';

interface HeroProps {
  locale: string;
}

const trustBadges = [
  { icon: CheckCircle, text: 'FMCSA Licensed' },
  { icon: Star, text: 'USDOT #4398936' },
  { icon: Zap, text: '24/7 Dispatch' },
];

export default async function Hero({ locale }: HeroProps) {
  const t = await getTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-[#060D1F] min-h-[90vh] flex items-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[100px] animate-pulse-slow delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-500/8 blur-[80px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,179,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-4xl">

          {/* Badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300 text-sm font-medium">{t('badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            {t('headline').split('North America').map((part, i) => (
              i === 0 ? (
                <span key={i}>
                  {part}
                  <span className="text-gradient">North America</span>
                </span>
              ) : <span key={i}>{part}</span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl">
            {t('subheadline')}
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href={`/${locale}/quote`}
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              {t('cta1')}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href={`/${locale}/carriers`}
              className="group inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/14 border border-white/15 hover:border-white/25 text-white font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-300"
            >
              {t('cta2')}
              <ArrowRight className="h-5 w-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="animate-fade-in-up delay-400 flex flex-wrap gap-3">
            {trustBadges.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5"
              >
                <Icon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-300 whitespace-nowrap">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-[#060D1F] to-transparent pointer-events-none" />
    </section>
  );
}
