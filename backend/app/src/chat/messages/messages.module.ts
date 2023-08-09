import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { ChatService } from '../chat.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MessagesWebsocketGuard } from './messages-websocket.guard';
import { MessagesGateway } from './messages.gateway';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, ChatService, UsersService, JwtService, MessagesWebsocketGuard, MessagesGateway]
})
export class MessagesModule {}
