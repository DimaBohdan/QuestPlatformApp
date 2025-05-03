import { AuthStrategy } from "utils/interfaces/auth-strategy.interface";

export class JwtStrategy implements AuthStrategy {
  constructor(private getToken: () => Promise<string>) {}

  async injectHeaders(headers: Headers): Promise<void> {
    const token = await this.getToken();
    headers.set('Authorization', `Bearer ${token}`);
  }
}
