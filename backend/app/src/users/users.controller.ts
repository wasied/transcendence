import { HttpException, HttpStatus, Controller, Body, Param, Request, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user';
import { Session } from '../sessions/session';
import { UsersService } from './users.service';
import { RequestWithUser } from '../utils/RequestWithUser';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get('me')
	async findMe(@Request() request: RequestWithUser): Promise<User> {
		return request.user;
	}

	@Get('username/:username')
	async findOneByUsername(@Param('username') username: string): Promise<User> {
		const result = await this.usersService.findOneByUsername(username);
		if (!result.length)
			throw new HttpException("User not found.", HttpStatus.NOT_FOUND);

		return result[0];
	}

	@Get(':id')
	async findOneById(@Param('id') id: number): Promise<User> {
		const result = await this.usersService.findOneById(id);
		if (!result.length)
			throw new HttpException("User not found.", HttpStatus.NOT_FOUND);

		return result[0];
	}

	@Get('playing')
	async findPlaying(): Promise<User[]> {
		return this.usersService.findPlaying();
	}

	@Get('sessions/:id')
	async findUserSessions(@Param('id') id: number): Promise<Session[]> {
		return this.usersService.findUserSessions(id);
	}

	@Put('username')
	updateUsername(@Request() request: RequestWithUser, @Body('username') url: string): void {
		this.usersService.updateUsername(request.user.id, url);
	}

	@Put('profile-picture')
	updateProfilePicture(@Request() request: RequestWithUser, @Body('url') url: string): void {
		this.usersService.updateProfilePicture(request.user.id, url);
	}

	/*** Block/Unblock ***/

	@Post('block')
	block(@Body('blocker_uid') blocker_uid: number, @Body('blocked_uid') blocked_uid: number): void {
		this.usersService.block(blocker_uid, blocked_uid);
	}

	@Delete('block')
	unblock(@Param('blocking_id') blocking_id: number): void {
		this.usersService.unblock(blocking_id);
	}
}
