import { NextRequest, NextResponse } from 'next/server';
import { analyzeCustomerData } from '@/lib/ai-suggestions';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json(
        { error: 'Customer name is required' },
        { status: 400 }
      );
    }

    const analysis = await analyzeCustomerData(data);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('AI Analysis API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze customer' },
      { status: 500 }
    );
  }
}
