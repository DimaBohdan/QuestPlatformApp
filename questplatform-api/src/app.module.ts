import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { RolesGuard } from 'utils/guards/roles.guard';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';
import { QuestModule } from './quest/quest.module';
import { MediaModule } from './media/media.module';


@Module({
  imports: [AuthModule, UserModule, PrismaModule, QuestModule, MediaModule],
  controllers: [AuthController, UserController],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  UserService],
})
export class AppModule {}
