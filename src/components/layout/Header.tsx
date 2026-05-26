'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Truck, Menu, X, ChevronDown, Phone, ArrowRight, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');

  const navLink = (href: string) => `/${locale}${href}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const serviceItems = [
    { label: 'Full Truckload (FTL)', href: '/services/full-truckload' },
    { label: 'Less Than Truckload (LTL)', href: '/services/less-than-truckload' },
    { label: 'Intermodal', href: '/services/intermodal' },
    { label: 'Flatbed', href: '/services/specialized' },
    { label: 'Temperature Controlled', href: '/services/specialized' },
    { label: 'Specialized Freight', href: '/services/specialized' },
  ];

  const navLinks = [
    { label: t('carriers'), href: '/carriers' },
    { label: t('loadBoard'), href: '/load-board' },
    { label: t('about'), href: '/about' },
    { label: t('contact'), href: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Top info bar — desktop only */}
      <div className="hidden md:block bg-gray-950 text-gray-300 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gray-500">USDOT #4398936</span>
            <span className="text-gray-700">|</span>
            <span className="text-gray-500">MC-1726540</span>
            <span className="text-gray-700">|</span>
            <span className="text-blue-400 font-medium">Licensed & Bonded | FMCSA Registered</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+12099200003"
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors whitespace-nowrap"
            >
              <Phone className="h-3 w-3 text-blue-400" />
              (209) 920-0003
            </a>
            <span className="text-gray-700">|</span>
            <Link
              href="/login"
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-xs font-medium"
            >
              <Lock className="h-3 w-3" />
              Admin
            </Link>
            <span className="text-gray-700">|</span>
            <ThemeToggle />
            <LanguageSelector currentLocale={locale} />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href={navLink('/')} className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-2.5 shadow-md">
                  <Truck className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="leading-none">
                <span className="block font-bold text-gray-900 dark:text-white text-base tracking-tight">
                  Sea Road Brokerage
                </span>
                <span className="block text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-0.5">
                  INC
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all duration-200">
                  {t('services')}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 pt-2 transition-all duration-200 ${servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  <div className="w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-2 overflow-hidden">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.label}
                        href={navLink(item.href)}
                        className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-all duration-150 group"
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="flex-1">{item.label}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={navLink(link.href)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+12099200003"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                <Phone className="h-4 w-4" />
                (209) 920-0003
              </a>
              <Link
                href={navLink('/quote')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-blue-500/30 hover:shadow-lg whitespace-nowrap"
              >
                {t('getQuote')}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile right side */}
            <div className="lg:hidden flex items-center gap-2">
              <a
                href="tel:+12099200003"
                className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                aria-label="Call us"
              >
                <Phone className="h-5 w-5" />
              </a>
              <button
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 pb-6 pt-2">
          {/* USDOT info on mobile */}
          <div className="mb-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-x-3 gap-y-1">
            <span>USDOT #4398936</span>
            <span>MC-1726540</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">FMCSA Registered</span>
          </div>

          <nav className="flex flex-col gap-1">
            <Link
              href={navLink('/services')}
              className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t('services')}
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={navLink(link.href)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
            <Link
              href={navLink('/quote')}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3.5 rounded-xl transition-colors shadow-md text-sm"
            >
              {t('getQuote')} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 font-medium px-5 py-3 rounded-xl transition-colors text-sm"
            >
              <Lock className="h-4 w-4" />
              Admin Login
            </Link>
            <div className="flex items-center justify-between">
              <ThemeToggle />
              <LanguageSelector currentLocale={locale} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
