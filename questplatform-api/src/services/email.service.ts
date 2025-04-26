import { Injectable } from "@nestjs/common";
import { AuthProxyService } from "./auth-proxy.service";
import { ApiKeyStrategy } from "utils/strategies/api-key.strategy";

@Injectable()
export class EmailService {
  constructor(
    private readonly authProxyService: AuthProxyService
  ) {}

  async sendEmail(emailData: string): Promise<void> {
    await this.authProxyService.fetchWithAuth(
      'https://api.sendgrid.com/v3/mail/send',
      {
        method: 'POST',
        body: JSON.stringify(emailData),
        headers: { 'Content-Type': 'application/json' },
        authStrategy: new ApiKeyStrategy(process.env.SENDGRID_API_KEY!),
      }
    );
  }
}