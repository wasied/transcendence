import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UsersService } from '../users/users.service';
import { ChatStrategy } from './chat.strategy';
import { ChatWebsocketGuard } from './chat-websocket.guard';
import { MessagesModule } from './messages/messages.module';
import { JwtService } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { MessagesService } from './messages/messages.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, UsersService, ChatStrategy, ChatWebsocketGuard, JwtService, ChatGateway, MessagesService],
  imports: [MessagesModule]
})
export class ChatModule {}
