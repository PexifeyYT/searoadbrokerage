import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

async function verifyAdmin() {
  const client = createRouteHandlerClient({ cookies });
  const { data: { session } } = await client.auth.getSession();
  if (!session) return null;
  const { data } = await supabaseAdmin.from('admin_users').select('id').eq('email', session.user.email).eq('is_active', true).single();
  return data ? session : null;
}

export async function GET() {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabaseAdmin.from('contact_messages').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const session = await verifyAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, is_read } = await req.json();
  const { error } = await supabaseAdmin.from('contact_messages').update({ is_read }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
