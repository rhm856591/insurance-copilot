'use client';

import { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

interface AIInsightsProps {
  customerData: {
    name: string;
    age?: number;
    policies?: string[];
    lastContact?: Date;
    sentiment?: number;
    notes?: string;
  };
}

export default function AIInsights({ customerData }: AIInsightsProps) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const analyzeCustomer = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ai/analyze-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });

      const result = await response.json();
      if (result.success) {
        setAnalysis(result.analysis);
        setShowInsights(true);
      }
    } catch (error) {
      console.error('Error analyzing customer:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700',
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain size={20} className="text-purple-600" />
          <h3 className="font-semibold">AI Insights</h3>
        </div>
        <Button
          onClick={analyzeCustomer}
          disabled={loading}
          size="sm"
        >
          {loading ? (
            <>
              <Sparkles size={16} className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            'Analyze'
          )}
        </Button>
      </div>

      {showInsights && analysis && (
        <div className="space-y-4">
          {/* Priority Badge */}
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(analysis.priority)}`}>
              {analysis.priority.toUpperCase()} PRIORITY
            </span>
          </div>

          {/* Next Best Action */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <TrendingUp size={18} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm mb-1">Next Best Action</h4>
                <p className="text-sm text-gray-700">{analysis.nextBestAction}</p>
              </div>
            </div>
          </div>

          {/* Insights */}
          {analysis.insights && analysis.insights.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                Key Insights
              </h4>
              <ul className="space-y-2">
                {analysis.insights.map((insight: string, index: number) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <AlertTriangle size={16} className="text-yellow-600" />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!showInsights && !loading && (
        <div className="text-center py-8 text-gray-500">
          <Brain size={32} className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Click "Analyze" to get AI-powered insights</p>
        </div>
      )}
    </div>
  );
}
