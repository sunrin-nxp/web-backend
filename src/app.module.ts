import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/winston.middleware';
import { CommonModule } from './common/common.module';
import { AuthModule } from './res/auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
