import { CacheModule, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { OptimizeService } from './optimize.service';
import { OptimizeController } from './optimize.controller';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisStore from 'cache-manager-redis-store';
import { ImageProcessor } from './optimize.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
      processors: [
        {
          name: 'optimize',
          path: join(__dirname, 'image.processor.js'),
        },
      ],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 60 * 60,
      }),
    }),
  ],
  controllers: [OptimizeController],
  providers: [ImageProcessor],
})
export class OptimizeModule {}
