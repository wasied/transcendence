import { HttpException, HttpStatus, Controller, Request, Body, Param, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { Chat } from './chat';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../utils/RequestWithUser';
import { CreateDto, SetHiddenDto, UpdateNameDto, UpdatePasswordDto, JoinDto, SetAdminDto, SetPunishmentDto } from './dto';

@Controller('chat')
@UseGuards(AuthGuard('jwt-chat'))
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	/* Chat */

	@Get()
	async findAll(): Promise<Chat[]> {
		return this.chatService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<Chat> {
		const result = await this.chatService.findOne(id);
		if (!result.length)
			throw new HttpException("Chatroom not found.", HttpStatus.NOT_FOUND);

		return result[0];
	}

	@Post()
	create(
		@Request() request: RequestWithUser,
		@Body() body: CreateDto
	): void {
		this.chatService.create(request.user.id, body.name, body.password);
	}

	@Put('hidden')
	setHidden(
		@Request() request: RequestWithUser,
		@Body() body: SetHiddenDto
	): void {
		if (request.user.owner.indexOf(body.chatroom_id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		this.chatService.setHidden(body.chatroom_id, body.hidden);
	}

	@Put('name')
	updateName(@Request() request: RequestWithUser, @Body() body: UpdateNameDto) {
		if (request.user.owner.indexOf(body.id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		this.chatService.updateName(body.id, body.name);
	}

	@Put('password')
	updatePassword(@Request() request: RequestWithUser, @Body() body: UpdatePasswordDto) {
		if (request.user.owner.indexOf(body.id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		this.chatService.updatePassword(body.id, body.password);
	}

	@Delete(':id')
	delete(@Request() request: RequestWithUser, @Param('id') id: number): void {
		if (request.user.owner.indexOf(id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		this.chatService.delete(id);
	}

	/* Chat users */


	@Post('join')
	join(@Request() request: RequestWithUser, @Body() body: JoinDto): void {
		this.chatService.join(request.user.id, body.id);
	}

	@Put('admin')
	setAdmin(
		@Request() request: RequestWithUser,
		@Body() body: SetAdminDto
	): void {
		if (request.user.owner.indexOf(body.chatroom_id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		this.chatService.setAdmin(body.admin, body.chatroom_id, body.user_id);
	}

	@Delete('leave/:id')
	leave(@Request() request: RequestWithUser, @Param('id') id: number): void {
		this.chatService.leave(request.user.id, id);
	}


	/* Punishments */

	@Post('punishment')
	setPunishment(
		@Request() request: RequestWithUser,
		@Body() body: SetPunishmentDto
	): void {
		if (request.user.admin.indexOf(body.chatroom_id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		this.chatService.setPunishment(request.user.id, body.target_id, body.chatroom_id, body.type, body.ends_at);
	}

	@Delete('kick/:id/:user_id')
	kick(@Request() request: RequestWithUser, @Param('id') chatroom_id: number, @Param('user_id') user_id: number): void {
		if (request.user.admin.indexOf(chatroom_id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		this.chatService.leave(user_id, chatroom_id);
	}
}
