import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: unknown,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    const event = 'events';
    return { event, data };
  }
}

// on: client lang nghe nhan respone tu server
// emit: la phat ra even tu client