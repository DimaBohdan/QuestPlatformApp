import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/services/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { displayName, emails, photos } = profile;

    let user;
    try {
      user = await this.userService.findByEmail(emails[0].value);
    }
    catch {
      user = null;
    }
    if (!user) {
      user = await this.userService.createUser({
        nickname: displayName.toLowerCase().replace(/\s+/g, '') + `_${Date.now()}`,
        username: displayName,
        email: emails[0].value,
        avatar: photos?.[0]?.value || this.getDefaultAvatar,
      });
    }
    return done(null, user);
  }

  private getDefaultAvatar(email: string): string {
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${email}`;
  }
}
