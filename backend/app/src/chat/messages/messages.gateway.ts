import { Request, UseGuards } from '@nestjs/common';
import { MessagesWebsocketGuard } from './messages-websocket.guard';
import { WsException, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets/interfaces';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { ChatService } from '../chat.service';
import { SocketWithUser } from '../../utils/SocketWithUser';
import { SendDto } from './dto';

@WebSocketGateway({ cors: true, namespace: "messages" })
@UseGuards(MessagesWebsocketGuard)
export class MessagesGateway {
    @WebSocketServer() server: Server;

    constructor(
		private readonly messagesService: MessagesService,
		private readonly chatService: ChatService
	) {}

    @SubscribeMessage('newMessage')
    async send(
		@ConnectedSocket() client: SocketWithUser,
		@MessageBody() body: SendDto,
	): Promise<void> {
		const chatroom_index = client.user.chatroom_ids.indexOf(body.chatroom_id);
		var chatroom_user_id: number;
		if (chatroom_index === -1)
			throw new WsException("User is not a chatroom member");
		else
			chatroom_user_id = await this.chatService.findChatroomUserId(client.user.id, body.chatroom_id);
		client.user.punishments.forEach(punishment => {
			if (punishment.chatroom_user_target_uid === chatroom_user_id) {
				// Check if punishment is valid and throw error if the user cannot send message
			}
		});
		await this.messagesService.send(chatroom_user_id, body.content);
        //await this.chatService.addMessageToChatroom(request.user.id, message);

        const updatedMessages = await this.messagesService.findChatroomMessages(client.user.id, body.chatroom_id);
        this.server.to(String(body.chatroom_id)).emit('updateMessages', updatedMessages);
    }
}
