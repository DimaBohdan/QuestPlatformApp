import Stripe from "stripe";

export interface PaymentProcessor {
  createCustomer(userId: string): Promise<Stripe.Customer>;
  createSubscription(customerId: string): Promise<Stripe.Subscription>;
  charge(userId: string, amount: number): Promise<string>;
  verifySubscription(userId: string): Promise<boolean>;
}

