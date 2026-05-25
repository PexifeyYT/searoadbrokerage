import { supabase } from './supabase';

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) return null;
  return session;
}

export async function isAdmin(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .eq('is_active', true)
    .single();
  return !error && data !== null;
}

export async function getAdminRole(email: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('role')
    .eq('email', email)
    .eq('is_active', true)
    .single();
  if (error || !data) return null;
  return data.role;
}
