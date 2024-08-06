import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './utils/LocalStrategy.auth.util';
import { SessionSerializer } from './utils/Serializer.auth.util';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService
    }
  ],
})
export class AuthModule {}
