import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Helmet
  app.use(helmet());

  // Compression
  app.use(compression());

  // Cors
  app.enableCors();

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({ transform: true }),
    new ValidationPipe({ skipMissingProperties: true }),
  );

  // Interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // ** Use Global Exception
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.use(cookieParser());

  //swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('Nhap example Title')
    .setDescription('Nhap API description')
    .setVersion('1.0')
    .addTag('nhap Tag')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  //aws
  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });
  await app.listen(3000);
}
bootstrap();

// The most straightforward way to handle PATCH is to pass  'skipMissingProperties'
// Patch: chi thay doi 1 phan cua object
// Put: cap nhat toan bo cua object

// Pipe : la nhung data (dto) hop le khi clien day len server.
// Pipes run inside the exceptions zone. This means that when a Pipe throws an exception it is handled by the exceptions layer.
// When an exception is thrown in a Pipe, no controller method is subsequently executed.
