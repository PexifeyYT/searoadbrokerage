'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadForm from '@/components/admin/LoadForm';
import type { LoadFormData } from '@/types';
import { adminFetch } from '@/lib/admin-fetch';

export default function NewLoadPage() {
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: Omit<LoadFormData, 'load_id'>) => {
    setSaving(true);
    await adminFetch('/api/admin/loads', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setSaving(false);
    router.push('/admin/loads');
  };

  return (
    <>
      <AdminHeader title="Add New Load" />
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div className="max-w-3xl bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <LoadForm onSubmit={handleSubmit} isLoading={saving} />
        </div>
      </main>
    </>
  );
}
