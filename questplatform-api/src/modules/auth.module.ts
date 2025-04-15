import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'utils/strategies/google.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/services/user.service';
import { UserModule } from 'src/modules/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'utils/guards/roles.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, PrismaService, UserService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
