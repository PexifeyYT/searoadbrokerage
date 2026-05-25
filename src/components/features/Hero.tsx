import Link from 'next/link';
import Button from '../ui/Button';
import { ArrowRight, Shield, Clock, TrendingUp } from 'lucide-react';

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 dark:from-blue-900 dark:via-blue-800 dark:to-gray-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/30 border border-blue-300/30 rounded-full px-4 py-1.5 text-sm mb-6">
            <Shield className="h-4 w-4" />
            Licensed & Bonded Freight Broker | FMCSA Registered
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Reliable Freight Solutions Across{' '}
            <span className="text-blue-200">North America</span>
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 mb-4 leading-relaxed">
            Professional freight brokerage connecting shippers with trusted carriers.
            Competitive rates, real-time tracking, and 24/7 support.
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-blue-200 mb-10">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> USDOT #4398936
            </span>
            <span className="text-blue-300">|</span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" /> MC-1726540
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/quote`}>
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 border-transparent w-full sm:w-auto">
                Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/carriers`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Become a Carrier
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
