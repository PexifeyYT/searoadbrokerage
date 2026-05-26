'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Truck, FileText, Package, LogOut, Clock, CheckCircle, XCircle, AlertCircle, User, ArrowRight } from 'lucide-react';

interface QuoteRequest {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  shipment_type: string;
  origin: string;
  destination: string;
  pickup_date: string;
  status: string;
  quote_reference: string;
  weight: string;
  commodity_type: string;
}

const statusConfig: Record<string, { icon: typeof Clock; color: string; label: string }> = {
  pending:    { icon: Clock,         color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', label: 'Pending' },
  reviewing:  { icon: AlertCircle,   color: 'text-blue-400 bg-blue-400/10 border-blue-400/20',     label: 'In Review' },
  quoted:     { icon: CheckCircle,   color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', label: 'Quoted' },
  completed:  { icon: CheckCircle,   color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', label: 'Completed' },
  cancelled:  { icon: XCircle,       color: 'text-red-400 bg-red-400/10 border-red-400/20',         label: 'Cancelled' },
};

export default function AccountPage() {
  const router = useRouter();
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
        .select('id, created_at, first_name, last_name, shipment_type, origin, destination, pickup_date, status, quote_reference, weight, commodity_type')
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
      <div className="min-h-screen bg-[#060D1F] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060D1F]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/8 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/8 bg-white/3 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-2 shadow-lg shadow-blue-500/20">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-white text-sm">Sea Road Brokerage</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name}</h1>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-2xl font-black text-white">{quotes.length}</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Total Quotes</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-2xl font-black text-emerald-400">{quotes.filter(q => q.status === 'completed').length}</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Completed</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 col-span-2 sm:col-span-1">
            <p className="text-2xl font-black text-yellow-400">{quotes.filter(q => q.status === 'pending' || q.status === 'reviewing').length}</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">In Progress</p>
          </div>
        </div>

        {/* Quick action */}
        <div className="mb-8">
          <Link
            href="/en-us/quote"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 text-sm"
          >
            <FileText className="h-4 w-4" />
            Request a New Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Quote history */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-400" />
            Quote History
          </h2>

          {quotes.length === 0 ? (
            <div className="text-center py-16 bg-white/3 border border-white/8 rounded-2xl">
              <FileText className="h-10 w-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No quotes yet</p>
              <p className="text-sm text-gray-500 mt-1">Your quote requests will appear here</p>
              <Link
                href="/en-us/quote"
                className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Request your first quote <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {quotes.map((quote) => {
                const cfg = statusConfig[quote.status] ?? statusConfig.pending;
                const StatusIcon = cfg.icon;
                return (
                  <div
                    key={quote.id}
                    className="bg-white/4 border border-white/8 hover:border-white/15 rounded-2xl p-5 transition-all duration-200 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${cfg.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {cfg.label}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">{quote.quote_reference}</span>
                        </div>
                        <p className="text-sm font-semibold text-white mb-1 truncate">
                          {quote.origin} → {quote.destination}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                          {quote.shipment_type && <span>{quote.shipment_type}</span>}
                          {quote.commodity_type && <span>{quote.commodity_type}</span>}
                          {quote.weight && <span>{quote.weight} lbs</span>}
                          {quote.pickup_date && <span>Pickup: {new Date(quote.pickup_date).toLocaleDateString()}</span>}
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-xs text-gray-500">
                        {new Date(quote.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
