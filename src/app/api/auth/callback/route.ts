import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get('code');

  if (code) {
    // Exchange code for session — this requires server-side Supabase client
    // We redirect to a client page that handles the hash/token from Supabase
    return NextResponse.redirect(`${origin}/auth/complete?code=${code}`);
  }

  return NextResponse.redirect(`${origin}/login?error=oauth_failed`);
}
