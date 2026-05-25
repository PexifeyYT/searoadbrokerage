'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AdminPasswordPrompt from './AdminPasswordPrompt';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [status, setStatus] = useState<'loading' | 'unauthenticated' | 'no-admin' | 'need-password' | 'authorized'>('loading');
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
        return;
      }

      // Check admin
      const res = await fetch('/api/admin/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (!res.ok) {
        setStatus('no-admin');
        router.replace('/login');
        return;
      }

      // Check dashboard password in sessionStorage
      const pw = sessionStorage.getItem('admin_dash_verified');
      if (!pw) {
        setStatus('need-password');
        return;
      }

      setStatus('authorized');
    };
    check();
  }, [router]);

  const handlePasswordSuccess = () => {
    setStatus('authorized');
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (status === 'need-password') {
    return <AdminPasswordPrompt onSuccess={handlePasswordSuccess} />;
  }

  if (status === 'authorized') {
    return <>{children}</>;
  }

  return null;
}
