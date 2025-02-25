import { Controller, Get, Body, UseGuards, Param, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { RolesGuard } from 'utils/guards/roles.guard';
import { Roles } from 'utils/decorators/roles.decorator';
import { UpdateUserDto } from './dto/user.update.dto';
import { IsOwner } from 'utils/guards/isOwner.guard';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('by-email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Get('by-nickname/:nickname')
  async getUserByNickname(@Param('nickname') nickname: string): Promise<User> {
    return this.userService.findByNickname(nickname);
  }

  @UseGuards(IsOwner('user', 'id'))
  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUserById(id, data);
  }

  @UseGuards(IsOwner('user', 'id'))
  @Delete('delete/:id')
  async deleteUserByNickname(@Param('id') id: string): Promise<User> {
    return this.userService.deleteById(id);
  }

}
