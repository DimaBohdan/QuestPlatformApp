import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/database/user.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/user.create.dto';
import { UpdateUserDto } from '../dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return user;
  }

  async findByNickname(nickname: string): Promise<User> {
    const user = await this.userRepository.findByNickname(nickname);
    if (!user) {
      throw new NotFoundException(`User with nickname "${nickname}" not found`);
    }
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(data);
  }

  async setCustomerId(userId: string, customerId: string): Promise<User> {
    const user = await this.findById(userId);
    return this.userRepository.setCustomerId(userId, customerId)
  }

  async updateUserById(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findById(id)
    if (!data) {
      throw new BadRequestException('Update data is empty')
    }
    return this.userRepository.updateUserById(id, data);
  }

  async deleteById(id: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userRepository.deleteById(id);
  }
}

