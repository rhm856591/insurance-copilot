import { NextRequest, NextResponse } from 'next/server';
import { generateSuggestions } from '@/lib/ai-suggestions';

export async function POST(request: NextRequest) {
  try {
    const { page, data } = await request.json();

    if (!page) {
      return NextResponse.json(
        { error: 'Page context is required' },
        { status: 400 }
      );
    }

    const suggestions = await generateSuggestions({ page, data });

    return NextResponse.json({
      success: true,
      suggestions,
    });
  } catch (error) {
    console.error('AI Suggestions API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
