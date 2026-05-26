'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { adminFetch } from '@/lib/admin-fetch';
import type { CarrierApplication } from '@/types';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  under_review: 'bg-blue-100 text-blue-700',
};

const statusOptions = ['pending', 'under_review', 'approved', 'rejected'];

export default function AdminCarriersPage() {
  const [carriers, setCarriers] = useState<CarrierApplication[]>([]);

  const fetchCarriers = async () => {
    const res = await adminFetch('/api/admin/carriers');
    if (res.ok) setCarriers(await res.json() as CarrierApplication[]);
  };

  useEffect(() => { fetchCarriers(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await adminFetch('/api/admin/carriers', {
      method: 'PUT',
      body: JSON.stringify({ id, status }),
    });
    fetchCarriers();
  };

  return (
    <>
      <AdminHeader title="Carrier Applications" />
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">

        {/* Mobile cards */}
        <div className="sm:hidden space-y-3">
          {carriers.length === 0 && (
            <p className="text-center text-gray-500 py-10 text-sm">No carrier applications yet</p>
          )}
          {carriers.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-1">
                <p className="font-semibold text-gray-900">{c.company_name}</p>
                <select
                  value={c.status}
                  onChange={(e) => updateStatus(c.id, e.target.value)}
                  className={cn('text-xs px-2 py-1 rounded-lg border-0 font-medium cursor-pointer flex-shrink-0', statusColors[c.status])}
                >
                  {statusOptions.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              <p className="text-sm text-gray-700 mb-0.5">{c.contact_name}</p>
              <a href={`mailto:${c.email}`} className="text-xs text-blue-600 block mb-2">{c.email}</a>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                <span>DOT: {c.dot_number}</span>
                <span>MC: {c.mc_number}</span>
                <span>Fleet: {c.fleet_size}</span>
                <span>{formatDate(c.created_at)}</span>
              </div>
              {c.equipment_types?.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">{c.equipment_types.join(', ')}</p>
              )}
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {['Company', 'Contact', 'DOT / MC', 'Fleet', 'Equipment', 'Status', 'Applied'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {carriers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{c.company_name}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{c.contact_name}</div>
                      <div className="text-xs text-gray-500">{c.email}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">
                      <div>{c.dot_number}</div>
                      <div>{c.mc_number}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{c.fleet_size}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate">
                      {c.equipment_types?.join(', ')}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={c.status}
                        onChange={(e) => updateStatus(c.id, e.target.value)}
                        className={cn('text-xs px-2 py-1 rounded border-0 font-medium cursor-pointer', statusColors[c.status])}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(c.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {carriers.length === 0 && (
              <p className="text-center text-gray-500 py-10 text-sm">No carrier applications yet</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
