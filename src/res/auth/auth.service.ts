import { Injectable } from '@nestjs/common';
import userSchema from 'src/models/user.schema';
import User from 'src/interface/user.interface';
import { config } from 'dotenv'; config();
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

const env = process.env;

@Injectable()
export class AuthService {
  constructor() { }
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
