import { Body, Controller, Get, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { PermissionService } from "src/services/permission.service";
import { CreatePermissionDto } from "src/dto/create.permission.dto";
import { RequestWithUser } from "utils/types/RequestWithUser";
import { JwtAuthGuard } from "utils/guards/jwt.guard";
import { Permissions } from "utils/decorators/permissions.decorator";
import { Public } from "utils/decorators/public.decorator";
import { PermissionsGuard } from "utils/guards/permission.guard";

@ApiTags('Permissions')
@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Permissions('manage:permissions')
  @Post()
  @ApiOperation({ summary: 'Create new permission' })
  @ApiBody({ type: CreatePermissionDto })
  async createRole(@Body() data: CreatePermissionDto) {
    return this.permissionService.createPermission(data.name);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get permission' })
  @ApiQuery({ name: 'name', type: String, required: true })
  async getRole(@Query('name') name: string) {
    return this.permissionService.getPermission(name);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get my permissions' })
  async getUserPermission(@Req() req: RequestWithUser) {
    return this.permissionService.getUserPermissions(req.user.id);
  }

  @Permissions('manage:permissions')
  @Patch()
  @ApiOperation({ summary: 'Assign permission to role' })
  @ApiBody({ type: CreatePermissionDto })
  @ApiQuery({ name: 'roleName', type: String, required: true })
  async assignRoleToUser(
    @Body() data: CreatePermissionDto,
    @Query('roleName') roleName: string
  ) {
    return this.permissionService.assignPermissionToRole(roleName, data.name);
  }
}