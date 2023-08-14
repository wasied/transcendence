import { Module } from '@nestjs/common';
import { PongGameGateway } from './game.gateway';
import { GameWebsocketGuard } from './game-websocket.guard';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';
import { GlobalGateway } from '../global/global.gateway';
import { FriendsService } from '../users/friends/friends.service';

@Module({
  providers: [SessionsService, JwtService, UsersService, GameWebsocketGuard, PongGameGateway, FriendsService, GlobalGateway]
})
export class GameModule {}
