import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import { dbClient } from '../../db';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TwoFAService {
	constructor(private readonly jwtService: JwtService) {}

	async handle2fa(user_id: number, code: string): Promise<Object> {
		if (this.verify(user_id, code)) {
			const payload = { id: user_id };
			const accessToken = this.jwtService.sign(payload);

			return {
				success: true,
				url: `${process.env.APP_URL}/auth/redirect?access_token=${accessToken}`
			};
		}
		else {
			throw new HttpException("Bad code.", HttpStatus.UNAUTHORIZED);

			return {
				success: false,
				url: undefined
			};
		}
	}

	enable(user_id: number): Object {
		const secret = authenticator.generateSecret();
		const otpAuthUrl = authenticator.keyuri(String(user_id), process.env.APP_NAME, secret);
		this.updateSecret(user_id, secret);
		var qrCodeImageUrl;
		qrcode.toDataURL(otpAuthUrl, (err, imageUrl) => {
			if (err)
				qrCodeImageUrl = undefined;
			else
				qrCodeImageUrl = imageUrl;
		});

		return {
			success: true,
			qrCodeImageUrl: qrCodeImageUrl,
			secret: secret
		};
	}

	disable(user_id: number): Object {
		const queryResult = dbClient.query(
			`UPDATE	users
					SET a2f_key = NULL
					WHERE id = $1`,
			[user_id]
		);

		return {
			success: true,
			qrCodeImageURl: undefined,
			secret: undefined
		};
	}

	async isEnabled(user_id: number): Promise<boolean> {
		const queryResult = await dbClient.query(
			`SELECT id	FROM users
						WHERE a2f_key IS NOT NULL
						AND id = $1;`,
			[user_id]
		);

		return (queryResult.rows.length > 0);
	}

	async getSecret(user_id: number): Promise<string> {
		const queryResult = await dbClient.query(
			`SELECT a2f_key	FROM users
							WHERE id = $1;`,
			[user_id]
		);
		if (queryResult.rows === undefined || !queryResult.rows || !queryResult.rows.length) {
			//throw
		}

		return String(queryResult.rows[0][0]);
	}

	private updateSecret(user_id: number, secret: string): void {
		const queryResult = dbClient.query(
			`UPDATE	users
					SET		a2f_key = $1,
					WHERE	id = $2`,
			[secret, user_id]
		);
	}

	private async verify(user_id: number, code: string): Promise<boolean> {
		const secret = await this.getSecret(user_id);

		return authenticator.verify({
			token: code,
			secret: secret
		});
	}
}
