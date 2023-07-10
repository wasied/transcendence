import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get('login') // Get ? It depends on the way signIn() works
	// Connect to URI /auth/login to log in with signIn() thus with Oauth2
	signIn(@Session() session) {
		return this.authService.signIn();
	}
}
