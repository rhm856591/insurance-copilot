'use client';

import { useState } from 'react';
import { Copy, Mail, MessageCircle, Volume2, Check } from 'lucide-react';
import Button from '@/components/ui/Button';

interface MessageActionsProps {
  whatsapp?: string;
  email?: string;
  voice_text?: string;
}

export default function MessageActions({ whatsapp, email, voice_text }: MessageActionsProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!whatsapp && !email && !voice_text) return null;

  return (
    <div className="mt-3 space-y-2">
      {/* Toggle button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
      >
        {showDetails ? '▼ Hide' : '▶ Show'} Message Templates
      </button>

      {showDetails && (
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          {/* WhatsApp Message */}
          {whatsapp && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MessageCircle size={16} className="text-green-600" />
                  WhatsApp
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(whatsapp, 'whatsapp')}
                  className="h-7 px-2"
                >
                  {copied === 'whatsapp' ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                </Button>
              </div>
              <div className="text-sm bg-white p-2 rounded border border-gray-200">
                {whatsapp}
              </div>
            </div>
          )}

          {/* Email Message */}
          {email && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail size={16} className="text-blue-600" />
                  Email
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(email, 'email')}
                  className="h-7 px-2"
                >
                  {copied === 'email' ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                </Button>
              </div>
              <div className="text-sm bg-white p-2 rounded border border-gray-200 whitespace-pre-wrap">
                {email}
              </div>
            </div>
          )}

          {/* Voice Text */}
          {voice_text && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Volume2 size={16} className="text-purple-600" />
                  Voice
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(voice_text)}
                    className="h-7 px-2"
                  >
                    <Volume2 size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(voice_text, 'voice')}
                    className="h-7 px-2"
                  >
                    {copied === 'voice' ? (
                      <Check size={14} className="text-green-600" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </Button>
                </div>
              </div>
              <div className="text-sm bg-white p-2 rounded border border-gray-200">
                {voice_text}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
