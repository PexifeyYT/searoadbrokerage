'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import AdminHeader from '@/components/admin/AdminHeader';
import { Package, FileText, Truck, MessageSquare, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface MetricCard {
  label: string;
  value: number | string;
  icon: React.ElementType;
  href: string;
  color: string;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    activeLoads: 0,
    quoteRequests: 0,
    pendingCarriers: 0,
    unreadMessages: 0,
  });
  const [recentQuotes, setRecentQuotes] = useState<{ id: string; quote_ref: string; full_name: string; shipment_type: string; created_at: string }[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const [loads, quotes, carriers, messages] = await Promise.all([
        supabase.from('loads').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('quote_requests').select('id', { count: 'exact', head: true }).gte('created_at', thirtyDaysAgo.toISOString()),
        supabase.from('carrier_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
      ]);

      setMetrics({
        activeLoads: loads.count || 0,
        quoteRequests: quotes.count || 0,
        pendingCarriers: carriers.count || 0,
        unreadMessages: messages.count || 0,
      });
    };

    const fetchRecentQuotes = async () => {
      const { data } = await supabase
        .from('quote_requests')
        .select('id, quote_ref, full_name, shipment_type, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setRecentQuotes(data);
    };

    fetchMetrics();
    fetchRecentQuotes();
  }, []);

  const metricCards: MetricCard[] = [
    { label: 'Active Loads', value: metrics.activeLoads, icon: Package, href: '/admin/loads', color: 'bg-blue-500' },
    { label: 'Quotes (30d)', value: metrics.quoteRequests, icon: FileText, href: '/admin/quotes', color: 'bg-green-500' },
    { label: 'Pending Carriers', value: metrics.pendingCarriers, icon: Truck, href: '/admin/carriers', color: 'bg-yellow-500' },
    { label: 'Unread Messages', value: metrics.unreadMessages, icon: MessageSquare, href: '/admin/messages', color: 'bg-red-500' },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metricCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.label} href={card.href} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-10 w-10 ${card.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-600">{card.label}</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Quotes */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Recent Quote Requests</h2>
              <Link href="/admin/quotes" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {recentQuotes.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">No quotes yet</p>
            ) : (
              <div className="space-y-3">
                {recentQuotes.map((q) => (
                  <div key={q.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{q.full_name}</p>
                      <p className="text-xs text-gray-500">{q.quote_ref} · {q.shipment_type}</p>
                    </div>
                    <span className="text-xs text-gray-400">{formatDate(q.created_at)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add Load', href: '/admin/loads/new', icon: Plus },
                { label: 'View Quotes', href: '/admin/quotes', icon: FileText },
                { label: 'Carrier Apps', href: '/admin/carriers', icon: Truck },
                { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm font-medium text-gray-700"
                  >
                    <Icon className="h-4 w-4 text-blue-600" />
                    {action.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
