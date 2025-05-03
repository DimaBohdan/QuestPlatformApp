import { Controller, Get, Body, UseGuards, Param, Delete, Patch, Req, ForbiddenException } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { UpdateUserDto } from '../dto/user.update.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'utils/decorators/public.decorator';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { Permissions } from 'utils/decorators/permissions.decorator';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: 'Get user by email' })
  @ApiParam({ name: 'email', description: 'User email' })
  @Get('by-email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Public()
  @ApiOperation({ summary: 'Get user by nick' })
  @ApiParam({ name: 'nickname', description: 'User nick' })
  @Get('by-nickname/:nickname')
  async getUserByNickname(@Param('nickname') nickname: string): Promise<User> {
    return this.userService.findByNickname(nickname);
  }

  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({ type: UpdateUserDto })
  @Patch()
  async updateMyProfileById(
    @Body() data: UpdateUserDto,
    @Req() req: RequestWithUser,
  ): Promise<User> {
    return this.userService.updateUserById(req.user.id, data);
  }

  @Permissions('user:edit:any')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiParam({ name: 'id', description: 'User id' })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUserById(id, data);
  }

  @Permissions('user:edit:own')
  @ApiOperation({ summary: 'Delete my profile' })
  @Delete()
  async deleteUser(
    @Req() req: RequestWithUser,
  ): Promise<User> {
    return this.userService.deleteById(req.user.id);
  }

  @Permissions('user:edit:any')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({ name: 'id', description: 'User id' })
  @Delete(':id')
  async deleteUserById(
    @Param('id') id: string, 
  ): Promise<User> {
    return this.userService.deleteById(id);
  }
}
