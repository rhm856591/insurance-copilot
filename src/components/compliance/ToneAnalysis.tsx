import Card from '@/components/ui/Card';
import { BarChart3 } from 'lucide-react';

export default function ToneAnalysis() {
  const toneData = [
    { tone: 'Professional', percentage: 85, color: 'bg-blue-600' },
    { tone: 'Friendly', percentage: 70, color: 'bg-green-600' },
    { tone: 'Persuasive', percentage: 60, color: 'bg-purple-600' },
    { tone: 'Empathetic', percentage: 75, color: 'bg-pink-600' },
  ];

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={20} className="text-gray-700" />
        <h3 className="text-lg font-semibold">Communication Tone Analysis</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Average tone metrics from your recent client communications
      </p>
      <div className="space-y-4">
        {toneData.map((item) => (
          <div key={item.tone}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">{item.tone}</span>
              <span className="text-gray-600">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
