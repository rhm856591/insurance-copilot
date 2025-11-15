'use client';

import { useState, useEffect } from 'react';
import { Mic, X, Volume2 } from 'lucide-react';
import Button from '@/components/ui/Button';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscript: (text: string) => void;
}

export default function VoiceInputModal({ isOpen, onClose, onTranscript }: VoiceInputModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript('');
      setInterimTranscript('');
    } else {
      // Auto-start listening when modal opens
      setTimeout(() => setIsListening(true), 300);
    }
  }, [isOpen]);

  const handleStartListening = () => {
    setIsListening(true);
    // Mock voice recognition - in production, use Web Speech API
    setTimeout(() => {
      setInterimTranscript('Show me today\'s top leads...');
    }, 1000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    if (interimTranscript) {
      setTranscript(interimTranscript);
    }
  };

  const handleSubmit = () => {
    if (transcript || interimTranscript) {
      onTranscript(transcript || interimTranscript);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Voice Input</h2>
          <p className="text-sm text-gray-600">
            {isListening ? 'Listening... Speak now' : 'Tap the mic to start'}
          </p>
        </div>

        {/* Mic Animation */}
        <div className="flex justify-center mb-6">
          <button
            onClick={isListening ? handleStopListening : handleStartListening}
            className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-gradient-to-br from-red-500 to-pink-500 shadow-lg shadow-red-500/50 scale-110'
                : 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/50 hover:scale-105'
            }`}
          >
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" />
                <div className="absolute inset-0 rounded-full bg-red-400 animate-pulse opacity-50" />
              </>
            )}
            <Mic className="text-white relative z-10" size={48} />
          </button>
        </div>

        {/* Transcript Display */}
        <div className="mb-6">
          <div className="min-h-[100px] max-h-[200px] overflow-y-auto p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
            {(transcript || interimTranscript) ? (
              <p className="text-gray-900 text-center">
                {transcript || interimTranscript}
              </p>
            ) : (
              <p className="text-gray-400 text-center text-sm">
                Your speech will appear here...
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 min-h-[48px]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!transcript && !interimTranscript}
            className="flex-1 min-h-[48px]"
          >
            Send
          </Button>
        </div>

        {/* Tip */}
        <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
          <Volume2 size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-800">
            Tip: Speak clearly and pause briefly between sentences for best results.
          </p>
        </div>
      </div>
    </div>
  );
}
