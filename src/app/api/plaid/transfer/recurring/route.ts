// src/app/api/plaid/transfer/recurring/route.ts
import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';

export async function POST(req: Request) {
  const body = await req.json();
  
  try {
    const request = {
      authorization_id: body.authorization_id,
      description: 'Subscription payment',
      schedule: {
        interval_unit: 'month' as const,
        interval_count: 1,
        start_date: new Date().toISOString().split('T')[0]
      }
    };

    const response = await plaidClient.transferRecurringCreate(request);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Recurring transfer failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
