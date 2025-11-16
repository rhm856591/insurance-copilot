import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}
