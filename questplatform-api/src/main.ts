import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { CaslForbiddenExceptionFilter } from 'utils/exception-filters.ts/casl-forbidden-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.use(cookieParser());
  app.useGlobalFilters(new CaslForbiddenExceptionFilter());
  await app.listen(3000);
}
bootstrap();
