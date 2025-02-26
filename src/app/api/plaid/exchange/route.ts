// app/api/plaid/exchange/route.ts
import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';

export async function POST(req: Request) {
  const { publicToken } = await req.json();
  
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // Store access_token and item_id in your database
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
