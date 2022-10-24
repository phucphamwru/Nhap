import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import Message from 'src/entities/message.entity';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), AuthenticationModule],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
