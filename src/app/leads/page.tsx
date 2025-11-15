'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import LeadCard from '@/components/leads/LeadCard';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadHeatmap from '@/components/leads/LeadHeatmap';
import SendMessageModal from '@/components/communications/SendMessageModal';
import { Lead } from '@/types';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface ExtendedLead extends Lead {
  age?: number;
  income?: number;
  location?: string;
  source?: string;
  conversionProbability?: number;
  priorityReason?: string;
  bestContactTime?: string;
}

const mockLeads: ExtendedLead[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    status: 'hot',
    sentiment: 0.85,
    lastContact: new Date('2024-11-14'),
    policyInterest: 'Term Life Insurance',
    notes: 'Interested in 1 Cr coverage, follow up on premium calculation',
    age: 35,
    income: 1200000,
    location: 'Mumbai',
    source: 'Website',
    conversionProbability: 0.82,
    priorityReason: 'High engagement score, requested premium quote, budget confirmed',
    bestContactTime: '6:00 PM - 8:00 PM',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43211',
    status: 'warm',
    sentiment: 0.65,
    lastContact: new Date('2024-11-13'),
    policyInterest: 'ULIP',
    notes: 'Comparing with other providers, needs detailed benefit explanation',
    age: 32,
    income: 950000,
    location: 'Bangalore',
    source: 'Referral',
    conversionProbability: 0.58,
    priorityReason: 'Active comparison phase, responded positively to last email',
    bestContactTime: '10:00 AM - 12:00 PM',
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91 98765 43212',
    status: 'warm',
    sentiment: 0.55,
    lastContact: new Date('2024-11-12'),
    policyInterest: 'Child Plan',
    notes: 'Looking for education planning, daughter is 5 years old',
    age: 38,
    income: 850000,
    location: 'Ahmedabad',
    source: 'Social Media',
    conversionProbability: 0.52,
    priorityReason: 'Strong intent for child education, needs tenure clarification',
    bestContactTime: '7:00 PM - 9:00 PM',
  },
  {
    id: '4',
    name: 'Sunita Desai',
    email: 'sunita.desai@email.com',
    phone: '+91 98765 43213',
    status: 'cold',
    sentiment: 0.25,
    lastContact: new Date('2024-11-08'),
    policyInterest: 'Pension Plan',
    notes: 'Not responding to follow-ups, may need different approach',
    age: 45,
    income: 750000,
    location: 'Pune',
    source: 'Cold Call',
    conversionProbability: 0.18,
    priorityReason: 'Low engagement, multiple follow-ups missed, consider re-engagement strategy',
    bestContactTime: '4:00 PM - 6:00 PM',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 98765 43214',
    status: 'hot',
    sentiment: 0.78,
    lastContact: new Date('2024-11-15'),
    policyInterest: 'Term Life Insurance',
    notes: 'Ready to proceed, waiting for final documents',
    age: 29,
    income: 1500000,
    location: 'Delhi',
    source: 'Website',
    conversionProbability: 0.88,
    priorityReason: 'Immediate conversion opportunity, all objections addressed',
    bestContactTime: '12:00 PM - 2:00 PM',
  },
];

export default function LeadsPage() {
  const [viewMode, setViewMode] = useState<'list' | 'heatmap'>('list');
  const [sortedLeads, setSortedLeads] = useState(mockLeads);
  const [selectedLead, setSelectedLead] = useState<ExtendedLead | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">AI-driven lead prioritization</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-lg transition-colors text-sm min-h-[44px] active:scale-95 ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`flex-1 md:flex-none px-3 md:px-4 py-2 rounded-lg transition-colors text-sm min-h-[44px] active:scale-95 ${
              viewMode === 'heatmap'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Heatmap
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Top Priority Today</h3>
              <p className="text-sm text-gray-700 mt-1">
                Vikram Singh has 88% conversion probability. Contact between 12-2 PM for best results.
              </p>
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <AlertCircle className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Needs Attention</h3>
              <p className="text-sm text-gray-700 mt-1">
                Sunita Desai showing low engagement. Consider alternative communication channel.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <LeadFilters />

      {viewMode === 'heatmap' ? (
        <LeadHeatmap leads={sortedLeads} />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          {sortedLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onSendMessage={() => {
                setSelectedLead(lead);
                setShowMessageModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Send Message Modal */}
      {selectedLead && (
        <SendMessageModal
          isOpen={showMessageModal}
          onClose={() => {
            setShowMessageModal(false);
            setSelectedLead(null);
          }}
          recipient={{
            name: selectedLead.name,
            email: selectedLead.email,
            phone: selectedLead.phone,
          }}
          context={`Follow up with ${selectedLead.name} regarding ${selectedLead.policyInterest}. ${selectedLead.notes}`}
        />
      )}
    </div>
  );
}
