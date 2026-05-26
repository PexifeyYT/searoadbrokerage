import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { subDays } from 'date-fns';

export async function GET(req: NextRequest) {
  const ctx = await verifyAdminRequest(req);
  if (!ctx) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const thirtyDaysAgo = subDays(new Date(), 29);
  const sixMonthsAgo = subDays(new Date(), 180);

  const [quotes, loads] = await Promise.all([
    ctx.db
      .from('quote_requests')
      .select('created_at, shipment_type')
      .gte('created_at', thirtyDaysAgo.toISOString()),
    ctx.db
      .from('loads')
      .select('created_at')
      .gte('created_at', sixMonthsAgo.toISOString()),
  ]);

  return NextResponse.json({
    quotes: quotes.data ?? [],
    loads: loads.data ?? [],
  });
}
