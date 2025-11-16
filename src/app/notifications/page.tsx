'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, CheckCircle, AlertCircle, Phone, Mail, FileText, TrendingUp, Sparkles, ChevronDown, ChevronRight, MoreVertical, MessageSquare, Send, Zap } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AISuggestions from '@/components/ai/AISuggestions';

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
  aiInsight?: string;
  suggestedAction?: string;
  bestContactTime?: string;
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
  const [draftingMessage, setDraftingMessage] = useState<string | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState<{ whatsapp: string; email: string } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const result = await response.json();
      if (result.success) {
        setNotifications(result.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const oldNotifications: Notification[] = [
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
      aiInsight: 'Customer has been with us for 5 years. High retention probability.',
      suggestedAction: 'Send personalized renewal reminder with loyalty discount offer',
      bestContactTime: '6:00 PM - 8:00 PM (Based on past response patterns)',
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
      aiInsight: 'Customer is price-sensitive. Responded well to detailed breakdowns.',
      suggestedAction: 'Provide premium comparison chart with tax benefits',
      bestContactTime: '11:00 AM - 1:00 PM (Lunch break)',
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
      aiInsight: 'Documents submitted but missing PAN card copy.',
      suggestedAction: 'Send WhatsApp with simple upload link and instructions',
      bestContactTime: '9:00 AM - 11:00 AM (Morning hours)',
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
      aiInsight: 'Recently married. Good candidate for family floater plan.',
      suggestedAction: 'Offer family health plan with spouse coverage benefits',
      bestContactTime: '7:00 PM - 9:00 PM (Evening)',
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
      aiInsight: 'Payment usually delayed by 2-3 days. Not a default risk.',
      suggestedAction: 'Send friendly reminder with easy payment link',
      bestContactTime: '5:00 PM - 7:00 PM (After work)',
    },
  ];

  // Generate timeline from notifications
  const timelineEvents: TimelineEvent[] = notifications.slice(0, 4).map((notif, index) => ({
    time: `${9 + index * 2}:${index % 2 === 0 ? '00' : '30'}`,
    title: notif.title,
    customer: notif.customer.split(' ').map(n => n[0]).join('. ') + '.',
    type: ['call', 'email', 'review', 'meeting'][index % 4] as 'call' | 'email' | 'review' | 'meeting',
    status: 'upcoming' as const,
  }));

  const oldTimelineEvents: TimelineEvent[] = [
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

  const handleGenerateMessage = async (notification: Notification) => {
    setDraftingMessage(notification.id);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Draft a ${notification.category} message for ${notification.customer}. Context: ${notification.description}. ${notification.suggestedAction || ''}`,
        }),
      });

      const result = await response.json();
      
      if (result.success && result.data) {
        setGeneratedMessage({
          whatsapp: result.data.whatsapp,
          email: result.data.email,
        });
      }
    } catch (error) {
      console.error('Failed to generate message:', error);
      // Fallback message
      setGeneratedMessage({
        whatsapp: `Hi ${notification.customer.split(' ')[0]}, this is a reminder about ${notification.description}. Please let us know if you need any assistance. Thanks!`,
        email: `Dear ${notification.customer},\n\nThis is a friendly reminder regarding ${notification.description}.\n\nPlease feel free to reach out if you have any questions.\n\nBest regards,\nYour Insurance Team`,
      });
    } finally {
      setDraftingMessage(null);
    }
  };

  const handleAISuggestionClick = (action: string) => {
    // Handle AI suggestion actions
    console.log('AI Suggestion clicked:', action);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

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

      {/* AI Suggestions */}
      <AISuggestions
        page="notifications"
        onActionClick={(suggestion) => handleAISuggestionClick(suggestion.action)}
        defaultExpanded={false}
        maxHeight="400px"
      />

      {/* Smart AI Insight Card */}
      {notifications.length > 0 && notifications[0] && (
        <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex-shrink-0">
              <Sparkles className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2">
                🎯 AI Priority Insight
              </h3>
              <p className="text-xs md:text-sm text-gray-700 mb-3">
                Focus on <strong>{notifications[0].customer}'s {notifications[0].category}</strong> first. {notifications[0].aiInsight} Best contact time: {notifications[0].bestContactTime}.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => handleGenerateMessage(notifications[0])}
                  disabled={draftingMessage === notifications[0].id}
                >
                  {draftingMessage === notifications[0].id ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Drafting...
                    </>
                  ) : (
                    <>
                      <Zap size={14} className="mr-1" />
                      Auto-Draft Message
                    </>
                  )}
                </Button>
                <Button size="sm" variant="outline">
                  Schedule for {notifications[0].bestContactTime?.split(' - ')[0]}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Generated Message Preview */}
      {generatedMessage && (
        <Card className="bg-white border-2 border-blue-200 animate-fadeIn">
          <div className="flex items-start gap-3 mb-4">
            <MessageSquare className="text-blue-600" size={20} />
            <div className="flex-1">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                AI Generated Messages
              </h3>
              <p className="text-xs text-gray-600">Review and send or customize</p>
            </div>
            <button
              onClick={() => setGeneratedMessage(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3">
            {/* WhatsApp Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={14} className="text-green-600" />
                <span className="text-xs font-semibold text-green-900">WhatsApp</span>
              </div>
              <p className="text-xs text-gray-700 mb-3">{generatedMessage.whatsapp}</p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full">
                <Send size={12} className="mr-1" />
                Send via WhatsApp
              </Button>
            </div>

            {/* Email Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={14} className="text-blue-600" />
                <span className="text-xs font-semibold text-blue-900">Email</span>
              </div>
              <p className="text-xs text-gray-700 whitespace-pre-wrap mb-3">{generatedMessage.email}</p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full">
                <Send size={12} className="mr-1" />
                Send via Email
              </Button>
            </div>
          </div>
        </Card>
      )}

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
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                      {/* AI Insights */}
                      {notification.aiInsight && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Sparkles size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-purple-900 mb-1">AI Insight</p>
                              <p className="text-xs text-gray-700 mb-2">{notification.aiInsight}</p>
                              {notification.suggestedAction && (
                                <p className="text-xs text-purple-700">
                                  <strong>Suggested:</strong> {notification.suggestedAction}
                                </p>
                              )}
                              {notification.bestContactTime && (
                                <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
                                  <Clock size={12} className="text-blue-600" />
                                  <span>{notification.bestContactTime}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          onClick={() => handleGenerateMessage(notification)}
                          disabled={draftingMessage === notification.id}
                        >
                          {draftingMessage === notification.id ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Drafting...
                            </>
                          ) : (
                            <>
                              <Sparkles size={14} className="mr-1" />
                              AI Draft Message
                            </>
                          )}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                          <Phone size={14} className="mr-1" />
                          Call Now
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                          <Clock size={14} className="mr-1" />
                          Snooze
                        </Button>
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
