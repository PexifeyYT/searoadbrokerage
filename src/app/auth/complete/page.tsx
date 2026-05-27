'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';

function CompleteAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const finish = async (token: string) => {
      const res = await fetch('/api/admin/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      });
      router.replace(res.ok ? '/admin' : '/account');
    };

    const code = searchParams.get('code');

    if (code) {
      // PKCE fallback
      supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
        if (error || !data.session) router.replace('/login?error=oauth_failed');
        else finish(data.session.access_token);
      });
      return;
    }

    // Implicit flow: hash fragment — Supabase fires onAuthStateChange with SIGNED_IN
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe();
        finish(session.access_token);
      }
    });

    // Also check if session already processed before listener attached
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        subscription.unsubscribe();
        finish(session.access_token);
      }
    });

    // Timeout fallback
    const timeout = setTimeout(() => {
      subscription.unsubscribe();
      router.replace('/login?error=oauth_failed');
    }, 10000);

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-500">Signing you in...</p>
      </div>
    </div>
  );
}

export default function AuthCompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CompleteAuth />
    </Suspense>
  );
}
