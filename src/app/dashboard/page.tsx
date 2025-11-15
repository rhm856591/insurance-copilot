import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { TrendingUp, Users, MessageSquare, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Active Leads', value: '24', change: '+12%', icon: Users, variant: 'success' as const },
    { label: 'Messages Today', value: '156', change: '+8%', icon: MessageSquare, variant: 'info' as const },
    { label: 'Conversion Rate', value: '18%', change: '+3%', icon: TrendingUp, variant: 'success' as const },
    { label: 'Compliance Alerts', value: '2', change: '-50%', icon: AlertCircle, variant: 'warning' as const },
  ];

  return (
    <div className="space-y-3 md:space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl md:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-xs md:text-base text-gray-600 mt-1">Overview of your performance</p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={stat.label} hover gradient className="animate-slideUp" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</p>
                <p className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-1">
                  {stat.value}
                </p>
                <Badge variant={stat.variant} className="mt-2 text-xs">{stat.change}</Badge>
              </div>
              <div className="p-2 md:p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
                <stat.icon className="text-white" size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-2">
        <Card gradient>
          <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Recent Activities
          </h3>
          <div className="space-y-3">
            {[
              { action: 'Follow-up sent to Rajesh Kumar', time: '10 mins ago' },
              { action: 'Policy comparison generated', time: '25 mins ago' },
              { action: 'Lead qualified: Priya Sharma', time: '1 hour ago' },
              { action: 'Compliance check passed', time: '2 hours ago' },
            ].map((activity, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="text-sm text-gray-700">{activity.action}</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Upcoming Tasks</h3>
          <div className="space-y-3">
            {[
              { task: 'Follow-up with Amit Patel', due: 'Today, 3:00 PM' },
              { task: 'Policy renewal reminder - Sunita Desai', due: 'Tomorrow' },
              { task: 'Send ULIP comparison to Vikram Singh', due: 'Tomorrow' },
              { task: 'Compliance training session', due: 'Friday' },
            ].map((task, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="text-sm text-gray-700">{task.task}</span>
                <span className="text-xs text-gray-500">{task.due}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
