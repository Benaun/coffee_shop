import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'verify-email', method: RequestMethod.GET }],
  });

  app.use(cookieParser);

  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  await app.listen(4200);
}
bootstrap();
