'use client';

import { useState } from 'react';
import { MessageSquare, Mail, Send, Copy, Check, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

interface AIMessageGeneratorProps {
  recipientName: string;
  recipientType: 'lead' | 'customer';
  context: string;
  purpose: 'follow-up' | 'policy-info' | 'renewal' | 'claim' | 'general';
  policyType?: string;
  onSend?: (channel: 'whatsapp' | 'email' | 'sms', message: string) => void;
}

export default function AIMessageGenerator({
  recipientName,
  recipientType,
  context,
  purpose,
  policyType,
  onSend,
}: AIMessageGeneratorProps) {
  const [messages, setMessages] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const generateMessages = async () => {
    try {
      setLoading(true);
      
      // Generate messages for all three channels
      const channels = ['whatsapp', 'email', 'sms'];
      const generatedMessages: any = {};
      
      for (const channel of channels) {
        const response = await fetch('/api/communications/generate-and-send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipient: { name: recipientName },
            channel,
            purpose,
            context,
            policyType,
            sendNow: false, // Just generate, don't send
          }),
        });

        const result = await response.json();
        if (result.success) {
          if (channel === 'email') {
            generatedMessages.email = result.generated.message;
          } else if (channel === 'whatsapp') {
            generatedMessages.whatsapp = result.generated.message;
          } else if (channel === 'sms') {
            generatedMessages.sms = result.generated.message;
          }
        }
      }
      
      setMessages(generatedMessages);
    } catch (error) {
      console.error('Error generating messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-purple-600" />
          <h3 className="font-semibold">AI Message Generator</h3>
        </div>
        <Button
          onClick={generateMessages}
          disabled={loading}
          size="sm"
        >
          {loading ? 'Generating...' : 'Generate Messages'}
        </Button>
      </div>

      {messages && (
        <div className="space-y-4">
          {/* WhatsApp */}
          <div className="border rounded-lg p-3 bg-green-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-green-600" />
                <span className="font-medium text-sm">WhatsApp</span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(messages.whatsapp, 'whatsapp')}
                  className="h-7 px-2"
                >
                  {copied === 'whatsapp' ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                </Button>
                {onSend && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSend('whatsapp', messages.whatsapp)}
                    className="h-7 px-2"
                  >
                    <Send size={14} />
                  </Button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700">{messages.whatsapp}</p>
          </div>

          {/* Email */}
          <div className="border rounded-lg p-3 bg-blue-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-600" />
                <span className="font-medium text-sm">Email</span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(messages.email, 'email')}
                  className="h-7 px-2"
                >
                  {copied === 'email' ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                </Button>
                {onSend && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSend('email', messages.email)}
                    className="h-7 px-2"
                  >
                    <Send size={14} />
                  </Button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{messages.email}</p>
          </div>

          {/* SMS */}
          <div className="border rounded-lg p-3 bg-purple-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-purple-600" />
                <span className="font-medium text-sm">SMS</span>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(messages.sms, 'sms')}
                  className="h-7 px-2"
                >
                  {copied === 'sms' ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                </Button>
                {onSend && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSend('sms', messages.sms)}
                    className="h-7 px-2"
                  >
                    <Send size={14} />
                  </Button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700">{messages.sms}</p>
          </div>
        </div>
      )}

      {!messages && !loading && (
        <div className="text-center py-8 text-gray-500">
          <Sparkles size={32} className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Click "Generate Messages" to create personalized messages</p>
        </div>
      )}
    </div>
  );
}
