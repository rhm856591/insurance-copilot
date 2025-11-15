import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, body } = await request.json();

    // Email Service Configuration (SendGrid, Gmail API, etc.)
    const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'sendgrid'; // or 'gmail'
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@insurance.com';
    const FROM_NAME = process.env.FROM_NAME || 'Insurance AI Copilot';

    if (!SENDGRID_API_KEY && EMAIL_SERVICE === 'sendgrid') {
      // Mock response for demo
      console.log('Email (Mock):', { to, subject, body });
      return NextResponse.json({
        success: true,
        messageId: `email_${Date.now()}`,
        message: 'Email sent (mock mode)',
      });
    }

    // SendGrid Integration
    if (EMAIL_SERVICE === 'sendgrid') {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: FROM_EMAIL, name: FROM_NAME },
          subject,
          content: [
            {
              type: 'text/html',
              value: body.replace(/\n/g, '<br>'),
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors?.[0]?.message || 'SendGrid API error');
      }

      const messageId = response.headers.get('x-message-id') || `sg_${Date.now()}`;

      await logCommunication({
        channel: 'email',
        to,
        subject,
        message: body,
        messageId,
        status: 'sent',
      });

      return NextResponse.json({
        success: true,
        messageId,
        message: 'Email sent successfully',
      });
    }

    // Gmail API Integration
    if (EMAIL_SERVICE === 'gmail') {
      const GMAIL_ACCESS_TOKEN = process.env.GMAIL_ACCESS_TOKEN;

      if (!GMAIL_ACCESS_TOKEN) {
        throw new Error('Gmail access token not configured');
      }

      // Create email in RFC 2822 format
      const emailContent = [
        `To: ${to}`,
        `From: ${FROM_EMAIL}`,
        `Subject: ${subject}`,
        'Content-Type: text/html; charset=utf-8',
        '',
        body.replace(/\n/g, '<br>'),
      ].join('\n');

      // Base64 encode
      const encodedEmail = Buffer.from(emailContent)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GMAIL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raw: encodedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Gmail API error');
      }

      await logCommunication({
        channel: 'email',
        to,
        subject,
        message: body,
        messageId: data.id,
        status: 'sent',
      });

      return NextResponse.json({
        success: true,
        messageId: data.id,
        message: 'Email sent successfully via Gmail',
      });
    }

    throw new Error('Invalid email service configuration');
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      },
      { status: 500 }
    );
  }
}

async function logCommunication(data: any) {
  console.log('Communication logged:', data);
  // In production, save to database
}
