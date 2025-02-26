// app/api/plaid/link-token/route.ts
import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';

export async function POST() {
  const response = await plaidClient.linkTokenCreate({
    user: { client_user_id: 'demo-user' },
    client_name: 'Subscriptions App',
    products: ['transfer'], // Use string literal for transfer product
    country_codes: ['US'],
    language: 'en',
    account_filters: {
      depository: {
        account_subtypes: ['checking']
      }
    }
  });
  return NextResponse.json(response.data);
}
