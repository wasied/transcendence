import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { Users } from './users';
import { User } from './user';
import { Sessions } from '../sessions/sessions';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async findAll(): Promise<Users> {
		return this.usersService.findAll();
	}

	@Get('/username/:username')
	async findOneByUsername(@Param('username') username: string): Promise<User> {
		return this.usersService.findOneByUsername(username);
	}

	@Get(':id')
	async findOneById(@Param('id') id: number): Promise<User> {
		return this.usersService.findOneById(id);
	}

	@Get('sessions/:id')
	async findUserSessions(@Param('id') id: number): Promise<Sessions> {
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
	async block(@Body('blocker_uid') blocker_uid: number, @Body('blocked_uid') blocked_uid: number): Promise<void> {
		this.usersService.block(blocker_uid, blocked_uid);
	}

	@Delete('block')
	async unblock(@Param('blocking_id') blocking_id: number): Promise<void> {
		this.usersService.unblock(blocking_id);
	}
}
