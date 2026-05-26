import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const ctx = await verifyAdminRequest(req);
  if (!ctx) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await ctx.db
    .from('carrier_applications')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const ctx = await verifyAdminRequest(req);
  if (!ctx) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json();
  const { error } = await ctx.db
    .from('carrier_applications')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
