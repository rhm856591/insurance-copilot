import { NextRequest, NextResponse } from 'next/server';
import { processAgentQuery } from '@/lib/ai-agent';

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    // Process query using AI agent with RAG
    const agentResponse = await processAgentQuery(message, context);

    return NextResponse.json({
      success: true,
      data: agentResponse,
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
