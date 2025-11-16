'use client';

import { useState, useEffect } from 'react';
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

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [sortBy, setSortBy] = useState<'renewal' | 'sentiment' | 'value'>('renewal');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      const result = await response.json();
      if (result.success) {
        // Transform database customers to UI format
        const transformedCustomers = result.data.map((customer: any, index: number) => {
          const daysToRenewal = 5 + (index * 7);
          const sentiment = 0.4 + Math.random() * 0.5;
          
          return {
            id: customer.id,
            name: customer.name,
            phone: customer.phone || '+91 98765 43210',
            email: customer.email || 'customer@email.com',
            policies: customer.policies.map((policyName: string, pIndex: number) => ({
              number: `LIC${8000 + index * 100 + pIndex}`,
              type: policyName,
              sumAssured: 1000000 * (index + 1),
              premium: 15000 + (index * 5000),
              tenure: 20 + (pIndex * 5),
              payingTerm: 15 + (pIndex * 3),
            })),
            renewalDate: new Date(Date.now() + daysToRenewal * 24 * 60 * 60 * 1000),
            sentiment,
            followUpStatus: daysToRenewal <= 7 ? 'pending' : 'scheduled',
            nextEvent: daysToRenewal <= 7 ? 'Urgent renewal follow-up' : 'Policy review call',
            daysToRenewal,
            tags: [
              customer.policies.length > 1 ? 'Multiple Policies' : 'Single Policy',
              sentiment > 0.7 ? 'Loyal Customer' : sentiment < 0.5 ? 'At Risk' : 'Active',
              daysToRenewal <= 7 ? 'Renewal Due' : '',
            ].filter(Boolean),
          };
        });
        setCustomers(transformedCustomers);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading customers...</p>
        </div>
      </div>
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
      <Card>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm md:text-base min-h-[44px] shadow-sm"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 md:px-4 py-2.5 md:py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base min-h-[44px] shadow-sm font-medium sm:w-auto"
          >
            <option value="renewal">Sort by Renewal</option>
            <option value="sentiment">Sort by Sentiment</option>
            <option value="value">Sort by Value</option>
          </select>
        </div>
      </Card>

      {/* Customer List */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {filteredCustomers.map((customer, i) => (
          <Card key={customer.id} className="hover:shadow-md transition-shadow active:scale-[0.98]">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">{customer.name}</h3>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2">
                      {customer.tags.map((tag) => (
                        <Badge key={tag} variant="info" className="text-[10px] md:text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Badge
                    variant={customer.sentiment >= 0.6 ? 'success' : customer.sentiment >= 0.3 ? 'warning' : 'danger'}
                    className="text-[10px] md:text-xs w-fit"
                  >
                    Sentiment: {Math.round(customer.sentiment * 100)}%
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <Phone size={14} className="flex-shrink-0" />
                      <span className="truncate">{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <Mail size={14} className="flex-shrink-0" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                      <Calendar size={14} className="text-gray-600 flex-shrink-0" />
                      <span className={`font-medium px-2 py-1 rounded text-[10px] md:text-xs ${getRenewalColor(customer.daysToRenewal)}`}>
                        Renewal in {customer.daysToRenewal} days
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <AlertCircle size={14} className="flex-shrink-0" />
                      <span className="truncate">{customer.nextEvent}</span>
                    </div>
                  </div>
                </div>

                {/* Policies */}
                <div className="bg-gray-50 rounded-lg p-2 md:p-3 mb-3 md:mb-4">
                  <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Active Policies</h4>
                  <div className="space-y-2">
                    {customer.policies.map((policy) => (
                      <div key={policy.number} className="flex items-center justify-between text-xs md:text-sm gap-2">
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-gray-900">{policy.number}</span>
                          <span className="text-gray-600 ml-1 md:ml-2 text-[10px] md:text-xs">• {policy.type}</span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-medium text-gray-900 text-xs md:text-sm">
                            ₹{(policy.sumAssured / 100000).toFixed(0)}L
                          </div>
                          <div className="text-[10px] md:text-xs text-gray-600">
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
                    className="flex-1 sm:flex-none"
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 sm:flex-none"
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
                    className="hidden lg:block"
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
