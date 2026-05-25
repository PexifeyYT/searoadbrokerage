import Link from 'next/link';
import { Truck, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const navLink = (href: string) => `/${locale}${href}`;

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 rounded-lg p-2">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Sea Road Brokerage</p>
                <p className="text-xs text-gray-400">INC</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-3">
              Professional freight brokerage services connecting shippers and carriers across North America.
            </p>
            <div className="space-y-1 text-xs text-gray-400">
              <p>USDOT: <span className="text-white font-medium">#4398936</span></p>
              <p>MC: <span className="text-white font-medium">MC-1726540</span></p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Full Truckload (FTL)', href: '/services/full-truckload' },
                { label: 'Less Than Truckload', href: '/services/less-than-truckload' },
                { label: 'Intermodal', href: '/services/intermodal' },
                { label: 'Specialized Freight', href: '/services/specialized' },
                { label: 'All Services', href: '/services' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={navLink(item.href)}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Get a Quote', href: '/quote' },
                { label: 'Load Board', href: '/load-board' },
                { label: 'Become a Carrier', href: '/carriers' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={navLink(item.href)}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-blue-400" />
                <span>22492 Road 19 Site# J<br />Chowchilla, California</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <a href="tel:+12099200003" className="hover:text-blue-400 transition-colors">
                  (209) 920-0003
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <a
                  href="mailto:searoadbrokerageinc@gmail.com"
                  className="hover:text-blue-400 transition-colors break-all"
                >
                  searoadbrokerageinc@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Sea Road Brokerage INC. All rights reserved.</p>
          <p>Licensed & Bonded | FMCSA Registered</p>
        </div>
      </div>
    </footer>
  );
}
