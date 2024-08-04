import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { linkToDatabase } from './utils/db.util';
import { winstonLogger } from './utils/winston.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(winstonLogger);
  await linkToDatabase();
  await app.listen(3000);
}
bootstrap();
