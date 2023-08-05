import { HttpException, HttpStatus, Controller, Request, Body, Param, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { Chat } from './chat';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../utils/RequestWithUser';

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
		@Body() body: { name: string, hidden: boolean, password: string }
	): void {
		this.chatService.create(request.user.id, body.name, body.hidden, body.password);
	}

/*
	@Put('hidden')
	setHidden(
		@Request() request: RequestWithUser,
		@Body() body: { hidden: boolean, chatroom_id: number }
	): void {
		this.chatService.setHidden(request.user.id, body.chatroom_id, body.hidden);
	}

	@Delete(':id')
	delete(@Request() request: RequestWithUser, @Param('id') id: number): void {
		this.chatService.delete(request.user.id, id);
	}
*/

	/* Chat users */

/*
	@Post('join')
	join(@Request() request: RequestWithUser, @Body('id') id: number): void {
		this.chatService.join(request.user.id, id);
	}

	@Put('admin')
	setAdmin(
		@Request() request: RequestWithUser,
		@Body() body: { admin: boolean, id: number, user_id: number }
	): void {
		this.chatService.setAdmin(request.user.id, body.admin, body.id, body.user_id); // check if request.user.id is chatroom owner_uid
	}

	@Delete('leave/:id')
	leave(@Request() request: RequestWithUser, @Param('id') id: number): void {
		this.chatService.leave(request.user.id, id);
	}
*/

	/* Punishments */

/*
	@Post('punishment')
	setPunishment(
		@Request() request: RequestWithUser,
		@Body() body: { type: string, chatroom_id: number, target_id: number}
	): void {
		this.chatService.setPunishment(request.user.id, body.chatroom_id, body.target_id, body.type); // Check if request.user.id is admin
	}

	@Delete('kick/:id/:user_id')
	kick(@Request() request: RequestWithUser, @Param('id') id: number, @Param('user_id') user_id: number): void {
		this.chatService.kick(request.user.id, id, user_id); // Check if request.user.id is admin
	}
*/
}
