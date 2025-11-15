import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { context } = await request.json();

    // Mock suggestions based on context
    const suggestions = [
      'Would you like to know more about the policy benefits?',
      'I can help you compare this with other plans.',
      'Let me calculate the premium for your preferred coverage.',
      'Would you like me to send you detailed policy documents?',
    ];

    return NextResponse.json({
      suggestions,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Suggestions API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
