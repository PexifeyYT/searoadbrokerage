'use client';

import type { Load } from '@/types';
import { Edit, Trash2, Copy, MapPin, Calendar, Weight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface LoadTableProps {
  loads: Load[];
  onEdit: (load: Load) => void;
  onDelete: (id: string) => void;
  onDuplicate: (load: Load) => void;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  covered: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
  inactive: 'bg-gray-100 text-gray-600',
  delivered: 'bg-gray-100 text-gray-600',
};

export default function LoadTable({ loads, onEdit, onDelete, onDuplicate }: LoadTableProps) {
  if (loads.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 text-sm">
        No loads found. Add a new load to get started.
      </div>
    );
  }

  return (
    <>
      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {loads.map((load) => (
          <div key={load.id} className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="font-mono text-xs text-blue-600">{load.load_id}</span>
              <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', statusColors[load.status] ?? 'bg-gray-100 text-gray-600')}>
                {load.status}
              </span>
            </div>
            <div className="flex items-start gap-1.5 text-sm font-medium text-gray-900 mb-1">
              <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>{load.origin_city}, {load.origin_state} → {load.destination_city}, {load.destination_state}</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
              <span>{load.equipment_type}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(load.pickup_date)}</span>
              <span className="flex items-center gap-1"><Weight className="h-3 w-3" />{load.weight_lbs.toLocaleString()} lbs</span>
              {load.rate && <span className="font-semibold text-gray-700">${load.rate.toLocaleString()}</span>}
            </div>
            <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
              <button
                onClick={() => onEdit(load)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                <Edit className="h-3.5 w-3.5" /> Edit
              </button>
              <button
                onClick={() => onDuplicate(load)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-colors"
              >
                <Copy className="h-3.5 w-3.5" /> Duplicate
              </button>
              <button
                onClick={() => onDelete(load.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {['Load ID', 'Route', 'Equipment', 'Pickup', 'Weight', 'Rate', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-3 py-3 text-xs font-medium text-gray-500 uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loads.map((load) => (
              <tr key={load.id} className="hover:bg-gray-50">
                <td className="px-3 py-3 font-mono text-xs text-blue-600">{load.load_id}</td>
                <td className="px-3 py-3">
                  <div className="font-medium">{load.origin_city}, {load.origin_state}</div>
                  <div className="text-gray-500 text-xs">→ {load.destination_city}, {load.destination_state}</div>
                </td>
                <td className="px-3 py-3 text-gray-700">{load.equipment_type}</td>
                <td className="px-3 py-3 text-gray-700">{formatDate(load.pickup_date)}</td>
                <td className="px-3 py-3 text-gray-700">{load.weight_lbs.toLocaleString()} lbs</td>
                <td className="px-3 py-3 font-medium">{load.rate ? `$${load.rate.toLocaleString()}` : '—'}</td>
                <td className="px-3 py-3">
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusColors[load.status] ?? 'bg-gray-100 text-gray-600')}>
                    {load.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(load)} className="p-1 hover:text-blue-600 transition-colors" title="Edit">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDuplicate(load)} className="p-1 hover:text-green-600 transition-colors" title="Duplicate">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDelete(load.id)} className="p-1 hover:text-red-600 transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
