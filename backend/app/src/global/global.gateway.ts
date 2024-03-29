import { UseGuards } from '@nestjs/common';
import { GlobalWebsocketGuard } from './global-websocket.guard';
import { WsException, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
import { FriendsService } from '../users/friends/friends.service';
import { SocketWithUser } from '../utils/SocketWithUser';

@WebSocketGateway({ cors: true, namespace: "global" })
@UseGuards(GlobalWebsocketGuard)
export class GlobalGateway {
    @WebSocketServer() server: Server;

    constructor(
		private readonly usersService: UsersService,
		private readonly friendsService: FriendsService
	) {}

	public updateStatus() {
		this.server.emit('updateConnections');
	}

	@SubscribeMessage('connectGlobal')
	async connect(
		@ConnectedSocket() client: SocketWithUser
	): Promise<void> {
		await this.usersService.logIn(client.user.id);
		this.updateStatus();
	}

	@SubscribeMessage('disconnectGlobal')
	async disconnect(
		@ConnectedSocket() client: SocketWithUser
	): Promise<void> {
		await this.usersService.logOut(client.user.id);
		client.disconnect();
		this.updateStatus();
	}

	@SubscribeMessage('getUpdateFriends')
	async getFriends(
		@ConnectedSocket() client: SocketWithUser
	): Promise<void> {
		const updatedFriends: User[] = await this.friendsService.findUserFriends(client.user.id)
			.catch(err => { throw new WsException(err); });
		
		client.emit('updateFriends', updatedFriends);
	}
}
