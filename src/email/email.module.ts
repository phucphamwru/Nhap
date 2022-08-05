import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import EmailSchedulingService from './emailScheduling.service';

@Module({
  imports: [ConfigModule],
  controllers: [EmailController],
  providers: [EmailService, EmailSchedulingService],
  exports: [EmailService]
})
export class EmailModule {}
