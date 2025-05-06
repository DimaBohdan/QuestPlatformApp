import { forwardRef, Module } from '@nestjs/common';
import { RoleController } from 'src/controllers/role.controller';
import { RoleService } from 'src/services/role.service';
import { RoleRepository } from 'src/database/role.repository';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { PermissionModule } from './permission.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [JwtModule, forwardRef(() => AuthModule), forwardRef(() => PermissionModule)],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, JwtAuthGuard, PermissionsGuard],
  exports: [RoleService, RoleRepository]
})
export class RoleModule {}
