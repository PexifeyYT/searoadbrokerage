'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

interface AdminPasswordPromptProps {
  onSuccess: () => void;
}

export default function AdminPasswordPrompt({ onSuccess }: AdminPasswordPromptProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/auth/dashboard-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      sessionStorage.setItem('admin_dash_verified', '1');
      onSuccess();
    } else {
      setError('Incorrect dashboard password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-12 w-12 bg-blue-100 rounded-xl mb-3">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Dashboard Access</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your dashboard password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <Alert variant="error">{error}</Alert>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Dashboard password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoFocus
          />
          <Button type="submit" className="w-full">
            Unlock Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
