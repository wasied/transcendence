import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { SessionsService } from '../sessions/sessions.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [StatsController],
  providers: [StatsService, SessionsService, UsersService]
})
export class StatsModule {}
