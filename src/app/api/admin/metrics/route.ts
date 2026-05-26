import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const ctx = await verifyAdminRequest(req);
  if (!ctx) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [loads, quotes, carriers, messages, recentQuotes] = await Promise.all([
    ctx.db.from('loads').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    ctx.db.from('quote_requests').select('id', { count: 'exact', head: true }).gte('created_at', thirtyDaysAgo.toISOString()),
    ctx.db.from('carrier_applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    ctx.db.from('contact_messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
    ctx.db.from('quote_requests').select('id, quote_ref, full_name, shipment_type, created_at').order('created_at', { ascending: false }).limit(5),
  ]);

  return NextResponse.json({
    activeLoads: loads.count ?? 0,
    quoteRequests: quotes.count ?? 0,
    pendingCarriers: carriers.count ?? 0,
    unreadMessages: messages.count ?? 0,
    recentQuotes: recentQuotes.data ?? [],
  });
}
