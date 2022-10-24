import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import Message from 'src/entities/message.entity';
import { Repository } from 'typeorm';
import User from 'src/entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    private readonly authenticationService: AuthenticationService,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async getUserFromSocket(socket: Socket) {
    const token = socket.handshake.headers.authorization.replace('Bearer', '');
    // const { Authentication: authenticationToken } = parse(cookie);
    const user =
      await this.authenticationService.getUserFromAuthenticationToken(token);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async saveMessage(content: string, author: User) {
    const newMessage = await this.messagesRepository.create({
      content,
      author,
    });
    await this.messagesRepository.save(newMessage);
    return newMessage;
  }

  async getAllMessages() {
    return this.messagesRepository.find({
      relations: ['author'],
    });
  }
}
