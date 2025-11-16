import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const customers = await prisma.customer.findMany();
    
    // Generate notifications from customer data
    const notifications = customers.map((customer, index) => {
      const daysUntilRenewal = 5 + (index * 5);
      const isUrgent = daysUntilRenewal <= 7;
      
      // Determine notification category
      let category: 'renewals' | 'followups' | 'compliance' | 'upsell';
      let title: string;
      let description: string;
      let suggestedAction: string;
      let aiInsight: string;
      
      if (customer.policies.length === 1) {
        category = 'upsell';
        title = 'Upsell Opportunity';
        description = `Customer eligible for additional coverage`;
        suggestedAction = `Offer complementary policy to enhance coverage`;
        aiInsight = `Has only ${customer.policies[0]}. Good candidate for cross-sell.`;
      } else if (isUrgent) {
        category = 'renewals';
        title = 'Policy Renewal Due';
        description = `${customer.policies[0]} policy expires in ${daysUntilRenewal} days`;
        suggestedAction = 'Send personalized renewal reminder with loyalty discount offer';
        aiInsight = `Customer has been with us for ${Math.floor(Math.random() * 5) + 1} years. High retention probability.`;
      } else if (index % 3 === 0) {
        category = 'compliance';
        title = 'KYC Documentation';
        description = 'Customer KYC documents pending verification';
        suggestedAction = 'Send WhatsApp with simple upload link and instructions';
        aiInsight = 'Documents submitted but may need verification.';
      } else {
        category = 'followups';
        title = 'Follow-up Required';
        description = 'Customer inquiry about premium adjustment';
        suggestedAction = 'Provide premium comparison chart with tax benefits';
        aiInsight = 'Customer is price-sensitive. Responded well to detailed breakdowns.';
      }
      
      const priority = isUrgent ? 'high' : index % 2 === 0 ? 'medium' : 'low';
      const bestContactTime = ['6:00 PM - 8:00 PM', '11:00 AM - 1:00 PM', '9:00 AM - 11:00 AM', '7:00 PM - 9:00 PM'][index % 4];
      
      return {
        id: customer.id,
        category,
        title,
        description,
        customer: customer.name,
        dueDate: new Date(Date.now() + daysUntilRenewal * 24 * 60 * 60 * 1000).toLocaleDateString(),
        priority,
        time: new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000),
        actionable: true,
        aiInsight,
        suggestedAction,
        bestContactTime,
      };
    });
    
    // Sort by priority and time
    notifications.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    });

    return NextResponse.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}
