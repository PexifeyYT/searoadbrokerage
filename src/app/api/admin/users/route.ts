import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdminRequest } from '@/lib/admin-auth';

async function verifySuperAdmin(req: NextRequest) {
  const admin = await verifyAdminRequest(req);
  if (!admin) return null;
  const { data } = await supabaseAdmin
    .from('admin_users')
    .select('role')
    .eq('email', admin.email)
    .single();
  return data?.role === 'super_admin' ? admin : null;
}

export async function GET(req: NextRequest) {
  const admin = await verifySuperAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabaseAdmin.from('admin_users').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const admin = await verifySuperAdmin(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { data, error } = await supabaseAdmin.from('admin_users').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
