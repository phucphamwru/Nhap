import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
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
import { envSchema } from './utils/envSchema';
import { ChatModule } from './chat/chat.module';
import { EventsModule } from './events/events.module';
import { OptimizeModule } from './optimize/optimize.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number(configService.get('REDIS_PORT')),
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
    PostsModule,
    // EmailModule,
    MailModule,
    PrivateFilesModule,
    ChatModule,
    EventsModule,
    OptimizeModule,
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
