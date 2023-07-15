import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	constructor() {}

	async getSignInURL(): Promise<string> {
		const redirectUri = process.env.AUTH_42_RETURN_URI;
		const clientId = process.env.AUTH_42_CLIENT_KEY;
		const authUrl = process.env.AUTH_42_AUTH_URL;

		const oauthUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
		return oauthUrl;
	}
}
