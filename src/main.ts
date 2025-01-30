import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { APIVersion } from './common/constants/app/version.app';
import { AllyExceptionInterceptor } from './infrastructure/interceptors/exception.interceptor';

async function bootstrap() {
  const logger = new Logger();
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(APIVersion.v2);

  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true }));
  app.useGlobalInterceptors(new AllyExceptionInterceptor());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('ERP Ally360')
    .setDescription('Restful API correspondiente al componente Ally360')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(process.env.PORT);

  logger.log(`Server is running!, View services: ${await app.getUrl()}/docs/`);
}
bootstrap();
