// src/auth/auth.controller.ts
import { Controller, Request, Post, UseGuards, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(req.user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });

    return res.json({ accessToken });
  }

  @Post('register')
  async register() {

  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string, @Res() res: Response) {
    const tokens = await this.authService.refreshToken(refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });

    return res.json({ accessToken: tokens.accessToken });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    await this.authService.logout(req.user.id);

    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out successfully' });
  }
}
