import { Controller, Body, Param, Request, Get, Post, Delete } from '@nestjs/common';
import { User } from '../user';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
	constructor(private readonly friendsService: FriendsService) {}

	@Get()
	async findAll(@Request() request: any): Promise<User[]> {
		return this.friendsService.findAll(request.id);
	}

/*
	@Get('online')
	async whoIsOnline(@Param('id') id: number): Promise<User[]> {
		return this.friendsService.whoIsOnline(id);
	}
*/

	@Post()
	async create(@Body('user_uid1') user_uid1: number, @Body('user_uid2') user_uid2: number): Promise<void> {
		this.friendsService.create(user_uid1, user_uid2);
	}

	@Delete()
	async delete(@Param('friendship_id') friendship_id: number): Promise<void> {
		this.friendsService.delete(friendship_id);
	}
}
