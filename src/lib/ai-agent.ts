import { GoogleGenerativeAI } from '@google/generative-ai';
import { searchKnowledgeBase, getPolicyDetails, getCustomerDetails } from './rag';
import { generateCrossSellReport, getHighValueCustomersForCrossSell, getAllPolicies } from './database-queries';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface AgentResponse {
  agent_reply: string;
  whatsapp: string;
  email: string;
  voice_text: string;
}

// Analyze user intent
function analyzeIntent(query: string): {
  type: 'policy_info' | 'premium_calc' | 'claim_process' | 'customer_query' | 'report' | 'cross_sell' | 'general';
  entities: Record<string, any>;
} {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('report') || lowerQuery.includes('list') || lowerQuery.includes('show me')) {
    return { type: 'report', entities: {} };
  }
  
  if (lowerQuery.includes('cross-sell') || lowerQuery.includes('complementary') || lowerQuery.includes('additional polic')) {
    return { type: 'cross_sell', entities: {} };
  }
  
  if (lowerQuery.includes('premium') || lowerQuery.includes('cost') || lowerQuery.includes('price')) {
    return { type: 'premium_calc', entities: {} };
  }
  
  if (lowerQuery.includes('claim') || lowerQuery.includes('settlement')) {
    return { type: 'claim_process', entities: {} };
  }
  
  if (lowerQuery.includes('policy') || lowerQuery.includes('insurance') || lowerQuery.includes('coverage')) {
    return { type: 'policy_info', entities: {} };
  }
  
  if (lowerQuery.includes('customer') || lowerQuery.includes('client')) {
    return { type: 'customer_query', entities: {} };
  }
  
  return { type: 'general', entities: {} };
}

// Main AI agent function
export async function processAgentQuery(
  query: string,
  context?: Record<string, any>
): Promise<AgentResponse> {
  try {
    // Step 1: Analyze intent
    const intent = analyzeIntent(query);
    
    // Step 2: Get relevant data from RAG (with fallback)
    let ragResults = [];
    try {
      ragResults = await searchKnowledgeBase(query, 3);
    } catch (error) {
      console.error('RAG search failed, using fallback:', error);
      ragResults = [];
    }
    const ragContext = ragResults.map((r: any) => r.content).join('\n\n');
    
    // Step 3: Get additional data if needed
    let additionalContext = '';
    
    // Handle report/cross-sell queries
    if (intent.type === 'report' || intent.type === 'cross_sell') {
      try {
        const report = await generateCrossSellReport();
        const policies = await getAllPolicies();
        
        additionalContext = `\n\nCross-Sell Report Data:
Total Customers with Single Policy: ${report.length}
Available Policies: ${policies.map(p => p.policy_name).join(', ')}

Top Opportunities:
${report.slice(0, 5).map((r, i) => `
${i + 1}. ${r.name} (Age: ${r.age})
   Current: ${r.currentPolicy}
   Priority: ${r.priority}
   Complementary: ${r.complementaryPolicies.slice(0, 3).join(', ')}
   Contact: ${r.email}, ${r.phone}
`).join('\n')}`;
      } catch (error) {
        console.error('Error generating report:', error);
      }
    }
    
    if (intent.type === 'policy_info' && context?.policyType) {
      const policyData = await getPolicyDetails(context.policyType);
      if (policyData) {
        additionalContext += `\nPolicy Details: ${JSON.stringify(policyData)}`;
      }
    }
    
    if (context?.customerEmail) {
      const customerData = await getCustomerDetails(context.customerEmail);
      if (customerData) {
        additionalContext += `\nCustomer Details: ${JSON.stringify(customerData)}`;
      }
    }
    
    // Step 4: Generate AI response using Gemini (with rate limit handling)
    const prompt = `You are an AI Insurance Agent Assistant for Indian customers.

Your job:
1. Give real-time suggestions for client queries
2. Explain policy benefits, premium breakdown, claim steps
3. Auto-create messages for Email, WhatsApp, and SMS
4. Keep replies short, clear, and simple
5. Use very simple words suitable for Indian customers
6. Do not hallucinate - if data is missing, ask for it

Context from knowledge base:
${ragContext}

${additionalContext}

User Query: ${query}

IMPORTANT: Generate 4 separate outputs. Each output should be on its own line with the label followed by a colon. Do NOT include brackets or extra formatting.

Format exactly like this:

agent_reply:
Your detailed answer for the insurance agent to use

whatsapp:
Short, friendly WhatsApp message (max 160 chars)

email:
Professional email content

voice_text:
Simple text that can be converted to audio

Use Indian Rupees (₹) for all amounts. Keep language simple and friendly.`;

    let response = '';
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const result = await model.generateContent(prompt);
      response = result.response.text();
      
      // Debug logging
      // console.log('=== RAW GEMINI RESPONSE ===');
      // console.log(response);
      // console.log('=== END RAW RESPONSE ===');
    } catch (apiError: any) {
      console.error('Gemini API error:', apiError.message);
      // Use fallback response when API fails
      response = generateFallbackResponse(query, intent, ragContext);
    }
    
    // Parse the response into structured format
    const parsed = parseAgentResponse(response, query);
    
    // Debug logging
    // console.log('=== PARSED RESPONSE ===');
    // console.log('Agent Reply:', parsed.agent_reply.substring(0, 100) + '...');
    // console.log('WhatsApp:', parsed.whatsapp.substring(0, 100));
    // console.log('Email:', parsed.email.substring(0, 100) + '...');
    // console.log('Voice:', parsed.voice_text.substring(0, 100));
    // console.log('=== END PARSED ===');
    
    return parsed;
    
  } catch (error) {
    console.error('AI Agent error:', error);
    return {
      agent_reply: 'I need more information to help you. Could you please provide more details?',
      whatsapp: 'Hi! Could you share more details so I can help you better?',
      email: 'Dear Customer,\n\nThank you for reaching out. To assist you better, could you please provide more details about your query?\n\nBest regards,\nInsurance Team',
      voice_text: 'I need more information to help you. Please provide more details.',
    };
  }
}

