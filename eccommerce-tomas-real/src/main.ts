import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataLoadService } from './modules/products/dataLoad.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(LoggerGlobalMiddleware);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Back-End Application')
    .setDescription('Proyecto Back-end - Tomás Real')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('SUCCESSFULLY CONNECTION');
}

async function bootstrapWithLoad() {
  const app = await NestFactory.create(AppModule);
  const dataLoadService = app.get(DataLoadService);
  await dataLoadService.load();

  await bootstrap();
}

bootstrapWithLoad();
