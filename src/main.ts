import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { linkToDatabase } from './utils/db.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await linkToDatabase();
  await app.listen(3000);
}
bootstrap();
