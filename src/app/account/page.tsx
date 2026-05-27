'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Truck, FileText, Package, LogOut, Clock, CheckCircle, XCircle, AlertCircle, User, ArrowRight, Settings } from 'lucide-react';

interface QuoteRequest {
  id: string;
  created_at: string;
  full_name: string;
  shipment_type: string;
  origin_city: string;
  origin_state: string;
  destination_city: string;
  destination_state: string;
  pickup_date: string;
  status: string;
  quote_ref: string;
  weight_lbs: number | null;
  commodity: string | null;
}

const statusConfig: Record<string, { icon: typeof Clock; color: string; label: string }> = {
  new:       { icon: Clock,       color: 'text-yellow-600 bg-yellow-50 border-yellow-200',   label: 'New' },
  reviewing: { icon: AlertCircle, color: 'text-blue-600 bg-blue-50 border-blue-200',         label: 'In Review' },
  quoted:    { icon: CheckCircle, color: 'text-purple-600 bg-purple-50 border-purple-200',   label: 'Quoted' },
  accepted:  { icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200',      label: 'Accepted' },
  rejected:  { icon: XCircle,     color: 'text-red-600 bg-red-50 border-red-200',             label: 'Rejected' },
  expired:   { icon: XCircle,     color: 'text-gray-500 bg-gray-50 border-gray-200',          label: 'Expired' },
};

export default function AccountPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en-us';
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace('/login'); return; }

      const email = session.user.email ?? '';
      const name = session.user.user_metadata?.full_name ?? email.split('@')[0];
      setUser({ email, name });

      const { data } = await supabase
        .from('quote_requests')
        .select('id, created_at, full_name, shipment_type, origin_city, origin_state, destination_city, destination_state, pickup_date, status, quote_ref, weight_lbs, commodity')
        .eq('email', email)
        .order('created_at', { ascending: false });

      setQuotes(data ?? []);
      setLoading(false);
    };
    init();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-blue-600 rounded-lg p-1.5">
              <Truck className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">Sea Road Brokerage</span>
          </Link>
          <Link href={`/${locale}/quote`} className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Request Quote
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{user?.name}</h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{quotes.length}</p>
            <p className="text-xs text-gray-500 mt-1">Total Quotes</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{quotes.filter(q => q.status === 'accepted').length}</p>
            <p className="text-xs text-gray-500 mt-1">Accepted</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-yellow-500">{quotes.filter(q => q.status === 'new' || q.status === 'reviewing').length}</p>
            <p className="text-xs text-gray-500 mt-1">In Progress</p>
          </div>
        </div>

        {/* Quote History */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-600" /> Quote History
            </h2>
            <Link
              href={`/${locale}/quote`}
              className="inline-flex items-center gap-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FileText className="h-3.5 w-3.5" /> New Quote
            </Link>
          </div>

          {quotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-8 w-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium mb-1">No quotes yet</p>
              <p className="text-sm text-gray-400">Your quote requests will appear here.</p>
              <Link href={`/${locale}/quote`} className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Request your first quote <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {quotes.map((quote) => {
                const cfg = statusConfig[quote.status] ?? statusConfig.new;
                const StatusIcon = cfg.icon;
                return (
                  <div key={quote.id} className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded border ${cfg.color}`}>
                            <StatusIcon className="h-3 w-3" /> {cfg.label}
                          </span>
                          {quote.quote_ref && <span className="text-xs text-gray-400 font-mono">{quote.quote_ref}</span>}
                        </div>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {quote.origin_city}, {quote.origin_state} → {quote.destination_city}, {quote.destination_state}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500 mt-0.5">
                          {quote.shipment_type && <span>{quote.shipment_type}</span>}
                          {quote.weight_lbs && <span>{quote.weight_lbs.toLocaleString()} lbs</span>}
                          {quote.pickup_date && <span>Pickup: {new Date(quote.pickup_date).toLocaleDateString()}</span>}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 flex-shrink-0">
                        {new Date(quote.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Settings / Sign out */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="h-4 w-4" /> Account Settings
          </h2>
          <div className="text-sm text-gray-500 mb-4">
            Signed in as <span className="font-medium text-gray-700">{user?.email}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </main>
    </div>
  );
}
