// src/auth/jwt-auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService, private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const isValid = await super.canActivate(context);
    
    if (!isValid) {
      throw new UnauthorizedException();
    }

    const user = request.user;
    const payload = { id: user.id };

    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.authService.updateRefreshToken(user.id, newRefreshToken);

    response.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });

    return true;
  }
}
