// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../interface/jwt-payload.interface';
import { CreateAuthDto } from './dto/createUser.dto';
import userSchema from 'src/models/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.userService.findOne(id);
    if (user && user.nxppw === password) {
      const { nxppw, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = { id: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.userService.setRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(userData: CreateAuthDto) {
    const newUser = await new userSchema({
      nxpid: userData.id,
      nxppw: userData.pw,
      nickname: userData.nickname ?? userData.id,
      mailaddr: userData.email
    }).save();
    return {
      result: userData.id ?? null
    };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    await this.userService.setRefreshToken(id, refreshToken);
  }

  async logout(id: string) {
    await this.userService.removeRefreshToken(id);
  }

  async refreshToken(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken);
    const user = await this.userService.findOne(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { id: user.nxpid };
    const newAccessToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.userService.setRefreshToken(user.nxpid.toString(), newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
