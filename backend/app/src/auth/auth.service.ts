import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TwoFAService } from './twoFA/twoFA.service';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly twoFAService: TwoFAService,
		private readonly jwtService: JwtService
	) {}

	async getSignInURL(): Promise<string> {
		const redirectUri = process.env.AUTH_42_RETURN_URI;
		const clientId = process.env.AUTH_42_CLIENT_KEY;
		const authUrl = process.env.AUTH_42_OAUTH_URL;

		const oauthUrl = `${authUrl}/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
		return oauthUrl;
	}

	async redirect(code: string): Promise<Object> {
		const result = await axios.post(`${process.env.AUTH_42_OAUTH_URL}/token`, {
			grant_type: "authorization_code",
			client_id: process.env.AUTH_42_CLIENT_KEY,
			client_secret: process.env.AUTH_42_SECRET_KEY,
			code: code,
			redirect_uri: process.env.AUTH_42_RETURN_URI,
			scope: "public"
		})
		.then(async (res) => { return res.data; })
		.catch((err) => { return null; });

		if (!result)
			return { url: process.env.APP_URL };

		const userData = await axios.get("https://api.intra.42.fr/v2/me", {
			headers: {
				"Authorization": `Bearer ${result.access_token}`
			}
		})
		.then(async (res) => { return res.data; })
		.catch((err) => { return null; });
		if (!userData)
			return { url: process.env.APP_URL };

/***/
		const payload = { id: userData.id };
//		const accessToken = this.jwtService.sign(payload);
//		return { url: `${process.env.APP_URL}/auth/redirect?access_token=${accessToken}&new_user=false` };
/***/
		if ((await this.usersService.findOneById(userData.id)).length === 0) {
			await this.usersService.create({
				id: userData.id,
				username: userData.login,
				status: "online",
				a2f_key: null,
				profile_picture_url: userData.image.link,
				updated_at: "",
				created_at: ""
			});
			const accessToken = this.jwtService.sign(payload);

			return { url: `${process.env.APP_URL}/auth/redirect?access_token=${accessToken}&new_user=true` };
		}

//		if (await this.usersService.isOnline(userData.id)) {
//			console.log('logged in!');
//			throw new HttpException("User already logged in.", HttpStatus.BAD_REQUEST);
//		}
		if (await this.twoFAService.isEnabled(userData.id)) {
			console.log('2fa!');

			return { url: `${process.env.APP_URL}/auth/2fa?user_id=${userData.id}` };
		}
		else {
			console.log('no 2fa;');
			const accessToken = this.jwtService.sign(payload);

			return { url: `${process.env.APP_URL}/auth/redirect?access_token=${accessToken}&new_user=false` };
		}

		return { url: process.env.APP_URL };
	}
}
