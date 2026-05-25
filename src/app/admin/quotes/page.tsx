'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import type { QuoteRequest } from '@/types';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  reviewing: 'bg-yellow-100 text-yellow-700',
  quoted: 'bg-purple-100 text-purple-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  expired: 'bg-gray-100 text-gray-600',
};

const statusOptions = ['new', 'reviewing', 'quoted', 'accepted', 'rejected', 'expired'];

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  const fetchQuotes = async () => {
    const res = await fetch('/api/admin/quotes');
    if (res.ok) setQuotes(await res.json());
  };

  useEffect(() => { fetchQuotes(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/quotes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchQuotes();
  };

  return (
    <>
      <AdminHeader title="Quote Requests" />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {['Ref', 'Name', 'Route', 'Type', 'Pickup', 'Status', 'Submitted'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-blue-600">{q.quote_ref}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{q.full_name}</div>
                      <div className="text-xs text-gray-500">{q.email}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-xs">
                      {q.origin_city}, {q.origin_state} → {q.destination_city}, {q.destination_state}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{q.shipment_type}</td>
                    <td className="px-4 py-3 text-gray-700">{formatDate(q.pickup_date)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={q.status}
                        onChange={(e) => updateStatus(q.id, e.target.value)}
                        className={cn('text-xs px-2 py-1 rounded border-0 font-medium cursor-pointer', statusColors[q.status])}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(q.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {quotes.length === 0 && (
              <p className="text-center text-gray-500 py-10 text-sm">No quote requests yet</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