// Parse AI response into structured format
function parseAgentResponse(response: string, originalQuery: string): AgentResponse {
  // Clean up response - remove markdown formatting
  let cleanResponse = response.replace(/```[\s\S]*?```/g, '').trim();
  
  // Try to extract structured sections with better regex
  const agentReplyMatch = cleanResponse.match(/agent_reply[:\s]*\n?([\s\S]*?)(?=\n\s*whatsapp[:\s]|$)/i);
  const whatsappMatch = cleanResponse.match(/whatsapp[:\s]*\n?([\s\S]*?)(?=\n\s*email[:\s]|$)/i);
  const emailMatch = cleanResponse.match(/email[:\s]*\n?([\s\S]*?)(?=\n\s*voice_text[:\s]|$)/i);
  const voiceMatch = cleanResponse.match(/voice_text[:\s]*\n?([\s\S]*?)$/i);
  
  // Extract and clean each section
  let agentReply = agentReplyMatch?.[1]?.trim() || response;
  let whatsapp = whatsappMatch?.[1]?.trim() || '';
  let email = emailMatch?.[1]?.trim() || '';
  let voiceText = voiceMatch?.[1]?.trim() || '';
  
  // Remove any leading brackets or formatting
  agentReply = agentReply.replace(/^\[|\]$/g, '').trim();
  whatsapp = whatsapp.replace(/^\[|\]$/g, '').trim();
  email = email.replace(/^\[|\]$/g, '').trim();
  voiceText = voiceText.replace(/^\[|\]$/g, '').trim();
  
  // If sections weren't properly extracted, use fallbacks
  if (!whatsapp) {
    whatsapp = generateDefaultWhatsApp(originalQuery);
  }
  if (!email) {
    email = generateDefaultEmail(originalQuery);
  }
  if (!voiceText) {
    voiceText = agentReply.substring(0, 200);
  }
  
  return {
    agent_reply: agentReply,
    whatsapp: whatsapp,
    email: email,
    voice_text: voiceText,
  };
}

// Fallback response when API fails
function generateFallbackResponse(query: string, intent: any, ragContext: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Use RAG context if available
  if (ragContext) {
    return `Based on our knowledge base:\n\n${ragContext}\n\nFor more specific information, please contact our team.`;
  }
  
  // Intent-based fallback responses
  if (intent.type === 'report' || intent.type === 'cross_sell') {
    return `📊 Cross-Sell Report

I can generate a report of customers with single policies who are good candidates for complementary products.

The report will include:
- Customers with only one policy type
- High-value customers (based on age and existing coverage)
- Recommended complementary policies
- Priority ranking for outreach

To generate the full report, please ensure the database query completes successfully. The system will analyze:
- Current policy holdings
- Customer demographics
- Available complementary products
- Cross-sell opportunities

Would you like me to try generating the report again?`;
  }
  
  if (intent.type === 'policy_info') {
    return `I can help you with insurance policy information. We offer Term Life, ULIP, Health Insurance, and more. Each policy has unique benefits and tax advantages. Would you like details about a specific policy type?`;
  }
  
  if (intent.type === 'premium_calc') {
    return `To calculate your premium, I'll need:\n- Policy type (Term Life, ULIP, etc.)\n- Coverage amount\n- Your age\n- Policy term\n\nPlease provide these details for an accurate quote.`;
  }
  
  if (intent.type === 'claim_process') {
    return `Claim Process:\n1. Inform insurer immediately\n2. Submit required documents (death certificate, policy document, claim form)\n3. Provide nominee KYC\n4. Claim settled within 30 days\n\nFor specific guidance, please contact our claims team.`;
  }
  
  return `Thank you for your query. I'm here to help with:\n- Policy information\n- Premium calculations\n- Claim process\n- Tax benefits\n- Customer reports and cross-sell opportunities\n\nPlease ask me about any specific insurance topic.`;
}

// Fallback message generators
function generateDefaultWhatsApp(query: string): string {
  return `Hi! Thanks for your query about insurance. Our agent will help you shortly. 🙏`;
}

function generateDefaultEmail(query: string): string {
  return `Dear Customer,

Thank you for your interest in our insurance products.

Our team is reviewing your query and will get back to you with detailed information shortly.

Best regards,
Insurance Team`;
}
