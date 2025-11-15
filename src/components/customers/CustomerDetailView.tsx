'use client';

import { ArrowLeft, Phone, Mail, MapPin, Briefcase, Users as UsersIcon, Calendar, MessageSquare, Lightbulb } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';

interface CustomerDetailViewProps {
  customer: any;
  onBack: () => void;
}

export default function CustomerDetailView({ customer, onBack }: CustomerDetailViewProps) {
  const communications = [
    {
      id: '1',
      type: 'email',
      content: 'Sent policy renewal reminder',
      timestamp: new Date('2024-11-10T14:30:00'),
      sentiment: 0.7,
    },
    {
      id: '2',
      type: 'whatsapp',
      content: 'Client asked about premium payment options',
      timestamp: new Date('2024-11-08T10:15:00'),
      sentiment: 0.6,
      keyMoment: true,
    },
    {
      id: '3',
      type: 'call',
      content: 'Discussed policy benefits and coverage',
      timestamp: new Date('2024-11-05T16:45:00'),
      sentiment: 0.85,
    },
  ];

  const aiRecommendations = [
    {
      title: 'Send Premium Reminder',
      description: 'Policy renewal due in 5 days. High priority.',
      action: 'Draft Message',
      priority: 'high',
    },
    {
      title: 'Upsell Opportunity',
      description: 'Customer profile suggests interest in retirement planning. Consider pension plan.',
      action: 'View Plans',
      priority: 'medium',
    },
    {
      title: 'Best Contact Time',
      description: 'Historical data shows customer responds best between 6-8 PM.',
      action: 'Schedule Call',
      priority: 'low',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
          <p className="text-gray-600 mt-1">Customer Details & Insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Customer Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium">{customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">Mumbai, Maharashtra</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Occupation</p>
                    <p className="text-sm font-medium">Software Engineer</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <UsersIcon size={18} className="text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Dependents</p>
                    <p className="text-sm font-medium">Spouse + 2 Children</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">Age</p>
                    <p className="text-sm font-medium">38 years</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Policy Portfolio */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Policy Portfolio</h3>
            <div className="space-y-4">
              {customer.policies.map((policy: any) => (
                <div key={policy.number} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{policy.type}</h4>
                      <p className="text-sm text-gray-600">Policy #{policy.number}</p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Sum Assured</p>
                      <p className="font-semibold">{formatCurrency(policy.sumAssured)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Premium</p>
                      <p className="font-semibold">{formatCurrency(policy.premium)}/year</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tenure</p>
                      <p className="font-semibold">{policy.tenure} years</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Paying Term</p>
                      <p className="font-semibold">{policy.payingTerm} years</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Next Renewal</span>
                      <span className="text-sm font-medium text-red-600">
                        {formatDate(customer.renewalDate)} ({customer.daysToRenewal} days)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Communication Timeline */}
          <Card>
            <h3 className="text-lg font-semibold mb-4">Communication Timeline</h3>
            <div className="space-y-4">
              {communications.map((comm) => (
                <div key={comm.id} className="flex gap-4 pb-4 border-b last:border-0">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare size={18} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{comm.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {comm.timestamp.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <Badge variant={comm.sentiment >= 0.6 ? 'success' : 'warning'}>
                        {Math.round(comm.sentiment * 100)}%
                      </Badge>
                    </div>
                    {comm.keyMoment && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                        <Lightbulb size={14} />
                        <span>Key Moment</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - AI Recommendations */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
            <div className="space-y-4">
              {aiRecommendations.map((rec, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.priority === 'high'
                      ? 'bg-red-50 border-red-500'
                      : rec.priority === 'medium'
                      ? 'bg-yellow-50 border-yellow-500'
                      : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-xs text-gray-600 mb-3">{rec.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    {rec.action}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full">Send Message</Button>
              <Button variant="outline" className="w-full">
                Schedule Follow-up
              </Button>
              <Button variant="outline" className="w-full">
                Generate Report
              </Button>
              <Button variant="outline" className="w-full">
                View Full History
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Scheduled Follow-ups</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Premium Payment Reminder</p>
                <p className="text-xs text-gray-600 mt-1">Today, 6:00 PM</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Policy Review Call</p>
                <p className="text-xs text-gray-600 mt-1">Tomorrow, 10:00 AM</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
