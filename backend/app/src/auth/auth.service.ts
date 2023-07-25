import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	signUp(username: string): void {
		this.usersService.create({
			id: 0,
			username: username,
			a2f_key: "",
			profile_picture_url: process.env.DEFAULT_PROFILE_IMAGE_URL,
			updated_at: "",
			created_at: ""
		});
	}

	async getSignInURL(): Promise<string> {
		const redirectUri = process.env.AUTH_42_RETURN_URI;
		const clientId = process.env.AUTH_42_CLIENT_KEY;
		const authUrl = process.env.AUTH_42_AUTH_URL;

		const oauthUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
		return oauthUrl;
	}
}
