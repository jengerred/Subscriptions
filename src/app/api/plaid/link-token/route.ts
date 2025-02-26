// app/api/plaid/link-token/route.ts
import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';

export async function POST() {
  const response = await plaidClient.linkTokenCreate({
    user: { client_user_id: 'demo-user' },
    client_name: 'Subscriptions App',
    products: ['auth', 'transactions'],
    country_codes: ['US'],
    language: 'en',
  });
  return NextResponse.json(response.data);
}
