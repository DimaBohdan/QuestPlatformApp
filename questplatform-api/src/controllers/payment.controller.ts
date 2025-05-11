import { Controller, Post, Get, Patch, Delete, Param, Body, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'utils/guards/jwt.guard';
import { Permissions } from 'utils/decorators/permissions.decorator';
import { PermissionsGuard } from 'utils/guards/permission.guard';
import { PaymentProxyService } from 'src/services/payment-proxy';
import { RequestWithUser } from 'utils/types/RequestWithUser';
import { ChargeDto } from 'src/dto/charge.dto';

@ApiTags('Payment')
@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly stripeProxyService: PaymentProxyService) {}

  @Post('subscribe')
  async createSubscription(@Req() req: RequestWithUser) {
    return this.stripeProxyService.createSubscription(req.user.id);
  }

  @Get('subscription/verify')
  verifySubscription(@Req() req: RequestWithUser) {
    return this.stripeProxyService.verifySubscription(req.user.id);
  }

  @Post('charge')
  @ApiOperation({ summary: 'Charge amount of money' })
  @ApiBody({ type: ChargeDto })
  async charge(@Req() req: RequestWithUser, @Body() chargeDto: ChargeDto) {
    return this.stripeProxyService.charge(req.user.id, chargeDto.amount);
  }
}
