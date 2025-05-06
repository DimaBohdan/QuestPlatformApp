import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from 'src/services/permission.service';
import { PermissionRepository } from 'src/database/permission.repository';
import { RoleModule } from './role.module';
import { UserModule } from './user.module';
import { PermissionController } from 'src/controllers/permission.controller';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth.module';


@Module({
  imports: [RoleModule, forwardRef(() => UserModule), forwardRef(() => AuthModule), JwtModule],
  providers: [PermissionService, PermissionRepository, PermissionService, PermissionRepository, PermissionsGuard, JwtAuthGuard],
  controllers: [PermissionController],
  exports: [PermissionService, PermissionService, PermissionsGuard]
})
export class PermissionModule {}