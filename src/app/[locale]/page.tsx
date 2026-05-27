import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Truck, Package, Container, Layout, Thermometer, Wrench, ArrowRight, Phone, Mail } from 'lucide-react';
import Hero from '@/components/features/Hero';
import FeatureGrid from '@/components/features/FeatureGrid';
import StatsCounter from '@/components/features/StatsCounter';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const services = [
  { icon: Truck, title: 'Full Truckload (FTL)', description: 'Dedicated truckload for full trailer capacity. Faster transit, exclusive use.', href: '/services/full-truckload' },
  { icon: Package, title: 'Less Than Truckload (LTL)', description: 'Cost-effective for smaller loads. Share space, pay only for what you use.', href: '/services/less-than-truckload' },
  { icon: Container, title: 'Intermodal', description: 'Combine rail and truck for long-haul efficiency. Coast-to-coast savings.', href: '/services/intermodal' },
  { icon: Layout, title: 'Flatbed', description: 'Open flatbed for oversized, heavy, or irregularly shaped freight.', href: '/services/flatbed' },
  { icon: Thermometer, title: 'Temperature Controlled', description: 'Refrigerated and temperature-sensitive freight handled with care.', href: '/services/temperature-controlled' },
  { icon: Wrench, title: 'Specialized Freight', description: 'Hazmat, oversized loads, and cross-border by experienced specialists.', href: '/services/specialized' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sea Road Brokerage INC',
  url: 'https://searoadbrokerageinc.vercel.app',
  telephone: '209-920-0003',
  email: 'searoadbrokerageinc@gmail.com',
  address: { '@type': 'PostalAddress', addressCountry: 'US' },
  areaServed: ['US', 'CA', 'MX'],
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero locale={locale} />

      <FeatureGrid />

      {/* Services */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('servicesTitle')}</h2>
            <p className="text-gray-500">{t('servicesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.title}
                  href={`/${locale}${svc.href}`}
                  className="group flex flex-col p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all bg-white"
                >
                  <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{svc.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{svc.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-8">
            <Link href={`/${locale}/services`} className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('statsTitle')}</h2>
            <p className="text-gray-500">{t('statsSubtitle')}</p>
          </div>
          <StatsCounter light />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">{t('ctaTitle')}</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">{t('ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href={`/${locale}/quote`}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-600 font-bold px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              {t('ctaButton1')} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              {t('ctaButton2')}
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-blue-100">
            <a href="tel:+12099200003" className="inline-flex items-center justify-center gap-2 hover:text-white transition-colors">
              <Phone className="h-4 w-4" /> (209) 920-0003
            </a>
            <a href="mailto:searoadbrokerageinc@gmail.com" className="inline-flex items-center justify-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4" /> searoadbrokerageinc@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
