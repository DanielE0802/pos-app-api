import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { APP_CONFIG } from './common/config/app.config';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  const logger = new Logger();
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      // transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      // forbidUnknownValues: true,
      // validationError: {
      //   target: false,
      // },
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('POS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(APP_CONFIG.appPort);

  logger.log(`Server is running!, View services: ${await app.getUrl()}/docs/`);
}
bootstrap();
