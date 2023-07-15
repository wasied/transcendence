import { Controller, Body, Param, Get, Post, Put } from '@nestjs/common';
import { Users } from './users';
import { User } from './user';
import { Sessions } from '../sessions/sessions';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll(): Promise<Users> {
		return this.usersService.findAll();
	}

	@Get('/username/:username')
	findOneByUsername(@Param('username') username: string): Promise<User> {
		return this.usersService.findOneByUsername(username);
	}

	@Get(':id')
	findOneById(@Param('id') id: number): Promise<User> {
		return this.usersService.findOneById(id);
	}

	@Get('sessions/:id')
	findUserSessions(@Param('id') id: number): Promise<Sessions> {
		return this.usersService.findUserSessions(id);
	}

	@Post()
	async create(@Body('user') user: User): Promise<void> {
		this.usersService.create(user);
	}

	@Put()
	async update(@Body('user') user: User): Promise<void> {
		this.usersService.update(user);
	}

	/*** Block/Unblock ***/

	@Post('block')
	async create(@Body('blocker_uid') blocker_uid: number, @Body('blocked_uid') blocked_uid: number): Promise<void> {
		this.usersService.create(blocker_uid, blocked_uid);
	}

	@Delete('block')
	async delete(@Param('blocking_id') blocking_id: number): Promise<void> {
		this.usersService.delete(blocking_id);
	}
}
