'use client';

import type { Load } from '@/types';
import { Edit, Trash2, Copy } from 'lucide-react';
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
  delivered: 'bg-gray-100 text-gray-600',
};

export default function LoadTable({ loads, onEdit, onDelete, onDuplicate }: LoadTableProps) {
  if (loads.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No loads found. Add a new load to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
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
                <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusColors[load.status])}>
                  {load.status}
                </span>
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(load)} className="p-1 hover:text-blue-600" title="Edit">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDuplicate(load)} className="p-1 hover:text-green-600" title="Duplicate">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(load.id)} className="p-1 hover:text-red-600" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
