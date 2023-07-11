import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(private configService: ConfigService) {}

	async getSignInURL(): Promise<string> {
		const redirectUri = this.configService.get<string>('AUTH_42_RETURN_URI');
		const clientId = this.configService.get<string>('AUTH_42_CLIENT_KEY');
		const authUrl = this.configService.get<string>('AUTH_42_AUTH_URL');

		const oauthUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
		return oauthUrl;
	}
}
