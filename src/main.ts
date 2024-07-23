import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const APP_PORT = process.env.PORT || 3000;

const API_SERVICE_VERSION = '0.1.0';
const API_SERVICE_NAME = 'NestJS Advanced Architecture API';
const API_SERVICE_DESCRIPTION = `\
NestJS application built using during the Advanced Architecture course with
a few added extras such as unit and e2e tests, swagger docs, class validation
and several other variations.
`;

async function bootstrap() {
  const globalPrefix = '';

  const app = await NestFactory.create(
    AppModule.register({ driver: 'in-memory', eventStore: 'in-memory' }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  // app.enableCors();

  const config = new DocumentBuilder()
    .addTag('Alarms', 'Operations related to alarms')
    .setDescription(API_SERVICE_DESCRIPTION)
    .setVersion(API_SERVICE_VERSION)
    .setTitle(API_SERVICE_NAME)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(APP_PORT, () => {
    Logger.log(
      `🚀 Server running on http://localhost:${APP_PORT}${globalPrefix}`,
    );
  });
}

bootstrap();
