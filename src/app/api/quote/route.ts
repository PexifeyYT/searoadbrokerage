import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateQuoteRef } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body._honey) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
    }

    const quote_ref = generateQuoteRef();

    const insertData = {
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
    };

    const { error: dbError } = await supabaseAdmin
      .from('quote_requests')
      .insert(insertData);

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Send via Web3Forms
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
