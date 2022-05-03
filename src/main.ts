// import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as compression from 'compression';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // app.useStaticAssets(join(__dirname, '..', 'www'));
  app.use(cookieParser());
  app.use(compression());
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
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  await app.listen(3003);
}
bootstrap();
