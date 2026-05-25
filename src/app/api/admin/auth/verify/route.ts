import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, role')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    // Update last login
    await supabaseAdmin
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('email', email);

    return NextResponse.json({ role: data.role });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
