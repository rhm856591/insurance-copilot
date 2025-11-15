import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface Lead {
  id: string;
  name: string;
  status: 'hot' | 'warm' | 'cold';
  sentiment: number;
  conversionProbability?: number;
  policyInterest: string;
}

interface LeadHeatmapProps {
  leads: Lead[];
}

export default function LeadHeatmap({ leads }: LeadHeatmapProps) {
  const getHeatColor = (probability: number) => {
    if (probability >= 0.7) return 'bg-red-500 hover:bg-red-600';
    if (probability >= 0.5) return 'bg-orange-400 hover:bg-orange-500';
    if (probability >= 0.3) return 'bg-yellow-400 hover:bg-yellow-500';
    return 'bg-blue-300 hover:bg-blue-400';
  };

  const sortedLeads = [...leads].sort((a, b) =>
    (b.conversionProbability || 0) - (a.conversionProbability || 0)
  );

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">AI Priority Heatmap</h3>
        <p className="text-sm text-gray-600">
          Color intensity indicates conversion probability. Darker = Higher priority.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {sortedLeads.map((lead) => (
          <button
            key={lead.id}
            className={cn(
              'p-4 rounded-lg text-white text-left transition-all transform hover:scale-105',
              getHeatColor(lead.conversionProbability || 0)
            )}
          >
            <div className="font-semibold text-sm mb-1">{lead.name}</div>
            <div className="text-xs opacity-90 mb-2">{lead.policyInterest}</div>
            <div className="text-xs font-bold">
              {Math.round((lead.conversionProbability || 0) * 100)}% probability
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-600">Hot (70%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-400 rounded"></div>
          <span className="text-gray-600">Warm (50-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          <span className="text-gray-600">Moderate (30-50%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-300 rounded"></div>
          <span className="text-gray-600">Cold (&lt;30%)</span>
        </div>
      </div>
    </Card>
  );
}
