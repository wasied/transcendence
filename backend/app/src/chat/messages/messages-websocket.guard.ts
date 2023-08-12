import { WsException } from '@nestjs/websockets';
import { Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { ChatService } from '../chat.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MessagesWebsocketGuard implements CanActivate {
	constructor(
		private usersService: UsersService,
		private chatService: ChatService,
		private jwtService: JwtService
	) {}

	canActivate(context: any): boolean | Promise<boolean> | Observable<boolean> {
		if (!context.args || !context.args.length || !context.args[0].handshake || !context.args[0].handshake.headers || !context.args[0].handshake.headers.authorization)
			return false;
		const authorizationHeader = context.args[0].handshake.headers.authorization;
		if (authorizationHeader.split(' ').length < 2)
			return false;
		const bearerToken = authorizationHeader.split(' ')[1];
		try {
			const decoded = this.jwtService.verify(bearerToken, {
				secret: process.env.JWT_SECRET,
				ignoreExpiration: true
			}) as any;
			return new Promise(async(resolve, reject) => {
				const userList = await this.usersService.findOneById(decoded.id)
					.catch(err => { throw new WsException(err); });
				if (!userList || !userList.length)
					reject(false);
				var user = userList[0];
				const chatroom_ids = await this.chatService.findUserChatrooms(user.id)
					.then(chatrooms => {
						var result = [];
						chatrooms.forEach(chatroom => { result.push(chatroom.id); });

						return result;
					})
					.catch(err => { throw new WsException(err); });
				const direct_messages_ids = await this.chatService.findUserDirectMessages(user.id)
					.then(direct_messages => {
						var result = [];
						direct_messages.forEach(direct_message => { result.push(direct_message.id); });

						return result;
					})
					.catch(err => { throw new WsException(err); });
				user.chatroom_ids = chatroom_ids.concat(direct_messages_ids);
				user.punishments = await this.chatService.findUserPunishments(user.id)
					.catch(err => { throw new WsException(err); });
				context.switchToWs().getClient().user = user;
				resolve(true);
			});
		}
		catch (error) {
			console.error(error);
			return false;
		}
	}
}
