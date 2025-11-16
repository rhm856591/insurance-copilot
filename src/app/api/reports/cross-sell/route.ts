import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const allPolicies = await prisma.policy.findMany();

    // Find customers with only one policy (high priority for cross-sell)
    const singlePolicyCustomers = customers.filter(c => c.policies.length === 1);
    
    // Generate cross-sell report
    const report = singlePolicyCustomers.map((customer, index) => {
      const currentPolicy = customer.policies[0];
      const availablePolicies = allPolicies
        .filter(p => !customer.policies.includes(p.policyName))
        .slice(0, 3); // Top 3 recommendations

      const priority = index < 2 ? 'HIGH' : 'MEDIUM';
      const priorityEmoji = priority === 'HIGH' ? '🔴' : '🟡';

      return {
        customer,
        currentPolicy,
        recommendedPolicies: availablePolicies,
        priority,
        priorityEmoji,
        estimatedAdditionalPremium: 15000 + (index * 5000),
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        totalSinglePolicyCustomers: singlePolicyCustomers.length,
        highPriorityCount: report.filter(r => r.priority === 'HIGH').length,
        totalPotentialPremium: report.reduce((sum, r) => sum + r.estimatedAdditionalPremium, 0),
        opportunities: report,
      },
    });
  } catch (error) {
    console.error('Error generating cross-sell report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
