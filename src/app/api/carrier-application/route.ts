import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

const schema = z.object({
  company_name: z.string().min(2).max(200),
  contact_name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  dot_number: z.string().min(1).max(20),
  mc_number: z.string().min(1).max(20),
  fleet_size: z.coerce.number().int().min(1),
  equipment_types: z.array(z.string()).min(1),
  insurance_provider: z.string().optional(),
  insurance_expiry: z.string().optional(),
  service_areas: z.string().optional(),
  _honey: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    if (raw._honey) return NextResponse.json({ error: 'Bot detected' }, { status: 400 });

    const result = schema.safeParse(raw);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { _honey: _h, ...body } = result.data;

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
Equipment: ${body.equipment_types.join(', ')}
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
