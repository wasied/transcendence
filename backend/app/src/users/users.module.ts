import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FriendsModule } from './friends/friends.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [FriendsModule]
})
export class UsersModule {}
