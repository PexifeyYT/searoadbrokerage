'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LogOut, Bell } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user.email) setEmail(session.user.email);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('admin_dash_verified');
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5 text-gray-400" />
        <span className="text-sm text-gray-600">{email}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </header>
  );
}
