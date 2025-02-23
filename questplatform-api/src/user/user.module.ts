import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from 'src/database/user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  providers: [UserService, UserRepository, PrismaService, JwtAuthGuard],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
