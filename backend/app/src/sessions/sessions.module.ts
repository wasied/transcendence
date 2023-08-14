import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { UsersService } from '../users/users.service';

@Module({
  providers: [UsersService, SessionsService],
  controllers: [SessionsController]
})
export class SessionsModule {}
