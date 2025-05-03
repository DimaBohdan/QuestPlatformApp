import { Body, Controller, Get, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { CreateRoleDto } from "src/dto/create.role.dto";
import { RoleService } from "src/services/role.service";
import { JwtAuthGuard } from "utils/guards/jwt.guard";
import { Permissions } from "utils/decorators/permissions.decorator";
import { Public } from "utils/decorators/public.decorator";
import { PermissionsGuard } from "utils/guards/permission.guard";

@ApiTags('Roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Permissions('manage:roles')
  @Post()
  @ApiOperation({ summary: 'Create new role' })
  @ApiBody({ type: CreateRoleDto })
  async createRole(@Body() data: CreateRoleDto) {
    return this.roleService.createRole(data.name);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get role' })
  @ApiQuery({ name: 'name', type: String, required: true })
  async getRole(@Query('name') name: string) {
    return this.roleService.getRole(name);
  }

  @Permissions('manage:roles')
  @Patch()
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiBody({ type: CreateRoleDto })
  async assignRoleToUser(
    @Body() data: CreateRoleDto,
    @Req() req: RequestWithUser,
  ) {
    return this.roleService.assignRoleToUser(req.user.id, data.name);
  }
}