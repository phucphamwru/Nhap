import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { PrivateFilesModule } from './files/privateFiles.module';
import {
  APP_FILTER,
  // APP_GUARD,
  APP_INTERCEPTOR,
} from '@nestjs/core';
import { HttpExceptionFilter } from './utils/http-exception.filter';
// import { RolesGuard } from './utils/roles.guard';
import { LoggingInterceptor } from './utils/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        // EMAIL_SERVICE: Joi.string().required(),
        // EMAIL_USER: Joi.string().required(),
        // EMAIL_PASSWORD: Joi.string().required(),

        //mail
        MAIL_HOST: Joi.string().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
        MAIL_TRANSPORT: Joi.string().required(),

        //aws
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PRIVATE_BUCKET_NAME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    PostsModule,
    // EmailModule,
    MailModule,
    PrivateFilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
      //AllExceptionsFilter
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
