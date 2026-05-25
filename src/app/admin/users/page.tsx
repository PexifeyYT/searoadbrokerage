'use client';

import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import type { AdminUser } from '@/types';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Alert from '@/components/ui/Alert';

const roleOptions = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'dispatcher', label: 'Dispatcher' },
  { value: 'viewer', label: 'Viewer' },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [newUser, setNewUser] = useState({ email: '', full_name: '', role: 'admin' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users');
    if (res.ok) setUsers(await res.json());
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newUser, is_active: true }),
    });
    if (res.ok) {
      setSuccess(true);
      setNewUser({ email: '', full_name: '', role: 'admin' });
      fetchUsers();
      setTimeout(() => setSuccess(false), 3000);
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to add user');
    }
    setSaving(false);
  };

  return (
    <>
      <AdminHeader title="Admin Users" />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add User Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Add Admin User</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              {error && <Alert variant="error">{error}</Alert>}
              {success && <Alert variant="success">User added successfully</Alert>}
              <Input
                label="Full Name"
                required
                value={newUser.full_name}
                onChange={(e) => setNewUser((u) => ({ ...u, full_name: e.target.value }))}
              />
              <Input
                label="Email"
                type="email"
                required
                value={newUser.email}
                onChange={(e) => setNewUser((u) => ({ ...u, email: e.target.value }))}
              />
              <Select
                label="Role"
                required
                options={roleOptions}
                value={newUser.role}
                onChange={(e) => setNewUser((u) => ({ ...u, role: e.target.value }))}
              />
              <Button type="submit" isLoading={saving} className="w-full">
                Add User
              </Button>
            </form>
          </div>

          {/* Users Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {['Name', 'Email', 'Role', 'Status', 'Last Login'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{u.full_name}</td>
                      <td className="px-4 py-3 text-gray-600">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">{u.role}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${u.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {u.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {u.last_login ? formatDate(u.last_login) : 'Never'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <p className="text-center text-gray-500 py-10 text-sm">No admin users found</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
