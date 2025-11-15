// Communication service integrations

export interface MessagePayload {
  to: string;
  subject?: string;
  body: string;
  templateId?: string;
  variables?: Record<string, string>;
}

export interface MessageResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  timestamp: Date;
}

// WhatsApp Business API Integration
export async function sendWhatsAppMessage(payload: MessagePayload): Promise<MessageResponse> {
  try {
    const response = await fetch('/api/communications/whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return {
      success: response.ok,
      messageId: data.messageId,
      error: data.error,
      timestamp: new Date(),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send WhatsApp message',
      timestamp: new Date(),
    };
  }
}

// Email (Gmail) Integration
export async function sendEmail(payload: MessagePayload): Promise<MessageResponse> {
  try {
    const response = await fetch('/api/communications/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return {
      success: response.ok,
      messageId: data.messageId,
      error: data.error,
      timestamp: new Date(),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
      timestamp: new Date(),
    };
  }
}

// SMS Integration
export async function sendSMS(payload: MessagePayload): Promise<MessageResponse> {
  try {
    const response = await fetch('/api/communications/sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return {
      success: response.ok,
      messageId: data.messageId,
      error: data.error,
      timestamp: new Date(),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send SMS',
      timestamp: new Date(),
    };
  }
}

// Generate AI message and send
export async function generateAndSend(
  channel: 'whatsapp' | 'email' | 'sms',
  prompt: string,
  recipient: { name: string; phone?: string; email?: string }
): Promise<MessageResponse> {
  try {
    // First, generate the message using AI
    const generateResponse = await fetch('/api/communications/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, recipient, channel }),
    });

    const { message, subject } = await generateResponse.json();

    // Then send via the appropriate channel
    const payload: MessagePayload = {
      to: channel === 'email' ? recipient.email! : recipient.phone!,
      subject: channel === 'email' ? subject : undefined,
      body: message,
    };

    switch (channel) {
      case 'whatsapp':
        return await sendWhatsAppMessage(payload);
      case 'email':
        return await sendEmail(payload);
      case 'sms':
        return await sendSMS(payload);
      default:
        throw new Error('Invalid channel');
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate and send message',
      timestamp: new Date(),
    };
  }
}
