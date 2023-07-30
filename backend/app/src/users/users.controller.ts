import { Controller, Body, Param, Request, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user';
import { Session } from '../sessions/session';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get('me')
	@UseGuards(AuthGuard('jwt'))
	async findMe(@Request() request: any) {
		return request.user;
	}

	@Get('/username/:username')
	async findOneByUsername(@Param('username') username: string): Promise<User[]> {
		return this.usersService.findOneByUsername(username);
	}

	@Get(':id')
	async findOneById(@Param('id') id: number): Promise<User[]> {
		return this.usersService.findOneById(id);
	}

	@Get('sessions/:id')
	async findUserSessions(@Param('id') id: number): Promise<Session[]> {
		return this.usersService.findUserSessions(id);
	}

	@Post()
	async create(@Body('user') user: User): Promise<void> {
		this.usersService.create(user);
	}

	@Put()
	async updateProfilePicture(@Body('id') id: number, @Body('url') url: string): Promise<void> {
		this.usersService.updateProfilePicture(id, url);
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
