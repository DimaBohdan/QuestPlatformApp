import { Module, forwardRef } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRepository } from 'src/database/user.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from '../controllers/user.controller';
import { AuthModule } from 'src/modules/auth.module';
import { PermissionModule } from './permission.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule), JwtModule, forwardRef(() => PermissionModule)],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
