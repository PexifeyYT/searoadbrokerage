'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Truck, Menu, X, ChevronDown, Phone } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import Button from '../ui/Button';

interface HeaderProps {
  locale: string;
}

const serviceGroups = [
  {
    title: 'Truckload',
    items: [
      { label: 'Full Truckload (FTL)', href: '/services/full-truckload' },
      { label: 'Less Than Truckload (LTL)', href: '/services/less-than-truckload' },
    ],
  },
  {
    title: 'Specialty',
    items: [
      { label: 'Intermodal', href: '/services/intermodal' },
      { label: 'Specialized Freight', href: '/services/specialized' },
    ],
  },
  {
    title: 'Overview',
    items: [{ label: 'All Services', href: '/services' }],
  },
];

export default function Header({ locale }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navLink = (href: string) => `/${locale}${href}`;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border shadow-sm transition-colors duration-200">
      {/* Top bar */}
      <div className="bg-blue-600 dark:bg-blue-800 text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <span className="opacity-75">|</span>
          <span>USDOT #4398936 | MC-1726540</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:+12099200003" className="flex items-center gap-1 hover:underline">
            <Phone className="h-3 w-3" />
            (209) 920-0003
          </a>
          <LanguageSelector currentLocale={locale} />
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={navLink('/')} className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-blue-600 rounded-lg p-2">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div className="leading-tight">
              <span className="block font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                Sea Road Brokerage
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">INC</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Services dropdown */}
            <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Services <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-dark-surface rounded-xl shadow-xl border border-gray-200 dark:border-dark-border p-4 grid gap-4">
                  {serviceGroups.map((group) => (
                    <div key={group.title}>
                      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                        {group.title}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={navLink(item.href)}
                          className="block px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          onClick={() => setServicesOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={navLink('/carriers')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Carriers
            </Link>
            <Link
              href={navLink('/load-board')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Load Board
            </Link>
            <Link
              href={navLink('/about')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              About
            </Link>
            <Link
              href={navLink('/contact')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href={navLink('/quote')}>
              <Button size="md">Get a Quote</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface pb-4">
          <nav className="max-w-7xl mx-auto px-4 pt-3 flex flex-col gap-1">
            <Link
              href={navLink('/services')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              Services
            </Link>
            <Link
              href={navLink('/carriers')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              Carriers
            </Link>
            <Link
              href={navLink('/load-board')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              Load Board
            </Link>
            <Link
              href={navLink('/about')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              href={navLink('/contact')}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2">
              <Link href={navLink('/quote')} onClick={() => setMobileOpen(false)}>
                <Button className="w-full" size="md">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
