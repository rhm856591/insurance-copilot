'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Sparkles, TrendingUp, Users, Bell } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import VoiceInputModal from '@/components/voice/VoiceInputModal';
import { Message } from '@/types';

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Good morning! 👋

Here's your day at a glance:
• 5 new leads requiring attention
• 2 policy renewals due this week
• 1 pending follow-up with high-priority client

What would you like to focus on first?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: Users, label: 'Show top leads', command: 'Show me today\'s top leads' },
    { icon: Bell, label: 'View reminders', command: 'Show my reminders' },
    { icon: TrendingUp, label: 'Renewals', command: 'Show upcoming renewals' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'agent',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Mock AI response based on command
    setTimeout(() => {
      let response = '';
      const lower = messageText.toLowerCase();

      if (lower.includes('lead')) {
        response = `Here are your top 5 leads today:

🔥 **Hot Leads**
1. Rajesh Kumar - Term Life (₹1Cr) - Sentiment: Very Positive
   Last contact: Yesterday. Ready to proceed with application.
   
2. Priya Sharma - ULIP - Sentiment: Positive
   Comparing plans. Schedule call for premium breakdown.

⚡ **Warm Leads**
3. Amit Patel - Child Plan - Sentiment: Neutral
   Needs education planning details. Best time: 6-8 PM.

Would you like me to draft a follow-up message for any of these leads?`;
      } else if (lower.includes('renewal')) {
        response = `📋 **Upcoming Renewals This Week**

🔴 **Urgent (Due in 3 days)**
• Sunita Desai - Policy #LIC8921 - ₹45,000
  Last contacted: 10 days ago. No response yet.
  
🟡 **Due in 5 days**
• Vikram Singh - Policy #LIC7634 - ₹32,000
  Renewal reminder sent. Awaiting confirmation.

Would you like me to generate renewal reminder messages?`;
      } else if (lower.includes('reminder') || lower.includes('notification')) {
        response = `🔔 **Your Reminders**

**Today**
• 3:00 PM - Follow-up call with Amit Patel
• 5:30 PM - Send ULIP comparison to Priya Sharma

**Tomorrow**
• 10:00 AM - Policy renewal discussion with Sunita Desai
• 4:00 PM - Compliance training session

Shall I help you prepare for any of these?`;
      } else if (lower.includes('draft') || lower.includes('message')) {
        response = `I can help you draft a message! Please provide:
• Customer name or case number
• Purpose (renewal, follow-up, policy info, etc.)
• Any specific points to include

Or try: "Draft a WhatsApp for Case 12896 renewal"`;
      } else {
        response = `I can help you with:

📊 **Lead Management**
"Show me today's top leads"

📅 **Renewals & Follow-ups**
"Show upcoming renewals"

✍️ **Draft Messages**
"Draft a renewal reminder for [customer name]"

📋 **Customer Information**
"Show details for policy #[number]"

What would you like to do?`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <Sparkles className="text-white" size={16} />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">AI Copilot</h1>
              <p className="text-xs md:text-sm text-gray-600">Your intelligent assistant</p>
            </div>
          </div>
          <Badge variant="success" className="text-xs">Online</Badge>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 pb-32 md:pb-6">
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'agent' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Sparkles className="text-white" size={16} />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'agent'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <span
                  className={`text-xs mt-2 block ${
                    message.role === 'agent' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Sparkles className="text-white" size={16} />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="flex-shrink-0 px-3 md:px-6 pb-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">Quick actions:</p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-3">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(action.command)}
                  className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-white rounded-xl border border-gray-200 active:scale-95 hover:border-blue-300 hover:shadow-md transition-all min-h-[56px]"
                >
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <action.icon className="text-blue-600" size={18} />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-700 text-left">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-3 md:px-6 py-3 md:py-4 pb-20 md:pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2 md:gap-3">
            <button className="p-2 md:p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center">
              <Paperclip size={18} />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask Copilot anything..."
                className="w-full px-3 md:px-4 py-2 md:py-3 pr-10 md:pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm md:text-base"
                rows={1}
              />
              <button
                onClick={() => setShowVoiceModal(true)}
                className="absolute right-2 md:right-3 bottom-2 md:bottom-3 p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center active:scale-95"
              >
                <Mic size={16} />
              </button>
            </div>
            <Button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="px-4 md:px-6 py-2 md:py-3 min-h-[44px] min-w-[44px]"
            >
              <Send size={16} />
            </Button>
          </div>
          <p className="text-[10px] md:text-xs text-gray-500 mt-2 text-center">
            AI Copilot can make mistakes. Verify important information.
          </p>
        </div>
      </div>

      {/* Voice Input Modal */}
      <VoiceInputModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onTranscript={(text) => {
          setInput(text);
          handleSend(text);
        }}
      />
    </div>
  );
}
