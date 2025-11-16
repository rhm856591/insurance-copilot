'use client';

import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface AISuggestion {
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

interface AISuggestionsProps {
  page: 'home' | 'leads' | 'customers' | 'chat' | 'notifications';
  data?: any;
  onActionClick?: (suggestion: AISuggestion) => void;
  defaultExpanded?: boolean;
  maxHeight?: string;
}

export default function AISuggestions({ 
  page, 
  data, 
  onActionClick,
  defaultExpanded = false,
  maxHeight = '400px'
}: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => {
    loadSuggestions();
  }, [page, data]);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, data }),
      });

      const result = await response.json();
      if (result.success) {
        setSuggestions(result.suggestions);
      }
    } catch (error) {
      console.error('Error loading suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={16} className="text-red-600" />;
      case 'medium':
        return <TrendingUp size={16} className="text-yellow-600" />;
      default:
        return <Sparkles size={16} className="text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-purple-600" />
          <span className="text-sm md:text-base font-semibold text-gray-900">
            AI Suggestions
          </span>
          {!loading && suggestions.length > 0 && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
              {suggestions.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!loading && suggestions.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                loadSuggestions();
              }}
              className="text-xs h-7"
            >
              Refresh
            </Button>
          )}
          {isExpanded ? (
            <ChevronDown size={18} className="text-gray-500" />
          ) : (
            <ChevronRight size={18} className="text-gray-500" />
          )}
        </div>
      </button>

      {/* Content - Collapsible with scroll */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {loading ? (
            <div className="p-3 md:p-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : suggestions.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">No suggestions available at the moment.</p>
            </div>
          ) : (
            <div 
              className="p-3 md:p-4 space-y-3 overflow-y-auto"
              style={{ maxHeight }}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-3 ${getPriorityColor(suggestion.priority)} transition-all hover:shadow-md`}
                >
                  <div className="flex items-start gap-2">
                    {getPriorityIcon(suggestion.priority)}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onActionClick?.(suggestion)}
                        className="text-xs h-7"
                      >
                        {suggestion.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
