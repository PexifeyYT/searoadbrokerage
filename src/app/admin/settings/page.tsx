'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import AdminHeader from '@/components/admin/AdminHeader';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Alert from '@/components/ui/Alert';

export default function AdminSettingsPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    if (newPassword !== confirmPassword) {
      setPwMsg({ type: 'error', text: 'Passwords do not match' });
      return;
    }
    if (newPassword.length < 8) {
      setPwMsg({ type: 'error', text: 'Password must be at least 8 characters' });
      return;
    }
    setPwLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwLoading(false);
    if (error) {
      setPwMsg({ type: 'error', text: error.message });
    } else {
      setPwMsg({ type: 'success', text: 'Password updated successfully' });
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <>
      <AdminHeader title="Settings" />
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div className="max-w-2xl space-y-6">
          {/* Password Change */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              {pwMsg && <Alert variant={pwMsg.type}>{pwMsg.text}</Alert>}
              <Input
                label="New Password"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 characters"
              />
              <Input
                label="Confirm Password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
              />
              <Button type="submit" isLoading={pwLoading}>
                Update Password
              </Button>
            </form>
          </div>

          {/* Company Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Company Information</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Company Name', value: 'Sea Road Brokerage INC' },
                { label: 'Address', value: '22492 Road 19 Site# J, Chowchilla, California' },
                { label: 'Phone', value: '(209) 920-0003' },
                { label: 'Email', value: 'searoadbrokerageinc@gmail.com' },
                { label: 'USDOT', value: '#4398936' },
                { label: 'MC Number', value: 'MC-1726540' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="w-36 text-gray-500 flex-shrink-0">{item.label}</span>
                  <span className="text-gray-900 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">To update company info, edit the source files or contact your developer.</p>
          </div>
        </div>
      </main>
    </>
  );
}
