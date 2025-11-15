'use client';

import { useState } from 'react';
import { Wand2, CheckCircle, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { checkCompliance } from '@/lib/api';
import { DraftAnalysis } from '@/types';

export default function DraftEditor() {
  const [draft, setDraft] = useState('');
  const [analysis, setAnalysis] = useState<DraftAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!draft.trim()) return;
    setLoading(true);
    try {
      const result = await checkCompliance(draft);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    const template = `Dear [Client Name],

Thank you for your interest in our life insurance policies. I'd be happy to help you understand the benefits and coverage options available.

Based on our discussion, I recommend exploring our Term Life Insurance plan, which provides comprehensive coverage at affordable premiums.

Key Features:
- Coverage amount: ₹[Amount]
- Policy term: [Years] years
- Premium: ₹[Premium]/year

I'm here to answer any questions you may have. Please feel free to reach out.

Best regards,
[Your Name]`;
    setDraft(template);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Draft Message</h3>
        <Button size="sm" variant="outline" onClick={handleGenerate}>
          <Wand2 size={16} className="mr-2" />
          Generate Template
        </Button>
      </div>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Type your message or generate a template..."
        className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      <div className="mt-4 flex gap-2">
        <Button onClick={handleAnalyze} disabled={loading || !draft.trim()}>
          {loading ? 'Analyzing...' : 'Analyze Draft'}
        </Button>
      </div>

      {analysis && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-sm text-gray-600">Sentiment:</span>
              <Badge variant={analysis.sentiment >= 0.6 ? 'success' : analysis.sentiment >= 0.3 ? 'warning' : 'danger'} className="ml-2">
                {analysis.sentiment >= 0.6 ? 'Positive' : analysis.sentiment >= 0.3 ? 'Neutral' : 'Negative'}
              </Badge>
            </div>
            <div>
              <span className="text-sm text-gray-600">Tone:</span>
              <span className="ml-2 text-sm font-medium">{analysis.tone}</span>
            </div>
          </div>

          {analysis.complianceCheck.isCompliant ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle size={18} />
              <span className="text-sm font-medium">Compliance Check Passed</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle size={18} />
                <span className="text-sm font-medium">Compliance Issues Detected</span>
              </div>
              <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                {analysis.complianceCheck.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.suggestions.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Suggestions:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {analysis.suggestions.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
