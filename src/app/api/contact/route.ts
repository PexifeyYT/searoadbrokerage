import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body._honey) return NextResponse.json({ error: 'Bot detected' }, { status: 400 });

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
