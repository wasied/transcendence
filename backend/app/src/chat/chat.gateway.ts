import { UseGuards } from '@nestjs/common';
import { ChatWebsocketGuard } from './chat-websocket.guard';
import { WsException, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets/interfaces';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { MessagesService } from './messages/messages.service';
import { JoinDto, LeaveDto, SetAdminDto } from './dto';

@WebSocketGateway({ cors: true, namespace: "chat" })
@UseGuards(ChatWebsocketGuard)
export class ChatGateway {
    @WebSocketServer() server: Server;

    constructor(
		private readonly chatService: ChatService,
		private readonly messagesService: MessagesService
	) {}

/*
GET CHATROOMS
*/

    @SubscribeMessage('connectRoom')
    async handleConnection(
		@ConnectedSocket() client: Socket,
		@MessageBody() body: JoinDto
	): Promise<void> {
        client.join(String(body.chatroom_id));

        const messages = await this.messagesService.findChatroomMessages(client.user.id, body.chatroom_id);
        client.emit('updateMessages', messages);
    }

    @SubscribeMessage('disconnectRoom')
    async handleDisconnect(
		@ConnectedSocket() client: Socket,
	): Promise<void> {
        //client.leave(/*String(body.chatroom_id)*/);
    }

	@SubscribeMessage('joinRoom')
	async join(
		@ConnectedSocket() client: Socket,
		@MessageBody() body: JoinDto
	): Promise<void> {
		if (client.user.chatroom_ids.indexOf(body.chatroom_id) !== -1)
			throw new WsException("User is already a chatroom member");
		await this.chatService.join(client.user.id, body.chatroom_id);
	}

	@SubscribeMessage('leaveRoom')
	async leave(
		@ConnectedSocket() client: Socket,
		@MessageBody() body: LeaveDto
	): Promise<void> {
		if (client.user.chatroom_ids.indexOf(body.chatroom_id) === -1)
			throw new WsException("User is not a chatroom member");
		await this.chatService.leave(client.user.id, body.chatroom_id);
	}

    @SubscribeMessage('setAdmin')
    async handleSetAdminStatus(
		@ConnectedSocket() client: Socket,
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
