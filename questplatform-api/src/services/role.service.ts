import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "@prisma/client";
import { RoleRepository } from "src/database/role.repository";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(name: string): Promise<Role> {
    const role = await this.roleRepository.getRole(name);
    if (role) {
      throw new ConflictException('Role with such name already exists')
    }
    return await this.roleRepository.createRole(name);
  }

  async getRole(name: string): Promise<Role> {
    const role = await this.roleRepository.getRole(name);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async assignRoleToUser(userId: string, roleName: string) {
    const role = await this.getRole(roleName);
    return this.roleRepository.assignRoleToUser(userId, role.id);
  }
}

