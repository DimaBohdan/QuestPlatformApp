import { Controller, Get, Body, UseGuards, Param, Delete, Patch, Req, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { RolesGuard } from 'utils/guards/roles.guard';
import { Roles } from 'utils/decorators/roles.decorator';
import { UpdateUserDto } from './dto/user.update.dto';
import { AppAbility, CaslForbiddenErrorI } from 'utils/permissions/casl-rules.factory';
import { CaslForbiddenError } from 'utils/decorators/casl-forbidden-error.decorator';
import { subject } from '@casl/ability';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
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

  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
  ): Promise<User> {
    const user = await this.userService.findById(id);
    forbiddenError.throwUnlessCan('manage', subject('User', user));
    return this.userService.updateUserById(id, data);
  }

  @Delete(':id')
  async deleteUserByNickname(
    @Param('id') id: string, 
    @Req() @CaslForbiddenError() forbiddenError: CaslForbiddenErrorI,
  ): Promise<User> {
    const user = await this.userService.findById(id);
    forbiddenError.throwUnlessCan('manage', subject('User', user));
    return this.userService.deleteById(id);
  }

}
