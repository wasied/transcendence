import { UseGuards } from '@nestjs/common';
import { ChatWebsocketGuard } from './chat-websocket.guard';
import { WsException, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets/interfaces';
import { Server } from 'socket.io';
import { Chat } from './chat';
import { ChatService } from './chat.service';
import { MessagesService } from './messages/messages.service';
import { UsersService } from '../users/users.service';
import { SocketWithUser } from '../utils/SocketWithUser';
import { JoinDto, LeaveDto, SetAdminDto, CreateDto, DeleteDto } from './dto';

@WebSocketGateway({ cors: true, namespace: "chat" })
@UseGuards(ChatWebsocketGuard)
export class ChatGateway {
    @WebSocketServer() server: Server;

    constructor(
		private readonly chatService: ChatService,
		private readonly messagesService: MessagesService,
		private readonly usersService: UsersService
	) {}

/*
GET CHATROOMS
*/

	private async updateRooms(client: SocketWithUser): Promise<void> {
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

		client.emit('updateRooms', chatrooms);
	}

	private async updateMyRooms(client: SocketWithUser): Promise<void> {
		var myChatrooms: Chat[] = await this.chatService.findUserChatrooms(client.user.id);
		for (const index in myChatrooms) {
			const participants_id = await this.chatService.findChatroomUsersId(myChatrooms[index].id);
			var participants = [];
			for (const participant_id of participants_id) {
				const participant = (await this.usersService.findOneById(participant_id))[0];
				participants.push(participant);
			}
			myChatrooms[index].participants_id = participants_id;
			myChatrooms[index].participants = participants;
		}

		client.emit('updateMyRooms', myChatrooms);
	}

	private async updateAllRooms(client: SocketWithUser): Promise<void> {
		this.updateRooms(client);
		this.updateMyRooms(client);
	}

    @SubscribeMessage('connectChatrooms')
    async connect(
		@ConnectedSocket() client: SocketWithUser
	): Promise<void> {
        client.join(String(client.user.id));
		this.updateAllRooms(client);
    }

    @SubscribeMessage('disconnectChatrooms')
    async disconnect(
		@ConnectedSocket() client: SocketWithUser
	): Promise<void> {
        client.leave(String(client.user.id));
		client.disconnect();
    }

	@SubscribeMessage('createRoom')
	async create(
		@ConnectedSocket() client: SocketWithUser,
		@MessageBody() body: CreateDto
	): Promise<void> {
		const id = await this.chatService.create(client.user.id, body.name, body.password, body.direct_message)
			.catch(err => { throw new WsException(err); });
		await this.chatService.join(client.user.id, id);
		if (body.direct_message)
			await this.chatService.join(body.other_user_id, id);

		this.updateAllRooms(client);
	}

	@SubscribeMessage('deleteRoom')
	async delete(
		@ConnectedSocket() client: SocketWithUser,
		@MessageBody() body: DeleteDto
	): Promise<void> {
		if (client.user.owner.indexOf(body.chatroom_id) === -1)
			throw new WsException("User is not the chatroom owner");
		await this.chatService.delete(body.chatroom_id);

		this.updateAllRooms(client);
	}

	@SubscribeMessage('joinRoom')
	async join(
		@ConnectedSocket() client: SocketWithUser,
		@MessageBody() body: JoinDto
	): Promise<void> {
		if (client.user.chatroom_ids.indexOf(body.chatroom_id) !== -1)
			throw new WsException("User is already a chatroom member");
		await this.chatService.join(client.user.id, body.chatroom_id);

		this.updateMyRooms(client);
	}

	@SubscribeMessage('leaveRoom')
	async leave(
		@ConnectedSocket() client: SocketWithUser,
		@MessageBody() body: LeaveDto
	): Promise<void> {
		if (client.user.chatroom_ids.indexOf(body.chatroom_id) === -1)
			throw new WsException("User is not a chatroom member");
		await this.chatService.leave(client.user.id, body.chatroom_id);

		this.updateMyRooms(client);
	}

    @SubscribeMessage('setAdmin')
    async handleSetAdminStatus(
		@ConnectedSocket() client: SocketWithUser,
		@MessageBody() body: SetAdminDto
	): Promise<void> {
		if (client.user.owner.indexOf(body.chatroom_id) === -1)
			throw new WsException("User is not the chatroom owner");
		else
	        await this.chatService.setAdmin(body.admin, body.chatroom_id, body.user_id);
    }

/*
    @SubscribeMessage('getOwnedChatrooms')
    async handleGetOwnedChatrooms(@ConnectedSocket() client: Socket, userId: number): Promise<void> {
        const chatrooms = await this.chatService.findChatroomsOwnedByUserId(userId);
        client.emit('ownedChatrooms', chatrooms);
    }

    @SubscribeMessage('getAdminChatrooms')
    async handleGetAdminChatrooms(@ConnectedSocket() client: Socket, userId: number): Promise<void> {
        const chatrooms = await this.chatService.findChatroomsWhereUserIdIsAdmin(userId);
        client.emit('adminChatrooms', chatrooms);
    }
*/
}
