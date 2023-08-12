import { Module } from '@nestjs/common';
import { GlobalGateway } from './global.gateway';
import { UsersService } from '../users/users.service';
import { FriendsService } from '../users/friends/friends.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [GlobalGateway, UsersService, FriendsService, JwtService]
})
export class GlobalModule {}
