'use client';

import { Calendar, Clock, Bell, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function NotificationsPage() {
  const notifications = [
    {
      id: '1',
      type: 'renewal',
      title: 'Policy Renewal Due',
      message: 'Sunita Desai - Policy #LIC6543 renewal due in 3 days',
      priority: 'high',
      time: new Date('2024-11-15T09:00:00'),
      actionable: true,
    },
    {
      id: '2',
      type: 'followup',
      title: 'Follow-up Reminder',
      message: 'Scheduled call with Amit Patel at 3:00 PM today',
      priority: 'medium',
      time: new Date('2024-11-15T08:30:00'),
      actionable: true,
    },
    {
      id: '3',
      type: 'compliance',
      title: 'Compliance Training',
      message: 'Quarterly compliance training session tomorrow at 4:00 PM',
      priority: 'medium',
      time: new Date('2024-11-14T16:00:00'),
      actionable: false,
    },
    {
      id: '4',
      type: 'upsell',
      title: 'Upsell Opportunity',
      message: 'Rajesh Kumar eligible for pension plan upgrade',
      priority: 'low',
      time: new Date('2024-11-14T10:00:00'),
      actionable: true,
    },
  ];

  const upcomingTasks = [
    { time: '3:00 PM', task: 'Follow-up call with Amit Patel', type: 'call' },
    { time: '5:30 PM', task: 'Send ULIP comparison to Priya Sharma', type: 'email' },
    { time: 'Tomorrow 10:00 AM', task: 'Policy renewal discussion - Sunita Desai', type: 'meeting' },
    { time: 'Tomorrow 4:00 PM', task: 'Compliance training session', type: 'training' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger' as const;
      case 'medium':
        return 'warning' as const;
      default:
        return 'info' as const;
    }
  };

  return (
    <div className="space-y-3 md:space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl md:text-3xl font-bold text-gray-900">
          Notifications & Reminders
        </h1>
        <p className="text-xs md:text-base text-gray-600 mt-1">Stay on top of your tasks</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        {/* Notifications */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Notifications</h3>
              <Button size="sm" variant="outline">Mark All Read</Button>
            </div>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 rounded-lg ${getPriorityColor(notification.priority)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                        <Badge variant={getPriorityBadge(notification.priority)}>
                          {notification.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.time.toLocaleString('en-IN')}
                      </p>
                    </div>
                    {notification.priority === 'high' && (
                      <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                    )}
                  </div>
                  {notification.actionable && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm">Take Action</Button>
                      <Button size="sm" variant="outline">Snooze</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* AI Suggestions */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Bell className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Recommendation</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Based on your schedule, consider contacting Amit Patel between 6-8 PM for better engagement.
                  His historical response rate is 85% during this time.
                </p>
                <Button size="sm">Reschedule Call</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold">Today's Timeline</h3>
            </div>
            <div className="space-y-4">
              {upcomingTasks.map((task, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock size={14} className="text-blue-600" />
                    </div>
                    {i < upcomingTasks.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-xs text-gray-500 mb-1">{task.time}</p>
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <Badge variant="info" className="mt-2 text-xs">
                      {task.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <CheckCircle size={16} className="mr-2" />
                View All Tasks
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar size={16} className="mr-2" />
                Schedule Follow-up
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Bell size={16} className="mr-2" />
                Set Custom Reminder
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
