import { PaymentProcessor } from 'utils/interfaces/payment-processor.interface';
import { PaymentService } from './payment.service';
import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentProxyService implements PaymentProcessor {
  private subscriptionCache = new Map<string, { value: boolean; timestamp: number }>();
  private chargeTracker = new Map<string, number[]>();
  private readonly CACHE_TTL_MS = 5 * 60 * 1000;
  private readonly RATE_LIMIT = 25;

  constructor(
    private readonly realStripe: PaymentService,
    private readonly userService: UserService,
  ) {}

  async createCustomer(userId: string) {
    return await this.realStripe.createCustomer(userId);
  }

  async createSubscription(userId: string) {
    const user = await this.userService.findById(userId);
    let customerId = user.customerId;
    if (!customerId) {
      const customer = await this.realStripe.createCustomer(userId);
      customerId = customer.id;
    }
    return await this.realStripe.createSubscription(customerId);
  }

  async charge(userId: string, amount: number): Promise<string> {
    const now = Date.now();
    const timestamps = this.chargeTracker.get(userId) || [];
    const recent = timestamps.filter(ts => now - ts < this.CACHE_TTL_MS);
    if (recent.length >= this.RATE_LIMIT) {
      throw new Error('Too many charges in a short time');
    }
    this.chargeTracker.set(userId, [...recent, now]);
    return await this.realStripe.charge(userId, amount);
  }

  async verifySubscription(userId: string): Promise<boolean> {
    const cached = this.subscriptionCache.get(userId);
    const now = Date.now();
    if (cached && now - cached.timestamp < this.CACHE_TTL_MS) {
      return cached.value;
    }
    const result = await this.realStripe.verifySubscription(userId);
    this.subscriptionCache.set(userId, { value: result, timestamp: now });
    return result;
  }
}
