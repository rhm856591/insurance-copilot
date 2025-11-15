import { Message, ComplianceCheck, DraftAnalysis } from '@/types';

export async function sendChatMessage(message: string, history: Message[]) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  return response.json();
}

export async function getSuggestions(context: string) {
  const response = await fetch('/api/suggestions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ context }),
  });
  return response.json();
}

export async function checkCompliance(text: string): Promise<DraftAnalysis> {
  const response = await fetch('/api/compliance-check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return response.json();
}
