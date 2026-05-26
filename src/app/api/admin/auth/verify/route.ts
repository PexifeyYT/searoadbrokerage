import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  try {
    const ctx = await verifyAdminRequest(req);
    if (!ctx) return NextResponse.json({ error: 'Not authorized' }, { status: 403 });

    await ctx.db
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('email', ctx.email);

    const { data } = await ctx.db
      .from('admin_users')
      .select('role')
      .eq('email', ctx.email)
      .single();

    return NextResponse.json({ role: data?.role });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
