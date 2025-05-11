import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserService } from 'src/services/user.service';
import { User } from '@prisma/client';
import { JwtPayload } from 'utils/interfaces/jwt.payload';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async login(user: User, res: Response) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      username: user.username,
      avatar: user.avatar,
      info: user.info,
      customerId: user.customerId,
      createdAt: user.createdAt,
      completedQuestIds: user.completedQuestIds,
    };
    const token = this.jwtService.sign(payload);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { message: 'Login successful' };
  }

  async logout(res: Response) {
    res.clearCookie('jwt', { httpOnly: true });
    return { message: 'Logout successful' };
  }
}
