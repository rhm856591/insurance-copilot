import Card from '@/components/ui/Card';
import ComplianceAlert from '@/components/compliance/ComplianceAlert';
import ToneAnalysis from '@/components/compliance/ToneAnalysis';
import Badge from '@/components/ui/Badge';
import { Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function CompliancePage() {
  const recentChecks = [
    {
      id: '1',
      message: 'Email to Rajesh Kumar about Term Life benefits',
      status: 'passed' as const,
      timestamp: new Date('2024-11-15T10:30:00'),
      issues: [],
    },
    {
      id: '2',
      message: 'WhatsApp message about ULIP returns',
      status: 'warning' as const,
      timestamp: new Date('2024-11-15T09:15:00'),
      issues: ['Avoid using "guaranteed returns" - use "potential returns" instead'],
    },
    {
      id: '3',
      message: 'Email draft about investment advice',
      status: 'failed' as const,
      timestamp: new Date('2024-11-14T16:45:00'),
      issues: [
        'Contains unlicensed investment advice',
        'Missing IRDAI disclaimer',
        'Uses prohibited term "risk-free"',
      ],
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Compliance Dashboard</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Monitor regulatory compliance</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 lg:gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Checks Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">47</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Shield className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Passed</p>
              <p className="text-2xl font-bold text-green-600 mt-1">42</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Issues Found</p>
              <p className="text-2xl font-bold text-red-600 mt-1">5</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <ComplianceAlert />

      <Card>
        <h3 className="text-lg font-semibold mb-4">Recent Compliance Checks</h3>
        <div className="space-y-4">
          {recentChecks.map((check) => (
            <div key={check.id} className="border-b last:border-0 pb-4 last:pb-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{check.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {check.timestamp.toLocaleString('en-IN')}
                  </p>
                </div>
                <Badge
                  variant={
                    check.status === 'passed'
                      ? 'success'
                      : check.status === 'warning'
                      ? 'warning'
                      : 'danger'
                  }
                >
                  {check.status === 'passed' && <CheckCircle size={14} className="mr-1" />}
                  {check.status === 'warning' && <AlertTriangle size={14} className="mr-1" />}
                  {check.status === 'failed' && <XCircle size={14} className="mr-1" />}
                  {check.status.toUpperCase()}
                </Badge>
              </div>
              {check.issues.length > 0 && (
                <ul className="list-disc list-inside text-sm text-red-600 space-y-1 mt-2">
                  {check.issues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Card>

      <ToneAnalysis />
    </div>
  );
}
