import { NextRequest } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseAdmin } from './supabase';

export interface AdminContext {
  userId: string;
  email: string;
  db: SupabaseClient;
}

// Returns admin context with a per-request Supabase client scoped to the user's JWT.
// DB operations through ctx.db respect RLS — admin_users authenticated policies gate access.
// This works without SUPABASE_SERVICE_ROLE_KEY.
export async function verifyAdminRequest(req: NextRequest): Promise<AdminContext | null> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);

  // supabaseAdmin.auth.getUser works with anon key — just verifies the JWT against Supabase Auth
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user?.email) return null;

  // Create a per-request client that sends requests as the authenticated user
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false } }
  );

  const { data: adminUser } = await db
    .from('admin_users')
    .select('id, email')
    .eq('email', user.email)
    .eq('is_active', true)
    .single();

  if (!adminUser) return null;
  return { userId: adminUser.id, email: adminUser.email, db };
}
