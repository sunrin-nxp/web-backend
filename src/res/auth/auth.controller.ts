// src/auth/auth.controller.ts
import { Request, Controller, Post, UseGuards, Res, Body, UploadedFile, Req, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Response } from 'express';
import { CreateAuthDto } from './dto/createUser.dto';
import * as multer from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as crypto from 'crypto';
import path from 'path';
import { UpdateAssociationDto } from './dto/updateAssociation.dto';
import { UpdateNicknameDto } from './dto/updateNickname.dto';
import { UpdateDescriptionDto } from './dto/updateDesc.dto';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/profiles');
  },
  filename: (req, file, cb) => {
    const userid = req.body.id;
    const ext = path.extname(file.originalname);
    const filename = `${userid}-profile-${crypto.randomBytes(16).toString('hex')}${ext}`
    cb(null, filename);
  }
});

const uploadOptions: MulterOptions = {
  storage: storage
};

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
  async register(@Body() bd: CreateAuthDto) {
    return this.authService.register(bd);
  }

  @Post('profile/:id')
  async profilePhoto(@UploadedFile() file: Express.Multer.File, @Param('id') userid: string) {
    return this.authService.profilePhoto(file.filename, userid);
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

  @UseGuards(JwtAuthGuard)
  @Post('update/association')
  async updateAssociation(@Body() bd: UpdateAssociationDto) {
    return this.authService.updateAssociation(bd);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update/nickname')
  async updateNickname(@Body() bd: UpdateNicknameDto) {
    return this.authService.updateNickname(bd);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update/description')
  async updateDescription(@Body() bd: UpdateDescriptionDto) {
    return this.authService.updateDescription(bd);
  }
}
