import { SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer() server: Server;

    constructor(private readonly chatService: ChatService) {}

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(@ConnectedSocket() client: Socket, { roomId, userId }): Promise<void> {
        client.join(String(roomId));

        // TODO: Update the user's status in the room (e.g., "online")

        const messages = await this.chatService.getMessagesByChatroomId(roomId);
        client.emit('updateMessages', messages);
    }

    @SubscribeMessage('leaveRoom')
    async handleLeaveRoom(@ConnectedSocket() client: Socket, { roomId, userId }): Promise<void> {
        client.leave(String(roomId));

        // TODO: Update the user's status in the room (e.g., "offline")
    }

    @SubscribeMessage('newMessage')
    async handleNewMessage(@ConnectedSocket() client: Socket, { roomId, userId, message }): Promise<void> {
        const chatroomUserId = 1; // TODO: Get chatroom userid
        await this.chatService.addMessageToChatroom(chatroomUserId, message);

        const updatedMessages = await this.chatService.getMessagesByChatroomId(roomId);
        this.server.to(String(roomId)).emit('updateMessages', updatedMessages);
    }

    @SubscribeMessage('setAdmin')
    async handleSetAdminStatus(@ConnectedSocket() client: Socket, { roomId, userId, admin }): Promise<void> {
        await this.chatService.setAdmin(admin, roomId, userId);

        // TODO: Notify users in the room about the admin status change
    }

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
}