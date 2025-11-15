import { NextRequest, NextResponse } from 'next/server';
import { Message } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    // Mock AI response - In production, integrate with actual AI service
    const responses: Record<string, string> = {
      'term life': `Term Life Insurance provides pure life coverage at affordable premiums. Key benefits include:

• High coverage amount (up to ₹2 Crore)
• Low premium rates
• Tax benefits under Section 80C and 10(10D)
• Optional riders available (critical illness, accidental death)
• Flexible policy terms (10-40 years)

Would you like me to calculate a premium estimate for your client?`,
      
      'ulip': `ULIP (Unit Linked Insurance Plan) combines insurance with investment. Here's what makes it attractive:

• Life cover + market-linked returns
• Flexibility to switch between equity and debt funds
• Tax benefits under Section 80C
• Lock-in period of 5 years
• Partial withdrawals allowed after 5 years

Important: Always explain that returns are market-linked and not guaranteed, as per IRDAI guidelines.`,
      
      'renewal': `Here's a compliant renewal reminder template:

"Dear [Client Name],

Your [Policy Name] policy (No: XXXXX) is due for renewal on [Date]. 

To continue your coverage of ₹[Amount], please pay the premium of ₹[Premium] by [Due Date].

Benefits of timely renewal:
• Uninterrupted coverage
• No medical re-examination required
• Maintain your policy benefits

Please contact me for any assistance with the renewal process.

Best regards,
[Your Name]"`,
      
      'default': `I can help you with:

• Policy explanations (Term, ULIP, Endowment, etc.)
• Premium calculations
• Drafting client communications
• Comparing policy features
• Renewal reminders
• Compliance-checked messaging

What specific information do you need?`,
    };

    const lowerMessage = message.toLowerCase();
    let responseText = responses.default;

    for (const [key, value] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        responseText = value;
        break;
      }
    }

    return NextResponse.json({
      message: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
