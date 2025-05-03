import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { JwtPayload } from 'utils/interfaces/jwt.payload';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'utils/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const token = req.cookies['jwt'];
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    try {
      req.user = this.jwtService.verify<JwtPayload>(token);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
