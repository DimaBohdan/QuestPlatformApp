import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Permission } from "@prisma/client";
import { PermissionRepository } from "src/database/permission.repository";
import { RoleService } from "./role.service";
import { UserService } from "./user.service";

@Injectable()
export class PermissionService {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly roleService: RoleService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
) {}

  async createPermission(name: string): Promise<Permission> {
    const permission = await this.permissionRepository.getPermission(name);
    if (permission) {
      throw new ConflictException('Permission with such name already exists')
    }
    return await this.permissionRepository.createPermission(name);
  }

  async getPermission(name: string): Promise<Permission> {
    const permission = await this.permissionRepository.getPermission(name);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  async assignPermissionToRole(roleName, permissionName: string) {
    const role = await this.roleService.getRole(roleName);
    const permission = await this.getPermission(permissionName);
    return this.permissionRepository.assignPermissionToRole(role.id, permission.id);
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    await this.userService.findById(userId);
    return await this.permissionRepository.getUserPermissions(userId);
  }
}

