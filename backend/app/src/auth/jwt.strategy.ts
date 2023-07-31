import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TwoFAService } from './twoFA/twoFA.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')  {
	constructor(
		private twoFAService: TwoFAService,
		private usersService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
			secretOrKey: process.env.JWT_SECRET,
			ignoreExpiration: true
		});
	}

	async validate(payload: any) {
		return this.usersService.findOneById(payload.id);
	}
}
