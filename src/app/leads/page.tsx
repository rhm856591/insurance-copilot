'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import LeadCard from '@/components/leads/LeadCard';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadHeatmap from '@/components/leads/LeadHeatmap';
import LeadDetailView from '@/components/leads/LeadDetailView';
import SendMessageModal from '@/components/communications/SendMessageModal';
import AISuggestions from '@/components/ai/AISuggestions';
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

export default function LeadsPage() {
  const [viewMode, setViewMode] = useState<'list' | 'heatmap'>('list');
  const [sortedLeads, setSortedLeads] = useState<ExtendedLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<ExtendedLead | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [detailViewLead, setDetailViewLead] = useState<ExtendedLead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      const result = await response.json();
      if (result.success) {
        // Convert lastContact string to Date object
        const leadsWithDates = result.data.map((lead: any) => ({
          ...lead,
          lastContact: new Date(lead.lastContact),
        }));
        setSortedLeads(leadsWithDates);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  // If viewing lead details, show detail view
  if (detailViewLead) {
    return (
      <LeadDetailView
        lead={detailViewLead}
        onBack={() => setDetailViewLead(null)}
        onSendMessage={() => {
          setSelectedLead(detailViewLead);
          setShowMessageModal(true);
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading leads...</p>
        </div>
      </div>
    );
  }

  const topLead = sortedLeads[0];
  const needsAttentionLead = sortedLeads.find(l => l.status === 'cold');

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

      {/* AI Suggestions - Collapsible with scroll */}
      <AISuggestions
        page="leads"
        data={{ totalLeads: sortedLeads.length, hotLeads: sortedLeads.filter(l => l.status === 'hot').length }}
        onActionClick={(suggestion) => {
          console.log('Action clicked:', suggestion);
          // Handle action
        }}
        defaultExpanded={false}
        maxHeight="350px"
      />

      {/* AI Insights */}
      {sortedLeads.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topLead && (
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Top Priority Today</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    {topLead.name} has {Math.round((topLead.conversionProbability || 0) * 100)}% conversion probability. 
                    Contact {topLead.bestContactTime || 'soon'} for best results.
                  </p>
                </div>
              </div>
            </Card>
          )}
          {needsAttentionLead && (
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-600 rounded-lg">
                  <AlertCircle className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Needs Attention</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    {needsAttentionLead.name} showing low engagement. Consider alternative communication channel.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

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
              onViewDetails={() => setDetailViewLead(lead)}
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
