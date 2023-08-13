import { HttpException, HttpStatus, Controller, Body, Param, Request, Get, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message';
import { ChatService } from '../chat.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../../utils/RequestWithUser';
import { SendDto } from './dto';

@Controller('messages')
@UseGuards(AuthGuard('jwt-messages'))
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
}
