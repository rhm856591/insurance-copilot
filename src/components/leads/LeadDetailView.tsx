'use client';

import { ArrowLeft, Mail, Phone, MapPin, IndianRupee, Calendar, TrendingUp, Clock, Lightbulb, FileText } from 'lucide-react';
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

interface LeadDetailViewProps {
  lead: ExtendedLead;
  onBack: () => void;
  onSendMessage?: () => void;
}

export default function LeadDetailView({ lead, onBack, onSendMessage }: LeadDetailViewProps) {
  const statusVariant = {
    hot: 'danger' as const,
    warm: 'warning' as const,
    cold: 'info' as const,
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">{lead.name}</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">{lead.policyInterest}</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">Status</p>
            <Badge variant={statusVariant[lead.status]} className="text-sm">
              {lead.status.toUpperCase()}
            </Badge>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">Sentiment</p>
            <SentimentBadge sentiment={lead.sentiment} />
          </div>
        </Card>
        {lead.conversionProbability && (
          <Card>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Conversion</p>
              <p className="text-xl font-bold text-green-600">
                {Math.round(lead.conversionProbability * 100)}%
              </p>
            </div>
          </Card>
        )}
        <Card>
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">Last Contact</p>
            <p className="text-sm font-semibold text-gray-900">{formatDate(lead.lastContact)}</p>
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      {lead.priorityReason && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-600 rounded-lg flex-shrink-0">
              <Lightbulb className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">AI Priority Reasoning</h3>
              <p className="text-sm text-gray-700">{lead.priorityReason}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Best Contact Time */}
      {lead.bestContactTime && (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-600 rounded-lg flex-shrink-0">
              <Clock className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Best Time to Contact</h3>
              <p className="text-sm text-gray-700">{lead.bestContactTime}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Contact Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Email</p>
              <p className="text-sm font-medium text-gray-900">{lead.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Phone size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Phone</p>
              <p className="text-sm font-medium text-gray-900">{lead.phone}</p>
            </div>
          </div>
          {lead.location && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Location</p>
                <p className="text-sm font-medium text-gray-900">{lead.location}</p>
              </div>
            </div>
          )}
          {lead.source && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp size={18} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Source</p>
                <p className="text-sm font-medium text-gray-900">{lead.source}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Demographics */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Demographics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {lead.age && (
            <div>
              <p className="text-xs text-gray-600 mb-1">Age</p>
              <p className="text-lg font-semibold text-gray-900">{lead.age} years</p>
            </div>
          )}
          {lead.income && (
            <div>
              <p className="text-xs text-gray-600 mb-1">Annual Income</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(lead.income)}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-600 mb-1">Policy Interest</p>
            <p className="text-sm font-semibold text-gray-900">{lead.policyInterest}</p>
          </div>
        </div>
      </Card>

      {/* Notes */}
      {lead.notes && (
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
              <FileText size={18} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
              <p className="text-sm text-gray-700">{lead.notes}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-white py-4 border-t">
        <Button
          className="flex-1 min-h-[44px]"
          onClick={onSendMessage}
        >
          Send Message
        </Button>
        <Button variant="outline" className="flex-1 min-h-[44px]">
          Schedule Follow-up
        </Button>
        <Button variant="outline" className="flex-1 min-h-[44px]">
          Update Status
        </Button>
      </div>
    </div>
  );
}
