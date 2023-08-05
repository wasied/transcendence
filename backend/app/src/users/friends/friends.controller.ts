import { HttpException, HttpStatus, Controller, Body, Param, Request, Get, Post, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user';
import { Friend } from './friend';
import { FriendsService } from './friends.service';
import { RequestWithUser } from '../../utils/RequestWithUser';

@Controller('users/friends')
@UseGuards(AuthGuard('jwt'))
export class FriendsController {
	constructor(private readonly friendsService: FriendsService) {}

	@Get()
	async findAll(@Request() request: any): Promise<User[]> {
		return this.friendsService.findAll(request.user.id);
	}

	@Get(':id')
	async findFriendsOfByUserId(@Param('id') id: number): Promise<User[]> {
		return this.friendsService.findAll(id);
	}

	@Get('friendship/:id')
	async findOne(@Param('id') id: number): Promise<Friend> {
		const result = await this.friendsService.findOne(id);
		if (!result.length)
			throw new HttpException("Friendship not found.", HttpStatus.NOT_FOUND);

		return result[0];
	}

	@Post()
	async create(@Request() request: RequestWithUser, @Body('user_id') user_id2: number): Promise<void> {
		this.friendsService.create(request.user.id, user_id2);
	}

	@Delete(':friendship_id')
	async delete(@Request() request: RequestWithUser, @Param('friendship_id') friendship_id: number): Promise<void> {
		this.friendsService.delete(request.user.id, friendship_id);
	}
}
