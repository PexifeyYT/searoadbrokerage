import { NextRequest } from 'next/server';
import { supabaseAdmin } from './supabase';

export async function verifyAdminRequest(req: NextRequest): Promise<{ userId: string; email: string } | null> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return null;

  const { data: adminUser } = await supabaseAdmin
    .from('admin_users')
    .select('id, email')
    .eq('email', user.email)
    .eq('is_active', true)
    .single();

  if (!adminUser) return null;
  return { userId: adminUser.id, email: adminUser.email };
}
