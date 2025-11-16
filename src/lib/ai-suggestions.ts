import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface AISuggestion {
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AIMessageTemplate {
  whatsapp: string;
  email: string;
  sms: string;
}

// Generate contextual suggestions based on data
export async function generateSuggestions(context: {
  page: 'home' | 'leads' | 'customers' | 'chat' | 'notifications';
  data?: any;
}): Promise<AISuggestion[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `You are an AI assistant for an insurance agent platform.
    
Context: ${context.page} page
Data: ${JSON.stringify(context.data || {})}

Generate 3-5 actionable suggestions for the insurance agent. Each suggestion should be practical and help them improve their work.

Return ONLY a JSON array with this format:
[
  {
    "title": "Short title",
    "description": "Brief description",
    "action": "Specific action to take",
    "priority": "high|medium|low"
  }
]

Focus on:
- Follow-ups needed
- Opportunities to contact customers
- Policy recommendations
- Pending tasks
- Revenue opportunities`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return getDefaultSuggestions(context.page);
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return getDefaultSuggestions(context.page);
  }
}

// Generate personalized message for customer/lead
export async function generatePersonalizedMessage(params: {
  recipientName: string;
  recipientType: 'lead' | 'customer';
  context: string;
  purpose: 'follow-up' | 'policy-info' | 'renewal' | 'claim' | 'general';
  policyType?: string;
  additionalInfo?: string;
}): Promise<AIMessageTemplate> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `Generate personalized insurance messages for ${params.recipientName}.

Recipient Type: ${params.recipientType}
Purpose: ${params.purpose}
Context: ${params.context}
${params.policyType ? `Policy Type: ${params.policyType}` : ''}
${params.additionalInfo ? `Additional Info: ${params.additionalInfo}` : ''}

Generate 3 messages in JSON format:
{
  "whatsapp": "Friendly, short message (max 160 chars) with emoji",
  "email": "Professional email body (3-4 paragraphs)",
  "sms": "Very short SMS (max 160 chars)"
}

Guidelines:
- Use Indian Rupees (₹)
- Keep tone professional but friendly
- Include call-to-action
- Mention relevant insurance benefits
- Use simple language`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return getDefaultMessageTemplate(params);
  } catch (error) {
    console.error('Error generating message:', error);
    return getDefaultMessageTemplate(params);
  }
}

// Analyze lead/customer data and provide insights
export async function analyzeCustomerData(data: {
  name: string;
  age?: number;
  policies?: string[];
  lastContact?: Date;
  sentiment?: number;
  notes?: string;
}): Promise<{
  insights: string[];
  recommendations: string[];
  nextBestAction: string;
  priority: 'high' | 'medium' | 'low';
}> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `Analyze this customer/lead data and provide insights:

Name: ${data.name}
Age: ${data.age || 'Unknown'}
Policies: ${data.policies?.join(', ') || 'None'}
Last Contact: ${data.lastContact || 'Never'}
Sentiment: ${data.sentiment || 'Neutral'}
Notes: ${data.notes || 'None'}

Provide analysis in JSON format:
{
  "insights": ["insight 1", "insight 2", "insight 3"],
  "recommendations": ["recommendation 1", "recommendation 2"],
  "nextBestAction": "Specific action to take",
  "priority": "high|medium|low"
}

Focus on:
- Policy gaps
- Cross-sell opportunities
- Risk factors
- Engagement level
- Revenue potential`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      insights: ['Customer data analyzed'],
      recommendations: ['Follow up with customer'],
      nextBestAction: 'Schedule a call',
      priority: 'medium'
    };
  } catch (error) {
    console.error('Error analyzing customer:', error);
    return {
      insights: ['Unable to analyze at this time'],
      recommendations: ['Review customer manually'],
      nextBestAction: 'Contact customer',
      priority: 'medium'
    };
  }
}

// Generate smart replies for chat
export async function generateSmartReplies(
  conversationHistory: string,
  lastMessage: string
): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `Based on this conversation, suggest 3 quick reply options:

Conversation History:
${conversationHistory}

Last Message: ${lastMessage}

Generate 3 short, relevant reply suggestions (max 50 chars each) as JSON array:
["reply 1", "reply 2", "reply 3"]

Make them:
- Contextually relevant
- Professional
- Action-oriented`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return [
      'Tell me more',
      'I can help with that',
      'Let me check'
    ];
  } catch (error) {
    console.error('Error generating smart replies:', error);
    return [
      'Tell me more',
      'I can help with that',
      'Let me check'
    ];
  }
}

// Default suggestions fallback
function getDefaultSuggestions(page: string): AISuggestion[] {
  const suggestions: Record<string, AISuggestion[]> = {
    home: [
      {
        title: 'Follow up with hot leads',
        description: 'You have 3 hot leads waiting for response',
        action: 'Review and contact hot leads',
        priority: 'high'
      },
      {
        title: 'Policy renewals due',
        description: '5 policies need renewal this month',
        action: 'Send renewal reminders',
        priority: 'high'
      },
      {
        title: 'Update customer notes',
        description: 'Recent interactions need documentation',
        action: 'Add notes to recent conversations',
        priority: 'medium'
      }
    ],
    leads: [
      {
        title: 'Contact warm leads',
        description: 'Warm leads are most likely to convert',
        action: 'Send personalized messages',
        priority: 'high'
      },
      {
        title: 'Qualify new leads',
        description: 'New leads need initial assessment',
        action: 'Review and categorize leads',
        priority: 'medium'
      }
    ],
    customers: [
      {
        title: 'Cross-sell opportunities',
        description: 'Customers with single policies',
        action: 'Recommend additional coverage',
        priority: 'medium'
      },
      {
        title: 'Check-in with customers',
        description: 'Regular engagement improves retention',
        action: 'Send wellness check messages',
        priority: 'low'
      }
    ],
    chat: [
      {
        title: 'Use AI suggestions',
        description: 'Get instant policy information',
        action: 'Ask about policies',
        priority: 'medium'
      }
    ],
    notifications: [
      {
        title: 'Prioritize high-value renewals',
        description: 'Focus on customers with high retention probability',
        action: 'Contact Rajesh Kumar about renewal',
        priority: 'high'
      },
      {
        title: 'Batch process follow-ups',
        description: 'Group similar tasks for efficiency',
        action: 'Send 3 follow-up messages together',
        priority: 'medium'
      },
      {
        title: 'Schedule calls strategically',
        description: 'Contact customers during their preferred times',
        action: 'Schedule evening calls for working professionals',
        priority: 'medium'
      },
      {
        title: 'Automate routine reminders',
        description: 'Use AI to draft standard messages',
        action: 'Generate renewal reminder templates',
        priority: 'low'
      }
    ]
  };
  
  return suggestions[page] || [];
}

// Default message template fallback
function getDefaultMessageTemplate(params: any): AIMessageTemplate {
  return {
    whatsapp: `Hi ${params.recipientName}! 👋 Hope you're doing well. I wanted to follow up regarding your insurance needs. Let me know if you have any questions!`,
    email: `Dear ${params.recipientName},

I hope this email finds you well.

I wanted to reach out regarding your insurance coverage. We have some excellent options that might be perfect for your needs.

Would you be available for a quick call this week to discuss?

Best regards,
Insurance Team`,
    sms: `Hi ${params.recipientName}, following up on your insurance inquiry. Please let me know if you have questions. Thanks!`
  };
}
