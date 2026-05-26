import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateQuoteRef } from '@/lib/utils';
import { z } from 'zod';

const schema = z.object({
  full_name: z.string().min(2).max(100),
  company_name: z.string().max(200).optional(),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  origin_city: z.string().min(2).max(100),
  origin_state: z.string().min(2).max(3),
  destination_city: z.string().min(2).max(100),
  destination_state: z.string().min(2).max(3),
  shipment_type: z.enum(['FTL', 'LTL', 'Intermodal', 'Flatbed', 'Refrigerated', 'Specialized']),
  commodity: z.string().min(2).max(200),
  weight_lbs: z.coerce.number().positive(),
  dimensions: z.string().max(200).optional(),
  pickup_date: z.string().min(1),
  delivery_date: z.string().optional(),
  special_instructions: z.string().max(2000).optional(),
  terms_accepted: z.boolean(),
  _honey: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();

    if (raw._honey) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
    }

    const result = schema.safeParse(raw);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const body = result.data;

    if (!body.terms_accepted) {
      return NextResponse.json({ error: 'Terms must be accepted' }, { status: 400 });
    }

    const quote_ref = generateQuoteRef();

    const { error: dbError } = await supabaseAdmin
      .from('quote_requests')
      .insert({
        quote_ref,
        full_name: body.full_name,
        company_name: body.company_name || null,
        email: body.email,
        phone: body.phone,
        origin_city: body.origin_city,
        origin_state: body.origin_state,
        destination_city: body.destination_city,
        destination_state: body.destination_state,
        shipment_type: body.shipment_type,
        commodity: body.commodity,
        weight_lbs: body.weight_lbs,
        dimensions: body.dimensions || null,
        pickup_date: body.pickup_date,
        delivery_date: body.delivery_date || null,
        special_instructions: body.special_instructions || null,
        status: 'new',
      });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (web3Key && web3Key !== 'your_web3forms_access_key') {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `New Quote Request ${quote_ref} - ${body.shipment_type}`,
          from_name: body.full_name,
          email: body.email,
          message: `
Quote Reference: ${quote_ref}
Name: ${body.full_name}
Company: ${body.company_name || 'N/A'}
Email: ${body.email}
Phone: ${body.phone}
Route: ${body.origin_city}, ${body.origin_state} → ${body.destination_city}, ${body.destination_state}
Type: ${body.shipment_type}
Commodity: ${body.commodity}
Weight: ${body.weight_lbs} lbs
Pickup: ${body.pickup_date}
Delivery: ${body.delivery_date || 'Flexible'}
Notes: ${body.special_instructions || 'None'}
          `.trim(),
        }),
      });
    }

    return NextResponse.json({ quote_ref }, { status: 201 });
  } catch (err) {
    console.error('Quote API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
