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
import { ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload');
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

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "로그인",
    description: "사용자의 계정으로 로그인합니다."
  })
  @ApiResponse({
    status: 200,
    description: "로그인 성공",
    schema: {
      properties: {
        accessToken: {
          type: 'String',
          description: "로그인한  유저의 AccessToken입니다.",
          example: "asfoiu43h7rvfud=;"
        }
      }
    }
  })
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

    return res.json({ accessToken: accessToken });
  }

  @ApiOperation({
    summary: "회원가입",
    description: "새로운 계정을 생성합니다."
  })
  @ApiResponse({
    status: 200,
    description: "회원가입 성공",
    schema: {
      properties: {
        userId: {
          type: 'String',
          description: "가입된 유저의 ID입니다.",
          example: "ninejuan"
        }
      }
    }
  })
  @Post('register')
  async register(@Body() bd: CreateAuthDto) {
    return this.authService.register(bd);
  }

  @ApiOperation({
    summary: "프로필사진 조회",
    description: "유저의 프로필 사진을 조회합니다."
  })
  @ApiResponse({
    status: 200,
    description: "유저 프로필 사진 데이터",
  })
  @ApiParam({
    name: "id",
    example: "ninejuan",
    required: true
  })
  @Post('profilePhoto/:id')
  @UseGuards(JwtAuthGuard)
  async profilePhoto(@UploadedFile() file: Express.Multer.File, @Param('id') userid: string) {
    return this.authService.profilePhoto(file.filename, userid);
  }

  @Post('profile/:id')
  @UseGuards(JwtAuthGuard)
  async profile(@Param('id') id: string) {
    return this.authService.profile(id);
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
