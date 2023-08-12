import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { SessionsModule } from './sessions/sessions.module';
import { StatsModule } from './stats/stats.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), UsersModule, ChatModule, SessionsModule, StatsModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}