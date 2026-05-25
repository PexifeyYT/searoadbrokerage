import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body._honey) return NextResponse.json({ error: 'Bot detected' }, { status: 400 });

    const { error: dbError } = await supabaseAdmin.from('carrier_applications').insert({
      company_name: body.company_name,
      contact_name: body.contact_name,
      email: body.email,
      phone: body.phone,
      dot_number: body.dot_number,
      mc_number: body.mc_number,
      fleet_size: body.fleet_size,
      equipment_types: body.equipment_types,
      insurance_provider: body.insurance_provider || null,
      insurance_expiry: body.insurance_expiry || null,
      service_areas: body.service_areas || null,
      status: 'pending',
    });

    if (dbError) {
      console.error('Carrier application DB error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (web3Key && web3Key !== 'your_web3forms_access_key') {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `New Carrier Application: ${body.company_name}`,
          from_name: body.contact_name,
          email: body.email,
          message: `
Company: ${body.company_name}
Contact: ${body.contact_name}
Email: ${body.email}
Phone: ${body.phone}
DOT: ${body.dot_number}
MC: ${body.mc_number}
Fleet Size: ${body.fleet_size}
Equipment: ${body.equipment_types?.join(', ')}
Service Areas: ${body.service_areas || 'N/A'}
          `.trim(),
        }),
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Carrier application API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
