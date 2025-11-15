import { NextRequest, NextResponse } from 'next/server';
import { COMPLIANCE_KEYWORDS } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    // Check for prohibited keywords
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

    // Sentiment analysis (mock)
    const positiveWords = ['benefit', 'advantage', 'protect', 'secure', 'coverage', 'help'];
    const negativeWords = ['risk', 'loss', 'expensive', 'complicated'];
    
    let sentimentScore = 0.5;
    positiveWords.forEach((word) => {
      if (lowerText.includes(word)) sentimentScore += 0.05;
    });
    negativeWords.forEach((word) => {
      if (lowerText.includes(word)) sentimentScore -= 0.05;
    });
    sentimentScore = Math.max(0, Math.min(1, sentimentScore));

    // Tone analysis
    const tone = sentimentScore >= 0.6 ? 'Professional & Positive' : 
                 sentimentScore >= 0.4 ? 'Neutral' : 'Needs Improvement';

    // Generate suggestions
    const suggestions: string[] = [];
    if (issues.length === 0) {
      suggestions.push('Message is compliant with IRDAI guidelines.');
    } else {
      suggestions.push('Review and remove prohibited terms.');
      suggestions.push('Add appropriate disclaimers for investment products.');
    }

    if (sentimentScore < 0.5) {
      suggestions.push('Consider using more positive and reassuring language.');
    }

    if (!lowerText.includes('please') && !lowerText.includes('thank')) {
      suggestions.push('Add courteous phrases like "please" or "thank you" for better tone.');
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
