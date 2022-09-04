import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as session from 'express-session';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.use(compression());
  app.enableCors();
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const config = new DocumentBuilder()
    .setTitle('Bartr')
    .setDescription('Bartr API description')
    .setVersion('1.0')
    // .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   'access-token',
    // )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  await app.listen(3003);
}
bootstrap();
