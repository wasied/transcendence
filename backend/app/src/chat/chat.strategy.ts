import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ChatService } from './chat.service';

@Injectable()
export class ChatStrategy extends PassportStrategy(Strategy, 'jwt-chat')  {
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
		var user = user[0];
		user.owner = this.chatService.findChatroomsOwnedByUserId(payload.id);
		user.admin = this.chatService.findChatroomsWhereUserIdIsAdmin(payload.id);

		return user;
	}
}
