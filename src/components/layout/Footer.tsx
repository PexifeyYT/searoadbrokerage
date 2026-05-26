import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Truck, Phone, Mail, MapPin, Shield } from 'lucide-react';
import NewsletterSignup from '@/components/features/NewsletterSignup';

interface FooterProps {
  locale: string;
}

export default async function Footer({ locale }: FooterProps) {
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');
  const navLink = (href: string) => `/${locale}${href}`;

  return (
    <footer className="bg-[#040A18] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href={navLink('/')} className="inline-flex items-center gap-3 mb-5 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-2.5 shadow-lg shadow-blue-500/20">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-black text-white text-sm leading-tight">Sea Road Brokerage</p>
                <p className="text-xs text-blue-400 font-semibold tracking-widest uppercase">INC</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {t('company')}
            </p>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-fit">
                <Shield className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                <span className="text-xs text-gray-300">USDOT <span className="text-blue-400 font-bold">#4398936</span></span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-fit">
                <Shield className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-gray-300">MC <span className="text-emerald-400 font-bold">MC-1726540</span></span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-5">{t('services')}</h3>
            <ul className="space-y-3">
              {[
                { label: 'Full Truckload (FTL)', href: '/services/full-truckload' },
                { label: 'Less Than Truckload', href: '/services/less-than-truckload' },
                { label: 'Intermodal', href: '/services/intermodal' },
                { label: 'Flatbed', href: '/services/flatbed' },
                { label: 'Specialized Freight', href: '/services/specialized' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={navLink(item.href)}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="h-px w-3 bg-gray-600 group-hover:bg-blue-400 group-hover:w-4 transition-all duration-200" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-5">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              {[
                { label: tNav('getQuote'), href: '/quote' },
                { label: tNav('loadBoard'), href: '/load-board' },
                { label: tNav('carriers'), href: '/carriers' },
                { label: tNav('about'), href: '/about' },
                { label: tNav('contact'), href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={navLink(item.href)}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="h-px w-3 bg-gray-600 group-hover:bg-blue-400 group-hover:w-4 transition-all duration-200" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-5">{t('contact')}</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="mt-0.5 bg-blue-500/15 rounded-lg p-1.5 flex-shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <span className="text-sm text-gray-400 leading-relaxed">
                  22492 Road 19 Site# J<br />Chowchilla, California
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="bg-blue-500/15 rounded-lg p-1.5 flex-shrink-0">
                  <Phone className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <a href="tel:+12099200003" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 whitespace-nowrap">
                  (209) 920-0003
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <div className="bg-blue-500/15 rounded-lg p-1.5 flex-shrink-0">
                  <Mail className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <a
                  href="mailto:searoadbrokerageinc@gmail.com"
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 break-all"
                >
                  searoadbrokerageinc@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/8 pt-10 pb-8">
          <NewsletterSignup />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} {t('copyright')}</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">Terms of Service</Link>
            <p className="text-xs text-gray-600">{t('licensed')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
