import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get('login')
	@Redirect()
	async signIn() {
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
