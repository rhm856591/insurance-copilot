import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET() {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: false,
        error: 'Database not configured',
      }, { status: 503 });
    }

    const leads = await prisma.lead.findMany({
      orderBy: [
        { conversionProbability: 'desc' },
        { lastContact: 'desc' },
      ],
    });

    // Convert to format expected by frontend
    const formattedLeads = leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      age: lead.age,
      status: lead.status,
      sentiment: Number(lead.sentiment),
      lastContact: lead.lastContact.toISOString(),
      policyInterest: lead.policyInterest,
      notes: lead.notes,
      location: lead.location,
      source: lead.source,
      conversionProbability: Number(lead.conversionProbability),
      priorityReason: lead.priorityReason,
      bestContactTime: lead.bestContactTime,
    }));

    return NextResponse.json({
      success: true,
      data: formattedLeads,
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
