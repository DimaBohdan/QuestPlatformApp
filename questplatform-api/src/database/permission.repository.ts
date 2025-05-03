import { Injectable } from "@nestjs/common";
import { Permission } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPermission(name: string): Promise<Permission> {
    return this.prisma.permission.create({ data: { name } });
  }

  async getPermission(name: string): Promise<Permission | null> {
    return this.prisma.permission.findUnique({ where: { name } });
  }

  async assignPermissionToRole(roleId: string, permissionId: string) {
    await this.prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId, permissionId } },
      update: {},
      create: { roleId, permissionId },
    });
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    const userWithRoles = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
      },
    });
    const permissions = new Set<string>();
    for (const userRole of userWithRoles?.roles || []) {
      for (const rolePermission of userRole.role.permissions) {
        permissions.add(rolePermission.permission.name);
      }
    }

    return [...permissions];
  }
}
