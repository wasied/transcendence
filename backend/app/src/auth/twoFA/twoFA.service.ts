import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import { dbClient } from '../../db';

@Injectable()
export class TwoFAService {
	enable(user_id: number): Object {
		const secret = authenticator.generateSecret();
		const otpAuthUrl = authenticator.keyuri(String(user_id), process.env.APP_NAME, secret);
		this.updateSecret(user_id, secret);
		var qrCodeImageUrl;
		qrcode.toDataURL(otpAuthUrl, (err, imageUrl) => {
			if (err)
				qrCodeImageUrl = "";
			else
				qrCodeImageUrl = imageUrl;
		});

		return {
			qrCodeImageUrl: qrCodeImageUrl,
			secret: secret
		}
	}

	disable(user_id: number): void {
		const queryResult = dbClient.query(
			`UPDATE	users
					SET a2f_key = NULL
					WHERE id = $1`,
			[user_id]
		);
	}

	private async getSecret(user_id: number): Promise<string> {
		const queryResult = await dbClient.query(
			`SELECT a2f_key	FROM users
							WHERE id = $1;`,
			[user_id]
		);

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

	async verify(user_id: number, code: string): Promise<boolean> {
		const secret = await this.getSecret(user_id);

		return authenticator.verify({
			token: code,
			secret: secret
		});
	}
}
