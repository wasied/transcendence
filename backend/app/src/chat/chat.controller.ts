import { HttpException, HttpStatus, Controller, Request, Body, Param, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { Chat } from './chat';
import { ChatService } from './chat.service';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../utils/RequestWithUser';
import { CreateDto, SetHiddenDto, UpdateNameDto, UpdatePasswordDto, JoinDto, SetAdminDto, SetPunishmentDto } from './dto';

@Controller('chat')
@UseGuards(AuthGuard('jwt-chat'))
export class ChatController {
	constructor(
		private readonly chatService: ChatService,
		private readonly usersService: UsersService
	) {}

	/* Chat */

	@Get('chatrooms')
	async findAllChatrooms(): Promise<Chat[]> {
		var chatrooms: Chat[] = await this.chatService.findAllChatrooms();
		for (const index in chatrooms) {
			const participants_id = await this.chatService.findChatroomUsersId(chatrooms[index].id);
			var participants = [];
			for (const participant_id of participants_id) {
				const participant = (await this.usersService.findOneById(participant_id))[0];
				participants.push(participant);
			}
			chatrooms[index].participants_id = participants_id;
			chatrooms[index].participants = participants;
		}

		return chatrooms;
	}

	@Get('my-chatrooms')
	async findMyChatrooms(@Request() request: RequestWithUser): Promise<Chat[]> {
		var chatrooms: Chat[] = await this.chatService.findUserChatrooms(request.user.id);
		for (const index in chatrooms) {
			const participants_id = await this.chatService.findChatroomUsersId(chatrooms[index].id);
			var participants = [];
			for (const participant_id of participants_id) {
				const participant = (await this.usersService.findOneById(participant_id))[0];
				participants.push(participant);
			}
			chatrooms[index].participants_id = participants_id;
			chatrooms[index].participants = participants;
		}

		return chatrooms;
	}

	@Get('my-direct-messages')
	async findMyDirectMessages(@Request() request: RequestWithUser): Promise<Chat[]> {
		var directMessages: Chat[] = await this.chatService.findUserDirectMessages(request.user.id);
		for (const index in directMessages) {
			const participants_id = await this.chatService.findChatroomUsersId(directMessages[index].id);
			if (participants_id.length !== 2)
				throw new HttpException("Direct message does not have 2 members", HttpStatus.BAD_REQUEST);
			directMessages[index].participants_id = [];
			directMessages[index].participants_id.push(request.user.id);
			directMessages[index].participants_id.push(participants_id[0] !== request.user.id ? participants_id[0] : participants_id[1]);
			var participants = [];
			for (const participant_id of directMessages[index].participants_id) {
				const participant = (await this.usersService.findOneById(participant_id))[0];
				participants.push(participant);
			}
			directMessages[index].participants = participants;
		}

		return directMessages;
	}

	@Get(':id')
	async findOne(@Request() request: RequestWithUser, @Param('id') id: string): Promise<Chat> {
		const result = await this.chatService.findOne(+id);
		if (!result.length)
			throw new HttpException("Chatroom not found.", HttpStatus.NOT_FOUND);
		var chat = result[0];
		if (chat.direct_message) {
			const participants_id = await this.chatService.findChatroomUsersId(chat.id);
			if (participants_id.length !== 2)
				throw new HttpException("Direct message does not have 2 members", HttpStatus.BAD_REQUEST);
			chat.participants_id = [];
			chat.participants_id.push(request.user.id);
			chat.participants_id.push(participants_id[0] !== request.user.id ? participants_id[0] : participants_id[1]);
			var participants = [];
			for (const participant_id of chat.participants_id) {
				const participant = (await this.usersService.findOneById(participant_id))[0];
				participants.push(participant);
			}
			chat.participants = participants;
		}
		else {
			const participants_id = await this.chatService.findChatroomUsersId(chat.id);
			var participants = [];
			for (const participant_id of participants_id) {
				const participant = (await this.usersService.findOneById(participant_id))[0];
				participants.push(participant);
			}
			chat.participants_id = participants_id;
			chat.participants = participants;
		}

		return chat;
	}

	@Get('is-owner/:chatroom_id')
	amIOwner(
		@Request() request: RequestWithUser,
		@Param('chatroom_id') chatroom_id: string
	): boolean {
		if (request.user.owner.indexOf(+chatroom_id) === -1)
			return false;
		else
			return true;
	}

	@Post()
	async create(
		@Request() request: RequestWithUser,
		@Body() body: CreateDto
	): Promise<void> {
		var password: string | null;
		if (body.direct_message)
			password = null;
		else
			password = body.password;
		const id = await this.chatService.create(request.user.id, body.name, password, body.direct_message);
		await this.chatService.join(request.user.id, id, password);
		await this.chatService.setAdmin(true, id, request.user.id);
		if (body.direct_message)
			await this.chatService.join(body.other_user_id, id, password);
	}

/*
	@Put('hidden')
	setHidden(
		@Request() request: RequestWithUser,
		@Body() body: SetHiddenDto
	): void {
		if (request.user.owner.indexOf(body.chatroom_id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		this.chatService.setHidden(body.chatroom_id, body.hidden);
	}
*/

	@Put('name')
	async updateName(@Request() request: RequestWithUser, @Body() body: UpdateNameDto) {
		if (request.user.owner.indexOf(body.id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		await this.chatService.updateName(body.id, body.name);
	}

	@Put('password')
	async updatePassword(@Request() request: RequestWithUser, @Body() body: UpdatePasswordDto) {
		if (request.user.owner.indexOf(body.id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		await this.chatService.updatePassword(body.id, body.password);
	}

	@Delete(':id')
	async delete(@Request() request: RequestWithUser, @Param('id') id: string): Promise<void> {
		if (request.user.owner.indexOf(+id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		await this.chatService.delete(+id);
	}

	/* Chat users */


	@Post('join')
	async join(@Request() request: RequestWithUser, @Body() body: JoinDto): Promise<void> {
		if (request.user.chatroom_ids.indexOf(body.chatroom_id) !== -1)
			throw new HttpException("User is already a chatroom member", HttpStatus.BAD_REQUEST);
		await this.chatService.join(request.user.id, body.chatroom_id, body.password);
	}

	@Put('admin')
	async setAdmin(
		@Request() request: RequestWithUser,
		@Body() body: SetAdminDto
	): Promise<void> {
		if (request.user.owner.indexOf(body.chatroom_id) === -1)
			throw new HttpException("User is not the chatroom owner", HttpStatus.FORBIDDEN);
		await this.chatService.setAdmin(body.admin, body.chatroom_id, body.user_id);
	}

	@Delete('leave/:id')
	async leave(@Request() request: RequestWithUser, @Param('id') id: string): Promise<void> {
		if (request.user.chatroom_ids.indexOf(+id) === -1)
			throw new HttpException("User is not a chatroom member", HttpStatus.BAD_REQUEST);
		await this.chatService.leave(request.user.id, +id);
	}


	/* Punishments */

	@Post('punishment')
	async setPunishment(
		@Request() request: RequestWithUser,
		@Body() body: SetPunishmentDto
	): Promise<void> {
		if (request.user.admin.indexOf(body.chatroom_id) === -1)
			throw new HttpException("User is not an admin", HttpStatus.FORBIDDEN);
		const chatroom = await this.chatService.findOne(body.chatroom_id)
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
		if (chatroom.length !== 1)
			throw new HttpException("Chatroom not found", HttpStatus.BAD_REQUEST);
		if (body.target_id === chatroom[0].owner_uid)
			throw new HttpException("Chatroom owner cannot be punished", HttpStatus.FORBIDDEN);
		const admin_id = await this.chatService.findChatroomUserId(request.user.id, body.chatroom_id);
		var target_id;
		if (body.type === 'ban')
			target_id = body.target_id;
		else
			target_id = await this.chatService.findChatroomUserId(body.target_id, body.chatroom_id);
		await this.chatService.setPunishment(admin_id, target_id, body.chatroom_id, body.type, body.ends_at);
		if (body.type === 'ban') {
			await this.chatService.leave(body.target_id, body.chatroom_id);
		}
	}

	@Delete('kick/:id/:user_id')
	async kick(@Request() request: RequestWithUser, @Param('id') chatroom_id: string, @Param('user_id') user_id: string): Promise<void> {
		if (request.user.admin.indexOf(+chatroom_id) === -1)
			throw new HttpException("User is not an admin", HttpStatus.FORBIDDEN);
		const chatroom = await this.chatService.findOne(+chatroom_id)
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
		if (chatroom.length !== 1)
			throw new HttpException("Chatroom not found", HttpStatus.BAD_REQUEST);
		if (+user_id === chatroom[0].owner_uid)
			throw new HttpException("Chatroom owner cannot be punished", HttpStatus.FORBIDDEN);
		await this.chatService.leave(+user_id, +chatroom_id);
	}
}
