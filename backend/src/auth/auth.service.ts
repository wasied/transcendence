import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	constructor() {}

	@Redirect('https://intra.42.fr/...') // To redirect request to intra Oauth2 link
	async	signIn(): Promise<any> {
		// Implement Oauth2 authentication here

		// Generate and return JWT or session with access_token
	}
}
