// lib/subscriptions.ts
import { plaidClient } from './plaid';
import Stripe from 'stripe';
import { RecurringTransfer } from 'plaid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface DetectedSubscription {
  name: string;
  amount: number;
  interval: string;
  status: 'active' | 'canceled';
  plaidData: RecurringTransfer;
  stripeId?: string;
}

export const SubscriptionService = {
  async detectSubscriptions(accessToken: string): Promise<DetectedSubscription[]> {
    const response = await plaidClient.transactionsRecurringGet({ access_token: accessToken });
    
    return response.data.outflow_streams.map(stream => ({
      name: stream.description,
      amount: stream.last_amount,
      interval: stream.frequency,
      status: stream.is_active ? 'active' : 'canceled',
      plaidData: stream
    }));
  },

  async createStripeSubscription(userId: string, subscription: DetectedSubscription) {
    return stripe.subscriptions.create({
      customer: userId,
      items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: subscription.name },
          recurring: { interval: subscription.interval },
          unit_amount: subscription.amount * 100,
        },
      }],
    });
  }
};
