import { AlertTriangle, Info } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function ComplianceAlert() {
  const alerts = [
    {
      type: 'warning' as const,
      title: 'Prohibited Terms Detected',
      message: 'Recent messages contain terms like "guaranteed returns". Please review IRDAI guidelines.',
    },
    {
      type: 'info' as const,
      title: 'Compliance Training Due',
      message: 'Your quarterly compliance training is due on November 20, 2024.',
    },
  ];

  return (
    <div className="space-y-4">
      {alerts.map((alert, i) => (
        <Card key={i} className={alert.type === 'warning' ? 'border-yellow-300 bg-yellow-50' : 'border-blue-300 bg-blue-50'}>
          <div className="flex gap-3">
            {alert.type === 'warning' ? (
              <AlertTriangle className="text-yellow-600 flex-shrink-0" size={24} />
            ) : (
              <Info className="text-blue-600 flex-shrink-0" size={24} />
            )}
            <div>
              <h4 className={`font-semibold ${alert.type === 'warning' ? 'text-yellow-900' : 'text-blue-900'}`}>
                {alert.title}
              </h4>
              <p className={`text-sm mt-1 ${alert.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'}`}>
                {alert.message}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
