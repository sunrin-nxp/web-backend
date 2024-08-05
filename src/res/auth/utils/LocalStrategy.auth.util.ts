import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';
import userSchema from 'src/models/user.schema';
import { config } from 'dotenv';
 config();

const env = process.env;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super();
    }

    async validate(nxpid: string, nxppw: string) {
        const existUser = await userSchema.findOne({ nxpid: nxpid });
        let match = await bcrypt.compare(nxppw, existUser.nxppw || null);
        if (!match || !existUser) return null;
        else {
            const user = await this.authService.validateUser({
                nxpid: existUser.nxpid,
                mailaddr: existUser.mailaddr,
                rank: existUser.rank
            });
            return user;
        }
    }
}