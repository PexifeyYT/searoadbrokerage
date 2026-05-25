import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

async function verifySuperAdmin() {
  const client = createRouteHandlerClient({ cookies });
  const { data: { session } } = await client.auth.getSession();
  if (!session) return null;
  const { data } = await supabaseAdmin
    .from('admin_users')
    .select('role')
    .eq('email', session.user.email)
    .eq('is_active', true)
    .single();
  return data?.role === 'super_admin' ? session : null;
}

export async function GET() {
  const session = await verifySuperAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabaseAdmin.from('admin_users').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await verifySuperAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { data, error } = await supabaseAdmin.from('admin_users').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
