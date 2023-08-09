import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { ChatService } from '../chat.service';

@Injectable()
export class MessagesStrategy extends PassportStrategy(Strategy, 'jwt-messages')  {
	constructor(
		private usersService: UsersService,
		private chatService: ChatService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
			secretOrKey: process.env.JWT_SECRET,
			ignoreExpiration: true
		});
	}

	async validate(payload: any) {
		const userList = await this.usersService.findOneById(payload.id);
		if (!userList.length)
			throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
		var user = userList[0];
		user.chatroom_ids = await this.chatService.findUserChatrooms(payload.id)
			.then(chatrooms=> {
				var result: number[] = [];
				chatrooms.forEach(chatroom => {
					result.push(chatroom.id);
				});

				return result;
			})
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });
		user.punishments = await this.chatService.findUserPunishments(payload.id) 
			.catch(err => { throw new HttpException(err, HttpStatus.BAD_REQUEST); });

		return user;
	}
}
