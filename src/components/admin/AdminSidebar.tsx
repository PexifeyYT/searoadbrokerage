'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Users,
  FileText,
  Truck,
  MessageSquare,
  Settings,
  Truck as TruckIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Load Board', href: '/admin/loads', icon: Package },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Admin Users', href: '/admin/users', icon: Users },
  { label: 'Quotes', href: '/admin/quotes', icon: FileText },
  { label: 'Carriers', href: '/admin/carriers', icon: Truck },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 flex-shrink-0 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <TruckIcon className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Sea Road</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
