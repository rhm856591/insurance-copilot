'use client';

import { useState } from 'react';
import { Search, Phone, Mail, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import CustomerDetailView from '@/components/customers/CustomerDetailView';
import SendMessageModal from '@/components/communications/SendMessageModal';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  policies: Array<{
    number: string;
    type: string;
    sumAssured: number;
    premium: number;
    tenure: number;
    payingTerm: number;
  }>;
  renewalDate: Date;
  sentiment: number;
  followUpStatus: 'scheduled' | 'pending' | 'completed';
  nextEvent: string;
  daysToRenewal: number;
  tags: string[];
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    policies: [
      { number: 'LIC8921', type: 'Term Life', sumAssured: 10000000, premium: 45000, tenure: 30, payingTerm: 20 },
    ],
    renewalDate: new Date('2024-11-20'),
    sentiment: 0.85,
    followUpStatus: 'scheduled',
    nextEvent: 'Premium payment reminder',
    daysToRenewal: 5,
    tags: ['High Value', 'Loyal Customer'],
  },
  {
    id: '2',
    name: 'Priya Sharma',
    phone: '+91 98765 43211',
    email: 'priya.sharma@email.com',
    policies: [
      { number: 'LIC7634', type: 'ULIP', sumAssured: 5000000, premium: 32000, tenure: 15, payingTerm: 10 },
      { number: 'LIC7635', type: 'Child Plan', sumAssured: 2000000, premium: 18000, tenure: 20, payingTerm: 15 },
    ],
    renewalDate: new Date('2024-12-05'),
    sentiment: 0.65,
    followUpStatus: 'pending',
    nextEvent: 'Policy review call',
    daysToRenewal: 20,
    tags: ['Multiple Policies'],
  },
  {
    id: '3',
    name: 'Sunita Desai',
    phone: '+91 98765 43213',
    email: 'sunita.desai@email.com',
    policies: [
      { number: 'LIC6543', type: 'Endowment', sumAssured: 3000000, premium: 28000, tenure: 25, payingTerm: 20 },
    ],
    renewalDate: new Date('2024-11-18'),
    sentiment: 0.35,
    followUpStatus: 'pending',
    nextEvent: 'Urgent renewal follow-up',
    daysToRenewal: 3,
    tags: ['At Risk', 'Renewal Due'],
  },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [sortBy, setSortBy] = useState<'renewal' | 'sentiment' | 'value'>('renewal');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState<Customer | null>(null);

  const filteredCustomers = mockCustomers
    .filter((customer) => {
      const query = searchQuery.toLowerCase();
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.phone.includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.policies.some((p) => p.number.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'renewal') return a.daysToRenewal - b.daysToRenewal;
      if (sortBy === 'sentiment') return b.sentiment - a.sentiment;
      return 0;
    });

  const getRenewalColor = (days: number) => {
    if (days <= 7) return 'text-red-600 bg-red-50';
    if (days <= 30) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  if (selectedCustomer) {
    return (
      <CustomerDetailView
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
      />
    );
  }

  return (
    <div className="space-y-3 md:space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl md:text-3xl font-bold text-gray-900">
          Customer Management
        </h1>
        <p className="text-xs md:text-base text-gray-600 mt-1">Manage existing customers</p>
      </div>

      {/* Search and Filters */}
      <Card gradient>
        <div className="flex flex-col gap-2 md:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 md:py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base min-h-[44px] shadow-sm"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 md:px-4 py-2 md:py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base min-h-[44px] shadow-sm font-medium"
          >
            <option value="renewal">Sort by Renewal</option>
            <option value="sentiment">Sort by Sentiment</option>
            <option value="value">Sort by Value</option>
          </select>
        </div>
      </Card>

      {/* Customer List */}
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {filteredCustomers.map((customer, i) => (
          <Card key={customer.id} hover gradient className="animate-slideUp" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {customer.tags.map((tag) => (
                        <Badge key={tag} variant="info" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Badge
                    variant={customer.sentiment >= 0.6 ? 'success' : customer.sentiment >= 0.3 ? 'warning' : 'danger'}
                  >
                    Sentiment: {Math.round(customer.sentiment * 100)}%
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={16} />
                      <span>{customer.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-gray-600" />
                      <span className={`font-medium px-2 py-1 rounded ${getRenewalColor(customer.daysToRenewal)}`}>
                        Renewal in {customer.daysToRenewal} days
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <AlertCircle size={16} />
                      <span>{customer.nextEvent}</span>
                    </div>
                  </div>
                </div>

                {/* Policies */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Active Policies</h4>
                  <div className="space-y-2">
                    {customer.policies.map((policy) => (
                      <div key={policy.number} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium text-gray-900">{policy.number}</span>
                          <span className="text-gray-600 ml-2">• {policy.type}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">
                            ₹{(policy.sumAssured / 100000).toFixed(0)}L
                          </div>
                          <div className="text-xs text-gray-600">
                            ₹{(policy.premium / 1000).toFixed(0)}k/year
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedCustomer(customer)}
                    className="min-h-[44px] text-xs md:text-sm"
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="min-h-[44px] text-xs md:text-sm"
                    onClick={() => {
                      setMessageRecipient(customer);
                      setShowMessageModal(true);
                    }}
                  >
                    Send Message
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="hidden sm:block min-h-[44px] text-xs md:text-sm"
                  >
                    Schedule Follow-up
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Search className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        </Card>
      )}

      {/* Send Message Modal */}
      {messageRecipient && (
        <SendMessageModal
          isOpen={showMessageModal}
          onClose={() => {
            setShowMessageModal(false);
            setMessageRecipient(null);
          }}
          recipient={{
            name: messageRecipient.name,
            email: messageRecipient.email,
            phone: messageRecipient.phone,
          }}
          context={`Send message to ${messageRecipient.name} regarding policy renewal in ${messageRecipient.daysToRenewal} days. Next event: ${messageRecipient.nextEvent}`}
        />
      )}
    </div>
  );
}
