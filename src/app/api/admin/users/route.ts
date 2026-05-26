import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';

async function verifySuperAdmin(req: NextRequest) {
  const ctx = await verifyAdminRequest(req);
  if (!ctx) return null;
  const { data } = await ctx.db
    .from('admin_users')
    .select('role')
    .eq('email', ctx.email)
    .single();
  return data?.role === 'super_admin' ? ctx : null;
}

export async function GET(req: NextRequest) {
  const ctx = await verifySuperAdmin(req);
  if (!ctx) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await ctx.db.from('admin_users').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const ctx = await verifySuperAdmin(req);
  if (!ctx) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { data, error } = await ctx.db.from('admin_users').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
