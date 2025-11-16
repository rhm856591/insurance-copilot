import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { prompt, recipient, channel } = await request.json();

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      // Mock AI generation for demo
      const mockMessage = generateMockMessage(prompt, recipient, channel);
      return NextResponse.json(mockMessage);
    }

    // Actual Gemini Integration
    const systemPrompt = `You are an AI assistant for life insurance agents in India. Generate professional, compliant messages for ${channel} communication. 

IMPORTANT COMPLIANCE RULES:
- Never use terms like "guaranteed returns", "risk-free", "assured profit"
- Always include appropriate disclaimers for investment products
- Be professional, empathetic, and clear
- Follow IRDAI guidelines
- Use Indian Rupees (₹) for all amounts

Recipient: ${recipient.name}
Context: ${prompt}

Generate a ${channel === 'email' ? 'professional email with subject line in format "Subject: [subject]\\n\\n[body]"' : 'concise message (max 160 chars for SMS, max 300 chars for WhatsApp)'}.

Keep the tone friendly and professional. Include relevant policy benefits and call-to-action.`;

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const result = await model.generateContent(systemPrompt);
      const generatedText = result.response.text();

      // Parse subject and body for email
      let subject = '';
      let message = generatedText;

      if (channel === 'email' && generatedText.includes('Subject:')) {
        const parts = generatedText.split('\n\n');
        subject = parts[0].replace('Subject:', '').trim();
        message = parts.slice(1).join('\n\n');
      }

      return NextResponse.json({
        subject: subject || `Message from Insurance AI Copilot`,
        message,
        channel,
        timestamp: new Date().toISOString(),
      });
    } catch (apiError) {
      console.error('Gemini API error:', apiError);
      // Fallback to mock message
      const mockMessage = generateMockMessage(prompt, recipient, channel);
      return NextResponse.json(mockMessage);
    }
  } catch (error) {
    console.error('Message generation error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate message',
      },
      { status: 500 }
    );
  }
}

function generateMockMessage(
  prompt: string,
  recipient: any,
  channel: string
): { subject: string; message: string } {
  const templates: Record<string, any> = {
    renewal: {
      subject: 'Policy Renewal Reminder - Action Required',
      message: `Dear ${recipient.name},

This is a friendly reminder that your life insurance policy is due for renewal soon.

Policy Details:
• Policy Number: [Policy Number]
• Renewal Date: [Date]
• Premium Amount: ₹[Amount]

To ensure uninterrupted coverage, please complete your renewal payment by the due date.

Benefits of timely renewal:
✓ Continuous coverage protection
✓ No medical re-examination required
✓ Maintain your existing policy benefits

If you have any questions or need assistance, please don't hesitate to contact me.

Best regards,
[Agent Name]
Insurance AI Copilot`,
    },
    followup: {
      subject: 'Following Up on Your Insurance Inquiry',
      message: `Dear ${recipient.name},

I hope this message finds you well. I wanted to follow up on our recent discussion about life insurance coverage.

I understand that choosing the right insurance plan is an important decision. I'm here to help answer any questions you may have and provide additional information about our policies.

Would you be available for a brief call this week to discuss your requirements in detail?

Looking forward to hearing from you.

Best regards,
[Agent Name]
Insurance AI Copilot`,
    },
    policy_info: {
      subject: 'Information About Your Life Insurance Policy',
      message: `Dear ${recipient.name},

Thank you for your interest in our life insurance policies. I'm pleased to provide you with information about our coverage options.

Our policies offer:
✓ Comprehensive life coverage
✓ Flexible premium payment options
✓ Tax benefits under Section 80C and 10(10D)
✓ Optional riders for enhanced protection

I'd be happy to discuss which plan best suits your needs and provide a personalized quote.

Please let me know a convenient time for us to connect.

Best regards,
[Agent Name]
Insurance AI Copilot`,
    },
  };

  // Determine template based on prompt
  const lowerPrompt = prompt.toLowerCase();
  let template = templates.policy_info;

  if (lowerPrompt.includes('renewal')) {
    template = templates.renewal;
  } else if (lowerPrompt.includes('follow') || lowerPrompt.includes('followup')) {
    template = templates.followup;
  }

  // Adjust for channel
  if (channel === 'whatsapp' || channel === 'sms') {
    // Shorter version for WhatsApp/SMS
    const lines = template.message.split('\n').filter((line: string) => line.trim());
    template.message = lines.slice(0, 8).join('\n');
  }

  return template;
}
