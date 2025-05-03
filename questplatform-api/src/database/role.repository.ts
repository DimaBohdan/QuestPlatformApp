import { Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(name: string): Promise<Role> {
    return this.prisma.role.create({ data: { name } });
  }

  async getRole(name: string): Promise<Role | null> {
    return this.prisma.role.findUnique({ where: { name } });
  }

  async assignRoleToUser(userId: string, roleId: string) {
    await this.prisma.roleUser.upsert({
      where: { userId_roleId: { userId, roleId } },
      update: {},
      create: { userId, roleId },
    });
  }
}
