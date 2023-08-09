import { HttpException, HttpStatus, Controller, Body, Param, Request, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user';
import { Session } from '../sessions/session';
import { UsersService } from './users.service';
import { RequestWithUser } from '../utils/RequestWithUser';
import { UpdateUsernameDto, UpdateProfilePictureDto, BlockDto } from './dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get('all-but-me')
	async findAllButMe(@Request() request: RequestWithUser): Promise<User[]> {
		var users = await this.usersService.findAll();
		if (!users.length || (users.length === 1 && users[0].id === request.user.id))
			return [];
		for (const index in users) {
			if (users[index].id === request.user.id)
				delete users[index];
		}

		return users;
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
	updateUsername(@Request() request: RequestWithUser, @Body() body: UpdateUsernameDto): void {
		this.usersService.updateUsername(request.user.id, body.username);
	}

	@Put('profile-picture')
	updateProfilePicture(@Request() request: RequestWithUser, @Body() body: UpdateProfilePictureDto): void {
		this.usersService.updateProfilePicture(request.user.id, body.url);
	}

	/*** Block/Unblock ***/

	@Post('block')
	block(@Request() request: RequestWithUser, @Body() body: BlockDto): void {
		this.usersService.block(request.user.id, body.blocked_uid);
	}

	@Delete('unblock/blocked_id')
	unblock(@Param('blocked_id') blocked_id: number): void {
		this.usersService.unblock(blocked_id);
	}
}
