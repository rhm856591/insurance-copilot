import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { to, body } = await request.json();

    // SMS Service Configuration (Twilio)
    const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
    const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
    const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      // Mock response for demo
      console.log('SMS (Mock):', { to, body });
      return NextResponse.json({
        success: true,
        messageId: `sms_${Date.now()}`,
        message: 'SMS sent (mock mode)',
      });
    }

    // Twilio API Integration
    const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');

    const formData = new URLSearchParams();
    formData.append('To', to);
    formData.append('From', TWILIO_PHONE_NUMBER);
    formData.append('Body', body);

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Twilio API error');
    }

    await logCommunication({
      channel: 'sms',
      to,
      message: body,
      messageId: data.sid,
      status: data.status,
    });

    return NextResponse.json({
      success: true,
      messageId: data.sid,
      message: 'SMS sent successfully',
      status: data.status,
    });
  } catch (error) {
    console.error('SMS API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send SMS',
      },
      { status: 500 }
    );
  }
}

async function logCommunication(data: any) {
  console.log('Communication logged:', data);
  // In production, save to database
}
