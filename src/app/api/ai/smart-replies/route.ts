import { NextRequest, NextResponse } from 'next/server';
import { generateSmartReplies } from '@/lib/ai-suggestions';

export async function POST(request: NextRequest) {
  try {
    const { conversationHistory, lastMessage } = await request.json();

    if (!lastMessage) {
      return NextResponse.json(
        { error: 'Last message is required' },
        { status: 400 }
      );
    }

    const replies = await generateSmartReplies(
      conversationHistory || '',
      lastMessage
    );

    return NextResponse.json({
      success: true,
      replies,
    });
  } catch (error) {
    console.error('Smart Replies API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate smart replies' },
      { status: 500 }
    );
  }
}
