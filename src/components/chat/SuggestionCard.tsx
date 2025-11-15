'use client';

import { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface SuggestionCardProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export default function SuggestionCard({ suggestions, onSelect }: SuggestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (suggestions.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2 md:p-3 active:scale-95 transition-all"
      >
        <div className="flex items-center gap-2">
          <Lightbulb size={16} className="text-blue-600" />
          <h4 className="font-semibold text-xs md:text-sm text-blue-900">Quick Actions</h4>
        </div>
        {isExpanded ? (
          <ChevronUp size={16} className="text-blue-600" />
        ) : (
          <ChevronDown size={16} className="text-blue-600" />
        )}
      </button>

      {/* Suggestions - Collapsible */}
      {isExpanded && (
        <div className="px-2 pb-2 md:p-3 md:pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => {
                  onSelect(suggestion);
                  setIsExpanded(false);
                }}
                className="w-full text-left p-2 md:p-3 text-xs md:text-sm bg-white hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 min-h-[44px] flex items-center active:scale-95"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
