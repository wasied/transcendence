import { HttpException, HttpStatus, Controller, Body, Param, Request, Get, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message';
import { ChatService } from '../chat.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../../utils/RequestWithUser';
import { SendDto } from './dto';

@Controller('messages')
@UseGuards(AuthGuard('jwt-chat'))
export class MessagesController {
	constructor(
		private messagesService: MessagesService,
		private chatService: ChatService
	) {}

	@Get(':chatroom_id')
	async findChatroomMessages(@Request() request: RequestWithUser, @Param('chatroom_id') chatroom_id: number): Promise<Message[]> {
		if (request.user.chatroom_ids.indexOf(chatroom_id) === -1)
			throw new HttpException("User is not a chatroom member", HttpStatus.FORBIDDEN);
		return this.messagesService.findChatroomMessages(request.user.id, chatroom_id);
	}

	@Post()
	async send(@Request() request: RequestWithUser, @Body() body: SendDto): Promise<void> {
		const chatroom_index = request.user.chatroom_ids.indexOf(body.chatroom_id);
		var chatroom_user_id: number;
		if (chatroom_index === -1)
			throw new HttpException("User is not a chatroom member", HttpStatus.FORBIDDEN);
		else
			chatroom_user_id = await this.chatService.findChatroomUserId(request.user.id, body.chatroom_id);
		request.user.punishments.forEach(punishment => {
			if (punishment.chatroom_user_target_uid === chatroom_user_id) {
				// Check if punishment is valid and throw error if the user cannot send message
			}
		});
		this.messagesService.send(chatroom_user_id, body.content)
	}
}
