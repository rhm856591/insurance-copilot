import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { recipient, channel, purpose, context, policyType, sendNow } = await request.json();

    if (!recipient || !channel || !purpose) {
      return NextResponse.json(
        { error: 'Missing required fields: recipient, channel, purpose' },
        { status: 400 }
      );
    }

    // Generate message using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    let prompt = '';
    
    if (channel === 'email') {
      prompt = `Generate a professional insurance email for Indian customers.

Recipient: ${recipient.name}
Purpose: ${purpose}
Context: ${context || 'General insurance communication'}
${policyType ? `Policy Type: ${policyType}` : ''}

Generate an email with:
1. Subject line (start with "Subject: ")
2. Professional greeting
3. Clear message body
4. Call to action
5. Professional closing

Format:
Subject: [subject line]

[email body]

Requirements:
- Use Indian Rupees (₹)
- Follow IRDAI compliance
- Professional and friendly tone
- Include relevant policy benefits
- Max 300 words`;
    } else if (channel === 'whatsapp') {
      prompt = `Generate a WhatsApp message for Indian insurance customers.

Recipient: ${recipient.name}
Purpose: ${purpose}
Context: ${context || 'General insurance communication'}
${policyType ? `Policy Type: ${policyType}` : ''}

Generate a friendly WhatsApp message:
- Max 250 characters
- Use 1-2 emojis (appropriate)
- Include call to action
- Use Indian Rupees (₹)
- Friendly but professional tone

Just return the message text, no formatting.`;
    } else if (channel === 'sms') {
      prompt = `Generate an SMS for Indian insurance customers.

Recipient: ${recipient.name}
Purpose: ${purpose}
Context: ${context || 'General insurance communication'}

Generate a concise SMS:
- Max 160 characters
- Clear and direct
- Include call to action
- Use Indian Rupees (₹)

Just return the SMS text, no formatting.`;
    }

    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    // Parse email subject and body
    let subject = '';
    let message = generatedText;

    if (channel === 'email' && generatedText.includes('Subject:')) {
      const lines = generatedText.split('\n');
      const subjectLine = lines.find(line => line.startsWith('Subject:'));
      if (subjectLine) {
        subject = subjectLine.replace('Subject:', '').trim();
        message = lines.slice(lines.indexOf(subjectLine) + 1).join('\n').trim();
      }
    }

    const response: any = {
      success: true,
      channel,
      generated: {
        subject: subject || `Message from Insurance Team`,
        message: message.trim(),
      },
      recipient: {
        name: recipient.name,
        contact: recipient.email || recipient.phone,
      },
      timestamp: new Date().toISOString(),
    };

    // If sendNow is true, actually send the message
    if (sendNow) {
      try {
        let sendResult;
        
        if (channel === 'email') {
          sendResult = await fetch('/api/communications/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: recipient.email,
              subject: subject || 'Message from Insurance Team',
              body: message,
            }),
          });
        } else if (channel === 'whatsapp') {
          sendResult = await fetch('/api/communications/whatsapp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: recipient.phone,
              body: message,
            }),
          });
        } else if (channel === 'sms') {
          sendResult = await fetch('/api/communications/sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: recipient.phone,
              body: message,
            }),
          });
        }

        if (sendResult) {
          const sendData = await sendResult.json();
          response.sent = sendData.success;
          response.messageId = sendData.messageId;
        }
      } catch (sendError) {
        console.error('Error sending message:', sendError);
        response.sent = false;
        response.sendError = 'Failed to send message';
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Generate and send error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate message',
      },
      { status: 500 }
    );
  }
}
