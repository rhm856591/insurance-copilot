import { NextRequest, NextResponse } from 'next/server';
import { generatePersonalizedMessage } from '@/lib/ai-suggestions';

export async function POST(request: NextRequest) {
  try {
    const params = await request.json();

    if (!params.recipientName || !params.purpose) {
      return NextResponse.json(
        { error: 'Recipient name and purpose are required' },
        { status: 400 }
      );
    }

    const messages = await generatePersonalizedMessage(params);

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error('AI Message Generation API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate message' },
      { status: 500 }
    );
  }
}
