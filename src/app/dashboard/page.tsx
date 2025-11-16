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
          <Card key={stat.label} className="hover:shadow-md transition-shadow active:scale-[0.98]">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-sm text-gray-600 font-medium truncate">{stat.label}</p>
                  <p className="text-lg md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="p-1.5 md:p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg md:rounded-xl shadow-lg flex-shrink-0">
                  <stat.icon className="text-white" size={16} />
                </div>
              </div>
              <Badge variant={stat.variant} className="text-[10px] md:text-xs w-fit">{stat.change}</Badge>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-2">
        <Card>
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
              <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b last:border-0">
                <span className="text-xs md:text-sm text-gray-700">{activity.action}</span>
                <span className="text-[10px] md:text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Upcoming Tasks</h3>
          <div className="space-y-3">
            {[
              { task: 'Follow-up with Amit Patel', due: 'Today, 3:00 PM' },
              { task: 'Policy renewal reminder - Sunita Desai', due: 'Tomorrow' },
              { task: 'Send ULIP comparison to Vikram Singh', due: 'Tomorrow' },
              { task: 'Compliance training session', due: 'Friday' },
            ].map((task, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b last:border-0">
                <span className="text-xs md:text-sm text-gray-700">{task.task}</span>
                <span className="text-[10px] md:text-xs text-gray-500 whitespace-nowrap">{task.due}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
