import Stripe from 'stripe';
import { PaymentProcessor } from 'utils/interfaces/payment-processor.interface';
import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PaymentService implements PaymentProcessor {
  private stripe: Stripe;

  constructor(
    private readonly userService: UserService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }

  async createCustomer(userId: string): Promise<Stripe.Customer> {
    const user = await this.userService.findById(userId);
    const customer = await this.stripe.customers.create({
      email: user.email,
      name: user.username,
      metadata: { userId },
    });
    await this.userService.setCustomerId(userId, customer.id);
    return customer;
  }

  async createSubscription(customerId: string): Promise<Stripe.Subscription> {
    return await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: 'price_1RNYAlQA5s5s3xBDBxJePyJj' }],
      payment_behavior: 'default_incomplete',
    });
  }

  async charge(userId: string, amount: number): Promise<string> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      description: `Subscription payment for ${userId}`,
      metadata: { userId },
    });
    return paymentIntent.id;
  }

  async verifySubscription(userId: string): Promise<boolean> {
    const user = await this.userService.findById(userId);
    if (!user.customerId) return false;
    const subscriptions = await this.stripe.subscriptions.list({
      customer: user.customerId,
      status: 'all',
    });
    return subscriptions.data.some(sub =>
      ['active', 'trialing', 'past_due', 'incomplete'].includes(sub.status),
    );
  }
}
