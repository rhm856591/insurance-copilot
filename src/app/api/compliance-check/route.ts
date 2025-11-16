import { NextRequest, NextResponse } from 'next/server';
import { COMPLIANCE_KEYWORDS } from '@/lib/constants';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    // Basic keyword check (fast)
    const issues: string[] = [];
    const lowerText = text.toLowerCase();

    COMPLIANCE_KEYWORDS.forEach((keyword) => {
      if (lowerText.includes(keyword)) {
        issues.push(`Prohibited term detected: "${keyword}". This violates IRDAI guidelines.`);
      }
    });

    // Check for missing disclaimers on investment products
    if (
      (lowerText.includes('ulip') || lowerText.includes('investment') || lowerText.includes('returns')) &&
      !lowerText.includes('market-linked') &&
      !lowerText.includes('subject to market')
    ) {
      issues.push('Investment products should include market risk disclaimer.');
    }

    // Use Gemini for advanced analysis
    let sentimentScore = 0.5;
    let tone = 'Neutral';
    let aiSuggestions: string[] = [];

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const prompt = `Analyze this insurance communication message for compliance and tone:

Message: "${text}"

Provide analysis in JSON format:
{
  "sentiment": 0.0-1.0 (0=negative, 0.5=neutral, 1=positive),
  "tone": "Professional & Positive" | "Neutral" | "Needs Improvement",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Focus on:
- IRDAI compliance
- Professional tone
- Customer-friendly language
- Clarity and transparency`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysis = JSON.parse(jsonMatch[0]);
        sentimentScore = analysis.sentiment || 0.5;
        tone = analysis.tone || 'Neutral';
        aiSuggestions = analysis.suggestions || [];
      }
    } catch (apiError) {
      console.error('Gemini analysis error:', apiError);
      // Fallback to basic analysis
      const positiveWords = ['benefit', 'advantage', 'protect', 'secure', 'coverage', 'help'];
      const negativeWords = ['risk', 'loss', 'expensive', 'complicated'];
      
      sentimentScore = 0.5;
      positiveWords.forEach((word) => {
        if (lowerText.includes(word)) sentimentScore += 0.05;
      });
      negativeWords.forEach((word) => {
        if (lowerText.includes(word)) sentimentScore -= 0.05;
      });
      sentimentScore = Math.max(0, Math.min(1, sentimentScore));
      
      tone = sentimentScore >= 0.6 ? 'Professional & Positive' : 
            sentimentScore >= 0.4 ? 'Neutral' : 'Needs Improvement';
    }

    // Combine suggestions
    const suggestions: string[] = [];
    if (issues.length === 0) {
      suggestions.push('Message is compliant with IRDAI guidelines.');
    } else {
      suggestions.push('Review and remove prohibited terms.');
      suggestions.push('Add appropriate disclaimers for investment products.');
    }

    if (aiSuggestions.length > 0) {
      suggestions.push(...aiSuggestions);
    } else {
      if (sentimentScore < 0.5) {
        suggestions.push('Consider using more positive and reassuring language.');
      }
      if (!lowerText.includes('please') && !lowerText.includes('thank')) {
        suggestions.push('Add courteous phrases like "please" or "thank you" for better tone.');
      }
    }

    const isCompliant = issues.length === 0;
    const riskLevel = issues.length === 0 ? 'low' : issues.length <= 2 ? 'medium' : 'high';

    return NextResponse.json({
      sentiment: sentimentScore,
      tone,
      suggestions,
      complianceCheck: {
        isCompliant,
        issues,
        suggestions: isCompliant ? ['All checks passed'] : ['Address the issues listed above'],
        riskLevel,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Compliance check API error:', error);
    return NextResponse.json(
      { error: 'Failed to check compliance' },
      { status: 500 }
    );
  }
}
