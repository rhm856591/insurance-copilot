'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, X, Volume2, AlertCircle } from 'lucide-react';
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
  const [error, setError] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setIsSupported(!!SpeechRecognition);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopListening();
      setTranscript('');
      setInterimTranscript('');
      setError('');
    } else if (isSupported) {
      // Auto-start listening when modal opens
      setTimeout(() => startListening(), 300);
    }
  }, [isOpen, isSupported]);

  const startListening = () => {
    if (typeof window === 'undefined' || !isSupported) {
      setError('Speech recognition is not supported in your browser');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US'; // English language
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setError('');
      };

      recognition.onresult = (event: any) => {
        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += transcriptPart + ' ';
          } else {
            interimText += transcriptPart;
          }
        }

        if (finalText) {
          setTranscript((prev) => prev + finalText);
          setInterimTranscript('');
        } else {
          setInterimTranscript(interimText);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          setError('No speech detected. Please try again.');
        } else if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone access.');
        } else {
          setError('Error occurred. Please try again.');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setError('Failed to start speech recognition');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSubmit = () => {
    const finalText = (transcript + ' ' + interimTranscript).trim();
    if (finalText) {
      onTranscript(finalText);
      stopListening();
      onClose();
    }
  };

  const handleClose = () => {
    stopListening();
    onClose();
  };

  if (!isOpen) return null;

  // Generate wave bars for animation (increased for better visual)
  const waveBars = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:max-w-lg md:w-full p-6 md:p-8 animate-slideUp border-t md:border border-gray-100 max-h-[90vh] md:max-h-[85vh] overflow-y-auto">
        {/* Decorative gradient top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-3xl" />
        
        {/* Mobile drag indicator */}
        <div className="md:hidden flex justify-center mb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all active:scale-95 z-10"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Voice Input
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            {isSupported ? 'Speak naturally in English' : 'Speech recognition not supported'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 animate-fadeIn">
            <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Mic Animation with Waveform */}
        <div className="flex flex-col items-center justify-center mb-6 space-y-4 md:space-y-6">
          {/* Animated Waveform */}
          {isListening && (
            <div className="flex items-center justify-center gap-1 md:gap-1.5 h-12 md:h-16">
              {waveBars.map((i) => (
                <div
                  key={i}
                  className="w-1 md:w-1.5 bg-gradient-to-t from-blue-500 via-indigo-500 to-purple-500 rounded-full animate-wave shadow-lg shadow-blue-500/50"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    animationDuration: '0.8s',
                  }}
                />
              ))}
            </div>
          )}

          {/* Mic Button */}
          <div className="relative">
            {/* Outer ripple rings */}
            {isListening && (
              <>
                <div className="absolute inset-0 -m-6 md:-m-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 opacity-20 animate-ping" />
                <div className="absolute inset-0 -m-4 md:-m-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 opacity-30 animate-pulse" />
                <div className="absolute inset-0 -m-3 md:-m-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </>
            )}
            
            {/* Main mic button */}
            <button
              onClick={handleToggleListening}
              disabled={!isSupported}
              className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-500 active:scale-95 ${
                !isSupported
                  ? 'bg-gray-300 cursor-not-allowed'
                  : isListening
                  ? 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-2xl shadow-blue-500/50 scale-110'
                  : 'bg-gradient-to-br from-gray-400 to-gray-500 shadow-lg shadow-gray-500/30 hover:scale-105 hover:shadow-xl'
              }`}
            >
              {/* Inner glow */}
              {isListening && (
                <div className="absolute inset-2 rounded-full bg-white/20 animate-pulse" />
              )}
              
              {/* Mic icon */}
              <div className={`relative z-10 transition-transform duration-300 ${isListening ? 'scale-110' : ''}`}>
                <Mic className="text-white drop-shadow-lg" size={40} strokeWidth={2.5} />
              </div>
            </button>
          </div>

          {/* Status text */}
          <div className="text-center">
            <p className={`text-sm md:text-base font-semibold transition-colors duration-300 ${
              isListening ? 'text-blue-600 animate-pulse' : 'text-gray-500'
            }`}>
              {isListening ? '🎤 Listening...' : 'Tap to speak'}
            </p>
            {isListening && (
              <p className="text-xs text-gray-500 mt-1 animate-fadeIn">
                Speak now in English
              </p>
            )}
          </div>
        </div>

        {/* Transcript Display */}
        <div className="mb-4 md:mb-6">
          <div className="min-h-[140px] md:min-h-[160px] max-h-[240px] overflow-y-auto p-4 md:p-5 bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/20 rounded-2xl border-2 border-gray-200/50 shadow-inner">
            {(transcript || interimTranscript) ? (
              <div className="space-y-3">
                {/* Final transcript */}
                {transcript && (
                  <p className="text-gray-900 text-sm md:text-base leading-relaxed">
                    {transcript}
                  </p>
                )}
                
                {/* Interim transcript with different styling */}
                {interimTranscript && (
                  <p className="text-blue-600 text-sm md:text-base leading-relaxed italic animate-fadeIn">
                    {interimTranscript}
                  </p>
                )}
                
                {/* Listening indicator */}
                {isListening && (
                  <div className="flex justify-center pt-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-6">
                <Volume2 size={36} className="text-gray-300 mb-3" />
                <p className="text-gray-400 text-center text-sm md:text-base font-medium">
                  Your speech will appear here...
                </p>
                <p className="text-gray-400 text-center text-xs mt-2">
                  Speak in English
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 min-h-[48px] md:min-h-[52px] text-sm md:text-base font-medium order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!transcript && !interimTranscript}
            className="flex-1 min-h-[48px] md:min-h-[52px] text-sm md:text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
          >
            Send Message
          </Button>
        </div>

        {/* Tips */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <Volume2 size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs md:text-sm text-blue-800 leading-relaxed">
              <span className="font-semibold">Tip:</span> Speak clearly in English. The AI will transcribe in real-time.
            </p>
          </div>
          
          {!isSupported && (
            <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <AlertCircle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs md:text-sm text-yellow-800 leading-relaxed">
                Speech recognition is not supported in your browser. Try Chrome, Edge, or Safari.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
