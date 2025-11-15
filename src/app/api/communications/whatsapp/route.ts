import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { to, body, templateId, variables } = await request.json();

    // WhatsApp Business API Configuration
    const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0';
    const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
      // Mock response for demo
      console.log('WhatsApp (Mock):', { to, body });
      return NextResponse.json({
        success: true,
        messageId: `wa_${Date.now()}`,
        message: 'WhatsApp message sent (mock mode)',
      });
    }

    // Actual WhatsApp Business API call
    const whatsappPayload = templateId
      ? {
          messaging_product: 'whatsapp',
          to: to.replace(/[^0-9]/g, ''), // Remove non-numeric characters
          type: 'template',
          template: {
            name: templateId,
            language: { code: 'en' },
            components: variables
              ? [
                  {
                    type: 'body',
                    parameters: Object.values(variables).map((value) => ({
                      type: 'text',
                      text: value,
                    })),
                  },
                ]
              : [],
          },
        }
      : {
          messaging_product: 'whatsapp',
          to: to.replace(/[^0-9]/g, ''),
          type: 'text',
          text: { body },
        };

    const response = await fetch(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(whatsappPayload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'WhatsApp API error');
    }

    // Log to admin/audit
    await logCommunication({
      channel: 'whatsapp',
      to,
      message: body,
      messageId: data.messages[0].id,
      status: 'sent',
    });

    return NextResponse.json({
      success: true,
      messageId: data.messages[0].id,
      message: 'WhatsApp message sent successfully',
    });
  } catch (error) {
    console.error('WhatsApp API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send WhatsApp message',
      },
      { status: 500 }
    );
  }
}

async function logCommunication(data: any) {
  // Log to database or audit system
  console.log('Communication logged:', data);
  // In production, save to database
}
