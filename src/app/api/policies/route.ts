import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const policies = await prisma.policy.findMany({
      orderBy: {
        policyName: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: policies,
    });
  } catch (error) {
    console.error('Error fetching policies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch policies' },
      { status: 500 }
    );
  }
}
