import { Controller, Body, Query, Get, Post, Redirect, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { TwoFAService } from './twoFA/twoFA.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private twoFAService: TwoFAService,
		private usersService: UsersService
	) {}

	@Get('url')
	async url(): Promise<Object> {
		const url = await this.authService.getSignInURL();

		return { url: url };
	}

	@Get('redirect')
	@Redirect()
	async redirect(@Query() query: any): Promise<Object> {
		return await this.authService.redirect(query.code);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('isAuthenticated')
	async isAuthenticated() {}
}
