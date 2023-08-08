import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UsersService } from '../users/users.service';
import { ChatStrategy } from './chat.strategy';
import { MessagesModule } from './messages/messages.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService, UsersService, ChatStrategy],
  imports: [MessagesModule]
})
export class ChatModule {}
