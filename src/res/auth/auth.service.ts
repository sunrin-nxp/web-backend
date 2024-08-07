import { HttpException, Injectable } from '@nestjs/common';
import userSchema from 'src/models/user.schema';
import User from 'src/interface/user.interface';
import { config } from 'dotenv'; config();
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

const env = process.env;

@Injectable()
export class AuthService {
	constructor() { }

	async login(
		id: string,
		pw: string,
	): Promise<{
		accessToken: string;
		refreshToken: string;
	}> {
		const user = await this.validateUser(id, pw);
		if (!user) {
			throw new HttpException("올바르지 않은 정보입니다.", 400);
		}
		const payload = { id: user.id, nick: user.nickname };
		const accessToken = this.jwtService.sign(payload, {
			secret: env.ACCESS_TOKEN_SECRET
		});
		const refreshToken = this.jwtService.sign(payload, {
			secret: env.REFRESH_TOKEN_SECRET,
			expiresIn: '7d'
		});
		await this.userService.setCurrentRefreshToken(refreshToken, user.id);
		return {
			accessToken: accessToken,
			refreshToken: refreshToken
		}
	}

	async logout(id: string): Promise<object> {
		this.userService.removeRefreshToken(id);
		return;
	}

	// LocalStrategy.auth.util.ts에서 참조
	async validateUser(details: User) {
		const user = await userSchema.findOne({
			nxpid: details.nxpid
		});
		if (user) return user; else return null;
	}

	async findUser(userId: Number) {
		const user = await userSchema.findOne({ nxpid: userId });
		if (user) return user; else return null;
	}

	create(createAuthDto: CreateAuthDto) {
		return 'This action adds a new auth';
	}

	findAll() {
		return `This action returns all auth`;
	}

	findOne(id: number) {
		return `This action returns a #${id} auth`;
	}

	update(id: number, updateAuthDto: UpdateAuthDto) {
		return `This action updates a #${id} auth`;
	}

	remove(id: number) {
		return `This action removes a #${id} auth`;
	}
}
