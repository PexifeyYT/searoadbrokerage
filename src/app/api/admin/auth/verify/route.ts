import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    // Verify the Supabase session token first, then check admin table
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, role')
      .eq('email', user.email)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    await supabaseAdmin
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('email', user.email);

    return NextResponse.json({ role: data.role });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
