'use client';

import { useState } from 'react';
import { X, Send, Sparkles, Mail, MessageSquare, Smartphone, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { generateAndSend } from '@/lib/communications';

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    name: string;
    email?: string;
    phone?: string;
  };
  context?: string;
}

export default function SendMessageModal({
  isOpen,
  onClose,
  recipient,
  context = '',
}: SendMessageModalProps) {
  const [channel, setChannel] = useState<'whatsapp' | 'email' | 'sms'>('whatsapp');
  const [prompt, setPrompt] = useState(context);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/communications/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, recipient, channel }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedMessage(data.message);
        setSubject(data.subject || '');
      } else {
        setResult({ success: false, message: data.error || 'Failed to generate message' });
      }
    } catch (error) {
      setResult({ success: false, message: 'Failed to generate message' });
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    setSending(true);
    setResult(null);

    try {
      const response = await generateAndSend(channel, prompt, recipient);

      if (response.success) {
        setResult({
          success: true,
          message: `Message sent successfully via ${channel}! Message ID: ${response.messageId}`,
        });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setResult({ success: false, message: response.error || 'Failed to send message' });
      }
    } catch (error) {
      setResult({ success: false, message: 'Failed to send message' });
    } finally {
      setSending(false);
    }
  };

  const channels = [
    {
      id: 'whatsapp' as const,
      name: 'WhatsApp',
      icon: MessageSquare,
      available: !!recipient.phone,
      color: 'bg-green-500',
    },
    {
      id: 'email' as const,
      name: 'Email',
      icon: Mail,
      available: !!recipient.email,
      color: 'bg-blue-500',
    },
    {
      id: 'sms' as const,
      name: 'SMS',
      icon: Smartphone,
      available: !!recipient.phone,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Send Message</h3>
              <p className="text-sm text-gray-600 mt-1">To: {recipient.name}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Channel Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Channel
              </label>
              <div className="grid grid-cols-3 gap-3">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setChannel(ch.id)}
                    disabled={!ch.available}
                    className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                      channel === ch.id
                        ? 'border-blue-500 bg-blue-50'
                        : ch.available
                        ? 'border-gray-200 hover:border-gray-300'
                        : 'border-gray-100 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${ch.color} bg-opacity-10 mb-2`}>
                      <ch.icon className={`${ch.color.replace('bg-', 'text-')}`} size={24} />
                    </div>
                    <span className="text-sm font-medium">{ch.name}</span>
                    {!ch.available && (
                      <span className="text-xs text-red-500 mt-1">Not available</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Context / Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., 'Send a policy renewal reminder' or 'Follow up on ULIP inquiry'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2" size={18} />
                  Generate Message with AI
                </>
              )}
            </Button>

            {/* Generated Message Preview */}
            {generatedMessage && (
              <div className="space-y-3">
                {channel === 'email' && subject && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Generated Message
                  </label>
                  <textarea
                    value={generatedMessage}
                    onChange={(e) => setGeneratedMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={8}
                  />
                </div>
              </div>
            )}

            {/* Result Message */}
            {result && (
              <div
                className={`p-4 rounded-lg ${
                  result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}
              >
                <p className="text-sm font-medium">{result.message}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={sending || !prompt.trim()}
              className="min-w-[120px]"
            >
              {sending ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2" size={18} />
                  Send Now
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
