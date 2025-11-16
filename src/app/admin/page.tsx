'use client';

import { useState } from 'react';
import { Shield, MessageSquare, FileText, AlertTriangle, Download, Filter } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

type TabType = 'communications' | 'templates' | 'audit' | 'guardrails';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('communications');

  const tabs = [
    { id: 'communications' as TabType, label: 'Communications', icon: MessageSquare },
    { id: 'templates' as TabType, label: 'Templates', icon: FileText },
    { id: 'audit' as TabType, label: 'Audit Log', icon: Shield },
    { id: 'guardrails' as TabType, label: 'Guardrails', icon: AlertTriangle },
  ];

  const communications = [
    {
      id: '1',
      agent: 'Rajesh Kumar',
      customer: 'Amit Patel',
      channel: 'WhatsApp',
      message: 'Your policy renewal is due on Nov 20. Please pay ₹45,000 to continue coverage.',
      sentiment: 0.7,
      compliance: 'passed',
      timestamp: new Date('2024-11-15T10:30:00'),
    },
    {
      id: '2',
      agent: 'Priya Sharma',
      customer: 'Sunita Desai',
      channel: 'Email',
      message: 'Our ULIP offers guaranteed returns of 12% annually...',
      sentiment: 0.5,
      compliance: 'flagged',
      timestamp: new Date('2024-11-15T09:15:00'),
      issues: ['Contains prohibited term: "guaranteed returns"'],
    },
    {
      id: '3',
      agent: 'Vikram Singh',
      customer: 'Meera Joshi',
      channel: 'SMS',
      message: 'Thank you for your interest. Our term plan provides comprehensive coverage.',
      sentiment: 0.8,
      compliance: 'passed',
      timestamp: new Date('2024-11-14T16:45:00'),
    },
  ];

  const templates = [
    {
      id: '1',
      name: 'Policy Renewal Reminder',
      category: 'Renewal',
      status: 'approved',
      lastUpdated: new Date('2024-11-01'),
      usage: 156,
    },
    {
      id: '2',
      name: 'ULIP Product Introduction',
      category: 'Lead Nurture',
      status: 'approved',
      lastUpdated: new Date('2024-10-28'),
      usage: 89,
    },
    {
      id: '3',
      name: 'Premium Payment Confirmation',
      category: 'Transactional',
      status: 'approved',
      lastUpdated: new Date('2024-10-15'),
      usage: 234,
    },
    {
      id: '4',
      name: 'Investment Advisory Draft',
      category: 'Upsell',
      status: 'pending',
      lastUpdated: new Date('2024-11-14'),
      usage: 0,
    },
  ];

  const auditLogs = [
    {
      id: '1',
      agent: 'Rajesh Kumar',
      action: 'Sent Message',
      target: 'Customer: Amit Patel',
      status: 'success',
      timestamp: new Date('2024-11-15T10:30:00'),
    },
    {
      id: '2',
      agent: 'Priya Sharma',
      action: 'Message Flagged',
      target: 'Compliance violation detected',
      status: 'warning',
      timestamp: new Date('2024-11-15T09:15:00'),
    },
    {
      id: '3',
      agent: 'Admin',
      action: 'Template Approved',
      target: 'Template: Policy Renewal Reminder',
      status: 'success',
      timestamp: new Date('2024-11-14T14:20:00'),
    },
    {
      id: '4',
      agent: 'System',
      action: 'Auto-corrected',
      target: 'Removed prohibited term from draft',
      status: 'info',
      timestamp: new Date('2024-11-14T11:05:00'),
    },
  ];

  const guardrails = [
    { term: 'guaranteed returns', category: 'Investment Claims', severity: 'high', blocked: 23 },
    { term: 'risk-free', category: 'Investment Claims', severity: 'high', blocked: 15 },
    { term: 'assured profit', category: 'Investment Claims', severity: 'high', blocked: 8 },
    { term: 'tax-free', category: 'Tax Claims', severity: 'medium', blocked: 12 },
    { term: 'best investment', category: 'Comparative Claims', severity: 'medium', blocked: 19 },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Compliance oversight</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4 lg:gap-6">
        <Card className="active:scale-[0.98] transition-transform">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] md:text-sm text-gray-600 truncate">Total Communications</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">1,247</p>
            </div>
            <MessageSquare className="text-blue-600 flex-shrink-0" size={18} />
          </div>
        </Card>
        <Card className="active:scale-[0.98] transition-transform">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] md:text-sm text-gray-600 truncate">Compliance Rate</p>
              <p className="text-lg md:text-2xl font-bold text-green-600 mt-1">94.2%</p>
            </div>
            <Shield className="text-green-600 flex-shrink-0" size={18} />
          </div>
        </Card>
        <Card className="active:scale-[0.98] transition-transform">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] md:text-sm text-gray-600 truncate">Flagged Today</p>
              <p className="text-lg md:text-2xl font-bold text-red-600 mt-1">8</p>
            </div>
            <AlertTriangle className="text-red-600 flex-shrink-0" size={18} />
          </div>
        </Card>
        <Card className="active:scale-[0.98] transition-transform">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] md:text-sm text-gray-600 truncate">Active Templates</p>
              <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <FileText className="text-blue-600 flex-shrink-0" size={18} />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 -mx-4 md:mx-0 px-4 md:px-0 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2 md:gap-4 min-w-max md:min-w-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-3 border-b-2 transition-colors whitespace-nowrap min-h-[44px] ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="text-xs md:text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'communications' && (
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold">Recent Communications</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Filter size={14} className="mr-1 md:mr-2" />
                <span className="text-xs md:text-sm">Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Download size={14} className="mr-1 md:mr-2" />
                <span className="text-xs md:text-sm">Export</span>
              </Button>
            </div>
          </div>
          <div className="space-y-3 md:space-y-4">
            {communications.map((comm) => (
              <div key={comm.id} className="border border-gray-200 rounded-lg p-3 md:p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm md:text-base font-semibold text-gray-900">{comm.agent}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-xs md:text-sm text-gray-700">{comm.customer}</span>
                      <Badge variant="info" className="text-[10px] md:text-xs">{comm.channel}</Badge>
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-500">{comm.timestamp.toLocaleString('en-IN')}</p>
                  </div>
                  <Badge variant={comm.compliance === 'passed' ? 'success' : 'danger'} className="w-fit text-[10px] md:text-xs">
                    {comm.compliance === 'passed' ? 'Compliant' : 'Flagged'}
                  </Badge>
                </div>
                <p className="text-xs md:text-sm text-gray-700 mb-3 p-2 md:p-3 bg-gray-50 rounded">{comm.message}</p>
                {comm.issues && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-2 md:p-3 rounded mb-3">
                    <p className="text-xs md:text-sm font-semibold text-red-900 mb-1">Compliance Issues:</p>
                    <ul className="list-disc list-inside text-xs md:text-sm text-red-800">
                      {comm.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">View Thread</Button>
                  {comm.compliance === 'flagged' && (
                    <Button size="sm" variant="outline" className="w-full sm:w-auto">Review & Approve</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'templates' && (
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold">Message Templates</h3>
            <Button size="sm" className="w-full sm:w-auto">Add New Template</Button>
          </div>
          <div className="space-y-3">
            {templates.map((template) => (
              <div key={template.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-transform">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base font-semibold text-gray-900">{template.name}</h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs md:text-sm text-gray-600">
                    <span>Category: {template.category}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Used {template.usage} times</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden md:inline">Updated {template.lastUpdated.toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <Badge variant={template.status === 'approved' ? 'success' : 'warning'} className="text-[10px] md:text-xs">
                    {template.status}
                  </Badge>
                  <Button size="sm" variant="outline" className="flex-1 sm:flex-none">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'audit' && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Audit Log</h3>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export Log
            </Button>
          </div>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 border-l-4 border-gray-300 bg-gray-50 rounded">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-gray-900">{log.agent}</span>
                    <Badge variant={
                      log.status === 'success' ? 'success' :
                      log.status === 'warning' ? 'warning' : 'info'
                    }>
                      {log.action}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{log.target}</p>
                  <p className="text-xs text-gray-500 mt-1">{log.timestamp.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'guardrails' && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Compliance Guardrails</h3>
            <Button size="sm">Add New Rule</Button>
          </div>
          <div className="space-y-3">
            {guardrails.map((rule, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{rule.term}</span>
                    <Badge variant={rule.severity === 'high' ? 'danger' : 'warning'}>
                      {rule.severity} severity
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Category: {rule.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-600">{rule.blocked}</p>
                  <p className="text-xs text-gray-600">times blocked</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
