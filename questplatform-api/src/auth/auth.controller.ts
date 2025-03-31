import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from 'utils/decorators/public.decorator';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('google')
  @ApiOperation({ summary: 'Login or register with Google account' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return { message: 'Redirecting to Google...' };
  }

  @Public()
  @Get('google/callback')
  @ApiOperation({ summary: 'Redirect to Frontend' })
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    await this.authService.login(req.user, res);
    res.redirect(process.env.FRONTEND_URL!);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout' })
  async logout(@Res() res: Response) {
    await this.authService.logout(res);
    res.redirect(process.env.FRONTEND_URL!);
  }
}
