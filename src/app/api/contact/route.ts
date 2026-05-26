import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
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

    const { error: dbError } = await supabaseAdmin.from('contact_messages').insert({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      subject: body.subject,
      message: body.message,
      is_read: false,
    });

    if (dbError) {
      console.error('Contact DB error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (web3Key && web3Key !== 'your_web3forms_access_key') {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `Contact Form: ${body.subject}`,
          from_name: body.name,
          email: body.email,
          message: `From: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone || 'N/A'}\n\n${body.message}`,
        }),
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
