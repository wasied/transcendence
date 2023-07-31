import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { SessionsModule } from './sessions/sessions.module';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), UsersModule, ChatModule, SessionsModule, WebsocketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}