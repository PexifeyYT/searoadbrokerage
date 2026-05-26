'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadTable from '@/components/admin/LoadTable';
import Modal from '@/components/ui/Modal';
import LoadForm from '@/components/admin/LoadForm';
import Button from '@/components/ui/Button';
import type { Load, LoadFormData } from '@/types';
import { adminFetch } from '@/lib/admin-fetch';
import { Plus } from 'lucide-react';

export default function AdminLoadsPage() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [editingLoad, setEditingLoad] = useState<Load | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchLoads = async () => {
    const res = await adminFetch('/api/admin/loads');
    if (res.ok) {
      const data = await res.json();
      setLoads(data);
    }
  };

  useEffect(() => { fetchLoads(); }, []);

  const handleEdit = (load: Load) => setEditingLoad(load);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this load?')) return;
    await adminFetch(`/api/admin/loads/${id}`, { method: 'DELETE' });
    fetchLoads();
  };

  const handleDuplicate = async (load: Load) => {
    const { id, load_id, created_at, updated_at, ...rest } = load;
    await adminFetch('/api/admin/loads', {
      method: 'POST',
      body: JSON.stringify({ ...rest, status: 'pending' }),
    });
    fetchLoads();
  };

  const handleSaveEdit = async (data: Omit<LoadFormData, 'load_id'>) => {
    if (!editingLoad) return;
    setSaving(true);
    await adminFetch(`/api/admin/loads/${editingLoad.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    setSaving(false);
    setEditingLoad(null);
    fetchLoads();
  };

  return (
    <>
      <AdminHeader title="Load Board" />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">All Loads</h2>
          <Link href="/admin/loads/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add Load
            </Button>
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <LoadTable
            loads={loads}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />
        </div>
      </main>

      <Modal isOpen={!!editingLoad} onClose={() => setEditingLoad(null)} title="Edit Load" size="xl">
        {editingLoad && (
          <LoadForm
            onSubmit={handleSaveEdit}
            defaultValues={editingLoad as Partial<import('@/types').LoadFormData>}
            isLoading={saving}
          />
        )}
      </Modal>
    </>
  );
}
