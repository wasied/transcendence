import { Controller, Body, Get, Post, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	async signUp(@Body('username') username: string): Promise<void> {
		this.authService.signUp(username);
	}

	@Get('login')
	@Redirect()
	async signIn(): Promise<Object> {
		const url = await this.authService.getSignInURL();
		return { url: url };
	}

	@Get('callback')
	@UseGuards(AuthGuard('oauth42'))
	callback(@Req() req) {
		// At this point, the user is authenticated and we can access to his information via req.user
		// call usersService.logIn()
	}
}
