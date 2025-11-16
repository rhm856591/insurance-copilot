'use client';

import { useState } from 'react';
import { Calendar, Clock, Bell, CheckCircle, AlertCircle, Phone, Mail, FileText, TrendingUp, Sparkles, ChevronDown, ChevronRight, MoreVertical } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

type NotificationCategory = 'all' | 'renewals' | 'followups' | 'compliance' | 'upsell';

interface Notification {
  id: string;
  category: 'renewals' | 'followups' | 'compliance' | 'upsell';
  title: string;
  description: string;
  customer: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  time: Date;
  actionable: boolean;
  expanded?: boolean;
}

interface TimelineEvent {
  time: string;
  title: string;
  customer: string;
  type: 'call' | 'email' | 'meeting' | 'review';
  status: 'upcoming' | 'in-progress' | 'completed';
}

export default function NotificationsPage() {
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>('all');
  const [expandedNotifications, setExpandedNotifications] = useState<Set<string>>(new Set());

  const notifications: Notification[] = [
    {
      id: '1',
      category: 'renewals',
      title: 'Policy Renewal Due',
      description: 'Health insurance policy expires in 15 days',
      customer: 'Rajesh Kumar',
      dueDate: '2/15/2024',
      priority: 'high',
      time: new Date('2024-11-15T09:00:00'),
      actionable: true,
    },
    {
      id: '2',
      category: 'followups',
      title: 'Follow-up Required',
      description: 'Customer inquiry about premium adjustment',
      customer: 'Priya Sharma',
      dueDate: '2/8/2024',
      priority: 'medium',
      time: new Date('2024-11-15T08:30:00'),
      actionable: true,
    },
    {
      id: '3',
      category: 'compliance',
      title: 'KYC Documentation',
      description: 'Customer KYC documents pending verification',
      customer: 'Amit Patel',
      dueDate: '2/10/2024',
      priority: 'medium',
      time: new Date('2024-11-14T16:00:00'),
      actionable: true,
    },
    {
      id: '4',
      category: 'upsell',
      title: 'Upsell Opportunity',
      description: 'Customer eligible for premium health coverage',
      customer: 'Sneha Mehta',
      dueDate: '2/12/2024',
      priority: 'low',
      time: new Date('2024-11-14T10:00:00'),
      actionable: true,
    },
    {
      id: '5',
      category: 'renewals',
      title: 'Premium Payment Overdue',
      description: 'Life insurance premium payment is 3 days overdue',
      customer: 'Vikram Singh',
      dueDate: '2/5/2024',
      priority: 'high',
      time: new Date('2024-11-13T14:00:00'),
      actionable: true,
    },
  ];

  const timelineEvents: TimelineEvent[] = [
    { time: '09:00', title: 'Renewal Call', customer: 'R. Kumar', type: 'call', status: 'upcoming' },
    { time: '11:30', title: 'Follow-up', customer: 'P. Sharma', type: 'email', status: 'upcoming' },
    { time: '14:00', title: 'KYC Review', customer: 'A. Patel', type: 'review', status: 'upcoming' },
    { time: '16:30', title: 'Policy Discussion', customer: 'S. Mehta', type: 'meeting', status: 'upcoming' },
  ];

  const categories = [
    { id: 'all' as const, label: 'All', icon: Bell, count: notifications.length },
    { id: 'renewals' as const, label: 'Renewals', icon: Calendar, count: notifications.filter(n => n.category === 'renewals').length },
    { id: 'followups' as const, label: 'Follow-ups', icon: Phone, count: notifications.filter(n => n.category === 'followups').length },
    { id: 'compliance' as const, label: 'Compliance', icon: FileText, count: notifications.filter(n => n.category === 'compliance').length },
    { id: 'upsell' as const, label: 'Upsell', icon: TrendingUp, count: notifications.filter(n => n.category === 'upsell').length },
  ];

  const filteredNotifications = activeCategory === 'all' 
    ? notifications 
    : notifications.filter(n => n.category === activeCategory);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedNotifications);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNotifications(newExpanded);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'renewals': return Calendar;
      case 'followups': return Phone;
      case 'compliance': return FileText;
      case 'upsell': return TrendingUp;
      default: return Bell;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'renewals': return 'bg-blue-500';
      case 'followups': return 'bg-green-500';
      case 'compliance': return 'bg-red-500';
      case 'upsell': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-500';
      case 'email': return 'bg-green-500';
      case 'review': return 'bg-red-500';
      case 'meeting': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityDots = (priority: string) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500',
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">
            Notifications
          </h1>
          <p className="text-xs md:text-sm text-gray-600 mt-1">Stay updated with your tasks</p>
        </div>
        <Badge variant="danger" className="text-xs md:text-sm px-3 py-1.5">
          {notifications.length} new
        </Badge>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all min-h-[44px] flex-shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
              }`}
            >
              <Icon size={14} className="md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">{category.label}</span>
              {category.count > 0 && (
                <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full font-semibold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-300 text-gray-700'
                }`}>
                  {category.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Today's Timeline */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-blue-600" size={18} />
          <h3 className="text-base md:text-lg font-semibold text-gray-900">Today's Timeline</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {timelineEvents.map((event, i) => {
            const color = getTimelineColor(event.type);
            return (
              <div
                key={i}
                className="flex-shrink-0 w-32 md:w-36 bg-white rounded-xl p-3 border border-gray-200 hover:shadow-md transition-shadow active:scale-95"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-xs font-semibold text-gray-900">{event.time}</span>
                </div>
                <p className="text-xs font-medium text-gray-900 mb-1">{event.title}</p>
                <p className="text-[10px] text-gray-600">{event.customer}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* AI Suggestion */}
      <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex-shrink-0">
            <Sparkles className="text-white" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2">
              AI suggests: Would you like to send a renewal reminder to Mr. Rajesh Kumar now?
            </h3>
            <p className="text-xs md:text-sm text-gray-700 mb-3">
              His policy expires in 15 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Send Reminder
              </Button>
              <Button size="sm" variant="outline">
                Schedule Later
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = getCategoryIcon(notification.category);
          const categoryColor = getCategoryColor(notification.category);
          const isExpanded = expandedNotifications.has(notification.id);
          
          return (
            <Card key={notification.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                {/* Category Icon */}
                <div className={`p-2.5 ${categoryColor} rounded-xl flex-shrink-0`}>
                  <Icon className="text-white" size={18} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm md:text-base font-semibold text-gray-900">
                          {notification.title}
                        </h4>
                        <div className="flex gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${getPriorityDots(notification.priority)}`} />
                          <div className={`w-1.5 h-1.5 rounded-full ${getPriorityDots(notification.priority)}`} />
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] md:text-xs text-gray-500">
                        <span>{notification.customer}</span>
                        <span>•</span>
                        <span>Due: {notification.dueDate}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleExpanded(notification.id)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
                    >
                      {isExpanded ? (
                        <ChevronDown size={18} className="text-gray-600" />
                      ) : (
                        <ChevronRight size={18} className="text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Actions */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button size="sm" className="flex-1 sm:flex-none">
                          Take Action
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                          <Clock size={14} className="mr-1" />
                          Snooze
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                          <Calendar size={14} className="mr-1" />
                          Reschedule
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <AlertCircle size={12} />
                        <span>AI suggests contacting between 6-8 PM for best response</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <Card className="text-center py-12">
          <Bell className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
          <p className="text-sm text-gray-600">
            You're all caught up! No {activeCategory !== 'all' ? activeCategory : ''} notifications at the moment.
          </p>
        </Card>
      )}
    </div>
  );
}
