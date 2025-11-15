import { Mail, Phone, Calendar, FileText, MapPin, IndianRupee, Lightbulb, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SentimentBadge from './SentimentBadge';
import { Lead } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';

interface ExtendedLead extends Lead {
  age?: number;
  income?: number;
  location?: string;
  source?: string;
  conversionProbability?: number;
  priorityReason?: string;
  bestContactTime?: string;
}

interface LeadCardProps {
  lead: ExtendedLead;
  onSendMessage?: () => void;
  onViewDetails?: () => void;
}

export default function LeadCard({ lead, onSendMessage, onViewDetails }: LeadCardProps) {
  const statusVariant = {
    hot: 'danger' as const,
    warm: 'warning' as const,
    cold: 'info' as const,
  };

  return (
    <Card className="hover:shadow-lg transition-shadow active:scale-[0.98]">
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
          <p className="text-sm text-gray-600">{lead.policyInterest}</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <Badge variant={statusVariant[lead.status]}>
            {lead.status.toUpperCase()}
          </Badge>
          <SentimentBadge sentiment={lead.sentiment} />
          {lead.conversionProbability && (
            <Badge variant="success">
              {Math.round(lead.conversionProbability * 100)}% Conv.
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail size={14} />
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Phone size={14} />
          <span>{lead.phone}</span>
        </div>
        {lead.location && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={14} />
            <span>{lead.location}</span>
          </div>
        )}
        {lead.income && (
          <div className="flex items-center gap-2 text-gray-600">
            <IndianRupee size={14} />
            <span>{formatCurrency(lead.income)}/year</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={14} />
          <span>Last: {formatDate(lead.lastContact)}</span>
        </div>
        {lead.age && (
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-medium">Age: {lead.age}</span>
          </div>
        )}
      </div>

      {lead.priorityReason && (
        <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
          <div className="flex items-start gap-2">
            <Lightbulb size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-blue-900 mb-1">AI Priority Reasoning</p>
              <p className="text-xs text-blue-800">{lead.priorityReason}</p>
            </div>
          </div>
        </div>
      )}

      {lead.bestContactTime && (
        <div className="mb-4 p-2 bg-green-50 rounded flex items-center gap-2">
          <Clock size={14} className="text-green-600" />
          <p className="text-xs text-green-800">
            <span className="font-semibold">Best time to contact:</span> {lead.bestContactTime}
          </p>
        </div>
      )}

      {lead.notes && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-2">
            <FileText size={16} className="text-gray-500 mt-0.5" />
            <p className="text-sm text-gray-700">{lead.notes}</p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 min-h-[44px] text-xs md:text-sm"
          onClick={onSendMessage}
        >
          Send Message
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 min-h-[44px] text-xs md:text-sm"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
