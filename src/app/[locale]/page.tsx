import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Truck, Package, Container, Layout, Thermometer, Wrench, ArrowRight, Phone, Mail, Shield, CheckCircle } from 'lucide-react';
import Hero from '@/components/features/Hero';
import FeatureGrid from '@/components/features/FeatureGrid';
import StatsCounter from '@/components/features/StatsCounter';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const services = [
  {
    icon: Truck,
    title: 'Full Truckload (FTL)',
    description: 'Dedicated truckload solutions for full trailer capacity. Faster transit, exclusive trailer use.',
    href: '/services/full-truckload',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Package,
    title: 'Less Than Truckload (LTL)',
    description: 'Cost-effective shipping for smaller loads. Share space, pay only for what you use.',
    href: '/services/less-than-truckload',
    color: 'from-violet-500 to-violet-700',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Container,
    title: 'Intermodal',
    description: 'Combine rail and truck for long-haul efficiency. Reduce costs on coast-to-coast routes.',
    href: '/services/intermodal',
    color: 'from-emerald-500 to-emerald-700',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Layout,
    title: 'Flatbed',
    description: 'Open flatbed solutions for oversized, heavy, or irregularly shaped freight.',
    href: '/services/specialized',
    color: 'from-orange-500 to-orange-700',
    bg: 'bg-orange-500/10',
  },
  {
    icon: Thermometer,
    title: 'Temperature Controlled',
    description: 'Refrigerated and temperature-sensitive freight handled with precision and care.',
    href: '/services/specialized',
    color: 'from-sky-500 to-sky-700',
    bg: 'bg-sky-500/10',
  },
  {
    icon: Wrench,
    title: 'Specialized Freight',
    description: 'Hazmat, oversized loads, and cross-border shipments by experienced specialists.',
    href: '/services/specialized',
    color: 'from-rose-500 to-rose-700',
    bg: 'bg-rose-500/10',
  },
];

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('home');

  return (
    <>
      <Hero locale={locale} />

      <FeatureGrid />

      {/* Services Section */}
      <section className="py-24 bg-[#060D1F] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
              What We Move
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {t('servicesTitle')}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              {t('servicesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.title}
                  href={`/${locale}${svc.href}`}
                  className="group relative rounded-2xl p-6 border border-white/8 bg-white/4 hover:bg-white/8 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${svc.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className={`inline-flex items-center justify-center h-11 w-11 rounded-xl ${svc.bg} mb-4`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{svc.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:gap-2 transition-all duration-200">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors duration-200 group"
            >
              View all services
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-[#060D1F] to-[#0A1628] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />
          <div className="absolute top-0 right-0 w-[400px] h-[250px] bg-indigo-600/8 blur-[80px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
              By The Numbers
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {t('statsTitle')}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('statsSubtitle')}
            </p>
          </div>

          <StatsCounter />

          {/* Trust badge */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <Shield className="h-5 w-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-0.5">FMCSA Verified</p>
                <p className="text-white font-bold text-sm">USDOT <span className="text-blue-400">#4398936</span></p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-0.5">Licensed Broker</p>
                <p className="text-white font-bold text-sm">MC <span className="text-emerald-400">MC-1726540</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-[#0A1628]">
        {/* Mesh gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-indigo-600/15" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(99,179,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Ready to Ship?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t('ctaSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={`/${locale}/quote`}
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 text-base"
            >
              {t('ctaButton1')}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/14 border border-white/15 hover:border-white/25 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 text-base"
            >
              {t('ctaButton2')}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
            <a
              href="tel:+12099200003"
              className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">(209) 920-0003</span>
            </a>
            <a
              href="mailto:searoadbrokerageinc@gmail.com"
              className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span>searoadbrokerageinc@gmail.com</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
