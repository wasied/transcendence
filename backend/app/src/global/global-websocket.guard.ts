import { WsException } from '@nestjs/websockets';
import { Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GlobalWebsocketGuard implements CanActivate {
	constructor(
		private usersService: UsersService,
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
