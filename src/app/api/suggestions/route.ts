import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { context } = await request.json();

    try {
      // Use Gemini to generate contextual suggestions
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const prompt = `Based on this conversation context, generate 4 helpful follow-up suggestions for an insurance agent:

Context: ${context || 'General insurance conversation'}

Generate 4 short, actionable suggestions (each max 60 characters) as a JSON array:
["suggestion 1", "suggestion 2", "suggestion 3", "suggestion 4"]

Focus on:
- Policy information
- Premium calculations
- Document sharing
- Next steps`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      // Try to parse JSON from response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      let suggestions;
      
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback suggestions
        suggestions = [
          'Would you like to know more about the policy benefits?',
          'I can help you compare this with other plans.',
          'Let me calculate the premium for your preferred coverage.',
          'Would you like me to send you detailed policy documents?',
        ];
      }

      return NextResponse.json({
        suggestions,
        timestamp: new Date().toISOString(),
      });
    } catch (apiError) {
      console.error('Gemini API error:', apiError);
      // Fallback to default suggestions
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
    }
  } catch (error) {
    console.error('Suggestions API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
