import { Module } from '@nestjs/common';
import { PongGameGateway } from './game.gateway';
import { GameWebsocketGuard } from './game-websocket.guard';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';
import { GlobalGateway } from '../global/global.gateway';

@Module({
  providers: [SessionsService, JwtService, UsersService, GameWebsocketGuard, PongGameGateway, GlobalGateway],
})
export class GameModule {}
