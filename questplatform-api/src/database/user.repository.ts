import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/dto/user.create.dto';
import { UpdateUserDto } from 'src/dto/user.update.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id }, 
      include: {
        roles: {
          include: { role: true },
        },
      }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email }, 
      include: {
        roles: {
          include: { role: true },
        },
      }
    });
  }

  async findByNickname(nickname: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { nickname } });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async setCustomerId(userId: string, customerId: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        customerId
      }
    })
  }

  async updateUserById(id: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ 
      where: { id },
      data: data,
    });
  }

  async deleteById(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
